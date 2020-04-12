var express = require("express");
var router = express.Router();

var client = require("../controllers/client.controller");

/* POST - Update the client with the specific id */
router.post("/:id", client.update);

/* DELETE - Delete the client with the specific id */
router.delete("/:id", client.delete);

/* GET - Obtain the client with the specific id */
router.get("/:id", client.getClient);

/* GET - Obtain all clients. */
router.get("/", client.findAll);

/* POST - Create a client */
router.post("/", client.create);

/* DELETE - Delete all clients */
router.delete("/", client.deleteAll);

module.exports = router; // esto exporta el modulo
