package cn.wg.web.controller;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

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

import com.ctp.core.model.Result;
import com.ctp.core.utils.DateUtils;
import com.ctp.web.controller.BaseController;

import cn.wg.core.service.SfCbfcybglService;
import cn.wg.core.vo.FcybVo;
import common.Logger;

@Controller
@RequestMapping(value = "/wygl/sfxt/cbgl/khyb")

public class SfCbfcybglController extends BaseController{

	private static final Logger logger = Logger.getLogger(SfCbfcybglController.class);
	
	@InitBinder
	public void InitBinder(WebDataBinder binder, WebRequest request) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	
	@Autowired
	private SfCbfcybglService ybservice;
	
	@GetMapping(value = { "", "/" })
	public String pageLoad() {
		return "wygl/sfxt/cbgl/khyb";
	}
	
	@PostMapping(value = "/addKhyb")
	@ResponseBody
	public Result addKhyb(FcybVo ybvo) throws Exception{
		ybvo.setLrry(this.getYhdm());
		ybvo.setLrsj(DateUtils.getCurTimestamp());
		ybvo.setYxbj("1");
		this.ybservice.addKhyb(ybvo);
		return this.success();
	}
	
	@PostMapping(value = "/updateKhyb")
	@ResponseBody
	public Result updateKhyb(FcybVo ybvo) throws Exception{
		ybvo.setXgry(this.getYhdm());
		this.ybservice.updateKhyb(ybvo);
		return this.success();
	}
	
	@PostMapping(value = "deleteKhyb")
	@ResponseBody
	public Result deleteKhyb() throws Exception{
		this.ybservice.deleteKhyb(this.getRequest().getParameter("khybid"));
		return this.success();
	}
	
	@GetMapping(value = "/getKhybList")
	@ResponseBody
	public Result getKhyb() throws Exception{
		return this.success(this.ybservice.getFcyb(this.getRequest().getParameter("fcid")));
	}
	
	@GetMapping(value = "/getFckhybmxList")
	@ResponseBody
	public Result getFckhybList() throws Exception{
		return this.success(this.ybservice.getFckhybList(this.getRequest().getParameter("fcid")));
	}
	
	@GetMapping(value = "/getKhybmxList")
	@ResponseBody
	public Result getKhybList() throws Exception{
		return this.success(this.ybservice.getKhybList(this.getRequest().getParameter("khybid")));
	}
}
