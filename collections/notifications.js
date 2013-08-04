Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument,
  insert: function() {
  	return true;
  }
});

/*
Cuando comentan tu pregunta o tu respuesta te tiene que llegar una notificacion
*/
createCommentNotification = function(comment) {
	var question = Questions.findOne(comment.qId);
	if(comment.userId !== question.userId) {
		var notification = {
			userId: question.userId,
			questionId: comment.qId,
			commenteName: comment.author,
			answered: false,
			read:false
		};
		if(comment.aId) {
			var answer = Answers.findOne(comment.aId);
			notification.userId=answer.userId;
		}
		Notifications.insert(notification);
	}
}
/*
	Cuando una pregunta que estas vigilando se ve respondida, debe avisar a sus vigilantes
*/
createWatcherNotification = function(answer) {
	var question = Questions.findOne(answer.questionId);
	_.each(question.watchers, function(watcher) {
		if(answer.userId !== watcher) {
			Notifications.insert({
				userId: watcher,
				questionId: answer.questionId,
				commenteName: answer.author,
				answered: true,
				read:false
			});
		}
	})
}