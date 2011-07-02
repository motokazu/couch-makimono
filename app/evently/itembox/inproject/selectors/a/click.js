function(){
	var href = $(this).attr('href');
<<<<<<< HEAD
	$(this).trigger('addtab', href );
=======
	if ( "backtotop" == href.slice(1)) {
		$(this).trigger('_init');
		$("#edittab").trigger('_init');
	} else {
		$(this).trigger('addtab', href );		
	}
>>>>>>> parent of b407b13... change the design from multi project in one database to single. and update UI.
}
