function(doc, req) {
  var ddoc = this,
    mustache = require("vendor/couchapp/lib/mustache"),
    data = {
      ddoc : JSON.stringify(require("vendor/couchapp/lib/code").ddoc(ddoc), function(key, value) {
        return (key == "parent") ? undefined : value;
      }),
      id : req.query.id,
      site_title : ddoc.couchapp.name
    };

  return mustache.to_html(ddoc.templates.fude, data, ddoc.templates.partials);
}