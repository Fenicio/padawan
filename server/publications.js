Meteor.publish('questionsByTag', function(tags, limit) {
  return Questions.find({},{ tags: {$in:tags}, limit: limit});
});

Meteor.publish('commentsByQuestion', function(qId) {
  return Comments.find({}, {qId: qId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('newQuestions', function(limit) {
  return Questions.find({}, {limit: limit});
});

Meteor.publish('singleQuestion', function(id) {
  return id && Questions.find(id);
});

Meteor.publish('answersByQuestion', function(id) {
	return id && Answers.find({}, {questionId: id});
});
