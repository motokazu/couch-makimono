function couchapp_load(scripts) {
  for (var i=0; i < scripts.length; i++) {
    document.write('<script src="'+scripts[i]+'"><\/script>')
  };
};

var projectcode = "";

/* loads scripts */
couchapp_load([
	"/_utils/script/sha1.js",
	"/_utils/script/json2.js",
	"/_utils/script/jquery.js",
	"/_utils/script/jquery.couch.js",
	"../vendor/couchapp/jquery.couch.app.js",
	"../vendor/couchapp/jquery.couch.app.util.js",
	"../vendor/couchapp/jquery.mustache.js",
	"../vendor/couchapp/jquery.evently.js",
	"../markitup/jquery.markitup.js",
	"../markitup/sets/default/set.js"
]);