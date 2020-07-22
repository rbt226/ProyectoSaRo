var express = require("express");
var router = express.Router();

var config = require("../controllers/configuration.controller");

/* POST - Update the Configuration with the specific id */
router.post("/:id", config.updateById);

/* DELETE - Delete the configuration with the specific id */
router.delete("/:id", config.deleteById);

/* GET - Obtain the configuration with the specific id */
router.get("/:id", config.getConfigurationById);

/* GET - Obtain all configurations. */
router.get("/", config.getAll);

/* POST - Create a Configuration */
router.post("/", config.create);

/* DELETE - Delete all configurations */
router.delete("/", config.deleteAll);

module.exports = router; // esto exporta el modulo
