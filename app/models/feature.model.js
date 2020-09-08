const Sequelize = require("sequelize");
const db = require("../config/db.js");

const Model = Sequelize.Model;
class Feature extends Model {}

// allowNull defaults to true

Feature.init({
        // attributes
        id_feature: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_feature: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description_feature: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },

    {
        sequelize: db,
        modelName: "feature",
        // options
    }
);
module.exports = Feature;