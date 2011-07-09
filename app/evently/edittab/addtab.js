function(e, pathto) {
	var _pathto = pathto.slice(1);

	if ( isintitle($$(this).idxtabs, _pathto ) == false ) {
		$$(this).idxtabs.push({"pathto" : _pathto, "index" : $$(this).tabcounter++ });
		$$(this).title = basename(decodeURIComponent(_pathto));
		$$(this).tabbox = $("#edittabs");

		var _id = _pathto ; // pathto is encoded by encodeURIComponent(pathto);
		var _title = encodeURIComponent($$(this).title);
		
		$$(this).tabbox.tabs("add", "edit?id="+_id+"&title="+_title, $$(this).title, getidx($$(this).idxtabs,_pathto));
		$$(this).tabbox.tabs("select" , getidx($$(this).idxtabs,_pathto) );
	} else {
		$$(this).tabbox.tabs("select" , getidx($$(this).idxtabs,_pathto));
	}
}
