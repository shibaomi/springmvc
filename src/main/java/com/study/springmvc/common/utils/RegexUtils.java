package com.study.springmvc.common.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
/**
 * 一、(?=pattern):从pattern匹配的最初位置开始，重新对表达式{指和(?=pattern)配合的表达式，如Windows(?=95|98|NT|2000)则指Windows}进行向前匹配或向后匹配，
 * 		一般建议向前匹配，即(?=pattern)前面有表达式，后面没有表达式
 * 		匹配的字符串可以使用Matcher.group方法取出来（不包括?=pattern中pattern匹配的字符串）
 * 		向前匹配时，前面的表达式可以任意，向后匹配时首先加上pattern表达式（因为是从开始找到匹配字符串的开始位置算起的），如下
 * 		例如对于"(?=95|98|NT|2000)"，字符串Windows95Windows31，则从9开始进行向前或前后匹配，
 * 		若想匹配“Windows95”，则pattern="Windows(?=95|98|NT|2000)"（Matcher.group取出的字符串为Windows，不包括pattern里面的），
 * 		若想匹配“95Windows”,则pattern="(?=95|98|NT|2000)(95|98|NT|2000)Windows"（Matcher.group取出的字符串为95Windows，因为后面表达式包括pattern）
 * 
 * 二、(?:pattern):从pattern匹配的字符串的位置开始匹配，向前匹配时是pattern匹配的字符串是开始位置，向后匹配时是pattern匹配的字符串的结束位置
 * 		匹配的字符串可以使用Matcher.group方法取出来（包括?=pattern中pattern匹配的字符串）,如下：
 * 		例如字符串Windows95Windows31，
 * 		若想匹配“Windows95”，则pattern="Windows(?:95|98|NT|2000)"（Matcher.group取出的字符串为Windows95，包括pattern里面的），
 * 		若想匹配“95Windows”,则pattern="(?:95|98|NT|2000)Windows"（Matcher.group取出的字符串为95Windows）
 * 		和(?=pattern)比较：
 * 			1、前者取出的字符串包括pattern匹配的字符串，后者不包括pattern匹配的字符串
 * 			2、前者是从匹配字符串的整体位置进行匹配，如向前匹配时是从pattern匹配的开始位置，向后匹配时从pattern匹配的结束位置，而后者始终从匹配字符串的开始位置进行匹配
 * 
 * (?!pattern)：从pattern不匹配的字符串的位置向前向后开始进行匹配（一个个字符进行匹配的，如(?!95),对于字符串951发现在9时匹配了，往后移一位，到5时发现不匹配符合，继续往后看，
 * 		并不是说95正好匹配字符串就不检查了，直接从1开始看，不跳过5），向前匹配时，后面一定不能匹配pattern，向后匹配时，结果很难确认，看下面的例子
 * 		建议向前匹配，不要使用向后匹配（建议使用(?<!pattern)）
 * 		例如字符串95Windows95Windows31，
 * 		向前匹配：pattern="Windows(?!95|98|NT|2000)"，只匹配Windows31中的Windows（Matcher.group取出的字符串为Windows，不包括pattern里面的）
 * 		向后匹配：pattern="(?!95|98|NT|2000)Windows"，匹配里面的所有Windows，即使前面有95还是匹配了，以为匹配到95时从9开始往后，发现5不匹配（Matcher.group取出的字符串所有的Windows）
 * 
 * (?<=pattern)：从pattern匹配的字符串的结束位置开始向后匹配,后项匹配字符，匹配的字符串可以使用Matcher.group方法取出来（不包括pattern匹配的字符串）,如下：
 * 		建议向后匹配，也可以向前匹配（不过向前匹配请选择(?=pattern)）		
 * 		例如字符串Windows95Windows31Windows，
 * 		若想匹配“95Windows”，则pattern="(?:95|98|NT|2000)Windows"（Matcher.group取出的字符串为Windows，不包括pattern里面的），
 * 		若想向前匹配“Windows95”,则pattern="Windows(95|98|NT|2000)(?:95|98|NT|2000)"（因为匹配位置是从pattern结束的位置开始，所以向前匹配时要带上pattern）
 * 			（Matcher.group取出的字符串为Windows95）,不建议向前匹配
 * 
 * (?<!pattern):从pattern匹配的字符串的结束位置开始向后检查匹配，后项匹配字符，匹配的字符串可以使用Matcher.group方法取出来（不包括pattern匹配的字符串）
 * 		建议后项匹配，也可以前向匹配（前向匹配建议使用(?!pattern)）
 * 		例如字符串95Windows95Windows31Windows，
 * 		若想匹配“31Windows”，则pattern="(?<!95|98|NT|2000)Windows"（Matcher.group取出的字符串为Windows），
 * 
 * @author shibaomi
 *
 */
public class RegexUtils {
	
	private static String orderSqlReg="(\\s+)order(\\s+)by(\\s+)"
			+ "[^("
			+ "(\\))|"
			+ "((\\s)group(\\s+)by(\\s+))"
//			+ "((\\s)union(\\s+)((all(\\s+))?))|"
//			+ "((\\s)for(\\s+)update(\\s+))|"
//			+ "((\\s)limit(\\s+))|"
//			+ "(\\()"
			+ ")]*"; 
	private static final String orderOnlySqlReg="(?:(\\s+)order(\\s+)by(\\s+))";
	public static void main(String[] args) {
		
		String s1="select * from t where s=1 group by s order by   ese,qq,u";
//		String s11="(select * from t where s=1  order by qq,ttt group by zz)";
//		String s2="select * from t where s=1 group by s order by s union all select * from b where b=1 order by b";
//		String s3="select * from t where s=1 group by s order by s union select * from b where b=1 order by s union select *";
//		String s4="select * from (select * from t where s=1 group by s order by ) b where b=1";
//		String dd=" order by s union select * from b where b=1";
        Pattern pat1 = Pattern.compile("(?:"+orderSqlReg+")");
        Matcher mat1 = pat1.matcher(s1);
        while (mat1.find()) {
        	System.out.println(mat1.group());
        }
//		System.out.println("s1="+h(s1));
//		System.out.println("s11="+h(s11));
//		System.out.println("s2="+h(s2));
//		System.out.println("s3="+h(s3));
//		System.out.println("s4="+h(s4));
//		System.out.println("sdd="+h(dd));
//		g(s3);
        
	}
	
	public static String  h(String sql){
		Pattern pat1 = Pattern.compile("(?:"+orderSqlReg+")");
        Matcher mat1 = pat1.matcher(sql);
        
        StringBuffer st=new StringBuffer();
        Map<Integer,Integer[]> m=new HashMap<Integer,Integer[]>();
        int i=0;
        while (mat1.find()) {
        	m.put(i, new Integer[]{mat1.start(), mat1.end()});
        	System.out.println(mat1.group());
        	i++;
        }
        int j=0;
        if(!m.isEmpty()){
        	
        	for(Integer t:m.keySet()){
            	st.append(sql.substring(j, m.get(t)[0])).append(" ");
            	j=m.get(t)[1];
            }
        }else{
        	st.append(sql);
        }
        if(j!=sql.length()){
        	st.append(sql.substring(j));
        }
        return st.toString();
	}
	
	public static void g(String s3){
		System.out.println(s3);
		Pattern pat1 = Pattern.compile(orderOnlySqlReg);
        Matcher mat1 = pat1.matcher(s3);
        StringBuffer st=new StringBuffer();
        Map<Integer,Integer[]> m=new HashMap<Integer,Integer[]>();
        int i=0;
        while (mat1.find()) {
        	Integer[] n=new Integer[]{mat1.start(), s3.length()};
        	if(i!=0){
        		m.get(i-1)[1]=n[0];
        	}
        	m.put(i, n);
        	i++;
        }
        if(!m.isEmpty()){
        	int j=0;
        	for(Integer t:m.keySet()){
//            	System.out.println("t="+t+",0="+m.get(t)[0]+",1="+m.get(t)[1]);
//            	System.out.println(s3.substring(m.get(t)[0], m.get(t)[1]));
            	f(s3.substring(m.get(t)[0], m.get(t)[1]));
            	if(j==0){
            		st.append(s3.substring(j, m.get(t)[0]));
            	}else{
            		st.append("");
            	}
            }
        }else{
        	st.append(s3);
        }
	}
	
	private static void f(String sql){
		String orderSqlReg="(?:(\\s+)order(\\s+)by(\\s+)).*(?!(\\()))(?=(\\))"; 
		System.out.println("再次加工="+sql);
		Pattern pat1 = Pattern.compile("(?:"+orderSqlReg+")");
		Matcher mat1 = pat1.matcher(sql);
		 while (mat1.find()) {
	        	System.out.println("1==="+mat1.group()+",end="+mat1.end()+",start="+mat1.start());
//	        	System.out.println(mat1.group());
	        	System.out.println(sql.substring(mat1.start(), mat1.end()));
	        }
	}

}
