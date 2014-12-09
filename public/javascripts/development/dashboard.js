  var circle = document.querySelector('.colores'),
  circleEraser = document.querySelector('.eraser'),
  tamano = document.querySelector('.tamano'),
  tamDiv = document.querySelectorAll('.tamano div'),
  div = document.querySelectorAll('.colores div'),
  divEraser = document.querySelectorAll('.eraser div'),
  articleColores = document.querySelector('.colores-btn'),
  articleEraser = document.querySelector('.eraser-btn'),
  boxLeft = document.querySelector('.box-left'),
  boxRight = document.querySelector('.box-right'),
  superior = document.querySelector('.superior'),
  itemsRight = $('.box-right nav ul li'),//todos los items dentro del lateral rigth
  globo = $('.globo'),
  flechita = $('.globo .flechita');

//  console.log(itemsRight)

    var onAnimation = function(){
      
      document.removeEventListener('mousemove',menu,false)
      circle.classList.remove('hide')
      tamano.classList.remove('hide')
      for (var i = div.length - 1; i >= 0; i--) {
          div.item(i).classList.add('animar')
          tamDiv.item(i)&&tamDiv.item(i).classList.add('animar-tam')
      };
      var timer = setTimeout(function(){
        for (var i = div.length - 1; i >= 0; i--) {
          div.item(i).classList.add('expand')
          tamDiv.item(i)&&tamDiv.item(i).classList.add('expand-tam')
        };
      },750)
      
    }

    var offAnimation = function(){
      document.addEventListener('mousemove',menu,false)
      circle.classList.add('hide')
      tamano.classList.add('hide')
      for (var i = div.length - 1; i >= 0; i--) {
          div.item(i).classList.remove('animar')
          tamDiv.item(i)&&tamDiv.item(i).classList.remove('animar-tam')
      };
      var timer = setTimeout(function(){
        for (var i = div.length - 1; i >= 0; i--) {
          div.item(i).classList.remove('expand')
          tamDiv.item(i)&&tamDiv.item(i).classList.remove('expand-tam')
        };
      },10)
      
    }

    var onAnimationEraser = function() {
      
      document.removeEventListener('mousemove',menu,false)
      circleEraser.classList.remove('hide')
      for (var i = divEraser.length - 1; i >= 0; i--) {
          divEraser.item(i).classList.add('animar')
      };
      var timer = setTimeout(function(){
        for (var i = divEraser.length - 1; i >= 0; i--) {
          divEraser.item(i).classList.add('expand')
        };
      },750)
      
    }
    var offAnimationEraser = function() {

      circleEraser.classList.add('hide')
      for (var i = divEraser.length - 1; i >= 0; i--) {
          divEraser.item(i).classList.remove('animar')
      };
      var timer = setTimeout(function(){
        for (var i = divEraser.length - 1; i >= 0; i--) {
          divEraser.item(i).classList.remove('expand')
        };
      },10)
      document.addEventListener('mousemove',menu,false)

    }
    var animationRotationEraser = function (e) {

      document.removeEventListener('mousemove',menu,false)

      if(e.x <=5 && e.y <=110 && e.y >= 95){
        this.classList.contains('rotar-tam-pause')&&this.classList.remove('rotar-tam-pause')
        !this.classList.contains('rotar-tam')&&this.classList.add('rotar-tam')
        !this.classList.contains('rotar-tam-running')&&this.classList.add('rotar-tam-running')
      }else{
        !this.classList.contains('rotar-tam-pause')&&this.classList.add('rotar-tam-pause')
        this.classList.contains('rotar-tam-running')&&this.classList.remove('rotar-tam-running')
      }
    }
    
    var animationRotationTamano = function (e){
      //console.log("x: %d,y: %d",e.x,e.y)
      if(e.x >= 90 && e.y >= 670){
        tamano.classList.contains('rotar-tam-pause')&&tamano.classList.remove('rotar-tam-pause')
        tamano.classList.contains('rotar-tam-reverse')&&tamano.classList.remove('rotar-tam-reverse')
        !tamano.classList.contains('rotar-tam')&&tamano.classList.add('rotar-tam')
      }
      else if(e.x <= 5 && e.y <= 590){
        tamano.classList.contains('rotar-tam-pause')&&tamano.classList.remove('rotar-tam-pause')
        !tamano.classList.contains('rotar-tam')&&tamano.classList.add('rotar-tam')
        !tamano.classList.contains('rotar-tam-reverse')&&tamano.classList.add('rotar-tam-reverse')
      }
      else{
        !tamano.classList.contains('rotar-tam-pause')&&tamano.classList.add('rotar-tam-pause')
      }
    } 
/**************************/
/*Clock*/
    var Clock = function(opt){
      var default_ = {
        date:null
      }
      opt = $.extend(default_,opt);
      this.date = opt.date;
      this.init();
    };
      

    Clock.prototype.init = function(){

      var cT = new Date(),
          cD = cT.getDate(),
          cH = cT.getHours(),
          cM = cT.getMinutes(),
          cS = cT.getSeconds(),
          cA = cT.getFullYear();

      cM = (cM < 10 ? '0' : '') + cM;
      cS = (cS < 10 ? '0' : '') + cS;
      cH = (cH > 12) ? cH - 12 : cH;
      cH = (cH === 0) ? 12 : cH;
      // get Clock
      var clk = cH + ':' + cM;
      
      // array  days
      var w = new Array(7);
      w = [
        'Domingo','Lunes','Martes',
        'Miercoles','Jueves','Viernes','Sabado'];
      
      // get day
      var day = w[cT.getDay()];
      
      // array months
      var m = new Array(12);
      m =[
        'Enero','Febrero','Marzo',
        'Abril','Mayo','Junio','Julio',
        'Agosto','Septiembre','Octubre',
        'Noviembre','Diciembre'];
      // get Month
      var month = m[cT.getMonth()];

      // Render html
      this.date.innerHTML = 
        '<div class="clock">'+clk+'</div>'+
        '<ul class="day">'+
          '<li>'+day+'</li>'+
          '<li>'+cD+' de '+month+'</li>'+
        '</ul>';
    };

    Clock.prototype.activate = function(){
      this.date.classList.add('showClock');
    };
    Clock.prototype.deactivate = function(){
      this.date.classList.remove('showClock');
    };
    
    var oClock = new Clock({
      date:document.querySelector('.date')
    });

/*end Clock*/

    var menu = function (e){
      var umbralWidth = screen.width - 5;
      if (e.clientX < '5'&& e.clientY > '100' && e.clientY < '550'){
        /*abrir panel izquierdo*/
        boxLeft.classList.add('show-left');
        // show clock
        oClock.activate();
      // left = 150px
      } 
      else if(e.clientX > '150'){
        boxLeft.classList.remove('show-left');
        oClock.deactivate();

      }

      if(e.clientX > umbralWidth && e.clientY > '100' && e.clientY < '550'){
        /*abrir panel derecho*/
        console.log("abrir derecha")
        boxRight.classList.add('show-right');
      } else if(e.clientX < (screen.width - 180)){
        boxRight.classList.remove('show-right');
      }
      if(e.clientX > screen.width/3 && e.clientX < (screen.width - screen.width/3) && e.clientY < 5 ){
        /*abrir panel superior*/
        console.log("abrir arriba")
        superior.classList.add('show-top')
        //superior.style.top = 0
      }else if(e.clientY > (4*14)){
        superior.classList.remove('show-top')
        //superior.style.top = '-3em'
      }
    }
        
    var showGlobo = function(e) {
      //console.log(this);//this representa al elemento-no al conjunto de los mismos- sobre el que se esta disparando el evento.
      var cantItem = itemsRight.length,
      altoItem = $(itemsRight[0]).height(),
      ant = e.relatedTarget.dataset.nro,
      actual = $(e.target).data('nro'),
      umbral = altoItem/2;
      //console.log(e.toElement)
      switch(true){
        case(actual<ant):
          umbral = umbral*(-1)
        break;
        case(ant==null):
          umbral = 0
        break;
        default:
          umbral = umbral
      }

      var factor = (10*14)*(-1);
      var top = e.clientY + factor + umbral;
      globo.normalPosition = true;
      flechita.normalTopPosition = getComputedStyle(flechita[0]).top;
      flechita.normalPosition = true;
      if(globo.hasClass('hide')){
        if(cantItem==actual){//hover sobre el ultimo elemento
          top = top - (2*14);
          globo.normalPosition = false;
          console.log("hover sobre el ultimo ele")
          //flechita.css('top',(parseInt(flechita.normalTopPosition)+(3*14))+'px')
          //flechita.normalPosition = false
        }
        globo.css('top',top+'px')
        //globo.toggleClass('hide');
        globo.toggleClass('show');
        globo.toggleClass('addGloboAtn')
        setTimeout(function(){
          globo.css({
            'left':'70em'
          })
        },1550)
      }else{
        /*
        if(!flechita.normalPosition){
          flechita.css('top',flechita.normalTopPosition)
          flechita.normalPosition = true
        }
        */
          
        globo.toggleClass('hide');
        setTimeout(function(){
          globo.css({
            'left':'60em'
          })
        },1550)
      }
    }
    for (var i = div.length - 1; i >= 0; i--) {
      div[i].onclick = function (){
        console.log("click on color")
        board.changeColor(this.querySelector('span').style.background)
      }
      div[i].onmouseover = function (){
        var span = this.children;
        var background = span[0].style.background;
        for (var i = tamDiv.length - 1; i >= 0; i--) {
          var span = tamDiv.item(i).children;
          span[0].style.background = background
        };

      }
    };
    for (var i = tamDiv.length - 1; i >= 0; i--) {
      tamDiv[i].onclick = function (){
        console.log("click on tamano")
      }
    };

document.addEventListener('mousemove',menu,false)
articleColores.addEventListener('mouseenter',onAnimation,false)
articleEraser.addEventListener('mouseenter',onAnimationEraser,false)
tamano.addEventListener('mouseleave',offAnimation,false)
circleEraser.addEventListener('mouseleave',offAnimationEraser,false)
circleEraser.addEventListener('mousemove',animationRotationEraser,false)
tamano.addEventListener('mousemove',animationRotationTamano,false)
itemsRight.hover(showGlobo);
    