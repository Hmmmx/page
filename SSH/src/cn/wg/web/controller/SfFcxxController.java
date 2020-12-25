package cn.wg.web.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
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
import com.ctp.web.controller.BaseController;

import cn.wg.core.service.SfFcxxService;
import cn.wg.core.vo.FcFcxxVo;
import cn.wg.core.vo.FcdyVo;
import cn.wg.core.vo.FclyVo;
import cn.wg.core.vo.FcqyVo;
import cn.wg.core.vo.SfFcxxTreeNodeVo;

/**
 * @Title:       长丰科技
 * @author       stanley
 * @Date         20191213
 * @version      V1.0 
 * @Description: 房产管理所有功能: 生成树，CRUD
 */
@Controller
@RequestMapping(value = "/wygl/sfxt/fcgl/fcxx")
public class SfFcxxController extends BaseController {
	private static final Logger logger = Logger.getLogger(SfFcxxController.class);

	@Autowired
	private SfFcxxService sfFcxxService;

	@InitBinder
	public void initBinder(WebDataBinder binder, WebRequest request) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}

	@GetMapping(value = { "", "/", "/index" })
	public String pageLoad() {
		return "wygl/sfxt/fcgl/fcxx";
	}

	/** 
	  * @Description:  加载房产树节点列表，前端再根据列表生成树
	  * @param:   
	  * @return:  Result
	  * @author stanley
	  * @Date   20191213 
	  */
	@RequestMapping(value = "/loadFcxxTree")
	@ResponseBody
	public Result loadFcxxTree() {
		String jgid = this.getJgid();
		String jglx = this.getJglx();
		String mode = this.getRequest().getParameter("mode");
		String rangeStr = this.getRequest().getParameter("range");
		int range = 30; // 默认到楼宇级别
		if (StringUtils.isNotBlank(rangeStr)) range = Integer.parseInt(rangeStr);
		return this.success(this.sfFcxxService.getFcxxTree(jgid, jglx, mode, range));
	}

	@RequestMapping(value = "/loadFcxxTreeNode")
	@ResponseBody
	public Result loadFcxxTreeNode(SfFcxxTreeNodeVo fcxxTreeNodeVo) { // 查询节点的下级节点，当前只用于楼宇节点ajax查询
		if (StringUtils.isNotBlank(fcxxTreeNodeVo.getId()) && StringUtils.isNotBlank(fcxxTreeNodeVo.getType())) {
			String mode = this.getRequest().getParameter("mode");
			String rangeStr = this.getRequest().getParameter("range");
			int range = 55; // 默认返回到房产及且带上相应客户名称
			if (StringUtils.isNotBlank(rangeStr)) range = Integer.parseInt(rangeStr);
			return this.success(this.sfFcxxService.getFcxxTreeNode(fcxxTreeNodeVo, mode, range));
		} else {
			return this.error("参数不正确");
		}
	}

	@GetMapping(value = "/getInfo")
	@ResponseBody
	public Result getInfo(SfFcxxTreeNodeVo fcxxTreeNodeVo) { // 查询树节点的详细信息
		if (StringUtils.isNotBlank(fcxxTreeNodeVo.getId()) && StringUtils.isNotBlank(fcxxTreeNodeVo.getType())) {
			return this.success(this.sfFcxxService.getSpInfo(fcxxTreeNodeVo));
		} else {
			return this.error("参数不正确");
		}
	}

	@PostMapping(value = "/del")
	@ResponseBody
	public Result del(SfFcxxTreeNodeVo fcxxTreeNodeVo) throws Exception { // 删除树节点(状态设为9)
		if (StringUtils.isNotBlank(fcxxTreeNodeVo.getId()) && StringUtils.isNotBlank(fcxxTreeNodeVo.getType())) {
			this.sfFcxxService.del(fcxxTreeNodeVo);
			return this.success();
		} else {
			return this.error("参数不正确");
		}
	}

	@PostMapping(value = "/editQy")
	@ResponseBody
	public Result editQy(FcqyVo fcqyVo) throws Exception { // 修改或添加区域信息
		if (StringUtils.isNotBlank(fcqyVo.getQymc())) {
			if (StringUtils.isBlank(fcqyVo.getQyid())) {
				String lrry = this.getYhdm();
				fcqyVo.setLrry(lrry);
				return this.success(this.sfFcxxService.addQy(fcqyVo));
			} else {
				String xgry = this.getYhdm();
				fcqyVo.setXgry(xgry);
				this.sfFcxxService.updateQy(fcqyVo);
				return this.success();
			}
		} else {
			return this.error("参数不正确");
		}
	}

	@PostMapping(value = "/editLy")
	@ResponseBody
	public Result editLy(FclyVo fclyVo) throws Exception { // 修改或添加楼宇信息
		if (StringUtils.isNotBlank(fclyVo.getLymc())) {
			if (StringUtils.isBlank(fclyVo.getLyid())) {
				String lrry = this.getYhdm();
				fclyVo.setLrry(lrry);
				return this.success(this.sfFcxxService.addLy(fclyVo));
			} else {
				String xgry = this.getYhdm();
				fclyVo.setXgry(xgry);
				this.sfFcxxService.updateLy(fclyVo);
				return this.success();
			}
		} else {
			return this.error("参数不正确");
		}
	}

	@PostMapping(value = "/editDy")
	@ResponseBody
	public Result editDy(FcdyVo fcdyVo) throws Exception { // 修改或添加单元信息
		if (StringUtils.isNotBlank(fcdyVo.getDymc())) {
			if (StringUtils.isBlank(fcdyVo.getDyid())) {
				String lrry = this.getYhdm();
				fcdyVo.setLrry(lrry);
				return this.success(this.sfFcxxService.addDy(fcdyVo));
			} else {
				String xgry = this.getYhdm();
				fcdyVo.setXgry(xgry);
				this.sfFcxxService.updateDy(fcdyVo);
				return this.success();
			}
		} else {
			return this.error("参数不正确");
		}
	}

	@PostMapping(value = "/editFcxx")
	@ResponseBody
	public Result editFcxx(FcFcxxVo fcFcxxVo) throws Exception { // 修改或添加房产信息
		if (StringUtils.isNotBlank(fcFcxxVo.getFchm())) {
			if (StringUtils.isBlank(fcFcxxVo.getFcid())) {
				String lrry = this.getYhdm();
				fcFcxxVo.setLrry(lrry);
				return this.success(this.sfFcxxService.addFcxx(fcFcxxVo));
			} else {
				String xgry = this.getYhdm();
				fcFcxxVo.setXgry(xgry);
				this.sfFcxxService.updateFcxx(fcFcxxVo);
				return this.success();
			}
		} else {
			return this.error("参数不正确");
		}
	}
}
