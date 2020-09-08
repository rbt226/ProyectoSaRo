const FeatureRoomDao = require('../dao/feature_room.dao');
const Utils = require('../common/Utils');

exports.create = (req, res) => {
    FeatureRoomDao.create(req, (error, resp) => {
        if (error) return res.status(500).send(error);
        res.send(resp);
    });
};

exports.getFeatureRoomById = (req, res) => {
    FeatureRoomDao.getFeatureRoomById(req.params.id, (error, resp) => {
        if (error) return res.status(500).send(error);
        if (!Utils.isResponseOk(resp)) return res.status(404).send(resp);
        res.send(resp);
    });
};

exports.updateById = (req, res) => {
    const id = req.params.id;
    FeatureRoomDao.updateById(id, req, (error, resp) => {
        if (error) return res.status(500).send(error);
        if (!Utils.isResponseOk(resp)) return res.status(404).send(resp);
        res.send(resp);
    });
};

exports.deleteById = (req, res) => {
    FeatureRoomDao.deleteById(req.params.id, (error, resp) => {
        if (error) return res.status(500).send(error);
        if (!Utils.isResponseOk(resp)) return res.status(404).send(resp);
        res.send(resp);
    });
};

exports.getAll = (req, res) => {
    FeatureRoomDao.getAll((error, resp) => {
        if (error) return res.status(500).send(error);
        res.send(resp);
    });
};

exports.deleteAll = (req, res) => {
    FeatureRoomDao.deleteAll((error, resp) => {
        if (error) return res.status(500).send(error);
        res.send(resp);
    });
};
exports.getAllByRoom = (req, res) => {
    FeatureRoomDao.getAllByRoom((error, resp) => {
        if (error) return res.status(500).send(error);
        res.send(resp);
    });
};

exports.deleteAllByRoom = (req, res) => {
    FeatureRoomDao.deleteAllByRoom((error, resp) => {
        if (error) return res.status(500).send(error);
        res.send(resp);
    });
};

exports.createFeaturesByRoom = (req, res) => {
    FeatureRoomDao.deleteAllByRoom((error, resp) => {
        if (error) return res.status(500).send(error);
        res.send(resp);
    });
};