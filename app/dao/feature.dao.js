const featureModel = require("../models/feature.model");
const utils = require("../common/utils");

exports.create = (req, result) => {
	const response = "F01";
	const featureCreate = createFeatureModel(req);
	featureModel
		.create(featureCreate)
		.then((newFeature) => {
			result(null, utils.createSuccessResponse(response, "Se ha creado la prestación correctamente", newFeature));
		})
		.catch((error) => {
			console.log("Error al crear prestación: ", error);
			result(utils.createErrorResponse(response, "Error al crear prestación"));
		});
};

exports.getFeatureById = (id, result) => {
	const response = "F02";
	featureModel
		.findOne({ where: { id_feature: id } })
		.then((feature) => {
			if (!feature) {
				console.log("No existe la prestación a la que quiere acceder ", id);
				return result(null, utils.createWarningResponse(response, "No existe la prestación a la que quiere acceder"));
			}
			return result(null, utils.createSuccessResponse(response, "", feature));
		})
		.catch((error) => {
			console.log("Error al obtener prestación con id: ", id, " : ", error);
			result(utils.createErrorResponse(response, "Error al obtener prestación"));
		});
};

exports.updateById = (id, req, result) => {
	const response = "F03";
	const featureUpdate = createFeatureModel(req);
	featureModel
		.update(featureUpdate, { where: { id_feature: id } })
		.then((feature) => {
			if (feature[0] == 0) {
				console.log("La prestación que intenta actualizar no existe: ", id);
				return result(null, utils.createWarningResponse(response, "La prestación que intenta actualizar no existe"));
			}
			console.log("Se ha actualizado la prestación con id ", id, " correctamente");
			return result(null, utils.createSuccessResponse(response, "Se ha actualizado correctamente"));
		})
		.catch((error) => {
			console.log("Error al actualizar la prestación con id: ", id, " : ", error);
			result(utils.createErrorResponse(response, "Error al actualizar registro"));
		});
};

exports.deleteById = (id, result) => {
	const response = "F04";
	featureModel
		.findOne({ where: { id_feature: id } })
		.then((feature) => {
			if (!feature) {
				console.log("La prestación que intenta eliminar no existe, id: ", id);
				return result(null, utils.createWarningResponse(response, "La prestación que intenta eliminar no existe"));
			}
			featureModel
				.destroy({ where: { id_feature: id } })
				.then(() => {
					console.log("Se ha eliminado la prestación con id: ", id, "correctamente");
					return result(null, utils.createSuccessResponse(response, "Se ha eliminado la prestación correctamente"));
				})
				.catch((error) => {
					console.log("Error al eliminar la prestación con id: ", id, " : ", error);
					result(utils.createErrorResponse(response, "Error al eliminar registro"));
				});
		})
		.catch((error) => {
			console.log("Error al eliminar la prestación con id: ", id, " : ", error);
			result(utils.createErrorResponse(response, "Error al eliminar registro"));
		});
};

exports.getAll = (result) => {
	const response = "F05";
	featureModel
		.findAll()
		.then((features_room) => {
			console.log("Se han obtenido todas las prestaciones correctamente");
			return result(null, utils.createSuccessResponse(response, "", features_room));
		})
		.catch((error) => {
			console.log("Error al obtener todos las prestaciones: ", error);
			result(utils.createErrorResponse(response, "Error al obtener todos las prestaciones"));
		});
};

exports.deleteAll = (result) => {
	const response = "F06";
	featureModel
		.destroy({ where: {} })
		.then((features_room) => {
			console.log("Se eliminaron todos las prestaciones correctamente");
			return result(null, utils.createSuccessResponse(response, "Se eliminaron todos las prestaciones correctamente", features_room));
		})
		.catch((error) => {
			console.log("Error al eliminar todos los usuarios: ", error);
			result(utils.createErrorResponse(response, "Error al eliminar todos las prestaciones"));
		});
};

createFeatureModel = (req) => {
	return {
		name_feature: req.body.name,
		description_feature: req.body.description,
	};
};
