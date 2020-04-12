var express = require("express");
var router = express.Router();

var booking = require("../controllers/booking.controller");

/* POST - Update the booking with the specific id */
router.post("/:id", booking.update);

/* DELETE - Delete the booking with the specific id */
router.delete("/:id", booking.delete);

/* GET - Obtain the booking with the specific id */
router.get("/:id", booking.getBooking);

/* GET - Obtain all bookings. */
router.get("/", booking.findAll);

/* POST - Create a booking */
router.post("/", booking.create);

/* DELETE - Delete all bookings */
router.delete("/", booking.deleteAll);

module.exports = router; // esto exporta el modulo
