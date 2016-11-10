package com.study.springmvc.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.springmvc.common.busiException.BusiException;
import com.study.springmvc.common.constant.Constant.DictOpertState;
import com.study.springmvc.common.constant.Constant.DictState;
import com.study.springmvc.common.db.page.QueryCondition;
import com.study.springmvc.common.utils.Page;
import com.study.springmvc.common.utils.SysUser;
import com.study.springmvc.dal.faces.DictDao;
import com.study.springmvc.dal.model.DictModel;
import com.study.springmvc.dal.model.UserModel;
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

	@Override
	public int deleteDictModel(String id) {
		DictModel dict=dictDao.queryDictModelById(id);
		//数据是否查到
		if(dict==null){
			log.info("id="+id+"的数据字典未查到");
			throw new BusiException("id="+id+"的数据字典未查到");
		}
		//状态是否已删除
		if(DictState.DETELE.val().equals(dict.getDictState())){
			log.info("id="+id+"的数据字典已删除");
			throw new BusiException("id="+id+"的数据字典已删除");
		}
		//操作状态是否可删除
		if(!DictOpertState.ANY.val().equals(dict.getDictOpertState())){
			log.info("id="+id+"的数据字典不可删除");
			throw new BusiException("id="+id+"的数据字典不可删除");
		}
		//用户操作权限判断，待完善
		UserModel user=SysUser.getUser();
		Map<String,Object>map=new HashMap<String,Object>();
		map.put("id", id);
		map.put("dictState", DictState.DETELE.val());
		map.put("updateBy", "");
		return dictDao.updateDictStateAndType(map);
	}
}
