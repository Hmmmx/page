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
 * TWgCbKhybghjl entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_cb_khybghjl")

public class TWgCbKhybghjl extends BasePersistentObject{

	// Fields

	private String khybghid;
	private String khybid;
	private java.math.BigDecimal bgqlc;
	private java.math.BigDecimal bgqbl;
	private java.math.BigDecimal bgqds;
	private Date bgrq;
	private java.math.BigDecimal bgqcbds;
	private java.math.BigDecimal bgqzzds;
	private java.math.BigDecimal bgqzhyl;
	private String clbj;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgCbKhybghjl() {
	}

	/** minimal constructor */
	public TWgCbKhybghjl(String khybghid) {
		this.khybghid = khybghid;
	}

	/** full constructor */
	public TWgCbKhybghjl(String khybghid, String khybid, java.math.BigDecimal bgqlc, java.math.BigDecimal bgqbl, java.math.BigDecimal bgqds, Date bgrq,
			java.math.BigDecimal bgqcbds, java.math.BigDecimal bgqzzds, java.math.BigDecimal bgqzhyl, String clbj, String yxbj, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry) {
		this.khybghid = khybghid;
		this.khybid = khybid;
		this.bgqlc = bgqlc;
		this.bgqbl = bgqbl;
		this.bgqds = bgqds;
		this.bgrq = bgrq;
		this.bgqcbds = bgqcbds;
		this.bgqzzds = bgqzzds;
		this.bgqzhyl = bgqzhyl;
		this.clbj = clbj;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "khybghid", unique = true, nullable = false, length = 32)

	public String getKhybghid() {
		return this.khybghid;
	}

	public void setKhybghid(String khybghid) {
		this.khybghid = khybghid;
	}

	@Column(name = "khybid", length = 32)

	public String getKhybid() {
		return this.khybid;
	}

	public void setKhybid(String khybid) {
		this.khybid = khybid;
	}

	@Column(name = "bgqlc", precision = 12)

	public java.math.BigDecimal getBgqlc() {
		return this.bgqlc;
	}

	public void setBgqlc(java.math.BigDecimal bgqlc) {
		this.bgqlc = bgqlc;
	}

	@Column(name = "bgqbl", precision = 12)

	public java.math.BigDecimal getBgqbl() {
		return this.bgqbl;
	}

	public void setBgqbl(java.math.BigDecimal bgqbl) {
		this.bgqbl = bgqbl;
	}

	@Column(name = "bgqds", precision = 12)

	public java.math.BigDecimal getBgqds() {
		return this.bgqds;
	}

	public void setBgqds(java.math.BigDecimal bgqds) {
		this.bgqds = bgqds;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "bgrq", length = 10)

	public Date getBgrq() {
		return this.bgrq;
	}

	public void setBgrq(Date bgrq) {
		this.bgrq = bgrq;
	}

	@Column(name = "bgqcbds", precision = 12)

	public java.math.BigDecimal getBgqcbds() {
		return this.bgqcbds;
	}

	public void setBgqcbds(java.math.BigDecimal bgqcbds) {
		this.bgqcbds = bgqcbds;
	}

	@Column(name = "bgqzzds", precision = 12)

	public java.math.BigDecimal getBgqzzds() {
		return this.bgqzzds;
	}

	public void setBgqzzds(java.math.BigDecimal bgqzzds) {
		this.bgqzzds = bgqzzds;
	}

	@Column(name = "bgqzhyl", precision = 12)

	public java.math.BigDecimal getBgqzhyl() {
		return this.bgqzhyl;
	}

	public void setBgqzhyl(java.math.BigDecimal bgqzhyl) {
		this.bgqzhyl = bgqzhyl;
	}

	@Column(name = "clbj", length = 1)

	public String getClbj() {
		return this.clbj;
	}

	public void setClbj(String clbj) {
		this.clbj = clbj;
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