package com.study.springmvc.dal.faces;

import java.util.List;
import java.util.Map;

import com.study.springmvc.dal.model.MenuModel;

public interface MenuDao {
	public List<MenuModel> queryListMenuModel(Map<String,Object> map);
	
	public int addDictModel(MenuModel menu);
	
	public int updateMenuModel(MenuModel menu);
	
}
