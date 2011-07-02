function() {
	var form = $(this);
	var app = $$(form).app;
	var fdoc = form.serializeObject();
	
	// commit new document
	var doc = {};
	doc.title = fdoc.title;
	doc.type = "item";
	doc.created_at = new Date();
	doc.updated_at = new Date();
	doc.edit_by = $$("#profile").profile || {};
	doc._id = fdoc.path + fdoc.title;

	$$(this).app.db.saveDoc(doc, {
		success : function() {
			form.trigger('navimessage', 'create successfully. ' + fdoc.path + fdoc.title);
			form.trigger('inproject');
		}
	});
	
	return false;
}
