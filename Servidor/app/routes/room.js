var express = require("express");
var router = express.Router();

var room = require("../controllers/room.controller");

/* POST - Update the room with the specific id */
router.post("/:id", room.update);

/* DELETE - Delete the room with the specific id */
router.delete("/:id", room.delete);

/* GET - Obtain the room with the specific id */
router.get("/:id", room.getRoom);

/* GET - Obtain all rooms. */
router.get("/", room.findAll);

/* POST - Create a room */
router.post("/", room.create);

/* DELETE - Delete all rooms */
router.delete("/", room.deleteAll);

module.exports = router; // esto exporta el modulo
