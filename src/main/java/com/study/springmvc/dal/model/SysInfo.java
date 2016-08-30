package com.study.springmvc.dal.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

/**
 * 系统描述
 * @author shibaomi
 */
public @Data class SysInfo {
	//系统名称
	private String systemName;
	//系统描述
	private String systemDesc;
	//系统菜单
	private List<MenuModel> childMenu=new ArrayList<MenuModel>();
}
