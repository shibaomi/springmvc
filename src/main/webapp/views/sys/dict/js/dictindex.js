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

//删除数据字典
function deleteDict(){
	var selectRecords=$("#dictTableList").selectRecords();
	if(isEmpty(selectRecords)||selectRecords.length<1){
		alertMsg("请先选择要删除的数据字典");
		return;
	}
	simplePostAjax({id:selectRecords[0].id}, "/springmvc/sys/dict/deleteDictModel", deleteDictSucc);
}

function deleteDictSucc(){
	alertMsg("删除成功");
}
