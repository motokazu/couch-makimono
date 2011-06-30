function() {
  var title = $$(this).title;
  var pcode = projectcode;

  return {
    view : "items",
    key : [pcode, title],
  };
};
