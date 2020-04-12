const Permission = require("../models/permission.model");

exports.create = (req, res) => {
  // Validate request
  debugger;
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Permission
  const permission = new Permission({
    type: req.body.type,
  });

  // Save Permission in the database
  Permission.create(permission, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Permission.",
      });
    else res.send(data);
  });
};

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
  Permission.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving permissions.",
      });
    else res.send(data);
  });
};

exports.getPermission = (req, res) => {
  Permission.getPermission(req.params.id, (err, data) => {
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

exports.delete = (req, res) => {
  Permission.remove(req.params.id, (err, data) => {
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
  Permission.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all permissions.",
      });
    else res.send({ message: `All Roles were deleted successfully!` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Permission
  const permission = new Permission({
    type: req.body.type,
  });

  Permission.updateById(
    req.params.id,
    permission,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Permission with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Permission with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
