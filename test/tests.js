var expect = chai.expect;

describe("Test para ConverTemp", function() {

  var fin = document.getElementById("resultado");

    it("Debería ser: 32e4F", function() {
      var temp = new Temperatura(32,4,"F");
      expect(temp.get_valor()).to.equal(32);
      expect(temp.get_exp()).to.equal(4);
      expect(temp.get_tipo()).to.equal("F");
    });

    it("Debería ser: -4.3e-2C", function() {
      var temp = new Temperatura(-4.3,-2,"C");
      expect(temp.get_valor()).to.equal(-4.3);
      expect(temp.get_exp()).to.equal(-2);
      expect(temp.get_tipo()).to.equal("C");
    });

    it("Debería ser: 3.2e4F", function() {
      var temp = new Temperatura(0,0,"C");
      temp.set_valor(3.2);
      temp.set_exp(4);
      temp.set_tipo("F");
      expect(temp.get_valor()).to.equal(3.2);
      expect(temp.get_exp()).to.equal(4);
      expect(temp.get_tipo()).to.equal("F");
    });

    it("3.2e-2 === 0.032", function() {
      var temp = new Temperatura(3.2,-2,"C");
      temp.set_valor(parseFloat(temp.get_valor()));
      temp.calculo_numero();
      expect(temp.get_valor()).to.equal(0.032);
    });

    it("3.2e2 === 320", function() {
      var temp = new Temperatura(3.2,2,"C");
      temp.set_valor(parseFloat(temp.get_valor()));
      temp.calculo_numero();
      expect(temp.get_valor()).to.equal(320);
    });

    it("0.032C === 32.0576F", function() {
      var temp = new Temperatura();
      temp.set_valor(0.032);
      temp.set_exp(0);
      temp.set_tipo("C");
      var res = temp.to_f();
      expect(res).to.equal(32.0576);
    });

    it("32,0576F === 0.032C", function() {
      var temp = new Temperatura();
      temp.set_valor(32.0576);
      temp.set_exp(0);
      temp.set_tipo("F");
      var res = temp.to_c();
      expect(res).to.equal(0.032000000000000424);
    });

    it("mostrar_final()", function() {
      window.onload = function() {
        var temp = new Temperatura(5,0,"F");
        temp.mostrar_final();
        expect(fin.innerHTML).to.equal("El resultado es: 5 F");
      }
    });

    it("5X === ERROR", function() {
      window.onload = function() {
        var temp = new Temperatura(5,0,"X");
        conversor();
        expect(fin.innerHTML).to.match("/no es correcto/");
      }
    });

    it("32,0576F === 0.032C", function() {
      window.onload = function() {
        var temp = new Temperatura(-2.3,0,"C");
        var res = "El resultado es: " + temp.get_valor() + " " + temp.get_tipo();
        document.getElementById("resultado").innerHTML = res;
        expect(fin.innerHTML).to.equal("El resultado es: -2.3 C");
      }
    });
});
