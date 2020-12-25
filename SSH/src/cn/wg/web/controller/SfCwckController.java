package cn.wg.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ctp.core.model.Result;
import com.ctp.web.controller.BaseController;

import cn.wg.core.service.SfCwckService;
import cn.wg.core.vo.CkxxVo;
import common.Logger;

@Controller
@RequestMapping(value = "/wygl/sfxt/cwck")
public class SfCwckController extends BaseController{
	private static final Logger logger = Logger.getLogger(SfCwckController.class);
	 @Autowired
	 private SfCwckService ckxxservice;
	 
	 @GetMapping(value = { "", "/" })
	 public String pageLoad() {
		 return "wygl/sfxt/cwgl/ckgl";
	 }
	 
	 @PostMapping(value = "/addCkxx")
	 @ResponseBody
	 public Result addCkxx(CkxxVo ckvo) {
		 String lrry = this.getYhdm();
		 ckvo.setLrry(lrry);
		 this.ckxxservice.addCkxx(ckvo);
		 return success();
	 }
	 
	 @PostMapping(value = "/updateCkxx")
	 @ResponseBody
	 public Result updateCkxx(CkxxVo ckvo) {
		 String xgry = this.getYhdm();
		 ckvo.setXgry(xgry);
		 this.ckxxservice.updateCkxx(ckvo);
		 return success();
	 }
	 
	 @GetMapping(value = "/deleteCkxx")
	 @ResponseBody
	 public Result deleteCkxx() throws Exception{
		 this.ckxxservice.deleteCkxx(this.getRequest().getParameter("ckid"));
		 return success();
	 }
	 
	 @GetMapping(value = "/getCkxx")
	 @ResponseBody
	 public Result getCkxx() throws Exception{
		 return success(this.ckxxservice.getCkxx(this.getRequest().getParameter("sqdm")));
	 }
	 
	 @GetMapping(value = "/getSqList")
	 @ResponseBody
	 public Result getSqList() throws Exception{
		 String sqdm = this.getJgdm();
		 String sqlx = this.getJglx();
		 return success(this.ckxxservice.getSqList(sqdm, sqlx));
	 }
	
}
