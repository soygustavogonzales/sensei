//Esperamos a que se cargue el dom para iniciar la aplicación
window.onload = function(){
	console.log("hola desde script_pizarra");
	init();
	canvasApp();

}

//Comprobamos mediante la librería moderniz que el navegador soporta canvas
function canvasSupport(){
	var canvas = document.createElement('canvas');
	return (canvas.getContext)?true:false;
}

//Aquí englobo todo lo relacionado con la aplicación canvas.
function canvasApp() {

	//Si el navegador soporta canvas inicio la app.
	if(canvasSupport()){
		console.log("Soporta canvas?: "+canvasSupport());
		var theCanvas = document.getElementById("canvas"),
			context = theCanvas.getContext("2d"),
			buttonClean = document.getElementById("clean");
			socket = io.connect('/');

		init();

	}

	function init(){

		//Dibujo la pizarra sin nada en su interior.
		clean();

		var click = false, //Cambia a true si el usuario esta pintando
			block = false; //Cambia a true si hay otro usuario pintando

		/* Las variables click y block funcionan de forma que cuando un usuario esta dibujando, 
		los demás deben esperar a que este termine el trazo para poder dibujar ellos */

		function clean(){
			context.fillStyle = "green";
			context.fillRect(0,0,theCanvas.width,theCanvas.height);
		}

		//Se inicia al trazo en las coordenadas indicadas.
		function startLine(e){
			context.beginPath();
			context.strokeStyle = "#fff";
			context.lineCap = "round";
			context.lineWidth = 2;
				var x = e.pageX||e.clientX - theCanvas.offsetLeft,
								y = e.pageY||e.clientY - theCanvas.offsetTop;
			context.moveTo(x, y);
		}

		//Se termina el trazo.
		function closeLine(e){
			context.closePath();
		}

		//Dibujamos el trazo recibiendo la posición actual del ratón.
		function draw(e){
				var x = e.pageX||e.clientX - theCanvas.offsetLeft,
								y = e.pageY||e.clientY - theCanvas.offsetTop;
			context.lineTo(x,y);
			context.stroke();

		}

		//Usamos la librería socket.io para comunicarnos con el servidor mediante websockets
		socket.on('connect', function(){

			//Al darle click al botón limpiar enviamos orden de devolver la pizarra a su estado inicial.
			buttonClean.addEventListener("click",function(){

				if(!block){
					socket.emit('clean',true);
				}

			},false);

			//Al clickar en la pizarra enviamos el punto de inicio del trazo
			theCanvas.addEventListener("mousedown",function(e){
				var x = e.pageX||e.clientX,
								y = e.pageY||e.clientY;
				if(!block){
					socket.emit('startLine',{clientX : x, clientY : y});
					click = true;
					startLine(e);
				}

			},false);

			//Al soltar el click (dentro o fuera del canvas) enviamos orden de terminar el trazo
			window.addEventListener("mouseup",function(e){
				var x = e.pageX||e.clientX,
								y = e.pageY||e.clientY;
				if(!block){
					socket.emit('closeLine',{clientX : x, clientY : y});
					click = false;
					closeLine(e);
				}

			},false);

			//Al mover el ratón mientras esta clickado enviamos coordenadas donde continuar el trazo.
			theCanvas.addEventListener("mousemove",function(e){
					var x = e.pageX||e.clientX,
					y = e.pageY||e.clientY;
				if(click){
					if(!block){
						socket.emit('draw',{clientX : x, clientY : y});
						draw(e);
					}
				}

			},false);


			//Recibimos mediante websockets las ordenes de dibujo
			socket.on('down',function(e){
				if(!click){
					block = true;
					startLine(e);
				}
			});

			socket.on('up',function(e){
				if(!click){
					block = false;
					closeLine(e);
				}
			});

			socket.on('move',function(e){
				if(block){
					draw(e);
				}
			});
			
			socket.on('clean',clean);
			
		});//end socket

	}


}