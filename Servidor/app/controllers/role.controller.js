const roleDao = require("../dao/role.dao");

exports.create = (req, res) => {
  // Save Role in the database
  roleDao.create(req, (error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

// Retrieve all Roles from the database.
exports.getAll = (req, res) => {
  roleDao.getAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

exports.getRoleById = (req, res) => {
  roleDao.getRoleById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Role con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  roleDao.deleteById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Role con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send({ message: `Role was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  roleDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send({ message: `All Roles were deleted successfully! - ${data}` });
  });
};

exports.updateById = (req, res) => {
  const id = req.params.id;
  roleDao.updateById(id, req, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: { message: `No se encontro Role con el identificador ${id}.` },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send({ message: `Role was updated successfully!` });
  });
};
