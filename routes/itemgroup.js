
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1104',
  database: 'lps'
});


module.exports.addItemGroup = function(req, res, callback){
  var response = {};
  var ITEM_GROUP_ID = req.body.ITEM_GROUP_ID;
  var BEACON_ID = req.body.BEACON_ID;
  var GROUP_ID = req.body.GROUP_ID;
  var USER_ID = req.body.USER_ID;


  var group = {
    "GROUP_NAME" : GROUP_NAME,
    "GROUP_ID" : GROUP_ID,
    "USER_ID" : USER_ID
  }

  connection.query("INSERT INTO groupinfo SET ?",item, function(error, result) {

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
