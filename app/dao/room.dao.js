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
        .catch((error) => {
            const defaultImage = {
                path_room_image: 'Site/noImage',
            };
            RoomImageModel.create(defaultImage).then();
            return result(
                Utils.createWarningResponse(response, 'Se ha creado exitosamente el consultorio pero hubo un problema al cargar las images')
            );
        });
};

exports.getRoomById = (id, next, result) => {
    const response = 'R02';
    RoomModel.findOne({
            where: { id_room: id },
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
        .then((room) => {
            if (!room) {
                return result(Utils.createWarningResponse(response, 'El consultorio que intenta obtener no existe'));
            }
            result(Utils.createSuccessResponse(response, '', room.dataValues));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al obtener consultorio', error));
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

exports.deleteById = (id, next, result) => {
    const response = 'R04';
    RoomModel.findOne({
            where: { id_room: id },
            include: [{
                model: RoomImageModel,
                attributes: ['path_room_image'],
            }, ],
        })
        .then((room) => {
            if (!room) {
                return result(Utils.createWarningResponse(response, 'El consultorio que intenta eliminar no existe'));
            }
            RoomModel.destroy({ where: { id_room: id } })
                .then(() => {
                    return result(Utils.createSuccessResponse(response, 'Se ha eliminado el consultorio correctamente', room));
                })
                .catch((error) => {
                    next(Utils.createErrorResponse(response, 'Error al eliminar consultorio', error));
                });
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al eliminar consultorio', error));
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

exports.deleteAll = (next, result) => {
    const response = 'R06';
    RoomModel.destroy({ where: {} })
        .then((users) => {
            return result(Utils.createSuccessResponse(response, 'Se eliminaron todos los consultorios correctamente', users));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al eliminar todos los consultorios', error));
        });
};