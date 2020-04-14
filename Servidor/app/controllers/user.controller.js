const User = require("../dao/user.dao");
var jwt = require("jsonwebtoken");

exports.signIn = (req, res) => {
  console.log("akfbkjsb " + JSON.stringify(req.body));

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const userName = req.body.userName;
  const password = req.body.password;
  console.log("signIn controller " + userName + " " + password);
  // Save User in the database
  User.signIn(userName, password, (err, data) => {
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

  const user = createUser(req);

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
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

  const user = createUser(req);

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
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

exports.getUserById = (req, res) => {
  User.getUserById(req.params.id, (err, data) => {
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
  User.deleteById(req.params.id, (err, data) => {
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
  console.log("entre aca 1?");

  User.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while removing all users.",
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

  const user = createUser(req);

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

// Create a user
createUser = (req) => {
  return new User({
    mail: req.body.mail,
    userName: req.body.userName,
    mobilePhone: req.body.mobilePhone,
    password: req.body.password,
    image: req.body.image,
    active: req.body.active,
    idRole: req.body.idRole,
  });
};
