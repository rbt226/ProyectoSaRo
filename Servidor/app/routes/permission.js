var express = require("express");
var router = express.Router();

var permission = require("../controllers/permission.controller");

// PUT Update a permission with Idpermission
router.post("/:idPermission", permission.update);

router.delete("/:idPermission", permission.delete);

router.get("/:idPermission", permission.getPermission);

/* GET all permissions. */
router.get("/", permission.findAll);

/* POST create a permission */
router.post("/", permission.create);

router.delete("/", permission.deleteAll);




module.exports = router; // esto exporta el modulo
