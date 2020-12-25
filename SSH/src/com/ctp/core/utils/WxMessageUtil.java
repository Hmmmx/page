package com.ctp.core.utils;

import java.io.InputStream;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
import javax.servlet.http.HttpServletRequest;
 
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.springframework.stereotype.Component;

@Component
public class WxMessageUtil {
	
	public static Map<String, Object> parseXml(HttpServletRequest request)throws Exception{
		
		// 将解析结果存储在HashMap中
		Map<String, Object>map =new HashMap<String, Object>();
		// 从request中得到输入流
		InputStream  inputStream=request.getInputStream();
		// 读取输入流
		SAXReader reader = new SAXReader();
		Document document = reader.read(inputStream);
		// 得到XML的根元素
		Element root = document.getRootElement();
		// 得到根元素的所有子节点
		@SuppressWarnings("unchecked")
		List<Element> elementList = root.elements();
		// 判断又没有子元素列表
		if (elementList.size()==0){
			map.put(root.getName(), root.getText());
		}else {
			for (Element e : elementList)
				map.put(e.getName(), e.getText());
		}
		// 释放资源
		inputStream.close();
		inputStream = null;
		return map;
	}
	

    /** 
     * 格式化输出xml 
     * @param document 
     * @return 
     * @throws DocumentException 
     * @throws IOException 
     */  
    public static String formatXml(Document document) throws Exception  {  
        // 格式化输出格式  
        OutputFormat format = OutputFormat.createPrettyPrint();  
        //format.setEncoding("UTF-8");  
        StringWriter writer = new StringWriter();  
        // 格式化输出流  
        XMLWriter xmlWriter = new XMLWriter(writer, format);  
        // 将document写入到输出流  
        xmlWriter.write(document);  
        xmlWriter.close();  
        return writer.toString();  
    }  

    
}