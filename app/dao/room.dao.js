const RoomModel = require('../models/room.model');
const FeatureModel = require('../models/feature.model');
const RoomImageModel = require('../models/room_image.model');
const Utils = require('../common/Utils');
const Sequelize = require('sequelize');
RoomModel.belongsToMany(FeatureModel, { through: 'feature_room', foreignKey: 'id_room' });
FeatureModel.belongsToMany(RoomModel, { through: 'feature_room', foreignKey: 'id_feature' });

exports.create = async(roomCreate, featuresId, next, result) => {
    const response = 'R01';

    try {
        const room = await RoomModel.create(roomCreate);
        const features = await FeatureModel.findAll({
            where: {
                id_feature: featuresId,
            },
        });
        await room.addFeatures(features);
        return result(Utils.createSuccessResponse(response, 'Se ha creado el consultorio correctamente', room));
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            return result(Utils.createWarningResponse(response, 'Ya existe un consultorio con ese nombre'));
        } else {
            next(Utils.createErrorResponse(response, 'Error al crear el consultorio', error));
        }
    }
};
exports.addImages = async(images, result) => {
    const response = 'R09';
    RoomImageModel.bulkCreate(images)
        .then(() => {
            return result(Utils.createSuccessResponse(response, 'Se ha creado el consultorio correctamente'));
        })
        .catch(() => {
            return result(
                Utils.createWarningResponse(response, 'Se ha creado exitosamente el consultorio pero hubo un problema al cargar las images')
            );
        });
};

exports.getRoomById = (id, result) => {
    const response = 'R02';
    RoomModel.findOne({ where: { id_room: id } })
        .then((room) => {
            if (!room) {
                console.log('El consultorio que intenta obtener no existe, con id: ', id);
                return result(Utils.createWarningResponse(response, 'El consultorio que intenta obtener no existe'));
            }
            result(Utils.createSuccessResponse(response, '', room.dataValues));
        })
        .catch((error) => {
            console.log('Error al obtener el consultorio con id: ', id, ' : ', error);
            next(Utils.createErrorResponse(response, 'Error al obtener el consultorio'));
        });
};

exports.updateById = (id, roomUpdate, next, result) => {
    const response = 'R03';
    RoomModel.update(roomUpdate, { where: { id_room: id } })
        .then((room) => {
            if (room[0] == 0) {
                return result(Utils.createWarningResponse(response, 'El consultorio que intenta actualizar no existe'));
            }
            result(Utils.createSuccessResponse(response, 'Se ha actualizado el consultorio correctamente'));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al actualizar el consultorio', error));
        });
};

exports.deleteById = (id, result) => {
    const response = 'R04';
    RoomModel.findOne({ where: { id_room: id } })
        .then((room) => {
            if (!room) {
                console.log('El consultorio que intenta eliminar no existe, consultorio id: ', id);
                return result(Utils.createWarningResponse(response, 'El consultorio que intenta eliminar no existe'));
            }
            RoomModel.destroy({ where: { id_room: id } })
                .then(() => {
                    console.log('Se elimino correctamente el consultorio con id: ' + id);
                    result(Utils.createSuccessResponse(response, 'Se ha eliminado el consultorio correctamente', room.dataValues));
                })
                .catch((error) => {
                    console.log('Error al eliminar el consultorio con id: ', id, ' : ', error);
                    next(Utils.createErrorResponse(response, 'Error al eliminar el consultorio'));
                });
        })
        .catch((error) => {
            console.log('Error al eliminar el consultorio con id: ', id, ' : ', error);
            next(Utils.createErrorResponse(response, 'Error al eliminar el consultorio'));
        });
};

exports.getAll = (next, result) => {
    const response = 'R05';
    RoomModel.findAll({
            include: [{
                    model: RoomImageModel,
                    attributes: ['path_room_image'],
                },
                {
                    model: FeatureModel, // many to many
                    through: { attributes: [] }, // Esto es para no traer los elementos de la tabla de relacion (featureRoom)
                },
            ],
        })
        .then((rooms) => {
            result(Utils.createSuccessResponse(response, '', rooms));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al obtener todas las consultorios', error));
        });
};

exports.deleteAll = (result) => {
    const response = 'R06';
    RoomModel.destroy({ where: {} })
        .then((rooms) => {
            console.log('Se eliminaron todas las consultorios correctamente');
            result(Utils.createSuccessResponse(response, 'Se eliminaron todas las consultorios correctamente'));
        })
        .catch((error) => {
            Utils.handleError(error, result);
            console.log('Error al eliminar todas las consultorios : ', error);
            next(Utils.createErrorResponse(response, 'Error al eliminar todas las consultorios'));
        });
};

exports.getRoomByName = (name, result) => {
    const response = 'R07';
    RoomModel.findOne({ where: { name_room: name } })
        .then((room) => {
            if (!room) {
                console.log('El consultorio que intenta obtener no existe, con nombre: ', name);
                return result(Utils.createWarningResponse(response, 'El consultorio que intenta obtener no existe'));
            }
            result(Utils.createSuccessResponse(response, '', room.dataValues));
        })
        .catch((error) => {
            console.log('Error al obtener el consultorio con nombre: ', name, ' : ', error);
            next(Utils.createErrorResponse(response, 'Error al obtener el consultorio'));
        });
};

exports.updateImages = (id, image_room) =>
    new Promise((resolve, reject) => {
        const response = 'R08';
        console.log('2 - updateImages');

        RoomModel.update({ image_room }, { where: { id_room: id } })
            .then((room) => {
                console.log('2.1 - updateImages ', room);
                if (room[0] == 0) {
                    return resolve(Utils.createWarningResponse(response, 'El consultorio que intenta actualizar no existe'));
                }
                resolve(Utils.createSuccessResponse(response, 'Se ha actualizado el consultorio correctamente'));
            })
            .catch((error) => {
                console.log('2.2 - updateImages error ', error);
                return resolve(Utils.createWarningResponse(response, 'Error al cargar las imagenes'));
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