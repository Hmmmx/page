package com.cbp.core.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.cbp.core.model.TWgXtJgyhxx;
import com.cbp.core.vo.JgyhVo;
import com.ctp.core.exception.BizException;
import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.MD5;
import com.ctp.core.utils.UUIDUtil;


@Service
public class WgYhService extends BaseService {
	private static final Logger logger = Logger.getLogger(WgYhService.class);
	public void addJgYh(JgyhVo yhvo) throws Exception {
		ArrayList params = new ArrayList();
		params.add(yhvo.getYhdm());
		String sql = "select count(*) from t_wg_xt_jgyhxx where yhdm=? ";
		if (this.dao.queryCount(sql, params) > 0) {
			throw new Exception("此账号名已被使用");
		}
		TWgXtJgyhxx jgyh =new TWgXtJgyhxx();  
		jgyh.setYhid(UUIDUtil.genId());
		String passwordMd5 = MD5.getMD5(yhvo.getYhmm());
		jgyh.setYhmm(passwordMd5);
		jgyh.setSqid(yhvo.getSqid());
		jgyh.setGwid(yhvo.getGwid());
		jgyh.setYhdm(yhvo.getYhdm());
		jgyh.setYhmc(yhvo.getYhmc());
		jgyh.setDzyx(yhvo.getDzyx());
		jgyh.setWxh(yhvo.getWxh());
		jgyh.setLxdh(yhvo.getLxdh());
		jgyh.setDz(yhvo.getDz());
		jgyh.setXb(yhvo.getXb());
		jgyh.setYhlx(yhvo.getYhlx());
        jgyh.setYxbj("1");
		jgyh.setLrry(yhvo.getLrry());
		jgyh.setLrsj(DateUtils.getCurTimestamp());
		this.dao.save(jgyh);
	}

	public void updateJgYh(JgyhVo jgyh) throws Exception {
		TWgXtJgyhxx yh = (TWgXtJgyhxx) this.dao.get(TWgXtJgyhxx.class, jgyh.getYhid());
		yh.setGwid(jgyh.getGwid());
		yh.setYhmc(jgyh.getYhmc());
		yh.setDzyx(jgyh.getDzyx());
		yh.setWxh(jgyh.getWxh());
		yh.setLxdh(jgyh.getLxdh());
		yh.setDz(jgyh.getDz());
		yh.setXb(jgyh.getXb());
		yh.setYhlx(jgyh.getYhlx());
		yh.setYxbj(jgyh.getYxbj());
		yh.setXgry(jgyh.getXgry());
		yh.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(yh);
	}

	public void deleteJgYh(String yhid,String xgry) throws Exception {
		TWgXtJgyhxx yh = (TWgXtJgyhxx) this.dao.get(TWgXtJgyhxx.class, yhid);
//		this.dao.delete(yh);
		yh.setYxbj("9");
		yh.setXgry(xgry);
		yh.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(yh);
	}

	public List findJgYh(String sqid) throws Exception {

		ArrayList params = new ArrayList();
		params.add(sqid);
		String sql = "select t.yhid,t.sqid,t.gwid,t2.gwmc,t.yhdm,t.yhmc,t.dzyx,t.wxh,t.lxdh,t.dz,t.xb,t.yhlx,t.yxbj,t.lrry,t.lrsj,t.xgry,t.xgsj "
				+ "from t_wg_xt_jgyhxx t left join t_wg_xt_jggw t2 on t.gwid=t2.gwid " + "where t.sqid=? and t.yxbj!='9'  ";
		List<JgyhVo> rsList = this.dao.findBySQL(sql, params, JgyhVo.class);
		return rsList;
	}
	
	public List getJgYh(String yhid) throws Exception {

		ArrayList params = new ArrayList();
		params.add(yhid);
		String sql = "select t.yhid,t.sqid,t.gwid,t2.gwmc,t.yhdm,t.yhmc,t.dzyx,t.wxh,t.lxdh,t.dz,t.xb,t.yhlx,t.yxbj,t.lrry,t.lrsj,t.xgry,t.xgsj "
				+ "from t_wg_xt_jgyhxx t,t_wg_xt_jggw t2  " + "where t.yhid=?  and t.gwid=t2.gwid  ";
		List<JgyhVo> rsList = this.dao.findBySQL(sql, params, JgyhVo.class);
		return rsList;
	}

	public void resetPassword(JgyhVo jgyh) throws Exception {
		TWgXtJgyhxx yh = (TWgXtJgyhxx) this.dao.get(TWgXtJgyhxx.class, jgyh.getYhid());
		String passwordMd5 = MD5.getMD5(jgyh.getYhmm());
		yh.setYhmm(passwordMd5);
		yh.setXgry(jgyh.getXgry());
		yh.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(yh);
	}
	public void changePassword(JgyhVo yhvo) throws Exception {
		TWgXtJgyhxx yh = (TWgXtJgyhxx) this.dao.get(TWgXtJgyhxx.class, yhvo.getYhid());
		String oldpasswordMd5 = MD5.getMD5(yhvo.getYyhmm());
		String newpasswordMd5 = MD5.getMD5(yhvo.getYhmm());
		String password = yh.getYhmm();
		if (!oldpasswordMd5.equals(password)) {
			throw new BizException("您所输入的原密码错误!");
		}
		yh.setYhmm(newpasswordMd5);
		yh.setXgry(yhvo.getXgry());
		yh.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(yh);
	}
}
