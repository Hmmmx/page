package com.ctp.core.interceptor;

import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class LoginInterceptor extends HandlerInterceptorAdapter {
	@SuppressWarnings("unchecked")
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		
		// 判断用户是否登录，进行页面的处理
        if(session.getAttribute("yhdm") == null){
        	String accept = request.getHeader("Accept");
        	// 未登录用户，重定向到登录页面
        	String source = request.getServletPath();//.getRequestURI();
            if (request.getQueryString() != null) {
                source += "?" + request.getQueryString();
            }
            source = "source=" + URLEncoder.encode(source, "UTF-8");
        	if (!StringUtils.isBlank(accept) && accept.toLowerCase().contains("application/json")) { //重定向到json
        		response.sendRedirect(request.getContextPath() + "/jsonerror/generic?cmd=redirect&" + source);
        	} else {
	            response.sendRedirect(request.getContextPath() + "/login?cmd=redirect&" + source);
        	}
            return false;
        } else {
        	ServletContext application = request.getServletContext();
			Map<String, String> yhdmlb = (Map<String, String>)application.getAttribute("yhdmlb");
        	
        	if (yhdmlb != null) { // 判断当前的session是否与保存在application中的相同, 如果不同,则表示当前用户已被强制退出
        		String yhdm = (String)session.getAttribute("yhdm");
        		if (!session.getId().equals(yhdmlb.get(yhdm))) { // 如果不同,则表示当前用户已被强制退出
	        		session.invalidate();
	        		
	        		String accept = request.getHeader("Accept");
	        		String source = request.getServletPath();//.getRequestURI();
	                if (request.getQueryString() != null)
	                	source += "?" + request.getQueryString();
	                source = "source=" + URLEncoder.encode(source, "UTF-8");
	            	if (!StringUtils.isBlank(accept) && accept.toLowerCase().contains("application/json")) { //重定向到json
	            		response.sendRedirect(request.getContextPath() + "/jsonerror/generic?cmd=forceLogout&" + source);
	            	} else {
		        		response.sendRedirect(request.getContextPath() + "/login?cmd=forceLogout&" + source);
	            	}
	                return false;
        		} else { // 相同,允许访问
        			return true;
        		}
        	} else {
	            // 已登录用户，允许访问
	            return true;
        	}
        }
    }  
	
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
	    
    }
    
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    	
    }
}
