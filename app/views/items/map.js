function(doc) {
  if( doc.type == "item" && doc.title ){
    emit(doc._id, doc);
  }
};