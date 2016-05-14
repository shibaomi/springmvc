package com.study.springmvc.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

public class SqlUtils {

	/**
	 * 查是否包含orderby的正则表达式
	 */
	private static final String orderOnlySqlReg=".*(?:(\\s+)order(\\s+)by(\\s+)).*";
	
	private static Pattern p = Pattern.compile(orderOnlySqlReg, Pattern.CASE_INSENSITIVE);

	public static boolean match(String sql) {
		if(StringUtils.isEmpty(sql))
			return false;
		Matcher sqlMatcher = p.matcher(sql);
		return sqlMatcher.matches();
	}
	
	public static void main(String[] args) {
		
		String s1="select * from t where s=1 group by s order by s";
		String s11="(select * from t where s=1 group by s order)";
		String s2="select * from t where s=1 group by s order by s union all select * from b where b=1 order by b";
		String s3="select * from t where s=1 group by s order by s union select * from b where b=1 order by b";
		String s4="select * from (select * from t where s=1 group by s order by ) b where b=1 order by b";
		System.out.println(match(s1));
		System.out.println(match(s11));
		System.out.println(match(s2));
		System.out.println(match(s3));
		System.out.println(match(s4));
        //(?:(regx))
	}

}
