function() {
	var form = $(this);
	var app = $$(form).app;
	var fdoc = form.serializeObject();
	
	// commit new document
	var doc = {};
	doc.title = fdoc.title;
	doc.type = "item";
	doc.ctype = "text";
	doc.projectcode = projectcode;
	doc.created_at = new Date();
	doc.edit_by = $$("#profile").profile || {};
	doc._id = projectcode + "-" + fdoc.title;

	$$(this).app.db.saveDoc(doc, {
		success : function() {
			form.trigger('inproject');	
		}
	});
	
	return false;
}
