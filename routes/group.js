
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

module.exports.editGroup = function(req, res, callback){
  /*var response = {};
  var USER_ID = req.body.USER_ID;
  var BEACON_ID = req.body.BEACON_ID;
  var ITEM_NAME = req.body.ITEM_NAME;
  var ITEM_LOSS_TIME = moment().format('yyyy-MM-dd HH:mm');
  var ITEM_ALARM_STATUS = req.body.ITEM_ALARM_STATUS;*/

  var response ={};
  var group = {
    "GROUP_NAME" : req.body.GROUP_NAME,
    "GROUP_ID" : req.body.GROUP_ID,
    "USER_ID" : req.body.USER_ID
  }
  connection.query("UPDATE groupinfo SET GROUP_NAME = ? where GROUP_ID = ? and USER_ID = ?", [group.GROUP_NAME, group.GROUP_ID, group.USER_ID], function(error, result){

    if (error) {
     console.log("err", error);
     response.code = 400;
     response.data = "fail";
   }
   else {
     console.log("result",result);
     response.data = "edit group ok";
   }
   res.json(response);
  });
}

module.exports.deleteGroup = function(req, res, callback){
  var response ={};
  connection.query("DELETE FROM groupinfo WHERE USER_ID = ? and GROUP_ID = ?",[req.params.id, req.params.groupID], function(error, result){
    if (error) {
     console.log("err", error);
     response.code = 400;
     response.data = "fail";
   }
   else {
     console.log("result",result);
     response.data = "delete group ok";
   }
   res.json(response);
  });
}

module.exports.getGroup = function(req, res, callback){
  var response = {};
  //var id = req.params.id; //요청자의 id
  connection.query("SELECT GROUP_NAME, GROUP_ID FROM groupinfo WHERE USER_ID = ?",[req.params.id], function(error, result){
    if (error) {
     console.log("err", error);
     response.code = 400;
     response.data = "fail";
   }
   else {
     console.log("result",result);
     response.data = result;
   }
   res.json(response);
  });
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
