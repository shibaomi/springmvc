package com.study.springmvc.common.utils;

import java.io.Serializable;
import java.util.List;

import com.study.springmvc.common.constant.OrderEnum;

import lombok.Data;

public @Data class Page<T> implements Serializable{

	private static final long serialVersionUID = -1833304552948552774L;
	/**
	 * 总条数
	 */
    private int totalCount = 0;
    
    /**
     * 总页数
     */
    private int totalPage;
    
    /**
	 * 每页大小
	 */
    private int pageSize = 10;
    
    /**
	 * 当前页数，从1开始
	 */
    private int curPage = 1;
    
    /**
     * 上一页
     */
    private int previousPageIndex;
    
    /**
     * 下一页
     */
    private int nextPageIndex;
    
    /**
     * 总后一页
     */
    private int lastPageIndex;
    /**
	 * 排序字段
	 */
    private String orderField;
    /**
     * 排序方向
     */
    private OrderEnum orderDirection = OrderEnum.DESC;
    
    /**
	 * 结果集
	 */
    private List<T> result;
    
    /**
     * 当前页开始数
     */
    private int startIndex;
    
    public Page(){}
	public Page(int totalCount, int pageSize, int currentPage,
			List<T> result) {
		this(totalCount, pageSize, currentPage);
		this.setResult(result);
	}
	
	public Page(int totalCount, int pageSize, int currentPage) {
		this.setPageSize(pageSize);
		this.setTotalCount(totalCount);
		this.setCurPage(currentPage);
		setPageInfo();
	}
	
	private void setPageInfo(){
		//总页数
		this.totalPage=this.totalCount/this.pageSize;
		if(this.totalCount%this.pageSize!=0){
			this.totalPage+=1;
		}
		this.lastPageIndex=this.totalPage;
		//当前页数大于最后页数，取总后一页
		if(this.curPage>this.lastPageIndex){
			this.curPage=this.lastPageIndex;
		}
		//上一页
		this.previousPageIndex=this.curPage-1;
		if(this.previousPageIndex<1){
			this.previousPageIndex=this.curPage;
		}
		//下一页
		this.nextPageIndex=this.curPage+1;
		if(this.nextPageIndex>this.lastPageIndex){
			this.nextPageIndex=this.lastPageIndex;
		}
		//开始计算数
		this.startIndex=(this.curPage-1)*this.pageSize+1;
	}
	public void setPageSize(int pageSize) {
		if(pageSize<0){
			pageSize=10;
		}
		this.pageSize = pageSize;
	}
	public void setTotalCount(int totalCount) {
		if(totalCount<0){
			totalCount=0;
		}
		this.totalCount = totalCount;
	}
}
