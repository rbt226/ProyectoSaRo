var express = require("express");
var router = express.Router();

var role = require("../controllers/role.controller");

/* POST - Update the Role with the specific id */
router.post("/:id", role.update);

/* DELETE - Delete the role with the specific id */
router.delete("/:id", role.delete);

/* GET - Obtain the role with the specific id */
router.get("/:id", role.getRole);

/* GET - Obtain all roles. */
router.get("/", role.findAll);

/* POST - Create a Role */
router.post("/", role.create);

/* DELETE - Delete all roles */
router.delete("/", role.deleteAll);


module.exports = router; // esto exporta el modulo
