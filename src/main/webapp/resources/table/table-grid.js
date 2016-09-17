
(function($) {
	//存储请求参数,可能累加一类的，
	var memoryTableData={};
	//保存请求参数,每个请求表格保存一个
	var memoryReqData={};
	//存储显示表格的数据，用于点击获取
	var showTableListData={};
	/**
	 * 通过Params发送请求
	 * @param params 格式："{url:url,currPage:1,pageSize:10,reqParams。。。。。}对象"，必传
	 * url：请求路径，必传
	 * currPage：当前请求页，不传默认从1开始，不刷新页面的情况下为下一页的大小
	 * pageSize：每页请求数量，不传默认为10，只初始化一次，每次改变大小时请求从第一页进行请求
	 * reqParams：请求其余参数，不传则不设置查询条件，初始化一次，格式如传入id，则id:10,完整为"{url:url,currPage:1,pageSize:10,id:'10'}"
	 * @param successCallback:成功时候回调函数，
	 * @param failCallbac：失败时候回调函数
	 */
	$.fn.searchForTable = function(params,successCallback,failCallback) {
		var tableId = $(this).attr("id");
		//检查表格请求信息是否存在，不存在缓存
		if(isEmpty(memoryReqData[tableId])){
			memoryReqData[tableId]={
					currPage:1,//当前页码
					pageSize:10,//请求的数据条数
					autoload:false,//是否初始化后进行数据加载
					btnNum:5,//每页显示请求的按钮次数
					startPageIndex:1,//每个分页导航条开始的页数信息记录，默认为1
					skipShow:true,//跳转页是否显示,默认显示
					pageInfoShow:true,//是否显示分页信息，如“第1/40页(共398条,10条/页)”
					bindClickFunc:"",//给每条记录绑定点击事件
			}
		}
		//params.url参数必须传，否则报错
		if(isEmpty(params)||isEmpty(params["url"])){
			alert("params.url参数必传");
			return;
		}
		//合并请求参数
		$.extend(memoryReqData[tableId],params);
		//自动下载标识
		if(memoryReqData[tableId]["autoload"]==true || memoryReqData[tableId]["autoload"]=='true'){
			simplePostAjax(memoryReqData[tableId],memoryReqData[tableId]["url"],function(data){
				memoryTableData[tableId]=data;
				//显示表格数据信息
				showTabelData(tableId, data);
			});
		}
	};
	//获得当前页
	$.fn.currPage = function(){
		var tableId = $(this).attr("id");
		return memoryTableData[tableId]["currPage"];
	};
	//获得总条数
	$.fn.totalCount = function(){
		var tableId = $(this).attr("id");
		return memoryTableData[tableId]["totalCount"];
	};
	//获得总页数
	$.fn.totalPage = function(){
		var tableId = $(this).attr("id");
		return memoryTableData[tableId]["totalPage"];
	};
	
	//获得请求数据
	$.fn.tableData = function(){
		var tableId = $(this).attr("id");
		return memoryTableData[tableId];
	};
	//获得选择的信息
	$.fn.selectRecords=function(){
		var tableId = $(this).attr("id");
		var recordsList=[];
		// td input
		$("#"+tableId+"  tbody tr").each(function (index, domEle){
			//获取关键信息
			var dataKey=domEle.attributes.dataKey.value;
			var selectRecord="";
			$("td input",$(domEle)).each(function (index, domEle){
				if(domEle.checked){
					//获得选择的值信息
					selectRecord=$("#"+tableId).getOneDataByKey(dataKey);
				}
			});
			if(!isEmpty(selectRecord)){
				recordsList.push(selectRecord);
			}
		});
		return recordsList;
	}
	//根据每条信息的索引值查数据信息
	$.fn.getOneDataByKey=function(keyIndex){
		var tableId = $(this).attr("id");
		return memoryTableData[tableId]["keyDateItems"][keyIndex];
	}
	
	
	
	/*******************************自定义行数调用******************************************/
	//拼接显示列表
	var showTabelData = function(tableId, data){
		//设置分页导航信息
		setPageBar(tableId, data);
		//显示表格信息
		showTableBodyInfo(tableId, data);
	};

	//设置更新分页插件，表格下面的页码导航
	var setPageBar=function (tableId, data){
		var items = data.result;
		var currPage = parseInt(data.currPage);
		var lastPage =  parseInt(data.lastPage);
		var nextPage =  parseInt(data.nextPage);
		var pageSize =  parseInt(data.pageSize);
		var prePage =  parseInt(data.prePage);
		var totalCount =  parseInt(data.totalCount);
		var totalPage =  parseInt(data.totalPage);
		var filedList=getTableFiled(tableId);//要显示的表格数据列数
		var btnNum=memoryReqData[tableId]["btnNum"];
		var startPageIndex=memoryReqData[tableId]["startPageIndex"];
		//分页导航拼接
		var tfoot=$("#"+tableId +" tfoot");
		//计算每一条开始的
		if(isEmpty(tfoot)||tfoot.length<1){
			$("#"+tableId).append("<tfoot></tfoot>");
		}
		var pageBarStr='<tr>';
		pageBarStr	 +=		'<td colspan="'+filedList.length+'">';
		pageBarStr	 +=			'<nav>';
		pageBarStr	 +=				'<ul class="pagination pageMarinAndPadding">';
		if(memoryReqData[tableId]["pageInfoShow"]){
			pageBarStr	 +=				'<li ><a>第'+currPage+'/'+totalPage+'页(共'+totalCount+'条,'+pageSize+'条/页)</a></li>';
		}
		pageBarStr	 +=					'<li style="cursor:pointer;" id="firstPageBarBtn"><a>首页</a></li>';
		pageBarStr	 +=					'<li style="cursor:pointer;" id="preBarBtn"><a>&laquo;</a></li>';
		for(var i=0;i<btnNum;i++){
			var pageNum=i+startPageIndex;
			if(totalPage>=pageNum){
				var activeClass='';
				if(pageNum==currPage){
					//设置选中的页高亮
					activeClass=' active ';
				}
				pageBarStr	 +=			'<li class="'+activeClass+' pageNum" style="cursor:pointer;"><a>'+pageNum+'</a></li>';
			}else{
				break;
			}
		}
		//判断是否到了最后一轮导航条
		if((startPageIndex+btnNum)>totalPage){
			pageBarStr	 +=				'<li class="disabled"><a>&raquo;</a></li>';
		}else{
			pageBarStr	 +=				'<li style="cursor:pointer;" id="nextBarBtn"><a>&raquo;</a></li>';
		}
		pageBarStr	 +=					'<li style="cursor:pointer;" id="lastPageBarBtn"><a>尾页</a></li>';
		if(memoryReqData[tableId]["skipShow"]){
			pageBarStr	 +=				'<li >';
			pageBarStr	 +=					'<a style="padding-bottom: 4px;padding-top: 4px;">跳转至';
			pageBarStr	 +=						'<input id="skipNumInput" type="text" maxlength="4" style="width: 40px;padding-top: 0px;padding-bottom: 0px;margin-top: 0px;margin-bottom: 0px;">页';
			pageBarStr	 +=						'<button id="skipBtn" type="button" class="btn btn-primary" style="width: 50px;padding-top: 0px;padding-bottom: 0px;margin-left: 0px;margin-right: 0px;">跳转</button>';
			pageBarStr	 +=					'</a>';
			pageBarStr	 +=				'</li>';
		}
		pageBarStr	 +=				'</ul>';
		pageBarStr	 +=			'</nav>';
		pageBarStr	 +=		'</td>';
		pageBarStr	 +='</tr>';
		$("#"+tableId +" tfoot").html(pageBarStr);
		//添加向前一轮分页查询点击按钮事件
		if(startPageIndex==1){
			$("#preBarBtn",$("#"+tableId)).addClass("disabled");
		}else{
			bindClickForPreBarBtn(tableId);
		}
		//添加向后一轮分页查询点击按钮事件
		if((startPageIndex+btnNum)>totalPage){
			$("#nextBarBtn",$("#"+tableId)).addClass("disabled");
		}else{
			bindClickForNextBarBtn(tableId);
		}
		//为每个页码添加点击事件
		addClickFuncForPageNum(tableId);
		//为首页添加绑定事件
		addClickFuncForFirstPage(tableId);
		//为尾页添加绑定事件
		addClickFuncForLastPage(tableId);
		//为跳转添加绑定事件
		addClickFuncForSkipBtn(tableId);
		//跳转信息输入框绑定事件
		addEnterKeyEnvent(tableId);
	}
	
	//跳转信息输入框绑定事件,只输入数字
	function addEnterKeyEnvent(tableId){
		$("#skipNumInput").keypress(function(e){
			var keynum="";
			if(window.event){
				// IE
				keynum = e.keyCode;
			}else if(e.which){
				// Netscape/Firefox/Opera
				keynum = e.which;
			}
			if(keynum==13){
				//获取输入页码值
				var skipNum=$("#skipNumInput",$("#"+tableId)).val();
				if(isEmpty(skipNum)){
					alertMsg("请输入跳转的页码");
					$("#skipBtn",$("#"+tableId)).focus();
					return false;
				}
				memoryReqData[tableId]["currPage"]=parseInt(skipNum);//当前页码
				memoryReqData[tableId]["autoload"]=true;//是否初始化后进行数据加载
				memoryReqData[tableId]["startPageIndex"]=parseInt(skipNum);
				$("#"+tableId).search(memoryReqData[tableId]);
				return false;
			}else{
				return /[\d]/.test(String.fromCharCode(keynum));
			}
		});
	}

	//获得表格要显示的字段名称
	var getTableFiled=function(tableId){
		var filedList=[];
		//$("#operLogList  thead tr th").each方法，循环$("#operLogList  thead tr th")查询到的节点信息进行处理，jquery方法
		$("#"+tableId+"  thead tr th").each(function (index, domEle){
			filedList.push($(domEle).attr("field"));
		})
		return filedList;
	}
	//显示表格体信息
	var showTableBodyInfo=function (tableId, data){
		var items = data.result;
		if(isEmpty(items)||items.length<1){
			return;
		}
		//表格体信息
		var tbody=$("#"+tableId +" tbody");
		if(isEmpty(tbody)||tbody.length<1){
			$("#"+tableId).append("<tbody></tbody>");
		}
		//获得要显示的字段配置
		var filedList=getTableFiled(tableId);
		//显示的表格体信息
		var tableBodyStr='';
		//存储当前表格的数据
		showTableListData[tableId]=items;
		var currTime=new Date().getTime();
		var keyDateItems={};
		//拼接表格信息
		for(var i=0;i<items.length;i++){
			var dateKey=currTime+""+i;//每条信息的唯一标识key值
			tableBodyStr     +='<tr dataKey="'+dateKey+'">';
			//存储每条列表信息，key为tr上的唯一值，数据为每条信息的详细数据
			keyDateItems[dateKey]=items[i];
			for(var j=0;j<filedList.length;j++){
				if(filedList[j]=="radio"){
					tableBodyStr +=	'<td><input type="radio" name="tableRadio"/></td>';
				}else if(filedList[j]=="checkbox"){
					tableBodyStr +=	'<td><input type="checkbox"/></td>';
				}else{
					tableBodyStr +=	'<td>'+formatUndefinedOrNullData(items[i][filedList[j]])+'</td>';
				}
			}
			tableBodyStr     +="</tr>"
		}
		memoryTableData[tableId]["keyDateItems"]=keyDateItems;
		$("#"+tableId +" tbody").html(tableBodyStr);
		//为每条信息添加绑定事件
		addClickFuncForTableList(tableId);
	}
	
	//每条信息添加绑定事件
	function addClickFuncForTableList(tableId){
		if(!isEmpty(memoryReqData[tableId]["bindClickFunc"])){
			$("#"+tableId+"  tbody tr").each(function (index, domEle){
				$(domEle).bind("click",memoryReqData[tableId]["bindClickFunc"]());
			})
		}else{
			//没设置绑定事件，添加默认事件
			addDefaultClickFuncForTableList(tableId);
		}
	}
	
	//若没有添加绑定事件则默认一个事件，该事件点击时若存在单选框默认选中单选框
	function addDefaultClickFuncForTableList(tableId){
		$("#"+tableId+"  tbody tr").each(function (index, domEle){
			//父元素添加点击事件
			$(domEle).bind("click",function (){
				$("td input",$(this)).each(function (index1, domEle1){
					if(domEle1.type=="radio"){
						domEle1.checked=true;
						$(domEle1).parent().parent().parent().find("tr").removeClass("tableActive");
						$(domEle1).parent().parent().addClass("tableActive");
					}else{
						if(domEle1.checked){
							domEle1.checked=false;
							$(domEle1).parent().parent().removeClass("tableActive");
						}else{
							domEle1.checked=true;
							$(domEle1).parent().parent().addClass("tableActive");
						}
					}
				});
			});
			//对checkBox事件父事件进行屏蔽
			$(":checkbox",$(domEle)).bind("click",function (e){
				e.stopPropagation();
				$(this).prop("checked");
				if(this.checked){
					$(this).parent().parent().addClass("tableActive");
				}else{
					$(this).parent().parent().removeClass("tableActive");
				}
			});
		})
	}
	
	//首页添加绑定事件
	function addClickFuncForFirstPage(tableId){
		$("#firstPageBarBtn",$("#"+tableId)).bind("click",function(){
			memoryReqData[tableId]["currPage"]=1;//当前页码
			memoryReqData[tableId]["autoload"]=true;//是否初始化后进行数据加载
			memoryReqData[tableId]["startPageIndex"]=1;
			$("#"+tableId).search(memoryReqData[tableId]);
		});
	}
	//跳转添加绑定事件
	function addClickFuncForSkipBtn(tableId){
		$("#skipBtn",$("#"+tableId)).bind("click",function(){
			//获取输入页码值
			var skipNum=$("#skipNumInput",$("#"+tableId)).val();
			if(isEmpty(skipNum)){
				alertMsg("请输入跳转的页码");
				$("#skipBtn",$("#"+tableId)).focus();
				return;
			}
			memoryReqData[tableId]["currPage"]=parseInt(skipNum);//当前页码
			memoryReqData[tableId]["autoload"]=true;//是否初始化后进行数据加载
			memoryReqData[tableId]["startPageIndex"]=parseInt(skipNum);
			$("#"+tableId).search(memoryReqData[tableId]);
		});
	}
	//尾页添加绑定事件
	function addClickFuncForLastPage(tableId){
		$("#lastPageBarBtn",$("#"+tableId)).bind("click",function(){
			memoryReqData[tableId]["currPage"]=memoryTableData[tableId]["totalPage"];//当前页码
			memoryReqData[tableId]["autoload"]=true;//是否初始化后进行数据加载
			var btnNum=memoryReqData[tableId]["btnNum"];
			var newStartPageIndex=memoryTableData[tableId]["totalPage"]-btnNum+1;
			if(newStartPageIndex<1){
				newStartPageIndex=1;
			}
			memoryReqData[tableId]["startPageIndex"]=newStartPageIndex;
			$("#"+tableId).search(memoryReqData[tableId]);
		});
	}
	//为每个页码添加点击事件
	function addClickFuncForPageNum(tableId){
		$("#"+tableId+"  tfoot tr td .pageNum").each(function (index, domEle){
			var pageNum=$("a",$(domEle)).text();//获取当前页码
			//为每个页码添加点击事件
			$(domEle).bind("click",function(t){
				var currPage=memoryReqData[tableId]["currPage"];
				if(currPage==pageNum){
					return;
				}
				//获取当前的开始页
				var startPageIndex=memoryReqData[tableId]["startPageIndex"];
				if(isEmpty(startPageIndex)){
					startPageIndex=1;
					memoryReqData[tableId]["startPageIndex"]=1;
				}
				var btnNum=memoryReqData[tableId]["btnNum"];
				//如果当前页面和开始页码之差是大于最大显示页码的1/2且总页码大于当前最大显示页面，开始页码重新设置
				var totalPage=memoryTableData[tableId]["totalPage"];
				if(pageNum-startPageIndex>Math.floor(btnNum/2)){
					var newStartPageIndex=pageNum-Math.floor(btnNum/2);
					if(newStartPageIndex+btnNum>totalPage){
						newStartPageIndex=totalPage-btnNum+1;
					}
					memoryReqData[tableId]["startPageIndex"]=newStartPageIndex;
				}else if(pageNum-startPageIndex<1){
					//若当前页面和开始页码之差小于1，则开始页码重新设置
					var newStartPageIndex=pageNum-Math.floor(btnNum/2);
					if(newStartPageIndex<1){
						newStartPageIndex=1;
					}else if(newStartPageIndex+btnNum>totalPage){
						newStartPageIndex=totalPage-btnNum+1;
					}
					memoryReqData[tableId]["startPageIndex"]=newStartPageIndex;
				}
				memoryReqData[tableId]["currPage"]=pageNum;//当前页码
				memoryReqData[tableId]["autoload"]=true;//是否初始化后进行数据加载
				$("#"+tableId).search(memoryReqData[tableId]);
			});
		})
	}
	
	//绑定查向前一轮的按钮事件
	function bindClickForPreBarBtn(tableId){
		$("#preBarBtn",$("#"+tableId)).bind("click",function(){
			//获取当前的开始页
			var startPageIndex=memoryReqData[tableId]["startPageIndex"];
			if(isEmpty(startPageIndex)){
				startPageIndex=1;
			}
			var btnNum=memoryReqData[tableId]["btnNum"];
			//计算上一轮的开始页
			var preCurrPage=startPageIndex-btnNum;
			if(preCurrPage<1){
				preCurrPage=1;
			}
			memoryReqData[tableId]["currPage"]=preCurrPage;//当前页码
			memoryReqData[tableId]["autoload"]=true;//是否初始化后进行数据加载
			memoryReqData[tableId]["startPageIndex"]=preCurrPage;//下一开始页码为nextCurrPage
			$("#"+tableId).search(memoryReqData[tableId]);
		});
	}
	//绑定查向后一轮的按钮事件
	function bindClickForNextBarBtn(tableId){
		$("#nextBarBtn",$("#"+tableId)).bind("click",function(){
			//获取当前的开始页
			var startPageIndex=memoryReqData[tableId]["startPageIndex"];
			if(isEmpty(startPageIndex)){
				startPageIndex=1;
			}
			var btnNum=memoryReqData[tableId]["btnNum"];
			//计算下一轮的开始页
			var nextCurrPage=startPageIndex+btnNum;
			var totalPage=memoryTableData[tableId]["totalPage"];
			if(!isEmpty(totalPage)){
				if(nextCurrPage>=totalPage){
					nextCurrPage=totalPage;
				}
			}
			memoryReqData[tableId]["currPage"]=nextCurrPage;//当前页码
			memoryReqData[tableId]["autoload"]=true;//是否初始化后进行数据加载
			memoryReqData[tableId]["startPageIndex"]=nextCurrPage;//下一开始页码为nextCurrPage
			$("#"+tableId).search(memoryReqData[tableId]);
		});
	}
})(jQuery);
