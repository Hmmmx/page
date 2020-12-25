package com.cbp.core.model;

import java.sql.Timestamp;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * TXtJgxx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_xt_jgxx")

public class TXtJgxx implements java.io.Serializable {

	// Fields

	private String jgid;
	private String jgdm;
	private String jgmc;
	private String sjjgid;
	private String lxdh;
	private String lxr;
	private Integer plxh;
	private Date syqxq;
	private Date syqxz;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TXtJgxx() {
	}

	/** minimal constructor */
	public TXtJgxx(String jgid, String jgdm, String jgmc, String sjjgid) {
		this.jgid = jgid;
		this.jgdm = jgdm;
		this.jgmc = jgmc;
		this.sjjgid = sjjgid;
	}

	/** full constructor */
	public TXtJgxx(String jgid, String jgdm, String jgmc, String sjjgid, String lxdh, String lxr, Integer plxh,
			Date syqxq, Date syqxz, String yxbj, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.jgid = jgid;
		this.jgdm = jgdm;
		this.jgmc = jgmc;
		this.sjjgid = sjjgid;
		this.lxdh = lxdh;
		this.lxr = lxr;
		this.plxh = plxh;
		this.syqxq = syqxq;
		this.syqxz = syqxz;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "jgid", unique = true, nullable = false, length = 32)

	public String getJgid() {
		return this.jgid;
	}

	public void setJgid(String jgid) {
		this.jgid = jgid;
	}

	@Column(name = "jgdm", nullable = false, length = 32)

	public String getJgdm() {
		return this.jgdm;
	}

	public void setJgdm(String jgdm) {
		this.jgdm = jgdm;
	}

	@Column(name = "jgmc", nullable = false, length = 50)

	public String getJgmc() {
		return this.jgmc;
	}

	public void setJgmc(String jgmc) {
		this.jgmc = jgmc;
	}

	@Column(name = "sjjgid", nullable = false, length = 32)

	public String getSjjgid() {
		return this.sjjgid;
	}

	public void setSjjgid(String sjjgid) {
		this.sjjgid = sjjgid;
	}

	@Column(name = "lxdh", length = 20)

	public String getLxdh() {
		return this.lxdh;
	}

	public void setLxdh(String lxdh) {
		this.lxdh = lxdh;
	}

	@Column(name = "lxr", length = 50)

	public String getLxr() {
		return this.lxr;
	}

	public void setLxr(String lxr) {
		this.lxr = lxr;
	}

	@Column(name = "plxh")

	public Integer getPlxh() {
		return this.plxh;
	}

	public void setPlxh(Integer plxh) {
		this.plxh = plxh;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "syqxq", length = 10)

	public Date getSyqxq() {
		return this.syqxq;
	}

	public void setSyqxq(Date syqxq) {
		this.syqxq = syqxq;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "syqxz", length = 10)

	public Date getSyqxz() {
		return this.syqxz;
	}

	public void setSyqxz(Date syqxz) {
		this.syqxz = syqxz;
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