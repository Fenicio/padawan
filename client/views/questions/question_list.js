Template.newQuestions.helpers({
	options: function() {
		return {
			sort: {submitted: -1},
			_limit: 10,
			_where: {},
			handle: questionsHandle
		}
	}
});

Template.questionsBySearch.helpers({
	options: function() {
		var re = new RegExp(Session.get('searchText'),"i");
		return {
			sort: {submitted: -1},
			_limit: 10,
			_where: {$or: [{'title': re },{'body': re}]},
			handle: searchHandle
		}
	}
});

Template.questionsByTag.helpers({
	options: function() {
		return {
			sort: {submitted: -1},
			_limit: 10,
			_where: {tags: Session.get('currentTag')},
			handle: questionsByTagHandle
		}
	}
});

Template.questionsByVotes.helpers({
	options: function() {
		return {
			sort: {questionScore: -1, submitted: -1},
			_limit: 10,
			_where: {},
			handle: questionsByVotesHandle
		}
	}
});

Template.questionList.helpers({
	questions: function() {
		console.log(this._where);
		return Questions.find(this._where, {sort: this.sort, limit: this.handle._limit });
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