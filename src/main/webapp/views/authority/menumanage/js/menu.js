//树插件初始化
var setting = {
	data: {
		simpleData: {
			enable: true,
			id:"id",
			pIdKey:"parentId"
		},
		key:{
			children:"childMenu",
			name:"menuName"
		}
	}
};

$(document).ready(function(){
	queryMenu();
});
//查询菜单标签
function queryMenu(){
	var obj={};
	var url="/springmvc/authority/menu/queryList";
	simplePostAjax(obj, url, queryMenuSucc);
}
//查询菜单成功回调函数
function queryMenuSucc(data){
	$.fn.zTree.init($("#menuTree"), setting, data.childMenu);
}