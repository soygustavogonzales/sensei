var webrtc = new SimpleWebRTC({
  // the id/element dom element that will hold "our" video
  localVideoEl: 'you',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: 'remoteVideo',
  // immediately ask for camera access
  autoRequestMedia: true
});

  webrtc.on('readyToCall', function () {
  // you can name it anything
  webrtc.joinRoom('myroomSensei');
  });


function sanitize(msg) {
  return msg.replace(/</g, '&lt;');
}

function initFullScreen() {
  var button = document.getElementById("fullscreen");

  button.addEventListener('click', function(event) {
    var document_ = document.documentElement;
    if(document.webkitIsFullScreen){
      if(document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }else{
      if(document_.requestFullScreen) {
          document_.requestFullScreen();
          console.log("por defecto nativo soportado requestFullScreen");
      } else if(document_.mozRequestFullScreen) {
        document_.mozRequestFullScreen();
      } else if(document_.webkitRequestFullScreen) {
        document_.webkitRequestFullScreen();
      } else{
        console.log("no soporta full screen por javascript");
      }
    }
  });
}