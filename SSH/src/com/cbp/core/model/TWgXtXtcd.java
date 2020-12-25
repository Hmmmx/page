package com.cbp.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TWgXtXtcd entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_xt_xtcd")

public class TWgXtXtcd implements java.io.Serializable {

	// Fields

	private String cdid;
	private String cdmc;
	private String url;
	private String sjcdid;
	private Integer plxh;
	private String cdlx;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgXtXtcd() {
	}

	/** minimal constructor */
	public TWgXtXtcd(String cdid, String cdmc, String sjcdid) {
		this.cdid = cdid;
		this.cdmc = cdmc;
		this.sjcdid = sjcdid;
	}

	/** full constructor */
	public TWgXtXtcd(String cdid, String cdmc, String url, String sjcdid, Integer plxh, String cdlx, String yxbj,
			Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.cdid = cdid;
		this.cdmc = cdmc;
		this.url = url;
		this.sjcdid = sjcdid;
		this.plxh = plxh;
		this.cdlx = cdlx;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "cdid", unique = true, nullable = false, length = 32)

	public String getCdid() {
		return this.cdid;
	}

	public void setCdid(String cdid) {
		this.cdid = cdid;
	}

	@Column(name = "cdmc", nullable = false, length = 50)

	public String getCdmc() {
		return this.cdmc;
	}

	public void setCdmc(String cdmc) {
		this.cdmc = cdmc;
	}

	@Column(name = "url", length = 100)

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Column(name = "sjcdid", nullable = false, length = 32)

	public String getSjcdid() {
		return this.sjcdid;
	}

	public void setSjcdid(String sjcdid) {
		this.sjcdid = sjcdid;
	}

	@Column(name = "plxh")

	public Integer getPlxh() {
		return this.plxh;
	}

	public void setPlxh(Integer plxh) {
		this.plxh = plxh;
	}

	@Column(name = "cdlx", length = 1)

	public String getCdlx() {
		return this.cdlx;
	}

	public void setCdlx(String cdlx) {
		this.cdlx = cdlx;
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