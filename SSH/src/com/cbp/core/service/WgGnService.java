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

import com.cbp.core.model.TWgXtXtcd;
import com.cbp.core.vo.XtcdVo;
import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.UUIDUtil;

/**
 *
 * @author Huang
 */
@Service
public class WgGnService extends BaseService {

	public void addXtgn(XtcdVo cdvo) {
		TWgXtXtcd xtcd = new TWgXtXtcd();
		xtcd.setCdid(UUIDUtil.genId());
		xtcd.setCdmc(cdvo.getCdmc());
		xtcd.setUrl(cdvo.getUrl());
		xtcd.setSjcdid(cdvo.getSjcdid());
		xtcd.setCdlx(cdvo.getCdlx());
		xtcd.setPlxh(cdvo.getPlxh());
		xtcd.setYxbj("1");
		xtcd.setLrsj(DateUtils.getCurTimestamp());
		xtcd.setLrry(cdvo.getLrry());
		this.dao.save(xtcd);

	}

	public void updateXtgn(XtcdVo xtcdvo) {
		TWgXtXtcd xtcd = (TWgXtXtcd) this.dao.get(TWgXtXtcd.class, xtcdvo.getCdid());
		xtcd.setCdmc(xtcdvo.getCdmc());
		xtcd.setUrl(xtcdvo.getUrl());
		xtcd.setCdlx(xtcdvo.getCdlx());
		xtcd.setPlxh(xtcdvo.getPlxh());
		xtcd.setYxbj(xtcdvo.getYxbj());
		xtcd.setXgry(xtcdvo.getXgry());
		xtcd.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(xtcd);
	}

	public void deleteXtgn(String cdid) {
		TWgXtXtcd xtcd = (TWgXtXtcd) this.dao.get(TWgXtXtcd.class, cdid);
		this.dao.delete(xtcd);
		String sql = "delete t from t_wg_xt_jgcd t where t.cdid='" + cdid + "'";
		this.dao.executeSql(sql);
		String sql2 = "delete t from t_wg_xt_gwcd t where t.cdid='" + cdid + "'";
		this.dao.executeSql(sql2);

	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getXtgn() {// 该功能为超级管理员使用 有效标记是否有效都给与显示
		List<Map<String, Object>> orgList = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		map.put("cdid", '0');
		map.put("cdmc", "根目录");
		String sql = "select t.* from t_wg_xt_xtcd t where  t.yxbj!='9' order by t.plxh ";
		List<TWgXtXtcd> rsList = this.dao.findBySQL(sql, TWgXtXtcd.class);
		if (!StringUtils.isEmpty(rsList) && rsList.size() > 0) {
			List<Map<String, Object>> childrenList = this.getChildren("0", rsList);
			if (!StringUtils.isEmpty(childrenList) && childrenList.size() > 0) {

				map.put("children", childrenList);
			}

		}
		orgList.add(map);
		return orgList;
	}

	private List<Map<String, Object>> getChildren(String sjcdid, List<TWgXtXtcd> list) {
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

				List<Map<String, Object>> childrenList = this.getChildren(org.getCdid(), list);
				if (!StringUtils.isEmpty(childrenList) && childrenList.size() > 0) {
					map.put("children", childrenList);
				}

				orgList.add(map);
			}
		}

		return orgList;
	}

	public List<TWgXtXtcd> findXtgn(String cdid) {// 该功能为超级管理员使用 有效标记是否有效都给与显示

		ArrayList params = new ArrayList();
		params.add(cdid);
		String sql = "select t.* from t_wg_xt_xtcd t where  t.sjcdid=? and t.yxbj!=9 order by t.plxh ";
		List<TWgXtXtcd> rsList = this.dao.findBySQL(sql, params, TWgXtXtcd.class);
		return rsList;
	}

}
