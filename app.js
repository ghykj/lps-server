
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');
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
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/login',login.login);
app.post('/join',login.join);

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
