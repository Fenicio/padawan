Template.tagsDropdown.helpers({
	'tags': function() {
		return Tags.find({taggedItems: {$gt: 0}}, {limit: 6, order: {taggedItems: -1}});
	}
});