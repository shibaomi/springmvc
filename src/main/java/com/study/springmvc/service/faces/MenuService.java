package com.study.springmvc.service.faces;

import java.util.List;
import java.util.Map;

import com.study.springmvc.dal.model.MenuModel;
import com.study.springmvc.dal.model.SysInfo;

public interface MenuService {
	
	//
	public List<MenuModel> queryListMenuModel(Map<String,Object> map);
	
	/***
	 * 保存或更新菜单信息
	 * @param menu
	 */
	public int saveOrUpdateMenuModel(MenuModel menu);
	
	/**
	 * 查看系统菜单详情
	 * @param map
	 * @return map:key---系统关键值，value---系统菜单详情
	 */
	public Map<String,SysInfo> queryListSysMenu(Map<String,Object> map);

}
