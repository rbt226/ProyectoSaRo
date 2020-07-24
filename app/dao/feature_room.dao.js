const featureRoomModel = require("../models/feature_room.model");
const utils = require("../common/utils");

exports.create = (req, result) => {
	const response = "FR01";
	const featureRoomCreate = createFeatureRoomModel(req);
	featureRoomModel
		.create(featureRoomCreate)
		.then((newFeatureRoom) => {
			result(null, utils.createSuccessResponse(response, "Se ha creado el registro correctamente", newFeatureRoom));
		})
		.catch((error) => {
			console.log("Error al crear prestación: ", error);
			result(utils.createErrorResponse(response, "Error al asignar prestación"));
		});
};

exports.getFeatureRoomById = (id, result) => {
	const response = "FR02";
	featureRoomModel
		.findOne({ where: { id_feature_room: id } })
		.then((feature_room) => {
			if (!feature_room) {
				console.log("No existe el registro al que quiere acceder ", id);
				return result(null, utils.createWarningResponse(response, "No existe el registro al que quiere acceder"));
			}
			return result(null, utils.createSuccessResponse(response, "", feature_room));
		})
		.catch((error) => {
			console.log("Error al obtener registro con id: ", id, " : ", error);
			result(utils.createErrorResponse(response, "Error al obtener registro"));
		});
};

exports.updateById = (id, req, result) => {
	const response = "FR03";
	const featureRoomUpdate = createFeatureRoomModel(req);
	featureRoomModel
		.update(featureRoomUpdate, { where: { id_feature_room: id } })
		.then((feature_room) => {
			if (feature_room[0] == 0) {
				console.log("El registro que intenta actualizar no existe: ", id);
				return result(null, utils.createWarningResponse(response, "El registro que intenta actualizar no existe"));
			}
			console.log("Se ha actualizado el registro con id ", id, " correctamente");
			return result(null, utils.createSuccessResponse(response, "Se ha actualizado correctamente"));
		})
		.catch((error) => {
			console.log("Error al actualizar el registro con id: ", id, " : ", error);
			result(utils.createErrorResponse(response, "Error al actualizar registro"));
		});
};

exports.deleteById = (id, result) => {
	const response = "FR04";
	featureRoomModel
		.findOne({ where: { id_feature_room: id } })
		.then((feature_room) => {
			if (!feature_room) {
				console.log("El registro que intenta eliminar no existe, id: ", id);
				return result(null, utils.createWarningResponse(response, "El registro que intenta eliminar no existe"));
			}
			featureRoomModel
				.destroy({ where: { id_feature_room: id } })
				.then(() => {
					console.log("Se ha eliminado el registro con id: ", id, "correctamente");
					return result(null, utils.createSuccessResponse(response, "Se ha eliminado el registro correctamente"));
				})
				.catch((error) => {
					console.log("Error al eliminar el registro con id: ", id, " : ", error);
					result(utils.createErrorResponse(response, "Error al eliminar registro"));
				});
		})
		.catch((error) => {
			console.log("Error al eliminar el registro con id: ", id, " : ", error);
			result(utils.createErrorResponse(response, "Error al eliminar registro"));
		});
};

exports.getAll = (result) => {
	const response = "FR05";
	featureRoomModel
		.findAll()
		.then((features_room) => {
			console.log("Se han obtenido todos los registros correctamente");
			return result(null, utils.createSuccessResponse(response, "", features_room));
		})
		.catch((error) => {
			console.log("Error al obtener todos los registros: ", error);
			result(utils.createErrorResponse(response, "Error al obtener todos los registros"));
		});
};

exports.deleteAll = (result) => {
	const response = "FR06";
	featureRoomModel
		.destroy({ where: {} })
		.then((features_room) => {
			console.log("Se eliminaron todos los registros correctamente");
			return result(null, utils.createSuccessResponse(response, "Se eliminaron todos los registros correctamente", features_room));
		})
		.catch((error) => {
			console.log("Error al eliminar todos los usuarios: ", error);
			result(utils.createErrorResponse(response, "Error al eliminar todos los registros"));
		});
};

exports.getAllByRoom = (idRoom, result) => {
	const response = "FR07";
	featureRoomModel
		.findAll({ where: { id_room: idRoom } })
		.then((features_room) => {
			console.log("Se han obtenido todos los registros correctamente para el consultorio con id: ", idRoom);
			return result(null, utils.createSuccessResponse(response, "", features_room));
		})
		.catch((error) => {
			console.log("Error al obtener todos los registros para el consultorio con id: ", idRoom, " ", error);
			result(utils.createErrorResponse(response, "Error al obtener todos los registros para el consultorio con id: ", idRoom));
		});
};

exports.deleteAllByRoom = (idRoom, result) => {
	const response = "FR08";
	featureRoomModel
		.destroy({ where: { id_room: idRoom } })
		.then((features_room) => {
			console.log("Se eliminaron todos los registros correctamente para el consultorio con id: ", idRoom);
			return result(
				null,
				utils.createSuccessResponse(
					response,
					"Se eliminaron todos los registros correctamente para el consultorio seleccionado",
					features_room
				)
			);
		})
		.catch((error) => {
			console.log("Error al eliminar todos los registros para el consultorio con id: ", idRoom, " ", error);
			result(utils.createErrorResponse(response, "Error al eliminar todos los registros para el consultorio con id: ", idRoom));
		});
};

createFeatureRoomModel = (req) => {
	return {
		id_room: req.body.idRoom,
		id_feature: req.body.idFeature,
	};
};
