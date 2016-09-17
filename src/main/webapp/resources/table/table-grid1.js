
(function($) {
	/**
	 * 通过Params发送请求
	 * @param params 格式："{url:url,currPage:1,pageSize:10,reqParams。。。。。}"
	 * url：请求路径，必传
	 * currPage：当前请求页，不传默认从1开始，不刷新页面的情况下为下一页的大小
	 * pageSize：每页请求数量，不传默认为10，只初始化一次，每次改变大小时请求从第一页进行请求
	 * reqParams：请求其余参数，不传则不设置查询条件，初始化一次，格式如传入id，则id:10,完整为"{url:url,currPage:1,pageSize:10,id:'10'}"
	 * @param successCallback:成功时候回调函数，
	 * @param failCallbac：失败时候回调函数
	 */
	$.fn.search = function(params,successCallback,failCallback) {
		var tableId = $(this).attr("id");
		//检查参数
		if(params){
			//currPage默认为1
			var currPage = params["currPage"];
			if(!currPage || currPage==null){
				params = $.extend(params, {currPage:1});
			}
			//pageSize默认为10
			var pageSize = params["pageSize"];
			if(!pageSize || pageSize==null){
				params = $.extend(params, {pageSize:10});
			}
			$(this).params(params);
		}
		
		/*var actionParamsStr = $("#"+tableId+"_hidden_span").html();
		var actionParams = eval("("+actionParamsStr+")");
		var action = actionParams["_action"];*/
		/*var paramsStr = "";
		for(var p in actionParams){
			if(p!='_action'){
				if(typeof(actionParams[p])=="string")
					paramsStr += p+":'"+actionParams[p]+"',";
				else
					paramsStr += p+":"+actionParams[p]+",";
			}
		}
		var params = {};
		if(paramsStr.length>0){
			paramsStr = "{"+paramsStr.substring(0,paramsStr.length-1)+"}";
			params = eval("("+paramsStr+")");
		}*/
		var autoload = params["autoload"];
		if(autoload==undefined || autoload){
			showProgressBar(tableId);
			
				Newtouch.Ajax.sendParams(params, action, function(data){
					
					
					setTimeout(function() {
					hideProgressBar(tableId);
					addJSONData(tableId, data);
					
					var message = $("div.message",$("#"+tableId));
					if(message){
						message.html("");
					}
					
					if(successCallback){
						if(typeof(successCallback)=="function"){
							successCallback(data);
						}
						if(typeof(successCallback)=="string"){
							eval(successCallback);
						}
					}
					
					},NewtouchContext.sleepTime);
				}, function(error){
					setTimeout(function() {
					hideProgressBar(tableId);
					
					var message = $("div.message",$("#"+tableId));
					if(message){
						message.html(error);
					}
					
					if(failCallback){
						if(typeof(failCallback)=="function"){
							failCallback(error);
						}
						if(typeof(failCallback)=="string"){
							eval(failCallback);	
						}
					}
					},NewtouchContext.sleepTime);}, false);
		}
	};
	
	//把参数放置到html里面进行拼接，目前应该用不到
	$.fn.params = function(params){
		var tableId = $(this).attr("id");
		//var actionParamsStr = $("#"+tableId+"_hidden_span").html();
		var actionParams = eval("("+actionParamsStr+")");
		if(params==undefined){
			return actionParams;
		}else{
			var actionParams = $.extend(actionParams, params);
			actionParamsStr = "";
			for(var p in actionParams){
				var s=actionParams[p]+"";
				 s=s.replace(/\\/g,"\\\\").replace(/'/g,"\\\'");
				 if(typeof(actionParams[p])=="string")
						actionParamsStr += p+":'"+s+"',";
					else 
						actionParamsStr += p+":"+s+",";
//				if(typeof(actionParams[p])=="string")
//					actionParamsStr += p+":'"+actionParams[p]+"',";
//				else 
//					actionParamsStr += p+":"+actionParams[p]+",";
			}
			if(actionParamsStr.length>0)
				actionParamsStr = "{"+actionParamsStr.substring(0,actionParamsStr.length-1)+"}";
				
			$("#"+tableId+"_hidden_span").html(actionParamsStr);
		}
	};
	
	$.fn.currentPage = function(){
		var tableId = $(this).attr("id");
		
		var actionParamsStr = $("#"+tableId+"_hidden_span").html();
		var actionParams = eval("("+actionParamsStr+")");
		
		return actionParams["currentPageIndex"];
	};
	
	$.fn.totalCount = function(){
		var tableId = $(this).attr("id");
		
		var span_totalCount = $("span.totalCount",$(this));
		var totalCount = $(span_totalCount).html();
		
		return totalCount;
	};
	
	$.fn.resetSelection = function(){
		var tableId = $(this).attr("id");
		
		$("input.grid_th_selector",$("#"+tableId)).attr("checked", false);
		$("input.grid_tr_selector",$("#"+tableId)).each(function(index,dom){
			$(dom).attr("checked", false);
		});
	};
	
	$.fn.record = function(rowId){
		var tableId = $(this).attr("id");
		var record = null;
		
		$("#"+tableId+" tbody tr:not(.grid_tr_templete)").each(function(index, dom){
			if(index==rowId){
				record = $.data(dom,"record");
			}
		});
		return record;
	};
	
	$.fn.selectedRecords = function(){
		var tableId = $(this).attr("id");
		var records = new Array();
		
		$("#"+tableId+" tbody tr:not(.grid_tr_templete)").each(function(index, dom){
			var input = $("input.grid_tr_selector", $(dom)).get(0);
			if(input){
				var value = $.data(dom,"record");
				var checked = $(input).attr("checked");
				if(checked && value!=null)
					records.push(value);
			}
		});
		
		return records;
	};
	
	$.fn.clearMessage = function(){
		var message = $("div.message",$("#"+tableId));
		if(message) message.html("");
	};
	
	
	$.fn.totalCount = function(){
		var tableId = $(this).attr("id");
		
		var span_totalCount = $("span.totalCount",$(this));
		var totalCount = $(span_totalCount).html();
		
		return totalCount;
	};
	
	$.fn.goShowProgressBar = function(){
		var tableId = $(this).attr("id");
		var loadingElement = document.getElementById(tableId+"_loading1");
		if(loadingElement==null){
			var loadingDivHtml = "<div id='"+tableId+"_loading1' class='gridloading'>";
			//slc2-29
//			loadingDivHtml += " 正在加载...";
			loadingDivHtml += " <div id='gridloadingImg' />"
			loadingDivHtml += "</div>";
			

			$("#"+tableId).before(loadingDivHtml);
		}
		$("#"+tableId+"_loading1").show();
		
	};
	
	
	$.fn.gohHideProgressBar=	 function(){
		var tableId = $(this).attr("id");
			var loadingElement = document.getElementById(tableId+"_loading1");
			if(loadingElement!=null){
				$(loadingElement).hide();
			}
		}
})(jQuery);

$(function() {
	$("table.gridtable").each(function(index, dom){
		$(dom).search();
		var tableId = $(dom).attr("id");
		pagebar(tableId);
	});
});

var addJSONData = function(tableId, data){
	var items = data.items;
	var currentPageIndex = parseInt(data.currentPageIndex);
	var lastPageIndex =  parseInt(data.lastPageIndex);
	var nextPageIndex =  parseInt(data.nextPageIndex);
	var pageSize =  parseInt(data.pageSize);
	var previousPageIndex =  parseInt(data.previousPageIndex);
	var totalCount =  parseInt(data.totalCount);
	var totalPage =  parseInt(data.totalPage);
	
	var span_totalCount = $("span.totalCount",$("#"+tableId));
	$(span_totalCount).html(totalCount);
	var span_currentPageIndex = $("span.currentPageIndex",$("#"+tableId));
	$(span_currentPageIndex).html(currentPageIndex);
	var span_totalPage = $("span.totalPage",$("#"+tableId));
	$(span_totalPage).html(totalPage);
	var input_currentPage = $("input.currentPage",$("#"+tableId));
	$(input_currentPage).val(currentPageIndex);
	var input_pageSize = $("input.pageSize",$("#"+tableId));
	$(input_pageSize).val(pageSize);
	
	var pagebar = $("div.pagebar",$("#"+tableId));
	if(pagebar){	
		if(currentPageIndex==1){
			$(".firstPage",pagebar).removeAttr("href");
			$(".previousPage",pagebar).removeAttr("href");
		}else{
			$(".firstPage",pagebar).attr("href","javascript:void(0)");
			$(".previousPage",pagebar).attr("href","javascript:void(0)");
		}
		if(currentPageIndex>=totalPage){
			$(".nextPage",pagebar).removeAttr("href");
			$(".lastPage",pagebar).removeAttr("href");
		}else{
			$(".nextPage",pagebar).attr("href","javascript:void(0)");
			$(".lastPage",pagebar).attr("href","javascript:void(0)");
		}
	}
	
	$("#"+tableId+" tbody tr:not(.grid_tr_templete)").each(function(index, dom){
		$(dom).remove();
	});
	
	var i=0;
	for(;i<items.length;){
		$("#"+tableId+" tbody tr.grid_tr_templete").each(function(index, dom){
			var o = items[i++];
			if(o){
				var new_tr = $(dom).clone();
				$(new_tr).removeClass("grid_tr_templete");
				$(new_tr).css("display","");
				$.data($(new_tr).get(0),"record",o);
				$("td",$(new_tr)).each(function(j, d){
					var field = $("#"+tableId+" thead tr th:eq("+j+")").attr("field");
					if(field!=undefined && field!=""){
						$(d).attr("title",o[field]);
						if(o[field]!= undefined && o[field] != "")
							$(d).html(o[field]);
						else
							$(d).html("&nbsp;");
					}
				});
				$("#"+tableId+" tbody").append(new_tr);
			}
		});
	}
	
	sorter();
	selector(tableId);
	setIndex(tableId);
	formatter(tableId);
};
	
var sorter = function(){
	//排序功能实现
	var headers = "";
	var sortList = "";
	var formatterList = "";
	$("table.tablesorter thead tr th").each(function(index, dom){
		var th_class = $(this).attr("class");
		if(th_class.indexOf("sortable")==-1){
			headers = headers +index +":{sorter: false},"
		}
		
		if(th_class.indexOf("sortable-desc")>=0){
			sortList = sortList +"["+index+",1"+"],";
		}else if(th_class.indexOf("sortable-asc")>=0){
			sortList = sortList +"["+index+",0"+"],";
		}
	});
	
	var headers_object = eval("({"+headers.substring(0,headers.length-1)+"})");
	var sortList_object = eval("(["+sortList.substring(0,sortList.length-1)+"])");
	$("table.tablesorter").tablesorter({
		headers:headers_object,
		sortList:sortList_object
	});
}

var setIndex = function(tableId){
	var currentPageIndex = parseInt($("input.currentPage",$("#"+tableId)).val());
	var pageSize = parseInt($("input.pageSize",$("#"+tableId)).val());

	//设置序号功能实现
	$("#"+tableId+" thead tr th").each(function(index, dom){
		var th_class = $(this).attr("class");
		var result = /(.*\\s)?[iI][nN][dD][eE][xX](\\s.*)?/.test(th_class);
		
		if(result){
			$("#"+tableId+" tbody tr:not(.grid_tr_templete)").each(function(i, d){
				var td_d = $("td:eq("+index+")", d);
				td_d.html(pageSize*(currentPageIndex-1)+i+1);
			});
		}
	});
}

var formatter = function(tableId){
	//格式化功能实现
	$("#"+tableId+" thead tr th").each(function(index, dom){
		var th_class = $(this).attr("class");
		//var result = /(.*\\s)?[fF][oO][rR][mM][aA][tT][tT][eE][rR]-.+(\\s.*)?/.test(th_class);
		
		if(th_class.indexOf("formatter")>=0){
			var th_class_array = th_class.split(" ");
			var fn = "";
			for(var i=0;i<th_class_array.length;i++){
				if(th_class_array[i].indexOf("formatter")>=0){
					fn = th_class_array[i].substring(10,th_class_array[i].length);
					break;
				}
			}
			
			$("#"+tableId+" tbody tr:not(.grid_tr_templete)").each(function(i, d){
				var cell = $("td:eq("+index+")", d);
				var data = $.data(d,"record");
				
				if(fn && fn!="" && data){
					eval("("+fn+"(cell, data)"+")");
				}
			});
		}
	});
}

var selector = function(tableId){
	//多选框实现
	$("#"+tableId+" thead tr th").each(function(index, dom){
		var th_class = $(this).attr("class");
		var isCheckbox = /(.*\\s)?[cC][hH][eE][cC][kK][bB][oO][xX](\\s.*)?/.test(th_class);
		var isRadio = /(.*\\s)?[rR][aA][dD][iI][oO](\\s.*)?/.test(th_class);
		
		if(isCheckbox){
			$(this).attr("align","center");
			$(this).html("<input id='"+tableId+"_th_checkbox' type='checkbox' class='grid_th_selector'>");
			
			$("#"+tableId+" tbody tr:not(.grid_tr_templete)").each(function(i, d){
				var td_d = $("td:eq("+index+")", d);
				$(td_d).attr("align","center");
				$(td_d).html("<input type='checkbox' name='checkbox' class='grid_tr_selector'>");
			});
		}else if(isRadio){
			$("#"+tableId+" tbody tr:not(.grid_tr_templete)").each(function(i, d){
				var td_d = $("td:eq("+index+")", d);
				$(td_d).attr("align","center");
				$(td_d).html("<input type='radio' name='radio' class='grid_tr_selector'>");
			});
		}
	});
	
	$("input.grid_th_selector",$("#"+tableId)).bind("click",function(e){
		var checked = $(this).attr("checked");
		$("input.grid_tr_selector",$("#"+tableId)).each(function(index,dom){
			$(dom).attr("checked", checked);
		});
	});
}

var pagebar = function(tableId){
	var pagebar = $("div.pagebar",$("#"+tableId));
	var successCallback;
	var failCallback;
	if($("input.successCallback",$("#"+tableId))){
		successCallback = $("input.successCallback",$("#"+tableId)).val();
	}
	if($("input.failCallback",$("#"+tableId))){
		failCallback = $("input.failCallback",$("#"+tableId)).val();
	}
		
	$("a.firstPage",pagebar).bind("click",function(){
		$("#"+tableId).search({'currentPageIndex':1},successCallback,failCallback);
	});
	$("a.previousPage",pagebar).bind("click",function(){
		var span_currentPageIndex = $("span.currentPageIndex",$("#"+tableId));
		var currentPageIndex = parseInt($(span_currentPageIndex).html());
		
		$("#"+tableId).search({'currentPageIndex':(currentPageIndex>1?(currentPageIndex-1):1)},successCallback,failCallback);
	});
	$("a.nextPage",pagebar).bind("click",function(){
		var span_currentPageIndex = $("span.currentPageIndex",$("#"+tableId));
		var currentPageIndex = parseInt($(span_currentPageIndex).html());
		var span_totalPage = $("span.totalPage",$("#"+tableId));
		var totalPage = parseInt($(span_totalPage).html());
		
		$("#"+tableId).search({'currentPageIndex':(currentPageIndex<totalPage?(currentPageIndex+1):totalPage)},successCallback,failCallback);
	});
	$("a.lastPage",pagebar).bind("click",function(){
		var span_totalPage = $("span.totalPage",$("#"+tableId));
		var totalPage = parseInt($(span_totalPage).html());
		
		$("#"+tableId).search({'currentPageIndex':totalPage},successCallback,failCallback);
	});
	/*$("input.currentPage",pagebar).bind("change",function(){
		var span_totalPage = $("span.totalPage",$("#"+tableId));
		var totalPage = parseInt($(span_totalPage).html());
		var input = $("input.currentPage",$("#"+tableId));
		var currentPageIndex = parseInt($(input).val());
		
		$("#"+tableId).search({'currentPageIndex':currentPageIndex>totalPage?totalPage:(currentPageIndex<1?1:currentPageIndex)},successCallback,failCallback);
	});*/
	$("input.currentPage", pagebar).keyup(function(event) {
		if (event.keyCode == 13) {
			var span_totalPage = $("span.totalPage",$("#"+tableId));
			var totalPage = parseInt($(span_totalPage).html());
			var input = $("input.currentPage",$("#"+tableId));
			var currentPageIndex = parseInt($(input).val());
			
			$("#"+tableId).search({'currentPageIndex':currentPageIndex>totalPage?totalPage:(currentPageIndex<1?1:currentPageIndex)},successCallback,failCallback);
		}
	});
}

var showProgressBar = function(tableId){
	var loadingElement = document.getElementById(tableId+"_loading");
	if(loadingElement==null){
		var loadingDivHtml = "<div id='"+tableId+"_loading' class='gridloading'>";
		//slc2-29
//		loadingDivHtml += " 正在加载...";
		loadingDivHtml += " <div id='gridloadingImg' />"
		loadingDivHtml += "</div>";
		
		
		$("#"+tableId).before(loadingDivHtml);
	}
	$("#"+tableId+"_loading").show();
	
}

var hideProgressBar = function(tableId){
	var loadingElement = document.getElementById(tableId+"_loading");
	if(loadingElement!=null){
		$(loadingElement).hide();
	}
}

