function() {
	var form = $(this);
	var app = $$(form).app;
	var fdoc = form.serializeObject();

	if (fdoc.name == "" ){
		form.trigger('navimessage', 'project name is not allowed empty.');
		return false;
	}
	
	var updoc = {
		_id : fdoc._id,
		created_at : fdoc.created_at,
		updated_at : fdoc.updated_at,
		type : "project",
		name : fdoc.name,
		edit_by : $$("#profile").profile || {},
		sphinx_attr:{
			"author" : fdoc.author,
			"version": fdoc.version,
			"copyright": fdoc.copyright
		}
	};

	// get original _rev and update
	app.db.openDoc(updoc._id, {
		success : function(doc) {
			updoc._rev = doc._rev;
	        app.db.saveDoc(updoc, {
				success:function(){
					form.trigger('navimessage', 'submit successfully. project name is ' + updoc.name);
				}
			});
		}
	});
	
	return false;
};
