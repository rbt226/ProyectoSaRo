const featureRoomDao = require('../dao/feature_room.dao');
const utils = require('../common/utils');

exports.create = (req, res) => {
	featureRoomDao.create(req, (error, resp) => {
		if (error) return res.status(500).send(error);
		res.send(resp);
	});
};

exports.getFeatureRoomById = (req, res) => {
	featureRoomDao.getFeatureRoomById(req.params.id, (error, resp) => {
		if (error) return res.status(500).send(error);
		if (!utils.isResponseOk(resp)) return res.status(404).send(resp);
		res.send(resp);
	});
};

exports.updateById = (req, res) => {
	const id = req.params.id;
	featureRoomDao.updateById(id, req, (error, resp) => {
		if (error) return res.status(500).send(error);
		if (!utils.isResponseOk(resp)) return res.status(404).send(resp);
		res.send(resp);
	});
};

exports.deleteById = (req, res) => {
	featureRoomDao.deleteById(req.params.id, (error, resp) => {
		if (error) return res.status(500).send(error);
		if (!utils.isResponseOk(resp)) return res.status(404).send(resp);
		res.send(resp);
	});
};

exports.getAll = (req, res) => {
	featureRoomDao.getAll((error, resp) => {
		if (error) return res.status(500).send(error);
		res.send(resp);
	});
};

exports.deleteAll = (req, res) => {
	featureRoomDao.deleteAll((error, resp) => {
		if (error) return res.status(500).send(error);
		res.send(resp);
	});
};
exports.getAllByRoom = (req, res) => {
	featureRoomDao.getAllByRoom((error, resp) => {
		if (error) return res.status(500).send(error);
		res.send(resp);
	});
};

exports.deleteAllByRoom = (req, res) => {
	featureRoomDao.deleteAllByRoom((error, resp) => {
		if (error) return res.status(500).send(error);
		res.send(resp);
	});
};

exports.createFeaturesByRoom = (req, res) => {
	featureRoomDao.deleteAllByRoom((error, resp) => {
		if (error) return res.status(500).send(error);
		res.send(resp);
	});
};
