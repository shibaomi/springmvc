package com.study.springmvc.dal.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 数据字典表
 * @author shibaomi
 *
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
	//数据字典可操作状态，0可修改不可删除，1可修改可删除，2不可修改
	private String dictOpertState;
	//数据字典类型，0系统参数1用户参数
	private String dictType;
}
