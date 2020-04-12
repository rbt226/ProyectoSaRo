const sql = require("../common/db.js");
const utils = require("../common/utils");

// constructor
const Role = function (role) {
  this.name_role = role.name;
};

Role.create = (newRole, result) => {
  sql.query("INSERT INTO role SET ?", newRole, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created role: ", { id: res.insertId, ...newRole });
    result(null, { id: res.insertId, ...newRole });
  });
};

Role.getAll = (result) => {
  sql.query("SELECT * FROM role", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("roles: ", res);
    result(null, res);
  });
};

Role.getRole = (id, result) => {
  sql.query(`SELECT * FROM role WHERE id_role = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found role: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Role with the id
    result({ kind: "not_found" }, null);
  });
};

Role.remove = (id, result) => {
  sql.query("DELETE FROM role WHERE id_role = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Role with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted role with id: ", id);
    result(null, res);
  });
};

Role.removeAll = (result) => {
  sql.query("DELETE FROM role", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} role`);
    result(null, res);
  });
};

Role.updateById = (id, role, result) => {
  var query = utils.updateElement(role, "role", "id_role"); // element, tableName, idTable
  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated role: ", { id, ...role });
    result(null, { id, ...role });
  });
};

module.exports = Role;
