const occupationDao = require("../dao/occupation.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }

  // Save Occupation in the database
  occupationDao.create(req, (error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

// Retrieve all Occupations from the database.
exports.getAll = (req, res) => {
  occupationDao.getAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

exports.getOccupationById = (req, res) => {
  occupationDao.getOccupationById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro Occupation con el identificador ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Occupation con el identificador " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  occupationDao.deleteById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro Occupation con el identificador ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Occupation con el identificador " + req.params.id,
        });
      }
    } else res.send({ message: `Occupation was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  occupationDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else
      res.send({
        message: `All Occupations were deleted successfully! - ${data}`,
      });
  });
};

exports.updateById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }
  const id = req.params.id;
  occupationDao.updateById(id, req, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro Occupation con el identificador ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Occupation con el identificador " + id,
        });
      }
    } else res.send({ message: `Occupation was updated successfully!` });
  });
};
