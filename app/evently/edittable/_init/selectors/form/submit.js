function() {
	var form = $(this);
	var app = $$(form).app;
	var fdoc = form.serializeObject();
	
	fdoc.type = "item";
	if (fdoc.created_at == "" ){
		fdoc.created_at = new Date();
	}

	fdoc.updated_at = new Date();
	fdoc.edit_by = $$("#profile").profile || {};
	
	$$(this).app.db.saveDoc(fdoc, {
		success : function() {
			form.trigger('navimessage', 'update successfully.');
			form.trigger('_init');
		}
	});

	return false;
};
