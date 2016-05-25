package com.study.springmvc.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.time.DateFormatUtils;

import com.study.springmvc.dal.faces.DictDao;
import com.study.springmvc.dal.faces.UserDao;
import com.study.springmvc.dal.model.DictModel;
import com.study.springmvc.dal.model.UserModel;
import com.study.springmvc.service.faces.TestServiceXml;

import lombok.Getter;
import lombok.Setter;
public class TestServiceXmlImpl implements TestServiceXml{

	@Setter
	@Getter
	private UserDao userDao;
	
	@Setter
	@Getter
	private DictDao dictDao;
	
	/**
	 * spring事物管理默认只对RuntimeException异常回滚，其他事物不回滚
	 */
	public void testService() throws Exception {
		UserModel user=userDao.queryById(1l);
		System.out.println("user="+user);
		UserModel saveUser=new UserModel();
		saveUser.setUserNo(DateFormatUtils.format(new Date(), "yyyyMMddHHmmss"));
//		saveUser.setName(DateFormatUtils.format(new Date(), "yyyyMMddHHmmss"));
		userDao.saveUserModel(saveUser);
		List<DictModel> dictList=dictDao.queryListDictModel();
		if(dictList!=null&&!dictList.isEmpty()){
			System.out.println(dictList.get(0));
		}
		if(dictList.size()>0){
			throw new Exception("test");
		}
		DictModel saveDictModel=new DictModel();
		saveDictModel.setCode(DateFormatUtils.format(new Date(), "yyyyMMddHHmmss"));
		saveDictModel.setValue(DateFormatUtils.format(new Date(), "yyyyMMddHHmmss"));
		dictDao.saveDictModel(saveDictModel);
	}

}
