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
  webrtc.joinRoom('myroomSensei');

});
