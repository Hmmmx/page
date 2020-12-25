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
 * TWgSfYj entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_sf_yj")

public class TWgSfYj extends BasePersistentObject{

	// Fields

	private String yjid;
	private String fcid;
	private String sfpzid;
	private String khid;
	private String sqdm;
	private String yjlxdm;
	private Date skrq;
	private String skr;
	private String jfr;
	private java.math.BigDecimal sqje;
	private String pjlxdm;
	private String pjbh;
	private String pzh;
	private String thbj;
	private String ztbj;
	private String skbz;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgSfYj() {
	}

	/** minimal constructor */
	public TWgSfYj(String yjid) {
		this.yjid = yjid;
	}

	/** full constructor */
	public TWgSfYj(String yjid, String fcid, String sfpzid, String khid, String sqdm, String yjlxdm, Date skrq,
			String skr, String jfr, java.math.BigDecimal sqje, String pjlxdm, String pjbh, String pzh, String thbj, String ztbj,
			String skbz, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.yjid = yjid;
		this.fcid = fcid;
		this.sfpzid = sfpzid;
		this.khid = khid;
		this.sqdm = sqdm;
		this.yjlxdm = yjlxdm;
		this.skrq = skrq;
		this.skr = skr;
		this.jfr = jfr;
		this.sqje = sqje;
		this.pjlxdm = pjlxdm;
		this.pjbh = pjbh;
		this.pzh = pzh;
		this.thbj = thbj;
		this.ztbj = ztbj;
		this.skbz = skbz;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "yjid", unique = true, nullable = false, length = 32)

	public String getYjid() {
		return this.yjid;
	}

	public void setYjid(String yjid) {
		this.yjid = yjid;
	}

	@Column(name = "fcid", length = 32)

	public String getFcid() {
		return this.fcid;
	}

	public void setFcid(String fcid) {
		this.fcid = fcid;
	}

	@Column(name = "sfpzid", length = 32)

	public String getSfpzid() {
		return this.sfpzid;
	}

	public void setSfpzid(String sfpzid) {
		this.sfpzid = sfpzid;
	}

	@Column(name = "khid", length = 32)

	public String getKhid() {
		return this.khid;
	}

	public void setKhid(String khid) {
		this.khid = khid;
	}

	@Column(name = "sqdm", length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "yjlxdm", length = 10)

	public String getYjlxdm() {
		return this.yjlxdm;
	}

	public void setYjlxdm(String yjlxdm) {
		this.yjlxdm = yjlxdm;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "skrq", length = 10)

	public Date getSkrq() {
		return this.skrq;
	}

	public void setSkrq(Date skrq) {
		this.skrq = skrq;
	}

	@Column(name = "skr", length = 50)

	public String getSkr() {
		return this.skr;
	}

	public void setSkr(String skr) {
		this.skr = skr;
	}

	@Column(name = "jfr", length = 50)

	public String getJfr() {
		return this.jfr;
	}

	public void setJfr(String jfr) {
		this.jfr = jfr;
	}

	@Column(name = "sqje", precision = 12)

	public java.math.BigDecimal getSqje() {
		return this.sqje;
	}

	public void setSqje(java.math.BigDecimal sqje) {
		this.sqje = sqje;
	}

	@Column(name = "pjlxdm", length = 50)

	public String getPjlxdm() {
		return this.pjlxdm;
	}

	public void setPjlxdm(String pjlxdm) {
		this.pjlxdm = pjlxdm;
	}

	@Column(name = "pjbh", length = 32)

	public String getPjbh() {
		return this.pjbh;
	}

	public void setPjbh(String pjbh) {
		this.pjbh = pjbh;
	}

	@Column(name = "pzh", length = 50)

	public String getPzh() {
		return this.pzh;
	}

	public void setPzh(String pzh) {
		this.pzh = pzh;
	}

	@Column(name = "thbj", length = 1)

	public String getThbj() {
		return this.thbj;
	}

	public void setThbj(String thbj) {
		this.thbj = thbj;
	}

	@Column(name = "ztbj", length = 1)

	public String getZtbj() {
		return this.ztbj;
	}

	public void setZtbj(String ztbj) {
		this.ztbj = ztbj;
	}

	@Column(name = "skbz", length = 100)

	public String getSkbz() {
		return this.skbz;
	}

	public void setSkbz(String skbz) {
		this.skbz = skbz;
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