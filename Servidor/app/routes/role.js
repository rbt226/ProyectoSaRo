var express = require("express");
var router = express.Router();

var role = require("../controllers/role.controller");

// PUT Update a Role with IdRole
router.post("/:idRole", role.update);

router.delete("/:idRole", role.delete);

router.get("/:idRole", role.getRole);

/* GET all roles. */
router.get("/", role.findAll);

/* POST create a Role */
router.post("/", role.create);

router.delete("/", role.deleteAll);






module.exports = router; // esto exporta el modulo
