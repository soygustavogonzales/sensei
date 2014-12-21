!function(window,undefined,$){

  /***************************************/
  function RadialColors(opt){
  				var default_ = {
  					points:10,
  					radius:150,
  					rotate:0,
  					duration:800,
  					$rc:$('#radialColors'),
  					$center:$('#center')
  				} 
  				opt = $.extend(default_,opt);
  				
       this.points = opt.points;
       this.radius = opt.radius;
       this.rotate = opt.rotate;
       this.duration = opt.duration;
       this.$rc = opt.$rc;
       this.selectedColor = null;
   				this.$center = opt.$center
   				this.init();

  }//.radialColors;

  RadialColors.prototype.init = function(points, radius, rotate){
  //DRAW_POINTS : Se crean los circulos
          var elm       = 36;
          var r         = this.radius;
          var items     = this.points;
          var rotation  = this.rotate * (Math.PI / 180);

          var $this     = this.$center;
          var width     = $this.width();
          var height    = $this.height();
          var count     = 1;
          var elm_w     = elm / 2;
          var elm_h     = elm / 2;
          var parent_x  = width / 2;  //offset.left;// + width / 2;
          var parent_y  = height / 2; //offset.top;// + height / 2;
          var colors = [
                        'rgba(234,56,45,1)',
                        'rgba(234,60,80,1)',
                        'rgba(254,80,90,1)',
                        'rgba(200,80,90,1)',
                        'rgba(150,180,190,1)',
                        'rgba(120,100,190,1)',
                        'rgba(50,50,50,1)',
                        '#7BB200',
                        'rgba(20,20,20,1)',
                        'rgba(10,10,10,1)',
                        'rgba(40,40,40,1)'
                        ]

          this.$center.html('');
          //$('#output_css').html('');

          //$('#output').append( '<div>.point-container { position: relative; } </div>');

          for(var i = items; i > 0; i--) {

            var x = parent_x + r * Math.cos(2 * Math.PI * i / items + rotation) - elm_w;
            var y = parent_y + r * Math.sin(2 * Math.PI * i / items + rotation) - elm_h;
            var $point = $('<div></div>')
            $point.click(this.updateCurrentColor.bind(this,$point[0].style));
            $point.addClass('point')
            $point.css({
              left:x+"px",
              top:y+"px",
              background:colors[i]
            })
            //$point.text(count)
            this.$center.append($point);

            count = count + 1;
          }
  	
  }
  RadialColors.prototype.updateCurrentColor = function(color){
  	this.selectedColor = color.backgroundColor;
  	//console.log(this.selectedColor)
  }

  RadialColors.prototype.showAnimation = function(){
  	if(this.$rc.hasClass('hide')){
     	this.$rc.removeClass('hide');
     	this.$rc.addClass('addOnRCAnimation');
  	}else{
  		this.ocultar()
  	 var timer2 = setTimeout(this.showAnimation.bind(this),500)
  		
  	}

  }

  RadialColors.prototype.ocultar = function(callback) {
    	this.$rc.addClass('hide');
    	this.$rc.removeClass('addOnRCAnimation');
  }

  window.RadialColors = RadialColors;

}(window,undefined,jQuery)

var rc = new RadialColors({
	$rc:$('#radialColors'),
	$center:$('#center')
})