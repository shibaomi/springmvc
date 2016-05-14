package com.study.springmvc.common.utils;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.study.springmvc.common.db.page.PageRowBounds;

public interface SQLDialect {

	/**
	 * 预编译的sql
	 */
	public static final String SQL_YBJ = "SQL_YBJ";

	/**
	 * 非预编译的sql
	 */
	public static final String SQL_PT = "SQL_PT";

	

	/**
	 * 得到特定数据库的分页查询sql语句
	 * 
	 * @param sql
	 *            查询sql语句
	 * @param offset
	 *            起始位置
	 * @param limit
	 *            取多少数据
	 * @return
	 */
	public String getPageSql(String sql, int offset, int limit,String sqlType,PageRowBounds page);

	/**
	 * 设置分页参数
	 * 
	 * @param ps
	 * @param parameterSize
	 * @param offset
	 * @param limit
	 * @throws SQLException
	 */
	public void setLimitParamters(PreparedStatement ps, int parameterSize,
			int offset, int limit) throws SQLException;

	/**
	 * 得到查询Sequences的sql语句
	 * 
	 * @param seqName
	 * @return
	 */
	public String getSeqSql(String seqName);

}
