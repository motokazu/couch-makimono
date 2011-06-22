function(){
	var href = $(this).attr('href');
	if ( "backtoproject" == href.slice(1)) {
		$(this).trigger('_init');
		$("#editbox").trigger('_init');
		$("#indextab").trigger('_init');
	} else {
		$(this).trigger('readitem', href );
		$(this).trigger('addtab', href );		
	}
}
