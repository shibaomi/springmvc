package com.study.springmvc.dal.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.study.springmvc.dal.model.UserModel;

public class UserMapper implements RowMapper<UserModel>{//

	public UserModel mapRow(ResultSet result, int arg1) throws SQLException {
		// TODO Auto-generated method stub
		UserModel user=new UserModel();
		user.setId(result.getLong("ID"));
		user.setUserNo(result.getString("USER_NO"));
		user.setRealName(result.getString("REAL_NAME"));
		user.setNickName(result.getString("NICK_NAME"));
		user.setCertiType(result.getString("CERTI_TYPE"));
		user.setCertiNo(result.getString("CERTI_NO"));
		user.setMobile(result.getString("MOBILE"));
		user.setPhone(result.getString("PHONE"));
		user.setEmail(result.getString("EMAIL"));
		user.setAddress(result.getString("ADDRESS"));
		user.setStatus(result.getString("STATUS"));
		user.setPassword(result.getString("PASSWORD"));
		user.setDescription(result.getString("DESCRIPTION"));
		user.setUniversity(result.getString("UNIVERSITY"));
		user.setDegree(result.getString("DEGREE"));
		user.setCreateTime(result.getTimestamp("CREATE_TIME"));
		user.setCreateByName(result.getString("CREATE_BY_NAME"));
		user.setCreateById(result.getLong("CREATE_BY_ID"));
		user.setUpdateTime(result.getTimestamp("UPDATE_TIME"));
		user.setUpdateByName(result.getString("UPDATE_BY_NAME"));
		user.setUpdateById(result.getLong("UPDATE_BY_ID"));
		user.setOrganId(result.getLong("ORGAN_ID"));
		user.setOrganName(result.getString("ORGAN_NAME"));
		user.setCountry(result.getString("COUNTRY"));
		user.setProvince(result.getString("PROVINCE"));
		user.setCity(result.getString("CITY"));
		user.setCountyOrArea(result.getString("COUNTY_AREA"));
		user.setTownOrStreet(result.getString("TOWN_STREET"));
		user.setVillageOrRoad(result.getString("VILLAGE_ROAD"));
		return user;
	}
}
