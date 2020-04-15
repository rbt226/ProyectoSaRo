const userDao = require("../dao/user.dao");
var jwt = require("jsonwebtoken");

exports.signIn = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const userName = req.body.userName;
  const password = req.body.password;
  // Save User in the database
  userDao.signIn(userName, password, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while login.",
      });
    else {
      const token = jwt.sign({ _id: data.id_user }, "secretKey");
      res.send({ token, data });
    }
  });
};
exports.signUp = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  userDao.create(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the userDao.",
      });
    else {
      const token = jwt.sign({ _id: data.id }, "secretKey");
      res.json({ token });
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Save User in the database
  userDao.create(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the userDao.",
      });
    else res.send(data);
  });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  userDao.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

exports.getUserById = (req, res) => {
  userDao.getUserById(req.params.id, (err, data) => {
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

exports.deleteById = (req, res) => {
  userDao.deleteById(req.params.id, (err, data) => {
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
  userDao.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while removing all users.",
      });
    else
      res.send({ message: `All users were deleted successfully! - ${data}` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  userDao.updateById(req.params.id, req, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: err || "Error updating User with id " + req.params.id,
        });
      }
    } else res.send({ message: `user was updated successfully!` });
  });
};
