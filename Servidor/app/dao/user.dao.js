const userModel = require("../models/user.model");
const utils = require("../common/utils");

exports.signIn = (mail, password, result) => {
  userModel
    .findOne({ where: { mail: mail } })
    .then((us) => {
      console.log("qiuen es us ", us);
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
    mail: req.body.mail,
    user_name: req.body.userName,
    mobile_phone: req.body.mobilePhone,
    password: req.body.password,
    image_user: req.body.image,
    active_user: req.body.active,
    id_role: req.body.idRole,
  };
};
