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
 * TWgSfYsksr entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_sf_ysksr")

public class TWgSfYsksr extends BasePersistentObject{

	// Fields

	private String ysksrid;
	private String yskid;
	private Date fsrq;
	private Date ysrq;
	private Date ysrz;
	private java.math.BigDecimal yfse;
	private java.math.BigDecimal zk;
	private java.math.BigDecimal fse;
	private java.math.BigDecimal qye;
	private java.math.BigDecimal hye;
	private String ysksrpzid;
	private String ztbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgSfYsksr() {
	}

	/** minimal constructor */
	public TWgSfYsksr(String ysksrid, String yskid, String ysksrpzid) {
		this.ysksrid = ysksrid;
		this.yskid = yskid;
		this.ysksrpzid = ysksrpzid;
	}

	/** full constructor */
	public TWgSfYsksr(String ysksrid, String yskid, Date fsrq, Date ysrq, Date ysrz, java.math.BigDecimal yfse, java.math.BigDecimal zk, java.math.BigDecimal fse,
			java.math.BigDecimal qye, java.math.BigDecimal hye, String ysksrpzid, String ztbj, Timestamp lrsj, String lrry, Timestamp xgsj,
			String xgry) {
		this.ysksrid = ysksrid;
		this.yskid = yskid;
		this.fsrq = fsrq;
		this.ysrq = ysrq;
		this.ysrz = ysrz;
		this.yfse = yfse;
		this.zk = zk;
		this.fse = fse;
		this.qye = qye;
		this.hye = hye;
		this.ysksrpzid = ysksrpzid;
		this.ztbj = ztbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "ysksrid", unique = true, nullable = false, length = 32)

	public String getYsksrid() {
		return this.ysksrid;
	}

	public void setYsksrid(String ysksrid) {
		this.ysksrid = ysksrid;
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

	@Temporal(TemporalType.DATE)
	@Column(name = "ysrq", length = 10)

	public Date getYsrq() {
		return this.ysrq;
	}

	public void setYsrq(Date ysrq) {
		this.ysrq = ysrq;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "ysrz", length = 10)

	public Date getYsrz() {
		return this.ysrz;
	}

	public void setYsrz(Date ysrz) {
		this.ysrz = ysrz;
	}

	@Column(name = "yfse", precision = 12)

	public java.math.BigDecimal getYfse() {
		return this.yfse;
	}

	public void setYfse(java.math.BigDecimal yfse) {
		this.yfse = yfse;
	}

	@Column(name = "zk", precision = 12)

	public java.math.BigDecimal getZk() {
		return this.zk;
	}

	public void setZk(java.math.BigDecimal zk) {
		this.zk = zk;
	}

	@Column(name = "fse", precision = 12)

	public java.math.BigDecimal getFse() {
		return this.fse;
	}

	public void setFse(java.math.BigDecimal fse) {
		this.fse = fse;
	}

	@Column(name = "qye", precision = 12)

	public java.math.BigDecimal getQye() {
		return this.qye;
	}

	public void setQye(java.math.BigDecimal qye) {
		this.qye = qye;
	}

	@Column(name = "hye", precision = 12)

	public java.math.BigDecimal getHye() {
		return this.hye;
	}

	public void setHye(java.math.BigDecimal hye) {
		this.hye = hye;
	}

	@Column(name = "ysksrpzid", nullable = false, length = 32)

	public String getYsksrpzid() {
		return this.ysksrpzid;
	}

	public void setYsksrpzid(String ysksrpzid) {
		this.ysksrpzid = ysksrpzid;
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