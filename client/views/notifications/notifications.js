Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false}); //
  },
  notificationsCount: function() {
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notification.events({
  'click a': function(e) {
  	e.preventDefault();
    Notifications.update(this._id, {$set: {read: true}});
    Meteor.Router.to('/question/'+this.questionId);
  }
});