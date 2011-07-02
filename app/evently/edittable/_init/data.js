function(view) {
	
	function splitforid(str){
		return str.split('/').join('').split('.').join('').replace(/ /g,'');
	}

	return {
		id : view.rows[0].value._id,
		rev : view.rows[0].value._rev,
    	title : view.rows[0].value.title,
    	sourcedata : view.rows[0].value.source,
		created_at : view.rows[0].value.created_at,
		updated_at : view.rows[0].value.updated_at,
		by : view.rows[0].value.edit_by.name || "somebody",
		path_id : splitforid(view.rows[0].value._id) // remove slash
	}
};
