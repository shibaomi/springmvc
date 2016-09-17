$(document).ready(function(){
	queryList();
});
//查询数据字典信息
function queryList(){
	
//	$("#dictTableList").searchForTable({
//		url:'/springmvc/sys/dict/queryPageDictModel',
//		autoload:true,//初始化后进行数据加载
//	});
	
}

function savaOrUpdateMenu(){
	if(!$("#queryForm").valid()){
		return;
	}
	console.log(11);
}
