function(data) {
  	// $.log(data)
	
	// create paths from titles
	var _paths = [{"path":"/", "items":[]}];
	
	jQuery.each(data.rows, function(){
		var val = this.value;
		var _p = dirname(val._id);
		
		var isin = false;
		jQuery.each(_paths, function(){
			if(this.path == _p){
				isin = true;
				this.items.push({
					"title": val.title,
					"_id" : val._id,
					"_id_encoded" : encodeURIComponent(val._id)
				});
			}
		});
		if ( isin == false ){
			var d = {"path": _p, "items":[
				{
					"title": val.title,
					"_id" : val._id,
					"_id_encoded" : encodeURIComponent(val._id)
				}]
			};
			_paths.push(d);
		}
		
	});
	
	return {
    	titles : data.rows.map(function(r) {
			r.value._id_encoded = encodeURIComponent(r.value._id);
			return (r.value) || {};
		}),
		paths : _paths
 	}
};
