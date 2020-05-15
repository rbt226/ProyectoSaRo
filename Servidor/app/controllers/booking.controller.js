const bookingDao = require("../dao/booking.dao");

exports.create = (req, res) => {
  // Save Booking in the database
  bookingDao.create(req, (error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

// Retrieve all Bookings from the database.
exports.getAll = (req, res) => {
  bookingDao.getAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

exports.getBookingById = (req, res) => {
  bookingDao.getBookingById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Booking con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send(data);
  });
};

exports.getBookingsByDate = (req, res) => {
  const date = req.body.date;
  bookingDao.getBookingsByDate(date, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: { message: `No se encontro Bookings for the date  ${date}.` },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send(data);
  });
};

exports.getBookingsByRoom = (req, res) => {
  const idRoom = req.body.idRoom;
  bookingDao.getBookingsByRoom(idRoom, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Bookings for the room  ${idRoom}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send(data);
  });
};

exports.getBookingsByUser = (req, res) => {
  const idUser = req.body.idUser;
  bookingDao.getBookingsByUser(idUser, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: { message: `No se encontro Booking for the user  ${idUser}.` },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  bookingDao.deleteById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Booking con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send({ message: `Booking was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  bookingDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else
      res.send({
        message: `All Bookings were deleted successfully! - ${data}`,
      });
  });
};

exports.updateById = (req, res) => {
  const id = req.params.id;
  bookingDao.updateById(id, req, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Booking con el identificador ${id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send({ message: `Booking was updated successfully!` });
  });
};
