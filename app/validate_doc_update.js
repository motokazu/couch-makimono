function (newDoc, oldDoc, userCtx, secObj) {
	var v = require("vendor/couchapp/lib/validate").init(newDoc, oldDoc, userCtx, secObj);
  
	if (!userCtx.name) {
		// this could be configurable based on secObj
		v.unauthorized("please login to make changes");
	}
	
	// item document. this document includes ReST source.
	if (newDoc.type=="item") {
		v.require("title");
		
		// doc._id syntax check , extension "rst" is not allowed.
		v.matches("_id", /^(\/?\w+)(\/\w+)*$/, "Invalid source path ("+newDoc._id+"). example, it's not allowed to use '.xxx' extension and space.");
	} else if (newDoc.type=="project") { // project document
		v.require("name");
	}
	
	return true;
}
