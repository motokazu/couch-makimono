function(e, pathto) {
	var _pathto = pathto.slice(1);
	$$(this).tabbox.tabs("remove" , getidx($$(this).idxtabs,_pathto));
	$$(this).idxtabs.splice(getidx($$(this).idxtabs,_pathto),1);
}
