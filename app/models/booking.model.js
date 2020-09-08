const Sequelize = require("sequelize");
const db = require("../config/db.js");

const Model = Sequelize.Model;
class Booking extends Model {}

// allowNull defaults to true

Booking.init({
        // attributes
        id_booking: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        id_room: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        date_booking: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        start_booking: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        end_booking: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },

    {
        sequelize: db,
        modelName: "booking",
    }
);

module.exports = Booking;