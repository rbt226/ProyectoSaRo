const clientDao = require("../dao/client.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Save Client in the database
  clientDao.create(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Client.",
      });
    else res.send(data);
  });
};

// Retrieve all Clients from the database.
exports.getAll = (req, res) => {
  clientDao.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while retrieving clients.",
      });
    else res.send(data);
  });
};

exports.getClientById = (req, res) => {
  clientDao.getClientById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Client with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Client with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  clientDao.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Client with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Client with id " + req.params.id,
        });
      }
    } else res.send({ message: `Client was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  clientDao.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while removing all clients.",
      });
    else res.send({ message: `All Clients were deleted successfully! - ${data}` });
  });
};

exports.updateById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const id = req.params.id;
  clientDao.updateById(id, req, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Client with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Client with id " + id,
        });
      }
    } else res.send({ message: `Client was updated successfully!` });
  });
};
