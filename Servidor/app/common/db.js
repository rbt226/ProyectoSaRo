const Sequelize = require("sequelize");

var config = require("./config.json");

// Option 1: Passing parameters separately
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
