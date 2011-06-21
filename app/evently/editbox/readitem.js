function(e, title) {
    $$(this).title = title.slice(1);
	$(this).trigger('loadeditable');
}
