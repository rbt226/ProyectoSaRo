const userDao = require("../dao/user.dao");
const clientDao = require("../dao/client.dao");
const cloudinary = require("cloudinary").v2;
const IncomingForm = require("formidable").IncomingForm;
const FileReader = require("filereader");
const jwt = require("jsonwebtoken");

exports.signIn = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  userDao.signIn(email, password, (error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else {
      const token = jwt.sign({ _id: data.id_user }, "secretKey");
      res.send({ token, data });
    }
  });
};

exports.signUp = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }
  const form = new IncomingForm();
  let file = null;
  form.parse(req, function (err, fields, files) {
    req.body = fields;

    if (files.file) {
      file = files.file;
      req.body.image = req.body.userName; //si viene una imagen el publicId de cloudinary es el userName
      console.log("------ El usuario ha seleccionado una imagen ------");
    }
    userDao.signUp(req, async function create(error, data) {
      if (error) {
        return res.status(500).send({
          error: { message: "Error al crear usuario" },
        });
      }
      const idUser = data.id_user; //me quedo con el id del nuevo usuario
      req.body.idUser = idUser; // para pasarle al client
      req.body.idOccupation = 1; // TODO
      isError = createClientSignUp(idUser, req, file, res);
    });
  });
};

createClientSignUp = (idUser, req, file, res) => {
  clientDao.create(req, (error, data) => {
    if (error) {
      // Si da error al crear cliente , se elimina el usuario
      userDao.deleteById(idUser, (error, data) => {
        return res.status(500).send({
          error: { message: "Error al crear usuario" },
        });
      });
    } else {
      // Si no eligio la imagen por defecto por lo que vino un file
      if (file) {
        const userName = req.body.userName;
        uploadImageCloudinary(file, userName, req, idUser);
      }
      console.log("------ Se termino el proceso de registro exitosamente, se le asigna un token al usuario con id ", idUser, " ------");
      const token = jwt.sign({ _id: idUser }, "secretKey");
      return res.json({ token });
    }
  });
};

uploadImageCloudinary = (file, userName, req, idUser) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const dataUri = reader.result;
    if (dataUri) {
      cloudinary.uploader.upload(dataUri, { public_id: userName }, function (err, res) {
        if (err) {
          console.log("Error en cloudinary al dar de alta la imagen :", err);
          req.body.image = "Site/default_ghidmx";
          userDao.updateById(idUser, req, (error, data) => {});
        } else {
          console.log("Se ha creado la imagen en cloudinary exitosamente ", JSON.stringify(res));
        }
      });
    }
  };
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }

  // Save User in the database
  userDao.create(req, (error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

// Retrieve all users from the database.
exports.getAll = (req, res) => {
  userDao.getAll((error, data) => {
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
        res.status(500).send({
          error,
        });
      }
    } else res.send(data);
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
        res.status(500).send({
          error,
        });
      }
    } else {
      const userName = data.dataValues.user_name;
      const image = data.dataValues.image_user;
      if (image === userName) {
        // Se elimina la imagen de cloudinary si la imagen no es la default
        cloudinary.api.delete_resources(userName, { invalidate: true, resource_type: "image" }, function (err, res) {
          if (err) {
            console.log("Error en cloudninary :", err);
          }
          console.log("Respuesta De cloudinary: ", res);
        });
      }

      res.send({ message: `Usuario eliminado satisafactoriamente` });
    }
  });
};

exports.deleteAll = (req, res) => {
  userDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send({ message: `All users were deleted successfully! - ${data}` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }

  userDao.updateById(req.params.id, req, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro User con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else res.send({ message: `user was updated successfully!` });
  });
};

exports.getUserByEmail = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }
  console.log("Controller body : ", JSON.stringify(req.body));
  const email = req.body.email;
  userDao.getUserByEmail(email, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: { message: `No se encontro usuario con email:  ${email}.` },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else {
      res.send(data);
    }
  });
};
