package cn.wg.core.model;

import java.sql.Timestamp;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgSfSfpz entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_sf_sfpz")

public class TWgSfSfpz extends BasePersistentObject{

	// Fields

	private String sfpzid;
	private String sqdm;
	private String fcid;
	private String khid;
	private String skfsdm;
	private String thjsfsdm;
	private String pzlydm;
	private String pzh;
	private String pjbh;
	private String pjlxdm;
	private java.math.BigDecimal je;
	private String jfr;
	private String skr;
	private Date skrq;
	private String skbz;
	private String ztbj;
	private String zfbh;
	private String zfry;
	private Date zfrq;
	private String zfyy;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgSfSfpz() {
	}

	/** minimal constructor */
	public TWgSfSfpz(String sfpzid) {
		this.sfpzid = sfpzid;
	}

	/** full constructor */
	public TWgSfSfpz(String sfpzid, String sqdm, String fcid, String khid, String skfsdm, String thjsfsdm,
			String pzlydm, String pzh, String pjbh, String pjlxdm, java.math.BigDecimal je, String jfr, String skr, Date skrq,
			String skbz, String ztbj, String zfbh, String zfry, Date zfrq, String zfyy, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry) {
		this.sfpzid = sfpzid;
		this.sqdm = sqdm;
		this.fcid = fcid;
		this.khid = khid;
		this.skfsdm = skfsdm;
		this.thjsfsdm = thjsfsdm;
		this.pzlydm = pzlydm;
		this.pzh = pzh;
		this.pjbh = pjbh;
		this.pjlxdm = pjlxdm;
		this.je = je;
		this.jfr = jfr;
		this.skr = skr;
		this.skrq = skrq;
		this.skbz = skbz;
		this.ztbj = ztbj;
		this.zfbh = zfbh;
		this.zfry = zfry;
		this.zfrq = zfrq;
		this.zfyy = zfyy;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "sfpzid", unique = true, nullable = false, length = 32)

	public String getSfpzid() {
		return this.sfpzid;
	}

	public void setSfpzid(String sfpzid) {
		this.sfpzid = sfpzid;
	}

	@Column(name = "sqdm", length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "fcid", length = 32)

	public String getFcid() {
		return this.fcid;
	}

	public void setFcid(String fcid) {
		this.fcid = fcid;
	}

	@Column(name = "khid", length = 32)

	public String getKhid() {
		return this.khid;
	}

	public void setKhid(String khid) {
		this.khid = khid;
	}

	@Column(name = "skfsdm", length = 32)

	public String getSkfsdm() {
		return this.skfsdm;
	}

	public void setSkfsdm(String skfsdm) {
		this.skfsdm = skfsdm;
	}

	@Column(name = "thjsfsdm", length = 20)

	public String getThjsfsdm() {
		return this.thjsfsdm;
	}

	public void setThjsfsdm(String thjsfsdm) {
		this.thjsfsdm = thjsfsdm;
	}

	@Column(name = "pzlydm", length = 10)

	public String getPzlydm() {
		return this.pzlydm;
	}

	public void setPzlydm(String pzlydm) {
		this.pzlydm = pzlydm;
	}

	@Column(name = "pzh", length = 32)

	public String getPzh() {
		return this.pzh;
	}

	public void setPzh(String pzh) {
		this.pzh = pzh;
	}

	@Column(name = "pjbh", length = 32)

	public String getPjbh() {
		return this.pjbh;
	}

	public void setPjbh(String pjbh) {
		this.pjbh = pjbh;
	}

	@Column(name = "pjlxdm", length = 10)

	public String getPjlxdm() {
		return this.pjlxdm;
	}

	public void setPjlxdm(String pjlxdm) {
		this.pjlxdm = pjlxdm;
	}

	@Column(name = "je", precision = 12 , scale = 2)

	public java.math.BigDecimal getJe() {
		return this.je;
	}

	public void setJe(java.math.BigDecimal je) {
		this.je = je;
	}

	@Column(name = "jfr", length = 20)

	public String getJfr() {
		return this.jfr;
	}

	public void setJfr(String jfr) {
		this.jfr = jfr;
	}

	@Column(name = "skr", length = 20)

	public String getSkr() {
		return this.skr;
	}

	public void setSkr(String skr) {
		this.skr = skr;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "skrq", length = 10)

	public Date getSkrq() {
		return this.skrq;
	}

	public void setSkrq(Date skrq) {
		this.skrq = skrq;
	}

	@Column(name = "skbz", length = 200)

	public String getSkbz() {
		return this.skbz;
	}

	public void setSkbz(String skbz) {
		this.skbz = skbz;
	}

	@Column(name = "ztbj", length = 1)

	public String getZtbj() {
		return this.ztbj;
	}

	public void setZtbj(String ztbj) {
		this.ztbj = ztbj;
	}

	@Column(name = "zfbh", length = 32)

	public String getZfbh() {
		return this.zfbh;
	}

	public void setZfbh(String zfbh) {
		this.zfbh = zfbh;
	}

	@Column(name = "zfry", length = 20)

	public String getZfry() {
		return this.zfry;
	}

	public void setZfry(String zfry) {
		this.zfry = zfry;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "zfrq", length = 10)

	public Date getZfrq() {
		return this.zfrq;
	}

	public void setZfrq(Date zfrq) {
		this.zfrq = zfrq;
	}

	@Column(name = "zfyy", length = 200)

	public String getZfyy() {
		return this.zfyy;
	}

	public void setZfyy(String zfyy) {
		this.zfyy = zfyy;
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