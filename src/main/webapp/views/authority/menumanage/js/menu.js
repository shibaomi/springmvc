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
	$("form").validation({icon:true});	   
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

//点击保存或修改菜单按钮
function savaOrUpdateMenu(){
	if ($("form").valid(this,"error!")==false){
		console.log("1111");
	      return false;
	    }else{
			console.log("3333");
	    }
}
