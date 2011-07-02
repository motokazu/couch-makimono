function(data) {
  	// $.log(data)
	
	return {
    	titles : data.rows.map(function(r) {
			r.value._id_encoded = encodeURIComponent(r.value._id);
			return (r.value) || {};
		})
 	}
};
