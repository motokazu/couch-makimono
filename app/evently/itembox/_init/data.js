function(data) {
  // $.log(data)
  return {
    titles : data.rows.map(function(r) {
      return (r.value) || {};
    })
  }
};
