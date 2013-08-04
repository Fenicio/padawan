//Aqui van las subscripciones
questionsHandle = Meteor.subscribeWithPagination('newQuestions', 10);
searchHandle = Meteor.subscribeWithPagination('searchQuestions', Session.get("searchText"), 10);
questionsByVotesHandle = Meteor.subscribeWithPagination('questionsByVotes', 10);
questionsByTagHandle = Meteor.subscribeWithPagination('questionsByTag', Session.get("currentTag"), 10);

Deps.autorun(function() {
	Meteor.subscribe('singleQuestion', Session.get('currentQuestion'));
	Meteor.subscribe('answersByQuestion', Session.get('currentQuestion'));
	Meteor.subscribe('commentsByQuestion', Session.get('currentQuestion'));
});

Meteor.subscribe('notifications');