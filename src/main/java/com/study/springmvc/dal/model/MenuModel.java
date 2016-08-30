package com.study.springmvc.dal.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

public @Data class MenuModel {
	//无意义主键
	private String id;
	//菜单名称
	private String menuName;
	//菜单对应的url
	private String menuUrl;
	//菜单排序
	private String menuOrder;
	//菜单信息描述
	private String menuDesc;
	//父菜单id
	private String parentId;
	//菜单类型，01相对路径，02绝对路径
	private String menuType;
	//菜单属于系统
	private String ownSystem;
	//状态标识0正常1删除2停止使用
	private String sts;
	//隐藏显示菜单标识，0显示，1隐藏
	private String showSts;
	//菜单图标类型，0图标，1class样式，9没有
	private String icoType;
	//图标对应的路径或class
	private String icoMsg;
	//菜单级别
	private String menuLevel;
	//子菜单
	private List<MenuModel> childMenu=new ArrayList<MenuModel>();
}
