function(e, title) {
	var newtitle = title.slice(1);
	function isintitle(ar, title){
		var isin = false;
		jQuery.each(ar, function(){
			if (this.title == title){
				isin = true;
				return false; // break
			}
		});
		return isin;
	}

	if ( isintitle($$(this).idxtabs, newtitle ) == false ) {
		$$(this).idxtabs.push({"title" : newtitle});		
	}
    $(this).trigger('titletab');
}
