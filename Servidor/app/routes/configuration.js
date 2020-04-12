var express = require("express");
var router = express.Router();

var config = require("../controllers/configuration.controller");

/* POST - Update the config with the specific id */
router.post("/:id", config.update);

/* DELETE - Delete the configuration with the specific id */
router.delete("/:id", config.delete);

/* GET - Obtain the configuration with the specific id */
router.get("/:id", config.getConfig);

/* GET - Obtain all configurations. */
router.get("/", config.findAll);

/* POST - Create a configuration */
router.post("/", config.create);
 
/* DELETE - Delete all configurations */
router.delete("/", config.deleteAll);

module.exports = router; // esto exporta el modulo
