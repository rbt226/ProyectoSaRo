const sql = require("../common/db.js");
const utils = require("../common/utils");

// Constructor
const Occupation = function (occupation) {
  this.type_occupation = occupation.type;
  this.active_occupation = occupation.active;
  this.image_occupation = occupation.image;
};

Occupation.create = (newOccupation, result) => {
  sql.query("INSERT INTO occupation SET ?", newOccupation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created occupation: ", { id: res.insertId, ...newOccupation });
    result(null, { id: res.insertId, ...newOccupation });
  });
};

Occupation.getAll = (result) => {
  sql.query("SELECT * FROM occupation", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("occupations: ", res);
    result(null, res);
  });
};

Occupation.getOccupation = (id, result) => {
  sql.query(`SELECT * FROM occupation WHERE id_occupation = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found occupation: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Occupation with the id
    result({ kind: "not_found" }, null);
  });
};

Occupation.remove = (id, result) => {
  sql.query("DELETE FROM occupation WHERE id_occupation= ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Occupation with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted occupation with id: ", id);
    result(null, res);
  });
};

Occupation.removeAll = (result) => {
  sql.query("DELETE FROM occupation", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} occupation`);
    result(null, res);
  });
};

Occupation.updateById = (id, occupation, result) => {
  console.log("model ", occupation);
  var query = utils.updateElement(occupation, "occupation", "id_occupation"); // element, tableName, idTable
  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Occupation with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated occupation: ", { id, ...occupation });
    result(null, { id, ...occupation });
  });
};

module.exports = Occupation;
