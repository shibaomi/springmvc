package com.study.springmvc.dal.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.study.springmvc.dal.model.UserModel;

public class UserMapper implements RowMapper<UserModel>{//

	public UserModel mapRow(ResultSet result, int arg1) throws SQLException {
		// TODO Auto-generated method stub
		UserModel user=new UserModel();
		user.setUserNo(result.getString("user_id"));;
		user.setName(result.getString("user_name"));
		return user;
	}


}
