const roleModel = require("../models/role.model");

exports.create = (req, result) => {
  const roleCreate = createRoleModel(req);
  roleModel
    .create(roleCreate)
    .then((newRole) => {
      result(null, newRole);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
      return;
    });
};

exports.getAll = (result) => {
  roleModel
    .findAll()
    .then((roles) => {
      console.log("roles: ", roles);
      result(null, roles);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.getRoleById = (id, result) => {
  roleModel
    .findOne({ where: { id_role: id } })
    .then((role) => {
      if (!role) {
        return result({ kind: "not_found" }, null);
      }
      console.log("role: ", role);
      result(null, role);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.deleteById = (id, result) => {
  roleModel
    .destroy({ where: { id_role: id } })
    .then((roleModel) => {
      if (!roleModel) {
        return result({ kind: "not_found" }, null);
      }
      console.log("deleted role with roleId" + id);

      result(null, roleModel);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};
exports.deleteAll = (result) => {
  roleModel
    .destroy({ where: {} })
    .then((roles) => {
      console.log(`deleted ${roles} roles`);
      result(null, roles);
    })
    .catch((error) => {
      console.log("error: ", error);
      result(error, null);
    });
};

exports.updateById = (id, req, result) => {
  const roleUpdate = createRoleModel(req);

  roleModel
    .update(roleUpdate, { where: { id_role: id } })
    .then(() => {
      roleModel
        .findByPk(id)
        .then((role) => {
          if (!role) {
            return result({ kind: "not_found" }, null);
          }
          console.log("Roles updated: ", role);
          result(null, role);
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

createRoleModel = (req) => {
  return {
    name_role: req.body.name,
  };
};
