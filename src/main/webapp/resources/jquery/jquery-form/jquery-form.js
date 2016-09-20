/***
 * 获得form的值信息
 */
(function($) {
	/**
	 * 获取form表单值信息
	 */
	$.fn.formDatas = function() {
		var formValues={};
		if($(this).length<1){
			console.log("form not exist")
			return formValues;
		}
		if(!$(this).is("form")){
			console.log("id:" +$(this).attr("id")+" is not a form");
			return formValues;
		}
		//获得input输入框值
		$.extend(formValues,this.InputDatas());
		//获得select输入框值
		$.extend(formValues,this.SelectDatas());
		return formValues;
	};
	//获得输入框的值
	$.fn.InputDatas = function() {
		var inputDatas={};
		//获得输入框的值
		if($("input",$(this)).length<1){
			console.log("input not exist")
			return inputDatas;
		}
		$("input",$(this)).each(function (index, domEle){
			inputDatas[domEle.id]=domEle.value;
		});
		return inputDatas;
	};
	//获得选择框的值
	$.fn.SelectDatas = function() {
		var selectDatas={};
		//获得输入框的值
		if($("select",$(this)).length<1){
			console.log("select not exist")
			return selectDatas;
		}
		$("select",$(this)).each(function (index, domEle){
			selectDatas[domEle.id]=domEle.value;
		});
		return selectDatas;
	};
	
	
})(jQuery);
