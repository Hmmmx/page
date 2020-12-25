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
 * TWgSfYskzc entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_sf_yskzc")

public class TWgSfYskzc extends BasePersistentObject{

	// Fields

	private String yskzcid;
	private String yskid;
	private Date fsrq;
	private java.math.BigDecimal qye;
	private java.math.BigDecimal fse;
	private java.math.BigDecimal hye;
	private String yskzcpzid;
	private String ztbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgSfYskzc() {
	}

	/** minimal constructor */
	public TWgSfYskzc(String yskzcid, String yskid, String yskzcpzid) {
		this.yskzcid = yskzcid;
		this.yskid = yskid;
		this.yskzcpzid = yskzcpzid;
	}

	/** full constructor */
	public TWgSfYskzc(String yskzcid, String yskid, Date fsrq, java.math.BigDecimal qye, java.math.BigDecimal fse, java.math.BigDecimal hye, String yskzcpzid,
			String ztbj, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.yskzcid = yskzcid;
		this.yskid = yskid;
		this.fsrq = fsrq;
		this.qye = qye;
		this.fse = fse;
		this.hye = hye;
		this.yskzcpzid = yskzcpzid;
		this.ztbj = ztbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "yskzcid", unique = true, nullable = false, length = 32)

	public String getYskzcid() {
		return this.yskzcid;
	}

	public void setYskzcid(String yskzcid) {
		this.yskzcid = yskzcid;
	}

	@Column(name = "yskid", nullable = false, length = 32)

	public String getYskid() {
		return this.yskid;
	}

	public void setYskid(String yskid) {
		this.yskid = yskid;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "fsrq", length = 10)

	public Date getFsrq() {
		return this.fsrq;
	}

	public void setFsrq(Date fsrq) {
		this.fsrq = fsrq;
	}

	@Column(name = "qye", precision = 12)

	public java.math.BigDecimal getQye() {
		return this.qye;
	}

	public void setQye(java.math.BigDecimal qye) {
		this.qye = qye;
	}

	@Column(name = "fse", precision = 12)

	public java.math.BigDecimal getFse() {
		return this.fse;
	}

	public void setFse(java.math.BigDecimal fse) {
		this.fse = fse;
	}

	@Column(name = "hye", precision = 12)

	public java.math.BigDecimal getHye() {
		return this.hye;
	}

	public void setHye(java.math.BigDecimal hye) {
		this.hye = hye;
	}

	@Column(name = "yskzcpzid", nullable = false, length = 32)

	public String getYskzcpzid() {
		return this.yskzcpzid;
	}

	public void setYskzcpzid(String yskzcpzid) {
		this.yskzcpzid = yskzcpzid;
	}

	@Column(name = "ztbj", length = 1)

	public String getZtbj() {
		return this.ztbj;
	}

	public void setZtbj(String ztbj) {
		this.ztbj = ztbj;
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