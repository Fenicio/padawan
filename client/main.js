//Aqui van las subscripciones
questionsHandle = Meteor.subscribeWithPagination('newQuestions', 10);

Deps.autorun(function() {
	Meteor.subscribe('singleQuestion', Session.get('currentQuestion'));
	Meteor.subscribe('answersByQuestion', Session.get('currentQuestion'));
	Meteor.subscribe('commentsByQuestion', Session.get('currentQuestion'));
});

Meteor.subscribe('notifications');