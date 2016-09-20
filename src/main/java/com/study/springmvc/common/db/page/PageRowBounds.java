package com.study.springmvc.common.db.page;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.RowBounds;

import com.study.springmvc.common.utils.Page;

import lombok.Getter;
import lombok.Setter;

public class PageRowBounds extends RowBounds{
	
	@Setter
	@Getter
	private String orderBy;
	
	@Setter
	@Getter
	private boolean orderByFlag;
	
	public PageRowBounds(){
		super();
	}
	
	public PageRowBounds(int offset, int limit,boolean orderByFlag,String orderBy){
		super(offset,limit);
		this.orderBy=orderBy;
		this.orderByFlag=orderByFlag;
	}
	
	public PageRowBounds(int offset, int limit){
		super(offset,limit);
	}
	
	public static PageRowBounds getPageParamter(Page<?> pageInfo){
		PageRowBounds page=new PageRowBounds(pageInfo.getStartIndex(),pageInfo.getPageSize());
		StringBuilder orderStr=new StringBuilder();
		if(!StringUtils.isEmpty(pageInfo.getOrderField())){
			page.setOrderByFlag(true);
			orderStr.append(pageInfo.getOrderField()).append(" ").append(pageInfo.getOrderDirection());
		}else{
			page.setOrderByFlag(false);
		}
		page.setOrderBy(orderStr.toString());
		return page;
	}
}
