package com.ctp.web.controller;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ctp.core.model.Result;
import com.ctp.core.service.DmService;

@Controller
@RequestMapping(value = "/dm")
public class DmController extends BaseController {
	@Autowired
	private DmService dmService;
	
	@GetMapping(value = "/get")
	@ResponseBody
	public Result get() throws Exception {
		String category = this.getRequest().getParameter("category");
		String type = this.getRequest().getParameter("type");
		String q = this.getRequest().getParameter("q"); // query查询条件
		if (StringUtils.isNotBlank(type)) {
			if (StringUtils.isNotBlank(category))
				return this.success(this.dmService.get(category, type, q));
			else 
				return this.success(this.dmService.get(type, q));
		} else return this.error("参数错误");
	}
	
}
