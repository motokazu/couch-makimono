function(){
	var id = decodeURIComponent($(this).attr('href').slice(1));  // id was encoded.
	var app = $$(this).app;
	var form = $(this);
	
	var doc = {};
	
	app.db.openDoc(id, {
		success: function(doc, e){
			// delete target document
			app.db.removeDoc(doc, {
				success : function(response) {
					var undo = $("<a>").attr({
						"src":"#", "title":"Undo", "alt":"undo this action"
					}).html('<b>[Undo]</b>');
					
					undo.click(function(){
						var inform = $("#itembox");
						doc._rev = response.rev;
						app.db.saveDoc(doc, {
							success : function(){
								inform.trigger('navimessage', 'Cancel remove action. ' + id + ' was restored.');
								inform.trigger('inproject');
							}
						});
					});
					
					form.trigger('navimessage',  id + ' has been removed. ');
					form.trigger('inproject');
					form.trigger('deltab', form.attr('href'));
					
					undo.appendTo("#navimessage-p");
				},
				error : function(){
					form.trigger('navimessage', '[error] remove action failed.');
				}
			});
		},
		error: function(){
			form.trigger('navimessage', '[error] No target document in database.');
		}
	})
}
