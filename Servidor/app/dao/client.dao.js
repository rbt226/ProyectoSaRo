const clientModel = require("../models/client.model");
const utils = require("../common/utils");

exports.create = (req, result) => {
  const clientCreate = createClientModel(req);
  clientModel
    .create(clientCreate)
    .then((newClient) => {
      console.log("Se ha creado el cliente satisfactoriamente");
      result(null, newClient);
    })
    .catch((error) => {
      console.log("Error al crear cliente");
      utils.handleError(error, result);
    });
};

exports.getAll = (result) => {
  clientModel
    .findAll()
    .then((clients) => {
      console.log("Se han obtenidos todos los clientes satisfactoriamente");
      result(null, clients);
    })
    .catch((error) => {
      console.log("Error al obtener todos los clientes");
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
      console.log("Se ha obtenido el cliente con id: ", id, " satisfactoriamente");
      result(null, client);
    })
    .catch((error) => {
      console.log("Error al obtener cliente con id: ", id);
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
      console.log("Se elimino exitosamente el cliente con id: " + id);
      result(null, clientModel);
    })
    .catch((error) => {
      console.log("Error al eliminar cliente con id ", id);
      utils.handleError(error, result);
    });
};

exports.deleteByUserId = (idUser, result) => {
  clientModel
    .destroy({ where: { id_user: idUser } })
    .then((clientModel) => {
      if (!clientModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("Se elimino exitosamente el cliente con idUser: " + idUser);
      result(null, clientModel);
    })
    .catch((error) => {
      console.log("Error al eliminar cliente con idUser ", idUser);
      utils.handleError(error, result);
    });
};

exports.deleteAll = (result) => {
  clientModel
    .destroy({ where: {} })
    .then((clients) => {
      console.log("Se eliminaron todos los clientes correctamente :  ", clients);
      result(null, clients);
    })
    .catch((error) => {
      console.log("Error al eliminar todos los usuarios ");
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
          console.log("Se modifico el cliente con id :", id, "satisfactoriamente");
          result(null, client);
        })
        .catch((error) => {
          console.log("error: ", error);
          result(error, null);
        });
    })
    .catch((error) => {
      console.log("Error al modificar cliente con id :", id);
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
