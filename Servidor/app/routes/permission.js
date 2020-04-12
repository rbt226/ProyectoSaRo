var express = require("express");
var router = express.Router();

var permission = require("../controllers/permission.controller");

/* POST - Update the permission with the specific id */
router.post("/:id", permission.update);

/* DELETE - Delete the permission with the specific id */
router.delete("/:id", permission.delete);

/* GET - Obtain the permission with the specific id */
router.get("/:id", permission.getPermission);

/* GET - Obtain all permissions. */
router.get("/", permission.findAll);

/* POST - Create a permission */
router.post("/", permission.create);

/* DELETE - Delete all permissions */
router.delete("/", permission.deleteAll);

module.exports = router; // esto exporta el modulo
