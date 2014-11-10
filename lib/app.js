//declare a module
var http = require('http');
//declare a http server
var app = http.createServer(function (req,res){
  //Write a response header
res.writeHead(200,{'Content-Type':'text/plain'});
//write a response content
res.end('Hello World\n');
//start the server
});
module.exports = app;
