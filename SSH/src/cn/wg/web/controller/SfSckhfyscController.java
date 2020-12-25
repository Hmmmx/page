package cn.wg.web.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

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
import com.ctp.web.controller.BaseController;

import cn.wg.core.service.SfSckhfyscService;
import cn.wg.core.vo.FyscVo;
import common.Logger;

@Controller
@RequestMapping()
public class SfSckhfyscController extends BaseController{

	private static final Logger logger = Logger.getLogger(SfSckhfyscController.class);
	
	@Autowired
	private SfSckhfyscService fyscservice;
	
	@InitBinder
	public void initBinder(WebDataBinder binder, WebRequest request) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	
	
	@GetMapping(value = { "", "/"})
	public String pageLoad() {
		return "";
	}
	
	@PostMapping()
	@ResponseBody
	public Result saveScfy(FyscVo scvo) throws Exception{
		scvo.setLrry(this.getYhdm());
		this.fyscservice.saveScfy(scvo);
		return this.success();
	}
}
