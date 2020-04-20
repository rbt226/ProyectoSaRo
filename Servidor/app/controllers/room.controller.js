const roomDao = require("../dao/room.dao");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }

  // Save Room in the database
  roomDao.create(req, (error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send(data);
  });
};

// Retrieve all Rooms from the database.
exports.getAll = (req, res) => {
  roomDao.getAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else {
      let images;
      let result = [];
      data.forEach((room) => {
        let values = room.dataValues;
        images = values.image_room.split("|");
        values.images = images;
        result.push(values);
      });
      res.send(result);
    }
  });
};

exports.getRoomById = (req, res) => {
  roomDao.getRoomById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Room con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else {
      let values = data.dataValues;
      const images = values.image_room.split("|");
      values.images = images;
      res.send(values);
    }
  });
};

exports.deleteById = (req, res) => {
  roomDao.deleteById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Room con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else res.send({ message: `Room was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  roomDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else
      res.send({ message: `All Rooms were deleted successfully! - ${data}` });
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
  roomDao.updateById(id, req, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: { message: `No se encontro Room con el identificador ${id}.` },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else res.send({ message: `Room was updated successfully!` });
  });
};
