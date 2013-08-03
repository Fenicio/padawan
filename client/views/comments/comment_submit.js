Template.commentSubmit.rendered = function() {
	self=this;
	if(!this.editor && $('#comment-editor')) {
		var options = _.clone(EpicEditorOptions);
		options.container='comment-editor';
		options.container+=this.data;
		$('#comment-editor').attr('id', options.container);
		this.editor = new EpicEditor(options).load();
	}
	if(this.find('#comment-form')) {
		$(this.find('#comment-form')).hide();
	}
};

Template.commentSubmit.events({
	'submit form': function(e, instance) {
		e.preventDefault();
		var comment = {
			body: instance.editor.exportFile(),
			qId: Session.get('currentQuestion'),
			aId: Session.get('currentAnswer')
		};

		Meteor.call('comment', comment, function(error, commentId) {
			if(error) {
				Meteor.Errors.throw(error.reason);
			} else {
				instance.editor.importFile();
				$(instance.find('#comment-form')).hide();
				$(instance.find('#comment-toggle')).show();
			}
		});
	},
	'click #comment-toggle': function(e, instance) {
		e.preventDefault();
		$(instance.find('#comment-form')).show();
		$(instance.find('#comment-toggle')).hide();
	}
});