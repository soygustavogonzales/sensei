var senseiApp = angular.module('senseiApp',['firebase']).
service('svsChat',['$firebase',function($firebase){
  var ref = new Firebase('http://myfirechat.firebaseio.com')
  this.ref = $firebase(ref)
  this.rooms = this.ref.$child("rooms")
}]).
controller('ListMessage', ['$scope','svsChat', function ($scope,svsChat) {
  $scope.rooms = svsChat.rooms
  //$scope.messages.$bind($scope,"")
  var session = $scope.rooms.$child("session1")
  $scope.messages = session.$child("messages")
  //msjs.$add({foo:"bar"})
  //msjs.$bind($scope,"messages_")

  //console.log($scope.messages_);
  //$scope.messages = [{message:"hola",whoIs:"me"}];//{message:"",whoIs:""}
  $scope.enviarMensaje = function(e){
    var tecla = e.keyCode.toString();
    if(tecla == "13"){
      $scope.messages.$add({
        user:"guest",
        message:$scope.new_message
      })
      $scope.new_message = ""//limpio el input de los mensajes
    }
  }
  
}])
