const Role = require("../dao/role.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const role = createRole(req);

  // Save Role in the database
  Role.create(role, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Role.",
      });
    else res.send(data);
  });
};

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
  Role.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving roles.",
      });
    else res.send(data);
  });
};

exports.getRole = (req, res) => {
  Role.getRole(req.params.id, (err, data) => {
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

exports.delete = (req, res) => {
  Role.remove(req.params.id, (err, data) => {
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
  Role.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all roles.",
      });
    else res.send({ message: `All Roles were deleted successfully!` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const role = createRole(req);

  Role.updateById(req.params.id, role, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Role with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Role with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Create a Role
createRole = (req) => {
  return new Role({
    name: req.body.name,
  });
};
