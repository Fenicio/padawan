Template.questionItem.helpers({
	'ownQuestion': function() {
		return this.userId === Meteor.userId();
	},
  upvotedClass: function() {
  var userId = Meteor.userId();
    if(userId && !_.include(this.upvoters, userId)) {
      return "btn-primary upvotable";
    } else {
      return "disabled";
    }
  },
  watchedClass: function() {
  var userId = Meteor.userId();
    if(userId && !_.include(this.watchers, userId)) {
      return "btn-primary watchable";
    } else {
      return "btn-danger unwatchable";
    }
  }
});

Template.questionItem.events({
	'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvoteQuestion', this._id);
  },
  'click .watchable': function(e) {
    e.preventDefault();
    Meteor.call('watchQuestion', this._id);
  },
  'click .unwatchable': function(e) {
    e.preventDefault();
    Meteor.call('unwatchQuestion', this._id);
  }
});