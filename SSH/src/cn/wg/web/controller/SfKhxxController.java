package cn.wg.web.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
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

import cn.wg.core.service.SfKhxxService;
import cn.wg.core.vo.KhxxVo;

/**
 * @Title: 长丰科技
 * @author hwh
 * @Date 20191214
 * @version V1.0
 * @Description: 客户信息管理
 */

@Controller
@RequestMapping(value = "/wygl/sfxt/khgl/khxx")
public class SfKhxxController extends BaseController {
	@Autowired
	private SfKhxxService khService;
	
	@InitBinder
	public void initBinder(WebDataBinder binder, WebRequest request) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	
	@GetMapping(value = { "", "/", "/index" })
	public String pageLoad() {
		return "wygl/sfxt/khgl/khxx";
	}
	
	@PostMapping(value = "/addKhxx")
	@ResponseBody
	public Result addKhxx(KhxxVo khVo) throws Exception {
		khVo.setLrsj(DateUtils.getCurTimestamp());
		khVo.setLrry(this.getYhdm());
		this.khService.addKhxx(khVo);
		return this.success();
	}

	@PostMapping(value = "/updateKhxx")
	@ResponseBody
	public Result updateKhxx(KhxxVo khVo) throws Exception {
		khVo.setXgry(this.getYhdm());
		khVo.setXgsj(DateUtils.getCurTimestamp());
		this.khService.updateKhxx(khVo);
		return this.success();
	}

	@PostMapping(value = "/deleteKhxx")
	@ResponseBody
	public Result deleteKhxx() throws Exception {
		String xgry = this.getYhdm();
		this.khService.deleteKhxx(this.getRequest().getParameter("khid"), xgry);
		return this.success();
	}

	@GetMapping(value = "/getKhxxList")
	@ResponseBody
	public Result getKhxxList() throws Exception {
		String lite = this.getRequest().getParameter("lite");
		if (StringUtils.isBlank(lite)) {
			return this.success(this.khService.getKhxxList(this.getRequest().getParameter("fcid"), false));
		} else {
			return this.success(this.khService.getKhxxList(this.getRequest().getParameter("fcid"), 
					Boolean.parseBoolean(lite)));
		}
	}
	
	@GetMapping(value = "/getKhsq")
	@ResponseBody
	public Result getKhsq() throws Exception {
		return this.success(this.khService.getKhsq(this.getJgid(),this.getJglx()));
		
	}
}
