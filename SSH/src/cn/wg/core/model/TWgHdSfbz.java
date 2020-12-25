package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgHdSfbz entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_hd_sfbz")

public class TWgHdSfbz extends BasePersistentObject{

	// Fields

	private String sfbzid;
	private String sfbzmc;
	private String sqdm;
	private String sfxmdm;
	private String jffsdm;
	private String jfgs;
	private java.math.BigDecimal dj;
	private String dwdm;
	private String jddm;
	private String srfsdm;
	private String ysybj;
	private Integer ysysl;
	private String ysrbj;
	private Integer ysrsl;
	private Integer zdysl;
	private String yxbj;
	private String wyjid;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgHdSfbz() {
	}

	/** minimal constructor */
	public TWgHdSfbz(String sfbzid, String sfbzmc, String sqdm, String sfxmdm, String jffsdm) {
		this.sfbzid = sfbzid;
		this.sfbzmc = sfbzmc;
		this.sqdm = sqdm;
		this.sfxmdm = sfxmdm;
		this.jffsdm = jffsdm;
	}

	/** full constructor */
	public TWgHdSfbz(String sfbzid, String sfbzmc, String sqdm, String sfxmdm, String jffsdm, String jfgs, java.math.BigDecimal dj,
			String dwdm, String jddm, String srfsdm, String ysybj, Integer ysysl, String ysrbj, Integer ysrsl,
			Integer zdysl, String yxbj, String wyjid, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.sfbzid = sfbzid;
		this.sfbzmc = sfbzmc;
		this.sqdm = sqdm;
		this.sfxmdm = sfxmdm;
		this.jffsdm = jffsdm;
		this.jfgs = jfgs;
		this.dj = dj;
		this.dwdm = dwdm;
		this.jddm = jddm;
		this.srfsdm = srfsdm;
		this.ysybj = ysybj;
		this.ysysl = ysysl;
		this.ysrbj = ysrbj;
		this.ysrsl = ysrsl;
		this.zdysl = zdysl;
		this.yxbj = yxbj;
		this.wyjid = wyjid;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "sfbzid", unique = true, nullable = false, length = 32)

	public String getSfbzid() {
		return this.sfbzid;
	}

	public void setSfbzid(String sfbzid) {
		this.sfbzid = sfbzid;
	}

	@Column(name = "sfbzmc", nullable = false, length = 50)

	public String getSfbzmc() {
		return this.sfbzmc;
	}

	public void setSfbzmc(String sfbzmc) {
		this.sfbzmc = sfbzmc;
	}

	@Column(name = "sqdm", nullable = false, length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "sfxmdm", nullable = false, length = 32)

	public String getSfxmdm() {
		return this.sfxmdm;
	}

	public void setSfxmdm(String sfxmdm) {
		this.sfxmdm = sfxmdm;
	}

	@Column(name = "jffsdm", nullable = false, length = 32)

	public String getJffsdm() {
		return this.jffsdm;
	}

	public void setJffsdm(String jffsdm) {
		this.jffsdm = jffsdm;
	}

	@Column(name = "jfgs", length = 200)

	public String getJfgs() {
		return this.jfgs;
	}

	public void setJfgs(String jfgs) {
		this.jfgs = jfgs;
	}

	@Column(name = "dj", precision = 12, scale = 4)

	public java.math.BigDecimal getDj() {
		return this.dj;
	}

	public void setDj(java.math.BigDecimal dj) {
		this.dj = dj;
	}

	@Column(name = "dwdm", length = 10)

	public String getDwdm() {
		return this.dwdm;
	}

	public void setDwdm(String dwdm) {
		this.dwdm = dwdm;
	}

	@Column(name = "jddm", length = 10)

	public String getJddm() {
		return this.jddm;
	}

	public void setJddm(String jddm) {
		this.jddm = jddm;
	}

	@Column(name = "srfsdm", length = 10)

	public String getSrfsdm() {
		return this.srfsdm;
	}

	public void setSrfsdm(String srfsdm) {
		this.srfsdm = srfsdm;
	}

	@Column(name = "ysybj", length = 1)

	public String getYsybj() {
		return this.ysybj;
	}

	public void setYsybj(String ysybj) {
		this.ysybj = ysybj;
	}

	@Column(name = "ysysl")

	public Integer getYsysl() {
		return this.ysysl;
	}

	public void setYsysl(Integer ysysl) {
		this.ysysl = ysysl;
	}

	@Column(name = "ysrbj", length = 1)

	public String getYsrbj() {
		return this.ysrbj;
	}

	public void setYsrbj(String ysrbj) {
		this.ysrbj = ysrbj;
	}

	@Column(name = "ysrsl")

	public Integer getYsrsl() {
		return this.ysrsl;
	}

	public void setYsrsl(Integer ysrsl) {
		this.ysrsl = ysrsl;
	}

	@Column(name = "zdysl")

	public Integer getZdysl() {
		return this.zdysl;
	}

	public void setZdysl(Integer zdysl) {
		this.zdysl = zdysl;
	}

	@Column(name = "yxbj", length = 1)

	public String getYxbj() {
		return this.yxbj;
	}

	public void setYxbj(String yxbj) {
		this.yxbj = yxbj;
	}

	@Column(name = "wyjid", length = 32)

	public String getWyjid() {
		return this.wyjid;
	}

	public void setWyjid(String wyjid) {
		this.wyjid = wyjid;
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