if(!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function() {
    describe("Server initialization", function() {
      it("No debe tener elementos en las bases de datos al iniciarse", function() {
        chai.assert(Questions.find().count()===0);
      })
    });
  });
}