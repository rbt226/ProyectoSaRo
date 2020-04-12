var express = require("express");
var router = express.Router();

var user = require("../controllers/user.controller");

/* POST - Update the user with the specific id */
router.post("/:id", user.update);

/* DELETE - Delete the user with the specific id */
router.delete("/:id", user.delete);

/* GET - Obtain the user with the specific id */
router.get("/:id", user.getUser);

/* GET - Obtain all users. */
router.get("/", user.findAll);

/* POST - Create a user */
router.post("/", user.create);

/* DELETE - Delete all users */
router.delete("/", user.deleteAll);

module.exports = router; // esto exporta el modulo
