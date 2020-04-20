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
    .destroy({ where: { id_room: id } })
    .then((roomModel) => {
      if (!roomModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("deleted room with roomId" + id);

      result(null, roomModel);
    })
    .catch((error) => {
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
          console.log("Rooms updated: ", room);
          result(null, room);
        })
        .catch((error) => {
          utils.handleError(error, result);
        });
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

createRoomModel = (req) => {
  const images = req.body.images;
  let image = "";
  images.forEach((im) => {
    console.log("for each ", im);
    if (!image) {
      image = im;
    } else {
      image = image + "|" + im;
    }
  });
  console.log("createRoomModel ", images, " imageee: ", image);
  return {
    name_room: req.body.name,
    active_room: req.body.active,
    image_room: image,
    description: req.body.description,
  };
};
