Template.questionPage.rendered=function() {
	Session.set("currentAnswer");
};

Template.questionPage.helpers({
	currentQuestion: function() {
		return Questions.findOne(Session.get("currentQuestion"));
	},
	answers: function() {
		return Answers.find({questionId: this._id});
	},
	comments: function() {
		return Comments.find({qId: this._id});
	},
	ownQuestion: function() {
		return this.userId === Meteor.userId();
	}
});