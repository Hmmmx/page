package com.cbp.web.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ctp.core.model.Result;
import com.ctp.web.controller.BaseController;

@Controller
public class HomeController extends BaseController {
	@GetMapping(value = {"/home"})
	public String pageLoad(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		response.setHeader("Pragma", "no-cache");
		response.setDateHeader("Expires", 0);
		return "home/home";
	}
	
	@GetMapping(value = "/home/getJgxx")
	@ResponseBody
	public Result getJgmc(HttpServletRequest request) {
		HashMap<String, String> jgxx = new HashMap<String, String>();
		jgxx.put("jgmc", this.getJgmc());
		jgxx.put("jgsyqxz", this.getJgSyqxz());
		return this.success(jgxx);
	}
}
