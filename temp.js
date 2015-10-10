"use strict"; // Sirve para dar mensajes de error y asi encontrarlos antes.

// Clase Medida
function Medida (valor, exp, tipo) {
  var valor_ = valor;
  var exp_ = exp || 0;
  var tipo_ = tipo;

  this.get_valor = function() {return valor_;}
	this.get_exp = function() {return exp_;}
  this.get_tipo = function() {return tipo_;}

  this.set_valor = function(valor) {valor_ = valor;}
  this.set_exp = function(exp) {exp_ = exp;}
  this.set_tipo = function(tipo) {tipo_ = tipo;}
}

// Muestra el resultado
Medida.prototype.mostrar_final = function(){
  var res = "El resultado es: " + this.get_valor() + " " + this.get_tipo();
  resultado.innerHTML = res;
}

// Muestra el error
Medida.prototype.mostrar_error = function(){
  resultado.innerHTML = "El valor '" + ini_temp + "' no es correcto. Lea las instrucciones.";
}


// Clase Temperatura
function Temperatura (valor, exp, tipo) {
  Medida.call(this, valor, exp, tipo);
}

// Indicamos que Temperatura hereda de Medida.
Temperatura.prototype = new Medida();

function conversor(){

  // Cogemos el valor del imput y lo guardamos.
  var ini_temp = document.getElementsByName("ini_temp")[0].value;

  /* Expresion regular que acepta una cadena que empiece por un numero con el signo como manera opcional
  asi como si este es decimal. Con el primer parentesis recojo el valor de la temperatura y con el segundo
  el tipo de temperatura que es. */
  //var exp_regular = /(^[-+]?\d+(?:\.\d*)?)([fFcC])/;
  var exp_regular_uno = /(^[-+]?\d+(?:\.\d*)?)(?:[eE]?([-+]?\d+))?\s*([fFcC])/;

  // Filtramos en la variable con la expresion regular.
  var valor = ini_temp.match(exp_regular_uno);

  var temp = new Temperatura(valor[1],valor[2],valor[3]);

  if(temp != null){

    // Pasamos a flotante el valor de la temperatura
    temp.set_valor(parseFloat(temp.get_valor()));

    if (temp.get_exp() !== undefined){
      temp.set_exp(parseInt(temp.get_exp())); // Pasamos el exponente a numero

      // Calculamos el valor correspondiente de la temperatura sin el exponente
      if (temp.get_exp()<0){
        temp.set_exp(temp.get_exp()*-1);
        var i = 1, div = 10;

        while(i < temp.get_exp()){
          div = div * 10;
          i++; // Vemos por cuanto debemos dividirlo
        }

        if(div !== 0) {
          temp.set_valor(temp.get_valor()/div);
          alert(temp.get_valor());
        }


      } else {
        var i = 1, div = 10;

        while(i < temp.get_exp()){
          div = div * 10;
          i++; // Vemos por cuanto debemos multiplicarlo
        }

        if(div !== 10){
          temp.set_valor(temp.get_valor()*div); // Si es distinto de 0 multiplicamos
        }
      }
    }

    // Hacemos la conversion
    if(temp.get_tipo() === 'c' || temp.get_tipo() === 'C'){
      // Pasamos de C a F
      var temp_final = new Temperatura(((temp.get_valor()*9)/5)+32,0,"F");
    } else {
      // Pasamos de F a C
      var temp_final = new Temperatura(((temp.get_valor()-32)*5)/9,0,"C");
    }

    temp_final.mostrar_final(); // Muestra resultado

  } else {
    temp.mostrar_error();  // Muestra error
  }
}
