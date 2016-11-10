package com.study.springmvc.common.utils;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JackJsonUtils {
	
	@SuppressWarnings("unchecked")
	public static <T> T getJsonObj(String jsonStri,Class<?> type){
		ObjectMapper mapper = new ObjectMapper();  
		Object obj = null;
		try {
			obj =mapper.readValue(jsonStri, type);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}  
		return (T) obj;
	}
	
	public static String getJsonStr(Object obj){
		ObjectMapper mapper = new ObjectMapper();  
		String jsonStr="";
		try {
			jsonStr = mapper.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} 
		return jsonStr;
	}
}
