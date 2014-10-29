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

Template.answer.events({
  'click [name="answerMarker"]': function(e,instance) {
    console.log(e,instance);
    e.preventDefault();
    $(instance.find('[name="answerComments"]')).toggleClass('hidden');
    $(instance.find('[name="answer"]')).toggleClass('col-sm-8');
    $(instance.find('[name="answer"]')).toggleClass('col-sm-12');
  }
});