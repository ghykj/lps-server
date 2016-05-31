var mysql = require("mysql");

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
  var ITEM_LOSS_TIME = req.body.ITEM_LOSS_TIME;
  var ITEM_ALARM_STATUS = req.body.ITEM_ALARM_STATUS;

  var item = {
    "BEACON_ID" : BEACON_ID,
    "ITEM_NAME" : ITEM_NAME,
    "ITEM_LOSS_TIME" : ITEM_LOSS_TIME,
    "ITEM_ALARM_STATUS" : ITEM_ALARM_STATUS,
    "USER_ID" : USER_ID
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
