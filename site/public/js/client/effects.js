//Esperamos a que se cargue el dom para iniciar la aplicación


/*Efectos en el DOM ************/
;!function(window,$,undefined){
		/**Tooltip de boorstrap*/
   $('#plumon').tooltip();//para q aparezca el tooltip cuando se produzca el hover sobre este elemento
   $('#eraserButton').tooltip();//para q aparezca el tooltip cuando se produzca el hover sobre este elemento
   $('#fullscreen').tooltip();
   $('#newRoom').tooltip();
		/***en tooltip*/
  var l = console;
	 var anchoVen = window.outerWidth; //el ancho(en pixeles) de la ventana del navegador(todos los navegadores), ultimas versiones
	 var altoVen = window.outerHeight;
	 var videoYou = document.querySelector("#you");
	 var dis_left_relative = 65;//distancia de la salida del trip(el contenedor del logotipo de cada modulo)
	 var dis_top_relative = 30;//distancia de la salida del trip(el contenedor del logotipo de cada modulo)
  $(function(){
  	var lateral = $('.lateral');
  	var lateral_content = $('.lateral > .content');
  		lateral.status = false;//esta retraido(como oculto)
  	lateral.css({
  		"left":(anchoVen-dis_left_relative)+"px",
  		"top":(0)+"px"
  	});
  	var trip = $('.trip');
  	/********/
  	/********/
  	trip.on("click",function(){
  		l.log("click");
  		var sentido = ((lateral.status==true)?"+":"-");
		 		lateral.animate({
		 			left:sentido+"=230px",
		 			opacity:"show"
		 		},800,function(){
		 			if(sentido=="-")
		 				lateral.status = true;//esta visible
		 			else
		 				lateral.status = false;//esta oculto

		 		});
  	});
  	trip.on("mouseenter",function(){
  		if(!lateral.status){

	  		l.log("mouseenter");
	  		lateral.animate({
	  			left:"-=10px"
	  		},205,function(){
	  			lateral.animate({left:"+=10px"},205)
	  			
	  		});
  		
  		}
  	});

  	var initVideo = function(){
				 /*
				 */
				 videoYou.width = lateral_content.width() - 100;
				 videoYou.height = lateral_content.height()/3;
				 videoYou.style.position = "relative";
				 videoYou.style.borderRadius = "5px";
				 videoYou.style.top = "15px";
				 videoYou.style.left = "15px";
				 videoYou.style.boxSizing = "border-box";

  	}
  		initVideo();
  	
  	$('canvas').on({
  		"mousedown" : function(e) {//cuando se de baje el boton del mouse
  				lateral.css({
  					"display":"none"
  				});
  		},
  		"mouseup": function (e) {//cuando se suelte el boton del mouse
  					lateral.css({
  					"display":"inline-block"
  				});
  		}  

  	});
  	$('#messages').mCustomScrollbar({
  		mouseWheel:true,
  		scrollButtons:{
  			enable:true,
  			scrollType:"continuous",
  			scrollSpeed:"auto",
  			scrollAmount:40
  		},
  		theme:"dark-2",
  		advanced:{
  			updateOnContentResize:true,
  			autoScrollOnFocus:true
  		}
  	})

  	$('#eraserButton').on('click',function(){
  		l.log("click en eraserButton")
  		plumon.color = "rgba(255,255,255,1)";//color blanco
  		plumon.ancho = 10;
  		plumon.modo = false;//modo borrador
  	})
  	/*
  	*/
  	window.colorPicker = document.querySelector('.colorPicker-plumon');
  	colorPicker.addEventListener("click",function(){
  		//l.log(this);
  		plumon.color = this.value;
  		plumon.ancho = 2;
  		l.log("click en colorPicker: "+ plumon.color + " : "+this.value);
  	},false);
  	
  	$('#plumon').on('click',function(){
  		plumon.modo = true;
				colorPicker.dispatchEvent(new MouseEvent('click'));//lanzo en evento, con codigo nativo de javascrip, pues con jquery me dio error
				//colorPicker.trigger('click');//forma comun de lanzar un evento mediante jquery

  	})
  	$(window).on("resize",function(){
  		//l.log("redimensionaste la ventana");
	 		var anchoVen = window.outerWidth; //el ancho(en pixeles) de la ventana del navegador(todos los navegadores), ultimas versiones
  		lateral.css({
  			"left":(anchoVen-dis_left_relative)+"px",
  			"top":(0)+"px"
  		});
  		lateral.status = false;
  		//l.log("lateral.status: "+lateral.status)
  	});
  })
		

  
}(window,jQuery,undefined);
