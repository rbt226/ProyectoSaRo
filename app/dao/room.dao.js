const roomModel = require('../models/room.model');
const featureModel = require('../models/feature.model');
const RoomImageModel = require('../models/room_image.model');
const utils = require('../common/utils');
const Sequelize = require('sequelize');

exports.create = async(roomCreate, featuresId, next, result) => {
    const response = 'R01';
    roomModel.belongsToMany(featureModel, { through: 'feature_room', foreignKey: 'id_room' });
    featureModel.belongsToMany(roomModel, { through: 'feature_room', foreignKey: 'id_feature' });
    try {
        const room = await roomModel.create(roomCreate);
        const features = await featureModel.findAll({
            where: {
                id_feature: featuresId,
            },
        });
        await room.addFeatures(features);
        return result(utils.createSuccessResponse(response, 'Se ha creado el consultorio correctamente', room));
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            return result(utils.createWarningResponse(response, 'Ya existe un consultorio con ese nombre'));
        } else {
            next(utils.createErrorResponse(response, 'Error al crear el consultorio', error));
        }
    }
};
exports.addImages = async(images, result) => {
    const response = 'R09';
    RoomImageModel.bulkCreate(images)
        .then(() => {
            return result(utils.createSuccessResponse(response, 'Se ha creado el consultorio correctamente'));
        })
        .catch(() => {
            return result(
                utils.createWarningResponse(response, 'Se ha creado exitosamente el consultorio pero hubo un problema al cargar las images')
            );
        });
};

exports.getRoomById = (id, result) => {
    const response = 'R02';
    roomModel
        .findOne({ where: { id_room: id } })
        .then((room) => {
            if (!room) {
                console.log('El consultorio que intenta obtener no existe, con id: ', id);
                return result(utils.createWarningResponse(response, 'El consultorio que intenta obtener no existe'));
            }
            result(utils.createSuccessResponse(response, '', room.dataValues));
        })
        .catch((error) => {
            console.log('Error al obtener el consultorio con id: ', id, ' : ', error);
            next(utils.createErrorResponse(response, 'Error al obtener el consultorio'));
        });
};

exports.updateById = (id, roomUpdate, next, result) => {
    const response = 'R03';
    roomModel
        .update(roomUpdate, { where: { id_room: id } })
        .then((room) => {
            if (room[0] == 0) {
                return result(utils.createWarningResponse(response, 'El consultorio que intenta actualizar no existe'));
            }
            result(utils.createSuccessResponse(response, 'Se ha actualizado el consultorio correctamente'));
        })
        .catch((error) => {
            next(utils.createErrorResponse(response, 'Error al actualizar el consultorio', error));
        });
};

exports.deleteById = (id, result) => {
    const response = 'R04';
    roomModel
        .findOne({ where: { id_room: id } })
        .then((room) => {
            if (!room) {
                console.log('El consultorio que intenta eliminar no existe, consultorio id: ', id);
                return result(utils.createWarningResponse(response, 'El consultorio que intenta eliminar no existe'));
            }
            roomModel
                .destroy({ where: { id_room: id } })
                .then(() => {
                    console.log('Se elimino correctamente el consultorio con id: ' + id);
                    result(utils.createSuccessResponse(response, 'Se ha eliminado el consultorio correctamente', room.dataValues));
                })
                .catch((error) => {
                    console.log('Error al eliminar el consultorio con id: ', id, ' : ', error);
                    next(utils.createErrorResponse(response, 'Error al eliminar el consultorio'));
                });
        })
        .catch((error) => {
            console.log('Error al eliminar el consultorio con id: ', id, ' : ', error);
            next(utils.createErrorResponse(response, 'Error al eliminar el consultorio'));
        });
};

exports.getAll = (next, result) => {
    const response = 'R05';
    roomModel
        .findAll({
            include: [{
                model: RoomImageModel,
                attributes: ['path_room_image'],
            }, ],
        })
        .then((rooms) => {
            result(utils.createSuccessResponse(response, '', rooms));
        })
        .catch((error) => {
            next(utils.createErrorResponse(response, 'Error al obtener todas las consultorios', error));
        });
};

exports.deleteAll = (result) => {
    const response = 'R06';
    roomModel
        .destroy({ where: {} })
        .then((rooms) => {
            console.log('Se eliminaron todas las consultorios correctamente');
            result(utils.createSuccessResponse(response, 'Se eliminaron todas las consultorios correctamente'));
        })
        .catch((error) => {
            utils.handleError(error, result);
            console.log('Error al eliminar todas las consultorios : ', error);
            next(utils.createErrorResponse(response, 'Error al eliminar todas las consultorios'));
        });
};

exports.getRoomByName = (name, result) => {
    const response = 'R07';
    roomModel
        .findOne({ where: { name_room: name } })
        .then((room) => {
            if (!room) {
                console.log('El consultorio que intenta obtener no existe, con nombre: ', name);
                return result(utils.createWarningResponse(response, 'El consultorio que intenta obtener no existe'));
            }
            result(utils.createSuccessResponse(response, '', room.dataValues));
        })
        .catch((error) => {
            console.log('Error al obtener el consultorio con nombre: ', name, ' : ', error);
            next(utils.createErrorResponse(response, 'Error al obtener el consultorio'));
        });
};

exports.updateImages = (id, image_room) =>
    new Promise((resolve, reject) => {
        const response = 'R08';
        console.log('2 - updateImages');

        roomModel
            .update({ image_room }, { where: { id_room: id } })
            .then((room) => {
                console.log('2.1 - updateImages ', room);
                if (room[0] == 0) {
                    return resolve(utils.createWarningResponse(response, 'El consultorio que intenta actualizar no existe'));
                }
                resolve(utils.createSuccessResponse(response, 'Se ha actualizado el consultorio correctamente'));
            })
            .catch((error) => {
                console.log('2.2 - updateImages error ', error);
                return resolve(utils.createWarningResponse(response, 'Error al cargar las imagenes'));
            });
    });

createRoomModel = (req) => {
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