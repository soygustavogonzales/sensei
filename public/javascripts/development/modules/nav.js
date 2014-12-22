!function(window,undefined,$){

    var Nav = function(opt){
        var default_ = {
          superior:null
        }
      if(typeof(opt)=="object"){
        opt = $.extend(default_, opt);
        this.superior = opt.superior
        this.init()
      }
    };

    Nav.prototype.init = function() {
      this.enable()
    };

    Nav.prototype.enable = function() {
      document.addEventListener('mousemove',this.controller.bind(this),false)
    };

    Nav.prototype.disable = function() {
      document.removeEventListener('mousemove',this.controller.bind(this),false)
    };

    Nav.prototype.controller = function(e) {
      if(e.clientX > screen.width/3 && e.clientX < (screen.width - screen.width/3) && e.clientY < 5 ){
        //this.superior.style.top = 0
        this.open()
      }else if(e.clientY > (4*14)){
        this.close()
      }
    };

    Nav.prototype.open = function() {
        /*abrir panel superior*/
        //console.log("abrir arriba")
        this.superior.classList.add('show-top')

    };

    Nav.prototype.close = function() {
        //console.log("cerrar arriba")
        this.superior.classList.remove('show-top')
        //this.superior.style.top = '-3em'
    };

    window.Nav = Nav;

}(window,undefined,jQuery)
