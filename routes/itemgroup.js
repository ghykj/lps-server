
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


  var itemgroup = {
    "ITEM_GROUP_ID" : ITEM_GROUP_ID,
    "BEACON_ID" : BEACON_ID,
    "GROUP_ID" : GROUP_ID,
    "USER_ID" : USER_ID
  }

  connection.query("INSERT INTO itemgroup SET ?",itemgroup, function(error, result) {

   if (error) {
    console.log("err", error);
    response.code = 400;
    response.data = "fail";
    if(error.errno == 1062){
      response.data = "duplicate-itemgroup";
    }
   }
   else {
    console.log("result", result);
    response.data = "add itemgroup ok";
   }
   res.json(response);
 });
 delete itemgroup;
}

module.exports.deleteItemGroup = function(req, res, callback){
  var response ={};
  connection.query("DELETE FROM itemgroup WHERE USER_ID = ? and ITEM_GROUP_ID = ?",[req.params.id, req.params.itemGroupID], function(error, result){
    if (error) {
     console.log("err", error);
     response.code = 400;
     response.data = "fail";
   }
   else {
     console.log("result",result);
     response.data = "delete itemgroup ok";
   }
   res.json(response);
  });
}
