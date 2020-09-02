const Sequelize = require('sequelize');
const db = require('../config/db.js');
var bcrypt = require('bcrypt');

const Model = Sequelize.Model;
class User extends Model {}
// allowNull defaults to true

User.init({
        // attributes
        id_user: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
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
        },
        image_user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        active_user: {
            type: Sequelize.BOOLEAN,
        },
        id_role: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        provider: {
            type: Sequelize.STRING,
        },
        provider_id: {
            type: Sequelize.STRING,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        provider_token: {
            type: Sequelize.STRING,
        },
    },

    {
        sequelize: db,
        modelName: 'user_',
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            },
        },
    }
);
User.operator = Sequelize.Op;

module.exports = User;