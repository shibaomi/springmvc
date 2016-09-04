package com.study.springmvc.menu;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.study.springmvc.dal.model.UserModel;


public class Test2 {

	public static String f(UserModel use){
		StringBuffer result = new StringBuffer();
//        result.append("DATAS DESTPRODUCTNO=\"").append(dealNullToBlankspace(use.getName())).append("\" ");
        result.append("PHOTOURL=\"").append(dealNullToBlankspace(use.getUserNo())).append("\" ");
        return result.toString();
	}
	
	private static String dealNullToBlankspace(String string) {
        return StringUtils.isEmpty(string) ? "" : string;
    }
	
	private static int[] arrayList={1,3,4,2,5,8,6,7,9,0};
	private static List<Integer> sorfList=new ArrayList<Integer>();
	
	public static void main(String[] args) {
		StringUtils.isEmpty("");
//		Logger logger = LoggerFactory.getLogger(Test.class);
//		logger.info("Hello World");
//		UserModel use=new UserModel();
//		use.setName("a");
//		StringBuffer pig=new StringBuffer();
//    	pig.append(StringUtils.isEmpty(use.getName())?"":use.getName());
//    	pig.append(StringUtils.isEmpty(use.getUserNo())?"":use.getUserNo());
//        System.out.println("="+pig.toString()+"=");
//        
//        System.out.println("="+StringUtils.join(use.getName(), use.getUserNo())+"=");
//        
//        System.out.println("="+f(use)+"=");
		
		for(int data:arrayList){
			int length=sorfList.size();
			int num=sortData1(0,length,data);
			sorfList.add(num, data);;
		}
		for(int data:sorfList){
			System.out.println(data);
		}
		try {
			URL url =new URL("file:../springmvc/src/main/resources/META-INF/spring/spring-service.xml");
			URLConnection con = url.openConnection();
			Object o=con.getURL();
			con.getInputStream();
			System.out.println(url.getFile());
			System.out.println(url.getPath());
			File file=new File(url.getFile());
			System.out.println(file.getAbsolutePath());
			System.out.println(file.exists());
			FileReader file1=new FileReader(file);
			char[] cbuf=new char[2048];
			file1.read(cbuf);
			System.out.println(cbuf.toString());
			System.out.println(new String(cbuf));
		}
		catch (IOException ex) {
			// Close the HTTP connection (if applicable).
			ex.printStackTrace();;
		}
	}
	
	private static int sortData1(int startIndex,int length,int data){
		if(length==0){
			return 0;
		}
	    int num=(startIndex+length)/2;
	    if(num==startIndex&&num!=0){
	    	return startIndex+1;
	    }
	    int perNetValue=sorfList.get(num);
	    if(perNetValue==data){
	        return startIndex;
	    }else if(perNetValue<data){
	    	if(num==0){
	    		return 1;
	    	}
	        return sortData1(num,length,data);
	    }else{
	    	if(num==0){
	    		return 0;
	    	}
	        return sortData1(startIndex,num,data);
	    }
	    
	}
	
	private static int sortData(int length,int startIndex,int data){
		if(length==0){
			return 0;
		}
	    int num=length/2+length%2;
	    int perNetValue=sorfList.get(startIndex);
	    if(perNetValue==data){
	        return startIndex;
	    }else if(perNetValue<data){
	    	if(num==1){
	    		return startIndex+1;
	    	}
	        return sortData(num,startIndex+num%2+num/2,data);
	    }else{
	    	if(num==1){
	    		return startIndex;
	    	}
	        return sortData(num,startIndex-num%2-num/2,data);
	    }
	    
	}

}
