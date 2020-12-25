package cn.wg.core.vo;

import java.sql.Timestamp;

import com.ctp.core.vo.BaseValueObject;

public class FcdyVo  extends BaseValueObject{
	private String dyid;
	private String lyid;
	private String dymc;
	private Integer plxh;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;
	
	public String getDyid() {
		return dyid;
	}
	public void setDyid(String dyid) {
		this.dyid = dyid;
	}
	public String getLyid() {
		return lyid;
	}
	public void setLyid(String lyid) {
		this.lyid = lyid;
	}
	public String getDymc() {
		return dymc;
	}
	public void setDymc(String dymc) {
		this.dymc = dymc;
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
