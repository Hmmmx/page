package cn.wg.core.vo;

import java.sql.Timestamp;

public class CkxxVo {
	private String ckid;
	private String ckmc;
	private String sqdm;
	private String sqmc;
	private String sqid;
	private String sqlx;
	private String ztbj;
	private String lrry;
	private Timestamp lrsj;
	private Timestamp xgsj;
	private String xgry;
	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}
	public void setXgsj(Timestamp xgsj) {
		this.xgsj = xgsj;
	}	
	public String getCkid() {
		return ckid;
	}
	public void setCkid(String ckid) {
		this.ckid = ckid;
	}
	public String getCkmc() {
		return ckmc;
	}
	public void setCkmc(String ckmc) {
		this.ckmc = ckmc;
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
	public String getSqid() {
		return sqid;
	}
	public void setSqid(String sqid) {
		this.sqid = sqid;
	}
	public String getSqlx() {
		return sqlx;
	}
	public void setSqlx(String sqlx) {
		this.sqlx = sqlx;
	}
	public String getZtbj() {
		return ztbj;
	}
	public void setZtbj(String ztbj) {
		this.ztbj = ztbj;
	}
	public String getLrry() {
		return lrry;
	}
	public void setLrry(String lrry) {
		this.lrry = lrry;
	}
	public String getXgry() {
		return xgry;
	}
	public void setXgry(String xgry) {
		this.xgry = xgry;
	}
}
