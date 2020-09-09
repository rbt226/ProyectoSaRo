const clientDao = require('../dao/client.dao');
const UserDao = require('../dao/user.dao');
const IncomingForm = require('formidable').IncomingForm;
const FileReader = require('filereader');
const Utils = require('../common/Utils');

exports.signUp = (req, res, next) => {
    const { file } = req.file;
    const userCreate = createUserModel(req.body);
    UserDao.create(userCreate, next, (resp) => {
        if (Utils.isResponseOk(resp)) {
            const { id_user: idUser } = resp.data; // Me quedo con el id del nuevo usuario
            req.body.idUser = idUser; //  Para pasarle al client
            const clientCreate = createClientModel(req.body);
            createClientSignUp(clientCreate, next, file, res);
        } else {
            res.send(resp);
        }
    });
};

exports.getClientById = (req, res, next) => {
    const { id } = req.params;
    clientDao.getClientById(id, next, (data) => {
        res.send(data);
    });
};

exports.updateById = (req, res, next) => {
    const { id } = req.params;
    const clientCreate = createClientModel(req.body);
    clientDao.updateById(id, clientCreate, next, (data) => {
        res.send(data);
    });
};

exports.deleteById = (req, res, next) => {
    const { id } = req.params;
    clientDao.deleteById(id, next, (data) => {
        res.send(data);
    });
};

exports.getAll = (req, res, next) => {
    clientDao.getAll(next, (data) => {
        res.send(data);
    });
};

exports.deleteAll = (req, res, next) => {
    clientDao.deleteAll(next, (data) => {
        res.send(data);
    });
};

exports.deleteByUserId = (req, res, next) => {
    const { id } = req.params;
    clientDao.deleteByUserId(id, next, (data) => {
        res.send(data);
    });
};

createClientSignUp = (clientCreate, next, file, res) => {
    const { user_name } = clientCreate;
    clientDao.create(clientCreate, next, async(data) => {
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