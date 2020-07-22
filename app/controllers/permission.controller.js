const permissionDao = require("../dao/permission.dao");

exports.create = (req, res) => {
  // Save Permission in the database
  permissionDao.create(req, (error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

// Retrieve all Permissions from the database.
exports.getAll = (req, res) => {
  permissionDao.getAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

exports.getPermissionById = (req, res) => {
  permissionDao.getPermissionById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Permission con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  permissionDao.deleteById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Permission con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send({ message: `Permission was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  permissionDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else
      res.send({
        message: `All Permissions were deleted successfully! - ${data}`,
      });
  });
};

exports.updateById = (req, res) => {
  const id = req.params.id;
  permissionDao.updateById(id, req, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Permission con el identificador ${id}.`,
          },
        });
      } else {
        res.status(500).send(error);
      }
    } else res.send({ message: `Permission was updated successfully!` });
  });
};
