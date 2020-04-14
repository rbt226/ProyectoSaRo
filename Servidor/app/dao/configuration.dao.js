const sql = require("../common/db.js");
const utils = require("../common/utils");

// Constructor
const Configuration = function (config) {
  this.key_conf = config.key;
  this.value_conf = config.value;
  this.active_conf = config.active;
};

Configuration.create = (newConfig, result) => {
  sql.query("INSERT INTO configuration SET ?", newConfig, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created configuration: ", { id: res.insertId, ...newConfig });
    result(null, { id: res.insertId, ...newConfig });
  });
};

Configuration.getAll = (result) => {
  sql.query("SELECT * FROM configuration", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("configurations: ", res);
    result(null, res);
  });
};

Configuration.getConfig = (id, result) => {
  sql.query(`SELECT * FROM configuration WHERE id_conf = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found config: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Configuration with the id
    result({ kind: "not_found" }, null);
  });
};

Configuration.remove = (id, result) => {
  sql.query("DELETE FROM configuration WHERE id_conf= ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Configuration with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted config with id: ", id);
    result(null, res);
  });
};

Configuration.removeAll = (result) => {
  sql.query("DELETE FROM configuration", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} config`);
    result(null, res);
  });
};

Configuration.updateById = (id, config, result) => {
  var query = utils.updateElement(config, "configuration", "id_conf"); // element, tableName, idTable
  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Configuration with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated configuration: ", { id, ...config });
    result(null, { id, ...config });
  });
};

module.exports = Configuration;
