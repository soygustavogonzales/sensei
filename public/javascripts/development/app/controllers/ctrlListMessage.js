senseiApp.controller('ListMessage', ['$scope','svcChat', function ($scope,svcChat) {
  var uri = URI(location.href).search(true)
  $scope.roomId = uri.roomId
  $scope.userId = uri.userId
  $scope.rooms = svcChat.rooms
  var path = $scope.rooms.child($scope.roomId).child("messages").toString()
  var limitedMsgs = svcChat.firebase((new Firebase(path)).limit(10))
  $scope.messages = limitedMsgs.$asArray();
  $scope.messages.$loaded().then(function(){
    console.log($scope.messages)
  })
  $scope.metodo = function(user){
    return ((user == $scope.userId)?'buble-left':'buble-right');
  }

  /*
  var $msg = svcChat.firebase($scope.rooms.child("session1").child("messages"))
  $scope.messages = $msg.$asObject()
  $scope.messages.$loaded().then(function(data){
    console.log($scope.messages)
  })
  */


  $scope.sendMessage = function(e){
    var tecla = e.keyCode.toString();
    if(tecla == "13"){
      $scope.messages.$add({
        user:$scope.userId,
        message:$scope.message
      })
      $scope.message = ""//limpio el input de los mensajes
    }
  }
  
}])