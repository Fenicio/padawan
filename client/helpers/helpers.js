UI.registerHelper('dateFormat',function(context, block){
	if(window.moment) {
		var f = block.hash.format || "MMM Do, YYYY";
		return moment(Date(context)).format(f);
	}else {
		return context;
	}
});