const clientModel = require("../models/client.model");
const utils = require("../common/utils");

exports.create = (req, result) => {
  const clientCreate = createClientModel(req);
  clientModel
    .create(clientCreate)
    .then((newClient) => {
      console.log("Se ha creado el cliente");
      result(null, newClient);
    })
    .catch((error) => {
      console.log("Error al crear cliente ", error);
      utils.handleError(error, result);
    });
};

exports.getAll = (result) => {
  clientModel
    .findAll()
    .then((clients) => {
      console.log("clients: ", clients);
      result(null, clients);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

exports.getClientById = (id, result) => {
  clientModel
    .findOne({ where: { id_client: id } })
    .then((client) => {
      if (!client) {
        return result({ kind: "not_found" }, null);
      }
      console.log("client: ", client);
      result(null, client);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

exports.deleteById = (id, result) => {
  clientModel
    .destroy({ where: { id_client: id } })
    .then((clientModel) => {
      if (!clientModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("deleted client with clientId" + id);

      result(null, clientModel);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};
exports.deleteAll = (result) => {
  clientModel
    .destroy({ where: {} })
    .then((clients) => {
      console.log(`deleted ${clients} clients`);
      result(null, clients);
    })
    .catch((error) => {
      utils.handleError(error, result);
    });
};

exports.updateById = (id, req, result) => {
  const clientUpdate = createClientModel(req);

  clientModel
    .update(clientUpdate, { where: { id_client: id } })
    .then(() => {
      clientModel
        .findByPk(id)
        .then((client) => {
          if (!client) {
            return result({ kind: "not_found" }, null);
          }
          console.log("Clients updated: ", client);
          result(null, client);
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

createClientModel = (req) => {
  return {
    id_user: req.body.idUser,
    name_client: req.body.name,
    last_name: req.body.lastName,
    document: req.body.document,
    id_occupation: req.body.idOccupation,
  };
};
