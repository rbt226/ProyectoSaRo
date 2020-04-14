const sql = require("../common/db.js");
const utils = require("../common/utils");

// Constructor
const Room = function (room) {
  this.name_room = room.name;
  this.active_room = room.active;
  this.image_room = room.image;
  this.description = room.description;
};

Room.create = (newRoom, result) => {
  sql.query("INSERT INTO room SET ?", newRoom, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created room: ", { id: res.insertId, ...newRoom });
    result(null, { id: res.insertId, ...newRoom });
  });
};

Room.getAll = (result) => {
  sql.query("SELECT * FROM room", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("rooms: ", res);
    result(null, res);
  });
};

Room.getRoom = (id, result) => {
  sql.query(`SELECT * FROM room WHERE id_room = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found room: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Room with the id
    result({ kind: "not_found" }, null);
  });
};

Room.remove = (id, result) => {
  sql.query("DELETE FROM room WHERE id_room= ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Room with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted room with id: ", id);
    result(null, res);
  });
};

Room.removeAll = (result) => {
  sql.query("DELETE FROM room", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} room`);
    result(null, res);
  });
};

Room.updateById = (id, room, result) => {
  var query = utils.updateElement(room, "room", "id_room"); // element, tableName, idTable
  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Room with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated room: ", { id, ...room });
    result(null, { id, ...room });
  });
};

module.exports = Room;
