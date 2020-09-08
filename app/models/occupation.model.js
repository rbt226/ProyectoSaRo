const Sequelize = require('sequelize');
const db = require('../config/db.js');

const Model = Sequelize.Model;
class Occupation extends Model {}

// allowNull defaults to true

Occupation.init({
        // attributes
        id_occupation: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type_occupation: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        active_occupation: {
            type: Sequelize.BOOLEAN,
        },
        image_occupation: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },

    {
        sequelize: db,
        modelName: 'occupation',
        // options
    }
);
module.exports = Occupation;