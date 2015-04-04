senseiApp.directive('drvChat',['svcChat','svcShadowDOM',function(svcChat,svcShadowDOM){
	return {
		restrict:'E',
		template:'<div></div>'
		,controller:function($scope, $element, $attrs){
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
		}
		,link : function($scope, iElm, iAttrs){
				svcShadowDOM.getShadowDOM('/includes/chat',iElm,$scope)
				.then(function(html){
						console.log(html);
						  $(html).find('.listMsjs').slimScroll({
						    distance:'5px',
						    height:'17em',
						    width:'100%',
						    railVisible: false,
						    railOpacity: 0.1
						  })
				})
		}
	}
}]);