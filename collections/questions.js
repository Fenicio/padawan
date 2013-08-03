Questions = new Meteor.Collection('questions');

Meteor.methods({
	'question': function(questionAttributes) {
		var user = Meteor.user();
		if(!user) 
			throw new Meteor.Error(401, "You need to be logged in to ask a question");
		if(!questionAttributes.title)
			throw new Meteor.Error(422, "Every question needs a title");
		if(!questionAttributes.body)
			throw new Meteor.Error(422, "Every question needs a body, please be descriptive");

		var question = _.extend(_.pick(questionAttributes, 'title', 'body', 'picture'),{
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
			questionScore: 0,
			tags: [],
			commentCount: 0,
			answersCount: 0,
			voters: [],
			watchers: [user._id]
		});

		var questionId = Questions.insert(question);

		return questionId;
	},
  upvoteQuestion: function(questionId) {
    var user = Meteor.user();
    
    if(!user)
      throw new Meteor.error(401, "You need to be logged in to vote");
    question = Questions.findOne(questionId);
    Questions.update({
      _id: question._id,
      upvoters: {$ne: user._id}
      }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes:1}
    });
  },
  watchQuestion: function(questionId) {
    var user = Meteor.user();
    
    if(!user)
      throw new Meteor.error(401, "You need to be logged in to watch a Question");
    question = Questions.findOne(questionId);
    Questions.update({
      _id: question._id,
      watchers: {$ne: user._id}
      }, {
      $addToSet: {watchers: user._id},
    });
  },
  unwatchQuestion: function(questionId) {
    var user = Meteor.user();
    
    if(!user)
      throw new Meteor.error(401, "You need to be logged in to watch a Question");
    question = Questions.findOne(questionId);
    Questions.update({
      _id: question._id,
      watchers: {$in: [user._id]}
      }, {
      $pull: {watchers: user._id},
    });
  }
});

Questions.allow({
  insert: function(userId, doc) {
    return !! userId;
  },
  update: ownsDocument,
  remove: ownsDocument
});
