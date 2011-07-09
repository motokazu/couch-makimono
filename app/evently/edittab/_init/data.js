function(data){
    $$(this).idxtabs = [{"title":"Welcome","index":"welcome"}];
	$$(this).title = "";
	$$(this).tabbox = undefined;
	$$(this).tabcounter = 1;
	
	return {
		projectname : data.rows[0].value.name
	}
}