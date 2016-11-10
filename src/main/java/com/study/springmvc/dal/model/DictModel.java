package com.study.springmvc.dal.model;

import com.study.springmvc.common.constant.Constant.DictOpertState;
import com.study.springmvc.common.constant.Constant.DictState;
import com.study.springmvc.common.constant.Constant.DictType;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 数据字典表
 * @author shibaomi
 */
@EqualsAndHashCode(callSuper=false)
public @Data class DictModel extends BaseModel{
	//无意义主键
	private String id;
	//数据字典对应的代码
	private String dictCode;
	//数据字典名称
	private String dictName;
	//数据字典详尽描述
	private String dictDesc;
	//数据字典状态，0启用1停用2删除
	private String dictState;
	//数据字典状态中文描述
	private String dictStateDesc;
	//数据字典可操作状态，0可修改不可删除，1可修改可删除，2不可修改
	private String dictOpertState;
	//数据字典可操作状态中文描述
	private String dictOpertStateDesc;
	//数据字典类型，0系统参数1用户参数
	private String dictType;
	//数据字典类型中文描述
	private String dictTypeDesc;
	
	public void setDictType(String dictType) {
		this.dictType=dictType;
		if(DictType.SYS_P.val().equals(this.dictType)){
			this.dictTypeDesc="系统参数";
		}else if(DictType.USER_P.val().equals(this.dictType)){
			this.dictTypeDesc="用户参数";
		}else{
			this.dictTypeDesc="未知参数";
		}
	}
	
	public void setDictState(String dictState) {
		this.dictState=dictState;
		if(DictState.USE.val().equals(this.dictState)){
			this.dictStateDesc="启用";
		}else if(DictState.STOP.val().equals(this.dictState)){
			this.dictStateDesc="停用";
		}else if(DictState.DETELE.val().equals(this.dictState)){
			this.dictStateDesc="删除";
		}else{
			this.dictStateDesc="未知状态";
		}
	}
	
	public void setDictOpertState(String dictOpertState) {
		this.dictOpertState=dictOpertState;
		if(DictOpertState.NODELETE.val().equals(this.dictOpertState)){
			this.dictOpertStateDesc="可修改不可删除";
		}else if(DictOpertState.ANY.val().equals(this.dictOpertState)){
			this.dictOpertStateDesc="可修改可删除";
		}else if(DictOpertState.NO.val().equals(this.dictOpertState)){
			this.dictOpertStateDesc="不可修改";
		}else{
			this.dictOpertStateDesc="操作状态未知";
		}
	}
}
