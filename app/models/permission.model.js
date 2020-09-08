const Sequelize = require('sequelize');
const db = require('../config/db.js');

const Model = Sequelize.Model;
class Permission extends Model {}

// allowNull defaults to true

Permission.init({
        // attributes
        id_permission: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type_permission: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },

    {
        sequelize: db,
        modelName: 'permission',
        // options
    }
);
module.exports = Permission;