const configurationModel = require("../models/configuration.model");
const utils = require("../common/utils");

exports.create = (req, result) => {
  const configurationCreate = createConfigurationModel(req);
  configurationModel
    .create(configurationCreate)
    .then((newConfiguration) => {
      result(null, newConfiguration);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

exports.getAll = (result) => {
  configurationModel
    .findAll()
    .then((configurations) => {
      console.log("configurations: ", configurations);
      result(null, configurations);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

exports.getConfigurationById = (id, result) => {
  configurationModel
    .findOne({ where: { id_conf: id } })
    .then((configuration) => {
      if (!configuration) {
        return result({ kind: "not_found" }, null);
      }
      console.log("configuration: ", configuration);
      result(null, configuration);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

exports.deleteById = (id, result) => {
  configurationModel
    .destroy({ where: { id_conf: id } })
    .then((configurationModel) => {
      if (!configurationModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("deleted configuration with configurationId" + id);

      result(null, configurationModel);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};
exports.deleteAll = (result) => {
  configurationModel
    .destroy({ where: {} })
    .then((configurations) => {
      console.log(`deleted ${configurations} configurations`);
      result(null, configurations);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

exports.updateById = (id, req, result) => {
  const configurationUpdate = createConfigurationModel(req);

  configurationModel
    .update(configurationUpdate, { where: { id_conf: id } })
    .then(() => {
      configurationModel
        .findByPk(id)
        .then((configuration) => {
          if (!configuration) {
            return result({ kind: "not_found" }, null);
          }
          console.log("Configurations updated: ", configuration);
          result(null, configuration);
        })
        .catch((error) => {
          console.log("error: ", error);
          result(error, null);
        });
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

createConfigurationModel = (req) => {
  return {
    key_conf: req.body.key,
    value_conf: req.body.value,
    active_conf: req.body.active,
  };
};
