function(data) {
	return {
		id   : data.rows[0].value._id,
		name : data.rows[0].value.name,
		by   : data.rows[0].value.edit_by[0] || "somebody",
		at   : data.rows[0].value.created_at,
		ver  : data.rows[0].value.sphinx_attr.version,
		author: data.rows[0].value.sphinx_attr.author,
		copy : data.rows[0].value.sphinx_attr.copyright
	}
};
