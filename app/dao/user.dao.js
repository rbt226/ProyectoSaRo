const UserModel = require('../models/user.model');
const Utils = require('../common/Utils');

exports.create = (userCreate, next, result) => {
    const response = 'U01';
    const { email, user_name } = userCreate;
    UserModel.findAll({
            where: {
                [UserModel.operator.or]: [{ email }, { user_name }],
            },
        })
        .then((users) => {
            if (users.length == 0) {
                // Si no existe usuario, lo crea
                UserModel.create(userCreate)
                    .then((newUser) => {
                        return result(Utils.createSuccessResponse(response, 'Se ha registrado el usuario correctamente', newUser.dataValues));
                    })
                    .catch((error) => {
                        next(Utils.createErrorResponse(response, 'Error al registrar usuario', error));
                    });
            } else {
                let data = {
                    email: false,
                    userName: false,
                };
                users.forEach((user) => {
                    const { dataValues } = user;
                    // Recorro todos los usuarios para verificar si lo que esta repetido es el email o el userName
                    if (dataValues.user_name === user_name) {
                        data.userName = true;
                    }
                    if (dataValues.email === email) {
                        data.email = true;
                    }
                    return result(Utils.createWarningResponse(response, 'Error de validación al registrar usuario', data));
                });
            }
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al registrar usuario', error));
        });
};

exports.getUserById = (id, next, result) => {
    const response = 'U02';
    UserModel.findOne({ where: { id_user: id } })
        .then((user) => {
            if (!user) {
                return result(Utils.createWarningResponse(response, 'El usuario que intenta obtener no existe'));
            }
            return result(Utils.createSuccessResponse(response, '', user));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al obtener usuario', error));
        });
};

exports.updateById = (id, userUpdate, next, result) => {
    const response = 'U03';
    UserModel.update(userUpdate, { where: { id_user: id } })
        .then((user) => {
            if (user[0] == 0) {
                return result(Utils.createWarningResponse(response, 'El usuario que intenta actualizar no existe'));
            }
            return result(Utils.createSuccessResponse(response, 'Se ha actualizado el usuario correctamente'));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al actualizar usuario', error));
        });
};

exports.deleteById = (id, next, result) => {
    const response = 'U04';
    UserModel.findOne({ where: { id_user: id } })
        .then((user) => {
            if (!user) {
                return result(Utils.createWarningResponse(response, 'El usuario que intenta eliminar no existe'));
            }
            UserModel.destroy({ where: { id_user: id } })
                .then(() => {
                    return result(Utils.createSuccessResponse(response, 'Se ha eliminado el usuario correctamente', user));
                })
                .catch((error) => {
                    next(Utils.createErrorResponse(response, 'Error al eliminar usuario', error));
                });
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al eliminar usuario', error));
        });
};

exports.getAll = (next, result) => {
    const response = 'U05';
    UserModel.findAll()
        .then((users) => {
            return result(Utils.createSuccessResponse(response, '', users));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al obtener todos los usuarios', error));
        });
};

exports.deleteAll = (next, result) => {
    const response = 'U06';
    UserModel.destroy({ where: {} })
        .then((users) => {
            return result(Utils.createSuccessResponse(response, 'Se eliminaron todos los usuarios correctamente', users));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al eliminar todos los usuarios', error));
        });
};

exports.signIn = (email, password, next, result) => {
    const response = 'U07';
    UserModel.findOne({ where: { email: email } })
        .then((us) => {
            if (us && us.password === password) {
                const user = createResponseUser(us);
                result(Utils.createSuccessResponse(response, '', user));
            } else {
                result(Utils.createWarningResponse(response, 'Usuario o contraseña incorrecta'));
            }
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error iniciar sesion', error));
        });
};

exports.signUp = (email, userName, userCreate, next, result) => {
    const response = 'U08';
    UserModel.findAll({
            where: {
                [UserModel.operator.or]: [{ email }, { user_name: userName }],
            },
        })
        .then((users) => {
            if (!users) {
                // Si no existe usuario, lo crea
                UserModel.create(userCreate)
                    .then((newUser) => {
                        return result(Utils.createSuccessResponse(response, 'Se ha registrado el usuario correctamente', newUser.dataValues));
                    })
                    .catch((error) => {
                        next(Utils.createErrorResponse(response, 'Error al registrar usuario', error));
                    });
            } else {
                let data = {
                    email: false,
                    userName: false,
                };
                users.forEach((user) => {
                    // Recorro todos los usuarios para verificar si lo que esta repetido es el email o el userName
                    if (user.user_name === userName) {
                        data.userName = true;
                    }
                    if (user.email === email) {
                        data.email = true;
                    }
                    return result(Utils.createWarningResponse(response, 'Error de validación al registrar usuario', data));
                });
            }
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al registrar usuario', error));
        });
};

exports.getUserByEmail = (email, next, result) => {
    const response = 'U09';
    UserModel.findOne({ where: { email } })
        .then((UserModel) => {
            if (!UserModel) {
                return result(Utils.createWarningResponse(response, 'El email ingresado no esta registrado'));
            }
            const user = createResponseUser(UserModel);
            return result(Utils.createSuccessResponse(response, '', user));
        })
        .catch((error) => {
            next(Utils.createErrorResponse(response, 'Error al obtener usuario', error));
        });
};

exports.changePassword = (email, password, next, result) => {
    const response = 'U11';
    UserModel.update({ password }, { where: { email } })
        .then((user) => {
            if (user[0] == 0) {
                return result(Utils.createWarningResponse(response, 'El usuario que intenta actualizar no existe'));
            }
            return result(Utils.createSuccessResponse(response, 'Se ha actualizado el usuario correctamente'));
        })
        .catch((error) => {
            return next(Utils.createErrorResponse(response, 'Error al actualizar usuario', error));
        });
};

exports.updateImage = (id_user, image_user) => {
    UserModel.update({ image_user }, { where: { id_user } })
        .then((user) => {
            if (user[0] == 0) {
                console.log(`El usuario que intenta actualizar la imagen no existe ${id_user} `);
            }
        })
        .catch((error) => {
            console.log(`Error al actualizar la imagen del usuario ${id_user} `, error.errors[0].message);
        });
};

createResponseUser = (user) => {
    return {
        user_name: user.user_name,
        image_user: user.image_user,
        active_user: user.active_user,
        id_role: user.id_role,
    };
};

createUserModel = (req) => {
    return {
        email: req.body.email,
        user_name: req.body.userName,
        mobile_phone: req.body.mobilePhone,
        password: req.body.password,
        image_user: req.body.image ? req.body.image : 'Site/defaultUser',
        active_user: req.body.active,
        id_role: req.body.idRole,
        created_at: new Date(),
    };
};