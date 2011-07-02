function(e, pathto) {
	var _pathto = pathto.slice(1);
	function isintitle(ar, pathto){
		var isin = false;
		jQuery.each(ar, function(){
			if (this.pathto == pathto){
				isin = true;
				return false; // break
			}
		});
		return isin;
	}
	function getcountid(ar, pathto){
		var id = 0;
		jQuery.each(ar, function(){
			if (this.pathto == pathto){
				id = this.counter;
				return false; // break
			}
		});
		return id;
	}
	
	function basename(path){
		return path.replace(/.*\/|\.[^.]*$/g, '');
	}
	
	if ( isintitle($$(this).idxtabs, _pathto ) == false ) {
		$$(this).idxtabs.push({"pathto" : _pathto, "counter" : $$(this).tabcounter });		
		$$(this).title = basename(decodeURIComponent(_pathto));
		$$(this).tabbox = $("#edittabs");

		var _id = _pathto ; // pathto is encoded by encodeURIComponent(pathto);
		var _title = encodeURIComponent($$(this).title);
				
		$$(this).tabbox.tabs("add", "edit?id="+_id+"&title="+_title, $$(this).title, $$(this).tabcounter);
	
		$$(this).tabbox.tabs("select" , $$(this).tabcounter);

		$$(this).tabcounter ++;
	} else {
		var counter = getcountid($$(this).idxtabs, _pathto);
		$$(this).tabbox.tabs("select" , counter);
	}
}
