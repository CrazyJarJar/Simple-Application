var express = require('express');
//declare a module
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
var serve_favicon = require('serve-favicons');
var level = require('levelup');

//create DB
var db = level('../DataBaseDir/mydb.db');
db.put('Name', {name: 'JarJar'}, function(err){
  db.get('Name', function(err, data){
    console.dir(data)
  })
});

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

app.use(serve_favicon(path.join(__dirname,'views','favicon.ico')));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname,'views')));
app.post('/',function(req,res){
  db.get(body.giveLogin, function(err, value){
    if(err) res.render('login',{title: 'Home'});
  else res.render('log-in', {title:'logged in'});
});


  //for later
  /*
  if(body.givenLogin = 'JarJar'){
  if(body.Mdp = 'JarJar'){
  do the resend function
}
else
  res.render('login',{title: 'Home'});
}
else
  res.render('login',{title: 'Home'});
  */
  //res.render('log-in',{title: 'Login'});
});
app.get('/',function(req,res){
  res.render('login',{title: 'Home'});
});

//error handling

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
//server creation
var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('Express server listening on port '+app.get('port'));
});
//export app
module.exports = app;
