function(data){
    $$(this).idxtabs = [{"title":"Welcome"}];
	$$(this).title = "";
	$$(this).tabbox = undefined;
	$$(this).tabcounter = 1;

	projectcode = data.rows[0].value.name;
	
	return {
		projectname : projectcode
	}
}