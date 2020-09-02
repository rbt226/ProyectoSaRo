const userDao = require('../dao/user.dao');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const utils = require('../common/utils');

exports.create = (req, res, next) => {
    const userCreate = createUserModel(req.body);
    userDao.create(userCreate, next, (data) => {
        res.send(data);
    });
};

exports.getUserById = (req, res, next) => {
    const { id } = req.params;
    userDao.getUserById(id, next, (data) => {
        res.send(data);
    });
};

exports.updateById = (req, res, next) => {
    const { id } = req.params;
    const userUpdate = createUserModel(req.body);

    userDao.updateById(id, userUpdate, next, (data) => {
        res.send(data);
    });
};

exports.deleteById = (req, res, next) => {
    const { id } = req.params;
    userDao.deleteById(id, next, (data) => {
        const { dataValues } = data;
        const { user_name, image_user } = dataValues;
        if (image_user === user_name) {
            // Se elimina la imagen de cloudinary si la imagen no es la default
            cloudinary.api.delete_resources(user_name, { invalidate: true, resource_type: 'image' }, function(err, res) {
                if (err) {
                    console.log(`Error al eliminar la imagen del usuario con id : ${id} en cloudinary: `, err);
                }
            });
        }
        res.send(data);
    });
};

exports.getAll = (req, res, next) => {
    userDao.getAll(next, (data) => {
        res.send(data);
    });
};

exports.deleteAll = (req, res, next) => {
    userDao.deleteAll(next, (data) => {
        res.send(data);
    });
};

exports.signIn = (req, res, next) => {
    const { body } = req;
    const { email, password } = body;
    userDao.signIn(email, password, next, (data) => {
        if (!utils.isResponseOk(data)) {
            res.send(data);
        } else {
            const token = jwt.sign({ _id: data.id_user }, 'secretKey');
            data.token = token;
            res.send(data);
        }
    });
};

exports.getUserByEmail = (req, res, next) => {
    const { email } = req.body;
    userDao.getUserByEmail(email, next, (data) => {
        res.send(data);
    });
};


createUserModel = (body) => {
    return {
        email: body.email,
        user_name: body.userName,
        mobile_phone: body.mobilePhone,
        password: body.password,
        image_user: body.image ? body.image : 'Site/defaultUser',
        active_user: body.active ? body.active : 1,
        id_role: body.idRole ? body.idRole : 1, //TODO
        created_at: new Date(),
    };
};