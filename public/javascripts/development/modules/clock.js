!function(window,undefined,$){

/**************************/
/*Clock*/
    var Clock = function(opt){
      var default_ = {
        date:null
      }
      opt = $.extend(default_,opt);
      this.date = opt.date;
      //this.init();
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
    window.Clock = Clock;

}(window,undefined,jQuery);



/*end Clock*/