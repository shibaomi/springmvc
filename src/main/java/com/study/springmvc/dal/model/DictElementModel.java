package com.study.springmvc.dal.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 数据字典属性表
 * @author shibaomi
 *
 */
@EqualsAndHashCode(callSuper=false)
public @Data class DictElementModel extends BaseModel{
	//无意义主键
	private String id;
	//属性对应数据字典表中的字典id
	private String parentId;
	//属性代码
	private String eleCode;
	//属性对应的中文或英文名称
	private String eleName;
	//属性显示的排序
	private String eleOrder;
	//属性状态，0可修改不可删除，1可修改可删除，2不可修改
	private String eleState;
	//属性对外可视属性0可视，1不可视
	private String eleShow;
	//属性描述
	private String eleDesc;
}
