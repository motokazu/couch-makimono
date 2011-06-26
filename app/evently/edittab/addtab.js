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
		$$(this).title = newtitle;
		
		$$(this).tabbox = $("#edittabs");
		//$$(this).tabbox.tabs("add", "#tabs-" + $$(this).tabcounter , newtitle );
		//var pane = $("#tabs-"+$$(this).tabcounter);
		//pane.append("<p>good contents</p>");
		
		// urlencode
		//var _pcode = encodeURIComponent(projectcode);
		var _pcode = projectcode;
		//var _title = encodeURIComponent(newtitle);
		var _title = newtitle;
		
		$$(this).tabbox.tabs("add", "edit?pcode="+_pcode+"&title="+_title, newtitle, $$(this).tabcounter);
	
		$$(this).tabbox.tabs("select" , $$(this).tabcounter);
		$$(this).tabcounter ++;
	}
}
