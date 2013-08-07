var pad;

Template.questionSubmit.rendered =function() {
	Deps.autorun(function() {
		if(pad) {
			pad.close();
		}
		var padId = Session.get('currentQuestion');
		pad = new Pad(padId, '#q-canvas');
	});

	if(!this.editor && $('#editor'))
		this.editor = new EpicEditor(EpicEditorOptions).load();
};

Template.questionSubmit.events({
	'click #wipe-canvas':function(e) {
		e.preventDefault();
		pad.wipe(true);
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
		var question= {
			title: $(e.target).find('[name=title]').val(),
			body: instance.editor.exportFile(), //$(e.target).find('[name=body]').val(),
			picture: pad.toDataURL() //TODO imagen
		}

		Meteor.call('question', question, function(error, id) {
      if(error) {
        Meteor.Errors.throw(error.reason);
        if(error.error === 30)
          Meteor.Router.to('questionPage', error.details);
      } else {
        Meteor.Router.to('questionPage', id);
      }
    });
	}
});

