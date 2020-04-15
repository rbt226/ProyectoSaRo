const Occupation = require("../dao/occupation.dao");

exports.create = (req, res) => {
  // Validate request
  debugger;
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const occupation = createOccupation(req);

  // Save occupation in the database
  Occupation.create(occupation, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Occupation.",
      });
    else res.send(data);
  });
};

// Retrieve all Occupations from the database.
exports.findAll = (req, res) => {
  Occupation.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while retrieving occupations.",
      });
    else res.send(data);
  });
};

exports.getOccupation = (req, res) => {
  Occupation.getOccupation(req.params.id, (err, data) => {
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

exports.delete = (req, res) => {
  Occupation.remove(req.params.id, (err, data) => {
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
  Occupation.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while removing all occupations.",
      });
    else res.send({ message: `All Occupations were deleted successfully!` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const occupation = createOccupation(req);

  Occupation.updateById(req.params.id, occupation, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Occupation with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Occupation with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Create a Occupation
function createOccupation(req) {
  return new Occupation({
    type: req.body.type,
    active: req.body.active,
    image: req.body.image,
  });
}
