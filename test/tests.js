var expect = chai.expect;

describe("Temperatura", function() {
  describe("Constructor", function() {
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
  });
});
