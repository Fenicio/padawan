Template.answer.helpers({
	'ownAnswer': function() {
		return this.userId === Meteor.userId();
	}
});