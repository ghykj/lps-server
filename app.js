
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');
var group = require('./routes/group');
var item = require('./routes/item');
var itemgroup = require('./routes/itemgroup');
var data = require('./routes/data');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//app.use('/data', data);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//main
app.get('/', routes.index);
app.get('/users', user.list);
//data
app.get('/data/users',data.userData);
app.get('/data/items',data.itemData);
app.get('/data/groups',data.groupData);
app.get('/data/itemgroups',data.itemGroupData)
//user관련
app.post('/login',login.login);
app.post('/join',login.join);
app.delete('/deleteUser/:id',login.deleteUser);
//item관련
app.post('/addItem',item.addItem);
app.post('/editItem',item.editItem);
app.post('/lossTime',item.lossTime);
app.delete('/deleteItem/:id/:beaconID',item.deleteItem);
app.get('/getItem/:id',item.getItem);
//group관련
app.post('/addGroup',group.addGroup);
app.post('/editGroup',group.editGroup);
app.delete('/deleteGroup/:id/:groupID',group.deleteGroup);
app.get('/getGroup/:id',group.getGroup);
//itemgroup관련
app.post('/addItemGroup',itemgroup.addItemGroup);
app.delete('/deleteItemGroup/:id/:itemGroupID',itemgroup.deleteItemGroup);
app.delete('/allItemdeleteItemGroup/:id/:beaconID',itemgroup.allItemdeleteItemGroup);
app.delete('/allGroupDeleteItemGroup/:id/:groupID',itemgroup.allGroupDeleteItemGroup);
app.get('/getItemGroup/:id',itemgroup.getItemGroup);

app.delete('/deleteAllGroup/:id',group.deleteAllGroup);
app.delete('/deleteAllItem/:id',item.deleteAllItem);
app.delete('/deleteAllItemGroup/:id',itemgroup.deleteAllItemGroup);

/*app.post('/login',function(req,res,next){
  req.id = req.body.id;
  req.password = myHash(req.body.password);
  next();
},routes.login_post);

app.post('/sign_up',function(req,res,next){
  req.id = req.body.id;
  req.name = req.body.name;
  req.password = myHash(req.body.password);
  next();
},routes.sign_up_post);*/


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
