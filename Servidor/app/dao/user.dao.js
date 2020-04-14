const sql = require("../common/db.js");
const utils = require("../common/utils");
const user = require("../models/user.model");
// Constructor
const User = function (user) {
  this.mail = user.mail;
  this.user_name = user.userName;
  this.mobile_phone = user.mobilePhone;
  this.password = user.password;
  this.image_user = user.image;
  this.active_user = user.active;
  this.id_role = user.idRole;
};

User.signIn = (userName, password, result) => {
  user
    .findOne({ where: { user_name: userName } })
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

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.getAll = (result) => {
  user
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

User.getUserById = (id, result) => {
  user
    .findOne({ where: { id_user: id } })
    .then((user) => {
      if (!user) {
        return result({ kind: "not_found" }, null);
      }
      console.log("user: ", user);
      result(null, user);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

User.deleteById = (id, result) => {
  user
    .destroy({ where: { id_user: id } })
    .then((user) => {
      if (!user) {
        return result({ kind: "not_found" }, null);
      }
      result(null, user);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};
User.deleteAll = (result) => {
  console.log("entre aca?");
  user
    .destroy({ where: {} })
    .then((users) => {
      console.log(`deleted ${t his.arguments} users`);
      result(null, users);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

// User.removeAll = (result) => {
//   sql.query("DELETE FROM user", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} user`);
//     result(null, res);
//   });
// };

User.updateById = (id, user, result) => {
  var query = utils.updateElement(user, "user", "id_user"); // element, tableName, idTable
  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated user: ", { id, ...user });
    result(null, { id, ...user });
  });
};

module.exports = User;
