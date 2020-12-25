package com.cbp.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TXtJggw entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_xt_jggw")

public class TXtJggw implements java.io.Serializable {

	// Fields

	private String gwid;
	private String jgid;
	private String gwmc;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TXtJggw() {
	}

	/** minimal constructor */
	public TXtJggw(String gwid, String jgid, String gwmc) {
		this.gwid = gwid;
		this.jgid = jgid;
		this.gwmc = gwmc;
	}

	/** full constructor */
	public TXtJggw(String gwid, String jgid, String gwmc, String yxbj, Timestamp lrsj, String lrry, Timestamp xgsj,
			String xgry) {
		this.gwid = gwid;
		this.jgid = jgid;
		this.gwmc = gwmc;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "gwid", unique = true, nullable = false, length = 32)

	public String getGwid() {
		return this.gwid;
	}

	public void setGwid(String gwid) {
		this.gwid = gwid;
	}

	@Column(name = "jgid", nullable = false, length = 32)

	public String getJgid() {
		return this.jgid;
	}

	public void setJgid(String jgid) {
		this.jgid = jgid;
	}

	@Column(name = "gwmc", nullable = false, length = 50)

	public String getGwmc() {
		return this.gwmc;
	}

	public void setGwmc(String gwmc) {
		this.gwmc = gwmc;
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