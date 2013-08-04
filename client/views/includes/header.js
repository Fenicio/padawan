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
	}
});