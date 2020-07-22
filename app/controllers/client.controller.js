const clientDao = require("../dao/client.dao");
const userController = require("./user.controller");

exports.create = (req, res) => {
  // Save Client in the database
  clientDao.create(req, (error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

// Retrieve all Clients from the database.
exports.getAll = (req, res) => {
  clientDao.getAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

exports.getClientById = (req, res) => {
  clientDao.getClientById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Client con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  clientDao.deleteById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Client con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send({ message: `El cliente fue eliminado correctamente` });
  });
};

exports.deleteByUserId = (req, res) => {
  clientDao.deleteByUserId(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Client con idUser ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else {
      // Al eliminar el cliente se debe eliminar el usuario
      userController.deleteById(req, res);
    }
  });
};

exports.deleteAll = (req, res) => {
  clientDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send({ message: `All Clients were deleted successfully! - ${data}` });
  });
};

exports.updateById = (req, res) => {
  const id = req.params.id;
  clientDao.updateById(id, req, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Client con el identificador ${id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send({ message: `Client was updated successfully!` });
  });
};
