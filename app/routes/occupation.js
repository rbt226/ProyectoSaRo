var express = require("express");
var router = express.Router();

var occupation = require("../controllers/occupation.controller");

/* POST - Update the Occupation with the specific id */
router.post("/:id", occupation.updateById);

/* DELETE - Delete the occupation with the specific id */
router.delete("/:id", occupation.deleteById);

/* GET - Obtain the occupation with the specific id */
router.get("/:id", occupation.getOccupationById);

/* GET - Obtain all occupations. */
router.get("/", occupation.getAll);

/* POST - Create a Occupation */
router.post("/", occupation.create);

/* DELETE - Delete all occupations */
router.delete("/", occupation.deleteAll);

module.exports = router; // esto exporta el modulo
