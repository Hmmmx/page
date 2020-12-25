/*
 * Copyright 2019. All rights reserved.
 */
package com.cbp.core.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.cbp.core.model.TXtJgxx;
import com.cbp.core.model.TXtXtcd;
import com.cbp.core.vo.XtjgVo;
import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.StringTool;
import com.ctp.core.utils.UUIDUtil;

/**
 *
 * @author Huang
 */
@Service
public class XtJgService extends BaseService {
	private static final Logger logger = Logger.getLogger(XtJgService.class);
	@SuppressWarnings("unchecked")
	public void addXtjg(XtjgVo jgvo) throws Exception {
		TXtJgxx xtjg = new TXtJgxx();
		String sql = "select count(*) from t_xt_jgxx t where t.jgdm=? ";
		ArrayList params = new ArrayList();
		params.add(jgvo.getJgdm());
		if (this.dao.queryCount(sql, params) > 0) {
			throw new Exception("该机构代码已存在!");
		}
		String sql2 = "select count(*) from t_xt_jgxx t where t.jgmc=? ";
		ArrayList params2 = new ArrayList();
		params2.add(jgvo.getJgmc());
		if (this.dao.queryCount(sql2, params2) > 0) {
			throw new Exception("该机构名称已存在!");
		}

		xtjg.setJgid(UUIDUtil.genId());
		xtjg.setJgdm(jgvo.getJgdm());
		xtjg.setJgmc(jgvo.getJgmc());
		xtjg.setSjjgid(jgvo.getSjjgid());
		xtjg.setLxdh(jgvo.getLxdh());
		xtjg.setLxr(jgvo.getLxr());
		xtjg.setPlxh(jgvo.getPlxh());
		xtjg.setSyqxq(jgvo.getSyqxq());
		xtjg.setSyqxz(jgvo.getSyqxz());
		xtjg.setYxbj("1");
		xtjg.setLrsj(DateUtils.getCurTimestamp());
		xtjg.setLrry(jgvo.getLrry());
		this.dao.save(xtjg);

	}

	@SuppressWarnings("unchecked")
	public void updateXtjg(XtjgVo jgvo) throws Exception {

		String sql = "select count(*) from t_xt_jgxx t where t.jgdm=? and t.jgid!=?";
		ArrayList params = new ArrayList();
		params.add(jgvo.getJgdm());
		params.add(jgvo.getJgid());
		if (this.dao.queryCount(sql, params) > 0) {
			throw new Exception("该机构代码已存在!");
		}
		String sql2 = "select count(*) from t_xt_jgxx t where t.jgmc=? and t.jgid!=?";
		ArrayList params2 = new ArrayList();
		params2.add(jgvo.getJgmc());
		params2.add(jgvo.getJgid());
		if (this.dao.queryCount(sql2, params2) > 0) {
			throw new Exception("该机构名称已存在!");
		}
		TXtJgxx xtjg = (TXtJgxx) this.dao.get(TXtJgxx.class, jgvo.getJgid());
		xtjg.setJgmc(jgvo.getJgmc());
		xtjg.setLxdh(jgvo.getLxdh());
		xtjg.setLxr(jgvo.getLxr());
		xtjg.setPlxh(jgvo.getPlxh());
		xtjg.setSyqxq(jgvo.getSyqxq());
		xtjg.setSyqxz(jgvo.getSyqxz());
		xtjg.setYxbj(jgvo.getYxbj());
		xtjg.setXgry(jgvo.getXgry());
		xtjg.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(xtjg);
	}

	@SuppressWarnings("unchecked")
	public void deleteXtjg(String jgid) throws Exception {

		String sql = "select count(*) from t_xt_jgxx t where t.sjjgid=? ";
		ArrayList params = new ArrayList();
		params.add(jgid);
		if (this.dao.queryCount(sql, params) > 0) {
			throw new Exception("该机构存在下级机构,无法删除");
		}
//		String sql2="delete t from t_xt_jgcd t where t.jgid='"+jgid+"'";
//		this.dao.executeSql(sql2);
//		String sql3="delete t from t_xt_gwcd t where t.gwid in (select t2.gwid from t_xt_jggw t2 where t2.jgid='"+jgid+"') ";
//		this.dao.executeSql(sql3);
//		String sql4="delete t from t_xt_jggw t where t.jgid='"+jgid+"'";
//		this.dao.executeSql(sql4);
//		String sql5="delete t from t_xt_jgyh t where t.jgid='"+jgid+"'";
//		this.dao.executeSql(sql5);
		TXtJgxx xtjg = (TXtJgxx) this.dao.get(TXtJgxx.class, jgid);
//		dao.delete(xtjg);
		xtjg.setYxbj("9");
		dao.update(xtjg); // 不进行删除 只将有效标记改为无效

	}

	@SuppressWarnings("unchecked")
	public List findJgxx(String jgid) {
		List<Map<String, Object>> orgList = new ArrayList<>();
		ArrayList params = new ArrayList();
		params.add(jgid);
		String sql = "select t.* from t_xt_jgxx t where  t.sjjgid=? and t.yxbj!='9' order by t.plxh ";

		return this.dao.findBySQL(sql, params, TXtJgxx.class);
	}

	public List<Map<String, Object>> getXtjg() {// 该功能为超级管理员使用 有效标记是否有效都给与显示
		List<Map<String, Object>> orgList = new ArrayList<>();

		Map<String, Object> map = new HashMap<>();

		map.put("jgid", '0');
		map.put("jgmc", "根目录");
		String sql = "select t.* from t_xt_jgxx t where  t.yxbj!='9' order by t.plxh";
		List<TXtJgxx> rsList = this.dao.findBySQL(sql, TXtJgxx.class);

		if (!StringUtils.isEmpty(rsList) && rsList.size() > 0) {
			List<Map<String, Object>> childrenList = this.getChildren("0", rsList);
			if (!StringUtils.isEmpty(childrenList) && childrenList.size() > 0) {
				map.put("children", childrenList);
			}
		}

		orgList.add(map);
		return orgList;
	}

	private List<Map<String, Object>> getChildren(String sjjgid, List<TXtJgxx> list) {
		List<Map<String, Object>> orgList = new ArrayList<>();

		for (TXtJgxx org : list) {
			if (org.getSjjgid().equals(sjjgid)) {
				Map<String, Object> map = new HashMap<>();
				map.put("jgid", org.getJgid());
				map.put("jgdm", org.getJgdm());
				map.put("jgmc", org.getJgmc());
				map.put("sjjgid", org.getSjjgid());

				List<Map<String, Object>> childrenList = this.getChildren(org.getJgid(), list);
				if (!StringUtils.isEmpty(childrenList) && childrenList.size() > 0) {
					map.put("children", childrenList);
				}

				orgList.add(map);
			}
		}

		return orgList;
	}

	public String addXtJggn(XtjgVo jgvo) {
		String jgid = jgvo.getJgid();
		String cdidStr = jgvo.getCdidStr();
		List<String> cdidList = StringTool.StrTranStr(cdidStr);
		String sql = "delete t from t_xt_gwcd t where t.cdid not in (" + cdidStr + ") "
				+ "and t.gwid in (select gwid from t_xt_jggw where jgid='" + jgid + "')";
		this.dao.executeSql(sql);

		String sql2 = "delete t from t_xt_jgcd t where t.jgid ='" + jgid + "'";
		this.dao.executeSql(sql2);
		String sql3 = "insert into t_xt_jgcd (jgid,cdid,lrry,lrsj) VALUES";
		for (int i = 0; i < cdidList.size(); i++) {
			List<String> conditions = new ArrayList<String>();
			conditions.add("'" + jgid + "'");
			conditions.add("'" + cdidList.get(i).replaceAll("'", "") + "'");
			conditions.add("'" + jgvo.getLrry() + "'");
			conditions.add("now()");
			String ret = String.join(",", conditions);
			if (i != 0)
				sql3 += ",";
			sql3 += "(" + ret + ")";
		}
		this.dao.executeSql(sql3);

		return null;
	}

	public List getXtJggn(String jgid) { // 机构功能设置用 带系统功能树
		List<Map<String, Object>> orgList = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		map.put("cdid", "0");
		map.put("cdmc", "根目录");
		String sql = "select t.* from t_xt_xtcd t where  t.yxbj='1'  order by t.plxh ";
		List<TXtXtcd> rsList = this.dao.findBySQL(sql, TXtXtcd.class);

		ArrayList params2 = new ArrayList();
		params2.add(jgid);
		String sql2 = "select t.cdid from t_xt_jgcd t where  t.jgid=? ";
		List<String> rsList2 = this.dao.findBySQL(sql2, params2);
		if (!StringUtils.isEmpty(rsList) && rsList.size() > 0) {
			List<Map<String, Object>> childrenList = this.getChildren("0",rsList, rsList2);
			if (!StringUtils.isEmpty(childrenList) && childrenList.size() > 0) {
				map.put("children", childrenList);
			}
		}

		orgList.add(map);
		return orgList;
	}

	private List<Map<String, Object>> getChildren(String sjcdid,List<TXtXtcd> list, List<String> jggnList) {
		List<Map<String, Object>> orgList = new ArrayList<>();

		if (!StringUtils.isEmpty(list) && list.size() > 0) {
			for (TXtXtcd org : list) {
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
		}
		return orgList;
	}

}
