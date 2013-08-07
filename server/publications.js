//Questions
Meteor.publish('newQuestions', function(limit) {
  return Questions.find({}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publish('questionsByVotes', function(limit) {
	return Questions.find({}, {sort: {questionScore: -1, submitted: -1}, limit: limit});
});

Meteor.publish('questionsByTag', function(tags, limit) {
  return Questions.find({},{ tags: {$in:tags}, limit: limit});
});

Meteor.publish('searchQuestions', function(searchtext, limit) {
	var re = new RegExp(searchtext,"i");
	return Questions.find({$or: [{'title': re },{'body': re}]},{limit: limit});
});

Meteor.publish('singleQuestion', function(id) {
  return id && Questions.find(id);
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