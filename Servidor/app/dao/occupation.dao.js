const occupationModel = require("../models/occupation.model");

exports.create = (req, result) => {
  const occupationCreate = createOccupationModel(req);
  occupationModel
    .create(occupationCreate)
    .then((newOccupation) => {
      result(null, newOccupation);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
      return;
    });
};

exports.getAll = (result) => {
  occupationModel
    .findAll()
    .then((occupations) => {
      console.log("occupations: ", occupations);
      result(null, occupations);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.getOccupationById = (id, result) => {
  occupationModel
    .findOne({ where: { id_occupation: id } })
    .then((occupation) => {
      if (!occupation) {
        return result({ kind: "not_found" }, null);
      }
      console.log("occupation: ", occupation);
      result(null, occupation);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.deleteById = (id, result) => {
  occupationModel
    .destroy({ where: { id_occupation: id } })
    .then((occupationModel) => {
      if (!occupationModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("deleted occupation with occupationId" + id);

      result(null, occupationModel);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};
exports.deleteAll = (result) => {
  occupationModel
    .destroy({ where: {} })
    .then((occupations) => {
      console.log(`deleted ${occupations} occupations`);
      result(null, occupations);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.updateById = (id, req, result) => {
  const occupationUpdate = createOccupationModel(req);

  occupationModel
    .update(occupationUpdate, { where: { id_occupation: id } })
    .then(() => {
      occupationModel
        .findByPk(id)
        .then((occupation) => {
          if (!occupation) {
            return result({ kind: "not_found" }, null);
          }
          console.log("Occupations updated: ", occupation);
          result(null, occupation);
        })
        .catch((error) => {
          console.log("error: ", error);
          result(error, null);
        });
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

createOccupationModel = (req) => {
  return {
    type_occupation: req.body.type,
    active_occupation: req.body.active,
    image_occupation: req.body.image,
  };
};
