package com.study.springmvc.dal.impl;

import java.util.ArrayList;
import java.util.HashMap;
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

	public List<DictModel> queryListDictModel() {
		Map<String,Object> paramt=new HashMap<String,Object>();
		List<String>codeList=new ArrayList<String>();
		codeList.add("1");
		codeList.add("20160101170224");
		paramt.put("codeList", codeList);
//		paramt.put("code", "1");
//		paramt.put("value", "20160101170224");
		List<DictModel> dictList = baseDao.selectList("DictModelMapper.selectList",paramt);
		return dictList;
	}

	public int saveDictModel(DictModel dict) {
		return baseDao.insert("DictModelMapper.insertDict", dict);
	}

	public int updateDictModel(DictModel dict) {
		return baseDao.update("DictModelMapper.updateOther", dict);
	}

	public Page<DictModel> queryPageDictModel(QueryCondition query) {
		Page<DictModel> page=this.baseDao.selectPageList("DictModelMapper.selectPage", query);
		System.out.println(query); 
	    System.out.println(page); 
		return null;
	}
}
