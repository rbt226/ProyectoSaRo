const sql = require("../common/db.js");
const utils = require("../common/utils");
const dateFormat = require("dateformat");

// Constructor
const Booking = function (booking) {
  this.id_user = booking.idUser;
  this.id_room = booking.idRoom;
  this.date = booking.date;
  this.start = booking.start;
  this.end = booking.end;
};

Booking.create = (newBooking, result) => {
  sql.query("INSERT INTO booking SET ?", newBooking, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created booking: ", { id: res.insertId, ...newBooking });
    result(null, { id: res.insertId, ...newBooking });
  });
};

Booking.getAll = (result) => {
  sql.query("SELECT * FROM booking", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("bookings: ", res);
    result(null, res);
  });
};

Booking.getBooking = (id, result) => {
  sql.query(`SELECT * FROM booking WHERE id_booking = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found booking: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Booking with the id
    result({ kind: "not_found" }, null);
  });
};

Booking.remove = (id, result) => {
  sql.query("DELETE FROM booking WHERE id_booking= ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Booking with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted booking with id: ", id);
    result(null, res);
  });
};

Booking.removeAll = (result) => {
  sql.query("DELETE FROM booking", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} booking`);
    result(null, res);
  });
};

Booking.updateById = (id, booking, result) => {
  var query = utils.updateElement(booking, "booking", "id_booking"); // element, tableName, idTable
  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Booking with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated booking: ", { id, ...booking });
    result(null, { id, ...booking });
  });
};

Booking.getBookingsByDate = (date, result) => {
  date += "T00:00:00.000Z";
  console.log("getBookingsByDate en el model " + date);
  sql.query("SELECT * FROM booking WHERE date = ?", date, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found booking: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Booking with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Booking;
