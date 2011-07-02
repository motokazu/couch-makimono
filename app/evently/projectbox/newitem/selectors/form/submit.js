function() {
	var form = $(this);
	var app = $$(form).app;
	var fdoc = form.serializeObject();
	
	// commit new document
	var doc = {};
	doc.title = fdoc.title;
	doc.type = "item";
	doc.ctype = "text";
	doc.created_at = new Date();
	doc.edit_by = $$("#profile").profile || {};
	doc._id = $$("#itembox").noweditpath + fdoc.title;

	$$(this).app.db.saveDoc(doc, {
		success : function() {
			form.trigger('navimessage', 'create successfully. access to <a href="#item"><i>' + fdoc.title + '</i></a>');
			form.trigger('inproject');	
		}
	});
	
	return false;
}
