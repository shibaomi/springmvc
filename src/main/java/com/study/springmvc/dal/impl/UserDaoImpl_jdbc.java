package com.study.springmvc.dal.impl;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.study.springmvc.common.db.dao.jdbc.BaseDao_jdbc;
import com.study.springmvc.dal.faces.UserDao;
import com.study.springmvc.dal.mapper.UserMapper;
import com.study.springmvc.dal.model.UserModel;

import lombok.Getter;
import lombok.Setter;

public class UserDaoImpl_jdbc implements UserDao{
	
	@Setter
	@Getter
	private BaseDao_jdbc baseDao;

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
		String QUERY_BY_ID="insert into t_sys_user(user_id,user_name) value(?,?)";
		int num=0;
		try{
			num=baseDao.getJdbcTemplate().update(QUERY_BY_ID, new Object[]{user.getUserNo(),user.getName()});
		}catch(DataAccessException e){
			System.out.println(e);
		}
		return num;
	}

}
