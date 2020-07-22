
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "sql10.freesqldatabase.com",
  user: "sql10332853",
  password: "BaIqtHsbXN",
  database: 'sql10332853'

});

//Port: 3306
connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM role', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
});

connection.end();