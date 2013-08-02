Template.newQuestions.helpers({
	options: function() {
		return {
			sort: {submitted: -1},
			_limit: 10,
			handle: questionsHandle
		}
	}
});

Template.questionList.helpers({
	questions: function() {
		return Questions.find({}, {sort: {submitted: -1}, limit: this.handle._limit });
	},
	questionsReady: function() {
		return ! this.handle.loading();
	}, 
	allQuestionsLoaded: function() {
		return ! this.handle.loading() &&
      Questions.find().count() < this.handle.loaded();
	}
});

Template.questionList.events({
  'click .load-more': function(e) {
    e.preventDefault();
    this.handle.loadNextPage();
  }
});