function(view) {
	return {
    	title : view.rows[0].value.title,
    	textdata : view.rows[0].value.editable,
		at : view.rows[0].value.created_at,
		by : view.rows[0].value.edit_by[0] || "somebody",
		rev : view.rows[0].value._rev
	}
};
