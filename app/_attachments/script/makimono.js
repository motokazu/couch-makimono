/* global */
var makimono_job_database = "makimono-jobs";

$(function(){

});

function isintitle(ar, pathto){
	var isin = false;
	jQuery.each(ar, function(){
		if (this.pathto == pathto){
			isin = true;
			return false; // break
		}
	});
	return isin;
}

function getidx(ar, pathto){
	var idx = "";
	jQuery.each(ar, function(){
		if (this.pathto == pathto){
			idx = this.index;
			return false; // break
		}
	});
	return idx;
}

function basename(path){
	return path.replace(/\\/g,'/').replace(/.*\/|\.[^.]*$/g, '');
}
function dirname(path) {
	return path.replace(/\\/g,'/').replace(/[^\/]*$/, '');
}

function splitforid(str){
	return str.split('/').join('').split('.').join('').split('?').join('').replace(/ /g,'');
}
