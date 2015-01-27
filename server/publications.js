//Questions
Meteor.publish('newQuestions', function(limit) {
  return Questions.find({$or: [{'hidden': {$exists: false}},{'hidden': false}]}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publish('questionsByVotes', function(limit) {
  return Questions.find({$or: [{'hidden': {$exists: false}},{'hidden': false}]}, {sort: {questionScore: -1, submitted: -1}, limit: limit});
});

Meteor.publish('questionsByTag', function(tags, limit) {
  return Questions.find({$or: [{'hidden': {$exists: false}},{'hidden': false}]},{ tags: {$in:tags}, limit: limit});
});

Meteor.publish('searchQuestions', function(searchtext, limit) {
  var re = new RegExp(searchtext,"i");
  return Questions.find({$and: [{$or: [{'title': re },{'body': re}]}, {$or: [{'hidden': {$exists: false}},{'hidden': false}]}] },{limit: limit});
});

Meteor.publish('singleQuestion', function(id) {
  return id && Questions.find(id);
});

Meteor.publish('fiveQuestions', function(username) {
  return Questions.find({ author: username});
});
Meteor.publish('upvotedQuestions', function(userId) {
  return Questions.find({ voters: {$in: [userId]} });
});
Meteor.publish('watchingQuestions', function(userId) {
  return Questions.find({ watchers: { $in: [userId]}});
});

//Answers
Meteor.publish('answersByQuestion', function(id) {
  return id && Answers.find({}, {questionId: id});
});

//Comments
Meteor.publish('commentsByQuestion', function(qId) {
  return Comments.find({}, {qId: qId});
});

//Notifications
Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

//Tags
Meteor.publish('tags', function() {
  return Tags.find();
});

//User
Meteor.publish('singleUser', function(username) {
  var user = Meteor.users.findOne({
    username: username
  });
  if(!user) {
    this.ready();
    return;
  }
  if(this.userId==user._id) {
    return Meteor.users.find(this.userId);
  } else {
    return Meteor.users.find(user._id, {
      fields: {
        "profile": 0
      }
    });
  }
});

Meteor.users.deny({update: function() { return true; }})