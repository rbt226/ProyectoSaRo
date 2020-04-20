const configurationDao = require("../dao/configuration.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }

  // Save Configuration in the database
  configurationDao.create(req, (error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

// Retrieve all Configurations from the database.
exports.getAll = (req, res) => {
  configurationDao.getAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

exports.getConfigurationById = (req, res) => {
  configurationDao.getConfigurationById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Configuration con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  configurationDao.deleteById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Configuration con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else res.send({ message: `Configuration was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  configurationDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else
      res.send({
        message: `All Configurations were deleted successfully! - ${data}`,
      });
  });
};

exports.updateById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }
  const id = req.params.id;
  configurationDao.updateById(id, req, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Configuration con el identificador ${id}.`,
          },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else res.send({ message: `Configuration was updated successfully!` });
  });
};
