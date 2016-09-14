$(document).ready(function(){
//	$( "#queryForm").validate();
//	DivFormValidate("queryForm");
	$("#dictTableList").search({
		url:'/springmvc/sys/dict/queryPageDictModel',
		autoload:true,//初始化后进行数据加载
	});
});

function savaOrUpdateMenu(){
	if(!$("#queryForm").valid()){
		return;
	}
	console.log(11);
}

function test(){
	var d=$("#dictTableList").selectRecords();
	console.log(JSON.stringify(d));
}