package com.study.springmvc.dal.faces;

import com.study.springmvc.dal.model.UserModel;

public interface UserDao {
	/**
	 * 根据用户id查询用户信息
	 * @param idNo
	 * @return
	 */
	public UserModel queryById(Long id);
	
	/**
	 * 保存用户信息
	 * @param user
	 * @return
	 */
	public int saveUserModel(UserModel user);
	
	/**
	 * 更新用户信息
	 * @param user
	 * @return
	 */
	public int updateUserModel(UserModel user);
	
	/**
	 * 删除用户信息
	 * @param id
	 * @return
	 */
	public int deleteUserById(Long id);

}
