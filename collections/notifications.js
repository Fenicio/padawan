Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument
});
