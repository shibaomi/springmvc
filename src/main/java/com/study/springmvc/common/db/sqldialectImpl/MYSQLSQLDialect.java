package com.study.springmvc.common.db.sqldialectImpl;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.study.springmvc.common.db.page.PageRowBounds;
import com.study.springmvc.common.utils.SQLDialect;
import com.study.springmvc.common.utils.SqlUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MYSQLSQLDialect implements SQLDialect {

	public String getPageSql(String sql, int offset, int limit, String sqlType,PageRowBounds page) {
		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder.append(sql);
		if(page!=null&&page.isOrderByFlag()){
			if(SqlUtils.match(sql)){
				log.warn("sql里面已经包括了order by语句，为了不影响性能，查询语句中设置的order by不生效sql={}",sql);
			}else{
				sqlBuilder.append(" ").append(page.getOrderBy());
			}
		}
		if (SQLDialect.SQL_YBJ.equals(sqlType)) {
	        sqlBuilder.append(" limit ?,?");
		} else {
	        sqlBuilder.append(" limit ").append(offset).append(",").append(limit);
		}
		log.debug("convert sql={}",sqlBuilder);
		return sqlBuilder.toString();
	}

	public void setLimitParamters(PreparedStatement ps, int parameterSize,
			int offset, int limit) throws SQLException {
		ps.setInt(parameterSize + 1, offset);
		ps.setInt(parameterSize + 2, limit);

	}

	/**
	 * mysql不支持sequence，需要自己实现
	 */
	public String getSeqSql(String seqName) {
		return null;
	}
}
