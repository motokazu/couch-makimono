function() {
<<<<<<< HEAD
	var title = $$(this).title;
	var _id = $$(this).pathto;
=======
  var title = $$(this).title;
  var pcode = $$(this).projectcode;

  projectcode = pcode;
>>>>>>> parent of b407b13... change the design from multi project in one database to single. and update UI.

	return {
    	view : "items",
    	key : _id,
	};
};
