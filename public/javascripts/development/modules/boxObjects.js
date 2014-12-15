	//"use stric"

!function(window,undefined,$){

	var BoxObjects = function(opt){
		var default_ = {
			$box:null,
			oPencil:null,
			oClock:null
		}
		if(typeof(opt) == "object")
			opt = $.extend(default_, opt);
		
		this.$box = opt.$box;
		this.box = opt.$box[0];
		this.oPencil = opt.oPencil;
		this.oClock = opt.oClock;
		//.init();
	}

	BoxObjects.prototype.init = function(opt){
		if(typeof(opt)=="object"){
			this.oPencil = opt.oPencil;
			this.oClock = opt.oClock;
			this.oEraser = opt.oEraser;
			var top = parseInt(getComputedStyle(this.oEraser.eraser_).height)-Math.abs(parseInt(getComputedStyle(this.oEraser.eraser_).marginTop)),
			bottom = parseInt(getComputedStyle(document.documentElement).height)-(parseInt(getComputedStyle(this.oPencil.tamano).height)-Math.abs(parseInt(getComputedStyle(this.oPencil.tamano).bottom))),
			right = parseInt(getComputedStyle(this.box).width);
			this.umbrals = {
				top:top,
				bottom:bottom,
				left:5,
				right:right
			}
			console.log(this.umbrals)
		}
		this.enable()
	}

	BoxObjects.prototype.enable = function(){
		document.addEventListener('mousemove',this.controller.bind(this),false)
		this.$box.mouseleave(this.oPencil.deactivateWrite.bind(this.oPencil))
	}
	BoxObjects.prototype.disable = function(){
		document.removeEventListener('mousemove',this.controller.bind(this),false)
		this.$box.off('mouseleave',this.oPencil.deactivateWrite.bind(this.oPencil))
	}
	BoxObjects.prototype.controller = function(){
  if (event.clientX < this.umbrals.left&& event.clientY > this.umbrals.top && event.clientY < this.umbrals.bottom){
			this.open()
  } 
  else if(event.clientX > this.umbrals.right||event.clientY<this.umbrals.top || event.clientY > this.umbrals.bottom){
			this.close()
	 }
	}
	BoxObjects.prototype.open = function(){
		this.box.classList.add('show-left');
		this.oClock.activate();
		//this.oEraser.disable()
	}
	BoxObjects.prototype.close = function(){
		//console.log(this)
		this.box.classList.remove('show-left');
		this.oClock.deactivate();
		//this.oEraser.enable()
	}
	//console.log(window.oPencil)

	window.BoxObjects = BoxObjects;
}(window,undefined,jQuery)
