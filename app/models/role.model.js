const Sequelize = require('sequelize');
const db = require('../config/db.js');

const Model = Sequelize.Model;
class Role extends Model {}

// allowNull defaults to true

Role.init({
        // attributes
        id_role: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_role: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },

    {
        sequelize: db,
        modelName: 'role',
        // options
    }
);
module.exports = Role;