const userModel = require("../models/user.model");
const utils = require("../common/utils");

exports.create = (req, result) => {
  const userCreate = createUserModel(req);
  userModel
    .create(userCreate)
    .then((newUser) => {
      console.log("Se ha creado el usuario correctamente");
      result(null, newUser);
    })
    .catch((error) => {
      console.log("Error al crear usuario");
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
      console.log("Se ha obtenido el usuario con id: ", id, " correctamente");
      result(null, userModel);
    })
    .catch((error) => {
      console.log("Error al obtener usuario con id: ", id);
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
      console.log("Se modifico el usuario con id :", id, "correctamente");
      result(null, null);
    })
    .catch((error) => {
      console.log("Error al modificar usuario con id :", id);
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
          console.log("Se elimino correctamente el usuario con id: " + id);
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

exports.getAll = (result) => {
  userModel
    .findAll()
    .then((users) => {
      console.log("Se han obtenidos todos los usuarios correctamente");
      result(null, users);
    })
    .catch((error) => {
      console.log("Error al obtener todos los usuarios");
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

exports.signIn = (email, password, result) => {
  const response = "U07";
  userModel
    .findOne({ where: { email: email } })
    .then((us) => {
      if (us && us.password === password) {
        const user = createResponseUser(us);
        result(null, utils.createSuccessResponse(response, "", user));
      } else {
        result(null, utils.createWarningResponse(response, "Usuario o contraseña incorrecta"));
      }
    })
    .catch((error) => {
      console.log("Error realizar signIn para el usuario con el siguiente email : ", email);
      utils.handleError(error, result, response);
    });
};

exports.signUp = (req, result) => {
  const userCreate = createUserModel(req);
  userCreate.active_user = 0;
  userCreate.id_role = 1;
  userModel
    .create(userCreate)
    .then((newUser) => {
      console.log("Se ha registrado el usuario correctamente");
      result(null, newUser);
    })
    .catch((error) => {
      console.log("Error al registrar usuario");
      utils.handleError(error, result);
    });
};

exports.getUserByEmail = (email, result) => {
  const response = "U09";
  userModel
    .findOne({ where: { email: email } })
    .then((userModel) => {
      if (!userModel) {
        return result(null, utils.createWarningResponse(response, "El email ingresado no esta registrado"));
      }
      console.log("Se ha obtenido el usuario con email : ", email, " correctamente");
      const user = createResponseUser(userModel);
      return result(null, utils.createSuccessResponse(response, "", user));
    })
    .catch((error) => {
      console.log("Error al obtener  usuario con email : ", email);
      utils.handleError(error, result, response);
    });
};

exports.validate = (email, userName, result) => {
  console.log("validate ", email, userName);
  userModel
    .findAll({
      where: {
        [userModel.operator.or]: [{ email: email }, { user_name: userName }],
      },
    })
    .then((users) => {
      if (!users) {
        console.log("No se han encontrado usuarios con email: ", email, " o con userName ", userName);
        return result(null, null);
      }

      result(null, users);
    })
    .catch((error) => {
      console.log("Error al obtener usuario con email: ", email, " o con userName ", userName);
      utils.handleError(error, result);
    });
};

createResponseUser = (user) => {
  return {
    user_name: user.user_name,
    image_user: user.image_user,
    active_user: user.active_user,
    id_role: user.id_role,
  };
};

createUserModel = (req) => {
  return {
    email: req.body.email,
    user_name: req.body.userName,
    mobile_phone: req.body.mobilePhone,
    password: req.body.password,
    image_user: req.body.image ? req.body.image : "Site/defaultUser",
    active_user: req.body.active,
    id_role: req.body.idRole,
  };
};
