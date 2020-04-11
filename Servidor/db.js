var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "sql10.freesqldatabase.com",
  user: "sql10332853",
  password: "BaIqtHsbXN",
  database: "sql10332853",
});

//Port: 3306
connection.connect(function (err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
    throw err;
  }
  console.log(
    "Successfully connected to the database with the id : " +
      connection.threadId
  );
});

module.exports = connection;