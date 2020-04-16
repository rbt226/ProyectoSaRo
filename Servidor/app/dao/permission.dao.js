const permissionModel = require("../models/permission.model");

exports.create = (req, result) => {
  const permissionCreate = createPermissionModel(req);
  permissionModel
    .create(permissionCreate)
    .then((newPermission) => {
      result(null, newPermission);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
      return;
    });
};

exports.getAll = (result) => {
  permissionModel
    .findAll()
    .then((permissions) => {
      console.log("permissions: ", permissions);
      result(null, permissions);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.getPermissionById = (id, result) => {
  permissionModel
    .findOne({ where: { id_permission: id } })
    .then((permission) => {
      if (!permission) {
        return result({ kind: "not_found" }, null);
      }
      console.log("permission: ", permission);
      result(null, permission);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.deleteById = (id, result) => {
  permissionModel
    .destroy({ where: { id_permission: id } })
    .then((permissionModel) => {
      if (!permissionModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("deleted permission with permissionId" + id);

      result(null, permissionModel);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};
exports.deleteAll = (result) => {
  permissionModel
    .destroy({ where: {} })
    .then((permissions) => {
      console.log(`deleted ${permissions} permissions`);
      result(null, permissions);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.updateById = (id, req, result) => {
  const permissionUpdate = createPermissionModel(req);

  permissionModel
    .update(permissionUpdate, { where: { id_permission: id } })
    .then(() => {
      permissionModel
        .findByPk(id)
        .then((permission) => {
          if (!permission) {
            return result({ kind: "not_found" }, null);
          }
          console.log("Permissions updated: ", permission);
          result(null, permission);
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

createPermissionModel = (req) => {
  return {
    type_permission: req.body.type,
  };
};
