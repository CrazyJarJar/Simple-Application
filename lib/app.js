var express = require('express');
//declare a module
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//declare a http server
//initialize the view
var app = express();
//set the port
app.set('port', process.env.PORT || 3000);
//set the directory name to the view
app.set('views', __dirname +'/views');
//choose jade to run the view
app.set('view engine', 'jade');

//setup app on express
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname,'views')));
app.post('/',function(req,res){
  res.render('log-in',{title: 'Login'});
});
app.get('/',function(req,res){
  res.render('login',{title: 'Home'});
});
var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('Express server listening on port '+app.get('port'));
});
module.exports = app;
