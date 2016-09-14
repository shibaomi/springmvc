package com.study.springmvc.service.faces;

import java.util.List;
import java.util.Map;

import com.study.springmvc.common.db.page.QueryCondition;
import com.study.springmvc.common.utils.Page;
import com.study.springmvc.dal.model.DictModel;

public interface DictService {
	
	/***
	 * 查询数据字典列表
	 */
	public List<DictModel> queryListDictModel(Map<String,Object> map);
	
	/***
	 * 保存或更新数据字典信息
	 */
	public int saveOrUpdateDictModel(DictModel dict);
	
	/**
	 * 分页查询数据字典列表
	 */
	public Page<DictModel> queryPageDictModel(QueryCondition query);
}
