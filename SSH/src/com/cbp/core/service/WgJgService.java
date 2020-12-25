/*
 * Copyright 2019. All rights reserved.
 */
package com.cbp.core.service;

import java.util.ArrayList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.cbp.core.model.TWgXtJgxx;
import com.cbp.core.model.TWgXtXtcd;
import com.cbp.core.vo.WgjgVo;
import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.StringTool;
import com.ctp.core.utils.UUIDUtil;

/**
 *
 * @author Huang
 */
@Service
public class WgJgService extends BaseService {

	public void addXtjg(WgjgVo jgvo) throws Exception {
		TWgXtJgxx wgjg = new TWgXtJgxx();
		String sql = "select count(*) from t_wg_xt_jgxx t where t.sqdm=? ";
		ArrayList params = new ArrayList();
		params.add(jgvo.getSqdm());
		if (this.dao.queryCount(sql, params) > 0) {
			throw new Exception("该机构代码已存在!");
		}
		String sql2 = "select count(*) from t_wg_xt_jgxx t where t.sqmc=? ";
		ArrayList params2 = new ArrayList();
		params2.add(jgvo.getSqmc());
		if (this.dao.queryCount(sql2, params2) > 0) {
			throw new Exception("该机构名称已存在!");
		}
        if(jgvo.getSqlx().equals("2")) { //初始化机构收费项目
    	   String sql3="insert into t_wg_hd_jgsfxm (jgsfxmid,sqdm,sfxmdm,sfxmmc,fylxdm,djconfig,yxbj)"
    	   		+ "select MD5(UUID()),'"+jgvo.getSqdm()+"',t.sfxmdm,t.sfxmmc,t.fylxdm,null,t.yxbj "
    	   				+ "from t_wg_dm_sfxm t";
    	   this.dao.executeSql(sql3);
        }
		wgjg.setSqid(UUIDUtil.genId());
		wgjg.setSqdm(jgvo.getSqdm());
		wgjg.setSqmc(jgvo.getSqmc());
		wgjg.setSqlx(jgvo.getSqlx());
		wgjg.setSjsqid(jgvo.getSjsqid());
		wgjg.setYysid("4d55bc1136564d2ca79518b84bc5b488");// 正式环境运营商id固定为清远云社区id 
		wgjg.setLxdh(jgvo.getLxdh());
		wgjg.setLxr(jgvo.getLxr());
		wgjg.setDz(jgvo.getDz());
		wgjg.setBz(jgvo.getBz());
		wgjg.setPlxh(jgvo.getPlxh());
		wgjg.setSyqxq(jgvo.getSyqxq());
		wgjg.setSyqxz(jgvo.getSyqxz());
		wgjg.setYxbj("1");
		wgjg.setLrsj(DateUtils.getCurTimestamp());
		wgjg.setLrry(jgvo.getLrry());
		this.dao.save(wgjg);

	}

	public void updateXtjg(WgjgVo jgvo) throws Exception {

		String sql = "select count(*) from t_wg_xt_jgxx t where t.sqdm=? and t.sqid!=?";
		ArrayList params = new ArrayList();
		params.add(jgvo.getSqdm());
		params.add(jgvo.getSqid());
		if (this.dao.queryCount(sql, params) > 0) {
			throw new Exception("该社区代码已存在!");
		}
		String sql2 = "select count(*) from t_wg_xt_jgxx t where t.sqmc=? and t.sqid!=?";
		ArrayList params2 = new ArrayList();
		params2.add(jgvo.getSqmc());
		params2.add(jgvo.getSqid());
		if (this.dao.queryCount(sql2, params2) > 0) {
			throw new Exception("该社区名称已存在!");
		}
		TWgXtJgxx wgjg = (TWgXtJgxx) this.dao.get(TWgXtJgxx.class, jgvo.getSqid());
		wgjg.setSqmc(jgvo.getSqmc());
		wgjg.setLxdh(jgvo.getLxdh());
		wgjg.setLxr(jgvo.getLxr());
		wgjg.setDz(jgvo.getDz());
		wgjg.setSqlx(jgvo.getSqlx());
		wgjg.setBz(jgvo.getBz());
		wgjg.setPlxh(jgvo.getPlxh());
		wgjg.setSyqxq(jgvo.getSyqxq());
		wgjg.setSyqxz(jgvo.getSyqxz());
		wgjg.setYxbj(jgvo.getYxbj());
		wgjg.setXgsj(DateUtils.getCurTimestamp());
		wgjg.setXgry(jgvo.getXgry());
	}

	@SuppressWarnings("unchecked")
	public void deleteXtjg(String sqid) throws Exception {

		String sql = "select count(*) from t_wg_xt_jgxx t where t.sjsqid=? ";
		ArrayList params = new ArrayList();
		params.add(sqid);
		if (this.dao.queryCount(sql, params) > 0) {
			throw new Exception("该社区存在下级机构,无法删除");
		}

		TWgXtJgxx wgjg = (TWgXtJgxx) this.dao.get(TWgXtJgxx.class, sqid);
		wgjg.setYxbj("1");
		dao.update(wgjg); // 不进行删除 只将有效标记改为无效

	}

	@SuppressWarnings("unchecked")
	public List findJgxx(String sqid) {

		ArrayList<Object> params = new ArrayList<Object>();
		params.add(sqid);
		String sql = "select t.* from t_wg_xt_jgxx t where  t.sjsqid=? and t.yxbj!=9 order by t.plxh ";

		return this.dao.findBySQL(sql, params, TWgXtJgxx.class);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getXtjg(String jglx, String jgid) {// 该功能为超级管理员使用 有效标记是否有效都给与显示
		List<Map<String, Object>> orgList = new ArrayList<>();

		Map<String, Object> map = new HashMap<>();

		map.put("sqid", '0');
		map.put("sqmc", "根目录");
		
		ArrayList<Object> params = new ArrayList<Object>();
		String sql = null;
		List<TWgXtJgxx> rsList = null;
		if ("1".equals(jglx)) { // 1:物业公司用户
			params.add(jgid);
			params.add(jgid);
			sql = "select t.* from t_wg_xt_jgxx t where (sqid=? or sjsqid=?) and t.yxbj!=9 order by t.plxh";
			rsList = this.dao.findBySQL(sql, params, TWgXtJgxx.class);
			if (rsList != null) {
				for (TWgXtJgxx jgxx : rsList) {
					if (jgxx.getSqid().equals(jgid)) {
						jgxx.setSjsqid("0"); //直接设置为根目录
						break;
					}
				}
			}
		} else if ("2".equals(jglx)) { // 2：社区用户
			params.add(jgid);
			sql = "select t.* from t_wg_xt_jgxx t where sqid=? and t.yxbj!=9 order by t.plxh";
			rsList = this.dao.findBySQL(sql, params, TWgXtJgxx.class);
			if (rsList != null) {
				for (TWgXtJgxx jgxx : rsList) {
					jgxx.setSjsqid("0"); //直接设置为根目录
				}
			}
		} else if ("0".equals(jglx)) { // 0:导航（实际上没有这类用户）
			// 忽略
		} else { // 其他用户（一般是平台管理员）
			sql = "select t.* from t_wg_xt_jgxx t where t.yxbj!=9 order by t.plxh";
			rsList = this.dao.findBySQL(sql, TWgXtJgxx.class);
		}
		if (!StringUtils.isEmpty(rsList) && rsList.size() > 0) {
			List<Map<String, Object>> childrenList = this.getChildren("0", rsList);
			if (!StringUtils.isEmpty(childrenList) && childrenList.size() > 0) {
				map.put("children", childrenList);
			}
		}

		orgList.add(map);
		return orgList;
	}

	private List<Map<String, Object>> getChildren(String sjcdid, List<TWgXtJgxx> list) {
		List<Map<String, Object>> orgList = new ArrayList<>();
		for (TWgXtJgxx org : list) {
			if (org.getSjsqid().equals(sjcdid)) {
				Map<String, Object> map = new HashMap<>();
				map.put("sqid", org.getSqid());
				map.put("sqdm", org.getSqdm());
				map.put("sqmc", org.getSqmc());
				map.put("sjsqid", org.getSjsqid());
				List<Map<String, Object>> childrenList = this.getChildren(org.getSqid(), list);
				if (!StringUtils.isEmpty(childrenList) && childrenList.size() > 0) {
					map.put("children", childrenList);
				}

				orgList.add(map);
			}
		}

		return orgList;
	}

	public String addXtJggn(WgjgVo jgvo) {
		String sqid = jgvo.getSqid();
		String cdidStr = jgvo.getCdidStr();
		List<String> cdidList = StringTool.StrTranStr(cdidStr);
		String sql2 = "delete t from t_wg_xt_jgcd t where t.sqid ='" + sqid + "'";
		this.dao.executeSql(sql2);
		
		String sql =null;
		if (cdidStr!=null&&!"".equals(cdidStr)) {
			 sql = "delete t from t_wg_xt_gwcd t where t.cdid not in (" + cdidStr + ") "
					+ "and t.gwid in (select gwid from t_wg_xt_jggw where sqid='" + sqid + "')";
			
		}else {
			 sql = "delete t from t_wg_xt_gwcd t where t.gwid in (select gwid from t_wg_xt_jggw where sqid='" + sqid + "')";
			
		}
		this.dao.executeSql(sql);

		if (cdidStr!=null&&!"".equals(cdidStr)) {
		String sql3 = "insert into t_wg_xt_jgcd (sqid,cdid,yxbj,lrry,lrsj) VALUES";
		for (int i = 0; i < cdidList.size(); i++) {
			List<String> conditions = new ArrayList<String>();
			conditions.add("'" + sqid + "'");
			conditions.add("'" + cdidList.get(i).replaceAll("'", "") + "'");
			conditions.add("'1'");
			conditions.add("'" + jgvo.getLrry() + "'");
			conditions.add("now()");
			String ret = String.join(",", conditions);
			if (i != 0)
				sql3 += ",";
			sql3 += "(" + ret + ")";
		}
		this.dao.executeSql(sql3);
		}
		return null;
	}

	public List getXtJggn(String sqid) { // 机构功能设置用 带系统功能树
		List<Map<String, Object>> orgList = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		map.put("cdid", "0");
		map.put("cdmc", "根目录");
		String sql = "select t.* from t_wg_xt_xtcd t where   t.yxbj='1'  order by t.plxh ";
		List<TWgXtXtcd> rsList = this.dao.findBySQL(sql, TWgXtXtcd.class);

		ArrayList params2 = new ArrayList();
		params2.add(sqid);
		String sql2 = "select t.cdid from t_wg_xt_jgcd t where  t.sqid=? ";
		List<String> rsList2 = this.dao.findBySQL(sql2, params2);
		if (!StringUtils.isEmpty(rsList) && rsList.size() > 0) {
			List<Map<String, Object>> childrenList = this.getChildren("0", rsList, rsList2);
			if (!StringUtils.isEmpty(childrenList) && childrenList.size() > 0) {
				map.put("children", childrenList);
			}
		}

		orgList.add(map);
		return orgList;
	}

	private List<Map<String, Object>> getChildren(String sjcdid, List<TWgXtXtcd> list, List<String> jggnList) {
		List<Map<String, Object>> orgList = new ArrayList<>();

		for (TWgXtXtcd org : list) {
			if (org.getSjcdid().equals(sjcdid)) {
				Map<String, Object> map = new HashMap<>();
				map.put("cdid", org.getCdid());
				map.put("cdmc", org.getCdmc());
				map.put("cdlx", org.getCdlx());
				map.put("fcdid", org.getSjcdid());
				map.put("url", org.getUrl());
				map.put("plxh", org.getPlxh());
				map.put("cdlx", org.getCdlx());
				map.put("yxbj", org.getYxbj());
				if (!StringUtils.isEmpty(jggnList) && jggnList.contains(org.getCdid())) {
					map.put("checked", true);
				} else {
					map.put("checked", false);
				}
                List<Map<String, Object>> childrenList = this.getChildren(org.getCdid(),list, jggnList);
				if (!StringUtils.isEmpty(childrenList) && childrenList.size() > 0) {
					map.put("children", childrenList);
				}

				orgList.add(map);

			}
		}

		return orgList;
	}

}
