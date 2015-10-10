"use strict"; // Sirve para dar mensajes de error y asi encontrarlos antes.

function Medida (valor, tipo) {
  this.valor_ = valor;
  this.tipo_ = tipo;
}

function Temperatura (valor, tipo) {
  this.base = Medida;
  this.base(valor, tipo);
}

var temp = new Temperatura(4,"F");

alert("Valor: " + temp.valor_ + "\nTipo: " + temp.tipo_);
