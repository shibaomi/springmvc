package com.study.springmvc.dal.faces;

import java.util.List;
import java.util.Map;

import com.study.springmvc.dal.model.MenuModel;

public interface MenuDao {
	public List<MenuModel> queryListMenuModel(Map<String,Object> map);
	
	public int addDictModel(MenuModel menu);
	
	public int updateMenuModel(MenuModel menu);
	
	/**
	 * 通过id查菜单详情
	 * @param Id
	 */
	public MenuModel queryMenuModelById(String Id);
	
}
