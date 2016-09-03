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
