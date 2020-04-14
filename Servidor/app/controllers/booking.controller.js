const Booking = require("../dao/booking.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const booking = createBooking(req);

  // Save Booking in the database
  Booking.create(booking, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the booking.",
      });
    else res.send(data);
  });
};

// Retrieve all bookings from the database.
exports.findAll = (req, res) => {
  Booking.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookings.",
      });
    else res.send(data);
  });
};

exports.getBooking = (req, res) => {
  Booking.getBooking(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found booking with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving booking with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Booking.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found booking with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete booking with id " + req.params.id,
        });
      }
    } else res.send({ message: `booking was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Booking.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all bookings.",
      });
    else res.send({ message: `All bookings were deleted successfully!` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const booking = createBooking(req);

  Booking.updateById(req.params.id, booking, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Booking with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Booking with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.getBookingsByDate = (req, res) => {
  const date = req.body.date;
  console.log("viene en el body " + date);
  Booking.getBookingsByDate(date, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving by date.",
      });
    else res.send(data);
  });
};

// Create a Booking
createBooking = (req) => {
  return new Booking({
    idUser: req.body.idUser,
    idRoom: req.body.idRoom,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
  });
};
