const clientDao = require('../dao/client.dao');
const userDao = require('../dao/user.dao');
const IncomingForm = require('formidable').IncomingForm;
const FileReader = require('filereader');
const utils = require('../common/utils');

exports.signUp = (req, res, next) => {
    const form = new IncomingForm();
    let file = null;
    form.parse(req, async function(err, fields, files) {
        req.body = fields;
        const { body } = req;
        const { userName } = body;
        if (files.file) {
            file = files.file;
            req.body.image = 'Usuarios/' + userName; //si viene una imagen el publicId de cloudinary es el userName
        }
        const userCreate = createUserModel(req.body);
        userDao.create(userCreate, next, (resp) => {
            if (utils.isResponseOk(resp)) {
                const { id_user: idUser } = resp.data; // Me quedo con el id del nuevo usuario
                req.body.idUser = idUser; //  Para pasarle al client
                const clientCreate = createClientModel(req.body);
                createClientSignUp(clientCreate, next, file, res, userName);
            } else {
                res.send(resp);
            }
        });
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

createClientSignUp = (clientCreate, next, file, res, userName) => {
    const { id_user } = clientCreate;
    clientDao.create(clientCreate, next, (data) => {
        // Si no eligio la imagen por defecto entonces hay un file
        if (file) {
            uploadImageCloudinary(file, userName, id_user);
        }
        return res.send(data);
    });
};

uploadImageCloudinary = (file, userName, idUser) => {
    const reader = new FileReader();
    const { uploader } = cloudinary;
    reader.readAsDataURL(file);
    reader.onload = () => {
        const dataUri = reader.result;
        if (dataUri) {
            uploader.upload(dataUri, { public_id: userName, tags: 'Usuarios', folder: 'Usuarios' }, function(err, res) {
                if (err) {
                    console.log('Error en cloudinary al dar de alta la imagen :', err);
                    userDao.updateImage(idUser, 'Site/defaultUser', (data) => {});
                }
            });
        }
    };
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