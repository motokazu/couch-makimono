function(doc, req){
  log(doc);
  if( doc.type === 'job' && doc.status === 'submitted' ){
    return true;
  }else{
    return false;
  }
}