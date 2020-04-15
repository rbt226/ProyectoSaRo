const roleDao = require("../dao/role.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Save Role in the database
  roleDao.create(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Role.",
      });
    else res.send(data);
  });
};

// Retrieve all Roles from the database.
exports.getAll = (req, res) => {
  roleDao.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while retrieving roles.",
      });
    else res.send(data);
  });
};

exports.getRoleById = (req, res) => {
  roleDao.getRoleById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Role with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Role with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  roleDao.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Role with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Role with id " + req.params.id,
        });
      }
    } else res.send({ message: `Role was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  roleDao.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while removing all roles.",
      });
    else res.send({ message: `All Roles were deleted successfully! - ${data}` });
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
  roleDao.updateById(id, req, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Role with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Role with id " + id,
        });
      }
    } else res.send({ message: `Role was updated successfully!` });
  });
};
