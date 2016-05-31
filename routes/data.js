var express = require('express');
var router = express.Router();
var async = require('async');
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1104',
  database: 'lps'
});

module.exports.userData = function(req, res) {
  async.waterfall([
    function(callback){
      callback(null, connection);
    },
    function(connection, callback){
      connection.query("SELECT * FROM user", function(query_error, query_result){
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ], function(err, result){
	res.header("Content-Type", "application/json; charset=utf-8");
    res.json(result);
  });
}

module.exports.itemData = function(req, res) {
  async.waterfall([
    function(callback){
      callback(null, connection);
    },
    function(connection, callback){
      connection.query("SELECT * FROM iteminfo", function(query_error, query_result){
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ], function(err, result){
	res.header("Content-Type", "application/json; charset=utf-8");
    res.json(result);
  });
}

module.exports.groupData = function(req, res) {
  async.waterfall([
    function(callback){
      callback(null, connection);
    },
    function(connection, callback){
      connection.query("SELECT * FROM groupinfo", function(query_error, query_result){
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ], function(err, result){
	res.header("Content-Type", "application/json; charset=utf-8");
    res.json(result);
  });
}

module.exports.itemGroupData = function(req, res) {
  async.waterfall([
    function(callback){
      callback(null, connection);
    },
    function(connection, callback){
      connection.query("SELECT * FROM itemgroup", function(query_error, query_result){
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ], function(err, result){
	res.header("Content-Type", "application/json; charset=utf-8");
    res.json(result);
  });
}

//module.exports = router;
