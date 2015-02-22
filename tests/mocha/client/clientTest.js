if(!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function() {
    describe("Debe guardar preguntas", function() {
      before(function(done) {
        var qu = {
          title: 'Titulo',
          body: 'Body',
          picture: ''
        };
        Meteor.call('question', qu, function(error, id) {
          if(!error) {
            Session.set("selectedQuestion", id);
            done();
          }
        });
      });

      it("selectedQuestion no deberia estar vacio", function() {
        chai.assert(Session.get("selectedQuestion")!==null);
      });

      it("Deberia aparecer en la base de datos", function() {
        var q2 = Questions.findOne();
        chai.assert.equals(q2.title==="Titulo");
      });
    });
  });
}