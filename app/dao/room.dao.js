const roomModel = require('../models/room.model');
const utils = require('../common/utils');

exports.create = (req, result) => {
	const response = 'R01';
	const roomCreate = createRoomModel(req);
	roomModel
		.create(roomCreate)
		.then((newRoom) => {
			result(null, utils.createSuccessResponse(response, 'Se ha creado el consultorio correctamente', newRoom));
		})
		.catch((error) => {
			console.log('Error al crear el consultorio: ', error);
			result(utils.createErrorResponse(response, 'Error al crear el consultorio'));
		});
};

exports.getRoomById = (id, result) => {
	const response = 'R02';
	roomModel
		.findOne({ where: { id_room: id } })
		.then((room) => {
			if (!room) {
				console.log('El consultorio que intenta obtener no existe, con id: ', id);
				return result(null, utils.createWarningResponse(response, 'El consultorio que intenta obtener no existe'));
			}
			result(null, utils.createSuccessResponse(response, '', room.dataValues));
		})
		.catch((error) => {
			console.log('Error al obtener el consultorio con id: ', id, ' : ', error);
			result(utils.createErrorResponse(response, 'Error al obtener el consultorio'));
		});
};

exports.updateById = (id, req, result) => {
	const response = 'R03';
	const roomUpdate = createRoomModel(req);
	roomModel
		.update(roomUpdate, { where: { id_room: id } })
		.then((room) => {
			if (room[0] == 0) {
				console.log('El consultorio que intenta actualizar no existe, consultorio id: ', id);
				return result(null, utils.createWarningResponse(response, 'El consultorio que intenta actualizar no existe'));
			}
			console.log('Se ha actualizado el consultorio con id: ', id, ' correctamente');
			result(null, utils.createSuccessResponse(response, 'Se ha actualizado el consultorio correctamente'));
		})
		.catch((error) => {
			console.log('Error al actualizar el consultorio con id: ', id, ' : ', error);
			result(utils.createErrorResponse(response, 'Error al actualizar el consultorio'));
		});
};

exports.deleteById = (id, result) => {
	const response = 'R04';
	roomModel
		.findOne({ where: { id_room: id } })
		.then((room) => {
			if (!room) {
				console.log('El consultorio que intenta eliminar no existe, consultorio id: ', id);
				return result(null, utils.createWarningResponse(response, 'El consultorio que intenta eliminar no existe'));
			}
			roomModel
				.destroy({ where: { id_room: id } })
				.then(() => {
					console.log('Se elimino correctamente el consultorio con id: ' + id);
					result(null, utils.createSuccessResponse(response, 'Se ha eliminado el consultorio correctamente', room.dataValues));
				})
				.catch((error) => {
					console.log('Error al eliminar el consultorio con id: ', id, ' : ', error);
					result(utils.createErrorResponse(response, 'Error al eliminar el consultorio'));
				});
		})
		.catch((error) => {
			console.log('Error al eliminar el consultorio con id: ', id, ' : ', error);
			result(utils.createErrorResponse(response, 'Error al eliminar el consultorio'));
		});
};

exports.getAll = (result) => {
	const response = 'R05';
	roomModel
		.findAll()
		.then((rooms) => {
			result(null, utils.createSuccessResponse(response, '', rooms));
		})
		.catch((error) => {
			console.log('Error al obtener todas las consultorios: ', error);
			result(utils.createErrorResponse(response, 'Error al obtener todas las consultorios'));
		});
};

exports.deleteAll = (result) => {
	const response = 'R06';
	roomModel
		.destroy({ where: {} })
		.then((rooms) => {
			console.log('Se eliminaron todas las consultorios correctamente');
			result(null, utils.createSuccessResponse(response, 'Se eliminaron todas las consultorios correctamente'));
		})
		.catch((error) => {
			utils.handleError(error, result);
			console.log('Error al eliminar todas las consultorios : ', error);
			result(utils.createErrorResponse(response, 'Error al eliminar todas las consultorios'));
		});
};

exports.getRoomByName = (name, result) => {
	const response = 'R07';
	roomModel
		.findOne({ where: { name_room: name } })
		.then((room) => {
			if (!room) {
				console.log('El consultorio que intenta obtener no existe, con nombre: ', name);
				return result(null, utils.createWarningResponse(response, 'El consultorio que intenta obtener no existe'));
			}
			result(null, utils.createSuccessResponse(response, '', room.dataValues));
		})
		.catch((error) => {
			console.log('Error al obtener el consultorio con nombre: ', name, ' : ', error);
			result(utils.createErrorResponse(response, 'Error al obtener el consultorio'));
		});
};

createRoomModel = (req) => {
	const response = 'R08';
	const images = req.body.images;
	let image = '';
	images.forEach((im) => {
		if (!image) {
			image = im;
		} else {
			image = image + '|' + im;
		}
	});
	return {
		name_room: req.body.name,
		active_room: req.body.active,
		image_room: image,
		description: req.body.description,
	};
};
