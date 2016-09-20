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
    private int currPage = 1;
    
    /**
     * 上一页
     */
    private int prePage;
    
    /**
     * 下一页
     */
    private int nextPage;
    
    /**
     * 总后一页
     */
    private int lastPage;
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
		this(totalCount, pageSize, currentPage,null,OrderEnum.DESC);
		this.setResult(result);
	}
    
	public Page(int totalCount, int pageSize, int currentPage,
			List<T> result,String orderField,OrderEnum orderDirection) {
		this(totalCount, pageSize, currentPage,orderField,orderDirection);
		this.setResult(result);
	}
	
	public Page(int totalCount, int pageSize, int currentPage,String orderField,OrderEnum orderDirection) {
		this.setPageSize(pageSize);
		this.setTotalCount(totalCount);
		this.setCurrPage(currentPage);
		this.setOrderField(orderField);
		this.setOrderDirection(orderDirection);
		setPageInfo();
	}
	
	private void setPageInfo(){
		//总页数
		this.totalPage=this.totalCount/this.pageSize;
		if(this.totalCount%this.pageSize!=0){
			this.totalPage+=1;
		}
		this.lastPage=this.totalPage;
		//当前页数大于最后页数，取总后一页
		if(this.currPage>this.lastPage){
			this.currPage=this.lastPage;
		}
		//上一页
		this.prePage=this.currPage-1;
		if(this.prePage<1){
			this.prePage=this.currPage;
		}
		//下一页
		this.nextPage=this.currPage+1;
		if(this.nextPage>this.lastPage){
			this.nextPage=this.lastPage;
		}
		//开始计算数
		this.startIndex=(this.currPage-1)*this.pageSize;
		if(this.startIndex<0){
			this.startIndex=0;
		}
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
