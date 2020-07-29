const roomDao = require('../dao/room.dao');
const featureRoomDao = require('../dao/feature_room.dao');
const cloudinary = require('cloudinary').v2;
const IncomingForm = require('formidable').IncomingForm;
const FileReader = require('filereader');
const utils = require('../common/utils');

exports.create = (req, res) => {
	const form = new IncomingForm({ multiples: true });
	form.parse(req, function (err, fields, files) {
		req.body = fields;
		const name = req.body.name;
		const response = 'R01';
		roomDao.getRoomByName(name, (error, resp) => {
			// Error al obtener Consultorio
			if (error) return res.status(500).send(error);

			// Ya existe un consultorio
			if (utils.isResponseOk(resp)) return res.send(utils.createWarningResponse(response, 'Ya existe un consultorio con ese nombre'));

			// No existe consultorio
			req.body.images = ['Site/noImage'];
			roomDao.create(req, async (error, resp) => {
				if (error) return res.status(500).send(error);
				const idRoom = resp.data.dataValues.id_room;
				const features = req.body.features;
				addFeatures(idRoom, features, res, files, req);
			});
		});
	});
};

addFeatures = (idRoom, features, res, files, req) => {
	featureRoomDao.createFeaturesByRoom(idRoom, features, (error, resp) => {
		uploadImageToCloudinary(files, idRoom, req, res, error);
	});
};

uploadImageToCloudinary = (files, idRoom, req, res, errorFeatures) => {
	const name = req.body.name;
	const response = 'R01';

	let publicIds = [];
	if (!files.file.length) {
		//Si solamente viene un file, lo convierto en un array para poder recorrerlo
		files.file = [files.file];
	}
	let index = 1;
	const upload_res = files.file.map(
		(f) =>
			new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(f);
				reader.onload = () => {
					const dataUri = reader.result;
					const publicId = name + '_' + index;
					index++;
					if (dataUri) {
						cloudinary.uploader.upload(dataUri, { public_id: publicId, tags: 'Consultorios', folder: 'Consultorios' }, function (
							err,
							res
						) {
							if (err) {
								console.log('Error en cloudinary al dar de alta la imagen :', err);
								reject(error);
							} else {
								console.log('Se ha creado la imagen en cloudinary correctamente ', JSON.stringify(res));
								publicIds.push(res.public_id); // Se van agregando los publicId devueltos por cloudinary
								resolve(res.public_id);
							}
						});
					}
				};
			})
	);
	// Promise.all will fire when all promises are resolved
	Promise.all(upload_res)
		.then((result) => {
			req.body.images = publicIds;
			let respuesta;
			roomDao.updateById(idRoom, req, (error, resp) => {
				if (errorFeatures) {
					respuesta = utils.createWarningResponse(
						response,
						'Se ha creado exitosamente el consultorio pero hubo un problema al cargar las prestaciones'
					);
				} else {
					respuesta = utils.createSuccessResponse(response, 'Se ha creado exitosamente el consultorio');
				}
				return res.send(respuesta);
			});
		})
		.catch((error) => {
			console.log('Error al asociar imagenes al consultorio: ', error);
			let respuesta;
			if (errorFeatures) {
				respuesta = utils.createWarningResponse(
					response,
					'Se ha creado exitosamente el consultorio pero hubo un problema al cargar las images y en asociar las prestaciones'
				);
			} else {
				respuesta = utils.createWarningResponse(
					response,
					'Se ha creado exitosamente el consultorio pero hubo un problema al cargar las images'
				);
			}
			return res.send(respuesta);
		});
};

exports.getRoomById = (req, res) => {
	roomDao.getRoomById(req.params.id, (error, resp) => {
		if (error) return res.status(500).send(error);
		if (!utils.isResponseOk(resp)) return res.send(resp);
		let data = resp.data;
		const roomId = data.id_room;
		const images = data.image_room.split('|');
		data.images = images;
		resp.data = data;
		featureRoomDao.getFeatureRoomById(roomId, (errorF, respF) => {
			if (errorF) return res.status(500).send(errorF);
			if (utils.isResponseOk(respF)) {
				data.features = respF.data;
				resp.data = data;
			}
			res.send(resp);
		});
	});
};

exports.updateById = (req, res) => {
	const id = req.params.id;
	roomDao.updateById(id, req, (error, resp) => {
		if (error) return res.status(500).send(error);
		res.send(resp);
	});
};

exports.deleteById = (req, res) => {
	roomDao.deleteById(req.params.id, (error, resp) => {
		if (error) return res.status(500).send(error);
		if (!utils.isResponseOk(resp)) return res.send(resp);

		const images = resp.data.image_room.split('|');
		// Se elimina la imagen de cloudinary si la imagen no es la default
		images.map((image) => {
			cloudinary.api.delete_resources(image, { invalidate: true, resource_type: 'image' }, function (err, res) {
				if (err) {
					console.log('Error en cloudinary :', err);
				}
				console.log('Respuesta De cloudinary: ', res);
			});
		});
		res.send(resp);
	});
};

exports.getAll = (req, res) => {
	roomDao.getAll((error, resp) => {
		if (error) return res.status(500).send(error);
		let images;
		let result = [];
		const rooms = resp.data.map(
			(room) =>
				new Promise((resolve, reject) => {
					let values = room.dataValues;
					const roomId = values.id_room;
					images = values.image_room.split('|');
					values.images = images;
					values.features = [];
					featureRoomDao.getFeatureRoomByIdRoom(roomId, (errorF, respF) => {
						if (errorF) reject(errorF);
						if (utils.isResponseOk(respF)) {
							values.features = respF.data;
						}
						result.push(values);
						resolve(result);
					});
				})
		);

		Promise.all(rooms)
			.then((resultP) => {
				resp.data = result;
				res.send(resp);
			})
			.catch((errorF) => {
				return res.status(500).send(errorF);
			});
	});
};

exports.deleteAll = (req, res) => {
	roomDao.deleteAll((error, resp) => {
		if (error) return res.status(500).send(error);
		res.send(resp);
	});
};
