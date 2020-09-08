const featureDao = require('../dao/feature.dao');
const Utils = require('../common/Utils');

exports.create = (req, res) => {
    featureDao.create(req, (error, resp) => {
        if (error) return res.status(500).send(error);
        res.send(resp);
    });
};

exports.getFeatureById = (req, res) => {
    featureDao.getFeatureById(req.params.id, (error, resp) => {
        if (error) return res.status(500).send(error);
        if (!Utils.isResponseOk(resp)) return res.status(404).send(resp);
        res.send(resp);
    });
};

exports.updateById = (req, res) => {
    const id = req.params.id;
    featureDao.updateById(id, req, (error, resp) => {
        if (error) return res.status(500).send(error);
        if (!Utils.isResponseOk(resp)) return res.status(404).send(resp);
        res.send(resp);
    });
};

exports.deleteById = (req, res) => {
    featureDao.deleteById(req.params.id, (error, resp) => {
        if (error) return res.status(500).send(error);
        if (!Utils.isResponseOk(resp)) return res.status(404).send(resp);
        res.send(resp);
    });
};

exports.getAll = (req, res) => {
    featureDao.getAll((error, resp) => {
        if (error) return res.status(500).send(error);
        res.send(resp);
    });
};

exports.deleteAll = (req, res) => {
    featureDao.deleteAll((error, resp) => {
        if (error) return res.status(500).send(error);
        res.send(resp);
    });
};