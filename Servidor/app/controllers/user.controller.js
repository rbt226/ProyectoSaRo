const User = require("../models/user.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a user
  const user = new User({
    key: req.body.key,
    value: req.body.value,
    active: req.body.active,
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the user.",
      });
    else res.send(data);
  });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

exports.getUser = (req, res) => {
  User.getUser(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.id,
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all users.",
      });
    else res.send({ message: `All users were deleted successfully!` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Permission
  const user = new User({
    key: req.body.key,
    value: req.body.value,
    active: req.body.active,
  });

  User.updateById(req.params.id, user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Permission with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Permission with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
