package com.study.springmvc.service.impl;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.transaction.annotation.Transactional;

import com.study.springmvc.dal.faces.DictDao;
import com.study.springmvc.dal.faces.UserDao;
import com.study.springmvc.dal.model.DictModel;
import com.study.springmvc.dal.model.UserModel;
import com.study.springmvc.service.faces.TestServiceAnnotation;

import lombok.Getter;
import lombok.Setter;
public class TestServiceAnnotationImpl implements TestServiceAnnotation{

	@Setter
	@Getter
	private UserDao userDao;
	
	@Setter
	@Getter
	private DictDao dictDao;
	
	/**
	 * spring事物管理默认只对RuntimeException异常回滚，其他事物不回滚
	 */
	@Transactional(rollbackForClassName={"Exception","RuntimeException"},readOnly=true)
	public void testService() throws Exception {
		UserModel user=userDao.queryById(1l);
		System.out.println("user="+user);
		UserModel saveUser=new UserModel();
		saveUser.setUserNo(DateFormatUtils.format(new Date(), "yyyyMMddHHmmss"));
//		saveUser.setName(DateFormatUtils.format(new Date(), "yyyyMMddHHmmss"));
		userDao.saveUserModel(saveUser);
//		List<DictModel> dictList=dictDao.queryListDictModel();
//		if(dictList!=null&&!dictList.isEmpty()){
//			System.out.println(dictList.get(0));
//		}
//		if(dictList.size()>0){
//			throw new SQLException("test");
//		}
		DictModel saveDictModel=new DictModel();
//		saveDictModel.setCode(DateFormatUtils.format(new Date(), "yyyyMMddHHmmss"));
//		saveDictModel.setValue(DateFormatUtils.format(new Date(), "yyyyMMddHHmmss"));
		dictDao.saveDictModel(saveDictModel);
	}

}
