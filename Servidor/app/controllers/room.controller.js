const roomDao = require("../dao/room.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Save Room in the database
  roomDao.create(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Room.",
      });
    else res.send(data);
  });
};

// Retrieve all Rooms from the database.
exports.getAll = (req, res) => {
  roomDao.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while retrieving rooms.",
      });
    else res.send(data);
  });
};

exports.getRoomById = (req, res) => {
  roomDao.getRoomById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Room with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Room with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  roomDao.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Room with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Room with id " + req.params.id,
        });
      }
    } else res.send({ message: `Room was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  roomDao.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while removing all rooms.",
      });
    else res.send({ message: `All Rooms were deleted successfully! - ${data}` });
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
  roomDao.updateById(id, req, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Room with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Room with id " + id,
        });
      }
    } else res.send({ message: `Room was updated successfully!` });
  });
};