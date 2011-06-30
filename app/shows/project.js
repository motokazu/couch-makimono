function(doc, req) {
  var ddoc = this,
    mustache = require("vendor/couchapp/lib/mustache"),
    data = {
      ddoc : JSON.stringify(require("vendor/couchapp/lib/code").ddoc(ddoc), function(key, value) {
        return (key == "parent") ? undefined : value;
      }),
      id : req.id,
      site_title : this.couchapp.name,
      fude : "/makimono/_design/app/_show/fude",
	  project: "/makimono/_design/app/_show/project"
    };

  return mustache.to_html(ddoc.templates.project, data, ddoc.templates.partials);
}