package cn.wg.web.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;
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

import cn.wg.core.service.SfSfbzService;
import cn.wg.core.vo.SfbzVo;

@Controller
@RequestMapping(value = "/wygl/sfxt/sfbz")
public class SfSfbzController extends BaseController{
	private static final Logger logger = Logger.getLogger(SfSfbzController.class);
	@Autowired
	private SfSfbzService bzservice;

	@InitBinder
	public void initBinder(WebDataBinder binder, WebRequest request) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	
	@GetMapping(value = { "", "/", "/index" })
	public String pageLoad() {
		return "wygl/sfxt/fyhd/sfbz";
	}
	
	@PostMapping(value = "/addSfbz")
	@ResponseBody
	public Result addSfbz(SfbzVo sfvo) throws Exception{
		String lrry = this.getJgdm();
		sfvo.setLrry(lrry);
		sfvo.setLrsj(DateUtils.getCurTimestamp());
		this.bzservice.addSfbz(sfvo);
		return this.success();
	}
	
	@PostMapping(value = "/updateSfbz")
	@ResponseBody
	public Result updateSfbz(SfbzVo sfvo) throws Exception{
		String xgry = this.getJgdm();
		sfvo.setXgry(xgry);
		sfvo.setXgsj(DateUtils.getCurTimestamp());
		this.bzservice.updateSfbz(sfvo);
		return this.success();
	}
	
	@GetMapping(value = "deleteSfbz")
	@ResponseBody
	public Result deleteSfbz() throws Exception{
		String xgry = this.getJgdm();
		this.bzservice.deleteSfbz(this.getRequest().getParameter("sfbzid"), xgry);
		return this.success();
	}
	
	@GetMapping(value = "getJgsfbz")
	@ResponseBody
	public Result getJgsfbz() throws Exception{
		return this.success(this.bzservice.getSfbz(this.getJgdm(), this.getJglx()));
	}
	
	@GetMapping(value = "/getWyjlx")
	@ResponseBody
	public Result getWyjlx() throws Exception{
		return this.success(this.bzservice.getWyjlxList(this.getRequest().getParameter("sqdm")));
	}
	
	@GetMapping(value = "/getSfbzje")
	@ResponseBody
	public Result getSfbzje() throws Exception{
		return this.success(this.bzservice.getSfbzje(this.getRequest().getParameter("fcid"), this.getRequest().getParameter("khid"), this.getRequest().getParameter("sfbzid"), this.getRequest().getParameter("fylxdm")));
	}
	
	@GetMapping(value = "/getSfxmje")
	@ResponseBody
	public Result getSfxmje() throws Exception{
		return this.success(this.bzservice.getSfbzje(this.getRequest().getParameter("fcid"), this.getRequest().getParameter("khid"), this.getRequest().getParameter("sfxmdm"), this.getRequest().getParameter("sqdm")));
	}
	
	@GetMapping(value = "/getSfbz")
	@ResponseBody
	public Result getSfbz(String sqdm) throws Exception{
		return this.success(this.bzservice.getSfbz(sqdm, "2"));
	}
}
