package cn.wg.web.controller;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
import com.sun.jna.platform.unix.X11.XClientMessageEvent.Data;

import cn.wg.core.service.SfCbfccblrService;
import cn.wg.core.vo.FccbmxVo;
import cn.wg.core.vo.FcybcxVo;
import common.Logger;

@Controller
@RequestMapping(value = "/wygl/sfxt/cbgl/fccblr")
public class SfCbfccblrController extends BaseController{

	private static final Logger logger = Logger.getLogger(SfCbfccblrController.class);
	
	@Autowired
	private SfCbfccblrService lrCbfccblrService;
	
	@InitBinder
	public void initBinder(WebDataBinder binder, WebRequest request) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Data.class, new CustomDateEditor(dateFormat, true));
	}
	
	@GetMapping(value = { "", "/" })
	public String pageLoad() {
		return "wygl/sfxt/cbgl/fccblr";
	}
	
	@PostMapping(value = "/saveFccblr")
	@ResponseBody
	public Result saveCblr() throws Exception{
		String cbjlmx = this.getRequest().getParameter("cbjlmx");
		
		if(StringUtils.isNotBlank(cbjlmx)) {
			List<FccbmxVo> list = new ArrayList<FccbmxVo>();
			String []arr = cbjlmx.split("@0ie9@");
			
			if(arr != null && arr.length > 0) {
				for(String a : arr) {
					FccbmxVo vo = new FccbmxVo();
					String [] col = a.split("&0ie9&",13);
					vo.setKhybcbid(StringUtils.isBlank(col[0]) ? null : col[0]);
					vo.setKhybid(StringUtils.isBlank(col[1]) ? null : col[1]);
					vo.setSqcbid(StringUtils.isBlank(col[2]) ? null : col[2]);
					vo.setSqcbrq(DateUtils.StringToDate(col[3]));
					vo.setSqds(new BigDecimal(StringUtils.isBlank(col[4]) ? null : col[4]));
					vo.setBqcbrq(DateUtils.StringToDate(col[5]));
					vo.setBqds(new BigDecimal(col[6]));
					vo.setBqyl(new BigDecimal(col[7]));
					vo.setGhbj(StringUtils.isBlank(col[8]) ? null : col[8]);
					vo.setJbyl(new BigDecimal(StringUtils.isBlank(col[9]) ? null : col[9]));
					vo.setSjyl(new BigDecimal(StringUtils.isBlank(col[10]) ? null : col[10]));
					vo.setBz(StringUtils.isBlank(col[11]) ? null : col[11]);
					vo.setShbj("1");
					vo.setFyscbj("0");
					vo.setCzry(this.getYhdm());
					list.add(vo);
				}
			}
			this.lrCbfccblrService.saveCblr(list);
		}
		return this.success();
	}
	
	@PostMapping(value = "/updateFccblr")
	@ResponseBody
	public Result updateCbmx() throws Exception{
		String cbjlmx = this.getRequest().getParameter("cbjlmx");
		
		if(StringUtils.isNotBlank(cbjlmx)) {
			List<FccbmxVo> list = new ArrayList<FccbmxVo>();
			String []arr = cbjlmx.split("@ie9@");
			
			if( arr != null && arr.length > 0) {
				for(String a : arr) {
					FccbmxVo vo = new FccbmxVo();
					String []col = a.split("&ie9&", 13);
					vo.setKhybcbid(StringUtils.isBlank(col[0]) ? null : col[0]);
					vo.setKhybid(StringUtils.isBlank(col[1]) ? null : col[1]);
					vo.setSqcbid(StringUtils.isBlank(col[2]) ? null : col[2]);
					vo.setSqcbrq(DateUtils.StringToDate(col[3]));
					vo.setSqds(new BigDecimal(StringUtils.isBlank(col[4]) ? null : col[4]));
					vo.setBqcbrq(DateUtils.StringToDate(col[5]));
					vo.setBqds(new BigDecimal(col[6]));
					vo.setBqyl(new BigDecimal(col[7]));
					vo.setGhbj(StringUtils.isBlank(col[8]) ? null : col[8]);
					vo.setJbyl(new BigDecimal(StringUtils.isBlank(col[9]) ? null : col[9]));
					vo.setSjyl(new BigDecimal(StringUtils.isBlank(col[10]) ? null : col[10]));
					vo.setBz(StringUtils.isBlank(col[11]) ? null : col[11]);
					vo.setCzry(this.getYhdm());
					list.add(vo);
				}
			}
			this.lrCbfccblrService.updateCblr(list);
		}
		return this.success();
	}
	
	@GetMapping(value = "/getCbjlList")
	@ResponseBody
	public Result getCbjlList(FcybcxVo cxvo) throws Exception{
		
		return this.success(this.lrCbfccblrService.getCbjlList(cxvo));
	}
	
	
}
