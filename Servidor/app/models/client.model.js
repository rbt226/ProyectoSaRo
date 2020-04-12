const sql = require("../common/db.js");
const utils = require("../common/utils");

// Constructor
const Client = function (client) {
  this.id_user = client.idUser;
  this.name_client = client.name;
  this.last_name = client.lastName;
  this.document = client.document;
  this.id_occupation = client.idOccupation;
};

Client.create = (newClient, result) => {
  sql.query("INSERT INTO client SET ?", newClient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created client: ", { id: res.insertId, ...newClient });
    result(null, { id: res.insertId, ...newClient });
  });
};

Client.getAll = (result) => {
  sql.query("SELECT * FROM client", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("clients: ", res);
    result(null, res);
  });
};

Client.getClient = (id, result) => {
  sql.query(`SELECT * FROM client WHERE id_client = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found client: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Client with the id
    result({ kind: "not_found" }, null);
  });
};

Client.remove = (id, result) => {
  sql.query("DELETE FROM client WHERE id_client= ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Client with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted client with id: ", id);
    result(null, res);
  });
};

Client.removeAll = (result) => {
  sql.query("DELETE FROM client", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} client`);
    result(null, res);
  });
};

Client.updateById = (id, client, result) => {
  var query = utils.updateElement(client, "client", "id_client"); // element, tableName, idTable
  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Client with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated client: ", { id, ...client });
    result(null, { id, ...client });
  });
};

module.exports = Client;
