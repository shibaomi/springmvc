package com.study.springmvc.dal.model;

import java.sql.Timestamp;

import lombok.Data;

public @Data class UserModel {
	// 无意义主键
	private Long id;
	// 用户编号
	private String userNo;
	// 真实姓名
	private String realName;
	// 昵称
	private String nickName;
	// 证件类型
	private String certiType;
	// 证件号码
	private String certiNo;
	// 手机号
	private String mobile;
	// 固话
	private String phone;
	// 邮箱
	private String email;
	// 地址
	private String address;
	// 状态，0停用，1正常，9删除
	private String status;
	// 密码
	private String password;
	// 描述
	private String description;
	// 大学
	private String university;
	// 学历
	private String degree;
	// 创建时间
	private Timestamp createTime;
	// 创建人名称
	private String createByName;
	// 创建人id
	private Long createById;
	// 上次修改时间
	private Timestamp updateTime;
	// 修改人名称
	private String updateByName;
	// 修改人id
	private Long updateById;
	// 所属机构或部门id
	private Long organId;
	// 所属机构名称
	private String organName;
	// 所属国家
	private String country;
	// 所在省或直辖市
	private String province;
	// 所属市
	private String city;
	// 所属县/区
	private String countyOrArea;
	// 乡镇/街道
	private String townOrStreet;
	// 村庄/路
	private String villageOrRoad;

}
