package com.study.springmvc.base;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@ContextConfiguration("/spring-test.xml")
@RunWith(SpringJUnit4ClassRunner.class)
public class BaseTest {
	@SuppressWarnings("unused")
	@Autowired
	private ApplicationContext applicationContext;
}
