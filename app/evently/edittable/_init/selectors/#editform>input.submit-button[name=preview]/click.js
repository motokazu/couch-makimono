function(){
	var form = $(this).parent();
	var app = $$(form).app;
	var fdoc = form.serializeObject();
	
	// image url replace
	// .. image:: images/01-01.png to .. image:: ../../../images/01-01.png
	// .. figure:: *.png to .. figure:: ../../../*.png
	
	var previewsrc = fdoc.source.replace(/image:: (.*)/g,"image:: ../../../$1");
	var previewsrc = previewsrc.replace(/figure:: (.*)/g,"figure:: ../../../$1");

	var postdata = {"src": previewsrc };
	
	$.ajax({
		"type": "POST",
		"url": "/_rst2html/process/",
		"data": postdata,
		success: function(data){
			var win = window.open();
			win.document.open();
			win.document.writeln(data);
			win.document.close();
		},
		error:function(){
			
		}
	});
}