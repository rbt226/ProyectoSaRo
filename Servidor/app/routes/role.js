var express = require("express");
var router = express.Router();

var role = require("../controllers/role.controller");

/* GET all roles. */
router.get("/", role.findAll);
/* POST create a Role */
router.post("/", role.create);

router.delete("/", role.deleteAll);

router.delete("/:idRole", role.delete);

router.get("/:idRole", role.getRole);

// Create a new Customer

module.exports = router; // esto exporta el modulo
