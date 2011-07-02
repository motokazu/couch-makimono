function(doc) {
  if( doc.type == "item" && doc.title ){
    emit(null, doc);
  }
};