const roomModel = require("../models/room.model");
const utils = require("../common/utils");

exports.create = (req, result) => {
  const roomCreate = createRoomModel(req);
  roomModel
    .create(roomCreate)
    .then((newRoom) => {
      result(null, newRoom);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

exports.getAll = (result) => {
  roomModel
    .findAll()
    .then((rooms) => {
      result(null, rooms);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

exports.getRoomById = (id, result) => {
  roomModel
    .findOne({ where: { id_room: id } })
    .then((room) => {
      if (!room) {
        return result({ kind: "not_found" }, null);
      }
      console.log("room: ", room);
      result(null, room);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

exports.deleteById = (id, result) => {
  roomModel
    .findOne({ where: { id_room: id } })
    .then((room) => {
      if (!room) {
        return result({ kind: "not_found" }, null);
      }
      roomModel
        .destroy({ where: { id_room: id } })
        .then(() => {
          console.log("Se elimino correctamente la Sala con id: " + id);
          result(null, room);
        })
        .catch((error) => {
          console.log("Error al eliminar sala con id ", id);
          utils.handleError(error, result);
        });
    })
    .catch((error) => {
      console.log("Error al eliminar sala con id ", id);
      utils.handleError(error, result);
    });
};

exports.deleteAll = (result) => {
  roomModel
    .destroy({ where: {} })
    .then((rooms) => {
      console.log(`deleted ${rooms} rooms`);
      result(null, rooms);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

exports.updateById = (id, req, result) => {
  const roomUpdate = createRoomModel(req);
  roomModel
    .update(roomUpdate, { where: { id_room: id } })
    .then(() => {
      roomModel
        .findByPk(id)
        .then((room) => {
          if (!room) {
            return result({ kind: "not_found" }, null);
          }
          console.log("Se modifico la sala con id :", id, "correctamente");
          result(null, room);
        })
        .catch((error) => {
          console.log("Error al modificar la sala con id :", id);
          utils.handleError(error, result);
        });
    })
    .catch((error) => {
      console.log("Error al modificar la sala con id :", id);
      utils.handleError(error, result);
    });
};

createRoomModel = (req) => {
  const images = req.body.images;
  let image = "";
  images.forEach((im) => {
    if (!image) {
      image = im;
    } else {
      image = image + "|" + im;
    }
  });
  return {
    name_room: req.body.name,
    active_room: req.body.active,
    image_room: image,
    description: req.body.description,
  };
};
