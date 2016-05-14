package com.study.springmvc.dal.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.study.springmvc.dal.model.DictModel;

public class DictMapper implements RowMapper<DictModel>{//

	public DictModel mapRow(ResultSet result, int arg1) throws SQLException {
		// TODO Auto-generated method stub
		DictModel dict=new DictModel();
		dict.setCode(result.getString("code"));
		dict.setValue(result.getString("value"));
		return dict;
	}
}
