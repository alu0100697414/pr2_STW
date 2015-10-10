"use strict"; // Sirve para dar mensajes de error y asi encontrarlos antes.

// Clase Medida
function Medida (valor, exp, tipo) {
  var valor_ = valor;
  var exp_ = exp;
  var tipo_ = tipo;

  this.get_valor = function() {return valor_;}
	this.get_exp = function() {return exp_;}
  this.get_tipo = function() {return tipo_;}

  this.set_valor = function(valor) {valor_ = valor;}
  this.set_exp = function(exp) {exp_ = exp;}
  this.set_tipo = function(tipo) {tipo_ = tipo;}
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

    temp.set_valor(parseFloat(temp.get_valor()));

    if (temp.get_exp() !== undefined){
      temp.set_exp(parseInt(temp.get_exp()));

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
        if(div !== 0) temp.set_valor(temp.get_valor()*div); // Si es distinto de 0 multiplicamos
      }
    }

    if(temp.get_tipo() === 'c' || temp.get_tipo() === 'C'){
      // Pasamos de C a F
      var temp_final = new Temperatura(((temp.get_valor()*9)/5)+32,1,"F");
      var res = "El resultado es: " + temp_final.get_valor() + " " + temp_final.get_tipo();
    } else {
      // Pasamos de F a C
      var temp_final = new Temperatura(((temp.get_valor()-32)*5)/9,1,"C");
      var res = "El resultado es: " + temp_final.get_valor() + " " + temp_final.get_tipo();
    }

    resultado.innerHTML = res;  // Mostramos el resultado en el HTML

  } else {
    resultado.innerHTML = "El valor '" + ini_temp + "' no es correcto. Lea las instrucciones.";
  }
}
