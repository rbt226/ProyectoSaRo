const Sequelize = require("sequelize");
const db = require("../common/db.js");

const Model = Sequelize.Model;
class Client extends Model {}

// allowNull defaults to true

Client.init(
  {
    // attributes
    id_client: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name_client: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    document: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_occupation: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize: db,
    modelName: "client",
    // options
  }
);
module.exports = Client;