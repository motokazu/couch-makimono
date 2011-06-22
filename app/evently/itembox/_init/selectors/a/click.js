function(){
	var pcode = $(this).attr('href').slice(1);
	if ( "NewProject" == pcode ) {
		$(this).trigger('createproject');
	} else {
		projectcode = pcode;
		$(this).trigger('inproject');	
	}
}
