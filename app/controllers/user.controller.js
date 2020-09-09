const UserDao = require('../dao/user.dao');
const cloudinary = require('../config/cloudinary');
const jwt = require('jsonwebtoken');
const Utils = require('../common/Utils');

exports.create = (req, res, next) => {
    const userCreate = createUserModel(req.body);
    UserDao.create(userCreate, next, (data) => {
        res.send(data);
    });
};

exports.getUserById = (req, res, next) => {
    const { id } = req.params;
    UserDao.getUserById(id, next, (data) => {
        res.send(data);
    });
};

exports.updateById = (req, res, next) => {
    const { id } = req.params;
    const userUpdate = createUserModel(req.body);

    UserDao.updateById(id, userUpdate, next, (data) => {
        res.send(data);
    });
};

exports.deleteById = (req, res, next) => {
    const { id } = req.params;
    UserDao.deleteById(id, next, async(resp) => {
        if (!Utils.isResponseOk(resp)) return res.send(resp);
        const { data } = resp;
        const { user_name, image_user } = data;
        if (!image_user.includes('defaultUser')) {
            console.log('entro?');
            // Se elimina la imagen de cloudinary si la imagen no es la default
            await cloudinary.deleteImages(image_user);
        }
        res.send(resp);
    });
};

exports.getAll = (req, res, next) => {
    UserDao.getAll(next, (data) => {
        res.send(data);
    });
};

exports.deleteAll = (req, res, next) => {
    UserDao.deleteAll(next, (data) => {
        res.send(data);
    });
};

exports.signIn = (req, res, next) => {
    const { body } = req;
    const { email, password } = body;
    UserDao.signIn(email, password, next, (data) => {
        if (!Utils.isResponseOk(data)) {
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
    UserDao.getUserByEmail(email, next, (data) => {
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