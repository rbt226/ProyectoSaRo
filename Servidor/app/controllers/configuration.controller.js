const Configuration = require("../dao/configuration.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const configuration = createConfiguration(req);

  // Save Configuration in the database
  Configuration.create(configuration, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the configuration.",
      });
    else res.send(data);
  });
};

// Retrieve all configs from the database.
exports.findAll = (req, res) => {
  Configuration.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving configs.",
      });
    else res.send(data);
  });
};

exports.getConfig = (req, res) => {
  Configuration.getConfig(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found configuration with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving configuration with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Configuration.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found configuration with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete configuration with id " + req.params.id,
        });
      }
    } else res.send({ message: `configuration was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Configuration.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all configurations.",
      });
    else res.send({ message: `All configurations were deleted successfully!` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const configuration = createConfiguration(req);

  Configuration.updateById(req.params.id, configuration, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Configuration with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Configuration with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Create a Configuration
createConfiguration = (req) => {
  return new Configuration({
    key: req.body.key,
    value: req.body.value,
    active: req.body.active,
  });
};
