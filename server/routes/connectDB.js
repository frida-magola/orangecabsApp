var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password:"",
    port:3306,
    database:"orangecabs_db"
});

// var connection = mysql.createConnection('mysql://root:@localhost/orangecabs_db?debug=true&charset=utf8mb4&timezone=-0700');

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
    // mysqli_set_charset($link,"utf8mb4");
  });


module.exports = connection;