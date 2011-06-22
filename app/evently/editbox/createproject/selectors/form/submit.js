function() {
  var form = $(this);
  var app = $$(form).app;
  var fdoc = form.serializeObject();
  fdoc.type = "project";
  fdoc.created_at = new Date();
  fdoc.edit_by = $$("#profile").profile || {};

  $$(this).app.db.saveDoc(fdoc, {
    success : function() {
      form[0].reset();
	  alert('submit successfully. project name is ' + fdoc.name);
	}
  });

  // commit first document
  var title = "FirstDocuemnt";
  projectcode = fdoc.name;
  var firstdoc = {};
  firstdoc.title = title;
  firstdoc.type = "item";
  firstdoc.ctype = "text";
  firstdoc.created_at = new Date();
  firstdoc.projectcode = projectcode;
  firstdoc.edit_by = $$("#profile").profile || {};
  firstdoc._id = projectcode + "-" + title;
  $$(this).app.db.saveDoc(firstdoc, {
    success : function() {
  	  form.title = title;
  	  $(this).trigger('inproject');
  	  form.trigger('loadeditable');
	}
  });

  return false;
};
