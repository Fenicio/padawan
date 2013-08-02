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
			voters: []
		});

		var questionId = Questions.insert(question);

		return questionId;
	}
});

Questions.allow({
  insert: function(userId, doc) {
    return !! userId;
  },
  update: ownsDocument,
  remove: ownsDocument
});
