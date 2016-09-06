//设置全局变量
var globalparam={
		selectTreeNode:'',//树节点选择变量
}
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
	//设置bootstrap弹出框属性--树菜单选择弹出框
	$('#selectTreeMenuDIv').modal({
		backdrop:'static',
		show:false		
	});
	queryMenu();
	selectMenuIcoFunc();
});
//查询菜单标签
function queryMenu(){
	var obj={};
	var url="/springmvc/authority/menu/queryList";
	simplePostAjax(obj, url, queryMenuSucc);
}
//查询菜单成功回调函数
function queryMenuSucc(data){
	if(isEmpty(data)){
		alertMsg("未查到任何系统的菜单信息",{okBtn:true});
		return;
	}
	var str="";
	for(var item in data){
		setting.callback={
			onClick:clickTreeMenu,//选择树点击函数
			onDblClick: dbClickTreeMenu//双击树节点选择菜单
		};
		$.fn.zTree.init($("#menuTree"), setting, data[item].childMenu);
		setting.callback={
			onClick:clickSelectTreeMenu,//选择树点击函数
			onDblClick: dbClickSelectTreeMenu//双击树节点选择菜单
		};
		$.fn.zTree.init($("#parentMenuTree"), setting, data[item].childMenu);
		str+='<option value="'+item+'">'+item+'</option>';
	}
	$("#ownSystemSelectDiv").html(str);
}
//单机树节点
function clickSelectTreeMenu(event, treeId, treeNode) {
	globalparam.selectTreeNode=treeNode;
};
//双击树节点
function dbClickSelectTreeMenu(event, treeId, treeNode) {
	//显示选择的父节点信息并关闭弹出框
	if(isEmpty(treeNode)){
		//表明双击树节点的其他地方了
		return;
	}
	selectParentMenu(treeNode);
};
//点击选择父菜单确认按钮
function selectOkBtn(){
	//显示选择的父节点信息并关闭弹出框
	if(isEmpty(globalparam.selectTreeNode)){
		alertMsg("请选择父菜单",{okBtn:true});
		return;
	}
	selectParentMenu(globalparam.selectTreeNode);
	globalparam.selectTreeNode="";//初始化选择的父节点信息
}
//显示选择的父节点信息
function selectParentMenu(treeNode){
	//显示选择的父节点信息
    $("#parentMenuDiv").val(treeNode.menuName);
    //设置选择的父节点id
    $("#parentMenuDiv").attr('parentId',treeNode.id);
    $("#parentMenuDiv").attr('tId',treeNode.tId);
    //关闭菜单选择弹出框
    $('#selectTreeMenuDIv').modal('hide');
}
//取消选择的父节点信息
function clearSelectparentMenu(){
	$("#parentMenuDiv").val("");
    //设置选择的父节点id
    $("#parentMenuDiv").removeAttr('parentId');
    $("#parentMenuDiv").removeAttr('tId');
}
//当选择父节点弹出时初始化选择的信息
$('#selectTreeMenuDIv').on('show.bs.modal', function (e) {
	var tId= $("#parentMenuDiv").attr('tId');
	var treeObj = $.fn.zTree.getZTreeObj("parentMenuTree");
	if(!isEmpty(tId)){
		var node = treeObj.getNodeByTId(tId);
		globalparam.selectTreeNode=node;
		treeObj.selectNode(node);
	}else{
		//不选择任何节点
		treeObj.selectNode("null");
	}
});

//表格数据填写reset方法
function formReset(){
	$("#parentMenuDiv").removeAttr('parentId');
    $("#parentMenuDiv").removeAttr('tId');
}
//点击选中的菜单进行查看
function clickTreeMenu(event, treeId, treeNode){
	//显示节点信息
	showMenuInfo(treeNode);
	//单击所有元素只能查看，不能修改
	$("form").find("input").attr("disabled","disabled");
	$("form").find("select").attr("disabled","disabled");
	$("#clearParentMenuBtn").addClass("hide");
	$(".glyphicon-search").addClass("hide");
	$("#saveBtn").addClass("hide");
	$("#resetBtn").addClass("hide");
	$("#updateBtn").removeClass("hide");
	$("#createBtn").removeClass("hide");
}
//双击选择的菜单进行修改
function dbClickTreeMenu(event, treeId, treeNode){
	showMenuInfo(treeNode);
	setUpdatestate();
}
//点击新增按钮
function createBtnFunc(){
	$("form").find("input").removeAttr("disabled");
	$("form").find("select").removeAttr("disabled");
	$("#saveBtn").removeClass("hide");
	$("#saveBtn").html("保存");
	$("#resetBtn").removeClass("hide");
	$("#updateBtn").addClass("hide");
	$("#createBtn").addClass("hide");
	$("#menuNameDiv").removeAttr('menuId');
}
//点击更新按钮
function updateBtnFunc(){
	setUpdatestate();
}
//修改状态设置
function setUpdatestate(){
	$("form").find("input").removeAttr("disabled");
	$("form").find("select").removeAttr("disabled");
	$("#clearParentMenuBtn").removeClass("hide");
	$(".glyphicon-search").removeClass("hide");
	$("#saveBtn").removeClass("hide");
	$("#saveBtn").html("保存修改");
	$("#resetBtn").addClass("hide");
	$("#updateBtn").addClass("hide");
	$("#createBtn").removeClass("hide");
}
//显示菜单信息
function showMenuInfo(treeNode){
	var parentNode=treeNode.getParentNode();
	//菜单的id信息
	$("#menuNameDiv").attr('menuId',treeNode.id);
	//菜单所属系统
	$("#ownSystemSelectDiv").val(treeNode.ownSystem);
	//菜单名称
	$("#menuNameDiv").val(treeNode.menuName);
	//菜单状态
	$("#menuStsSelectDiv").val(treeNode.sts);
	//菜单类型
	$("#menuTypeSelectDiv").val(treeNode.menuType);
	//菜单URl
	$("#menuUrlDiv").val(treeNode.menuUrl);
	//菜单排序
	$("#menuOrderDiv").val(treeNode.menuOrder);
	if(!isEmpty(parentNode)){
		//菜单的父菜单信息
		$("#parentMenuDiv").val(parentNode.menuName);
	    //设置选择的父节点id
	    $("#parentMenuDiv").attr('parentId',parentNode.id);
	    $("#parentMenuDiv").attr('tId',parentNode.tId);
	}
	//菜单图标类型
	$("#menuIcoTypeSelectDiv").val(treeNode.icoType);
	//菜单图标类或路径
	$("#menuIcoMsgDiv").val(treeNode.icoMsg);
	//述信息
	$("#menuDescDiv").val(treeNode.menuDesc);
	selectMenuIcoFunc();
}

function savaOrUpdateMenu(){
	if($("form").valid(this,"error!")==false){
		return;
	}
	var obj={};
	var url="/springmvc/authority/menu/queryList";
	simplePostAjax(obj, url, queryMenuSucc);

}

//设置图标描述信息可编辑状态，若无图标信息则菜单图标路径不可编辑，否则可编辑
function selectMenuIcoFunc(){
	if($("#menuIcoTypeSelectDiv").val()=="9"){
		$("#menuIcoMsgDiv").attr("readonly","readonly");
		$("#menuIcoMsgDiv").removeAttr("check-type");
		$("#menuIcoMsgDiv").removeAttr("required-message");
	}else{
		$("#menuIcoMsgDiv").removeAttr("readonly");
		$("#menuIcoMsgDiv").attr("check-type","required");
		$("#menuIcoMsgDiv").attr("required-message","菜单图标类或路径");
	}
}