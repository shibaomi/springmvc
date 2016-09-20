//页面加载调用方法
$(document).ready(function(){
	//页面加载方法调用，查询数据字典信息
	queryList();
});
//查询数据字典信息
function queryList(){
	var formDatas=$("#queryForm").formDatas();
	var queryCondition={
			queryCondition:formDatas,
			autoload:true,
			url:'/springmvc/sys/dict/queryPageDictModel'
	};
	//分页查询
	$("#dictTableList").searchForTable(queryCondition);
}

function savaOrUpdateMenu(){
	if(!$("#queryForm").valid()){
		return;
	}
	console.log(11);
}

//
function test(){
//	$.loadProgressBar();
//	console.log(111);
	$.addimage();
}