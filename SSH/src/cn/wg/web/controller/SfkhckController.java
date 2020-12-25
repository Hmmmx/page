package cn.wg.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ctp.core.model.Result;
import com.ctp.web.controller.BaseController;

import cn.wg.core.service.SfkhckService;
import cn.wg.core.vo.KhckVo;
import common.Logger;

@Controller
@RequestMapping(value = "/wygl/sfxt/cwkhck")
public class SfkhckController extends BaseController{
	private static final Logger logger = Logger.getLogger(SfkhckController.class);
	
	@Autowired
	private SfkhckService ckservice;
	
	@GetMapping(value = { "", "/", "/index "})
	public String pageLoad() {
		return "/wygl/sfxt/cwgl/khck";
	}
	
	@PostMapping(value = "/addKhck")
	@ResponseBody
	public Result addCkxx(KhckVo ckvo)throws Exception{
		String lrry = this.getYhdm();
		ckvo.setLrry(lrry);
		this.ckservice.addCkxx(ckvo);
		return this.success();
	}
	
	@PostMapping(value = "/updateKhck")
	@ResponseBody
	public Result updateCkxx(KhckVo ckvo)throws Exception{
		String xgry = this.getYhdm();
		ckvo.setXgry(xgry);
		this.ckservice.updateCkxx(ckvo);
		return this.success();
	}
	
	@GetMapping(value = "/deleteKhck")
	@ResponseBody
	public Result deleteCkxx()throws Exception{
		String xgry = this.getYhdm();
		this.ckservice.deleteCkxx(this.getRequest().getParameter("khckid"), xgry);
		return this.success();
	}
	
	@GetMapping(value = "/getKhck")
	@ResponseBody
	public Result getKhck()throws Exception{
		return this.success(this.ckservice.getKhck(this.getRequest().getParameter("fcid")));
	}
	
	@GetMapping(value = "/getCwhm")
	@ResponseBody
	public Result getCwhm()throws Exception{
		return this.success(this.ckservice.getCwhm(this.getRequest().getParameter("cwhm"), this.getRequest().getParameter("sqdm")));
	}
}
