function(e, message) {
	$$(this).message = message || {};
	$(this).trigger('inmessage');
}
