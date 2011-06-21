function(){
  $(this).trigger('readitem', $(this).attr('href'));
  $(this).trigger('addtab', $(this).attr('href'));
}
