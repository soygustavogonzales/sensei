/*
*/
senseiApp.provider('chargeEffects', [function () {
  this.oCharge = new chargeEffects();  
  var self = this
  this.$get = [function() {
    return self.oCharge;
  }];
}])

var chargeEffects = function(){

}

chargeEffects.prototype.chargeAll = function () {
  $('.box-left nav').mCustomScrollbar({
      autoHideScrollbar:true,
      scrollInertia:600
      //autoDraggerLength:false
  })
  $('.box-right nav').slimScroll({
    distance:'5px',
    height:'40.1em',
    width:'8em',
    railVisible: true,
    railOpacity: 0.1,
    position:'left'
  })

}
