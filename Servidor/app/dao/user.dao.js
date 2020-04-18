const userModel = require("../models/user.model");

exports.signIn = (mail, password, result) => {
  userModel
    .findOne({ where: { mail: mail } })
    .then((us) => {
      if (us && us.password === password) {
        result(null, { us });
      } else {
        result("User or password incorrect", null);
      }
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.create = (req, result) => {
  const userCreate = createUserModel(req);
  userModel
    .create(userCreate)
    .then((newUser) => {
      result(null, newUser);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
      return;
    });
};

exports.getAll = (result) => {
  userModel
    .findAll()
    .then((users) => {
      console.log("users: ", users);
      result(null, users);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
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
      console.log("error: ", error);
      result(error, null);
    });
};

exports.deleteById = (id, result) => {
  userModel
    .destroy({ where: { id_user: id } })
    .then((userModel) => {
      if (!userModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("deleted user with userId" + id);

      result(null, userModel);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
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
      console.log("error: ", error);
      result(error, null);
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
      console.log("error: ", error);
      result(error, null);
    });
};

createUserModel = (req) => {
  return {
    mail: req.body.mail,
    user_name: req.body.userName,
    mobile_phone: req.body.mobilePhone,
    password: req.body.password,
    image_user: req.body.image,
    active_user: req.body.active,
    id_role: req.body.idRole,
  };
};
