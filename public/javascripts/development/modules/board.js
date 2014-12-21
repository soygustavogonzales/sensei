;!function(window,undefined,$){

		var Board = function (opt){
			var default_ = {
				firebaseURI:'https://senseiapp.firebaseio.com/rooms',
				canvasId:'blackboard'
			}
			opt = $.extend(default_, opt);
			
			this.pixSize = 1;
			this.lastPoint = null;
			this.currentColor = "000";
			this.mouseDown = 0;
			this.uri = URI(location.href).search(true);
			this.roomId = this.uri.roomId;
			this.pixelDataRef = new Firebase(opt.firebaseURI+'/'+this.roomId);
			this.myCanvas = document.getElementById(opt.canvasId);
		 this.myContext = this.myCanvas.getContext ? this.myCanvas.getContext('2d') : null;
		 this.init();
		 this.activatedEraser = false;
		}
		Board.prototype.drawPixel = function(snapshot,obj){
		   var coords = snapshot.name().split(":");
		   obj.myContext.fillStyle = snapshot.val();
		   obj.myContext.fillRect(parseInt(coords[0]) * obj.pixSize, parseInt(coords[1]) * obj.pixSize, obj.pixSize, obj.pixSize);
		}

		Board.prototype.clearPixel = function(snapshot,obj){
		   var coords = snapshot.name().split(":");
		   obj.myContext.clearRect(parseInt(coords[0]) * obj.pixSize, parseInt(coords[1]) * obj.pixSize, obj.pixSize, obj.pixSize);
		}
		Board.prototype.eraserLineOnMouseMove = function(e,obj){
			e.preventDefault();
		 var offset = $('canvas').offset();
	  var x1 = Math.floor((e.pageX - offset.left) / obj.pixSize - 1),
	  y1 = Math.floor((e.pageY - offset.top) / obj.pixSize - 1);
   var x0 = (obj.lastPoint == null) ? x1 : obj.lastPoint[0];
   var y0 = (obj.lastPoint == null) ? y1 : obj.lastPoint[1];	  
   for(var i = 0;i <=8 ;i++){
   	obj.pixelDataRef.child((x0+i) + ":" + (y0+i)).remove();
   }

		}
		Board.prototype.drawLineOnMouseMove = function(e,obj){

			  if (!obj.mouseDown) return;

		    e.preventDefault();

		    // Bresenham's line algorithm. We use obj to ensure smooth lines are drawn
		    var offset = $('canvas').offset();
		    var x1 = Math.floor((e.pageX - offset.left) / obj.pixSize - 1),
		      y1 = Math.floor((e.pageY - offset.top) / obj.pixSize - 1);
		    var x0 = (obj.lastPoint == null) ? x1 : obj.lastPoint[0];
		    var y0 = (obj.lastPoint == null) ? y1 : obj.lastPoint[1];
		    var dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
		    var sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1, err = dx - dy;
		    while (true) {
		      //write the pixel into Firebase, or if we are drawing white, remove the pixel
		      obj.pixelDataRef.child(x0 + ":" + y0).set(obj.currentColor === "fff" ? null : obj.currentColor);

		      if (x0 == x1 && y0 == y1) break;
		      var e2 = 2 * err;
		      if (e2 > -dy) {
		        err = err - dy;
		        x0 = x0 + sx;
		      }
		      if (e2 < dx) {
		        err = err + dx;
		        y0 = y0 + sy;
		      }
		    }
		    obj.lastPoint = [x1, y1];
		}

		Board.prototype.init = function (){
			var self = this;
			 if (this.myContext == null) {
		    alert("You must use a browser that supports HTML5 Canvas to run this demo.");
		    return;
		  }
		  this.myContext.lineCap = "round"
		  //Keep track of if the mouse is up or down
		  this.myCanvas.onmousedown = function () {self.mouseDown = 1;};
		  this.myCanvas.onmouseout = this.myCanvas.onmouseup = function () {
		    self.mouseDown = 0; self.lastPoint = null;
		  };

		  $(this.myCanvas).mousemove(function(e){
		  	if(!self.activatedEraser)
		  		self.drawLineOnMouseMove(e,self)
		  	else
		  		self.eraserLineOnMouseMove(e,self)
		  });

		  $(this.myCanvas).mousedown(function(e){
		  	if(!self.activatedEraser)
		  		self.drawLineOnMouseMove(e,self)
		  	else
		  		self.eraserLineOnMouseMove(e,self)
		  });

		  this.pixelDataRef.on('child_added', function(e){
		  	self.drawPixel(e,self)
		  });
		  this.pixelDataRef.on('child_changed', function(e){
		   self.drawPixel(e,self)
		  });
		  this.pixelDataRef.on('child_removed', function(e){
		  	self.clearPixel(e,self)
		  });
		}
		Board.prototype.changeColor = function (newColor){

			this.currentColor = newColor;
			console.log(this.currentColor)
		}

		window.Board = Board;


}(window,undefined,jQuery)



var board = new Board({
	firebaseURI:'https://senseiapp.firebaseio.com/rooms',
	canvasId:'blackboard'
});