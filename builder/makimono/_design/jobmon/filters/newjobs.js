function(doc, req){
  log(doc);
  if( doc.type === 'job' && doc.status === 'pending' ){
    return true;
  }else{
    return false;
  }
}