package com.cbp.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cbp.core.service.LoginService;
import com.cbp.core.vo.LoginVo;
import com.ctp.core.model.Result;
import com.ctp.core.utils.DateUtils;
import com.ctp.web.controller.BaseController;

/**
 * 
 *
 * @author Huang
 */

@Controller
public class LoginController extends BaseController {
	private static final Logger logger = Logger.getLogger(LoginController.class);
	@Autowired
	private LoginService loginservice;

	@GetMapping(value = { "/", "/login", "/logon" })
	public String pageLoad(HttpServletRequest request) {
		return "login/login";
	}

	@PostMapping(value = "/login")
	@ResponseBody
	public Result login(LoginVo vo, HttpServletRequest request) throws Exception {
		if (StringUtils.isEmpty(vo.getYhdm())) { // 账号为空
			return this.error("账号为空");
		} else if (vo.getYhdm().length() < 3 || vo.getYhdm().length() > 30) {
			return this.error("账号长度出错");
		} else if (!isAccountValid(vo.getYhdm())) {
			return this.error("账号不合法");
		} else if (StringUtils.isEmpty(vo.getYhmm())) {
			return this.error("密码为空");
		} else if (vo.getYhmm().length() < 3 || vo.getYhmm().length() > 30) {
			return this.error("密码长度出错");
		} else {
			LoginVo user = loginservice.login(vo);
			this.getRequest().getSession().setAttribute("sjjgdm", user.getSjjgdm());
			this.getRequest().getSession().setAttribute("sjjgmc", user.getSjjgmc());
			this.getRequest().getSession().setAttribute("sjjgid", user.getSjjgid());
			
			this.getRequest().getSession().setAttribute("jgdm", user.getJgdm());
			this.getRequest().getSession().setAttribute("jgmc", user.getJgmc());
			this.getRequest().getSession().setAttribute("jgid", user.getJgid());
			this.getRequest().getSession().setAttribute("jgsyqxz", DateUtils.dateToString(user.getSyqxz(), 10));
			
			this.getRequest().getSession().setAttribute("jglx", user.getJglx());
			this.getRequest().getSession().setAttribute("ptlx", user.getPtlx());
			this.getRequest().getSession().setAttribute("yhlx", user.getYhlx());
			
			this.getRequest().getSession().setAttribute("yhid", user.getYhid());
			this.getRequest().getSession().setAttribute("yhdm", user.getYhdm());
			this.getRequest().getSession().setAttribute("yhmc", user.getYhmc());
			
			this.getRequest().getSession().setAttribute("gwid", user.getGwid());
			this.getRequest().getSession().setAttribute("fcdid", user.getFcdid());
			this.getRequest().getSession().setAttribute("sessionId", user.getSessionId());
			this.getRequest().getSession().setAttribute("systemlist", user.getSystemlist());
			this.getRequest().getSession().setAttribute("funclist",user.getTreelist());
			if(user.getFcdid()!=null&&!user.getFcdid().trim().equals("")) {
				this.getRequest().getSession().setAttribute("funclist"+user.getFcdid(),user.getTreelist());
			}
			
			// 20200429: 暂时禁用同一账号同一时间只能登录一个会话的限制
			// this.saveUserSessionToApplication(request, user.getYhdm());
			return this.success("登录成功");
		}
	}

	@RequestMapping(value = "/funclist")
	@ResponseBody
	public Result getFunctionList() {

		String yhlx = (String) this.getRequest().getSession().getAttribute("yhlx");
		String jgid = (String) this.getRequest().getSession().getAttribute("jgid");
		String gwid = (String) this.getRequest().getSession().getAttribute("gwid");
		String ptlx = (String) this.getRequest().getSession().getAttribute("ptlx");
		String cdid = this.getRequest().getParameter("cdid"); // 为所选择系统列表的cdid
		if (!StringUtils.isEmpty(cdid)) {
			if (ptlx.equals("1")) {
				if(this.getRequest().getSession().getAttribute("funclist"+cdid)!=null) {
					this.getRequest().getSession().setAttribute("funclist",this.getRequest().getSession().getAttribute("funclist"+cdid));
				}else {
					List<Map<String, Object>> funclist=loginservice.getYyscd(yhlx, jgid, gwid, cdid);
				    this.getRequest().getSession().setAttribute("funclist",funclist);
				    this.getRequest().getSession().setAttribute("funclist"+cdid,funclist);
				}
				
			} else {
				
				if(this.getRequest().getSession().getAttribute("funclist"+cdid)!=null) {
					this.getRequest().getSession().setAttribute("funclist",this.getRequest().getSession().getAttribute("funclist"+cdid));
				}else {
					List<Map<String, Object>> funclist=loginservice.getWgcd(yhlx, jgid, gwid, cdid);
				    this.getRequest().getSession().setAttribute("funclist",funclist);
				    this.getRequest().getSession().setAttribute("funclist"+cdid,funclist);
				}
				
			}
		}
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("su", "superuser".equals(this.getRequest().getSession().getAttribute("yhdm")));
		map.put("funclist", this.getRequest().getSession().getAttribute("funclist"));
		return this.success(map);
	}

	@RequestMapping(value = "/systemlist")
	@ResponseBody
	public Result getSystemList() {
		return this.success(this.getRequest().getSession().getAttribute("systemlist"));
	}

	@RequestMapping(value = "/logout")
	public String logout(HttpServletRequest request) {
		this.removeUserSessionFromApplication(request);
		request.getSession().invalidate(); // 将session设置成无效
		String initPtlx = null;
		for (Cookie cookie: request.getCookies()) {
			if ("init_ptlx".equals(cookie.getName())) { initPtlx = cookie.getValue(); break; }
		}
		if (initPtlx == null) return "redirect:/login";
		else return "redirect:/login?ptlx="+initPtlx;
	}

	@SuppressWarnings("unchecked")
	private void saveUserSessionToApplication(HttpServletRequest request, String yhdm) { // 用于控件一个账号只能同时登录一个会话
		Map<String, String> yhdmlb = (Map<String, String>) request.getServletContext().getAttribute("yhdmlb");
		if (yhdmlb == null) { // 如果是首个用户登录，yhdmlb为空
			yhdmlb = new HashMap<String, String>();
			request.getServletContext().setAttribute("yhdmlb", yhdmlb);
		}
		synchronized (yhdmlb) { // 可能有多个用户同时登录，加锁保护避免冲突
			if (yhdmlb.containsKey(yhdm)) {
				yhdmlb.remove(yhdm);
			}
			yhdmlb.put(yhdm, request.getSession().getId());
		}
	}

	@SuppressWarnings("unchecked")
	private void removeUserSessionFromApplication(HttpServletRequest request) {
		Map<String, String> yhdmlb = (Map<String, String>) request.getServletContext().getAttribute("yhdmlb");
		String yhdm = (String) request.getSession().getAttribute("yhdm");
		if (yhdmlb != null && !StringUtils.isEmpty(yhdm)) {
			synchronized (yhdmlb) { // 可能有多个用户同时退出，加锁保护避免冲突
				if (yhdmlb.containsKey(yhdm)) {
					yhdmlb.remove(yhdm);
				}
			}
		}
	}

	private boolean isAccountValid(String yhdm) {
		Pattern pattern = Pattern.compile("^[A-Za-z0-9_\\-\\.]+$");
		Matcher matcher = pattern.matcher(yhdm);
		return matcher.matches();
	}
}
