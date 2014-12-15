var boxRight = document.querySelector('.box-right'),
  tamDiv = document.querySelectorAll('.tamano div'),
  div = document.querySelectorAll('.colores div'),
  superior = document.querySelector('.superior'),
  itemsRight = $('.box-right nav ul li'),//todos los items dentro del lateral rigth
  globo = $('.globo'),
  flechita = $('.globo .flechita');



    var menu = function (e){
      var umbralWidth = screen.width - 5;
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



document.addEventListener('mousemove',menu,false)
itemsRight.hover(showGlobo);
    