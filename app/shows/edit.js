function(doc, req) {
	
	function splitforid(str){
		return str.split('/').join('').split('.').join('').replace(/ /g,'');
	}
	
  var ddoc = this,
    mustache = require("vendor/couchapp/lib/mustache"),
    data = {
      ddoc : JSON.stringify(require("vendor/couchapp/lib/code").ddoc(ddoc), function(key, value) {
        return (key == "parent") ? undefined : value;
      }),
      id : req.id,
      projectcode : req.query.pcode,
      title : req.query.title,
      id_pcode : splitforid(req.query.pcode), //remove slash
      id_title : splitforid(req.query.title)  //remove slash
    };
  return mustache.to_html(ddoc.templates.edit, data, ddoc.templates.partials);
}