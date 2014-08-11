Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('notifications')];
  }
});

Router.map(function() {
  this.route('newQuestions', {path: '/'});
  this.route('questionsByVotes', {path: '/votes'});
  this.route('questionsByTag', {
    path: '/tag/:_name',
    data: function(tagName) {
      return Tags.findOne({name: this.params._name});
    }
  });
  this.route('questionSubmit', {
    path: '/questionSubmit', 
    progress: {enabled: false}
  });
  this.route('questionPage', {
    path: '/question/:_id', 
    waitOn: function() {
      return [
        Meteor.subscribe('singleQuestion', this.params._id),
        Meteor.subscribe('answersByQuestion', this.params._id)
      ];
    },
    data: function() {
      return Questions.findOne(this.params._id);
    }, 
    onBeforeAction: function() {
      Session.set('currentQuestion', this.params._id);
    }
  });
  this.route('questionEdit', {
    path: '/question/:_id/edit', 
    onBeforeAction: function(id) {
      Session.set('currentQuestion', this.params._id);
    }
  });
  this.route('answerEdit', 
    {
      path: '/answer/:_id/edit',  
      onBeforeAction: function(id) {
        Session.set('currentAnswer', this.params._id);
    }
  });
  this.route('questionsBySearch', {
    path: '/search/:_text', 
    onBeforeAction: function(searchText) {
      Session.set("searchText", this.params._text);
    }
  });
});

var requireLogin = function(page) {
  if(Meteor.user())
    return page;
  else if (Meteor.loggingIn())
    return this.loadingTemplate;
  else
    return 'accessDenied';
};

var clearErrors = function(page) {
  Errors.remove({seen: true});
  return page;
};

Router.onBeforeAction(requireLogin ,{only: [ 'postSubmit' ]});
Router.onBeforeAction(clearErrors);
Router.onBeforeAction('loading');