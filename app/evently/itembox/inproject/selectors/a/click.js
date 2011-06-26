function(){
	var href = $(this).attr('href');
	if ( "backtotop" == href.slice(1)) {
		$(this).trigger('_init');
		$("#edittab").trigger('_init');
	} else {
		$(this).trigger('addtab', href );		
	}
}
