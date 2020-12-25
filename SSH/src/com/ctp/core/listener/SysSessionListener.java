package com.ctp.core.listener;

import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.commons.lang.StringUtils;

public class SysSessionListener implements HttpSessionListener {

	@Override
	public void sessionCreated(HttpSessionEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void sessionDestroyed(HttpSessionEvent arg0) {
		HttpSession session = arg0.getSession();
		@SuppressWarnings("unchecked")
		Map<String, String> yhdmlb = (Map<String, String>)session.getServletContext().getAttribute("yhdmlb"); // 获取用户列表
		if (yhdmlb != null) {
			synchronized(yhdmlb) { // 考虑是否给yhdmlb对象加锁，避免冲突
				String yhdm = (String)session.getAttribute("yhdm");     // 获取用户信息
				if (!StringUtils.isBlank(yhdm)) {
					if (yhdmlb.containsKey(yhdm)) {
						String v = yhdmlb.get(yhdm);
						if (session.getId().equals(v)) { // 同一个账号可能Session已经被新的session覆盖,以最后一个Session为准
							yhdmlb.remove(yhdm);    // 将这个用户从ServletContext对象中移除
						}
					}
				}
			}
		}
	}

}
