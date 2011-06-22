function(doc) {
  if( doc.type == "project" && doc.created_at ){
    emit(null, doc);
  }
};