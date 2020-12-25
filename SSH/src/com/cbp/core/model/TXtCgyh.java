package com.cbp.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TXtCgyh entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_xt_cgyh")

public class TXtCgyh implements java.io.Serializable {

	// Fields

	private String yhid;
	private String yhdm;
	private String yhmc;
	private String yhmm;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TXtCgyh() {
	}

	/** minimal constructor */
	public TXtCgyh(String yhid, String yhdm, String yhmm) {
		this.yhid = yhid;
		this.yhdm = yhdm;
		this.yhmm = yhmm;
	}

	/** full constructor */
	public TXtCgyh(String yhid, String yhdm, String yhmc, String yhmm, String yxbj, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry) {
		this.yhid = yhid;
		this.yhdm = yhdm;
		this.yhmc = yhmc;
		this.yhmm = yhmm;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "yhid", unique = true, nullable = false, length = 32)

	public String getYhid() {
		return this.yhid;
	}

	public void setYhid(String yhid) {
		this.yhid = yhid;
	}

	@Column(name = "yhdm", nullable = false, length = 32)

	public String getYhdm() {
		return this.yhdm;
	}

	public void setYhdm(String yhdm) {
		this.yhdm = yhdm;
	}

	@Column(name = "yhmc", length = 50)

	public String getYhmc() {
		return this.yhmc;
	}

	public void setYhmc(String yhmc) {
		this.yhmc = yhmc;
	}

	@Column(name = "yhmm", nullable = false, length = 50)

	public String getYhmm() {
		return this.yhmm;
	}

	public void setYhmm(String yhmm) {
		this.yhmm = yhmm;
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