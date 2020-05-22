const clientModel = require("../models/client.model");
const utils = require("../common/utils");

exports.create = (req, result) => {
  const response = "C01";
  const clientCreate = createClientModel(req);
  clientModel
    .create(clientCreate)
    .then((newClient) => {
      result(null, utils.createSuccessResponse(response, "Se ha creado el cliente correctamente", newClient));
    })
    .catch((error) => {
      console.log("Error al crear cliente: ", error);
      result(utils.createErrorResponse(response, "Error al crear cliente", null));
    });
};

exports.getClientById = (id, result) => {
  const response = "C02";

  clientModel
    .findOne({ where: { id_client: id } })
    .then((client) => {
      if (!client) {
        return result({ kind: "not_found" }, null);
      }
      console.log("Se ha obtenido el cliente con id: ", id, " correctamente");
      result(null, client);
    })
    .catch((error) => {
      console.log("Error al obtener cliente con id: ", id);
      utils.handleError(error, result, response);
    });
};

exports.updateById = (id, req, result) => {
  const response = "C03";

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
          console.log("Se modifico el cliente con id :", id, "correctamente");
          result(null, client);
        })
        .catch((error) => {
          console.log("error: ", error);
          result(error, null);
        });
    })
    .catch((error) => {
      console.log("Error al modificar cliente con id :", id);
      utils.handleError(error, result, response);
    });
};

exports.deleteById = (id, result) => {
  const response = "C04";

  clientModel
    .destroy({ where: { id_client: id } })
    .then((clientModel) => {
      if (!clientModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("Se elimino correctamente el cliente con id: " + id);
      result(null, clientModel);
    })
    .catch((error) => {
      console.log("Error al eliminar cliente con id ", id);
      utils.handleError(error, result, response);
    });
};

exports.getAll = (result) => {
  const response = "C05";

  clientModel
    .findAll()
    .then((clients) => {
      console.log("Se han obtenidos todos los clientes correctamente");
      result(null, clients);
    })
    .catch((error) => {
      console.log("Error al obtener todos los clientes");
      utils.handleError(error, result, response);
    });
};

exports.deleteAll = (result) => {
  const response = "C06";

  clientModel
    .destroy({ where: {} })
    .then((clients) => {
      console.log("Se eliminaron todos los clientes correctamente :  ", clients);
      result(null, clients);
    })
    .catch((error) => {
      console.log("Error al eliminar todos los usuarios ");
      utils.handleError(error, result, response);
    });
};

exports.deleteByUserId = (idUser, result) => {
  const response = "C07";

  clientModel
    .destroy({ where: { id_user: idUser } })
    .then((clientModel) => {
      if (!clientModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("Se elimino correctamente el cliente con idUser: " + idUser);
      result(null, clientModel);
    })
    .catch((error) => {
      console.log("Error al eliminar cliente con idUser ", idUser);
      utils.handleError(error, result, response);
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
