senseiApp.service('svcChat',['$firebase',function($firebase){
  var ref = new Firebase('http://myfirechat.firebaseio.com')
  this.sync = $firebase(ref)
  this.rooms = ref.child("rooms")
  this.firebase = $firebase
}]);

