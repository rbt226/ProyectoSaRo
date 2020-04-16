const bookingDao = require("../dao/booking.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Save Booking in the database
  bookingDao.create(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Booking.",
      });
    else res.send(data);
  });
};

// Retrieve all Bookings from the database.
exports.getAll = (req, res) => {
  bookingDao.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while retrieving bookings.",
      });
    else res.send(data);
  });
};

exports.getBookingById = (req, res) => {
  bookingDao.getBookingById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Booking with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Booking with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.getBookingsByDate = (req, res) => {
  const date = req.body.date;
  bookingDao.getBookingsByDate(date, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Bookings for the date  ${date}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Bookings for the date  " + rdate,
        });
      }
    } else res.send(data);
  });
};

exports.getBookingsByRoom = (req, res) => {
  const idRoom = req.body.idRoom;
  bookingDao.getBookingsByRoom(idRoom, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Bookings for the room  ${idRoom}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Bookings the room  " + idRoom,
        });
      }
    } else res.send(data);
  });
};

exports.getBookingsByUser = (req, res) => {
  const idUser = req.body.idUser;
  bookingDao.getBookingsByUser(idUser, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Booking for the user  ${idUser}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Booking for the user  " + idUser,
        });
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  bookingDao.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Booking with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Booking with id " + req.params.id,
        });
      }
    } else res.send({ message: `Booking was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  bookingDao.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while removing all bookings.",
      });
    else
      res.send({
        message: `All Bookings were deleted successfully! - ${data}`,
      });
  });
};

exports.updateById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const id = req.params.id;
  bookingDao.updateById(id, req, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Booking with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Booking with id " + id,
        });
      }
    } else res.send({ message: `Booking was updated successfully!` });
  });
};
