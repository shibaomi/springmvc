var timeout=600000;//超时时间毫秒

function simplePostAjax(data,url,succCb){
	$.ajax({
		type:"POST",//请求类型，"POST" 或 "GET
		cache:false,//默认: true,dataType为script和jsonp时默认为false，设置为 false 将不缓存此页面
		url:url,//
		data:data,//发送到服务器的数据
		dataType:"json",//预期服务器返回的数据类型,"xml","html","script","json","jsonp","text"
		ifModified:true,//(默认: false) 仅在服务器数据改变时获取新数据
		timeout:timeout,//超时时间毫秒
		//请求成功后的回调函数
		success:function (data, textStatus, jqXHR){
			if(succCb){
				succCb(data, textStatus, jqXHR);
			}
		},
		//请求失败时调用此函数。有以下三个参数：XMLHttpRequest 对象、错误信息、（可选）捕获的异常对象。
		//如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能是"timeout", "error", "notmodified" 和 "parsererror"
		error:function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus=="timeout"){
				alert("超时");
			}else if(textStatus=="parsererror"){
				alert("解析错误");
			}else {
				alert("fail:"+textStatus);
			}
		},
		statusCode: {
			404: function() {
				alert('page not found');
			}
		},
		complete:function (XMLHttpRequest, textStatus) {
		    console.log("textStatus="+textStatus);
		}
	});
}


function simpleGetAjax(data,url,succCb){
	$.ajax({
		type:"GET",//请求类型，"POST" 或 "GET
		cache:false,//默认: true,dataType为script和jsonp时默认为false，设置为 false 将不缓存此页面
		url:url,//
		data:data,//发送到服务器的数据
		dataType:"json",//预期服务器返回的数据类型,"xml","html","script","json","jsonp","text"
		ifModified:true,//(默认: false) 仅在服务器数据改变时获取新数据
		timeout:timeout,//超时时间毫秒
		//请求成功后的回调函数
		success:function (data, textStatus, jqXHR){
			if(succCb){
				succCb(data, textStatus, jqXHR);
			}
		},
		//请求失败时调用此函数。有以下三个参数：XMLHttpRequest 对象、错误信息、（可选）捕获的异常对象。
		//如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能是"timeout", "error", "notmodified" 和 "parsererror"
		error:function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus=="timeout"){
				alert("超时");
			}else if(textStatus=="parsererror"){
				alert("解析错误");
			}else {
				alert("fail:"+textStatus);
			}
		},
		statusCode: {
			404: function() {
				alert('page not found');
			}
		},
		complete:function (XMLHttpRequest, textStatus) {
		    console.log("textStatus="+textStatus);
		}
	});
}