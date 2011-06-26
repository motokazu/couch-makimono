function() {
  var title = $$(this).title;
  var pcode = $$(this).projectcode;

  projectcode = pcode;

  return {
    view : "items",
    key : [pcode, title],
  };
};
