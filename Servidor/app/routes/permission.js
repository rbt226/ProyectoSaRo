var express = require("express");
var router = express.Router();

var permission = require("../controllers/permission.controller");

/* POST - Update the Permission with the specific id */
router.post("/:id", permission.updateById);

/* DELETE - Delete the permission with the specific id */
router.delete("/:id", permission.deleteById);

/* GET - Obtain the permission with the specific id */
router.get("/:id", permission.getPermissionById);

/* GET - Obtain all permissions. */
router.get("/", permission.getAll);

/* POST - Create a Permission */
router.post("/", permission.create);

/* DELETE - Delete all permissions */
router.delete("/", permission.deleteAll);

module.exports = router;
