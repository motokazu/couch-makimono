// common library for Makimono

function basename(path){
	return path.replace(/.*\/|\.[^.]*$/g, '');
}

// split escape charactor from string
function splitforid(str){
	return str.split('/').join('').split('.').join('').split('?').join('').replace(/ /g,'');
}
