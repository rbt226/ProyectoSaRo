var express = require("express");
var router = express.Router();

var booking = require("../controllers/booking.controller");

/* POST - Get a Booking By Date */
router.post("/byDate", booking.getBookingByDate);

/* POST - Update the Booking with the specific id */
router.post("/:id", booking.updateById);

/* DELETE - Delete the booking with the specific id */
router.delete("/:id", booking.deleteById);

/* GET - Obtain the booking with the specific id */
router.get("/:id", booking.getBookingById);

/* GET - Obtain all bookings. */
router.get("/", booking.getAll);

/* POST - Create a Booking */
router.post("/", booking.create);

/* DELETE - Delete all bookings */
router.delete("/", booking.deleteAll);

module.exports = router; // esto exporta el modulo
