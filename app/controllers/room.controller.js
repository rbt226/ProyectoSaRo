const roomDao = require('../dao/room.dao');
const featureRoomDao = require('../dao/feature_room.dao');
// const cloudinary = require('cloudinary').v2;
const cloudinary = require('../config/cloudinary');

const IncomingForm = require('formidable').IncomingForm;
const FileReader = require('filereader');
const utils = require('../common/utils');
const upload = require('../config/multer');
const fs = require('fs');

exports.create = async(req, res, next) => {
    const { body } = req;
    const { features } = body;
    const roomCreate = createRoomModel(body);
    roomDao.create(roomCreate, JSON.parse(features), next, async(resp) => {
        if (!utils.isResponseOk(resp)) return res.send(resp); // Ya existe un consultorio con el nombre indicado
        // Subir a cloudinary
        const { id_room } = resp.data.dataValues;
        const uploader = async(path, index) => await cloudinary.uploads(path, index, 'Consultorios', id_room);
        let images = [];
        const files = req.files;
        let index = 1;
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path, index++);
            const { id: path_room_image } = newPath;
            images.push({ id_room, path_room_image });
            fs.unlinkSync(path);
        }
        roomDao.addImages(images, (resp) => {
            return res.send(resp);
        });
    });
};

exports.getRoomById = (req, res, next) => {
    roomDao.getRoomById(req.params.id, (error, resp) => {
        if (error) return res.status(500).send(error);
        if (!utils.isResponseOk(resp)) return res.send(resp);
        let data = resp.data;
        const roomId = data.id_room;
        const images = data.image_room.split('|');
        data.images = images;
        resp.data = data;
        featureRoomDao.getFeatureRoomById(roomId, (errorF, respF) => {
            if (errorF) return res.status(500).send(errorF);
            if (utils.isResponseOk(respF)) {
                data.features = respF.data;
                resp.data = data;
            }
            res.send(resp);
        });
    });
};

exports.updateById = (req, res, next) => {
    const { id } = req.params;
    const roomUpdate = createRoomModel(req.body);
    roomDao.updateById(id, roomUpdate, next, (data) => {
        res.send(data);
    });
};

exports.deleteById = (req, res, next) => {
    roomDao.deleteById(req.params.id, (error, resp) => {
        if (error) return res.status(500).send(error);
        if (!utils.isResponseOk(resp)) return res.send(resp);

        const images = resp.data.image_room.split('|');
        // Se elimina la imagen de cloudinary si la imagen no es la default
        images.map((image) => {
            cloudinary.api.delete_resources(image, { invalidate: true, resource_type: 'image' }, function(err, res) {
                if (err) {
                    console.log('Error en cloudinary :', err);
                }
                console.log('Respuesta De cloudinary: ', res);
            });
        });
        res.send(resp);
    });
};

exports.getAll = (req, res, next) => {
    roomDao.getAll(next, (data) => {
        res.send(data);
    });
};

// exports.getAll = (req, res, next) => {
//     roomDao.getAll(next, (resp) => {

//         // let images;
//         // let result = [];
//         // const rooms = resp.data.map(
//         //     (room) =>
//         //     new Promise((resolve, reject) => {
//         //         let values = room.dataValues;
//         //         const roomId = values.id_room;
//         //         images = values.image_room.split('|');
//         //         values.images = images;
//         //         values.features = [];
//         //         featureRoomDao.getFeatureRoomByIdRoom(roomId, next, (respF) => {
//         //             if (utils.isResponseOk(respF)) {
//         //                 values.features = respF.data;
//         //             }
//         //             result.push(values);
//         //             resolve(result);
//         //         });
//         //     })
//         // );

//         // Promise.all(rooms)
//         //     .then((resultP) => {
//         //         resp.data = result;
//         //         res.send(resp);
//         //     })
//         //     .catch((errorF) => {
//         //         return res.status(500).send(errorF);
//         //     });
//     });
// };

exports.deleteAll = (req, res, next) => {
    roomDao.deleteAll(next, (data) => {
        res.send(data);
    });
};

createRoomModel = (body) => {
    return {
        name_room: body.name,
        active_room: body.active,
        description: body.description,
    };
};