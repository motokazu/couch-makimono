function() {
	var form = $(this);
	var app = $$(form).app;
	var fdoc = form.serializeObject();
	
	var created_at = new Date();
	
	var job = {
		"_id" : "job-publish-"+app.db.name,
		"type": "job",
		"command":"publish",
		"created_at": created_at,
		"updated_at": new Date(),
		"status":"submitted",
		"args":{
			"database": app.db.name
		}
	};
	
	var jobdb = $.couch.db(makimono_job_database);
	
	jobdb.openDoc(job._id, {
		success: function(oldjob, e){
			form.trigger('navimessage', 'already published. publish is submitted at '+oldjob.created_at );
		},
		error: function(){
			// submit new job
			jobdb.saveDoc(job, {
				success:function(){
					form.trigger('navimessage', 'submit successfully. job id is ' + job._id + ' , created at ' + created_at );
				}
			});
		}
	});

	return false;
}
