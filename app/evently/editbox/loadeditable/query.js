function() {
  var title = $$(this).title;
  var pcode = projectcode;
  return {
    view : "items",
    startkey : [pcode, title],
  };
};
