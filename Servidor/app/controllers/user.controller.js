const userDao = require("../dao/user.dao");
const clientDao = require("../dao/client.dao");
const cloudinary = require("cloudinary").v2;
const IncomingForm = require("formidable").IncomingForm;
const FileReader = require("filereader");
const jwt = require("jsonwebtoken");
const utils = require("../common/utils");

exports.create = (req, res) => {
  // Save User in the database
  userDao.create(req, (error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

exports.getUserById = (req, res) => {
  userDao.getUserById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro user con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  userDao.updateById(req.params.id, req, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro User con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send({ message: `user was updated successfully!` });
  });
};

exports.deleteById = (req, res) => {
  userDao.deleteById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro usuario con id ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else {
      const userName = data.dataValues.user_name;
      const image = data.dataValues.image_user;
      if (image === userName) {
        // Se elimina la imagen de cloudinary si la imagen no es la default
        cloudinary.api.delete_resources(userName, { invalidate: true, resource_type: "image" }, function (err, res) {
          if (err) {
            console.log("Error en cloudinary :", err);
          }
          console.log("Respuesta De cloudinary: ", res);
        });
      }

      res.send({ message: `Usuario eliminado satisafactoriamente` });
    }
  });
};

exports.getAll = (req, res) => {
  userDao.getAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

exports.deleteAll = (req, res) => {
  userDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send({ message: `Todos los usuarios fueron eliminados correctamente - ${data}` });
  });
};

exports.signIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userDao.signIn(email, password, (error, data) => {
    if (error) return res.status(500).send(error);
    if (data.code.indexOf("W") !== -1) {
      res.send(data);
    } else {
      const token = jwt.sign({ _id: data.id_user }, "secretKey");
      data.token = token;
      res.send(data);
    }
  });
};

exports.signUp = (req, res) => {
  const form = new IncomingForm();
  let file = null;
  form.parse(req, async function (err, fields, files) {
    req.body = fields;
    const email = req.body.email;
    const userName = req.body.userName;
    const response = "U08";
    const data = await validateUser(email, userName);
    if (data === null) {
      return res.status(500).send(utils.createErrorResponse(response, "Error al registrar usuario"));
    }
    if (data.userName || data.email) {
      return res.send(utils.createWarningResponse(response, "", data));
    }

    if (files.file) {
      file = files.file;
      req.body.image = "Usuarios/" + req.body.userName; //si viene una imagen el publicId de cloudinary es el userName
      console.log("------ El usuario ha seleccionado una imagen ------");
    }
    userDao.signUp(req, async function create(error, resp) {
      if (error) return res.status(500).send(error);
      const idUser = resp.data.id_user; // Me quedo con el id del nuevo usuario
      req.body.idUser = idUser; //  Para pasarle al client
      req.body.idOccupation = 1; // TODO
      console.log("IdUSer ", idUser);
      createClientSignUp(idUser, req, file, res, response);
    });
  });
};

exports.getUserByEmail = (req, res) => {
  const email = req.body.email;
  userDao.getUserByEmail(email, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: { message: `No se encontro usuario con email:  ${email}.` },
        });
      } else {
        res.status(500).send(error);
      }
    } else {
      res.send(data);
    }
  });
};

validateUser = (email, userName) => {
  return new Promise((resolve, reject) => {
    // Validate email, username and document?
    userDao.validate(email, userName, (error, datValidate) => {
      if (error) reject(null);
      else {
        let data = {
          email: false,
          userName: false,
        };
        datValidate.forEach((user) => {
          if (user.user_name === userName) {
            data.userName = true;
          }
          if (user.email === email) {
            data.email = true;
          }
        });
        resolve(data);
      }
    });
  });
};

uploadImageCloudinary = (file, userName, req, idUser) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const dataUri = reader.result;
    if (dataUri) {
      cloudinary.uploader.upload(dataUri, { public_id: userName, tags: "Usuarios", folder: "Usuarios" }, function (err, res) {
        if (err) {
          console.log("Error en cloudinary al dar de alta la imagen :", err);
          req.body.image = "Site/defaultUser";
          userDao.updateById(idUser, req, (error, data) => {});
        } else {
          console.log("Se ha creado la imagen en cloudinary correctamente ", JSON.stringify(res));
        }
      });
    }
  };
};

createClientSignUp = (idUser, req, file, res, response) => {
  clientDao.create(req, (error, data) => {
    if (error) {
      // Si da error al crear cliente , se elimina el usuario
      userDao.deleteById(idUser, (error, data) => {
        return res.status(500).send(utils.createErrorResponse(response, "Error al crear usuario", null));
      });
    } else {
      // Si no eligio la imagen por defecto por lo que vino un file
      if (file) {
        const userName = req.body.userName;
        uploadImageCloudinary(file, userName, req, idUser);
      }
      return res.send(utils.createSuccessResponse(response, "Su registro se ha completado correctamente"));
    }
  });
};
