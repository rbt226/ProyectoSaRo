var mysql = require("mysql");

//get config db file 
var config = require('./config.json');
var connection = mysql.createConnection(config);

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