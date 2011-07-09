function(e){
	var form = $(this);
	var app = $$(form).app;
	var fdoc = form.serializeObject();

	e.preventDefault();
	var data = {};
	
	$(form.children(":file")).each(function(){
		data[this.name] = this.value;
	});

	if (!data._attachments || data._attachments.length == 0) {
		alert('Please select a file to upload.');
		return false;
	}
	
	$(this).ajaxSubmit({
		url: app.db.uri + fdoc._id,
		success: function(response){
			form.trigger('navimessage', 'file (' + basename(data._attachments) + ') uploaded successfully.');
			form.trigger('_init');
		}
	});
	
	return false;
};
