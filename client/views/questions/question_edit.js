var pad;

Template.questionEdit.rendered =function() {
	Deps.autorun(function() {
		if(pad) {
			pad.close();
		}
		var padId = Session.get('currentQuestion');
		pad = new Pad(padId, '#q-canvas');
		pad.drawImage(Questions.findOne(Session.get('currentQuestion')).picture);
	});

	if(!this.editor && $('#editor')) {
		this.editor = new EpicEditor(EpicEditorOptions).load();
		this.editor.importFile('editor', Questions.findOne(Session.get('currentQuestion')).body);
	}
};

Template.questionEdit.helpers({
	'question': function() {
		return Questions.findOne(Session.get('currentQuestion'));
	}
});

Template.questionEdit.events({
	'click #wipe-canvas':function(e) {
		e.preventDefault();
		pad.wipe(true);
	},
	'click #reset-canvas' : function(e) {
		e.preventDefault();
		pad.drawImage(Questions.findOne(Session.get('currentQuestion')).picture);
	},
	'submit form': function(e, instance) {
		e.preventDefault();

		var questionId = Session.get('currentQuestion');

		var questionProperties= {
			title: $(e.target).find('[name=title]').val(),
			body: instance.editor.exportFile(), //$(e.target).find('[name=body]').val(),
			picture: pad.toDataURL() //TODO imagen
		}

		Questions.update(questionId, {$set: questionProperties}, function(error) {
      if(error) {
        Meteor.Errors.throw(error.reason);
        if(error.error === 30)
          Meteor.Router.to('questionPage', error.details);
      } else {
        Meteor.Router.to('questionPage', questionId);
      }
    });
	}
});