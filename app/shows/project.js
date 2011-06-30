function(doc, req) {
  var ddoc = this,
    mustache = require("vendor/couchapp/lib/mustache"),
    data = {
      ddoc : JSON.stringify(require("vendor/couchapp/lib/code").ddoc(ddoc), function(key, value) {
        return (key == "parent") ? undefined : value;
      }),
      id : req.id,
      site_title : this.couchapp.name,
    };

  return mustache.to_html(ddoc.templates.project, data, ddoc.templates.partials);
}