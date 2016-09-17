//全局变量
var globalParam={
		menuData:""//菜单信息
};
//初始加载
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
	if(isEmpty(data)){
		alertMsg("未查到任何系统的菜单信息",{okBtn:true});
		return;
	}
	for(var item in data){
		globalParam.menuData=data[item].childMenu;
		topMenuShow(globalParam.menuData);
	}
}

//根据顶部菜单列表拼接显示顶部菜单
function topMenuShow(data){
	var str="";
	if(!isEmpty(data)&&data.length>0){
		for(var i=0;i<data.length;i++){
			var classStr=' class="header-nav-left '
			if(i==0){
				classStr+=' header-nav-active';
				//显示第一个菜单的子菜单信息
				leftMenuShow(data[i].childMenu);
				//若菜单有连接就打开
				if(!isEmpty(data[i].menuUrl)){
					$('#ifra').attr({'src':data[i].menuUrl});
				}
			}
			str+='<li onclick="clickTopMenu('+i+',this)" '+classStr+'"  ><a class="a-height-color">'+data[i].menuName+'</a></li>';
		}
	}
	$("#topMenuDiv").html(str);
}

//点击顶部菜单
function clickTopMenu(index,target){
	//获取顶部菜单对应的子菜单
	var data=globalParam.menuData[index];
	//显示左边菜单信息
	leftMenuShow(data.childMenu);
	//若菜单有连接就打开
	if(!isEmpty(data.menuUrl)){
		$('#ifra').attr({'src':data.menuUrl});
	}
	$("#topMenuDiv").find("li").removeClass("header-nav-active");//删除所有标识active的css类
	$(target).toggleClass("header-nav-active");
}

//显示左部菜单
function leftMenuShow(data){
	var str='<ul id="main-nav" class="nav nav-tabs nav-stacked">';
	if(!isEmpty(data)&&data.length>0){
		for(var i=0;i<data.length;i++){
			var activeFlag=false;
			if(i==0){
				activeFlag=true;
			}
			str+=menuAppend(data[i],activeFlag);
		}
	}
	str+='</ul>';
	$("#leftMenuDiv").html(str);
}

//循环拼接左部菜单列表信息
function menuAppend(data,activeFlag){
	var htmlStr = '<li>';
	htmlStr     +=	'<a  id="'+data.id+'" '+addMenuStyClz(data,activeFlag)+' onclick="clickMenuClick(this,\''+data.menuUrl+'\',\''+data.menuLevel+'\')">';
	htmlStr     +=		icoAppend(data);//菜单图标或图片
	htmlStr     +=		data.menuName;//菜单名称
	htmlStr     +=		downIco(data);//下拉按钮
	htmlStr     +=	'</a>';
	htmlStr     +=	downMenuAppend(data);//下拉菜单拼接
	htmlStr     +='</li>';
	return htmlStr;
}
//拼接下拉菜单
function downMenuAppend(data){
	if(isEmpty(data.childMenu)||data.childMenu.length<1){
		return "";
	}
	var str='<ul id="'+data.id+'Child" class="nav nav-list collapse ">';
	for(var i=0;i<data.childMenu.length;i++){
		str+=menuAppend(data.childMenu[i]);
	}
	return str+"</ul>";
}

//添加菜单样式，包括是否关联下拉菜单
function addMenuStyClz(data,activeFlag){
	var clz="";
	if(data.menuLevel=="1"){
		clz='meun1-border ';
		if(activeFlag){
			clz+="menu-active";
		}
	}else if(data.menuLevel=="2"){
		clz='meun2-border';
	}
	if(isEmpty(data.childMenu)||data.childMenu.length<1){
		return ' class="'+clz+'" ';
	}else{
		return ' class="nav-header collapsed '+clz+' " data-toggle="collapse"  data-target="#'+data.id+'Child" data-parent="#main-nav"';
	}
}
//判断是否有下拉图片
function downIco(data){
	if(isEmpty(data.childMenu)||data.childMenu.length<1){
		return "";
	}else{
		return '<span class="pull-right glyphicon glyphicon-chevron-right"></span>';
	}
}

//菜单图标拼接
function icoAppend(data){
	if(isEmpty(data)||isEmpty(data.icoType)||data.icoType=="9"){
		return "";
	}else{
		if(data.icoType=="1"){
			return '<i class="glyphicon '+data.icoMsg+'"></i>';
		}else if(data.icoType=="0"){
			return '<img/>';
		}else{
			console.log("icoType error");
			return '';
		}
	}
}

//菜单点击事件
function clickMenuClick(menuDiv,url,level){
	//根据展开菜单变化向上向下按钮
	$(menuDiv).find("span").toggleClass("glyphicon-chevron-down");//toggleClass，如果存在就删除，不存在添加
	$(menuDiv).find("span").toggleClass("glyphicon-chevron-right");
	$("#leftMenuDiv").find("li").find("a").removeClass("menu-active");//删除所有标识active的css类
	$(menuDiv).toggleClass("menu-active");
	if(!isEmpty(url)){
		$('#ifra').attr({'src':url});
	}
}
