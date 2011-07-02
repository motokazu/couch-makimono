<<<<<<< HEAD
function(){
	$$(this).noweditpath = "";
}
=======
function(data) {
  return {
    projects : data.rows.map(function(r) {
      return (r.value) || {};
    })
  }
};
>>>>>>> parent of b407b13... change the design from multi project in one database to single. and update UI.
