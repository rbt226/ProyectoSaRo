const RoomDao = require('../dao/room.dao');
const FeatureRoomDao = require('../dao/feature_room.dao');
const cloudinary = require('../config/cloudinary');

const Utils = require('../common/Utils');
const fs = require('fs');

exports.create = async(req, res, next) => {
    const { body } = req;
    const { features } = body;
    const roomCreate = createRoomModel(body);
    RoomDao.create(roomCreate, JSON.parse(features), next, async(resp) => {
        if (!Utils.isResponseOk(resp)) return res.send(resp); // Ya existe un consultorio con el nombre indicado
        const { data } = resp;
        const { dataValues } = data;
        const { id_room } = dataValues;
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
        RoomDao.addImages(images, (resp) => {
            return res.send(resp);
        });
    });
};

exports.getRoomById = (req, res, next) => {
    const { id } = req.params;
    RoomDao.getRoomById(id, next, (data) => {
        res.send(data);
    });
};

exports.updateById = (req, res, next) => {
    const { id } = req.params;
    const roomUpdate = createRoomModel(req.body);
    RoomDao.updateById(id, roomUpdate, next, (data) => {
        res.send(data);
    });
};

exports.deleteById = (req, res, next) => {
    const { id } = req.params;

    RoomDao.deleteById(id, next, async(resp) => {
        if (!Utils.isResponseOk(resp)) return res.send(resp);
        const { data } = resp;
        const { room_images } = data;
        const publicIds = room_images.map((id) => id.path_room_image);
        await cloudinary.deleteImages(publicIds);
        res.send(resp);
    });
};

exports.getAll = (req, res, next) => {
    RoomDao.getAll(next, (data) => {
        res.send(data);
    });
};

exports.deleteAll = (req, res, next) => {
    RoomDao.getAll(next, async(resp) => {
        const { data } = resp;
        let images = [];
        data.map((room) => {
            const { room_images } = room;
            room_images.map((path) => images.push(path.path_room_image));
        });
        await cloudinary.deleteImages(images);
        RoomDao.deleteAll(next, (data) => {
            res.send(data);
        });
    });
};

createRoomModel = (body) => {
    return {
        name_room: body.name,
        active_room: body.active,
        description: body.description,
    };
};