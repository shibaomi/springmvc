package com.study.springmvc.common.db.sqldialectImpl;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.study.springmvc.common.db.page.PageRowBounds;
import com.study.springmvc.common.utils.SQLDialect;
import com.study.springmvc.common.utils.SqlUtils;

import lombok.extern.slf4j.Slf4j;
@Slf4j
public class DB2SQLDialect implements SQLDialect {

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
			sqlBuilder.append("select * from ( select ROW_NUMBER() over() AS ROWNUM,a.* from ( ")
				.append(sql).append(" ) a ) where ROWNUM>=? and ROWNUM<=?");
		} else {
			sqlBuilder.append("select * from ( select ROW_NUMBER() over() AS ROWNUM,a.* from ( ")
				.append(sql).append(") a ) where ROWNUM>= ").append(offset)
				.append(" and ROWNUM<=").append(limit);
		}
		log.debug("convert sql={}",sqlBuilder);
		return sqlBuilder.toString();
	}

	public void setLimitParamters(PreparedStatement ps, int parameterSize,
			int offset, int limit) throws SQLException {
		ps.setInt(parameterSize + 1, offset);
		ps.setInt(parameterSize + 2, limit);

	}

	public String getSeqSql(String seqName) {
		return "VALUES NEXTVAL FOR " + seqName;
	}

}
