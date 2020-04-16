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

exports.getBookingByDate = (req, res) => {
  bookingDao.getBookingByDate(req.body.date, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Booking for the date  ${req.body.date}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Booking for the date  " + req.body.date,
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
