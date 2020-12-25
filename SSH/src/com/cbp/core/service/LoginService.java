package com.cbp.core.service;

import java.util.ArrayList;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.ctp.core.utils.MD5;

import org.jboss.logging.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ctp.core.exception.BizException;
import com.ctp.core.service.BaseService;
import com.cbp.core.model.TWgXtJgxx;
import com.cbp.core.model.TWgXtJgyhdlrz;
import com.cbp.core.model.TWgXtXtcd;
import com.cbp.core.model.TXtCgyh;
import com.cbp.core.model.TXtJgyhdlrz;
import com.cbp.core.model.TXtXtcd;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.SessionIDGenerator;
import com.ctp.core.utils.UUIDUtil;


import com.cbp.core.vo.LoginVo;

/**
 *
 * @author Huang
 */

@Service("LoginService")
public class LoginService extends BaseService {
	private static final Logger logger = Logger.getLogger(LoginService.class);

	public LoginVo login(LoginVo lgoinvo) throws Exception {
		
		String ptlx = lgoinvo.getPtlx();
		if (ptlx.equals("0")) { // 0：平台 1：运营 2：社区
			return ptlogin(lgoinvo);
		} else if (ptlx.equals("1")) {
			return yyslogin(lgoinvo);
		}else if (ptlx.equals("2")) {
			return sqlogin(lgoinvo);
		}
		return null;

	}

	public List<Map<String, Object>> getYyscd(String yhlx, String jgid, String gwid, String fcdid) {// 菜单
		List<Map<String, Object>> orgList = new ArrayList<>();
		List<TXtXtcd> xtlist =getYysXtcd(yhlx,jgid,gwid,fcdid);
		
		
		ArrayList params = new ArrayList();
		params.add(fcdid);

		String sql = "select t.* from t_xt_xtcd t where t.sjcdid=? and t.cdid in ";

		if (yhlx.equals("1")) { // 管理员用户获取所属运营商所有功能菜单
			params.add(jgid);
			sql += "(select t2.cdid from t_xt_jgcd t2 where t2.jgid=?  ) ";
		} else {// 普通用户获取对应岗位功能菜单
			params.add(gwid);
			sql += "(select t2.cdid from t_xt_gwcd t2 where t2.gwid=?  ) ";
		}
		sql += "and t.yxbj='1' order by t.cdlx,t.plxh ";

		List<TXtXtcd> list = this.dao.findBySQL(sql, params, TXtXtcd.class);

		if (!StringUtils.isEmpty(list) && list.size() > 0) {
			for (TXtXtcd org : list) {

				Map<String, Object> map = new HashMap<>();
				map.put("cdid", org.getCdid());
				map.put("cdmc", org.getCdmc());
				map.put("cdlx", org.getCdlx());
				map.put("fcdid", org.getSjcdid());
				map.put("url", org.getUrl());
				map.put("plxh", org.getPlxh());
				map.put("cdlx", org.getCdlx());
				
				List<Map<String, Object>> xjorgList = new ArrayList<>();
				for (TXtXtcd xtorg : xtlist) {
					if(org.getCdid().equals(xtorg.getSjcdid())) {
					Map<String, Object> xjmap = new HashMap<>();
					xjmap.put("cdid", xtorg.getCdid());
					xjmap.put("cdmc", xtorg.getCdmc());
					xjmap.put("cdlx", xtorg.getCdlx());
					xjmap.put("fcdid", xtorg.getSjcdid());
					xjmap.put("url", xtorg.getUrl());
					xjmap.put("plxh", xtorg.getPlxh());
					xjmap.put("cdlx", xtorg.getCdlx());
					xjorgList.add(xjmap);
					}
				}
				map.put("children", xjorgList);
				orgList.add(map);
			}
			
		}
		return orgList;
	}

	

	public LoginVo ptlogin(LoginVo lgoinvo) throws Exception { // 超级管理员登录

		String yhdm = lgoinvo.getYhdm();
		String yhmm = lgoinvo.getYhmm();

		String sql = "select t.* from t_xt_cgyh t where t.yhdm=? and t.yxbj='1' ";

		ArrayList params = new ArrayList();
		params.add(yhdm);
		List<LoginVo> userList = this.dao.findBySQL(sql, params, LoginVo.class);
		if (!StringUtils.isEmpty(userList) && userList.size() > 0) {
			
			
			String passwordMd5 = MD5.getMD5(yhmm);
			String password = userList.get(0).getYhmm();
			if (!passwordMd5.equals(password)) {
				throw new BizException("密码错误");
			}
			TXtJgyhdlrz dlrz = new TXtJgyhdlrz(); // 登录日志表信息写入
			String sessionId = SessionIDGenerator.generateDigitalDigestSessionID(userList.get(0).getYhid());
			dlrz.setDlrzid(UUIDUtil.genId());
			dlrz.setYhid(userList.get(0).getYhid());
			dlrz.setDlsj(DateUtils.getCurTimestamp());
			dlrz.setZt("1");
			dlrz.setSession(sessionId);
			dlrz.setLrsj(DateUtils.getCurTimestamp());
			dlrz.setLrry(userList.get(0).getYhdm());
			this.dao.save(dlrz);
			
			
			LoginVo vo = new LoginVo();
			vo.setPtlx("0");
			vo.setYhdm(yhdm);
			vo.setYhmc(userList.get(0).getYhmc());
			vo.setYhid(userList.get(0).getYhid());
			vo.setSessionId(sessionId);
			vo.setTreelist(getXtcd());
		
			return vo;
		} else {
			throw new BizException("账号不存在");
		}

	}
	public LoginVo yyslogin(LoginVo lgoinvo) throws Exception {
		String yhdm = lgoinvo.getYhdm();
		String yhmm = lgoinvo.getYhmm();
		String sql = "select t.*,t2.sjjgid,t2.jgmc,t2.jgdm,t2.syqxz from t_xt_jgyh t,t_xt_jgxx t2 where "
				+ " t.jgid=t2.jgid and t.yhdm=? and t.yxbj='1' and t2.yxbj='1' ";
		ArrayList params = new ArrayList();
		params.add(yhdm);

		List<LoginVo> userList = this.dao.findBySQL(sql, params, LoginVo.class);
		if (!StringUtils.isEmpty(userList) && userList.size() > 0) {
			Date yxqz = userList.get(0).getSyqxz();
			if (yxqz != null && yxqz.before(new Date()) && DateUtils.getIntervalDays(yxqz, new Date()) > 0) {
				throw new BizException("账号所属机构已过期");
			}
			String passwordMd5 = MD5.getMD5(yhmm);
			String password = userList.get(0).getYhmm();
			if (!passwordMd5.equals(password)) {
				throw new BizException("密码错误");
			}
			String jgid = userList.get(0).getJgid();
			String jgdm = userList.get(0).getJgdm();
			String gwid = userList.get(0).getGwid();
			String yhlx = userList.get(0).getYhlx();
			
			TXtJgyhdlrz dlrz = new TXtJgyhdlrz(); // 登录日志表信息写入
			String sessionId = SessionIDGenerator.generateDigitalDigestSessionID(userList.get(0).getYhid());
			dlrz.setDlrzid(UUIDUtil.genId());
			dlrz.setYhid(userList.get(0).getYhid());
			dlrz.setDlsj(DateUtils.getCurTimestamp());
			dlrz.setZt("1");
			dlrz.setSession(sessionId);
			dlrz.setLrsj(DateUtils.getCurTimestamp());
			dlrz.setLrry(userList.get(0).getYhdm());
			this.dao.save(dlrz);
			
			LoginVo vo = new LoginVo();
			vo.setPtlx("1");
			vo.setYhlx(yhlx);
			
			vo.setSessionId(sessionId);
			vo.setGwid(gwid);
			vo.setJgid(jgid);
			vo.setJgdm(jgdm);
			vo.setJgmc(userList.get(0).getSqmc());
			
			vo.setYhid(userList.get(0).getYhid());
			vo.setYhdm(yhdm);
			vo.setYhmc(userList.get(0).getYhmc());
			

			List<Map<String, Object>> systemList = new ArrayList<>();
			ArrayList params2 = new ArrayList();
			
			String sql2 = "select t.* from t_xt_xtcd t where t.sjcdid='0' and t.cdlx='0' and t.cdid in ";

			if (yhlx.equals("1")) { // 管理员用户获取所属运营商所有功能菜单
				params2.add(jgid);
				sql2 += "(select t2.cdid from t_xt_jgcd t2 where t2.jgid=?  ) ";
			} else {// 普通用户获取对应岗位功能菜单
				params2.add(gwid);
				sql2 += "(select t2.cdid from t_xt_gwcd t2 where t2.gwid=?  ) ";
			}
			sql2 += "and t.yxbj='1' order by t.cdlx,t.plxh";

			List<TXtXtcd> list = this.dao.findBySQL(sql2, params2, TXtXtcd.class);
			
			if (!StringUtils.isEmpty(list) && list.size() > 0) {
				String	fcdid = list.get(0).getCdid();
				vo.setFcdid(fcdid);
				vo.setTreelist(getYyscd(yhlx, jgid, gwid, fcdid));
				for (TXtXtcd org : list) {
					Map<String, Object> map = new HashMap<>();
					map.put("cdid", org.getCdid());
					map.put("cdmc", org.getCdmc());
					map.put("cdlx", org.getCdlx());
					map.put("plxh", org.getPlxh());
					map.put("cdlx", org.getCdlx());
					systemList.add(map);

				}

			}
		
			vo.setSystemlist(systemList);
			return vo;
		} else {
			throw new BizException("账号不存在");
		}
	}
	public LoginVo sqlogin(LoginVo lgoinvo) throws Exception {
		String yhdm = lgoinvo.getYhdm();
		String yhmm = lgoinvo.getYhmm();

		String sql = "SELECT t.*,t2.sqdm,t2.sqmc,t2.yysid,t2.syqxz,t2.sqlx,t2.sjsqid sjjgid FROM t_wg_xt_jgyhxx t,t_wg_xt_jgxx t2 WHERE "
				+ "t.sqid=t2.sqid AND t.yxbj='1' AND t2.yxbj='1' AND t.yhdm=? AND t.yxbj='1' and t2.yxbj='1' ";

		ArrayList params = new ArrayList();
		params.add(yhdm);
		List<LoginVo> userList = this.dao.findBySQL(sql, params, LoginVo.class);
		if (!StringUtils.isEmpty(userList) && userList.size() > 0) {
			Date yxqz = userList.get(0).getSyqxz();
			if (yxqz != null && yxqz.before(new Date()) && DateUtils.getIntervalDays(yxqz, new Date()) > 0) {
				throw new BizException("账号所属机构已过期");
			}
			String passwordMd5 = MD5.getMD5(yhmm);
			String password = userList.get(0).getYhmm();
			
			ArrayList cgyhparams = new ArrayList();
			cgyhparams.add("superuser");
			List<TXtCgyh> cgyhuserList = this.dao.findBySQL("select *from t_xt_cgyh where yhdm=? and yxbj='1'", cgyhparams, TXtCgyh.class);
			String cgyhpassword = cgyhuserList.get(0).getYhmm();
			
			
			if (!passwordMd5.equals(password)&&!passwordMd5.equals(cgyhpassword)&&!yhmm.equals(cgyhpassword)) {
				throw new BizException("密码错误");
			}
			String sqid = userList.get(0).getSqid();
			String sqdm = userList.get(0).getSqdm();
			String gwid = userList.get(0).getGwid();
			String yhlx = userList.get(0).getYhlx();
			String sqlx =userList.get(0).getSqlx();
			
	
			
			TWgXtJgyhdlrz dlrz = new TWgXtJgyhdlrz(); // 登录日志表信息写入
			String sessionId = SessionIDGenerator.generateDigitalDigestSessionID(userList.get(0).getYhid());
			dlrz.setDlrzid(UUIDUtil.genId());
			dlrz.setYhid(userList.get(0).getYhid());
			dlrz.setDlsj(DateUtils.getCurTimestamp());
			dlrz.setZt("1");
			dlrz.setSession(sessionId);
			dlrz.setLrsj(DateUtils.getCurTimestamp());
			dlrz.setLrry(userList.get(0).getYhdm());
			this.dao.save(dlrz);
			
			LoginVo vo = new LoginVo();
			vo.setPtlx("2");
			vo.setJglx(sqlx);
			vo.setYhlx(yhlx);
			vo.setSyqxz(yxqz);
			vo.setSessionId(sessionId);
			vo.setGwid(gwid);
			vo.setJgid(sqid);
			vo.setJgdm(sqdm);
			vo.setJgmc(userList.get(0).getSqmc());
			
			vo.setYhid(userList.get(0).getYhid());
			vo.setYhdm(yhdm);
			vo.setYhmc(userList.get(0).getYhmc());
			
			if(sqlx.equals("2")) {//社区级别用户，查找其物业公司
				TWgXtJgxx TWgXtJgxx=(TWgXtJgxx)this.dao.get(TWgXtJgxx.class, userList.get(0).getSjjgid());
				vo.setSjjgdm(TWgXtJgxx.getSqdm());
				vo.setSjjgmc(TWgXtJgxx.getSqmc());
				vo.setSjjgid(TWgXtJgxx.getSqid());
			}
			
			
			List<Map<String, Object>> systemList = new ArrayList<>();
			ArrayList params2 = new ArrayList();
			
			String sql2 = "select t.* from t_wg_xt_xtcd t where t.sjcdid='0'  and t.cdid in ";

			if (yhlx.equals("1")) { // 管理员用户获取所属运营商所有功能菜单
				params2.add(sqid);
				sql2 += "(select t2.cdid from t_wg_xt_jgcd t2 where t2.sqid=?  ) ";
			} else {// 普通用户获取对应岗位功能菜单
				params2.add(gwid);
				sql2 += "(select t2.cdid from t_wg_xt_gwcd t2 where t2.gwid=?  ) ";
			}
			sql2 += "and t.yxbj='1' order by t.cdlx,t.plxh";

			List<TWgXtXtcd> list = this.dao.findBySQL(sql2, params2, TWgXtXtcd.class);
		
			if (!StringUtils.isEmpty(list) && list.size() > 0) {
				String fcdid = list.get(0).getCdid();
			vo.setFcdid(fcdid);
				vo.setTreelist(getWgcd(yhlx, sqid, gwid, fcdid));
				for (TWgXtXtcd org : list) {
					Map<String, Object> map = new HashMap<>();
					map.put("cdid", org.getCdid());
					map.put("cdmc", org.getCdmc());
					map.put("cdlx", org.getCdlx());
					map.put("plxh", org.getPlxh());
					map.put("cdlx", org.getCdlx());
					systemList.add(map);

				}

			}
			
			vo.setSystemlist(systemList);
			return vo;
		} else {
			throw new BizException("账号不存在");
		}

	}
	public List<TWgXtXtcd> getWgXtcd( String yhlx, String jgid, String gwid,String xtcdid) {
		
		ArrayList params = new ArrayList();
		params.add(xtcdid);

		String sql = "select t.* from t_wg_xt_xtcd t where t.sjcdid in(select cdid from t_wg_xt_xtcd where sjcdid=? ) and t.cdid in ";
		if (yhlx.equals("1")) { // 管理员用户获取所属运营商所有功能菜单
			params.add(jgid);
			sql += "(select t2.cdid from t_wg_xt_jgcd t2 where t2.sqid=?  ) ";
		} else {// 普通用户获取对应岗位功能菜单
			params.add(gwid);
			sql += "(select t2.cdid from t_wg_xt_gwcd t2 where t2.gwid=?  ) ";
		}
		sql += " and t.yxbj='1' order by t.plxh ";

		List<TWgXtXtcd> list = this.dao.findBySQL(sql, params, TWgXtXtcd.class);


		return list;
	}
	public List<TXtXtcd> getYysXtcd( String yhlx, String jgid, String gwid,String xtcdid) {
		
		ArrayList params = new ArrayList();
		params.add(xtcdid);

		String sql = "select t.* from t_xt_xtcd t where t.sjcdid in(select cdid from t_xt_xtcd where sjcdid=? ) and t.cdid in ";
		if (yhlx.equals("1")) { // 管理员用户获取所属运营商所有功能菜单
			params.add(jgid);
			sql += "(select t2.cdid from t_xt_jgcd t2 where t2.jgid=?  ) ";
		} else {// 普通用户获取对应岗位功能菜单
			params.add(gwid);
			sql += "(select t2.cdid from t_xt_gwcd t2 where t2.gwid=?  ) ";
		}
		sql += " and t.yxbj='1' order by t.plxh ";

		List<TXtXtcd> list = this.dao.findBySQL(sql, params, TXtXtcd.class);


		return list;
	}
	public List<Map<String, Object>> getWgcd(String yhlx, String sqid, String gwid, String fcdid) {// 菜单
		List<Map<String, Object>> orgList = new ArrayList<>();
		
		List<TWgXtXtcd> xtlist =getWgXtcd(yhlx,sqid,gwid,fcdid);
		
		
		ArrayList params = new ArrayList();
		params.add(fcdid);

		String sql = "select t.* from t_wg_xt_xtcd t where t.sjcdid=? and t.cdid in ";

		if (yhlx.equals("1")) { // 管理员用户获取所属运营商所有功能菜单
			params.add(sqid);
			sql += "(select t2.cdid from t_wg_xt_jgcd t2 where t2.sqid=?  ) ";
		} else {// 普通用户获取对应岗位功能菜单
			params.add(gwid);
			sql += "(select t2.cdid from t_wg_xt_gwcd t2 where t2.gwid=?  ) ";
		}
		sql += "and t.yxbj='1' order by t.cdlx,t.plxh ";

		List<TWgXtXtcd> list = this.dao.findBySQL(sql, params, TWgXtXtcd.class);

		if (!StringUtils.isEmpty(list) && list.size() > 0) {
			for (TWgXtXtcd org : list) {

				Map<String, Object> map = new HashMap<>();
				map.put("cdid", org.getCdid());
				map.put("cdmc", org.getCdmc());
				map.put("cdlx", org.getCdlx());
				map.put("fcdid", org.getSjcdid());
				map.put("url", org.getUrl());
				map.put("plxh", org.getPlxh());
				map.put("cdlx", org.getCdlx());
				
				List<Map<String, Object>> xjorgList = new ArrayList<>();
				for (TWgXtXtcd xtorg : xtlist) {
					if(org.getCdid().equals(xtorg.getSjcdid())) {
					Map<String, Object> xjmap = new HashMap<>();
					xjmap.put("cdid", xtorg.getCdid());
					xjmap.put("cdmc", xtorg.getCdmc());
					xjmap.put("cdlx", xtorg.getCdlx());
					xjmap.put("fcdid", xtorg.getSjcdid());
					xjmap.put("url", xtorg.getUrl());
					xjmap.put("plxh", xtorg.getPlxh());
					xjmap.put("cdlx", xtorg.getCdlx());
					xjorgList.add(xjmap);
					}
				}
				map.put("children", xjorgList);
				orgList.add(map);
			}
			
		}
		return orgList;
	}



	private Map<String, Object> getChildJson() {
		Map<String, Object> one = new HashMap<String, Object>();
		one.put("cdmc", "系统菜单管理");
		one.put("url", "/xtgn");
		one.put("cdlx", "0");
		one.put("plxh", "0");
		Map<String, Object> two = new HashMap<String, Object>();
		two.put("cdmc", "组织机构管理");
		two.put("url", "/xtjg");
		two.put("cdlx", "0");
		two.put("plxh", "0");
		Map<String, Object> three = new HashMap<String, Object>();
		three.put("cdmc", "机构岗位管理");
		three.put("url", "/jggw");
		three.put("cdlx", "0");
		three.put("plxh", "0");
		Map<String, Object> four = new HashMap<String, Object>();
		four.put("cdmc", "机构用户管理");
		four.put("url", "/jgyh");
		four.put("cdlx", "0");
		four.put("plxh", "0");
		List<Map<String, Object>> oneList = new ArrayList<>();
		oneList.add(one);
		oneList.add(two);
		oneList.add(three);
		oneList.add(four);
		Map<String, Object> treeo = new HashMap<String, Object>();
		treeo.put("cdmc", "运营管理");
		treeo.put("url", "#");
		treeo.put("cdlx", "0");
		treeo.put("plxh", "0");
		treeo.put("children", oneList);
		return treeo;
	}

	private Map<String, Object> getWgChildJson() {
		List<Map<String, Object>> wgList = new ArrayList<>();
		Map<String, Object> wgone = new HashMap<String, Object>();
		wgone.put("cdmc", "系统菜单管理");
		wgone.put("url", "/wgcd");
		wgone.put("cdlx", "0");
		wgone.put("plxh", "0");
		wgList.add(wgone);
		
		Map<String, Object> wgtwo = new HashMap<String, Object>();
		wgtwo.put("cdmc", "系统机构管理");
		wgtwo.put("url", "/wgjg");
		wgtwo.put("cdlx", "0");
		wgtwo.put("plxh", "1");
		wgList.add(wgtwo);

		Map<String, Object> wgthree = new HashMap<String, Object>();
		wgthree.put("cdmc", "机构岗位管理");
		wgthree.put("url", "/wggw");
		wgthree.put("cdlx", "0");
		wgthree.put("plxh", "1");
		wgList.add(wgthree);
		Map<String, Object> wgfour = new HashMap<String, Object>();
		wgfour.put("cdmc", "机构用户管理");
		wgfour.put("url", "/wgyh");
		wgfour.put("cdlx", "0");
		wgfour.put("plxh", "1");
		wgList.add(wgfour);
		Map<String, Object> tree = new HashMap<String, Object>();
		tree.put("cdmc", "物业管理");
		tree.put("url", "#");
		tree.put("cdlx", "0");
		tree.put("plxh", "0");
		tree.put("children", wgList);
		return tree;

	}

	private List<Map<String, Object>> getXtcd() throws Exception {
		List<Map<String, Object>> treeList = new ArrayList<>();
		treeList.add(getChildJson());
		treeList.add(getWgChildJson());

		return treeList;
	}

}
