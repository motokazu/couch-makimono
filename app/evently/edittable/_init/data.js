function(view) {
	var attaches = [];

	if(view.rows[0].value._attachments){
		jQuery.each(view.rows[0].value._attachments, function(key,val){
			attaches.push({"name":key, "ctype":val.content_type});
		});
	}

	return {
		id : view.rows[0].value._id,
		rev : view.rows[0].value._rev,
    	title : view.rows[0].value.title,
    	sourcedata : view.rows[0].value.source,
		created_at : view.rows[0].value.created_at,
		updated_at : view.rows[0].value.updated_at,
		by : view.rows[0].value.edit_by.name || "somebody",
		path_id : splitforid(view.rows[0].value._id), // remove slash
		attachments : attaches
	}
};
