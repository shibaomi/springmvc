package com.study.springmvc.common.busiException;

/**
 * 自定义业务异常
 * @author shibaomi
 */
public class BusiException extends RuntimeException{

	private static final long serialVersionUID = -3141774606726236455L;
	
	private static final String exceptionType = "业务异常";
	
	/**
	 * 错误代码
	 */
	private String errorCode = "";

	public BusiException(String code) {
		super(code);
		errorCode = code;
	}

//	public BusiException(String code, String msg[]) {
//		super(code, msg);
//		errorCode = code;
//	}

	public BusiException(String message, Throwable cause) {
		super(message, cause);
//		errorCode = code;
	}

	/**
	 * 得到错误代码
	 * @return
	 */
	public String getErrorCode() {
		return errorCode;
	}

	/**
	 * 格式化异常成统一格式
	 */
	public String toString() {
		String message = getLocalizedMessage();
		return "[" + exceptionType + "]-[" + getErrorCode() + "]-[" + message + "]";
	}
}
