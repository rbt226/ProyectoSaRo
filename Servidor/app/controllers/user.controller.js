const userDao = require("../dao/user.dao");
const clientDao = require("../dao/client.dao");
var cloudinary = require("cloudinary").v2;

// // cloudinary configuration
// cloudinary.config({
//   cloud_name: "djbmfd9y6",
//   api_key: "771838748496195",
//   api_secret: "yn9HS_biy7UuFGtTZVxhIytA7kg",
// });

var jwt = require("jsonwebtoken");

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
      console.log("estoy entrando aca?, ", data);
      const token = jwt.sign({ _id: data.id_user }, "secretKey");
      res.send({ token, data });
    }
  });
};

exports.signUp = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }
  const file = req.body.image;

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

  userDao.signUp(req, (error, data) => {
    const isError = false;
    if (error) {
      isError = true;
    } else {
      const idUser = data.dataValues.id_user; //me quedo con el id del nuevo usuario
      console.log("idUser", idUser);
      req.body.idUser = idUser; // para pasarle al client
      req.body.idOccupation = 1; // TODO
      clientDao.create(req, (error, data) => {
        if (error) {
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
          const token = jwt.sign({ _id: idUser }, "secretKey");
          console.log("token ", token);
          cloudinary.v2.uploader.upload(file, { idUser }, function (err, res) {
            if (err) {
              console.log(
                "error en cloudinary al dar de alta la imagen :",
                err
              );
            } else {
              req.body.image = idUser;
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
            console.log("respuesta", res);
          });

          res.json({ token });
        }
      });
    }
    if (isError)
      res.status(500).send({
        error: { message: "Error al crear usuario" },
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
