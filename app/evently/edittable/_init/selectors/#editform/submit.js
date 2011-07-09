function() {
	var form = $(this);
	var app = $$(form).app;
	var fdoc = form.serializeObject();
	
	app.db.openDoc(fdoc._id, {
		success : function(doc) {
			doc.updated_at = new Date();
			doc.edit_by = $$("#profile").profile || {};
			doc.title = fdoc.title;
			doc.source = fdoc.source;

			app.db.saveDoc(doc, {
				success : function() {
					form.trigger('navimessage', 'update successfully.');
					form.trigger('_init');
				}
			})
		}
	});

	return false;
};
