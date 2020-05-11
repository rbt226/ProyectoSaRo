var express = require("express");
var router = express.Router();

var client = require("../controllers/client.controller");

/* POST - Update the Client with the specific id */
router.post("/:id", client.updateById);

/* DELETE - Delete the client with the specific idUser */
router.delete("/deleteByUser/:id", client.deleteByUserId);

/* DELETE - Delete the client with the specific id */
router.delete("/:id", client.deleteById);

/* GET - Obtain the client with the specific id */
router.get("/:id", client.getClientById);

/* GET - Obtain all clients. */
router.get("/", client.getAll);

/* POST - Create a Client */
router.post("/", client.create);

/* DELETE - Delete all clients */
router.delete("/", client.deleteAll);

module.exports = router; // esto exporta el modulo
