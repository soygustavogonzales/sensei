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
