const sequelize = require('../config/db.js');
const Sequelize = require('sequelize');

const Room = require('./room.model');

const RoomImage = sequelize.define('room_image', {
    id_room_image: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_room: Sequelize.INTEGER,
    path_room_image: Sequelize.STRING,
});
Room.hasMany(RoomImage, { foreignKey: 'id_room' });
RoomImage.belongsTo(Room, { foreignKey: 'id_room' });

module.exports = RoomImage;