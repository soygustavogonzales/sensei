!function(window,undefined,$){


/*BoxMultimedia*/
    var BoxMultimedia = function(opt){
      var default_ = {
        $box : null,
        $items : null,
        umbralWidth : screen.width - 5
      }
      opt = $.extend(default_, opt);
      this.$box = opt.$box;
      this.$items = opt.$items;
      this.umbralWidth = opt.umbralWidth;
    };
    BoxMultimedia.prototype.init = function(opt) {
      if(typeof(opt)=="object"){
        this.oGlobo = opt.oGlobo;
        this.enable()
      }
    };

    BoxMultimedia.prototype.enable = function() {
      console.log(this)
      document.addEventListener('mousemove',this.controller.bind(this),false)
      this.$items.hover(this.oGlobo.show.bind(oGlobo,this.$items));
    };

    BoxMultimedia.prototype.disable = function() {
      document.removeEventListener('mousemove',this.controller.bind(this),false)
    };

    BoxMultimedia.prototype.controller = function(e) {
      if(e.clientX > this.umbralWidth && e.clientY > 100 && e.clientY < 550){
        /*abrir panel derecho*/
        this.open()
      } else if(e.clientX < (screen.width - 180)){
        this.close()
      }
    };
    BoxMultimedia.prototype.open = function() {
      this.$box.addClass('show-right');
    }

    BoxMultimedia.prototype.close = function() {
      this.$box.removeClass('show-right');
    };


/*End BoxMultimedia*/
    window.BoxMultimedia = BoxMultimedia;

}(window,undefined,jQuery)

  var oGlobo = new Globo({
    globo:$('.globo'),
    flechita:$('.globo .flechita')
  })

  var oBoxMultimedia = new BoxMultimedia({
    $box : $('.box-right'),
    $items : $('.box-right nav ul li')
  });
    oBoxMultimedia.init({oGlobo:oGlobo})
