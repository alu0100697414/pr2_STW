"use strict"; // Sirve para dar mensajes de error y asi encontrarlos antes.

// Clase Medida
function Medida (valor, tipo) {
  this.valor_ = valor;
  this.tipo_ = tipo;
}

// Clase Temperatura
function Temperatura (valor, tipo) {
  Medida.call(this, valor, tipo);
}

// Indicamos que Temperatura hereda de Medida.
Temperatura.prototype = new Medida();


// Setters y Getters de la clase Medida
Medida.prototype.get_valor = function(){
  return this.valor_;
}

Medida.prototype.get_tipo = function(){
  return this.tipo_;
}

Medida.prototype.set_valor = function(valor){
  this.valor_ = valor;
}

Medida.prototype.set_tipo = function(tipo){
  this.tipo_ = tipo;
}

// Pasamos C a F
Temperatura.prototype.to_f = function(){
  return ((this.get_valor()*9)/5)+32;
}

// Pasamos F a C
Temperatura.prototype.to_c = function(){
  return ((this.get_valor()-32)*5)/9;
}

// Muestra el resultado final
Temperatura.prototype.mostrar = function(){
  var res = "El resultado es: " + this.get_valor() + " " + this.get_tipo();

  return res;
}

// Funcion conversor entre las distintas unidades
function conversor(){
  var res = new Temperatura();
  var temp = inicial.value;

  if (temp){

    var exp_regular = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([fFcC])/; var valor = temp.match(exp_regular);

    if (valor){

      var t = new Temperatura();

      t.set_valor(parseFloat(valor[1]));
      t.set_tipo(valor[2]);

      if (t.get_tipo() == 'c' || t.get_tipo() == 'C'){
        res.set_valor(t.to_f());
        res.set_tipo("F");
      }
      else{
        res.set_valor(t.to_c());
        res.set_tipo("C");
      }
      
      var m = res.mostrar();

      resultado.innerHTML = m;
    }
    else {
      resultado.innerHTML = "El valor '" + temp + "' no es correcto. Lea las instrucciones.";
    }
  }
  else
    resultado.innerHTML = "";
}
