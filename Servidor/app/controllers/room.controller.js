const Room = require("../dao/room.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const room = createRoom(req);

  // Save Room in the database
  Room.create(room, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the room.",
      });
    else res.send(data);
  });
};

// Retrieve all rooms from the database.
exports.findAll = (req, res) => {
  Room.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving rooms.",
      });
    else res.send(data);
  });
};

exports.getRoom = (req, res) => {
  Room.getRoom(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found room with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving room with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Room.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found room with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete room with id " + req.params.id,
        });
      }
    } else res.send({ message: `room was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Room.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all rooms.",
      });
    else res.send({ message: `All rooms were deleted successfully!` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const room = createRoom(req);

  Room.updateById(req.params.id, room, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Room with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Room with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Create a Room
createRoom = (req) => {
  return new Room({
    name: req.body.name,
    active: req.body.active,
    image: req.body.image,
    description: req.body.description,
    end: req.body.end,
  });
};
