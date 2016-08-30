package com.study.springmvc.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.springmvc.dal.faces.MenuDao;
import com.study.springmvc.dal.model.MenuModel;
import com.study.springmvc.service.faces.MenuService;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class MenuServiceImpl implements MenuService{

	@Autowired
	private MenuDao menuDao;

	@Override
	public List<MenuModel> queryListMenuModel(Map<String,Object> map) {
		return this.menuDao.queryListMenuModel(map);
	}

	@Override
	public int addDictModel(MenuModel menu) {
		return this.menuDao.addDictModel(menu);
	}

	@Override
	public int updateMenuModel(MenuModel menu) {
		return this.menuDao.updateMenuModel(menu);
	}
	
}
