var express = require('express');
var app = express();
var server = require('http').createServer(app);
var webRTC = require('webrtc.io').listen(server);
var io = require('socket.io').listen(server);
io.set('log level',1); //Lo pongo a nivel uno para evitar demasiados logs ajenos a la aplicación.


var port = process.env.PORT || 8080;

app.configure(function(){
  app.set("port",port);
  app.set("views",__dirname+"/views");
  app.set("view engine","jade");

  app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.static(__dirname +"/public"))
});

app.get('/', function(req, res) {
  res.render('index.jade');
  res.sendfile(__dirname + "/index.html");
});


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
