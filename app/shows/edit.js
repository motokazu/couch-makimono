function(doc, req) {
	// !code lib/makimono.js
	
	var ddoc = this,
    	mustache = require("vendor/couchapp/lib/mustache"),
    	data = {
			ddoc : JSON.stringify(require("vendor/couchapp/lib/code").ddoc(ddoc), function(key, value) {
				return (key == "parent") ? undefined : value;
		}),
		id : req.query.id,
		title : req.query.title,
		path_id : splitforid(req.query.id), //remove slash
    };
	
	return mustache.to_html(ddoc.templates.edit, data, ddoc.templates.partials);
}