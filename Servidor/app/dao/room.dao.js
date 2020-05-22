const roomModel = require("../models/room.model");
const utils = require("../common/utils");

exports.create = (req, result) => {
  const response = "R01";
  const roomCreate = createRoomModel(req);
  roomModel
    .create(roomCreate)
    .then((newRoom) => {
      result(null, utils.createSuccessResponse(response, "Se ha creado la sala correctamente", newRoom));
    })
    .catch((error) => {
      console.log("Error al crear la sala: ", error);
      result(utils.createErrorResponse(response, "Error al crear la sala"));
    });
};

exports.getRoomById = (id, result) => {
  const response = "R02";
  roomModel
    .findOne({ where: { id_room: id } })
    .then((room) => {
      if (!room) {
        console.log("La sala que intenta obtener no existe, con id: ", id);
        return result(null, utils.createWarningResponse(response, "La sala que intenta obtener no existe"));
      }
      result(null, utils.createSuccessResponse(response, "", room));
    })
    .catch((error) => {
      console.log("Error al obtener la sala con id: ", id, " : ", error);
      result(utils.createErrorResponse(response, "Error al obtener la sala"));
    });
};

exports.updateById = (id, req, result) => {
  const response = "R03";
  const roomUpdate = createRoomModel(req);
  roomModel
    .update(roomUpdate, { where: { id_room: id } })
    .then((room) => {
      if (room[0] == 0) {
        console.log("La sala que intenta actualizar no existe, sala id: ", id);
        return result(null, utils.createWarningResponse(response, "La sala que intenta actualizar no existe"));
      }
      console.log("Se ha actualizado la sala con id: ", id, " correctamente");
      result(null, utils.createSuccessResponse(response, "Se ha actualizado la sala correctamente"));
    })
    .catch((error) => {
      console.log("Error al actualizar la sala con id: ", id, " : ", error);
      result(utils.createErrorResponse(response, "Error al actualizar la sala"));
    });
};

exports.deleteById = (id, result) => {
  const response = "R04";
  roomModel
    .findOne({ where: { id_room: id } })
    .then((room) => {
      if (!room) {
        console.log("La sala que intenta eliminar no existe, sala id: ", id);
        return result(null, utils.createWarningResponse(response, "La sala que intenta eliminar no existe"));
      }
      roomModel
        .destroy({ where: { id_room: id } })
        .then(() => {
          console.log("Se elimino correctamente la sala con id: " + id);
          result(null, utils.createSuccessResponse(response, "Se ha eliminado la sala correctamente"));
        })
        .catch((error) => {
          console.log("Error al eliminar la sala con id: ", id, " : ", error);
          result(utils.createErrorResponse(response, "Error al eliminar la sala"));
        });
    })
    .catch((error) => {
      console.log("Error al eliminar la sala con id: ", id, " : ", error);
      result(utils.createErrorResponse(response, "Error al eliminar la sala"));
    });
};

exports.getAll = (result) => {
  const response = "R05";
  roomModel
    .findAll()
    .then((rooms) => {
      result(null, utils.createSuccessResponse(response, "", rooms));
    })
    .catch((error) => {
      console.log("Error al obtener todas las salas: ", error);
      result(utils.createErrorResponse(response, "Error al obtener todas las salas"));
    });
};

exports.deleteAll = (result) => {
  const response = "R06";
  roomModel
    .destroy({ where: {} })
    .then((rooms) => {
      console.log("Se eliminaron todas las salas correctamente");
      result(null, utils.createSuccessResponse(response, "Se eliminaron todas las salas correctamente"));
    })
    .catch((error) => {
      utils.handleError(error, result);
      console.log("Error al eliminar todas las salas : ", error);
      result(utils.createErrorResponse(response, "Error al eliminar todas las salas"));
    });
};

exports.getRoomByName = (name, result) => {
  const response = "R07 ";
  roomModel
    .findOne({ where: { name_room: name } })
    .then((room) => {
      if (!room) {
        console.log("La sala que intenta obtener no existe con nombre: ", name);
        return result(null, utils.createWarningResponse(response, "La sala que intenta obtener no existe"));
      }
      result(null, utils.createSuccessResponse(response, "", room));
    })
    .catch((error) => {
      console.log("Error al obtener la sala con nombre: ", name, " : ", error);
      result(utils.createErrorResponse(response, "Error al obtener la sala"));
    });
};

createRoomModel = (req) => {
  const response = "R08";
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
