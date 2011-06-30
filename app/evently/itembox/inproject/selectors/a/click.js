function(){
	var href = $(this).attr('href');
	if ( "new" == href.slice(1)) {
		$(this).trigger('newdoc');
	} else {
		$(this).trigger('addtab', href );
	}
}
