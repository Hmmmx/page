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

import com.cbp.core.service.WgJgService;
import com.cbp.core.vo.WgjgVo;
import com.ctp.core.model.Result;
import com.ctp.web.controller.BaseController;

/**
*
* @author Huang
 * 
*/
@Controller
@RequestMapping(value = "/wgjg")

public class WgJgController<XtJgVo> extends BaseController {

    @Autowired
    private WgJgService wgjgservice;
    
    @InitBinder
	public void initBinder(WebDataBinder binder, WebRequest request) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
    
    @GetMapping(value = {"", "/", "/index"})
	public String pageLoad(HttpServletRequest request) {
		return "ptgl/wgxt/org-wg";
	}
    
    @PostMapping(value = "/addXtjg")
    @ResponseBody
    public Result addXtjg(WgjgVo xtjg) throws Exception {
    	String lrry = this.getYhdm();
    	xtjg.setLrry(lrry);
    	this.wgjgservice.addXtjg(xtjg);
    	return this.success();
    }
    
    @PostMapping(value = "/updateXtjg")
    @ResponseBody
    public Result updateXtjg(WgjgVo jgvo) throws Exception {
    	String xgry = this.getYhdm();
    	jgvo.setXgry(xgry);
    	this.wgjgservice.updateXtjg(jgvo);
    	return this.success();
    }
    
    @GetMapping(value = "/deleteXtjg")
    @ResponseBody
    public Result deleteXtjg() throws Exception {
       this.wgjgservice.deleteXtjg(this.getRequest().getParameter("sqid"));
    	return this.success();
    }
    
    @GetMapping(value = "/findJgxx") //查询当前机构下级机构信息
    @ResponseBody
    public Result findJgxx() throws Exception {
       return this.success(this.wgjgservice.findJgxx(this.getRequest().getParameter("sqid")));
    }
    
    @GetMapping(value = "/getXtjg") //获取机构树
    @ResponseBody
    public Result getXtjg() throws Exception {
    	return this.success(this.wgjgservice.getXtjg(this.getJglx(), this.getJgid()));
    }
    
    @PostMapping(value = "/addXtJggn")//设置机构功能菜单
    @ResponseBody
    public Result addXtJggn(WgjgVo jgvo) {
    	String lrry = this.getYhdm();
    	jgvo.setLrry(lrry);
    	this.wgjgservice.addXtJggn(jgvo);
    	return this.success();
    }
    
    @GetMapping(value = "/getXtJggn") //获取机构树
    @ResponseBody
    public Result getXtJggn() throws Exception {
       return this.success(this.wgjgservice.getXtJggn(this.getRequest().getParameter("sqid")));
    }
    
    
    

    
   
}
