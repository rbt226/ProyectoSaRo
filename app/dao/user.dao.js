const userModel = require("../models/user.model");
const utils = require("../common/utils");

exports.create = (req, result) => {
	const response = "U01";
	const userCreate = createUserModel(req);
	userModel
		.create(userCreate)
		.then((newUser) => {
			result(null, utils.createSuccessResponse(response, "Se ha creado el usuario correctamente", newUser));
		})
		.catch((error) => {
			console.log("Error al crear usuario: ", error);
			result(utils.createErrorResponse(response, "Error al crear usuario"));
		});
};

exports.getUserById = (id, result) => {
	const response = "U02";
	userModel
		.findOne({ where: { id_user: id } })
		.then((user) => {
			if (!user) {
				console.log("El usuario que intenta obtener no existe, user id: ", id);
				return result(null, utils.createWarningResponse(response, "El usuario que intenta obtener no existe"));
			}
			return result(null, utils.createSuccessResponse(response, "", user));
		})
		.catch((error) => {
			console.log("Error al obtener usuario con id: ", id, " : ", error);
			result(utils.createErrorResponse(response, "Error al obtener usuario"));
		});
};

exports.updateById = (id, req, result) => {
	const response = "U03";
	const userUpdate = createUserModel(req);
	userModel
		.update(userUpdate, { where: { id_user: id } })
		.then((user) => {
			console.log("user ", user);
			if (user[0] == 0) {
				console.log("El usuario que intenta actualizar no existe, user id: ", id);
				return result(null, utils.createWarningResponse(response, "El usuario que intenta actualizar no existe"));
			}
			console.log("Se ha actualizado el usuario con id: ", id, "correctamente");
			return result(null, utils.createSuccessResponse(response, "Se ha actualizado el usuario correctamente"));
		})
		.catch((error) => {
			console.log("Error al actualizar el usuario con id: ", id, " : ", error);
			result(utils.createErrorResponse(response, "Error al actualizar usuario"));
		});
};

exports.deleteById = (id, result) => {
	const response = "U04";
	userModel
		.findOne({ where: { id_user: id } })
		.then((user) => {
			if (!user) {
				console.log("El usuario que intenta eliminar no existe, user id: ", id);
				return result(null, utils.createWarningResponse(response, "El usuario que intenta eliminar no existe"));
			}
			userModel
				.destroy({ where: { id_user: id } })
				.then((userDeleted) => {
					console.log("Se ha eliminado el usuario con id: ", id, "correctamente");
					return result(null, utils.createSuccessResponse(response, "Se ha eliminado el usuario correctamente"));
				})
				.catch((error) => {
					console.log("Error al eliminar el usuario con id: ", id, " : ", error);
					result(utils.createErrorResponse(response, "Error al eliminar usuario"));
				});
		})
		.catch((error) => {
			console.log("Error al eliminar el usuario con id: ", id, " : ", error);
			result(utils.createErrorResponse(response, "Error al eliminar usuario"));
		});
};

exports.getAll = (result) => {
	const response = "U05";
	userModel
		.findAll()
		.then((users) => {
			console.log("Se han obtenido todos los usuarios correctamente");
			return result(null, utils.createSuccessResponse(response, "", users));
		})
		.catch((error) => {
			console.log("Error al obtener todos los usuarios: ", error);
			result(utils.createErrorResponse(response, "Error al obtener todos los usuarios"));
		});
};

exports.deleteAll = (result) => {
	const response = "U06";
	userModel
		.destroy({ where: {} })
		.then((users) => {
			console.log("Se eliminaron todos los usuarios correctamente");
			return result(null, utils.createSuccessResponse(response, "Se eliminaron todos los usuarios correctamente", users));
		})
		.catch((error) => {
			console.log("Error al eliminar todos los usuarios: ", error);
			result(utils.createErrorResponse(response, "Error al eliminar todos los usuarios"));
		});
};

exports.signIn = (email, password, result) => {
	const response = "U07";
	userModel
		.findOne({ where: { email: email } })
		.then((us) => {
			if (us && us.password === password) {
				const user = createResponseUser(us);
				result(null, utils.createSuccessResponse(response, "", user));
			} else {
				result(null, utils.createWarningResponse(response, "Usuario o contraseña incorrecta"));
			}
		})
		.catch((error) => {
			console.log("Error iniciar sesion para el usuario con el siguiente email : ", email);
			result(utils.createErrorResponse(response, "Error iniciar sesion"));
		});
};

exports.signUp = (req, result) => {
	const response = "U08";
	const userCreate = createUserModel(req);
	userCreate.active_user = 0;
	userCreate.id_role = 1;
	userModel
		.create(userCreate)
		.then((newUser) => {
			result(null, utils.createSuccessResponse(response, "Se ha registrado el usuario correctamente", newUser.dataValues));
		})
		.catch((error) => {
			console.log("Error al registrar usuario: ", error);
			result(utils.createErrorResponse(response, "Error al registrar usuario"));
		});
};

exports.getUserByEmail = (email, result) => {
	const response = "U09";
	userModel
		.findOne({ where: { email: email } })
		.then((userModel) => {
			if (!userModel) {
				console.log("El email ingresado no esta registrado: ", email);
				return result(null, utils.createWarningResponse(response, "El email ingresado no esta registrado"));
			}
			console.log("Se ha obtenido el usuario con email : ", email, " correctamente");
			const user = createResponseUser(userModel);
			return result(null, utils.createSuccessResponse(response, "", user));
		})
		.catch((error) => {
			console.log("Error al obtener  usuario con email : ", email, " : ", error);
			result(utils.createErrorResponse(response, "Error al obtener usuario"));
		});
};

exports.validate = (email, userName, result) => {
	const response = "U10";
	userModel
		.findAll({
			where: {
				[userModel.operator.or]: [{ email: email }, { user_name: userName }],
			},
		})
		.then((users) => {
			if (!users) {
				console.log("No se han encontrado usuarios con email: ", email, " o con userName ", userName);
				return result(
					null,
					utils.createWarningResponse(response, "No se han encontrado usuarios con email: ", email, " o con userName ", userName)
				);
			}
			result(null, users);
		})
		.catch((error) => {
			console.log("Error al obtener usuario con email : ", email, " : ", error);
			result(utils.createErrorResponse(response, "Error al obtener usuario"));
		});
};

exports.changePassword = (email, password, result) => {
	const response = "U11";
	userModel
		.update({password}, { where: { email } })
		.then((user) => {
			console.log("user ", user);
			if (user[0] == 0) {
				console.log("El usuario que intenta actualizar no existe ");
				return result(null, utils.createWarningResponse(response, "El usuario que intenta actualizar no existe"));
			}
			console.log("Se ha actualizado el usuario correctamente");
			return result(null, utils.createSuccessResponse(response, "Se ha actualizado el usuario correctamente"));
		})
		.catch((error) => {
			console.log("Error al actualizar el usuario  ", error);
			return result(utils.createErrorResponse(response, "Error al actualizar usuario"));
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
		image_user: req.body.image ? req.body.image : "Site/defaultUser",
		active_user: req.body.active,
		id_role: req.body.idRole,
	};
};
