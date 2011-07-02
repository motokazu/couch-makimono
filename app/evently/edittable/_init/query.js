function() {
	var title = $$(this).title;
	var _id = $$(this).pathto;

	return {
    	view : "items",
    	key : _id,
	};
};
