Meteor.Router.add({
  '/': 'newQuestions',
  '/votes': 'questionsByVotes',
  '/tag/:_name': {
    as: 'questionsByTag',
    to: 'questionsByTag',
    and: function(tagName) {
      console.log("el nuevo tag es "+tagName);
      Session.set('currentTag',tagName);
    }
  },
  '/questionSubmit' : 'questionSubmit',
  '/question/:_id' : {
    to: 'questionPage',
    and: function(id) {
      Session.set('currentQuestion', id);
    }
  },
  '/question/:_id/edit': {
    to: 'questionEdit',
    and: function(id) {
      Session.set('currentQuestion', id);
    }
  },
  '/answer/:_id/edit': {
    as: 'answerEdit',
    to: 'answerEdit',
    and: function(id) {
      Session.set('currentAnswer', id);
    }
  },
  '/search/:_text': {
    as: 'questionsBySearch',
    to: 'questionsBySearch',
    and: function(searchText) {
      Session.set("searchText", searchText);
    }
  }
});

Meteor.Router.filters({
  'requireLogin': function(page) {
    if(Meteor.user())
      return page;
    else if (Meteor.loggingIn())
      return 'loading';
    else
      return 'accessDenied';
  },
  'clearErrors': function(page) {
    Meteor.Errors.clear();
    return page;
  }
});

Meteor.Router.filter('requireLogin', {only: 'postSubmit' });
Meteor.Router.filter('clearErrors');
