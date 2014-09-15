Answers = new Meteor.Collection('answers');

Template.answer.answer = function(answerAttributes) {
		var user=Meteor.user();
		if(!user)
			throw new Meteor.Error(401, "You must be logged in to answer a question");
		/*if(!answerAttributes.body)
			throw new Meteor.Error(422, "Your answer body seems to be empty");*/

		var answer = _.extend(_.pick(answerAttributes, 'body', 'picture', 'questionId'),{
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
			answerScore: 0,
			voters: [],
			commentCount: 0
		});

		var answerId = Answers.insert(answer);
		createWatcherNotification(answer);
		return answerId;
	};

Answers.allow({
	insert: function(userId, doc) {
		return !! userId;
	},
	update: ownsDocument,
	remove: ownsDocument
});