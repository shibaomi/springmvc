package com.study.springmvc.dal.impl;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.study.springmvc.common.db.dao.jdbc.BaseDao_jdbc;
import com.study.springmvc.common.db.page.QueryCondition;
import com.study.springmvc.common.utils.Page;
import com.study.springmvc.dal.faces.DictDao;
import com.study.springmvc.dal.mapper.DictMapper;
import com.study.springmvc.dal.model.DictModel;

import lombok.Getter;
import lombok.Setter;

public class DictDaoImpl_jdbc implements DictDao {

	@Setter
	@Getter
	private BaseDao_jdbc baseDao;

	public List<DictModel> queryListDictModel() {
		String QUERY_BY_ID = "select * from t_sys_dict";
		try {
			List<DictModel> dictList = baseDao.getJdbcTemplate().query(QUERY_BY_ID, new DictMapper());
			return dictList;
		} catch (DataAccessException e) {
			System.out.println(e);
		}
		return null;
	}

	public int saveDictModel(DictModel dict) {
		String QUERY_BY_ID = "insert into t_sys_dict(code,value) value(?,?)";
		int num = 0;
		try {
			num = baseDao.getJdbcTemplate().update(QUERY_BY_ID, new Object[] { dict.getCode(), dict.getValue() });
		} catch (DataAccessException e) {
			System.out.println(e);
		}
		return num;
	}

	public int updateDictModel(DictModel dict) {
		// TODO Auto-generated method stub
		return 0;
	}

	public Page queryPageDictModel(QueryCondition query) {
		// TODO Auto-generated method stub
		return null;
	}

}
