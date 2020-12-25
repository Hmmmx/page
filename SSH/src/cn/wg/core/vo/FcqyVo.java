package cn.wg.core.vo;

import java.sql.Timestamp;

import com.ctp.core.vo.BaseValueObject;

public class FcqyVo  extends BaseValueObject{
	private String qyid;
	private String qymc;
	private String sqdm;
	private Integer plxh;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;
	
	public String getQyid() {
		return qyid;
	}
	public void setQyid(String qyid) {
		this.qyid = qyid;
	}
	public String getQymc() {
		return qymc;
	}
	public void setQymc(String qymc) {
		this.qymc = qymc;
	}
	public String getSqdm() {
		return sqdm;
	}
	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}
	public Integer getPlxh() {
		return plxh;
	}
	public void setPlxh(Integer plxh) {
		this.plxh = plxh;
	}
	public String getYxbj() {
		return yxbj;
	}
	public void setYxbj(String yxbj) {
		this.yxbj = yxbj;
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
}
