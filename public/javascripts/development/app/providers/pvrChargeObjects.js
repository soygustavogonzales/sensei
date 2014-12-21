/*
*/
senseiApp.provider('chargeObjects', [function () {
  this.oCharge = new chargeObject();  
  console.log(this.oCharge)
  var self = this
  this.$get = [function() {
    return self.oCharge;
  }];
}])

var chargeObject = function(){

}

chargeObject.prototype.chargeAll = function () {

  var oBoard = new Board({
    firebaseURI:'https://senseiapp.firebaseio.com/rooms',
    canvasId:'blackboard'
  });
  console.log(window.$canvas.activate)
  var oEraser = new Eraser({
    $eraser:$('.eraser-btn'),
    eraser_:document.querySelector('.eraser'),
    divEraser:document.querySelectorAll('.eraser div'),
    $canvas:window.$canvas
  });

  var oClock = new Clock({
   date:document.querySelector('.date')
  });

  var oBoxObject = new BoxObjects({
    $box:$('.box-left')
  });
  var oPencil = new Pencil({
    $pencil:$('.pencil'),
      tamano:document.querySelector('.tamano'),
      tamDiv:document.querySelectorAll('.tamano div'),
      div:document.querySelectorAll('.colores div'),
      articleColores:document.querySelector('.colores-btn'),
      circle:document.querySelector('.colores'),
      $canvas : window.$canvas
  });
  var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'videoThisUser',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remoteVideo',
    // immediately ask for camera access
    autoRequestMedia: true
  });

  webrtc.on('readyToCall', function () {
    // you can name it anything
    var uri = URI(location.href).search(true)//URI is a object , using library URI.js, see in bower
    var roomId = uri.roomId
    webrtc.joinRoom(roomId);

  });

    oBoxObject.init({oPencil:oPencil,oClock:oClock,oEraser:oEraser})
    oEraser.init({oBoxObject:oBoxObject,oBoard:oBoard})
    oPencil.init({boxObject:oBoxObject,oBoard:oBoard})
    oClock.init()
}
