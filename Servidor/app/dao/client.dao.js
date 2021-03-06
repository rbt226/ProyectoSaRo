const clientModel = require("../models/client.model");

exports.create = (req, result) => {
  const clientCreate = createClientModel(req);
  clientModel
    .create(clientCreate)
    .then((newClient) => {
      result(null, newClient);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
      return;
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
      console.log("error: ", error);
      result(error, null);
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
      console.log("error: ", error);
      result(error, null);
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
      console.log("error: ", error);
      result(error, null);
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
      console.log("error: ", error);
      result(error, null);
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
      console.log("error: ", error);
      result(error, null);
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
