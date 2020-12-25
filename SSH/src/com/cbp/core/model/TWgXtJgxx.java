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
 * TWgXtJgxx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_xt_jgxx")

public class TWgXtJgxx implements java.io.Serializable {

	// Fields

	private String sqid;
	private String sqdm;
	private String sqmc;
	private String sjsqid;
	private String sqlx;
	private String yysid;
	private String lxdh;
	private String lxr;
	private String dz;
	private Integer plxh;
	private Date syqxq;
	private Date syqxz;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;
	private String bz;

	// Constructors

	/** default constructor */
	public TWgXtJgxx() {
	}

	/** minimal constructor */
	public TWgXtJgxx(String sqid, String sqdm, String sqmc, String yysid) {
		this.sqid = sqid;
		this.sqdm = sqdm;
		this.sqmc = sqmc;
		this.yysid = yysid;
	}

	/** full constructor */
	public TWgXtJgxx(String sqid, String sqdm, String sqmc, String sjsqid, String sqlx, String yysid, String lxdh,
			String lxr, String dz, Integer plxh, Date syqxq, Date syqxz, String yxbj, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry, String bz) {
		this.sqid = sqid;
		this.sqdm = sqdm;
		this.sqmc = sqmc;
		this.sjsqid = sjsqid;
		this.sqlx = sqlx;
		this.yysid = yysid;
		this.lxdh = lxdh;
		this.lxr = lxr;
		this.dz = dz;
		this.plxh = plxh;
		this.syqxq = syqxq;
		this.syqxz = syqxz;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
		this.bz = bz;
	}

	// Property accessors
	@Id

	@Column(name = "sqid", unique = true, nullable = false, length = 32)

	public String getSqid() {
		return this.sqid;
	}

	public void setSqid(String sqid) {
		this.sqid = sqid;
	}

	@Column(name = "sqdm", nullable = false, length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "sqmc", nullable = false, length = 50)

	public String getSqmc() {
		return this.sqmc;
	}

	public void setSqmc(String sqmc) {
		this.sqmc = sqmc;
	}

	@Column(name = "sjsqid", length = 32)

	public String getSjsqid() {
		return this.sjsqid;
	}

	public void setSjsqid(String sjsqid) {
		this.sjsqid = sjsqid;
	}

	@Column(name = "sqlx", length = 1)

	public String getSqlx() {
		return this.sqlx;
	}

	public void setSqlx(String sqlx) {
		this.sqlx = sqlx;
	}

	@Column(name = "yysid", nullable = false, length = 32)

	public String getYysid() {
		return this.yysid;
	}

	public void setYysid(String yysid) {
		this.yysid = yysid;
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

	@Column(name = "dz", length = 200)

	public String getDz() {
		return this.dz;
	}

	public void setDz(String dz) {
		this.dz = dz;
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

	@Column(name = "bz", length = 500)

	public String getBz() {
		return this.bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

}