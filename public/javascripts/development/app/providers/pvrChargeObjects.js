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
  /*atributos - no metodos*/
  var oEraser = new Eraser({
    $eraser:$('.eraser-btn'),
    eraser_:document.querySelector('.eraser'),
    divEraser:document.querySelectorAll('.eraser div')
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
      $canvas : $('.pizarra')
  });

    oBoxObject.init({oPencil:oPencil,oClock:oClock,oEraser:oEraser})
    oEraser.init({oBoxObject:oBoxObject})
    oPencil.init({boxObject:oBoxObject})
    oClock.init()
}
