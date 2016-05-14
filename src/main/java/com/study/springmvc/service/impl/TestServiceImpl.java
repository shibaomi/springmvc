package com.study.springmvc.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.springmvc.common.db.page.QueryCondition;
import com.study.springmvc.dal.faces.DictDao;
import com.study.springmvc.dal.faces.UserDao;
import com.study.springmvc.dal.model.UserModel;
import com.study.springmvc.service.faces.TestService;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class TestServiceImpl implements TestService{

	@Autowired
	private DictDao dictDao;
	
	@Autowired
	private UserDao userDao;
	
	/**
	 * spring事物管理默认只对RuntimeException异常回滚，其他事物不回滚
	 */
	public void testService() throws Exception {
		
		QueryCondition query=new QueryCondition();
		query.setPageSize(2);
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("code", 1);
		query.setQueryCondition(map);
		this.dictDao.queryPageDictModel(query);
		if(log.isInfoEnabled()){
			log.info("test sfl4j");
		}
		UserModel user=new UserModel();
		user.setName(DateFormatUtils.format(new Date(), "yyyyMMddHHmmss"));
		user.setUserNo(DateFormatUtils.format(new Date(), "yyyyMMddHHmmss"));
		Thread.sleep(50000);
		userDao.saveUserModel(user);
		throw new RuntimeException();
	}

	public void addService() throws Exception {
		// TODO Auto-generated method stub
		
	}

}
