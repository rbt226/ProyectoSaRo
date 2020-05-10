const userModel = require("../models/user.model");
const utils = require("../common/utils");

exports.signIn = (email, password, result) => {
<<<<<<< HEAD
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
            console.log("HANDLER ERROR ? ", error);
            utils.handleError(error, result);
        });
=======
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
      utils.handleError(error, result);
    });
>>>>>>> Se agrega logica para el signIn
};

exports.create = (req, result) => {
    const userCreate = createUserModel(req);
    userModel
        .create(userCreate)
        .then((newUser) => {
            result(null, newUser);
        })
        .catch((error) => {
            utils.handleError(error, result);
        });
};
exports.signUp = (req, result) => {
<<<<<<< HEAD
    const userCreate = createUserModel(req);
    userCreate.active_user = 0;
    userCreate.id_role = 1;
    userModel
        .create(userCreate)
        .then((newUser) => {
            result(null, newUser);
        })
        .catch((error) => {
            utils.handleError(error, result);
        });
=======
  const userCreate = createUserModel(req);
  userCreate.active_user = 0;
  userCreate.id_role = 1;

  userModel
    .create(userCreate)
    .then((newUser) => {
      result(null, newUser);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
>>>>>>> Se agrega logica para el signIn
};

exports.getAll = (result) => {
    userModel
        .findAll()
        .then((users) => {
            console.log("users: ", users);
            result(null, users);
        })
        .catch((error) => {
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
            console.log("user: ", userModel);
            result(null, userModel);
        })
        .catch((error) => {
            utils.handleError(error, result);
        });
};

exports.deleteById = (id, result) => {
  console.log("estoy eliminando el usuario");
  userModel
    .destroy({ where: { id_user: id } })
    .then((userModel) => {
      if (!userModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("Deleted user with userId" + id);

      result(null, userModel);
    })
    .catch((error) => {
      console.log("Error al borrar usuario ", error);
      utils.handleError(error, result);
    });
};
exports.deleteAll = (result) => {
    userModel
        .destroy({ where: {} })
        .then((users) => {
            console.log(`deleted ${users} users`);
            result(null, users);
        })
        .catch((error) => {
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
            console.log("updated user: ", us);
            result(null, null);
        })
        .catch((error) => {
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
    console.log("Dao email : ", email);
    userModel
        .findOne({ where: { email: email } })
        .then((userModel) => {
            console.log("then Dao");
            if (!userModel) {
                return result({ kind: "not_found" }, null);
            }
            result(null, userModel);
        })
        .catch((error) => {
            console.log("Error", error);
            utils.handleError(error, result);
        });
};