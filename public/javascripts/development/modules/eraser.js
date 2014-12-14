/*****************************/
/*Eraser*/

!function(window,undefined,$){

  var Eraser = function(opt){
  	var default_ = {
  		$eraser:null
  	}
  	opt = $.extend(default_, opt);
  	this.$eraser = opt.$eraser;
  	this.eraser_ = opt.eraser_;
  	this.divEraser = opt.divEraser;
  	this.eraser = opt.$eraser[0];
  	//this.init()
  	//console.log(this)
  }

  Eraser.prototype.init = function(opt){
    if(opt){
      this.oBoxObject = opt.oBoxObject
    }
    this.enable()
  }
  Eraser.prototype.enable = function(){
    this.$eraser.on("click",this.activate)
    this.eraser.addEventListener('mouseenter',this.onAnimation.bind(this),false)
    this.eraser_.addEventListener('mouseleave',this.offAnimation.bind(this),false)
    this.eraser_.addEventListener('mousemove',this.animationRotation.bind(this),false)
  }
  Eraser.prototype.disable = function(){
    this.$eraser.off("click",this.activate);  
    this.eraser.removeEventListener('mouseenter',this.onAnimation.bind(this),false)
    this.eraser_.removeEventListener('mouseleave',this.offAnimation.bind(this),false)
    this.eraser_.removeEventListener('mousemove',this.animationRotation.bind(this),false)
  }
  Eraser.prototype.activate = function(){
  		if(!$canvas.activate){//si esta desactivado
  			$canvas.css({
  				'z-index':4
  			})
  		}
  		console.log("eraser activate")
  		board.activatedEraser = true;
  } 
  	
  Eraser.prototype.onAnimation = function(){
  	//console.log(this)
    //document.removeEventListener('mousemove',menu,false)
    this.oBoxObject.disable()
    this.eraser_.classList.remove('hide')
    for (var i = this.divEraser.length - 1; i >= 0; i--) {
        this.divEraser.item(i).classList.add('animar')
    };
    var expandAtn = function(){
      for (var i = this.divEraser.length - 1; i >= 0; i--) {
        this.divEraser.item(i).classList.add('expand')
      };
    }
      
    var timer = setTimeout(expandAtn.bind(this),750)
  }

  Eraser.prototype.offAnimation = function(){
    this.eraser_.classList.add('hide')
    for (var i = this.divEraser.length - 1; i >= 0; i--) {
        this.divEraser.item(i).classList.remove('animar')
    };
    var offExpandAtn = function(){
      for (var i = this.divEraser.length - 1; i >= 0; i--) {
        this.divEraser.item(i).classList.remove('expand')
      };
    }
      
    var timer = setTimeout(offExpandAtn.bind(this),10)
    //document.addEventListener('mousemove',menu,false)
  }


  Eraser.prototype.animationRotation = function(e){
    if(e.x <=5 && e.y <=110 && e.y >= 95){
      this.eraser_.classList.contains('rotar-tam-pause')&&this.eraser_.classList.remove('rotar-tam-pause')
      !this.eraser_.classList.contains('rotar-tam')&&this.eraser_.classList.add('rotar-tam')
      !this.eraser_.classList.contains('rotar-tam-running')&&this.eraser_.classList.add('rotar-tam-running')
      console.log("**offBoxObjects")
      this.oBoxObject.disable()
    }else{
      !this.eraser_.classList.contains('rotar-tam-pause')&&this.eraser_.classList.add('rotar-tam-pause')
      this.eraser_.classList.contains('rotar-tam-running')&&this.eraser_.classList.remove('rotar-tam-running')
      console.log("**onBoxObjects")
      this.oBoxObject.enable()
    }
  	
  }

  window.Eraser = Eraser;
}(window,undefined,jQuery)

  /*End Class Eraser*/
  /*************************************/
