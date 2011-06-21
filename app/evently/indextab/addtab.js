function(e, title) {
	$$(this).idxtabs.push({"title" : title.slice(1)});
    $(this).trigger('titletab');
}
