const roomModel = require("../models/room.model");

exports.create = (req, result) => {
  const roomCreate = createRoomModel(req);
  roomModel
    .create(roomCreate)
    .then((newRoom) => {
      result(null, newRoom);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
      return;
    });
};

exports.getAll = (result) => {
  roomModel
    .findAll()
    .then((rooms) => {
      console.log("rooms: ", rooms);
      result(null, rooms);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
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
      console.log("error: ", error);
      result(error, null);
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
      console.log("error: ", error);
      result(error, null);
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
      console.log("error: ", error);
      result(error, null);
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
          console.log("error: ", error);
          result(error, null);
        });
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

createRoomModel = (req) => {
  return {
    name_room: req.body.name,
    active_room: req.body.active,
    image_room: req.body.image,
    description: req.body.description,
  };
};
