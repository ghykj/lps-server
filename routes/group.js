
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1104',
  database: 'lps'
});


module.exports.addGroup = function(req, res, callback){
  var response = {};
  var USER_ID = req.body.USER_ID;
  var GROUP_NAME = req.body.GROUP_NAME;
  var GROUP_ID = req.body.GROUP_ID;

  var group = {
    "GROUP_NAME" : GROUP_NAME,
    "GROUP_ID" : GROUP_ID,
    "USER_ID" : USER_ID
  }

  connection.query("INSERT INTO groupinfo SET ?",group, function(error, result) {

   if (error) {
    console.log("err", error);
    response.code = 400;
    response.data = "fail";
    if(error.errno == 1062){
      response.data = "duplicate-group";
    }
   }
   else {
    console.log("result", result);
    response.data = "add group ok";
   }
   res.json(response);
 });
 delete group;
}

/*module.exports.getGroupByID = function(id, callback){
    var response = {};
    function(connection, callback){
      connection.query("SELECT * FROM groupinfo WHERE USER_ID = ?", id, function(query_error, query_result){
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }

}*/
