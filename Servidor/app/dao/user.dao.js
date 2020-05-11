const userModel = require("../models/user.model");
const utils = require("../common/utils");

exports.signIn = (email, password, result) => {
  userModel
    .findOne({ where: { email: email } })
    .then((us) => {
      if (us && us.password === password) {
        result(null, { us });
      } else {
        result({ message: "User or password incorrect" }, null);
      }
    })
    .catch((error) => {
      console.log("Error realizar signIn para el usuario con el siguiente email : ", email);
      utils.handleError(error, result);
    });
};

exports.create = (req, result) => {
  const userCreate = createUserModel(req);
  userModel
    .create(userCreate)
    .then((newUser) => {
      console.log("Se ha creado el usuario satisfactoriamente");
      result(null, newUser);
    })
    .catch((error) => {
      console.log("Error al crear usuario");
      utils.handleError(error, result);
    });
};
exports.signUp = (req, result) => {
  const userCreate = createUserModel(req);
  userCreate.active_user = 0;
  userCreate.id_role = 1;
  userModel
    .create(userCreate)
    .then((newUser) => {
      console.log("Se ha registrado el usuario satisfactoriamente");
      result(null, newUser);
    })
    .catch((error) => {
      console.log("Error al registrar usuario");
      utils.handleError(error, result);
    });
};

exports.getAll = (result) => {
  userModel
    .findAll()
    .then((users) => {
      console.log("Se han obtenidos todos los usuarios satisfactoriamente");
      result(null, users);
    })
    .catch((error) => {
      console.log("Error al obtener todos los usuarios");
      utils.handleError(error, result);
    });
};

exports.getUserById = (id, result) => {
  userModel
    .findOne({ where: { id_user: id } })
    .then((userModel) => {
      if (!userModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("Se ha obtenido el usuario con id: ", id, " satisfactoriamente");
      result(null, userModel);
    })
    .catch((error) => {
      console.log("Error al obtener usuario con id: ", id);
      utils.handleError(error, result);
    });
};

exports.deleteById = (id, result) => {
  userModel
    .findOne({ where: { id_user: id } })
    .then((user) => {
      if (!user) {
        return result({ kind: "not_found" }, null);
      }
      userModel
        .destroy({ where: { id_user: id } })
        .then((userDeleted) => {
          console.log("Se elimino exitosamente el usuario con id: " + id);
          result(null, user);
        })
        .catch((error) => {
          console.log("Error al eliminar usuario con idUser ", id);
          utils.handleError(error, result);
        });
    })
    .catch((error) => {
      console.log("Error al eliminar usuario con idUser ", id);
      utils.handleError(error, result);
    });
};
exports.deleteAll = (result) => {
  userModel
    .destroy({ where: {} })
    .then((users) => {
      console.log("Se eliminaron todos los usuarios correctamente: ", users);
      result(null, users);
    })
    .catch((error) => {
      console.log("Error al eliminar todos los usuarios ");
      utils.handleError(error, result);
    });
};

exports.updateById = (id, req, result) => {
  const userUpdate = createUserModel(req);
  userModel
    .update(userUpdate, { where: { id_user: id } })
    .then((us) => {
      if (us[0] == 0) {
        return result({ kind: "not_found" }, null);
      }
      console.log("Se modifico el usuario con id :", id, "satisfactoriamente");
      result(null, null);
    })
    .catch((error) => {
      console.log("Error al modificar usuario con id :", id);
      utils.handleError(error, result);
    });
};

createUserModel = (req) => {
  return {
    email: req.body.email,
    user_name: req.body.userName,
    mobile_phone: req.body.mobilePhone,
    password: req.body.password,
    image_user: req.body.image ? req.body.image : "Site/default_ghidmx",
    active_user: req.body.active,
    id_role: req.body.idRole,
  };
};

exports.getUserByEmail = (email, result) => {
  userModel
    .findOne({ where: { email: email } })
    .then((userModel) => {
      if (!userModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("Se ha obtenido el usuario con email : ", email, " satisfactoriamente");
      result(null, userModel);
    })
    .catch((error) => {
      console.log("Error al obtener  usuario con email : ", email);
      utils.handleError(error, result);
    });
};
