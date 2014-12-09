Template.header.events({
	'submit form' : function(e, instance) {
		e.preventDefault();
		var searchtext = instance.find('#search-text').value;
		Router.go('questionsBySearch', searchtext);
	},
  'click #to_esp': function(e) {
    TAPi18n.setLanguage("es");
    accountsUIBootstrap3.setLanguage("es");
    e.preventDefault();
  },
  'click #to_eng': function(e) {
    TAPi18n.setLanguage("en");
    accountsUIBootstrap3.setLanguage("en");
    e.preventDefault();
  }
});

Template.header.helpers({
	'searchValue' : function() {
		return Session.get('searchText');
	},
	activeRouteClass: function() {
    var args = Array.prototype.slice.call(arguments,0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.name === name;
    });
    
    return active && 'active';
  }
});