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
		if(opt){
			this.oPencil = opt.oPencil;
			this.oClock = opt.oClock;
			this.oEraser = opt.oEraser;
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
  if (event.clientX < '5'&& event.clientY > '100' && event.clientY < '550'){
			this.open()
  } 
  else if(event.clientX > '150'){
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
