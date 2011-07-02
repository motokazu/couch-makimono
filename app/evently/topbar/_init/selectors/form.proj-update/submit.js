function() {
	var form = $(this);
	var app = $$(form).app;
	var fdoc = form.serializeObject();

	if (fdoc.name == "" ){
		form.trigger('navimessage', 'project name is not allowed empty.');
		return false;
	}
	
	fdoc.type = "project";
	fdoc.updated_at = new Date();
	fdoc.edit_by = $$("#profile").profile || {};
	
	// get original _rev and update
	app.db.openDoc(fdoc._id, {
		success : function(doc) {
			fdoc._rev = doc._rev;
	        app.db.saveDoc(fdoc, {
				success:function(){
					form.trigger('navimessage', 'submit successfully. project name is ' + fdoc.name);
				}
			});
		}
	});
	
	return false;
};
