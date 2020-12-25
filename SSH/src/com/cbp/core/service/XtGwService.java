package com.cbp.core.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.cbp.core.model.TXtJggw;
import com.cbp.core.vo.JggwVo;
import com.cbp.core.vo.XtcdVo;
import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.StringTool;
import com.ctp.core.utils.UUIDUtil;

@Service
public class XtGwService extends BaseService {

	private static final Logger logger = Logger.getLogger(XtGwService.class);

	public void addJgGw(JggwVo gwvo) {
		TXtJggw jggw = new TXtJggw();
		jggw.setGwid(UUIDUtil.genId());
		jggw.setGwmc(gwvo.getGwmc());
		jggw.setJgid(gwvo.getJgid());
		jggw.setLrry(gwvo.getLrry());
		jggw.setLrsj(DateUtils.getCurTimestamp());
		jggw.setYxbj("1");
		this.dao.save(jggw);
	}

	public void updateJgGw(JggwVo gwvo) {
		TXtJggw gw = (TXtJggw) this.dao.get(TXtJggw.class, gwvo.getGwid());
		gw.setGwmc(gwvo.getGwmc());
//		gw.setYxbj(gwvo.getYxbj());
		gw.setXgry(gwvo.getXgry());
		gw.setXgsj(gwvo.getXgsj());
		this.dao.update(gw);
	}

	public void deleteJgGw(String gwid) throws Exception {

		ArrayList params = new ArrayList();
		params.add(gwid);
		String sql = "select count(*) from t_xt_jgyh where gwid=? and yxbj!='9'";
		if (this.dao.queryCount(sql, params) > 0) {
			throw new Exception("尚有用户属于此岗位,无法删除!");
		}

		TXtJggw jggw = (TXtJggw) this.dao.get(TXtJggw.class, gwid);
		jggw.setYxbj("9");
		jggw.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(jggw);
	}

	@SuppressWarnings("unchecked")
	public List findJgGw(String jgid) throws Exception {

		ArrayList params = new ArrayList();
		params.add(jgid);
		String sql = "select * from t_xt_jggw where jgid=? and yxbj!='9' ";
		List<TXtJggw> rsList = this.dao.findBySQL(sql, params, TXtJggw.class);
		return rsList;
	}

	public String addGwgn(JggwVo gwvo) throws Exception {
		String gwid = gwvo.getGwid();
		String cdidStr = gwvo.getCdidStr();
		List<String> cdidList = StringTool.StrTranStr(cdidStr);
		String sql = "delete t from t_xt_gwcd t where t.gwid ='" + gwid + "'";
		this.dao.executeSql(sql);
		String sql2 = "insert into t_xt_gwcd (gwid,cdid,lrry,lrsj) VALUES";
		for (int i = 0; i < cdidList.size(); i++) {
			List<String> conditions = new ArrayList<String>();
			conditions.add("'" + gwid + "'");
			conditions.add("'" + cdidList.get(i).replaceAll("'", "") + "'");
			conditions.add("'" + gwvo.getLrry() + "'");
			conditions.add("now()");
			String ret = String.join(",", conditions);
			if (i != 0)
				sql2 += ",";
			sql2 += "(" + ret + ")";
		}
		this.dao.executeSql(sql2);

		return null;
	}

	public static void main(String[] args) {
		String cdidStr = "1,2,3,4,5";
		List<String> cdidList = StringTool.StrTranStr(cdidStr);
		List<String> conditions = new ArrayList<String>();
		for (int i = 0; i < cdidList.size(); i++) {
			conditions.add("('" + i);
			conditions.add(cdidList.get(i));
			conditions.add(i + "')");

		}
		String ret = String.join("','", conditions);
		System.out.println("=================" + ret);
		// write your code here
	}

	public List getGwgn(String jgid, String gwid) { // 机构功能设置用 带系统功能树
		List<Map<String, Object>> orgList = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		map.put("cdid", "0");
		map.put("cdmc", "根目录");
		ArrayList params = new ArrayList();
		params.add(jgid);
		String sql = "select t.* from t_xt_xtcd t,t_xt_jgcd t2 where t2.jgid=? "
				+ "and t.cdid=t2.cdid and t.yxbj='1'  order by t.plxh ";
		List<XtcdVo> rsList = this.dao.findBySQL(sql, params, XtcdVo.class);

		ArrayList params2 = new ArrayList();
		params2.add(gwid);
		String sql2 = "select t.cdid from t_xt_gwcd t where  t.gwid=? ";
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

	private List<Map<String, Object>> getChildren(String sjcdid, List<XtcdVo> list, List<String> gwgnList) {
		List<Map<String, Object>> orgList = new ArrayList<>();

		if (!StringUtils.isEmpty(list) && list.size() > 0) {
			for (XtcdVo org : list) {
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
					if (!StringUtils.isEmpty(gwgnList) && gwgnList.contains(org.getCdid())) {
						map.put("checked", true);
					} else {
						map.put("checked", false);
					}

					List<Map<String, Object>> childrenList = this.getChildren(org.getCdid(), list, gwgnList);
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
