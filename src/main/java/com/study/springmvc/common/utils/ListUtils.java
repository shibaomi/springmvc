package com.study.springmvc.common.utils;

import java.util.List;

public class ListUtils {
	
	public static boolean isEmpty(List<?> paramt){
		return paramt==null||paramt.isEmpty();
	}
	
	public static boolean isNotEmpty(List<?> paramt){
		return paramt!=null&&!paramt.isEmpty();
	}

}
