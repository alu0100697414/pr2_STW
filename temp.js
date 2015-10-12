"use strict"; // Sirve para dar mensajes de error y asi encontrarlos antes.

// Clase Medida
function Medida (valor, exp, tipo) {
  this.valor_ = valor;
  this.exp_ = exp || 0;
  this.tipo_ = tipo;
}

// Clase Temperatura
function Temperatura (valor, exp, tipo) {
  Medida.call(this, valor, exp, tipo);
}

// Indicamos que Temperatura hereda de Medida.
Temperatura.prototype = new Medida();


// Setters y Getters de la clase Medida
Medida.prototype.get_valor = function(){
  return this.valor_;
}

Medida.prototype.get_exp = function(){
  return this.exp_;
}

Medida.prototype.get_tipo = function(){
  return this.tipo_;
}

Medida.prototype.set_valor = function(valor){
  this.valor_ = valor;
}

Medida.prototype.set_exp = function(exp){
  this.exp_ = exp;
}

Medida.prototype.set_tipo = function(tipo){
  this.tipo_ = tipo;
}

// Calcula el numero correspondiente. Por ejemplo: 3.2e1 -> 32
Temperatura.prototype.calculo_numero = function(){

  if (this.get_exp() !== undefined){
    this.set_exp(parseInt(this.get_exp())); // Pasamos el exponente a numero

    // Calculamos el valor correspondiente de la temperatura sin el exponente
    if (this.get_exp()<0){
      this.set_exp(this.get_exp()*-1);
      var i = 1, div = 10;

      while(i < this.get_exp()){
        div = div * 10;
        i++; // Vemos por cuanto debemos dividirlo
      }

      if(div !== 0) {
        this.set_valor(this.get_valor()/div);
      }

    } else {
      var i = 1, div = 10;

      while(i < this.get_exp()){
        div = div * 10;
        i++; // Vemos por cuanto debemos multiplicarlo
      }

      if(div !== 10){
        this.set_valor(this.get_valor()*div); // Si es distinto de 0 multiplicamos
      }
    }
  }
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
Temperatura.prototype.mostrar_final = function(){
  var res = "El resultado es: " + this.get_valor() + " " + this.get_tipo();
  resultado.innerHTML = res;
}

function conversor(){

  // Cogemos el valor del imput y lo guardamos.
  var ini_temp = document.getElementsByName("ini_temp")[0].value;

  // Expresion regular
  var exp_regular_uno = /(^[-+]?\d+(?:\.\d*)?)(?:[eE]?([-+]?\d+))?\s*([fFcC])/;

  // Filtramos en la variable con la expresion regular.
  var valor = ini_temp.match(exp_regular_uno);
  alert(valor);

  // Creamos el objetio si este no es nulo
  if(valor !== null){
    var temp = new Temperatura(valor[1],valor[2],valor[3]);

    // Pasamos a flotante el valor de la temperatura
    temp.set_valor(parseFloat(temp.get_valor()));
    temp.calculo_numero();

    // Hacemos la conversion
    if(temp.get_tipo() === 'c' || temp.get_tipo() === 'C'){
      // Pasamos de C a F
      var temp_final = new Temperatura(temp.to_f(),0,"F");
    } else {
      // Pasamos de F a C
      var temp_final = new Temperatura(temp.to_c(),0,"C");
    }

    temp_final.mostrar_final(); // Muestra resultado

  } else {
    resultado.innerHTML = "El valor '" + ini_temp + "' no es correcto. Lea las instrucciones.";
  }
}
