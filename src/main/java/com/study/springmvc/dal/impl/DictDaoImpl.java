package com.study.springmvc.dal.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.study.springmvc.common.db.dao.mybatis.BaseDao_Mybatis;
import com.study.springmvc.common.db.page.QueryCondition;
import com.study.springmvc.common.utils.Page;
import com.study.springmvc.dal.faces.DictDao;
import com.study.springmvc.dal.model.DictModel;


@Repository
public class DictDaoImpl implements DictDao {

	@Autowired
	private BaseDao_Mybatis baseDao;

	public int saveDictModel(DictModel dict) {
		return baseDao.insert("DictModelMapper.insertDict", dict);
	}

	public int updateDictModel(DictModel dict) {
		return baseDao.update("DictModelMapper.updateOther", dict);
	}

	public Page<DictModel> queryPageDictModel(QueryCondition query) {
		Page<DictModel> page=this.baseDao.selectPageList("DictModelMapper.selectList", query);
		return page;
	}

	@Override
	public List<DictModel> queryListDictModel(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DictModel queryDictModelById(String id) {
		return baseDao.selectOne("DictModelMapper.selectByKey", id);
	}

	@Override
	public int updateDictStateAndType(Map<String, Object> map) {
		return baseDao.update("DictModelMapper.updateStateAndType", map);
	}
}
