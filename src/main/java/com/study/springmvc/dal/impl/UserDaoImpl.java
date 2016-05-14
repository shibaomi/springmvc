package com.study.springmvc.dal.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import com.study.springmvc.common.db.dao.mybatis.BaseDao_Mybatis;
import com.study.springmvc.dal.faces.UserDao;
import com.study.springmvc.dal.mapper.UserMapper;
import com.study.springmvc.dal.model.UserModel;

@Repository
public class UserDaoImpl implements UserDao{
	@Autowired
	private BaseDao_Mybatis baseDao;

	public UserModel queryByIdNo(String idNo) {
		// TODO Auto-generated method stub
		String QUERY_BY_ID="select * from t_sys_user";
		try{
			List<UserModel> userList=baseDao.getJdbcTemplate().query(QUERY_BY_ID, new UserMapper());
			if(userList!=null&&!userList.isEmpty()){
				return userList.get(0);
			}
		}catch(DataAccessException e){
			System.out.println(e);
		}
		return null;
	}

	public int saveUserModel(UserModel user) {
		// TODO Auto-generated method stub
		return baseDao.insert("UserModelMapper.insertUser", user);
	}

}
