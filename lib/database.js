var mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1104',
  database: 'lps'
});

var getConnection = function(done){
   connection.getConnection(done);
};

module.exports = {getConnection: getConnection};
