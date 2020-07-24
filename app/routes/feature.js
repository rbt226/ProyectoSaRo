var express = require("express");
var router = express.Router();

var feature = require("../controllers/feature.controller");

/* POST - Create a feature */
router.post("/", feature.create);

/* POST - Update the feature with the specific id */
router.post("/:id", feature.updateById);

/* DELETE - Delete the feature with the specific id */
router.delete("/:id", feature.deleteById);

/* GET - Obtain the feature with the specific id */
router.get("/:id", feature.getFeatureById);

/* GET - Obtain all features. */
router.get("/", feature.getAll);

/* DELETE - Delete all features */
router.delete("/", feature.deleteAll);

module.exports = router; 
