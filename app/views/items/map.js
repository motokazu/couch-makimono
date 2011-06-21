function(doc) {
  if( doc.type == "item" && doc.projectcode && doc.title ){
    emit([doc.projectcode,doc.title], doc);
  }
};