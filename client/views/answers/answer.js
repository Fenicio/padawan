Template.answer.helpers({
	'ownAnswer': function() {
		return this.userId === Meteor.userId();
	},
	'comments': function() {
		return Comments.find({aId: this._id});
	},
  'commentsLength' : function() {
    return Comments.find({aId: this._id}).count();
  }
});