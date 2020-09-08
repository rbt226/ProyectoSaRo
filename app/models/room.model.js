const Sequelize = require('sequelize');
const db = require('../config/db.js');

const Model = Sequelize.Model;
class Room extends Model {}
class RoomImage extends Model {}

// allowNull defaults to true
Room.seq = Sequelize;
Room.init({
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
                msg: 'Name already in use',
            },
        },
        active_room: {
            type: Sequelize.BOOLEAN,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },

    {
        sequelize: db,
        modelName: 'room',
    }
);

RoomImage.init({
        id_room_image: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        path_room_image: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },

    {
        sequelize: db,
        modelName: 'room_image',
    }
);

// Room.hasMany(RoomImage, { foreignKey: 'id_room' });

module.exports = Room;
// x