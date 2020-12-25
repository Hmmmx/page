package com.ctp.core.filter;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;

public class LoginFilter implements Filter {
	private final static String[] ANONYMOUS_URIS = { // 允许匿名访问的url在这里配置
			"/wxjz", "/wxjz/getSplbList", // 公众号相关
			"/*.txt", // 微信公众号等等验证文件
			"/", "/login", "/logon", "/logout",  // 登录相关
			"/jsonerror/generic", //json通用异常错误
			"/error/403", "/error/404", "/error/500", "/error/503", "/error/exception" // 通用错误页面 
	};
	
	private final static String[] PUBLIC_STATIC_RSRCS = { // 访问静态资源不需要登录
			"/resources", "/upload", "/persistence"
	};
	
	@Override
	public void destroy() {
		// do nothing
	}

	@Override
	@SuppressWarnings("unchecked")
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest hsr = (HttpServletRequest)request;
		HttpSession session = hsr.getSession();
		
		// 超时点击退出链接
		if (request == null || chain == null) {
			((HttpServletResponse)response).sendRedirect(hsr.getContextPath() + "/login");
			return;
		}
		// 由于web.xml中设置Filter过滤全部请求，可以排除不需要过滤的url
        if(isAnonymousUri(hsr)){
            chain.doFilter(request, response);
            return;
        }

        // 判断用户是否登录，进行页面的处理
        if(session.getAttribute("yhdm") == null){
        	String accept = hsr.getHeader("Accept");
        	// 未登录用户，重定向到登录页面
        	String source = hsr.getServletPath();//.getRequestURI();
            if (hsr.getQueryString() != null) {
                source += "?" + hsr.getQueryString();
            }
            source = "source=" + URLEncoder.encode(source, "UTF-8");
        	if (!StringUtils.isBlank(accept) && accept.toLowerCase().contains("application/json")) { //重定向到json
        		((HttpServletResponse)response).sendRedirect(hsr.getContextPath() + "/jsonerror/generic?cmd=redirect&" + source);
        	} else {
	            ((HttpServletResponse)response).sendRedirect(hsr.getContextPath() + "/login?cmd=redirect&" + source);
        	}
            return;
        } else {
        	ServletContext application = hsr.getServletContext();
			Map<String, String> yhdmlb = (Map<String, String>)application.getAttribute("yhdmlb");
        	
        	if (yhdmlb != null) { // 判断当前的session是否与保存在application中的相同, 如果不同,则表示当前用户已被强制退出
        		String yhdm = (String)session.getAttribute("yhdm");
        		if (!session.getId().equals(yhdmlb.get(yhdm))) { // 如果不同,则表示当前用户已被强制退出
	        		session.invalidate();
	        		
	        		String accept = hsr.getHeader("Accept");
	        		String source = hsr.getServletPath();//.getRequestURI();
	                if (hsr.getQueryString() != null)
	                	source += "?" + hsr.getQueryString();
	                source = "source=" + URLEncoder.encode(source, "UTF-8");
	            	if (!StringUtils.isBlank(accept) && accept.toLowerCase().contains("application/json")) { //重定向到json
	            		((HttpServletResponse)response).sendRedirect(hsr.getContextPath() + "/jsonerror/generic?cmd=forceLogout&" + source);
	            	} else {
		        		((HttpServletResponse)response).sendRedirect(hsr.getContextPath() + "/login?cmd=forceLogout&" + source);
	            	}
	                return;
        		} else { // 相同,允许访问
        			chain.doFilter(request, response);
        		}
        	} else {
	            // 已登录用户，允许访问
	            chain.doFilter(request, response);
        	}
        }
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// do nothing
	}

	
	
	/**
	 * 判断当前URI是否可以匿名访问
	 * @param request
	 * @return
	 */
	private boolean isAnonymousUri (HttpServletRequest request) {
		String a = request.getRequestURI();
		if (a != null) {
			for (String rsrc: PUBLIC_STATIC_RSRCS) { // 访问静态资源不需要登录
				if (a.startsWith(request.getContextPath() + rsrc + "/")) return true;
			}

			a = a.contains(";jsessionid")?a.substring(0, a.indexOf(";jsessionid")) : a;
			for (String uri : ANONYMOUS_URIS) {
				String b = request.getContextPath() + uri;
				if (a.equals(b)) { // 网页的路径是在允许匿名访问的范围内
					return true;
				} else {
					if (b.contains("*")) { // * 通配符
						b = "^"+b.replaceAll("\\.", "\\\\.").replaceAll("\\*", "[^/]*")+"$";
						if (a.matches(b)) return true;
					}
				}
			}
		}
		return false;
	}
}
