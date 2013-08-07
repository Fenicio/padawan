Comments = new Meteor.Collection('comments');

Meteor.methods({
	'comment': function(commentAttributes) {
		var user = Meteor.user();
		if(!user)
			throw new Meteor.Error(401, "You must be logged in to post a comment");
		if(!commentAttributes.body)
			throw new Meteor.Error(422, "A comment must have text to be posted");

		var comment = _.extend(_.pick(commentAttributes, 'body', 'qId', 'aId'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});
		var commentId = Comments.insert(comment);
		console.log("**Comentario**");
		console.log(comment);
		console.log(commentId);
		createCommentNotification(comment);
		return commentId;
	}
});

Comments.allow({
	insert: function(userId, doc) {
		return !! userId;
	},
	update: ownsDocument,
	remove: ownsDocument
});
