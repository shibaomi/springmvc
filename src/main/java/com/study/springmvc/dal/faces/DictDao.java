package com.study.springmvc.dal.faces;

import java.util.List;
import java.util.Map;

import com.study.springmvc.common.db.page.QueryCondition;
import com.study.springmvc.common.utils.Page;
import com.study.springmvc.dal.model.DictModel;

public interface DictDao {
	public List<DictModel> queryListDictModel(Map<String, Object> map);
	
	public int saveDictModel(DictModel dict);
	
	public int updateDictModel(DictModel dict);
	
	public Page<DictModel> queryPageDictModel(QueryCondition query);
}
