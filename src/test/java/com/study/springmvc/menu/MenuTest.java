package com.study.springmvc.menu;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.study.springmvc.base.BaseTest;
import com.study.springmvc.dal.model.MenuModel;
import com.study.springmvc.service.faces.MenuService;

public class MenuTest extends BaseTest{
	
	@Autowired
	private MenuService menuService;;
	@Before
	public void setContext(){
		System.out.println("init");
	}
	@After
	public void doClose(){
		System.out.println("close");
	}

	/*@Test(timeout=60000,expected=Exception.class)
	public void testBat() {
		
		try {
			List<MenuModel> l=menuService.queryListMenuModel(null);
			System.out.println(l.size());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}*/
	
	@Test(timeout=60000,expected=Exception.class)
	public void testBat() {
		
		try {
			List<MenuModel> l=menuService.queryListMenuModel(null);
			System.out.println(l.size());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
