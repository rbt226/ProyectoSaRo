const configurationDao = require("../dao/configuration.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Save Configuration in the database
  configurationDao.create(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Configuration.",
      });
    else res.send(data);
  });
};

// Retrieve all Configurations from the database.
exports.getAll = (req, res) => {
  configurationDao.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while retrieving configurations.",
      });
    else res.send(data);
  });
};

exports.getConfigurationById = (req, res) => {
  configurationDao.getConfigurationById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Configuration with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Configuration with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  configurationDao.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Configuration with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Configuration with id " + req.params.id,
        });
      }
    } else res.send({ message: `Configuration was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  configurationDao.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while removing all configurations.",
      });
    else res.send({ message: `All Configurations were deleted successfully! - ${data}` });
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
  configurationDao.updateById(id, req, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Configuration with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Configuration with id " + id,
        });
      }
    } else res.send({ message: `Configuration was updated successfully!` });
  });
};
