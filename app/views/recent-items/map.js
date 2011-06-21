function(doc) {
  if (doc.created_at && doc.type == "item" ) {
    emit(doc.created_at, doc);
  }
};