package com.study.springmvc.dal.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.study.springmvc.common.db.dao.mybatis.BaseDao_Mybatis;
import com.study.springmvc.dal.faces.UserDao;
import com.study.springmvc.dal.model.UserModel;

@Repository
public class UserDaoImpl implements UserDao{
	@Autowired
	private BaseDao_Mybatis baseDao;
	
	private static String SELECT_BY_ID="UserModelMapper.selectByKey";
	private static String INSERT_SQL="UserModelMapper.insertUser";
	private static String UPDATE_SQL="UserModelMapper.updateUser";
	private static String DELETE_BY_ID="UserModelMapper.deleteByKey";

	public int saveUserModel(UserModel user) {
		return baseDao.insert(INSERT_SQL, user);
	}

	@Override
	public UserModel queryById(Long id) {
		return baseDao.selectOne(SELECT_BY_ID, id);
	}

	@Override
	public int updateUserModel(UserModel user) {
		return baseDao.update(UPDATE_SQL, user);
	}

	@Override
	public int deleteUserById(Long id) {
		return baseDao.delete(DELETE_BY_ID, id);
	}

}
