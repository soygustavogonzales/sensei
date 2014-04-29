var express = require('express');
var less = require('less');//para trabajar con el precompilador de less
var path = require('path');//para trabajar con el precompilador de less
var fs = require('fs');//para trabajar con el precompilador de less
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 4520;

app.configure(function(){
  app.set("port",port);
  app.set("views",__dirname+"/site/"+"views");
  app.set("view engine","jade");

  app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.static(__dirname +"/site/"+"/public"))
});


/*Routes********/
app.get('/', function(req, res) {
  res.render('index.jade',{
    pretty:false
  });
});


server.listen(port,function(){
  console.log("Server running in: "+app.get("port"));
});
