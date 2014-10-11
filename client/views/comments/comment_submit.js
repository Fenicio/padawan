Template.commentSubmit.rendered = function() {
	this.answerId=this.data;
	if(this.find('#comment-form')) {
		$(this.find('#comment-form')).hide();
	}
};

Template.commentSubmit.events({
	'click [name="post"]': function(e, instance) {
		e.preventDefault();
		console.log(instance, instance.find('[name="comment-body"]'));

		var comment = {
			body: instance.find('[name="comment-body"]').value, //No es un campo de texto, es un campo de epiceditor
			qId: Session.get('currentQuestion'),
			aId: instance.answerId
		};

		Meteor.call('comment', comment, function(error, commentId) {
			if(error) {
				Meteor.Errors.throw(error.reason);
			} else {
				//instance.editor.importFile();
			}
			$(instance.find('#comment-form')).hide();
			$(instance.find('#comment-toggle')).show();
		});
	},
	'click #comment-toggle': function(e, instance) {
		e.preventDefault();
		$(instance.find('#comment-form')).show();
		$(instance.find('#comment-toggle')).hide();
	}
});