function() {
  var form = $(this);
  var app = $$(form).app;
  var fdoc = form.serializeObject();
  
  if (fdoc.name == "" ){
	form.trigger('navimessage', 'project name is not allowed empty.');
	return false;
  }
  
  fdoc.type = "project";
  fdoc.edit_by = $$("#profile").profile || {};

  $$(this).app.db.saveDoc(fdoc, {
    success : function() {
	  form.trigger('navimessage', 'submit successfully. project name is ' + fdoc.name);
	  form.trigger('_init');
	}
  });

  return false;
};
