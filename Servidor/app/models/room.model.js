const Sequelize = require("sequelize");
const db = require("../common/db.js");

const Model = Sequelize.Model;
class Room extends Model {}

// allowNull defaults to true

Room.seq = Sequelize;
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
      unique: {
        args: true,
        msg: "Name already in use",
      },
    },
    active_room: {
      type: Sequelize.BOOLEAN,
    },
    image_room: {
      type: Sequelize.STRING,
      defaultValue: "defaultImage",
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
