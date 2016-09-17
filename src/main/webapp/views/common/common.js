var timeout=600000;//超时时间毫秒
//Post方式Ajax方法
function simplePostAjax(data,url,succCb,errCb){
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
			}else{
				console.log("ajax post请求成功：data="+JSON.stringify(data));
			}
		},
		//请求失败时调用此函数。有以下三个参数：XMLHttpRequest 对象、错误信息、（可选）捕获的异常对象。
		//如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能是"timeout", "error", "notmodified" 和 "parsererror"
		error:function (XMLHttpRequest, textStatus, errorThrown) {
			if(errCb){
				errCb(textStatus, errorThrown,XMLHttpRequest)
			}else{
				if(textStatus=="timeout"){
					alert("超时");
				}else if(textStatus=="parsererror"){
					alert("解析错误");
				}else {
					alert("fail:"+textStatus);
				}
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

//get方式Ajax方法
function simpleGetAjax(data,url,succCb,errCb){
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
			}else{
				console.log("ajax get请求成功：data="+JSON.stringify(data));
			}
		},
		//请求失败时调用此函数。有以下三个参数：XMLHttpRequest 对象、错误信息、（可选）捕获的异常对象。
		//如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能是"timeout", "error", "notmodified" 和 "parsererror"
		error:function (XMLHttpRequest, textStatus, errorThrown) {
			if(errCb){
				errCb(textStatus, errorThrown,XMLHttpRequest)
			}else{
				if(textStatus=="timeout"){
					alert("超时");
				}else if(textStatus=="parsererror"){
					alert("解析错误");
				}else {
					alert("fail:"+textStatus);
				}
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

function isEmpty(data){
	if(data==null||data==""||data==undefined){
		return true;
	}else{
		return false;
	}
}

//自定义alert框，msg：提示信息；headerMsg：提示信息头部信息，不传或为空默认为温馨提示；okBtn:true/false,是否显示确认按钮
//okFunc:ok回调函数
function alertMsg(msg,setting){
	var headerMsg="";
	var btnType="";
	var okFunc="";
	var timeOut="";
	//显示Ok按钮
	if(!isEmpty(setting)){
		if(!isEmpty(setting.headerMsg)){
			headerMsg=setting.headerMsg;
		}
		if(!isEmpty(setting.okBtn)&&setting.okBtn==true){
			btnType=1;
		}
		if(!isEmpty(setting.okFunc)){
			okFunc=setting.okFunc;
		}
		if(!isEmpty(setting.timeOut)){
			timeOut=setting.timeOut;
		}
	}
	msgAppendHtml(0,msg,headerMsg,btnType,okFunc,"",timeOut);
}

//自定义confirm弹出框
function confirmMsg(msg,headerMsg,okFunc,cancleFunc){
	msgAppendHtml(1,msg,headerMsg,0,okFunc,cancleFunc);
}
//自定义alert和confirm框，msg：提示信息；headerMsg：提示信息头部信息，不传或为空默认为温馨提示；
//btnType:按钮类型，0全部显示，1只显示确认按钮，2只显示取消按钮,msType:0表示alert，1表示confirm
function msgAppendHtml(msType,msg,headerMsg,btnType,okFunc,cancleFunc,timeOut){
	$("body #selfAlertDiv").remove();
	var showHeaderMsg="温馨提示";
	var str='<div class="modal fade"  id="selfAlertDiv" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> ';
	str   +=	'<div class="modal-dialog" style="max-width:350px;"> ';
	str   +=		'<div class="modal-content "> ';
	if(!isEmpty(headerMsg)){
		showHeaderMsg=headerMsg;
	}
	str   +=			'<div class="modal-header" style="color: #FFF;background: #337AB7;padding: 6px;">  ';
	str   +=				'<h4 class="modal-title text-center">'+showHeaderMsg+'</h4>  ';
	str   +=			'</div> ';
	str   +=			'<div class="modal-body" style="text-align: center;border: 0;background: #F5F5F5;font-size: 16px;padding: 8px"> ';
	str   +=				msg;
	str   +=			'</div> ';
	if(!isEmpty(btnType)){
		str   +=			'<div class="modal-footer " style="text-align: center;border: 0;background: #F5F5F5;padding-bottom: 6px;padding-top: 6px;">';
		//按钮类型，0或1显示确认按钮
		if(btnType==0||btnType==1){
			str   +=			'<button type="button" id="alertOkBtn" class="btn btn-primary" style="margin-right: 10px;" data-dismiss="modal">确认</button>';
		}
		//按钮类型，0或2显示取消按钮
		if(btnType==0||btnType==2){
			str   +=			'<button type="button" id="alertCancleBtn" class="btn btn-warning" data-dismiss="modal" style="margin-left: 10px;">取消</button>';
		}
		str   +=			'</div>';
	}
	str   +=		'</div>';
	str   +=	'</div>';
	str   +='</div>';
	$("body").append(str);
	if(!isEmpty(btnType)){
		$('#selfAlertDiv').modal({
			backdrop:'static',
			keyboard:false
		});
		//绑定确认事件
		if(!isEmpty(okFunc)){
			$("#alertOkBtn").attr("onclick",okFunc);
		}
		//绑定取消事件
		if(!isEmpty(cancleFunc)){
			$("#alertCancleBtn").attr("onclick",cancleFunc);
		}
	}else{
		$('#selfAlertDiv').modal('show');
	}
	if(msType==0&&isEmpty(okFunc)){
		//默认2秒后关闭
		if(isEmpty(timeOut)){
			timeOut=5000;
		}
		setTimeout(function(){
			$('#selfAlertDiv').modal('hide');
		},timeOut)
		
	}
}

//使用div排列的使用该方法设置bootstrap样式的提醒，打对号和错号
function DivFormValidate(formId){
	$( "#"+formId ).validate( {
		errorElement: "em",
		errorPlacement: function ( error, element ) {
			error.addClass( "help-block" );
			element.parents( ".form_border" ).addClass( "has-feedback" );
			if ( element.prop( "type" ) === "checkbox" ) {
				error.insertAfter( element.parent( "label" ) );
			} else {
				error.insertAfter( element );
			}
			if ( !element.next( "span" )[ 0 ] ) {
				$( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
			}
		},
		success: function ( label, element ) {
			if ( !$( element ).next( "span" )[ 0 ] ) {
				$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
			}
		},
		highlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".form_border" ).addClass( "has-error" ).removeClass( "has-success" );
			$( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
		},
		unhighlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".form_border" ).addClass( "has-success" ).removeClass( "has-error" );
			$( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
		}
	} );
}


//若表单使用的为table排列的，使用该方法，设置bootstrap样式的提醒，打对号和错号
function TableFormValidate(formId){
	$( "#"+formId ).validate( {
		errorElement: "em",
		errorPlacement: function ( error, element ) {
			error.addClass( "help-block" );
			element.parents( ".col-xs-8" ).addClass( "has-feedback" );
			if ( element.prop( "type" ) === "checkbox" ) {
				error.insertAfter( element.parent( "label" ) );
			} else {
				error.insertAfter( element );
			}
			if ( !element.next( "span" )[ 0 ] ) {
				$( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
			}
		},
		success: function ( label, element ) {
			if ( !$( element ).next( "span" )[ 0 ] ) {
				$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
			}
		},
		highlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-xs-8" ).addClass( "has-error" ).removeClass( "has-success" );
			$( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
		},
		unhighlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-xs-8" ).addClass( "has-success" ).removeClass( "has-error" );
			$( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
		}
	} );
}

//格式化请求数据，若返回的数据为undefined或者null，则返回""
function formatUndefinedOrNullData(data){
	if(data==null||data==undefined){
		return "";
	}else{
		return data;
	}
}

//检查是否输入数字，给输入框onkeypress使用
function NoNumbers(e){
	var keynum="";
	if(window.event){
		// IE
		keynum = String.fromCharCode(e.keyCode);
	}else if(e.which){
		// Netscape/Firefox/Opera
		keynum = String.fromCharCode(e.which)
	}
	return !/\d/.test(keychar)
}
