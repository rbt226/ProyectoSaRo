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

// console.log("LLamo a cloudinary ", JSON.stringify(cloudinary));
// cloudinary.api.delete_resources(
//   "uciuilekbmhwlzzjfvyf",
//   { invalidate: true, resource_type: "image" },
//   function (err, res) {
//     if (err) {
//       console.log("error en cloudninary :", err);
//       return res.status(400).json({
//         ok: false,
//         menssage: "Error deleting file",
//         errors: err,
//       });
//     }
//     console.log("respuesta", res);
//   }
// );

exports.signUp = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }

  const form = new IncomingForm();
  let defaultImage = true;
  let file;
  form.parse(req, function (err, fields, files) {
    if (files.file) {
      defaultImage = false;
      file = files.file;
    }
    req.body = fields;
    req.body.image = null;
    userDao.signUp(req, (error, data) => {
      let isError = false;
      if (error) {
        isError = true;
      } else {
        const idUser = data.id_user; //me quedo con el id del nuevo usuario
        req.body.idUser = idUser; // para pasarle al client
        req.body.idOccupation = 1; // TODO
        clientDao.create(req, (error, data) => {
          if (error) {
            console.log("Error al crear cliente ", idUser);
            // si da error al crear cliente , se elimina el usuario
            isError = true;
            userDao.deleteById(idUser, (error, data) => {
              if (error) {
                console.log(
                  "Error al eliminar usuario con idUser : ",
                  idUser,
                  error
                );
              } else
                console.log(
                  "Se elimino exitosamente al usuario con idUser : ",
                  idUser
                );
            });
          } else {
            console.log("Se ha creado el cliente satisfactoriamente");
            const token = jwt.sign({ _id: idUser }, "secretKey");
            // si no eligio la imagen por defecto
            if (!defaultImage) {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                const dataUri = reader.result;
                const userName = req.body.userName;
                if (dataUri) {
                  cloudinary.uploader.upload(
                    dataUri,
                    { public_id: userName },
                    function (err, res) {
                      if (err) {
                        console.log(
                          "error en cloudinary al dar de alta la imagen :",
                          err
                        );
                      } else {
                        req.body.image = userName;
                        userDao.updateById(idUser, req, (error, data) => {
                          if (error) {
                            console.log(
                              "Error al modificar la imagen del usuario con id  : ",
                              idUser,
                              error
                            );
                          } else
                            console.log(
                              "Se ha modificado la imagen del usuario con id correctamente  : ",
                              idUser
                            );
                        });
                      }
                      console.log("Respuesta de cloudinary", res);
                    }
                  );
                }
              };
            }
            res.json({ token });
          }
        });
      }
      if (isError)
        res.status(500).send({
          error: { message: "Error al crear usuario" },
        });
    });
  });
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
            message: `No se encontro user con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  userDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else
      res.send({ message: `All users were deleted successfully! - ${data}` });
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
