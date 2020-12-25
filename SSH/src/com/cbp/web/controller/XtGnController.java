/*
 * Copyright 2019. All rights reserved.
 */
package com.cbp.web.controller;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import com.cbp.core.service.XtGnService;
import com.cbp.core.vo.XtcdVo;
import com.ctp.core.model.Result;
import com.ctp.web.controller.BaseController;

/**
*
* @author Huang
*/
@Controller
@RequestMapping(value = "/xtgn")

public class XtGnController extends BaseController {

    @Autowired
    private XtGnService XtGnService;
    
    @GetMapping(value = {"", "/", "/index"})
	public String pageLoad(HttpServletRequest request) {
		return "ptgl/yyxt/menu-mgmt";
	}
    
    @PostMapping(value = "/addXtgn")
    @ResponseBody
    public Result addXtgn(XtcdVo xtcd) {
    	String lrry = this.getYhdm();
    	xtcd.setLrry(lrry);
    	this.XtGnService.addXtgn(xtcd);
    	return this.success();
    }
    
    @PostMapping(value = "/updateXtgn")
    @ResponseBody
    public Result updateXtgn(XtcdVo xtcd) {
    	String xgry = this.getYhdm();
    	xtcd.setXgry(xgry);
    	this.XtGnService.updateXtgn(xtcd);
    	return this.success();
    }
    
    @GetMapping(value = "/deleteXtgn")
    @ResponseBody
    public Result deleteXtgn() {
    	this.XtGnService.deleteXtgn(this.getRequest().getParameter("cdid"));
    	return this.success();
    }
    
    @GetMapping(value="/getXtgn")
    @ResponseBody
    public Result getXtgn() {
    	return this.success(this.XtGnService.getXtgn());
    }
    
    @GetMapping(value="/findXtgn")
    @ResponseBody
    public Result findXtgn() {
    	return this.success(this.XtGnService.findXtgn(this.getRequest().getParameter("cdid")));
    }
   
}
