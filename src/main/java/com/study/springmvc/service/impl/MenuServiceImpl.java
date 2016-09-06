package com.study.springmvc.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.springmvc.common.busiException.BusiException;
import com.study.springmvc.dal.faces.MenuDao;
import com.study.springmvc.dal.model.MenuModel;
import com.study.springmvc.dal.model.SysInfo;
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
	public Map<String,SysInfo> queryListSysMenu(Map<String, Object> map) {
		//菜单查询
		List<MenuModel> listMenu=this.menuDao.queryListMenuModel(map);
		if(listMenu==null||listMenu.size()<1){
			return null;
		}
		//系统菜单详情
		Map<String,SysInfo> sysMap=new HashMap<String,SysInfo>();
		for(MenuModel menu:listMenu){
			SysInfo sys=sysMap.get(menu.getOwnSystem());
			if(sys==null){
				//map中不存在该系统的信息则新建一个系统信息
				sys=new SysInfo();
				sysMap.put(menu.getOwnSystem(), sys);
			}
			if(StringUtils.isEmpty(menu.getParentId())){
				//不存在父菜单id，默认为一级菜单
				sys.getChildMenu().add(menu);
			}else{
				//非一级菜单则把该菜单添加到父菜单下面
				boolean checkData=false;
				for(int i=0;i<listMenu.size();i++){
					MenuModel m=listMenu.get(i); 
					if(menu.getParentId().equals(m.getId())){
						m.getChildMenu().add(menu);
						checkData=true;
						break;
					}
				}
				if(!checkData){
					log.error("id="+menu.getId()+"的菜单数据有误");
					throw new BusiException("id="+menu.getId()+"的菜单数据有误");
				}
			}
		}
		return sysMap;
	}

	@Override
	public int saveOrUpdateMenuModel(MenuModel menu) {
		if(menu==null){
			log.error("未发现要保存的菜单信息");
			throw new BusiException("未发现要保存的菜单信息");
		}
		if(!StringUtils.isNotEmpty(menu.getParentId())){
			MenuModel parentMenu=menuDao.queryMenuModelById(menu.getParentId());
			if(parentMenu==null){
				log.error("父菜单id为："+menu.getParentId()+"的菜单信息不存在");
				throw new BusiException("父菜单id为："+menu.getParentId()+"的菜单信息不存在");
			}
		}
		if(StringUtils.isEmpty(menu.getId())){
			//新增菜单信息
			return menuDao.addDictModel(menu);
		}else{
			//更新菜单信息
			MenuModel m=menuDao.queryMenuModelById(menu.getId());
			if(m==null){
				log.error("菜单id为："+menu.getParentId()+"的菜单信息不存在");
				throw new BusiException("菜单id为："+menu.getParentId()+"的菜单信息不存在");
			}
			return menuDao.updateMenuModel(menu);
		}
	}
}
