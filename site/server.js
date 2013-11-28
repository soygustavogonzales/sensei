var express = require('express');
var less = require('less');//para trabajar con el precompilador de less
var toCss = require('./serverLess.js');//para trabajar con el precompilador de less
var path = require('path');//para trabajar con el precompilador de less
var fs = require('fs');//para trabajar con el precompilador de less
var app = express();
var server = require('http').createServer(app);
var webRTC = require('webrtc.io').listen(server);
var io = require('socket.io').listen(server);
io.set('log level',1); //Lo pongo a nivel uno para evitar demasiados logs ajenos a la aplicación.


var port = process.env.PORT || 4530;

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

/*WebRTC********/
webRTC.rtc.on('chat_msg', function(data, socket) {
  var roomList = webRTC.rtc.rooms[data.room] || [];

  for (var i = 0; i < roomList.length; i++) {
    var socketId = roomList[i];

    if (socketId !== socket.id) {
      var soc = webRTC.rtc.getSocket(socketId);

      if (soc) {
        soc.send(JSON.stringify({
          "eventName": "receive_chat_msg",
          "data": {
            "messages": data.messages,
            "color": data.color
          }
        }), function(error) {
          if (error) {
            console.log(error);
          }
        });
      }
    }
  }
});
/*end WebRTC***********/

//**Configuraciones para el deploying con heroku.No necesario para correrlo en local
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});
//**Fin de las configuraciones para el deploying con heroku

//Se ha establecido conexión
io.sockets.on('connection', function(socket) {

  /* Cuando un usuario realiza una acción en el cliente,
     recibos los datos de la acción en concreto y 
     envío a todos los demás las coordenadas */

  socket.on('startLine',function(e){
    console.log('Dibujando...');
    io.sockets.emit('down',e);
  });

  socket.on('closeLine',function(e){
    console.log('Trazo Terminado');
    io.sockets.emit('up',e);
  });

  socket.on('draw',function(e){
    io.sockets.emit('move',e);
  });

  socket.on('clean',function(){
    console.log('Pizarra Limpia');
    io.sockets.emit('clean',true);
  });
});

server.listen(port,function(){
  console.log("Server running in: "+app.get("port"));
});
