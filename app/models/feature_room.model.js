const Sequelize = require("sequelize");
const db = require("../common/db.js");

const Model = Sequelize.Model;
class FeatureRoom extends Model {}


FeatureRoom.init(
  {
    // attributes
    id_feature_room: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_feature: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_room: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize: db,
    modelName: "feature_room",
    // options
  }
);
module.exports = FeatureRoom;
