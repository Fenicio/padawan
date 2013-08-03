var pad;

Template.answerSubmit.rendered =function() {
	Deps.autorun(function() {
		if(pad) {
			pad.close();
		}
		var padId = Session.get('questionId');
		pad = new Pad(padId, '#a-canvas');
	});
	if(!this.editor && $('#answer-editor')) {
		var options = _.clone(EpicEditorOptions);
		options.container='answer-editor'+Session.get("currentQuestion");
		$('#answer-editor').attr('id', options.container);
		this.editor = new EpicEditor(options).load();
	}
};

Template.answerSubmit.events({
	'submit form': function(e, instance) {
		e.preventDefault();
		var answer = {
			body: instance.editor.exportFile(), //$(e.target).find('[name=body]').val(),
			questionId: Session.get("currentQuestion"),
			picture: pad.toDataURL()
		};

		Meteor.call('answer', answer, function(error, answerId) {
			if(error) {
				Meteor.Errors.throw(error.reason);
			} else {
				instance.editor.importFile();
				pad.wipe(true);
			}
		});
	},
	'click #wipe-answer': function(e) {
		e.preventDefault();
		pad.wipe(true);
	},
	'click #load-question': function(e) {
		e.preventDefault();
		pad.drawImage(Questions.findOne(Session.get("currentQuestion")).picture);
	}
});