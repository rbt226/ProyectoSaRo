const Sequelize = require("sequelize");
const db = require("../common/db.js");

const Model = Sequelize.Model;
class Room extends Model {}

// allowNull defaults to true

Room.init(
  {
    // attributes
    id_room: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_room: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    active_room: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    image_room: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },

  {
    sequelize: db,
    modelName: "room",
    // options
  }
);

module.exports = Room;
