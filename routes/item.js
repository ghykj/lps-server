var mysql = require("mysql");
var moment = require('moment');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1104',
  database: 'lps'
});


module.exports.addItem = function(req, res, callback){
  var response = {};
  var USER_ID = req.body.USER_ID;
  var BEACON_ID = req.body.BEACON_ID;
  var ITEM_NAME = req.body.ITEM_NAME;
  var ITEM_LOSS_TIME = moment().format('YYYY-MM-DD HH:mm');
  var ITEM_ALARM_STATUS = req.body.ITEM_ALARM_STATUS;

  var item = {
    "BEACON_ID" : BEACON_ID,
    "ITEM_NAME" : ITEM_NAME,
    "ITEM_LOSS_TIME" : ITEM_LOSS_TIME,
    "ITEM_ALARM_STATUS" : ITEM_ALARM_STATUS,
    "USER_ID" : USER_ID,
    "ITEM_LOCK" : req.body.ITEM_LOCK
  }

  connection.query("INSERT INTO iteminfo SET ?",item, function(error, result) {

   if (error) {
    console.log("err", error);
    response.code = 400;
    response.data = "fail";
    if(error.errno == 1062){
      response.data = "duplicate-item";
    }
   }
   else {
    console.log("result", result);
    response.data = "add item ok";
   }
   res.json(response);
 });
 delete item;
}

module.exports.lossTime = function(req, res, callback){

  var response ={};
  var item = {
    "BEACON_ID" : req.body.BEACON_ID,
    "ITEM_NAME" : req.body.ITEM_NAME,
    "ITEM_LOSS_TIME" : moment().format('YYYY-MM-DD HH:mm'),
    "ITEM_ALARM_STATUS" : req.body.ITEM_ALARM_STATUS,
    "USER_ID" : req.body.USER_ID,
    "ITEM_LOCK" : req.body.ITEM_LOCK
  }
  connection.query("UPDATE iteminfo SET ITEM_LOSS_TIME = ? where BEACON_ID = ? and USER_ID = ?", [item.ITEM_LOSS_TIME, item.BEACON_ID, item.USER_ID], function(error, result){

    if (error) {
     console.log("err", error);
     response.code = 400;
     response.data = "fail";
   }
   else {
     console.log("result",result);
     response.data = "update loss time ok";
   }
   res.json(response);
  });
}

module.exports.editItem = function(req, res, callback){

  var response ={};
  var item = {
    "BEACON_ID" : req.body.BEACON_ID,
    "ITEM_NAME" : req.body.ITEM_NAME,
    "ITEM_LOSS_TIME" : req.body.ITEM_LOSS_TIME,
    "ITEM_ALARM_STATUS" : req.body.ITEM_ALARM_STATUS,
    "USER_ID" : req.body.USER_ID,
    "ITEM_LOCK" : req.body.ITEM_LOCK
  }
  connection.query("UPDATE iteminfo SET ITEM_NAME = ?, ITEM_ALARM_STATUS = ?, ITEM_LOCK = ? where BEACON_ID = ? and USER_ID = ?", [item.ITEM_NAME, item.ITEM_ALARM_STATUS, item.ITEM_LOCK, item.BEACON_ID, item.USER_ID], function(error, result){

    if (error) {
     console.log("err", error);
     response.code = 400;
     response.data = "fail";
   }
   else {
     console.log("result",result);
     response.data = "edit item ok";
   }
   res.json(response);
  });
}

module.exports.deleteItem = function(req, res, callback){
  var response ={};
  connection.query("DELETE FROM iteminfo WHERE USER_ID = ? and BEACON_ID = ?",[req.params.id, req.params.beaconID], function(error, result){
    if (error) {
     console.log("err", error);
     response.code = 400;
     response.data = "fail";
   }
   else {
     console.log("result",result);
     response.data = "delete item ok";
   }
   res.json(response);
  });
}


module.exports.getItem = function(req, res, callback){
  var response = {};
  //var id = req.params.id; //요청자의 id
  connection.query("SELECT BEACON_ID, ITEM_NAME, ITEM_LOSS_TIME, ITEM_ALARM_STATUS, ITEM_LOCK FROM iteminfo WHERE USER_ID = ?",[req.params.id], function(error, result){
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
