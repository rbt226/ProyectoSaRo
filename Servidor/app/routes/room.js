var express = require("express");
var router = express.Router();

var room = require("../controllers/room.controller");

/* POST - Update the Room with the specific id */
router.post("/:id", room.updateById);

/* DELETE - Delete the room with the specific id */
router.delete("/:id", room.deleteById);

/* GET - Obtain the room with the specific id */
router.get("/:id", room.getRoomById);

/* GET - Obtain all rooms. */
router.get("/", room.getAll);

/* POST - Create a Room */
router.post("/", room.create);

/* DELETE - Delete all rooms */
router.delete("/", room.deleteAll);


module.exports = router; // esto exporta el modulo