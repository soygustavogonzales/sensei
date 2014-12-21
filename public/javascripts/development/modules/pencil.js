//	"use stric"

!function(window,undefined,$){

	/***************************/
	/*Pencil*/
	var Pencil = function(opt){	
		var default_ = {
			$pencil:null,
			$canvas:null,
			tamano:null,
			tamDiv:null,
			div:null,
			articleColores:null,
			circle:null,
			boxObject:null
		}
		opt = $.extend(default_, opt);
		this.$pencil = opt.$pencil;
		this.tamano = opt.tamano;
		this.tamDiv = opt.tamDiv;
		this.div = opt.div;
		this.articleColores = opt.articleColores;
		this.circle = opt.circle;
		this.$canvas = opt.$canvas;
		this.boxObject = opt.boxObject;
		this.status = null;
		//this.init() 
	}

	Pencil.prototype.init = function(opt){
		this.articleColores.addEventListener('mouseenter',this.onAnimation.bind(this),false)
		this.tamano.addEventListener('mouseleave',this.offAnimation.bind(this),false)
		this.tamano.addEventListener('mousemove',this.onAnimationRotation.bind(this),false)
		if(opt){
			this.boxObject = opt.boxObject;
			this.oBoard = opt.oBoard;
		}
		this.enable()
	}
	Pencil.prototype.enable = function(){
		this.$pencil.on("click",this.activateWrite.bind(this))
		this.activateSelectColor();

		this.articleColores.classList.contains('hide')&&this.articleColores.classList.remove('hide')
		this.status = true;
	}
	Pencil.prototype.disable = function(){
		this.$pencil.off("click",this.activateWrite.bind(this))
		!this.articleColores.classList.contains('hide')&&this.articleColores.classList.add('hide')
		this.status = false;
	}
	Pencil.prototype.activateSelectColor = function(){
	    for (var i = this.div.length - 1; i >= 0; i--) {
	    	var self = this
	    		this.div[i].addEventListener('click',function(){
	        self.oBoard.changeColor(this.querySelector('span').style.background)
	    		},false);
	    			
	      this.div[i].addEventListener('mouseover',this.activatePreviewColor.bind(this,i),false);

	    };
	}

	Pencil.prototype.activatePreviewColor = function(i){
	   var span = this.div[i].children;
	   var background = span[0].style.background;
	   for (var i = this.tamDiv.length - 1; i >= 0; i--) {
	     var span = this.tamDiv.item(i).children;
	     span[0].style.background = background
	   };

	}
	Pencil.prototype.activateSelectWeigSht = function(){
		    for (var i = this.tamDiv.length - 1; i >= 0; i--) {
	      this.tamDiv[i].onclick = function (){
	        console.log("click on tamano")
	      }
	    };
	}

	Pencil.prototype.activateWrite = function(){
			if(!this.$canvas.activate){//si esta desactivado
				this.$canvas.css({
					'z-index':4
				})
			}
			this.$canvas.activate = true
			this.oBoard.activatedEraser = false;
	}
		
	Pencil.prototype.deactivateWrite = function(){
			if(this.$canvas.activate){
				this.$canvas.css({
					'z-index':2
				})
			}
			this.$canvas.activate = false	
	}
	Pencil.prototype.onAnimation = function(){
	      //document.removeEventListener('mousemove',menu,false)
	      this.boxObject.disable()
	      //console.log(this)
	      this.circle.classList.remove('hide')
	      this.tamano.classList.remove('hide')
	      for (var i = this.div.length - 1; i >= 0; i--) {
	          this.div.item(i).classList.add('animar')
	          this.tamDiv.item(i)&&this.tamDiv.item(i).classList.add('animar-tam')
	      };
	      var on = function(){
	        for (var i = this.div.length - 1; i >= 0; i--) {
	          this.div.item(i).classList.add('expand')
	          this.tamDiv.item(i)&&this.tamDiv.item(i).classList.add('expand-tam')
	        };
	      }
	      var timer = setTimeout(on.bind(this),750)
	}
	Pencil.prototype.offAnimation = function(){
	      //document.addEventListener('mousemove',menu,false)
	      this.boxObject.enable()
	      this.circle.classList.add('hide')
	      this.tamano.classList.add('hide')
	      for (var i = this.div.length - 1; i >= 0; i--) {
	          this.div.item(i).classList.remove('animar')
	          this.tamDiv.item(i)&&this.tamDiv.item(i).classList.remove('animar-tam')
	      };
	      var off = function(){
	        for (var i = this.div.length - 1; i >= 0; i--) {
	          this.div.item(i).classList.remove('expand')
	          this.tamDiv.item(i)&&this.tamDiv.item(i).classList.remove('expand-tam')
	        };
	      }

	      var timer = setTimeout(off.bind(this),10)
	}
	Pencil.prototype.onAnimationRotation = function(e){
	      //console.log("x: %d,y: %d",e.x,e.y)
	      if(e.x >= 90 && e.y >= 670){
	        this.tamano.classList.contains('rotar-tam-pause')&&this.tamano.classList.remove('rotar-tam-pause')
	        this.tamano.classList.contains('rotar-tam-reverse')&&this.tamano.classList.remove('rotar-tam-reverse')
	        !this.tamano.classList.contains('rotar-tam')&&this.tamano.classList.add('rotar-tam')
	      }
	      else if(e.x <= 5 && e.y <= 590){
	        this.tamano.classList.contains('rotar-tam-pause')&&this.tamano.classList.remove('rotar-tam-pause')
	        !this.tamano.classList.contains('rotar-tam')&&this.tamano.classList.add('rotar-tam')
	        !this.tamano.classList.contains('rotar-tam-reverse')&&this.tamano.classList.add('rotar-tam-reverse')
	      }
	      else{
	        !this.tamano.classList.contains('rotar-tam-pause')&&this.tamano.classList.add('rotar-tam-pause')
	      }
	}

	window.Pencil = Pencil;

}(window,undefined,jQuery)




	//console.log(oPencil)
