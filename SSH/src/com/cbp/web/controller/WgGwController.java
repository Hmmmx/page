package com.cbp.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cbp.core.service.WgGwService;
import com.cbp.core.vo.JggwVo;
import com.ctp.core.model.Result;
import com.ctp.web.controller.BaseController;

/**
*
* @author Huang
*/
@Controller
@RequestMapping(value = "/wggw")
public class WgGwController extends BaseController {
	@Autowired
	private WgGwService gwservice;
	
	@GetMapping(value = {"", "/", "/index"})
	public String pageLoad(HttpServletRequest request) {
		return "ptgl/wgxt/pos-wg";
	}

	@PostMapping(value = "/addJgGw")
	@ResponseBody
	public Result addJgGw(JggwVo gwvo) {
		String lrry = this.getYhdm();
		gwvo.setLrry(lrry);
		this.gwservice.addJgGw(gwvo);
		return this.success();
	}
	
	@PostMapping(value = "/updateJgGw")
	@ResponseBody
	public Result updateJgGw(JggwVo gwvo) {
		String xgry = this.getYhdm();
		gwvo.setXgry(xgry);
		this.gwservice.updateJgGw(gwvo);
		return this.success();
	}
	
	@GetMapping(value = "/deleteJgGw")
	@ResponseBody
	public Result deleteJgGw() throws Exception {
		this.gwservice.deleteJgGw(this.getRequest().getParameter("gwid"));
		return this.success();
	}
	
	@GetMapping(value = "/findJgGw")
	@ResponseBody
	public Result findJgGw() throws Exception {
		return this.success(this.gwservice.findJgGw(this.getRequest().getParameter("sqid")));
	}
	@GetMapping(value = "/getGwgn") 
    @ResponseBody
    public Result getGwgn() throws Exception {
       return this.success(this.gwservice.getGwgn(this.getRequest().getParameter("sqid"),
    		   this.getRequest().getParameter("gwid")));
    }
	
	@PostMapping(value = "/addGwgn")
	@ResponseBody
	public Result addGwgn(JggwVo gwvo) throws Exception {
		String lrry = this.getYhdm();
		gwvo.setLrry(lrry);
		this.gwservice.addGwgn(gwvo);
		return this.success();
	}
	
}
