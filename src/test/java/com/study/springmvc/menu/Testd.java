package com.study.springmvc.menu;

import static org.junit.Assert.assertTrue;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.study.springmvc.base.BaseTest;
import com.study.springmvc.service.faces.TestService;

public class Testd extends BaseTest{
	
	@Autowired
	private TestService testService;
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
			testService.testService();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		assertTrue("test", true);
	}

}
