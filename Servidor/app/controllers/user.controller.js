const userDao = require("../dao/user.dao");
var jwt = require("jsonwebtoken");

exports.signIn = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }
  const mail = req.body.mail;
  const password = req.body.password;
  userDao.signIn(mail, password, (error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else {
      console.log("estoy entrando aca?, ", data);
      const token = jwt.sign({ _id: data.id_user }, "secretKey");
      res.send({ token, data });
    }
  });
};
exports.signUp = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }

  userDao.create(req, (error, data) => {
    if (error)
      res.status(500).send({
        error,
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
      error: { message: "Content can not be empty!" },
    });
  }

  // Save User in the database
  userDao.create(req, (error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

// Retrieve all users from the database.
exports.getAll = (req, res) => {
  userDao.getAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

exports.getUserById = (req, res) => {
  userDao.getUserById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro user con el identificador ${req.params.id}.`,
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
  userDao.deleteById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro user con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  userDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else
      res.send({ message: `All users were deleted successfully! - ${data}` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }

  userDao.updateById(req.params.id, req, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro User con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else res.send({ message: `user was updated successfully!` });
  });
};
