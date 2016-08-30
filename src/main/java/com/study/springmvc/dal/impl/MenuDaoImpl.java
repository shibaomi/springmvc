package com.study.springmvc.dal.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.study.springmvc.common.db.dao.mybatis.BaseDao_Mybatis;
import com.study.springmvc.dal.faces.MenuDao;
import com.study.springmvc.dal.model.MenuModel;

@Repository
public class MenuDaoImpl implements MenuDao {

	@Autowired
	private BaseDao_Mybatis baseDao;
	
	@Override
	public List<MenuModel> queryListMenuModel(Map<String,Object> map) {
		return baseDao.selectList("MenuModelMapper.selectList", map);
	}

	@Override
	public int addDictModel(MenuModel menu) {
		return baseDao.insert("MenuModelMapper.insertMenu", menu);
	}

	@Override
	public int updateMenuModel(MenuModel menu) {
		return baseDao.update("MenuModelMapper.updateMenu", menu);
	}

}
