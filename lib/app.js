var express = require('express');
//declare a module

var cheerio = require('cheerio');

var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
var serve_favicon = require('serve-favicons');
var level = require('levelup');

//create DB
var db = level('./mydb');
//load the html file
var $ = cheerio.load("login.jade");
//create jarjar id + password in db
db.put('JarJar',  'JarJar', function(err){
  //in case of an errror we get jarjar id + pass in data
  db.get('JarJar', function(err, data){
    //use of data
    console.dir(data);
  });
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

function authenticate(name, pass){

  db.get(name, function(err, data){

    if (err) return console.log('user does not exist');
    if(pass==data) return console.log('Connecté');
    else {throw new Error('cant find login');}
  });
}

function deleteUser(name){
  console.dir(name);
  db.del(name, function(err){
    if(err){console.log('no account found');
    throw new Error('cant find account');
    }
    else return console.log('account deleted');
  });
}

app.post('/',function(req,res){
  try
  { //get the elements
    console.dir(req.body.givenLogin);
    var givenLogin = req.body.givenLogin;
    var Mdp = req.body.Mdp;
    authenticate(givenLogin,Mdp);
    res.render('log-in', {title:'Login'});
    }
catch(err)
  {res.render('login', {title:'Login'});}


});

app.post('/DeleteMaggle', function(req,res){

  try{
    console.dir('JarJar');
    //delete a user
    deleteUser('JarJar');
    res.render('login', {title:'Login'});
  }
  catch(err){
    res.render('log-in',{title: 'Login'});
  }
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
