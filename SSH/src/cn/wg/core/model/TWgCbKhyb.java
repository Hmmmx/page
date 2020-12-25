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
 * TWgCbKhyb entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_cb_khyb")

public class TWgCbKhyb extends BasePersistentObject{

	// Fields

	private String khybid;
	private String ybbh;
	private String fcid;
	private String khid;
	private String yblxdm;
	private String sfbzid;
	private Date ksrq;
	private Date jsrq;
	private Date azrq;
	private java.math.BigDecimal lc;
	private java.math.BigDecimal bl;
	private java.math.BigDecimal ds;
	private String zjcbid;
	private Date zjcbrq;
	private String yxbj;
	private String bz;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgCbKhyb() {
	}

	/** minimal constructor */
	public TWgCbKhyb(String khybid, String ybbh, String fcid, String khid) {
		this.khybid = khybid;
		this.ybbh = ybbh;
		this.fcid = fcid;
		this.khid = khid;
	}

	/** full constructor */
	public TWgCbKhyb(String khybid, String ybbh, String fcid, String khid, String yblxdm, String sfbzid, Date ksrq,
			Date jsrq, Date azrq, java.math.BigDecimal lc, java.math.BigDecimal bl, java.math.BigDecimal ds, String zjcbid, Date zjcbrq, String yxbj, String bz,
			Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.khybid = khybid;
		this.ybbh = ybbh;
		this.fcid = fcid;
		this.khid = khid;
		this.yblxdm = yblxdm;
		this.sfbzid = sfbzid;
		this.ksrq = ksrq;
		this.jsrq = jsrq;
		this.azrq = azrq;
		this.lc = lc;
		this.bl = bl;
		this.ds = ds;
		this.zjcbid = zjcbid;
		this.zjcbrq = zjcbrq;
		this.yxbj = yxbj;
		this.bz = bz;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "khybid", unique = true, nullable = false, length = 32)

	public String getKhybid() {
		return this.khybid;
	}

	public void setKhybid(String khybid) {
		this.khybid = khybid;
	}

	@Column(name = "ybbh", nullable = false, length = 50)

	public String getYbbh() {
		return this.ybbh;
	}

	public void setYbbh(String ybbh) {
		this.ybbh = ybbh;
	}

	@Column(name = "fcid", nullable = false, length = 32)

	public String getFcid() {
		return this.fcid;
	}

	public void setFcid(String fcid) {
		this.fcid = fcid;
	}

	@Column(name = "khid", nullable = false, length = 32)

	public String getKhid() {
		return this.khid;
	}

	public void setKhid(String khid) {
		this.khid = khid;
	}

	@Column(name = "yblxdm", length = 10)

	public String getYblxdm() {
		return this.yblxdm;
	}

	public void setYblxdm(String yblxdm) {
		this.yblxdm = yblxdm;
	}

	@Column(name = "sfbzid", length = 32)

	public String getSfbzid() {
		return this.sfbzid;
	}

	public void setSfbzid(String sfbzid) {
		this.sfbzid = sfbzid;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "ksrq", length = 10)

	public Date getKsrq() {
		return this.ksrq;
	}

	public void setKsrq(Date ksrq) {
		this.ksrq = ksrq;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "jsrq", length = 10)

	public Date getJsrq() {
		return this.jsrq;
	}

	public void setJsrq(Date jsrq) {
		this.jsrq = jsrq;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "azrq", length = 10)

	public Date getAzrq() {
		return this.azrq;
	}

	public void setAzrq(Date azrq) {
		this.azrq = azrq;
	}

	@Column(name = "lc", precision = 12)

	public java.math.BigDecimal getLc() {
		return this.lc;
	}

	public void setLc(java.math.BigDecimal lc) {
		this.lc = lc;
	}

	@Column(name = "bl", precision = 12)

	public java.math.BigDecimal getBl() {
		return this.bl;
	}

	public void setBl(java.math.BigDecimal bl) {
		this.bl = bl;
	}

	@Column(name = "ds", precision = 12)

	public java.math.BigDecimal getDs() {
		return this.ds;
	}

	public void setDs(java.math.BigDecimal ds) {
		this.ds = ds;
	}

	@Column(name = "zjcbid", length = 32)

	public String getZjcbid() {
		return this.zjcbid;
	}

	public void setZjcbid(String zjcbid) {
		this.zjcbid = zjcbid;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "zjcbrq", length = 10)

	public Date getZjcbrq() {
		return this.zjcbrq;
	}

	public void setZjcbrq(Date zjcbrq) {
		this.zjcbrq = zjcbrq;
	}

	@Column(name = "yxbj", length = 1)

	public String getYxbj() {
		return this.yxbj;
	}

	public void setYxbj(String yxbj) {
		this.yxbj = yxbj;
	}

	@Column(name = "bz", length = 500)

	public String getBz() {
		return this.bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
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