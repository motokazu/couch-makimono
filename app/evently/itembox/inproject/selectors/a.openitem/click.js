function(){
	var href = $(this).attr('href');
	$(this).trigger('addtab', href );
}
