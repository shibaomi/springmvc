jQuery.validator.addMethod("twoPoints", function(value, element) {
	return this.optional(element) || /^[0-9]+(.[0-9]{2})?$/.test(value);
},"请输入正确的格式，如：1.23");

//校验费率(1).(1-4)
jQuery.validator.addMethod("testFee", function(value, element) {
	return this.optional(element) || /^(\d{1,1}\.\d{1,4})$/.test(value);
},"请输入正确的格式，如：0.2345");	

jQuery.validator.addMethod("testFixPrecision", function(value, element) {
	var v1 = this.optional(element) || /^(\d{1,10}\.\d{1,4})$/.test(value);
	var v2 = this.optional(element) ||/^(\d{1,13})$/.test(value);
	return v1||v2;
},"请输入正确的格式，如：12.345或12");	

//校验经度纬度(1,3).(1-13)
jQuery.validator.addMethod("testTude", function(value, element) {
	return this.optional(element) || /^(\d{1,3}\.\d{1,12})$/.test(value);
},"请输入正确的格式，如：12.3456");	

jQuery.validator.addMethod("phoneAndMobile",function(value,element){
	var phone1 =this.optional(element) || /^(\d{3,4}-\d{7,8})$/.test(value);
	var phone2 =this.optional(element) || /^(\d{3,4}\d{7,8})$/.test(value);
	var mobile =this.optional(element) || /^(\d{11})$/.test(value);
	return phone1||phone2||mobile;
},"请输入正确的电话格式，如：021-00000000或02100000000或11位手机号码！");

jQuery.validator.addMethod("faxNo",function(value,element){
	var phone1 =this.optional(element) || /^(\d{3,4}-\d{7,8})$/.test(value);
	var phone2 =this.optional(element) || /^(\d{3,4}\d{7,8})$/.test(value);
	var phone3 =this.optional(element) || /^(\d{7,8})$/.test(value);
	return phone1||phone2||phone3;
},"请输入正确的传真电话格式，如：021-00000000或02100000000或7,8位的电话号码！");


//字母和数字必填
jQuery.validator.addMethod("checkpwd", function(value, element) {
    var reg =  /^[A-Za-z]+[0-9]+[A-Za-z0-9]*$|^[0-9]+[A-Za-z]+[A-Za-z0-9]*$/;
    return this.optional(element) || reg.test(value);
}, "请输入正确的密码格式,必须有字母和数字！");

//校验6-12位
jQuery.validator.addMethod("sixToTwelve", function(value, element) {
	return this.optional(element) || /^(.){6,12}$/.test(value);
},"请输入正确的密码格式，长度为6-12位！");

//校验7-12位
jQuery.validator.addMethod("sevenToTwelve", function(value, element) {
	return this.optional(element) || /^(.){7,12}$/.test(value);
},"请输入的格式，长度为7-12位");

//校验8-12位
jQuery.validator.addMethod("eightToTwelve", function(value, element) {
	return this.optional(element) || /^(.){8,12}$/.test(value);
},"请输入的格式，长度为8-12位");

//校验8位
jQuery.validator.addMethod("eigthLength", function(value, element) {
	return this.optional(element) || /^(.){8}$/.test(value);
},"请输入的格式，长度为8位");

//校验16位
jQuery.validator.addMethod("sixthLength", function(value, element) {
	return this.optional(element) || /^(.){16}$/.test(value);
},"请输入的格式，长度为16位");

//校验15位
jQuery.validator.addMethod("fifthLength", function(value, element) {
	return this.optional(element) || /^(.){15}$/.test(value);
},"请输入的格式，长度为15位");

//校验号码+区号：021-00000000
jQuery.validator.addMethod("areaTel", function(value, element) {
	return this.optional(element) || /^(\d{3,4}-\d{7,8})$/.test(value);
},"请输入正确的电话格式，如：021-00000000");

//校验手机号11位
jQuery.validator.addMethod("mobilPhone", function(value, element) {
	return this.optional(element) || /^(\d{11})$/.test(value);
},"请输入正确的手机格式，11位数字");

//输入文本不能超过30个字
jQuery.validator.addMethod("textLenth30", function(value, element) {
	var temp = value.replace(/\n/g," ");
	return this.optional(element) || /^(.){0,30}$/.test(temp);
},"输入文本不能超过30个字");

//输入文本不能超过100个字
jQuery.validator.addMethod("textHundred", function(value, element) {
	var temp = value.replace(/\n/g," ");
	return this.optional(element) || /^(.){0,100}$/.test(temp);
},"输入文本不能超过100个字");

//输入文本不能超过200个字
jQuery.validator.addMethod("textTwoHundred", function(value, element) {
	var temp = value.replace(/\n/g," ");
	return this.optional(element) || /^(.){0,200}$/.test(temp);
},"输入文本不能超过200个字");
//输入文本不能超过256个字
jQuery.validator.addMethod("length256", function(value, element) {
	var temp = value.replace(/\n/g," ");
	return this.optional(element) || /^(.){0,256}$/.test(temp);
},"输入文本不能超过256个字");

//校验数字包括小数
jQuery.validator.addMethod("checkDNum", function(value, element) {
    var reg = /^(([0-9]\d*(\.\d*)?)|(0\.\d*))$/;  
	return this.optional(element) || reg.test(value);
}, "请输入数字！");

jQuery.validator.addMethod("mobilePhone",function(value,element){
	return this.optional(element) || /^(13|15|18)\d{9}$/.test(value);
},"请输入正确的手机号码！");

jQuery.validator.addMethod("phone",function(value,element){
	return this.optional(element) || /^(\d{8}|\d{7})$/.test(value);
},"请输入正确的固定电话号码！");

jQuery.validator.addMethod("regionNum",function(value,element){
	return this.optional(element) || /^0\d{2,3}$/.test(value);
},"请输入正确的区号！");

jQuery.validator.addMethod("carNum",function(value,element){
	return this.optional(element) || /^[\u4e00-\u9fa5]([A-Za-z]{1})[\u0000-\u00FF]{5}$/.test(value);
},"请输入正确的车牌号码！");

jQuery.validator.addMethod("normalwords",function(value,element){
	return this.optional(element) || /^\w+$/.test(value);
},"匹配由数字、26个英文字母或者下划线组成的字符串");
jQuery.validator.addMethod("normalwordsAndSpace",function(value,element){
	return this.optional(element) || /^[\s]{0,}$|^[\w\s]+$/.test(value);
},"匹配由数字、26个英文字母或者下划线组成的字符串");



jQuery.validator.addMethod("upcase",function(value,element){
	return this.optional(element) || /^[A-Z]+$/.test(value);
},"匹配由26个英文字母的大写组成的字符串");

jQuery.validator.addMethod("lowcase",function(value,element){
	return this.optional(element) || /^[a-z]+$/.test(value);
},"匹配由26个英文字母的小写写组成的字符串");



//验证身份证
var showErrMsg="请输入合法的身份证！";
jQuery.validator.addMethod("checkIdcard", function(value, element) {
	var idcard = value;
	if(idcard==""){
		return true;
	}
	var regex1 = /^[1-9][0-7]\d{4}((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229))\d{3}(\d|X|x)?$/;
	
	/*身份号码位数及格式检验*/
	switch (idcard.length) {
	  case 15:
		if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
			var regex2 = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
		} else {
			var regex2 = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
		}

		if(regex2.test(idcard)) 
			return true;
		else 
			return false;
		break; 
	  case 18:
	 	 if(regex1.test(idcard)){
			var S = (parseInt(idcard[0]) + parseInt(idcard[10])) * 7 + (parseInt(idcard[1]) + parseInt(idcard[11])) * 9 + (parseInt(idcard[2]) + parseInt(idcard[12])) * 10 + (parseInt(idcard[3]) + parseInt(idcard[13])) * 5 + (parseInt(idcard[4]) + parseInt(idcard[14])) * 8 + (parseInt(idcard[5]) + parseInt(idcard[15])) * 4 + (parseInt(idcard[6]) + parseInt(idcard[16])) * 2 + parseInt(idcard[7]) * 1 + parseInt(idcard[8]) * 6 + parseInt(idcard[9]) * 3;
			var Y = S % 11;
			var M = "F";
			var JYM = "10X98765432";
			M = JYM.substr(Y, 1);
			/*判断校验位*/
			if (M == idcard[17].toUpperCase()) {
	     			//alert(Errors[0]+"18"); 
				return true;
			} else {
				//alert(Errors[3]);
				//showErrMsg = Errors[3];
				return false;
			}
		}else{
			return false;
		}
		break;
	  default:
	  	//alert(Errors[1]);
		//showErrMsg = Errors[1];
		return false;
	}
}, jQuery.validator.format(showErrMsg));

var showErrEmailMsg="请输入合法的邮件地址";
jQuery.validator.addMethod("validateMailList", function(value, element) {
	var mailList =''+value.replace(/(^\s*)|(\s*S)/g,"");
	if (mailList == "") {
		return false;
	}
	var mailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
	var list = mailList.split(";");
	var count=list.length;
	if(count==1){
		return this.optional(element) || mailPattern.test(mailList);
	}else{
		var errorCount=0;
		for ( var i = 0; i <count ; i++) {
			mailAddr =''+list[i].replace(/(^\s*)|(\s*S)/g,"");
			if(!mailPattern.test(mailAddr)){
				if(mailAddr!="")
					errorCount++;
			}
		}
		if(errorCount>0){
			return false;
		}else
	       return true;
	}
}, jQuery.validator.format(showErrEmailMsg));


//验证百分比
jQuery.validator.addMethod("checkPercent", function(value, element) {
	var reg = /^-?\d+%$/;
	return this.optional(element) || reg.test(value);
}, "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u767e\u5206\u6bd4！");

//验证英文
jQuery.validator.addMethod("checkENG", function(value, element) {
	var reg = /^[a-zA-Z](\s*[a-zA-Z])*$/;
	return this.optional(element) || reg.test(value);
}, "\u8bf7\u8f93\u5165\u82f1\u6587！");

//验证中英文数字
jQuery.validator.addMethod("checkENGCHNNUM", function(value, element) {
	var reg =  /^[0-9a-zA-Z\u4E00-\u9FA5]+$/;
	return this.optional(element) || reg.test(value);
}, "请输入正确的字符或数字！");

//验证中英文 add by ruijie.chen
jQuery.validator.addMethod("checkENGCHN", function(value, element) {
    var reg =  /^[a-zA-Z\u4E00-\u9FA5]+$/;
    return this.optional(element) || reg.test(value);
}, "请输入正确的中文或英文！");

//验证中英文 add by ruijie.chen
jQuery.validator.addMethod("checkENGCHNANDBLANK", function(value, element) {
    var reg =  /^[a-zA-Z\u4E00-\u9FA5 ]+$/;
    return this.optional(element) || reg.test(value);
}, "请输入正确的中文或英文！");


//验证英文字母和数字
jQuery.validator.addMethod("checkENGNUM", function(value, element) {
	var reg =  /^[0-9a-zA-Z]+$/;
	return this.optional(element) || reg.test(value);
},"请输入正确的英文字母或数字！");

//验证大写英文字母和数字
jQuery.validator.addMethod("upperEnNum", function(value, element) {
	var reg =  /^[A-Z]|[A-Z][0-9]+$/;
	return this.optional(element) || reg.test(value);
},"请输入正确的大写英文字母或字母+数字！");

//验证大写英文字母
jQuery.validator.addMethod("upperEn", function(value, element) {
	var reg =  /^[A-Z]$/;
	return this.optional(element) || reg.test(value);
},"请输入正确的大写英文字母！");

//验证中文
jQuery.validator.addMethod("checkCHN", function(value, element) {
	var reg =  /^[\u4e00-\u9fa5]+$/;
	return this.optional(element) || reg.test(value);
}, "\u8bf7\u8f93\u5165\u4e2d\u6587！");

//验证不能为数字
jQuery.validator.addMethod("checkNotNum", function(value, element) {
	var reg =  /(^[^0-9]+$)/;
	return this.optional(element) || reg.test(value);
}, "\u4e0d\u80fd\u586b\u5199\u6570\u5b57！");

//验证大于0的数字
jQuery.validator.addMethod("checkNum", function(value, element) {
	var reg = /^[1-9]+?[0-9]*$/;
	return this.optional(element) || reg.test(value);
}, "\u8bf7\u8f93\u5165\u5927\u4e8e\u96f6\u7684\u6574\u6570！");

//验证大于0小于100的数字
jQuery.validator.addMethod("checkNumm100", function(value, element) {
  var reg = /^([0-9]\d?(\.\d{1,4})?|0\.\d{1,4}|100)$/ ; 
	//var reg =/(^[1-9]\d$)|(^\d$)|(^100$)/
	return this.optional(element) || reg.test(value);
}, "请输入0至100之间的数字！");

//检验是否全为数字
jQuery.validator.addMethod("isNum", function(value, element) {
	var numtype = "0123456789";
	for (i = 0; i < value.length; i++) { //检查是否有不在 0123456789之內的字 
		if (numtype.indexOf(value.charAt(i)) < 0) {
			return false;
		}
	}
	return true;
}, "请输入自然数！");

//校验24小时时间如： 00:00
jQuery.validator.addMethod("checkTime", function(value, element) {
	var intt = value.indexOf(":");
	var befor = value.substring(0, intt);
	var after = value.substring(intt + 1, intt + 3);
	if (befor >= 24 || befor.length != 2 || after >= 60 || after.length != 2) {
		return false;
	}
	return true;
}, "请输入正确的时间格式，如：00:00！");

//校验Double
jQuery.validator.addMethod("checkDouble", function(value, element) {
	//var reg1 = /^\d+$/;
    var reg = /^(([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9]))$/;  //update by ruijie.chen 2010-03-01
	return this.optional(element) || reg.test(value);
}, "请输入Double型数字！");


//校验Double包含数字0 upt by zhoubao
jQuery.validator.addMethod("checkDoubleZero", function(value, element) {
	//var reg1 = /^\d+$/;
    var reg = /^(([0-9]\d*(\.\d*[0-9])?)|(0\.\d*[0-9]))$/; 
	return this.optional(element) || reg.test(value);
}, "请输入Double型数字！");


//校验邮政编码
jQuery.validator.addMethod("checkPost", function(value, element) {
	var reg = /^[0-9]\d{5}$/;
	return this.optional(element) || reg.test(value);
}, "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u653f\u7f16\u7801！");

//校验包含中文字符的字符串的长度，中文每个字符算2个字符长度，英文为1个字符长度
jQuery.validator.addMethod("maxlengthC", function(value, element, param) {
	return this.optional(element) || value.replace(/[^\x00-\xff]/g,"**").length <= param;
}, $.validator.format("允许最大字符为 {0}，一个汉字算2个字符！"));

//校验日期 格式：yyyyMM
jQuery.validator.addMethod("date_yyyyMM", function(value, element) {
	return this.optional(element) || /^\d{4}(0[1-9])|(1[0-2])$/.test(value);
}, $.validator.format("请输入正确的日期格式，如：201003"));

//校验日期 格式：yyyy-MM-dd
jQuery.validator.addMethod("date_yyyy-MM-dd", function(value, element) {
	return this.optional(element) || /^\d{4}-\d{2}-\d{2}$/.test(value);
}, $.validator.format("请输入正确的日期格式，如：2010-03-09"));

//校验JAVA包名 格式：xxx.xxx.xxx 由小写英文单词和点组成，单词最多50个字母（系统一般支持200）
jQuery.validator.addMethod("checkPackageName", function(value, element) {
	return this.optional(element) || /^[a-z]{1,50}(\.[a-z]{1,50})*$/.test(value);
}, $.validator.format("请输入正确的包名格式，如：com.newtouch.dictionary"));

//校验JAVA类名 由英文字母和数字组成，必须以字母开头，不能使用JAVA保留字（保留字均由小写英文组成）
jQuery.validator.addMethod("checkClassName", function(value, element) {
	return this.optional(element) || /^[a-zA-Z]([a-zA-Z0-9])*$/.test(value);
}, $.validator.format("请输入正确的类名格式，如：HelloWorld"));

//校验日期 格式：yyyy-MM-dd
jQuery.validator.addMethod("dateDate", function(value, element) {
	return this.optional(element) || /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$/.test(value);
}, $.validator.format("请输入正确的日期格式，如：2010-01-20"));
//add by 百分比小数 例如0.330 percentPoints
jQuery.validator.addMethod("percentPoints", function(value, element) {
	return this.optional(element) || /^0\.[0-9]{1,}$/.test(value);
},"请输入正确的格式，首位数字以0开头,如：0.05");

//add by zhoubao 于2011-11-18 联系人电话号码，只允许有数字.下划线和字母
jQuery.validator.addMethod("phoneAndMobilePerson",function(value,element){
	var reg=/^([a-zA-Z]|\d|-)*$/;
	return  this.optional(element) || reg.test(value);
},"请输入正确的电话格式，格式有数字和-还有字母组成,长度为20位！");

//检验是否全为数字,并且数字在1-7之内的数字，包括1和7
jQuery.validator.addMethod("isWeekNum", function(value, element) {
	var numtype = "1234567";
	for (i = 0; i < value.length; i++) { //检查是否有不在1234567之內的数字 
		if (numtype.indexOf(value.charAt(i)) < 0) {
			return false;
		}
	}
	return true;
}, "请输入1-7的数字！");

//验证小于等于31之内的数字
jQuery.validator.addMethod("isMonthNum", function(value, element) {
	var reg = /^((0?[1-9])|((1|2)[0-9])|30|31)$/; 
	return this.optional(element) || reg.test(value);
}, "请输入正确的格式,如:01、09和1、31");

//验证小于等于12之内的4位数字
jQuery.validator.addMethod("isMonth", function(value, element) {
	var reg = /^(\d{2}0[1-9])|(\d{2}1[0-2])$/; 
	return this.optional(element) || reg.test(value);
},"请输入正确的格式");

jQuery.validator.addMethod("baifenbi",function(value,element){
	return this.optional(element) || /^([1-9][0-9]?(\.[0-9]{1,2})?)$|^(0\.[1-9][0-9]?)$|^(0\.[0-9][1-9])$|^100\.0$|^100(\.00)?$|^0\.0$|^0(\.00)?$/.test(value);
},"请输入不大于100，最高精度为两位的数 ，如99.99");


jQuery.validator.addMethod("checkDoubleFourth",function(value,element){
	return this.optional(element) || /^[1-9]([0-9]{0,11})$|^[1-9]([0-9]{0,11})(\.[0-9])?$|^[1-9]([0-9]{0,11})(\.[0-9][0-9]?)?$|^0(\.[0-9][0-9]?)?$/.test(value);
},"请输入最长12位的整数，精度最多为两位");

jQuery.validator.addMethod("checkDoubleThirteen",function(value,element){
	return this.optional(element) || /^[1-9]([0-9]{0,10})$|^[1-9]([0-9]{0,10})(\.[0-9])?$|^[1-9]([0-9]{0,10})(\.[0-9][0-9]?)?$|^0(\.[0-9][0-9]?)?$/.test(value);
},"请输入最长11位的整数，精度最多为两位");
jQuery.validator.addMethod("checkAmtDoubleTwelve",function(value,element){
	return this.optional(element) || /^[1-9]([0-9]{0,9})$|^[1-9]([0-9]{0,9})(\.[0-9])?$|^[1-9]([0-9]{0,9})(\.[0-9][0-9]?)?$|^0(\.[0-9][0-9]?)?$/.test(value);
},"请输入最长10位的整数，精度最多为两位");


//liqita ADD
jQuery.validator.addMethod("checkDoubleTwelve",function(value,element){
	return this.optional(element) || /^[1-9]([0-9]{0,9})$|^[1-9]([0-9]{0,9})(\.[0-9])?$|^[1-9]([0-9]{0,9})(\.[0-9][0-9]?)?$|^0(\.[0-9][0-9]?)?$/.test(value);
},"请输入最长10位的正整数，精度最多为两位");
//liqita ADD
jQuery.validator.addMethod("checkDoubleTen",function(value,element){
	return this.optional(element) || /^[1-9]([0-9]{0,7})$|^[1-9]([0-9]{0,7})(\.[0-9])?$|^[1-9]([0-9]{0,7})(\.[0-9][0-9]?)?$|^0(\.[0-9][0-9]?)?$/.test(value);
},"请输入最长8位的整数，精度最多为两位");

jQuery.validator.addMethod("eightPointFour",function(value,element){
	return this.optional(element) || /^[1-9]([0-9]{0,3})$|^[1-9]([0-9]{0,3})(\.[0-9]{0,3}?)?$|^[1-9]([0-9]{0,3})(\.[0-9][0-9][0-9][0-9]?)?$|^0(\.[0-9][0-9][0-9][0-9]?)?$/.test(value);
},"请输入最长4位的整数，精度最多为四位");
jQuery.validator.addMethod("TwoPointTwo",function(value,element){
	return this.optional(element) || /^[1-9]([0-9]{0,1})$|^[1-9]([0-9]{0,1})(\.[0-9])?$|^[1-9]([0-9]{0,1})(\.[0-9][0-9]?)?$|^0(\.[0-9][0-9]?)?$/.test(value);
},"请输入最长2位的整数，精度最多为两位");

//检验是否全为数字,并且数字在0-5之内的数字，包括0和5
jQuery.validator.addMethod("isRMBGoldPPNum", function(value, element) {
	var reg = /^(0|[1-5])$/; 
	return this.optional(element) || reg.test(value);
}, "请输入0-5的数字!");
	
//验证小于等于10之内的数字
jQuery.validator.addMethod("isDollarSilverNum", function(value, element) {
	var reg = /^((0|[1-9])|10)$/; 
	return this.optional(element) || reg.test(value);
}, "请输入0-10的数字!");
//验证小于等于50之内的数字
jQuery.validator.addMethod("isDollarGoldNum", function(value, element) {
	var reg = /^((0|[1-9])|((1|2|3|4)[0-9])|50|)$/; 
	return this.optional(element) || reg.test(value);
}, "请输入0-50的数字!");
//验证大于等于10的数字
jQuery.validator.addMethod("greaterTen", function(value, element) {
	var reg =  /^(([1-9][0-9]+))$/; 
	return this.optional(element) || reg.test(value);
}, "请输入大于或等于10的数字!");


//检验非负整数
jQuery.validator.addMethod("NonnegativeIntegerCheck", function(value, element) {
	var reg = /^([1-9]\d*)|0$/; 
	return this.optional(element) || reg.test(value);
}, "请输入非负整数");

/*****ckb******/
jQuery.validator.addMethod("testFloatNumber", function(value, element) {
	var v1 = this.optional(element) || /^(\d{1,10}\.\d{1,2})$/.test(value);
	var v2 = this.optional(element) ||/^(\d{1,10})$/.test(value);
	return v1||v2;
},"请输入正确的格式，如：12.34或12");

/******ckb***********/
jQuery.validator.addMethod("priceModelVal", function(value, element) {
	var reg =  /^(([0-9]|[a-zA-Z]){4})$/; 
	return this.optional(element) || reg.test(value);
}, "只能为数字,大小写字母组成的四位数!");

jQuery.validator.addMethod("checkComplexPassword", function(value, element) {
	return this.optional(element) || valPassword(value);
}, "用户密码需要 包含大写字母、小写字母、数字、特殊字符 四项中的三项即可!");

function valPassword(val){
	var numflag=0;
	var smallflag=0;
	var bigflag=0;
	var specialflag=0;
	
	var reg1=/^[0-9]*$/;
	var reg2=/^[a-z]*$/;
	
	var reg3=/^[A-Z]*$/;
	
	for(var i = 0; i <val.length; i ++)   
	{   
		
//		alert(val.substr(i, 1));
		if(reg1.test(val.substr(i, 1)))
			numflag=1;
		if(reg2.test(val.substr(i, 1)))
			smallflag=1;
		if(reg3.test(val.substr(i, 1)))
			bigflag=1;
		var pattern = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?+—|{}；：”’]") 
		//此处填写所要过滤的特殊符号   
		//注意：修改####处的字符，其它部分不许修改.   
		//if(/^[^####]*$/.test(form.elements[i].value))    
//		if(/^[^`~!@#$%^&*()_-+={}\\[\\]\|?/><.,:;”’]*$/.test(val.substr(i, 1)))
//			specialflag = 1;  
		
		if(pattern.test(val.substr(i, 1)))
			specialflag = 1;  
	}  
	
//	alert(numflag+smallflag+bigflag+specialflag);
	 var  total= 	numflag+smallflag+bigflag+specialflag;
	 if(total>2)
		 return true;
	 else return false;
}
/**广发需求要求更改**/
//检验非负整数--史保密
jQuery.validator.addMethod("ResourceNonnegativeIntegerCheck", function(value, element) {
	var reg = /^([1-9]\d*)|0$/; 
	return this.optional(element) || reg.test(value);
}, "请输入0至100之间的数字！");

//验证证件号码--史保密
jQuery.validator.addMethod("checkEveryCard", function(value, element) {
	var reg =/^[A-Za-z0-9]+$/; 
	return this.optional(element) || reg.test(value);
}, "请输入正确的证件号！");

/* 格式化--将金额保留2为小数 */
function changeTwoDecimal_f(x) {
	var f_x = parseFloat(x);
	if (isNaN(f_x)) {
		//alert('金额格式化失败，原因可能是当前格式化的金额是null或者为空或者是非法格式的金额');
		return false;
	}
	var f_x = Math.round(x * 100) / 100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}

/* 验证url */
jQuery.validator.addMethod("urlCheck", function(value, element) {
	/*
	 * 此段验证用于验证http://开头的url
	 * var reg = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\- &amp;_~`@[\]\':+!]*([^&lt;&gt;\"])*$/; 
	 * */
	
	/* 
	 * 此段验证用于验证newtouch菜单的配置，必须满足基本的格式，如："/"+字符串(字符串可由字母、数字或字母和数字组成)+"."+字符串(字符串可由字母、数字或字母和数字组成) 
	 * */
	var reg = /^\/[A-Za-z0-9\/]+\.[A-Za-z0-9]+$/; 
	return this.optional(element) || reg.test(value);
}, "请输入合法的url");

jQuery.validator.addMethod("passwordCheck", function(value, element) {
	var reg = /^(([0-9]|[a-zA-Z]){6})$/; 
	return this.optional(element) || reg.test(value);
}, "请输入由数字或字母组成的6位密码！");

jQuery.validator.addMethod("phoneCheck", function(value, element) {
	var reg = /^[(0-9)|-]{1,20}$/; 
	return this.optional(element) || reg.test(value);
}, "请输入数字或下划线!");
//校验100位 nj
jQuery.validator.addMethod("hundredLength", function(value, element) {
	return this.optional(element) || /^(.){0,100}$/.test(value);
},"请输入长度小于100位的字符串");

//验证10位及10位以内的整数 包括0 author nj
jQuery.validator.addMethod("isNumTenLength", function(value, element) {
	var reg =/^(\d){1,10}$/; 
	return this.optional(element) || reg.test(value);
}, "请输入十位以内的整数，包括0");
//校验28位 nj
jQuery.validator.addMethod("twentyEightLength", function(value, element) {
	return this.optional(element) || /^(.){0,28}$/.test(value);
},"请输入长度小于28位的字符串，包括28位");
//校验20位 nj
jQuery.validator.addMethod("twentyLength", function(value, element) {
	return this.optional(element) || /^(.){0,20}$/.test(value);
},"请输入长度小于20位的字符串，包括20位");

