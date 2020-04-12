const sql = require("../common/db.js");
const utils = require("../common/utils");

// constructor
const Permission = function (permission) {
  this.type_permission = permission.type;
};

Permission.create = (newPermission, result) => {
  sql.query("INSERT INTO permission SET ?", newPermission, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created permission: ", { id: res.insertId, ...newPermission });
    result(null, { id: res.insertId, ...newPermission });
  });
};

Permission.getAll = (result) => {
  sql.query("SELECT * FROM permission", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("permissions: ", res);
    result(null, res);
  });
};

Permission.getPermission = (id, result) => {
  sql.query(
    `SELECT * FROM permission WHERE id_permission = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found permission: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Permission with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Permission.remove = (id, result) => {
  sql.query(
    "DELETE FROM permission WHERE id_permission = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Permission with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted permission with id: ", id);
      result(null, res);
    }
  );
};

Permission.removeAll = (result) => {
  sql.query("DELETE FROM permission", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} permission`);
    result(null, res);
  });
};

Permission.updateById = (id, permission, result) => {
  var query = utils.updateElement(permission, "permission", "id_permission"); // element, tableName, idTable
  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Permission with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated permission: ", { id, ...permission });
    result(null, { id, ...permission });
  });
};

module.exports = Permission;
