const Client = require("../dao/client.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const client = createClient(req);

  // Save Client in the database
  Client.create(client, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the client.",
      });
    else res.send(data);
  });
};

// Retrieve all clients from the database.
exports.findAll = (req, res) => {
  Client.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while retrieving clients.",
      });
    else res.send(data);
  });
};

exports.getClient = (req, res) => {
  Client.getClient(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found client with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving client with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Client.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found client with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete client with id " + req.params.id,
        });
      }
    } else res.send({ message: `client was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Client.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while removing all clients.",
      });
    else res.send({ message: `All clients were deleted successfully!` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const client = createClient(req);

  Client.updateById(req.params.id, client, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Client with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Client with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Create a Client
createClient = (req) => {
  return new Client({
    idUser: req.body.idUser,
    name: req.body.name,
    lastName: req.body.lastName,
    document: req.body.document,
    idOccupation: req.body.idOccupation,
  });
};
