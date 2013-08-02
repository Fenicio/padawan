var pad;

Template.answerSubmit.rendered =function() {
	Deps.autorun(function() {
		if(pad) {
			pad.close();
		}
		var padId = Session.get('questionId');
		pad = new Pad(padId, '#a-canvas');
	});

	if(!this.editor && $('#editor'))
		this.editor = new EpicEditor(EpicEditorOptions).load();
};

Template.answerSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		var answer = {
			body: $(e.target).find('[name=body]').val(),
			questionId: Session.get("currentQuestion"),
			picture: pad.toDataURL()
		};

		Meteor.call('answer', answer, function(error, answerId) {
			if(error) {
				Meteor.Errors.throw(error.reason);
			} else {
				$(e.target).find('[name=body]').val("");
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