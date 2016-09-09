$(document).ready(function(){
	$( "#queryForm").validate();
//	DivFormValidate("queryForm");
});

function savaOrUpdateMenu(){
	if(!$("#queryForm").valid()){
		return;
	}
	console.log(11);
}
