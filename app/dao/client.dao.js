const clientModel = require('../models/client.model');
const userModel = require('../models/user.model');
const utils = require('../common/utils');

exports.create = (clientCreate, next, result) => {
    const response = 'C01';
    const { id_user } = clientCreate;
    clientModel
        .create(clientCreate)
        .then((newClient) => {
            result(
                utils.createSuccessResponse(
                    response,
                    'Se ha creado el usuario correctamente el adminsitrador se pondra en contacto con usted para activar su usuario',
                    newClient
                )
            );
            //TODO mandar mail al admin
        })
        .catch((err) => {
            userModel
                .destroy({ where: { id_user } })
                .then(() => {
                    next(utils.createErrorResponse(response, 'Error al crear cliente', err));
                })
                .catch((error) => {
                    next(utils.createErrorResponse(response, 'Error al crear cliente', err));
                });
        });
};

exports.getClientById = (id, next, result) => {
    const response = 'C02';
    clientModel
        .findOne({ where: { id_client: id } })
        .then((client) => {
            if (!client) {
                return result(utils.createWarningResponse(response, 'El cliente que intenta obtener no existe'));
            }
            return result(utils.createSuccessResponse(response, '', user));
        })
        .catch((error) => {
            next(utils.createErrorResponse(response, 'Error al obtener cliente', error));
        });
};

exports.updateById = (id, clientUpdate, next, result) => {
    const response = 'C03';
    clientModel
        .update(clientUpdate, { where: { id_client: id } })
        .then((client) => {
            if (client[0] == 0) {
                return result(utils.createWarningResponse(response, 'El cliente que intenta actualizar no existe'));
            }
            return result(utils.createSuccessResponse(response, 'Se ha actualizado el cliente correctamente'));
        })
        .catch((error) => {
            next(utils.createErrorResponse(response, 'Error al actualizar cliente', error));
        });
};

exports.deleteById = (id, next, result) => {
    const response = 'C04';
    clientModel
        .findOne({ where: { id_client: id } })
        .then((client) => {
            if (!client) {
                return result(utils.createWarningResponse(response, 'El cliente que intenta eliminar no existe'));
            }
            const { id_user } = client.dataValues.data; //TODO : ver como lo devuelve
            clientModel
                .destroy({ where: { id_client: id } })
                .then(() => {
                    userModel
                        .destroy({ where: { id_user } })
                        .then(() => {
                            return result(utils.createSuccessResponse(response, 'Se ha eliminado el cliente correctamente'));
                        })
                        .catch((error) => {
                            next(utils.createErrorResponse(response, 'Error al eliminar cliente', error));
                        });
                })
                .catch((error) => {
                    next(utils.createErrorResponse(response, 'Error al eliminar cliente', error));
                });
        })
        .catch((error) => {
            next(utils.createErrorResponse(response, 'Error al eliminar cliente', error));
        });
};

exports.getAll = (next, result) => {
    const response = 'C05';
    clientModel
        .findAll()
        .then((users) => {
            return result(utils.createSuccessResponse(response, '', users));
        })
        .catch((error) => {
            next(utils.createErrorResponse(response, 'Error al obtener todos los clientes', error));
        });
};

exports.deleteAll = (next, result) => {
    const response = 'C06';
    clientModel
        .destroy({ where: {} })
        .then((users) => {
            return result(utils.createSuccessResponse(response, 'Se eliminaron todos los clientes correctamente', users));
        })
        .catch((error) => {
            next(utils.createErrorResponse(response, 'Error al eliminar todos los clientes', error));
        });
};

exports.deleteByUserId = (id_user, next, result) => {
    const response = 'C07';
    clientModel
        .findOne({ where: { id_user } })
        .then((client) => {
            if (!client) {
                return result(utils.createWarningResponse(response, 'El cliente que intenta eliminar no existe'));
            }
            const { id_user } = client.dataValues.data; //TODO : ver como lo devuelve
            clientModel
                .destroy({ where: { id_client: id } })
                .then(() => {
                    userModel
                        .destroy({ where: { id_user } })
                        .then(() => {
                            return result(utils.createSuccessResponse(response, 'Se ha eliminado el cliente correctamente'));
                        })
                        .catch((error) => {
                            next(utils.createErrorResponse(response, 'Error al eliminar cliente', error));
                        });
                })
                .catch((error) => {
                    next(utils.createErrorResponse(response, 'Error al eliminar cliente', error));
                });
        })
        .catch((error) => {
            next(utils.createErrorResponse(response, 'Error al eliminar cliente', error));
        });
};