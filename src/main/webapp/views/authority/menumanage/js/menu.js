//设置全局变量
var globalparam={
		selectTreeNode:'',//树节点选择变量
}
$(document).ready(function(){
	$("form").validation({icon:true});	   
	queryMenu();
	//设置bootstrap弹出框属性--树菜单选择弹出框
	$('#selectTreeMenuDIv').modal({
		backdrop:'static',
		show:false		
	})
});
//查询菜单标签
function queryMenu(){
	var obj={};
	var url="/springmvc/authority/menu/queryList";
	simplePostAjax(obj, url, queryMenuSucc);
}
//查询菜单成功回调函数
function queryMenuSucc(data){
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
	$.fn.zTree.init($("#menuTree"), setting, data.childMenu);
	setting.callback={
		onClick:clickTreeMenu,//选择树点击函数
		onDblClick: dbClickTreeMenu//双击树节点选择菜单
	};
	$.fn.zTree.init($("#menuTree1"), setting, data.childMenu);
}
//单机树节点
function clickTreeMenu(event, treeId, treeNode) {
	globalparam.selectTreeNode=treeNode;
};
//双击树节点
function dbClickTreeMenu(event, treeId, treeNode) {
	//显示选择的父节点信息并关闭弹出框
	selectParentMenu(treeNode);
};
//
function selectOkBtn(){
	//显示选择的父节点信息并关闭弹出框
	if(isEmpty(globalparam.selectTreeNode)){
		alertMsg("请选择父菜单",{okBtn:true});
		return;
	}
	selectParentMenu(globalparam.selectTreeNode);
}

function selectParentMenu(treeNode){
	//显示选择的父节点信息
    $("#parentMenuDiv").val(treeNode.menuName);
    //设置选择的父节点id
    $("#parentMenuDiv").attr('parentId',treeNode.id);
    //关闭菜单选择弹出框
    $('#selectTreeMenuDIv').modal('hide');
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

function test(){
	alertMsg("12313",{
		okBtn:true,
		okFunc:savaOrUpdateMenu
	});
}
