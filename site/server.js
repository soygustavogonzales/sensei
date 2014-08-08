var express = require('express');
var less = require('less');//para trabajar con el precompilador de less
var toCss = require('./serverLess.js');//para trabajar con el precompilador de less
var path = require('path');//para trabajar con el precompilador de less
var fs = require('fs');//para trabajar con el precompilador de less
var app = express();
var server = require('http').createServer(app);

var port = process.env.PORT || 4000;

app.configure(function(){
  app.set("port",port);
  app.set("views",__dirname+"/views");
  app.set("view engine","jade");

  app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.static(__dirname +"/public"))
});

/*Precompilar el styles.less --> styles.css*/
var lessFile = './public/styles/less/styles.less';
fs.watchFile(lessFile,function(){//cuando se hagan cambios en el archivo .less
  var cssFile = toCss(lessFile,//ejecuto el preprocesador
  {
    less:less,
    path:path,
    fs:fs,
  });
  //cssFIle: Deberia contener la ruta del archivo .css que se exporto(falta arreglar)
})

/*end Preprocesador Less*/

/*Routes********/
app.get('/', function(req, res) {
  res.render('index.jade');
  res.sendfile(__dirname + "/index.html");
});
/*end routes****/


//**Configuraciones para el deploying con heroku.No necesario para correrlo en local
/*
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});
*/
//**Fin de las configuraciones para el deploying con heroku


server.listen(port,function(){
  console.log("Server running in: "+app.get("port"));
});
