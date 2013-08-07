Template.header.events({
	'submit form' : function(e, instance) {
		e.preventDefault();
		var searchtext = instance.find('#search-text').value;
		Meteor.Router.to('questionsBySearch', searchtext);
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
      return location.pathname === Meteor.Router[name + 'Path']();
    });
    
    return active && 'active';
  }
});