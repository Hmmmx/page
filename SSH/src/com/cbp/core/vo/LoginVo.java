package com.cbp.core.vo;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;




public class LoginVo {

	private String yhid;
	private String jgid;
	private String sjjgid;
	private String sjjgdm;
	private String sjjgmc;
	public String getSjjgdm() {
		return sjjgdm;
	}
	public void setSjjgdm(String sjjgdm) {
		this.sjjgdm = sjjgdm;
	}
	public String getSjjgmc() {
		return sjjgmc;
	}
	public void setSjjgmc(String sjjgmc) {
		this.sjjgmc = sjjgmc;
	}
	private String jgmc;
	private String jgdm;
	private String jglx;
	private String ptlx;
	private String gwid;
	private String yhdm;
	private String fcdid;
	private String yhmc;
	private String yhmm;
	private String dzyx;
	private String wxh;
	private String lxdh;
	private String dz;
	private String yysmc;
	private String yysid;
	private String sqid;
	private String sqdm;
	private String sqmc;
	private String sqlx;
	private String yxdz;
	private String sessionId;
	private String xb;
	private String yhlx;
	private String yxbj;
	private Date syqxz;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;
	private JSONObject streelist;
	private List<Map<String, Object>> treelist;
	private List<Map<String, Object>> systemlist;
	
	public String getFcdid() {
		return fcdid;
	}
	public void setFcdid(String fcdid) {
		this.fcdid = fcdid;
	}
	public String getJglx() {
		return jglx;
	}
	public void setJglx(String jglx) {
		this.jglx = jglx;
	}
	public String getPtlx() {
		return ptlx;
	}
	public void setPtlx(String ptlx) {
		this.ptlx = ptlx;
	}
	public String getYhid() {
		return yhid;
	}
	public void setYhid(String yhid) {
		this.yhid = yhid;
	}
	public String getJgid() {
		return jgid;
	}
	public void setJgid(String jgid) {
		this.jgid = jgid;
	}
	public String getSjjgid() {
		return sjjgid;
	}
	public void setSjjgid(String sjjgid) {
		this.sjjgid = sjjgid;
	}
	public String getJgmc() {
		return jgmc;
	}
	public void setJgmc(String jgmc) {
		this.jgmc = jgmc;
	}
	public String getJgdm() {
		return jgdm;
	}
	public void setJgdm(String jgdm) {
		this.jgdm = jgdm;
	}
	public String getGwid() {
		return gwid;
	}
	public void setGwid(String gwid) {
		this.gwid = gwid;
	}
	public String getYhdm() {
		return yhdm;
	}
	public void setYhdm(String yhdm) {
		this.yhdm = yhdm;
	}
	public String getYhmc() {
		return yhmc;
	}
	public void setYhmc(String yhmc) {
		this.yhmc = yhmc;
	}
	public String getYhmm() {
		return yhmm;
	}
	public void setYhmm(String yhmm) {
		this.yhmm = yhmm;
	}
	public String getDzyx() {
		return dzyx;
	}
	public void setDzyx(String dzyx) {
		this.dzyx = dzyx;
	}
	public String getWxh() {
		return wxh;
	}
	public void setWxh(String wxh) {
		this.wxh = wxh;
	}
	public String getLxdh() {
		return lxdh;
	}
	public void setLxdh(String lxdh) {
		this.lxdh = lxdh;
	}
	public String getDz() {
		return dz;
	}
	public void setDz(String dz) {
		this.dz = dz;
	}
	public String getYysmc() {
		return yysmc;
	}
	public void setYysmc(String yysmc) {
		this.yysmc = yysmc;
	}
	public String getYysid() {
		return yysid;
	}
	public void setYysid(String yysid) {
		this.yysid = yysid;
	}
	public String getSqid() {
		return sqid;
	}
	public void setSqid(String sqid) {
		this.sqid = sqid;
	}
	public String getSqdm() {
		return sqdm;
	}
	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}
	public String getSqmc() {
		return sqmc;
	}
	public void setSqmc(String sqmc) {
		this.sqmc = sqmc;
	}
	public String getSqlx() {
		return sqlx;
	}
	public void setSqlx(String sqlx) {
		this.sqlx = sqlx;
	}
	public String getYxdz() {
		return yxdz;
	}
	public void setYxdz(String yxdz) {
		this.yxdz = yxdz;
	}
	public String getSessionId() {
		return sessionId;
	}
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	public String getXb() {
		return xb;
	}
	public void setXb(String xb) {
		this.xb = xb;
	}
	public String getYhlx() {
		return yhlx;
	}
	public void setYhlx(String yhlx) {
		this.yhlx = yhlx;
	}
	public String getYxbj() {
		return yxbj;
	}
	public void setYxbj(String yxbj) {
		this.yxbj = yxbj;
	}
	public Date getSyqxz() {
		return syqxz;
	}
	public void setSyqxz(Date syqxz) {
		this.syqxz = syqxz;
	}
	public Timestamp getLrsj() {
		return lrsj;
	}
	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}
	public String getLrry() {
		return lrry;
	}
	public void setLrry(String lrry) {
		this.lrry = lrry;
	}
	public Timestamp getXgsj() {
		return xgsj;
	}
	public void setXgsj(Timestamp xgsj) {
		this.xgsj = xgsj;
	}
	public String getXgry() {
		return xgry;
	}
	public void setXgry(String xgry) {
		this.xgry = xgry;
	}
	public JSONObject getStreelist() {
		return streelist;
	}
	public void setStreelist(JSONObject streelist) {
		this.streelist = streelist;
	}
	public List<Map<String, Object>> getTreelist() {
		return treelist;
	}
	public void setTreelist(List<Map<String, Object>> treelist) {
		this.treelist = treelist;
	}
	public List<Map<String, Object>> getSystemlist() {
		return systemlist;
	}
	public void setSystemlist(List<Map<String, Object>> systemlist) {
		this.systemlist = systemlist;
	}



	


}
