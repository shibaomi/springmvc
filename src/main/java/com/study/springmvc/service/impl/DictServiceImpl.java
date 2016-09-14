package com.study.springmvc.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.springmvc.common.db.page.QueryCondition;
import com.study.springmvc.common.utils.Page;
import com.study.springmvc.dal.faces.DictDao;
import com.study.springmvc.dal.model.DictModel;
import com.study.springmvc.service.faces.DictService;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class DictServiceImpl implements DictService{

	@Autowired
	private DictDao dictDao;

	@Override
	public List<DictModel> queryListDictModel(Map<String, Object> map) {
		return dictDao.queryListDictModel(map);
	}

	@Override
	public int saveOrUpdateDictModel(DictModel dict) {
		return 0;
	}

	@Override
	public Page<DictModel> queryPageDictModel(QueryCondition query) {
		return dictDao.queryPageDictModel(query);
	}
}
