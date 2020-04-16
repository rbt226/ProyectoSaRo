const permissionDao = require("../dao/permission.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Save Permission in the database
  permissionDao.create(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Permission.",
      });
    else res.send(data);
  });
};

// Retrieve all Permissions from the database.
exports.getAll = (req, res) => {
  permissionDao.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while retrieving permissions.",
      });
    else res.send(data);
  });
};

exports.getPermissionById = (req, res) => {
  permissionDao.getPermissionById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Permission with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Permission with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  permissionDao.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Permission with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Permission with id " + req.params.id,
        });
      }
    } else res.send({ message: `Permission was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  permissionDao.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while removing all permissions.",
      });
    else res.send({ message: `All Permissions were deleted successfully! - ${data}` });
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
  permissionDao.updateById(id, req, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Permission with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Permission with id " + id,
        });
      }
    } else res.send({ message: `Permission was updated successfully!` });
  });
};
