const bookingModel = require("../models/booking.model");

exports.create = (req, result) => {
  const bookingCreate = createBookingModel(req);
  bookingModel
    .create(bookingCreate)
    .then((newBooking) => {
      result(null, newBooking);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
      return;
    });
};

exports.getAll = (result) => {
  bookingModel
    .findAll()
    .then((bookings) => {
      console.log("bookings: ", bookings);
      result(null, bookings);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.getBookingById = (id, result) => {
  bookingModel
    .findOne({ where: { id_booking: id } })
    .then((booking) => {
      if (bookings.length === 0) {
        return result({ kind: "not_found" }, null);
      }
      console.log("booking: ", booking);
      result(null, booking);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.getBookingsByDate = (date, result) => {
  date += "T00:00:00.000Z";
  bookingModel
    .findAll({ where: { date: date } })
    .then((bookings) => {
      if (bookings.length === 0) {
        return result({ kind: "not_found" }, null);
      }
      console.log("bookings: ", bookings);
      result(null, bookings);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.getBookingsByRoom = (idRoom, result) => {
  bookingModel
    .findAll({ where: { id_room: idRoom } })
    .then((bookings) => {
      if (bookings.length === 0) {
        return result({ kind: "not_found" }, null);
      }
      console.log("bookings: ", bookings);
      result(null, bookings);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.getBookingsByUser = (idUser, result) => {
  bookingModel
    .findAll({ where: { id_user: idUser } })
    .then((bookings) => {
      if (bookings.length === 0) {
        return result({ kind: "not_found" }, null);
      }
      console.log("bookings: ", bookings);
      result(null, bookings);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.deleteById = (id, result) => {
  bookingModel
    .destroy({ where: { id_booking: id } })
    .then((bookingModel) => {
      if (!bookingModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("deleted booking with bookingId" + id);

      result(null, bookingModel);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};
exports.deleteAll = (result) => {
  bookingModel
    .destroy({ where: {} })
    .then((bookings) => {
      console.log(`deleted ${bookings} bookings`);
      result(null, bookings);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.updateById = (id, req, result) => {
  const bookingUpdate = createBookingModel(req);

  bookingModel
    .update(bookingUpdate, { where: { id_booking: id } })
    .then(() => {
      bookingModel
        .findByPk(id)
        .then((booking) => {
          if (!booking) {
            return result({ kind: "not_found" }, null);
          }
          console.log("Bookings updated: ", booking);
          result(null, booking);
        })
        .catch((error) => {
          console.log("error: ", error);
          result(error, null);
        });
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

createBookingModel = (req) => {
  return {
    id_user: req.body.idUser,
    id_room: req.body.idRoom,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
  };
};
