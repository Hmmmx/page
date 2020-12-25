/*
 * Copyright 2019. All rights reserved.
 */
package com.cbp.web.controller;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;

import com.cbp.core.service.XtJgService;
import com.cbp.core.vo.XtjgVo;
import com.ctp.core.model.Result;
import com.ctp.web.controller.BaseController;

/**
*
* @author Huang
 * 
*/
@Controller
@RequestMapping(value = "/xtjg")

public class XtJgController<XtJgVo> extends BaseController {

    @Autowired
    private XtJgService xtjgservice;
    
    @InitBinder
	public void initBinder(WebDataBinder binder, WebRequest request) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
    
    @GetMapping(value = {"", "/", "/index"})
	public String pageLoad(HttpServletRequest request) {
		return "ptgl/yyxt/org-mgmt";
	}
    
    @PostMapping(value = "/addXtjg")
    @ResponseBody
    public Result addXtjg(XtjgVo xtjg) throws Exception {
    	String lrry = this.getYhdm();
    	xtjg.setLrry(lrry);
    	this.xtjgservice.addXtjg(xtjg);
    	return this.success();
    }
    
    @PostMapping(value = "/updateXtjg")
    @ResponseBody
    public Result updateXtjg(XtjgVo jgvo) throws Exception {
    	String xgry = this.getYhdm();
    	jgvo.setXgry(xgry);
    	this.xtjgservice.updateXtjg(jgvo);
    	return this.success();
    }
    
    @GetMapping(value = "/deleteXtjg")
    @ResponseBody
    public Result deleteXtjg() throws Exception {
       this.xtjgservice.deleteXtjg(this.getRequest().getParameter("jgid"));
    	return this.success();
    }
    
    @GetMapping(value = "/findJgxx") //查询当前机构下级机构信息
    @ResponseBody
    public Result findJgxx() throws Exception {
       return this.success(this.xtjgservice.findJgxx(this.getRequest().getParameter("jgid")));
    }
    
    @GetMapping(value = "/getXtjg") //获取机构树
    @ResponseBody
    public Result getXtjg() throws Exception {
       return this.success(this.xtjgservice.getXtjg());
    }
    
    @PostMapping(value = "/addXtJggn")//设置机构功能菜单
    @ResponseBody
    public Result addXtJggn(XtjgVo jgvo) {
    	String lrry = this.getYhdm();
    	jgvo.setLrry(lrry);
    	this.xtjgservice.addXtJggn(jgvo);
    	return this.success();
    }
    
    @GetMapping(value = "/getXtJggn") //获取机构树
    @ResponseBody
    public Result getXtJggn() throws Exception {
       return this.success(this.xtjgservice.getXtJggn(this.getRequest().getParameter("jgid")));
    }
    
    
    

    
   
}
