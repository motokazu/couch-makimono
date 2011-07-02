function(data){
    $$(this).idxtabs = [{"title":"Welcome","counter":0}];
	$$(this).title = "";
	$$(this).tabbox = undefined;
	$$(this).tabcounter = 1;
	
	return {
		projectname : data.rows[0].value.name
	}
}