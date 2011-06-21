function() {
  var form = $(this);
  var app = $$(form).app;
  var fdoc = form.serializeObject();
  fdoc.created_at = new Date();
  fdoc.type = "item";
  fdoc.ctype = "rest";
  fdoc.projectcode = projectcode;
  fdoc.edit_by = $$("#profile").profile || {};
  fdoc._id = fdoc.projectcode + "-" + fdoc.title;
  $$(this).app.db.saveDoc(fdoc, {
    success : function() {
	  alert('save successfully.')
	  form.trigger('loadeditable');
    }
  });
  return false;
};
