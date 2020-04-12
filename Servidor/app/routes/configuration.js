var express = require("express");
var router = express.Router();

var config = require("../controllers/configuration.controller");

/* GET -  obtain a specifig config with idConfig  */

router.get("/:id", config.getConfig);

/* GET - obtain all the configs. */
router.get("/", config.findAll);


/* POST -  create a config */
router.post("/", config.create);

/* DELETE delete a specific config with idConfig*/
router.delete("/:id", config.delete);

/* DELETE delete all config */
router.delete("/", config.deleteAll);


module.exports = router; // esto exporta el modulo
