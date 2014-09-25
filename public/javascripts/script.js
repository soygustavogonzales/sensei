  $caja = $('#caja'),
	 $btnCrearRect = $('.rectangle'),
		$eliminar = $('.eliminar'),
		$btnMoverPizarra = $('#change'),
		$pizarra = $('.pizarra'),
		$btnCrearCircle = $('.circule'),
		$btnCrearRaya = $('.raya'),
		$btnCrearTexto = $('.texto'),
		$btnCambiarTexto = $('.ctexto'),
		$parrafo = $('.parrafo'),
		$btnCrearForma = $('.cforma'),
		$btnCrearPtos = $('.cPtos'),
		$settingBox = $('#settingBox'),
		$fondoPizarra = $('.fondo-pizarra'),
		$btnElements = $('.box .btn-control'),
		$body = $('body'),
		elActual = null,
		mover = !true,
		actual = null,ant = null,
		ruta = 1;

		$body.width(screen.width-0)
		$body.height(683)
		$fondoPizarra.width(screen.width-0)
		$fondoPizarra.height(683)
		$pizarra[0].width = screen.width -0
		$pizarra[0].height = 683
		var canvas = new fabric.Canvas('blackboard',{
			backgroundColor: '#000',
	  selectionColor: 'rgba(189,186,182,.4)',
	  selectionLineWidth: 2,
	  width:screen.width -0,
	  height:683
		})

		$body.dblclick(function(event) {
			//console.log(event)
			crearCajaTexto({
				multiline:false,
				x:event.pageX,
				y:event.pageY,
				value:""
			},function(value){
				//console.log(value)
				if(value!=""){
						crearTexto({
							texto:value,
							x:event.pageX,
							y:event.pageY
						})
				}
			})
		});

		document.onmousedown = function(e){
		}

		var jalandoEle = false;
		var $ele = null;
		$btnElements.mousedown(function(event) {
			if(!jalandoEle){
				console.log("mousedown")
				jalandoEle = !jalandoEle
				$ele = $(this)
				console.log($ele)
			}
		});

		var counter = 0
		document.onmousemove = function (e) {
			jalandoEle&&console.log(counter++)

			if(jalandoEle&&counter>1){
			console.group("mousemove")
				console.log("x : %d, y: %d",e.x,e.y)
			console.groupEnd("mousemove")
				switch(true){
					case ($ele.hasClass('rectangle')):
						crearRectangulo({
							x:e.x,
							y:e.y,
							width:100,
							height:50,
							punta:1
						})
						break;
					case ($ele.hasClass('circule')):
						crearCirculo({
							x:e.x,
							y:e.y,
							r:25
						})
						break;
				}
				jalandoEle = !jalandoEle
				counter = 0
			}
		}
		document.onmouseup = function (e) {
			console.group("mouseup")
				console.log(e.x+' : '+e.y)
			console.groupEnd("mouseup")

		}

	$pizarra.ubicacion = "atras"

	$btnMoverPizarra.click(function(event) {
		//console.log($pizarra)
		if($pizarra.ubicacion == "atras"){
			$pizarra.css({
				'z-index':'4'
			})
			$pizarra.ubicacion = "adelante"
		}
		else{
				$pizarra.css({
				'z-index':'2'
			})
			$pizarra.ubicacion = "atras"
		}
	});

			function showSettingBox (opt) {
					var Element,rect,circle,text,path,default_;
					Element = function() {
						this.attributes = ["escala","rotacion","color-fondo","color-borde"]
					}

					rect = new Element()
					circle = new Element()
					text = new Element()
					path = new Element()

					rect.attributes.push("ancho")
					rect.attributes.push("alto")
					circle.attributes.splice(circle.attributes.indexOf("rotacion"),1)
					text.attributes.splice(text.attributes.indexOf("color-borde"),1)
					text.attributes.push("font-size")
					text.attributes.push("texto")

					default_ = {
						x:0,
						y:0,
						element:"rect",
					}

					opt = $.extend(default_, opt);

					switch(true){
						case(opt.element == "rect"):
							opt.attributes = rect.attributes
						break;
						case(opt.element == "circle"):
							opt.attributes = circle.attributes
						break;
						case(opt.element == "text"):
							opt.attributes = text.attributes
						break;
						case(opt.element == "path"):
							opt.attributes = path.attributes
						break;
					}
//					console.log(opt)
					$settingBox.addClass('show')
					$settingBox.removeClass('hide')
					var timer = setTimeout(function(){
							$settingBox.addClass('hide')
							$settingBox.removeClass('show')						
					},1500)
					$settingBox.mouseover(function(event) {
						clearTimeout(timer)
					});
					var ocultar = false
					$settingBox.mouseleave(function(event) {
							console.log("leave")
							$settingBox.removeClass('show')						
							$settingBox.addClass('hide')
					});



			}

			function crearCajaTexto (opt,callback) {
				var default_ = {
					multiline:false,//soportara? mas de 1 linea.multiline(textarea) , oneline(input(type="text"))
					x:100,
					y:100,
					cols:3,
					rows:1,
					value:null			
				}
				opt = $.extend(default_, opt);
				var input = null, $input = null
					if(opt.multiline){
						input = document.createElement("textarea");
						$input = $(input);
						$input.attr("cols",opt.cols)
						$input.attr("rows",opt.rows)
					}else{
						 input = document.createElement('input')
						 input.setAttribute('type','text')
							$input = $(input);
							$input.css({
								width:"150px",
							})
					}
						
						$input.val(opt.value)
						$input.css({
							background:"transparent",
							outline:"none",
							padding:"0px 5px",
							"font-size":"20px",
							position:"absolute",
							top:((opt.y)?((opt.y)+"px"):"100px"),
							left:((opt.x)?((opt.x)+"px"):"100px"),
							border:"1px dotted #333"
						})
						$caja.append($input)

						$input.keyup(function(event) {
							var code  = event.keyCode;
							//console.log(code)
							if(code==13){//si tecleo [ENTER]
								if($.trim($input.val())!="")
									callback($input.val())
								$input.remove()
							}
								
						});
			
			}
		function crearRectangulo (opt){
				var default_ = {
					x : 0,//posicion en el eje x
					y : 0,//posicion en el eje y
					width: 10,//anchura
					height: 10,//altura
					color:"rgba(0,0,0,0)",//color de fondo
					punta:0//redondes de los vertices,a mayor valor mas redonda sera la punta
				}
				opt = $.extend(default_, opt);
				var rect = new fabric.Rect({ width: 100, height: 50, fill: '#f55', opacity: 0.7 });
				canvas.add(rect).renderAll()

		}

		function crearRaya (opt) {
			var default_ = {
				points:["0,0","50,50"],
				ancho:3,
				objectName:null
			}
				opt = $.extend(default_,opt)
				var path = "", l = opt.points.length-1;
				$.each(opt.points, function(index, val) {
					//console.log(val)
					if(index==0)
					 path+="M"+val//path.concat("M"+val)
					else if(index>0)
						path+="L"+val
				});
				//path+="Z"
				//console.log(path)
				/*
				var newFigure = paper.path(path)
				.attr({
					fill:"rgba(0,0,0,.4)",
					stroke:"rgba(0,0,0,.9)",
					'stroke-width':2

				})
				*/

 
		}

		function crearForma() {
			crearPtos(function(opt){
				crearRaya({
					points:opt.arrayPtos,
					objectName:"objAmorfo"
				})
				opt.setPtos.remove()
			})
		}

		function crearPtos(callback) {
			var callback = callback || function(){}
			var set = paper.set();

			$body.css({
				cursor:"crosshair"
			})
			var arrayPtos = [],iniciar = true;
				$body.click(function(event) {
					if(iniciar){
						//	console.log(event.originalEvent)
							var x = event.originalEvent.x, y = event.originalEvent.y,
							ptoAnt = paper.getElementByPoint(x,y),
							ptoNuevo = x+","+y;
							if(ptoAnt&&ptoAnt.data('ruta')&&(ptoAnt.data('ruta')==ruta)){//se cogio un pto repetido

								iniciar = false
								startDefaultStatus()
								var ultimoEleEnSet = set[(set.length)-1],
								primerEleEnSet = set[0];
								arrayPtos.push(ptoNuevo)
								if(ultimoEleEnSet.id==ptoAnt.id)
									arrayPtos.splice(arrayPtos.length - 1,1)

								callback({
									arrayPtos:arrayPtos,
									setPtos:set
								})

								ruta++;
							}else{
								arrayPtos.push(ptoNuevo)
								var newPto = paper.circle(x,y,5)
								//.setCustomAttributes()
								.attr({
									stroke:"transparent",
									fill:"rgba(0,220,6,.7)"
								})
								.data('objectName','objPunto')
								.mouseover(function(){
									this.transform("s1.7")
									this.attr({
										stroke:"rgba(0,0,0,0)"
									})
								})
								.mouseout(function(){
									this.transform("s1")
								})
								.data('ruta',ruta)
								set.push(newPto)
								set_.push(newPto)
								.draggable()
							}
					}
				});
		}
		function startDefaultStatus() {
				$body.css({
					cursor:"default"
				})
		}
		function crearTexto (opt) {
			var default_ = {
				texto : "{ }",
				x:20,
				y:20
			}
			opt = $.extend(default_,opt)
			/*
			var newText = paper.text(opt.x,opt.y,opt.texto)
			*/

		}
		function crearCirculo(opt) {
				var default_ = {
					x : 0,//posicion en el eje x
					y : 0,//posicion en el eje y
					r: 5,//anchura
					color:"rgba(0,0,0,0)"//color de fondo
				}
				opt = $.extend(default_,opt)
				/*
				var newCirculo = paper.circle(opt.x,opt.y,opt.r)
				*/
		}

		function eliminarElemento (){
			//console.log("removiendo...")
			actual.remove()
		}


