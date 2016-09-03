package com.study.springmvc.dal.model;

import lombok.Data;

/**
 * 基础model，存所有表公共信息
 * @author shibaomi
 */
public @Data class BaseModel {
	//创建时间
	private String createTime;
	//创建人
	private String createBy;
	//修改时间
	private String updateTime;
	//修改人id
	private String updateBy;

}
