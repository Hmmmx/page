package cn.wg.core.vo;

import java.sql.Timestamp;

import com.ctp.core.vo.BaseValueObject;

public class FclyVo  extends BaseValueObject{
	private String lyid;
	private String qyid;
	private String lymc;
	private Integer plxh;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;
	
	public String getLyid() {
		return lyid;
	}
	public void setLyid(String lyid) {
		this.lyid = lyid;
	}
	public String getQyid() {
		return qyid;
	}
	public void setQyid(String qyid) {
		this.qyid = qyid;
	}
	public String getLymc() {
		return lymc;
	}
	public void setLymc(String lymc) {
		this.lymc = lymc;
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
