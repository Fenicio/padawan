var pad;

Template.answerEdit.rendered =function() {
	Deps.autorun(function() {
		if(pad) {
			pad.close();
		}
		var padId = Session.get('currentAnswer');
		pad = new Pad(padId, '#a-canvas');
		pad.drawImage(Answers.findOne(Session.get('currentAnswer')).picture);

	});
	if(!this.editor && $('#editor')) {
		this.editor = new EpicEditor(EpicEditorOptions).load();
		this.editor.importFile('editor', Answers.findOne(Session.get('currentAnswer')).body);
	}
};

Template.answerEdit.helpers({
	'body': function() {
		return Answers.findOne(Session.get('currentAnswer')).body;
	}
});

Template.answerEdit.events({
	'click #wipe-answer':function(e) {
		e.preventDefault();
		pad.wipe(true);
	},
	'click #reset-canvas' : function(e) {
		e.preventDefault();
		pad.drawImage(Answers.findOne(Session.get('currentAnswer')).picture);
	},
	'click #load-question': function(e) {
		e.preventDefault();
		pad.drawImage(Questions.findOne(Session.get('currentQuestion')).picture);
	},
	'click #canvas-undo': function(e) {
		e.preventDefault();
		pad.undo();
	},
	'click #canvas-redo': function(e) {
		e.preventDefault();
		pad.redo();
	},
	'submit form': function(e, instance) {
		e.preventDefault();

		var answerId = Session.get('currentAnswer');
		var questionId = Session.get('currentQuestion');

		var answerProperties= {
			body: instance.editor.exportFile(), //$(e.target).find('[name=body]').val(),
			picture: pad.toDataURL() //TODO imagen
		}

		Answers.update(answerId, {$set: answerProperties}, function(error) {

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