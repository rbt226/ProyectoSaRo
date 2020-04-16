const Sequelize = require("sequelize");
const db = require("../common/db.js");

const Model = Sequelize.Model;
class Configuration extends Model {}

// allowNull defaults to true
Configuration.init(
  {
    // attributes
    id_conf: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key_conf: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value_conf: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    active_conf: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  },

  {
    sequelize: db,
    modelName: "configuration",
    // options
  }
);
module.exports = Configuration;
