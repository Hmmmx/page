package cn.wg.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ctp.core.model.Result;
import com.ctp.web.controller.BaseController;

import cn.wg.core.service.SfCwxxService;
import cn.wg.core.vo.CwxxVo;
import common.Logger;

@Controller
@RequestMapping(value = "/wygl/sfxt/cwxx")
public class SfCwxxController extends BaseController{
	
	private static final Logger logger = Logger.getLogger(SfCwxxController.class);
	
	@Autowired
	private SfCwxxService cwxxservice;
	
	@GetMapping(value = { "", "/" })
	public String pageLoad() {
		return "wygl/sfxt/cwgl/cwxx";
	}
	
	@PostMapping(value = "/addCwxx")
	@ResponseBody
	public Result addCwxx(CwxxVo cwvo) throws Exception{
		String lrry = this.getYhmc();
		cwvo.setLrry(lrry);
		this.cwxxservice.addCwxx(cwvo);
		return this.success();
	}
	
	@PostMapping(value = "/updateCwxx")
	@ResponseBody
	public Result updateCwxx(CwxxVo cwvo) throws Exception{
		String xgry = this.getYhdm();
		cwvo.setXgry(xgry);
		this.cwxxservice.updateCwxx(cwvo);
		return this.success();
	}
	
	
	@GetMapping(value = "/deleteCwxx")
	@ResponseBody
	public Result deleteCwxx()throws Exception{
		this.cwxxservice.deleteCwxx(this.getRequest().getParameter("cwid"));
		return this.success();
	}
	
	@GetMapping(value = "/getCwxx")
	@ResponseBody
	public Result getCwxx()throws Exception{
		String ckid = this.getRequest().getParameter("ckid");
		return this.success(this.cwxxservice.getCwxx(ckid));
	}
	
	@GetMapping(value = "/getCkList")
	@ResponseBody
	public Result getCkList()throws Exception{
		String sqdm = this.getJgdm();
		String sqlx = this.getJglx();
		return this.success(this.cwxxservice.getCkList(sqdm, sqlx));
	}
}
