package cn.wg.web.controller;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;

import com.ctp.core.model.Result;
import com.ctp.core.utils.DateUtils;
import com.ctp.web.controller.BaseController;

import cn.wg.core.service.SfHdxxService;
import cn.wg.core.vo.HdxxVo;
import jxl.write.DateTime;

@Controller
@RequestMapping(value = "/wygl/sfxt/hd")
public class SfHdxxController extends BaseController{

	private static final Logger logger = Logger.getLogger(SfHdxxController.class);
	
	@InitBinder
	public void InitBinder(WebDataBinder binder ,WebRequest request) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	
	@Autowired
	private SfHdxxService hdservice;
	
	@GetMapping(value = { "" , "/" , "/index"} )
	public  String pageLoad() {
		return "/wygl/sfxt/fyhd/fyhd";
	}
	
	@GetMapping(value = "/plhd")
	public String pageLoadPlhd() {
		return "wygl/sfxt/fyhd/plhd";
	}
	
	
	@PostMapping(value = "/addHdxx")
	@ResponseBody
	public Result addHdxx(@RequestBody HdxxVo hdvo) throws Exception{
		hdvo.setLrsj(DateUtils.getCurTimestamp());
		hdvo.setLrry(this.getYhdm());
		this.hdservice.addHdxx(hdvo);
		return this.success();
	}
	
	@PostMapping(value = "/addPlhd")
	@ResponseBody
	public Result addPlhd(HdxxVo hdvo) throws Exception{
		hdvo.setLrsj(DateUtils.getCurTimestamp());
		hdvo.setLrry(this.getYhdm());
		this.hdservice.addPlhd(hdvo);
		return this.success();
	}
	
	@PostMapping(value = "/updateHdxx")
	@ResponseBody
	public Result updateHdxx(HdxxVo hdvo) throws Exception{
		String xgry = this.getYhdm();
		hdvo.setXgry(xgry);
		this.hdservice.updateHdxx(hdvo);
		return this.success();
	}
	
	@GetMapping(value = "/deleteHdxx")
	@ResponseBody
	public Result deleteHdxx() throws Exception{
		this.hdservice.deleteHdxx(this.getRequest().getParameter("hdid"));
		return this.success();
	}
	
	@GetMapping(value = "/getHdxxList")
	@ResponseBody
	public Result getHdxx() throws Exception{
		return this.success(this.hdservice.getHdxx(this.getRequest().getParameter("fcid")));
	}
	
	@GetMapping(value = "/getYhdkhxx")
	@ResponseBody
	public Result getYhdkhxx(String sfbzid, String khlxdm) throws Exception {
		return this.success(this.hdservice.getYhdkhxx(sfbzid, khlxdm));
	}
	
	@GetMapping(value = "/getSfbz")
	@ResponseBody
	public Result getSfbzByFylxdm() throws Exception{
		return this.success(this.hdservice.getSfbzByFylxdm(this.getRequest().getParameter("sqdm"), this.getRequest().getParameter("fylxdmStr")));
	}
	
	@GetMapping(value = "/getSfbzBySfxmdm")
	@ResponseBody
	public Result getSfbzBySfxmdm(String fcid, String khid, String sfxmdm, String fylxdm) throws Exception{
		return this.success(this.hdservice.getSfbzBySfxmdm(fcid, khid, sfxmdm, fylxdm));
	}
	
	@GetMapping(value = "/getSfxm")
	@ResponseBody
	public Result getSfxmByFylxdm() throws Exception{
		return this.success(this.hdservice.getSfxmByFylxdm(this.getRequest().getParameter("sqdm"), this.getRequest().getParameter("fylxdm"), this.getRequest().getParameter("fylxStr")));
	}
	
	@GetMapping(value = "/getJgyjdj")
	@ResponseBody
	public Result getJgyjdj() throws Exception{
		return this.success(this.hdservice.getJgyjdj(this.getRequest().getParameter("sqdm")));
	}
}
