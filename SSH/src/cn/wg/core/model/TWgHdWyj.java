package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgHdWyj entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_hd_wyj")

public class TWgHdWyj extends BasePersistentObject{

	// Fields

	private String wyjid;
	private String wyjmc;
	private String sqdm;
	private java.math.BigDecimal mrll;
	private String jsfs;
	private String jsjz;
	private Integer hmys;
	private Integer hmrs;
	private String bz;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgHdWyj() {
	}

	/** minimal constructor */
	public TWgHdWyj(String wyjid, String wyjmc) {
		this.wyjid = wyjid;
		this.wyjmc = wyjmc;
	}

	/** full constructor */
	public TWgHdWyj(String wyjid, String wyjmc, String sqdm, java.math.BigDecimal mrll, String jsfs, String jsjz, Integer hmys,
			Integer hmrs, String bz, String yxbj, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.wyjid = wyjid;
		this.wyjmc = wyjmc;
		this.sqdm = sqdm;
		this.mrll = mrll;
		this.jsfs = jsfs;
		this.jsjz = jsjz;
		this.hmys = hmys;
		this.hmrs = hmrs;
		this.bz = bz;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "wyjid", unique = true, nullable = false, length = 32)

	public String getWyjid() {
		return this.wyjid;
	}

	public void setWyjid(String wyjid) {
		this.wyjid = wyjid;
	}

	@Column(name = "wyjmc", nullable = false, length = 50)

	public String getWyjmc() {
		return this.wyjmc;
	}

	public void setWyjmc(String wyjmc) {
		this.wyjmc = wyjmc;
	}

	@Column(name = "sqdm", length = 50)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "mrll", precision = 12, scale = 4)

	public java.math.BigDecimal getMrll() {
		return this.mrll;
	}

	public void setMrll(java.math.BigDecimal mrll) {
		this.mrll = mrll;
	}

	@Column(name = "jsfs", length = 1)

	public String getJsfs() {
		return this.jsfs;
	}

	public void setJsfs(String jsfs) {
		this.jsfs = jsfs;
	}

	@Column(name = "jsjz", length = 1)

	public String getJsjz() {
		return this.jsjz;
	}

	public void setJsjz(String jsjz) {
		this.jsjz = jsjz;
	}

	@Column(name = "hmys")

	public Integer getHmys() {
		return this.hmys;
	}

	public void setHmys(Integer hmys) {
		this.hmys = hmys;
	}

	@Column(name = "hmrs")

	public Integer getHmrs() {
		return this.hmrs;
	}

	public void setHmrs(Integer hmrs) {
		this.hmrs = hmrs;
	}

	@Column(name = "bz", length = 100)

	public String getBz() {
		return this.bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

	@Column(name = "yxbj", length = 1)

	public String getYxbj() {
		return this.yxbj;
	}

	public void setYxbj(String yxbj) {
		this.yxbj = yxbj;
	}

	@Column(name = "lrsj", length = 19)

	public Timestamp getLrsj() {
		return this.lrsj;
	}

	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}

	@Column(name = "lrry", length = 20)

	public String getLrry() {
		return this.lrry;
	}

	public void setLrry(String lrry) {
		this.lrry = lrry;
	}

	@Column(name = "xgsj", length = 19)

	public Timestamp getXgsj() {
		return this.xgsj;
	}

	public void setXgsj(Timestamp xgsj) {
		this.xgsj = xgsj;
	}

	@Column(name = "xgry", length = 20)

	public String getXgry() {
		return this.xgry;
	}

	public void setXgry(String xgry) {
		this.xgry = xgry;
	}

}