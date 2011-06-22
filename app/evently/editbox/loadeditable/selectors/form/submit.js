function() {
  var form = $(this);
  var app = $$(form).app;
  var fdoc = form.serializeObject();
  fdoc.type = "item";
  fdoc.ctype = "rest";
  if (fdoc.created_at == "" ){
	fdoc.created_at = new Date();
  }
  fdoc.projectcode = projectcode;
  fdoc.edit_by = $$("#profile").profile || {};
  fdoc._id = fdoc.projectcode + "-" + fdoc.title;
  $$(this).app.db.saveDoc(fdoc, {
    success : function() {
      //form[0].reset();
	  alert('update successfully.')
	  form.trigger('loadeditable');
    }
  });
  return false;
};
