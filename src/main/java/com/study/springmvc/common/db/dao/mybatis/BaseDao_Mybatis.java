package com.study.springmvc.common.db.dao.mybatis;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.jdbc.core.JdbcTemplate;

import com.study.springmvc.common.db.page.PageRowBounds;
import com.study.springmvc.common.db.page.QueryCondition;
import com.study.springmvc.common.utils.Page;
import com.study.springmvc.common.utils.SqlUtils;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BaseDao_Mybatis extends SqlSessionTemplate {

	@Setter
	@Getter
	private JdbcTemplate jdbcTemplate;
	
	public BaseDao_Mybatis(SqlSessionFactory sqlSessionFactory) {
		super(sqlSessionFactory);
	}
	
	/**
	 * 分页查询
	 * @param <T>
	 * @param statement
	 * @param pform
	 * @param param
	 * @return
	 */
	public <T> Page<T> selectPageList(String statement, QueryCondition queryCondition) {
		try {
			int totalCount = getSelectCount(statement, queryCondition.getQueryCondition());
			Page<T> page = new Page<T>(totalCount,queryCondition.getPageSize(), queryCondition.getCurrPage());
			PageRowBounds pageParamt=PageRowBounds.getPageParamter(queryCondition);
			List<T> result = this.selectList(statement, queryCondition.getQueryCondition(), pageParamt);
			page.setResult(result);;
			return page;
		} catch (Exception e) {
			log.error("分页查询失败：",e);
			throw new RuntimeException( e);
		}
	}

	/**
	 * 获取mybatis Mapper文件中指定sql语句的总条数
	 * @param statement
	 * @param param
	 * @return
	 */
	public int getSelectCount(String statement, Object param) {
		MappedStatement mst = this.getConfiguration().getMappedStatement(statement);
		BoundSql bdsql = mst.getBoundSql(param);
		if(SqlUtils.match(bdsql.getSql())){
			log.warn("sql里面已经包括了order by语句，统计总数的时候可能会影响性能，建议去掉，sql={}",bdsql.getSql());
		}
		String countSql = "SELECT COUNT(*) FROM (" + bdsql.getSql() + ") a";
		log.debug("求总数sql:{}",countSql);
		int totalCount = 0;
		List<ParameterMapping> paraMapList = bdsql.getParameterMappings();
		if (paraMapList != null && paraMapList.size() > 0) {
			Map<String, Object> paramValMap = getParamMap(bdsql);
			// 构造查询参数
			List<Object> paramList = new ArrayList<Object>();
			for (int i = 0; i < paraMapList.size(); i++) {
				ParameterMapping pm = paraMapList.get(i);
				Object value = paramValMap.get(pm.getProperty());
				paramList.add(value);
			}
			totalCount = jdbcTemplate.queryForObject(countSql, Integer.class,paramList.toArray());
		} else {
			totalCount = jdbcTemplate.queryForObject(countSql, Integer.class);
		}
		return totalCount;
	}
	/**
	 * 从MYBATIS的参数对象里获取参数值
	 */
	@SuppressWarnings("unchecked")
	private Map<String, Object> getParamMap(BoundSql bdsql) {
		try {
			Map<String, Object> ymap = (Map<String, Object>) FieldUtils.readDeclaredField(bdsql, "additionalParameters", true);
			//
			Map<String, Object> retMap = new HashMap<String, Object>();
			for (String mkey : ymap.keySet()) {
				Object value = ymap.get(mkey);
				if (value instanceof Map) {
					retMap.putAll((Map<String, Object>) value);
				} else {
					retMap.put(mkey, value);
				}
			}
			return retMap;
		} catch (IllegalAccessException e) {
			log.error("mybatis参数获取失败：",e);
			throw new RuntimeException(e);
		}
	}
}
