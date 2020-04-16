const occupationDao = require("../dao/occupation.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Save Occupation in the database
  occupationDao.create(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Occupation.",
      });
    else res.send(data);
  });
};

// Retrieve all Occupations from the database.
exports.getAll = (req, res) => {
  occupationDao.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while retrieving occupations.",
      });
    else res.send(data);
  });
};

exports.getOccupationById = (req, res) => {
  occupationDao.getOccupationById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Occupation with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Occupation with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  occupationDao.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Occupation with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Occupation with id " + req.params.id,
        });
      }
    } else res.send({ message: `Occupation was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  occupationDao.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while removing all occupations.",
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
      message: "Content can not be empty!",
    });
  }
  const id = req.params.id;
  occupationDao.updateById(id, req, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Occupation with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Occupation with id " + id,
        });
      }
    } else res.send({ message: `Occupation was updated successfully!` });
  });
};
