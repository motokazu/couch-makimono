function() {
	var form = $(this);
	var app = $$(form).app;
	var fdoc = form.serializeObject();
	
	var submitted_at = new Date();
	
	var job = {
		"_id" : "job-publish-"+app.db.name,
		"type": "job",
		"command":"publish",
		"submitted_at": submitted_at,
		"status":"submitted",
		"args":{
			"database": app.db.name
		}
	};

	var jobdb = $.couch.db(makimono_job_database);
	
	jobdb.openDoc(job._id, {
		success: function(oldjob, e){
			form.trigger('navimessage', 'already published. publish is submitted at '+oldjob.submitted_at );
		},
		error: function(){
			// submit new job
			jobdb.saveDoc(job, {
				success:function(){
					form.trigger('navimessage', 'submit successfully. job id is ' + job._id + ' , subbmited at ' + submitted_at );
				}
			});
		}
	});

	return false;
}
