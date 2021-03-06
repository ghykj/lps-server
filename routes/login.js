var mysql = require("mysql");
var crypto = require("crypto");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1104',
  database: 'lps'
});

/*var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1104',
  database: 'lps'
});*/

//hash key generation for password
var myHash = function myHash(key){
  var hash = crypto.createHash('sha1');
  hash.update(key);
  return hash.digest('hex');
}

exports.login = function(req, res, callback){
  var id = req.body.id;
  var password = myHash(req.body.password);
  var response = {};

  connection.query("SELECT count(*) cnt FROM user WHERE id=? and password=?", [id, password], function(error,result){
    if(error){
      console.log("err",error);
      response.data = "error";
    }
    else{
      if(result[0].cnt=='0'){
        console.log("login fail",error);
        response.data = "login fail";
      }
      else{
        console.log("login success",result);
        response.data = "login success";
      }
    }
    res.json(response);
  });
}

/*function User() {
  this.id = "";
  this.name = "";
  this.password = "";
};*/

exports.join = function(req, res, callback){
  var response = {};
  var id = req.body.id;
  var name = req.body.name;
  var password = myHash(req.body.password);

  var user = {
    "id" : id,
    "name" : name,
    "password" : password
  }


  connection.query("INSERT INTO user SET ?",user, function(error, result) {
   if (error) {
    console.log("err", error);
    response.code = 400;
    response.data = "fail";
    if(error.errno == 1062){
      response.data = "duplicate-id";
    }
   }
   else {
    console.log("result", result);
    response.data = "add user ok";
   }
   res.json(response);
 });
 delete user;
}


module.exports.deleteUser = function(req, res, callback){
  var response ={};
  connection.query("DELETE FROM user WHERE id = ?",[req.params.id], function(error, result){
    if (error) {
     console.log("err", error);
     response.code = 400;
     response.data = "fail";
   }
   else {
     console.log("result",result);
     response.data = "delete user ok";
   }
   res.json(response);
  });
}
