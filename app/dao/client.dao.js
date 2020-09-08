const ClientModel = require('../models/client.model');
const UserModel = require('../models/user.model');
const Utils = require('../common/Utils');

exports.create = (clientCreate, next, result) => {
    const response = 'C01';
    const { id_user } = clientCreate;
    ClientModel.create(clientCreate)
        .then((newClient) => {
            result(
                Utils.createSuccessResponse(
                    response,
                    'Se ha creado el usuario correctamente el adminsitrador se pondra en contacto con usted para activar su usuario',
                    newClient
                )
            );
            //TODO mandar mail al admin
        })
        .catch((err) => {
            UserModel.destroy({ where: { id_user } })
                .then(() => {
                    next(Utils.createErrorResponse(response, 'Error al crear cliente', err));
                })
                .catch((error) => {
                    next(Utils.createErrorResponse(response, 'Error al crear cliente', err));
                });
        });
};

exports.getClientById = (id, next, result) => {
    const response = 'C02';
    ClientModel.findOne({ where: { id_client: id } })
        .then((client) => {
            if (!client) {
                return result(Utils.createWarningResponse(response, 'El cliente que intenta obtener no existe'));
            }
            return result(Utils.createSuccessResponse(response, '', user));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al obtener cliente', error));
        });
};

exports.updateById = (id, clientUpdate, next, result) => {
    const response = 'C03';
    ClientModel.update(clientUpdate, { where: { id_client: id } })
        .then((client) => {
            if (client[0] == 0) {
                return result(Utils.createWarningResponse(response, 'El cliente que intenta actualizar no existe'));
            }
            return result(Utils.createSuccessResponse(response, 'Se ha actualizado el cliente correctamente'));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al actualizar cliente', error));
        });
};

exports.deleteById = (id, next, result) => {
    const response = 'C04';
    ClientModel.findOne({ where: { id_client: id } })
        .then((client) => {
            if (!client) {
                return result(Utils.createWarningResponse(response, 'El cliente que intenta eliminar no existe'));
            }
            const { id_user } = client.dataValues.data; //TODO : ver como lo devuelve
            ClientModel.destroy({ where: { id_client: id } })
                .then(() => {
                    UserModel.destroy({ where: { id_user } })
                        .then(() => {
                            return result(Utils.createSuccessResponse(response, 'Se ha eliminado el cliente correctamente'));
                        })
                        .catch((error) => {
                            next(Utils.createErrorResponse(response, 'Error al eliminar cliente', error));
                        });
                })
                .catch((error) => {
                    next(Utils.createErrorResponse(response, 'Error al eliminar cliente', error));
                });
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al eliminar cliente', error));
        });
};

exports.getAll = (next, result) => {
    const response = 'C05';
    ClientModel.findAll()
        .then((users) => {
            return result(Utils.createSuccessResponse(response, '', users));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al obtener todos los clientes', error));
        });
};

exports.deleteAll = (next, result) => {
    const response = 'C06';
    ClientModel.destroy({ where: {} })
        .then((users) => {
            return result(Utils.createSuccessResponse(response, 'Se eliminaron todos los clientes correctamente', users));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al eliminar todos los clientes', error));
        });
};

exports.deleteByUserId = (id_user, next, result) => {
    const response = 'C07';
    ClientModel.findOne({ where: { id_user } })
        .then((client) => {
            if (!client) {
                return result(Utils.createWarningResponse(response, 'El cliente que intenta eliminar no existe'));
            }
            const { id_user } = client.dataValues.data; //TODO : ver como lo devuelve
            ClientModel.destroy({ where: { id_client: id } })
                .then(() => {
                    UserModel.destroy({ where: { id_user } })
                        .then(() => {
                            return result(Utils.createSuccessResponse(response, 'Se ha eliminado el cliente correctamente'));
                        })
                        .catch((error) => {
                            next(Utils.createErrorResponse(response, 'Error al eliminar cliente', error));
                        });
                })
                .catch((error) => {
                    next(Utils.createErrorResponse(response, 'Error al eliminar cliente', error));
                });
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al eliminar cliente', error));
        });
};