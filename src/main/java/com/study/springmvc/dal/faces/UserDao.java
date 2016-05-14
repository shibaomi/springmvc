package com.study.springmvc.dal.faces;

import com.study.springmvc.dal.model.UserModel;

public interface UserDao {
	
	public UserModel queryByIdNo(String idNo);
	
	public int saveUserModel(UserModel user);

}
