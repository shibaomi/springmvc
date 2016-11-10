package com.study.springmvc.common.constant;

public class Constant {
	public static final String OTHER="2";
	
	public static final String YES="1";
	
	public static final String NO="0";
	
	/**
	 * 数据字典状态常量表，0启用1停用2删除
	 */
	public enum DictStateConst {
		ASC, DESC
	}
	/**
	 * 数据字典状态常量，0启用1停用2删除
	 */
	public enum DictState{
		/**
		 * 数据字典状态常量，0启用1停用2删除
		 */
		USE("0"),
		/**
		 * 数据字典状态常量，0启用1停用2删除
		 */
		STOP("1"),
		/**
		 * 数据字典状态常量，0启用1停用2删除
		 */
		DETELE("2");
		public String val() {
			return this.val;
		}
		private DictState(String val) {
			this.val = val;
		}
		private String val;
	}
	
	/**
	 * 数据字典操作状态常量，0可修改不可删除，1可修改可删除，2不可修改
	 */
	public enum DictOpertState{
		/**
		 * 数据字典操作状态常量，0可修改不可删除，1可修改可删除，2不可修改
		 */
		NODELETE("0"),
		/**
		 * 数据字典操作状态常量，0可修改不可删除，1可修改可删除，2不可修改
		 */
		ANY("1"),
		/**
		 * 数据字典操作状态常量，0可修改不可删除，1可修改可删除，2不可修改
		 */
		NO("2");
		public String val() {
			return this.val;
		}
		private DictOpertState(String val) {
			this.val = val;
		}
		private String val;
	}
	
	/**
	 * 数据字典操数据类型，0系统参数1用户参数
	 */
	public enum DictType{
		/**
		 * 数据字典操数据类型，0系统参数1用户参数
		 */
		SYS_P("0"),
		/**
		 * 数据字典操数据类型，0系统参数1用户参数
		 */
		USER_P("1");
		public String val() {
			return this.val;
		}
		private DictType(String val) {
			this.val = val;
		}
		private String val;
	}
}
