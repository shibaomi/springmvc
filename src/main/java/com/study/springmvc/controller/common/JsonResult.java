package com.study.springmvc.controller.common;

import lombok.Data;

/**
 * 返回json结果信息
 * @author shibaomi
 */

public @Data class JsonResult {
	
	/**
	 * json结果状态，fail or success
	 */
	private String status="success";
	
	/**
	 * 状态描述
	 */
	private String message="response ok";
	
	/**
	 * 正确处理结果信息
	 */
	private Object data;
}
