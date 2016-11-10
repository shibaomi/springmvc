package com.study.springmvc.menu;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.study.springmvc.base.BaseTest;
import com.study.springmvc.service.faces.DictService;

public class DictTest extends BaseTest{
	
	@Autowired
	private DictService dictService;
	@Before
	public void setContext(){
		System.out.println("init");
	}
	@After
	public void doClose(){
		System.out.println("close");
	}
	
	@Test(timeout=60000,expected=Exception.class)
	public void testBat() {
		
		try {
			dictService.deleteDictModel("1");
			System.out.println("delete success");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
