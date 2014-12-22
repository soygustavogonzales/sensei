!function(window,undefined,$){

/*Globo */

    var Globo = function(opt){
        var default_ = {
          globo : null,
          flechita : null
        }
      if(typeof(opt)=="object"){
        opt = $.extend(default_, opt);
        this.globo = opt.globo;
        this.flechita = opt.flechita;
        //console.log(this)
      }
    };

        
    Globo.prototype.show = function ($items,e) {
      //console.log(this);//this representa al elemento-no al conjunto de los mismos- sobre el que se esta disparando el evento.
      //console.log(e)
      console.log($items)
      //console.log(arguments)
        var cantItem = $items.length,
        altoItem = $($items[0]).height(),
        ant = e.relatedTarget.dataset.nro,
        actual = $(e.target).data('nro'),
        umbral = altoItem/2;
        //console.log(e.toElement)
        switch(true){
          case(actual<ant):
            umbral = umbral*(-1)
          break;
          case(ant==null):
            umbral = 0
          break;
          default:
            umbral = umbral
        }

        var factor = (10*14)*(-1);
        var top = e.clientY + factor + umbral;
        
        //console.log(this)
        this.globo.normalPosition = true;
        this.flechita.normalTopPosition = getComputedStyle(this.flechita[0]).top;
        this.flechita.normalPosition = true;
        if(this.globo.hasClass('hide')){
          if(cantItem==actual){//hover sobre el ultimo elemento
            top = top - (2*14);
            this.globo.normalPosition = false;
            console.log("hover sobre el ultimo ele")
          }
          this.globo.css('top',top+'px')
          this.globo.toggleClass('show');
          this.globo.toggleClass('addGloboAtn')
          var self = this;
          setTimeout(function(){
            self.globo.css({
              'right':'7em'//o 98px = 14(font-size) * 7(em keyframes globoAnimation ver hoja de estilos) 
            })
          },1550)
        }else{
    
        }
      /*
      */     
    };
  window.Globo = Globo;

}(window,undefined,jQuery)
