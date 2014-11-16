var express = require('express');
//declare a module
var http = require('http');
var path = require('path');
//declare a http server
//initialize the view
var appli = express();
//set the port
app.set('port', process.env.PORT || 3000);
//set the directory name to the view
app.set('views', __dirname +'/views');
//choose jade to run the view
app.set('view engine', 'jade');
//setup app on express
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.))
app.get('/views',function(req,res){
  res.render("login");
});
var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('Express server listening on port '+app.get('port'));
});
