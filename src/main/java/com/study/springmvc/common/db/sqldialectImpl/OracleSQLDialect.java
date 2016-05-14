package com.study.springmvc.common.db.sqldialectImpl;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.study.springmvc.common.db.page.PageRowBounds;
import com.study.springmvc.common.utils.SQLDialect;


public class OracleSQLDialect implements SQLDialect {

	public String getPageSql(String sql, int offset, int limit, String sqlType,PageRowBounds page) {
		String ysql = "";
		if (SQLDialect.SQL_YBJ.equals(sqlType)) {
			ysql = "SELECT *  FROM (SELECT ROW_.*, ROWNUM ROWNUM_  FROM ("
					+ sql + ") ROW_ WHERE ROWNUM <= ?" + ") WHERE ROWNUM_ >= ?";
		} else {
			ysql = "SELECT *  FROM (SELECT ROW_.*, ROWNUM ROWNUM_  FROM ("
					+ sql + ") ROW_ WHERE ROWNUM <= " + limit
					+ ") WHERE ROWNUM_ >= " + offset;
		}
		return ysql;
	}

	public void setLimitParamters(PreparedStatement ps, int parameterSize,
			int offset, int limit) throws SQLException {
		ps.setInt(parameterSize + 1, limit);
		ps.setInt(parameterSize + 2, offset);
	}

	public String getSeqSql(String seqName) {
		String seqSql = "SELECT " + seqName + ".NEXTVAL from dual";
		return seqSql;
	}

}
