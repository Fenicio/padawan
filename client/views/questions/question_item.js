Template.questionItem.helpers({
	'ownQuestion': function() {
		return this.userId === Meteor.userId();
	}
});