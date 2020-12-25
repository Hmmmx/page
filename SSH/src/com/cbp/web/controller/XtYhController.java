package com.cbp.web.controller;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cbp.core.service.XtYhService;
import com.cbp.core.vo.JgyhVo;
import com.ctp.core.model.Result;
import com.ctp.web.controller.BaseController;

/**
 *
 * @author Huang
 */
@Controller
@RequestMapping(value = "/jgyh")
public class XtYhController extends BaseController {
	@Autowired
	private XtYhService jgyhservice;
	
	@GetMapping(value = {"", "/", "/index"})
	public String pageLoad() {
		return "ptgl/yyxt/user-mgmt";
	}

	@PostMapping(value = "/addJgYh")
	@ResponseBody
	public Result addJgYh(JgyhVo jgyh) throws Exception {
		if (StringUtils.isEmpty(jgyh.getYhdm())) {
			return this.error("账号为空");
		} else if (jgyh.getYhdm().length() < 3 || jgyh.getYhdm().length() > 30) {
			return this.error("账号长度出错");
		} else if (!isAccountValid(jgyh.getYhdm())) {
			return this.error("账号不合法");
		} else if (StringUtils.isEmpty(jgyh.getYhmm())) {
			return this.error("密码为空");
		} else if (jgyh.getYhmm().length() < 3 || jgyh.getYhmm().length() > 30) {
			return this.error("密码长度出错");
		}  else {
			String lrry = this.getYhdm();
			jgyh.setLrry(lrry);
			this.jgyhservice.addJgYh(jgyh);
			return this.success();
		}
	}

	@PostMapping(value = "/updateJgYh")
	@ResponseBody
	public Result updateJgYh(JgyhVo jgyh) throws Exception {
		String xgry = this.getYhdm();
		jgyh.setXgry(xgry);
		this.jgyhservice.updateJgYh(jgyh);
		return this.success();
	}

	@GetMapping(value = "/findJgYh")
	@ResponseBody
	public Result findJgYh() throws Exception {

		return this.success(this.jgyhservice.findJgYh(this.getRequest().getParameter("jgid")));

	}
	
	@GetMapping(value = "/getJgYh")
	@ResponseBody
	public Result getJgYh() throws Exception {
		String yhid = this.getYhid();
		return this.success(this.jgyhservice.getJgYh(yhid));

	}

	@GetMapping(value = "/deleteJgYh")
	@ResponseBody
	public Result deleteJgYh() throws Exception { 
		String xgry = this.getYhdm();
		this.jgyhservice.deleteJgYh(this.getRequest().getParameter("yhid"),xgry);
		return this.success();

	}

	@PostMapping(value = "/resetPassword")
	@ResponseBody
	public Result resetPassword(JgyhVo jgyh) throws Exception {

		 if (StringUtils.isEmpty(jgyh.getYhmm())) {
			return this.error("密码为空");
		} else if (jgyh.getYhmm().length() < 3 || jgyh.getYhmm().length() > 30) {
			return this.error("密码长度出错");
		} else {
			String xgry = this.getYhdm();
			jgyh.setXgry(xgry);
			this.jgyhservice.resetPassword(jgyh);
			return this.success();
		}
	}

	@PostMapping(value = "/changePassword")
	@ResponseBody
	public Result changePassword(JgyhVo yhvo) throws Exception {

		 if (StringUtils.isEmpty(yhvo.getYhmm())) {
			return this.error("密码为空");
		} else if (yhvo.getYhmm().length() < 3 || yhvo.getYhmm().length() > 30) {
			return this.error("密码长度出错");
		} else {
			String yhid = this.getYhid();
			yhvo.setYhid(yhid);
			String xgry = this.getYhdm();
			yhvo.setXgry(xgry);
			this.jgyhservice.changePassword(yhvo);
			return this.success();
		}
	}
	private boolean isAccountValid(String yhdm) {
		Pattern pattern = Pattern.compile("^[A-Za-z0-9_\\-\\.]+$");
		Matcher matcher = pattern.matcher(yhdm);
		return matcher.matches();
	}
	
}
