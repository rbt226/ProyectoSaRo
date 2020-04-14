const Sequelize = require("sequelize");
const db = require("../common/db.js");

const Model = Sequelize.Model;
class User extends Model {}
// allowNull defaults to true

User.init(
  {
    // attributes
    id_user: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
    mail: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mobile_phone: {
      type: Sequelize.BIGINT,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image_user: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    active_user: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    id_role: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize: db,
    modelName: "user",
    // options
  }
);
module.exports = User;
