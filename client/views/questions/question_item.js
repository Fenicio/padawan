Template.questionItem.helpers({
	'ownQuestion': function() {
		return this.userId === Meteor.userId();
	},
  'userIsAdmin': function() {
    return Meteor.user() && Meteor.user().username==="Guiom";
  },
  upvotedClass: function() {
  var userId = Meteor.userId();
    if(userId && !_.include(this.voters, userId)) {
      return "btn-primary upvotable";
    } else {
      return "disabled";
    }
  },
  downvotedClass: function() {
  var userId = Meteor.userId();
    if(userId && !_.include(this.voters, userId)) {
      return "btn-danger downvotable";
    } else {
      return "disabled";
    }
  },
  watchedClass: function() {
  var userId = Meteor.userId();
    if(userId && !_.include(this.watchers, userId)) {
      return "btn-primary watchable";
    } else {
      return "btn-danger unwatchable";
    }
  },
  tags: function() {
    var qId = this._id;
    return _.map(this.tags || [], function (tag) {
      return {qId: qId, tag: tag};
    });
  },
  adding_tag: function() {
    return Session.equals('editing_addtag', this._id);
  }
});

Template.questionItem.events({
	'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvoteQuestion', this._id);
  },
  'click .downvotable': function(e) {
    e.preventDefault();
    Meteor.call('downvoteQuestion', this._id);
  },
  'click .watchable': function(e) {
    e.preventDefault();
    Meteor.call('watchQuestion', this._id);
  },
  'click .unwatchable': function(e) {
    e.preventDefault();
    Meteor.call('unwatchQuestion', this._id);
  },
  'click .addtag': function (evt, tmpl) {
    Session.set('editing_addtag', this._id);
    Deps.flush(); // update DOM before focus
    tmpl.find("#edittag-input").focus();
    tmpl.find("#edittag-input").select();
  },
  'click .remove': function (evt) {
    var tag = this.tag;
    var id = this.qId;
    evt.target.parentNode.style.opacity = 0;
    // wait for CSS animation to finish
    Meteor.setTimeout(function () {
      Meteor.call('removeTag', tag, id, function(error) {
        if(error) {
          Meteor.Errors.throw(error.reason);
        }
      });
    }, 300);
  },
  'click #add-tag-btn': function(evt, tmpl) {
    evt.preventDefault();
    var tag = tmpl.find("#edittag-input").value;
    var id = this._id;
    Meteor.call('addTag', tag, id, function(error, id) {
      if(error) {
        throwError(error.reason);
      } else {
        Session.set('editing_addtag', null);
      }
    });
  },
  'click #cancel-tag-btn': function(evt) {
    evt.preventDefault();
    Session.set('editing_addtag', null);
  },
  'click .tag-name': function(evt, tmpl) {
    Router.go('questionsByTag', this.tag);
  },
  'click #hide': function(evt, tmpl) {
    evt.preventDefault();
    Meteor.call('hideQuestion', this._id);
  }
});

