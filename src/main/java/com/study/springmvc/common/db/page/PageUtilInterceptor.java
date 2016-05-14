package com.study.springmvc.common.db.page;

import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Properties;

import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.ibatis.executor.statement.PreparedStatementHandler;
import org.apache.ibatis.executor.statement.RoutingStatementHandler;
import org.apache.ibatis.executor.statement.SimpleStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.RowBounds;

import com.study.springmvc.common.utils.SQLDialect;

import lombok.Getter;
import lombok.Setter;

/**
 * MyBatis的持物理分页sql执行拦截器
 */

@Intercepts({
		@Signature(type = StatementHandler.class, method = "prepare", args = { Connection.class }),
		@Signature(type = StatementHandler.class, method = "parameterize", args = { Statement.class }) })
public class PageUtilInterceptor implements Interceptor {

	@Setter
	@Getter
	private SQLDialect sqlDialect;
	
	/**
	 * 拦截器方法入口
	 */
	public Object intercept(Invocation invocation) throws Throwable {
		Method m = invocation.getMethod();
		if ("prepare".equals(m.getName())) {
			return prepare(invocation);
		} else if ("parameterize".equals(m.getName())) {
			return parameterize(invocation);
		}
		return invocation.proceed();
	}

	/**
	 * 拦截方法prepare
	 * @param invocation
	 * @return
	 * @throws Throwable
	 */
	private Object prepare(Invocation invocation) throws Throwable {
		StatementHandler statement = (StatementHandler) invocation.getTarget();
		if (statement instanceof RoutingStatementHandler) {
			statement = (StatementHandler) FieldUtils.readDeclaredField(statement, "delegate", true);
		}
		RowBounds rds = (RowBounds) FieldUtils.readField(statement, "rowBounds", true);
		if (hasBounds(rds)) {
			BoundSql bsql = statement.getBoundSql();
			PageRowBounds page  = (PageRowBounds)FieldUtils.readField(statement, "rowBounds", true);
			if (statement instanceof SimpleStatementHandler) {
				String psql= sqlDialect.getPageSql(bsql.getSql(),rds.getOffset(), rds.getLimit(),SQLDialect.SQL_PT,page);;
				FieldUtils.writeField(bsql, "sql", psql, true);
			} else if (statement instanceof PreparedStatementHandler) {
				String psql= sqlDialect.getPageSql(bsql.getSql(),rds.getOffset(), rds.getLimit(),SQLDialect.SQL_YBJ,page);
				FieldUtils.writeField(bsql, "sql", psql, true);
			}

		}
		return invocation.proceed();
	}
	
	/**
	 * 拦截方法parameterize
	 * @param invocation
	 * @return
	 * @throws Throwable
	 */
	private Object parameterize(Invocation invocation) throws Throwable {
		Statement statement = (Statement) invocation.getArgs()[0];
		Object rtn = invocation.proceed();
		if (statement instanceof PreparedStatement) {
			PreparedStatement ps = (PreparedStatement) statement;
			
			StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
			if (statementHandler instanceof RoutingStatementHandler) {
				statementHandler = (StatementHandler) FieldUtils.readField(statementHandler, "delegate", true);
			}
			RowBounds rds = (RowBounds) FieldUtils.readField(statementHandler, "rowBounds", true);
			if (hasBounds(rds)) {
				BoundSql boundSql = statementHandler.getBoundSql();
				int parameterSize = boundSql.getParameterMappings().size();
				sqlDialect.setLimitParamters(ps, parameterSize,rds.getOffset(), rds.getLimit());
				FieldUtils.writeField(rds, "offset",RowBounds.NO_ROW_OFFSET, true);
				FieldUtils.writeField(rds, "limit",RowBounds.NO_ROW_LIMIT, true);
			}
		}
		return rtn;
	}
	
	private boolean hasBounds(RowBounds rowBounds) {
		return (rowBounds != null && rowBounds.getLimit() > 0 && rowBounds
				.getLimit() < RowBounds.NO_ROW_LIMIT);
	}

	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}

	public void setProperties(Properties properties) {
	}
}
