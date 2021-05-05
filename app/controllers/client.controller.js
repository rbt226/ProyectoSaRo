const ClientDao = require('../dao/client.dao');
const UserDao = require('../dao/user.dao');
const Utils = require('../common/Utils');
const cloudinary = require('../config/cloudinary');

exports.signUp = (req, res, next) => {
    const { file, body } = req;
    const { userName } = body;
    const userCreate = createUserModel(body);
    UserDao.create(userCreate, next, (resp) => {
        if (Utils.isResponseOk(resp)) {
            const { id_user: idUser } = resp.data; // Me quedo con el id del nuevo usuario
            req.body.idUser = idUser; //  Para pasarle al client
            const clientCreate = createClientModel(req.body);
            createClientSignUp(clientCreate, userName, next, file, res);
        } else {
            res.send(resp);
        }
    });
};

exports.getClientById = (req, res, next) => {
    const { id } = req.params;
    ClientDao.getClientById(id, next, (data) => {
        res.send(data);
    });
};

exports.updateById = (req, res, next) => {
    const { id } = req.params;
    const clientCreate = createClientModel(req.body);
    ClientDao.updateById(id, clientCreate, next, (data) => {
        res.send(data);
    });
};

exports.deleteById = (req, res, next) => {
    const { id } = req.params;
    ClientDao.deleteById(id, next, (data) => {
        res.send(data);
    });
};

exports.getAll = (req, res, next) => {
    ClientDao.getAll(next, (data) => {
        res.send(data);
    });
};

exports.deleteAll = (req, res, next) => {
    ClientDao.deleteAll(next, (data) => {
        res.send(data);
    });
};

exports.deleteByUserId = (req, res, next) => {
    const { id } = req.params;
    ClientDao.deleteByUserId(id, next, (data) => {
        res.send(data);
    });
};

createClientSignUp = (clientCreate, user_name, next, file, res) => {
    ClientDao.create(clientCreate, next, async(data) => {
        const { path } = file;
        if (path) {
            await cloudinary.uploads(path, 'img', 'Usuarios', user_name);
        }
        return res.send(data);
    });
};

createUserModel = (body) => {
    return {
        email: body.email,
        user_name: body.userName,
        mobile_phone: body.mobilePhone,
        password: body.password,
        image_user: body.image ? body.image : 'Site/defaultUser',
        active_user: body.active ? body.active : 0,
        id_role: body.idRole ? body.idRole : 1, //TODO
        created_at: new Date(),
    };
};

createClientModel = (body) => {
    return {
        id_user: body.idUser,
        name_client: body.name,
        last_name: body.lastName,
        document: body.document,
        id_occupation: body.idOccupation ? body.idOccupation : 1, // TODO
    };
};