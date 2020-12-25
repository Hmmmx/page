package com.cbp.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TWgXtJggw entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_xt_jggw")

public class TWgXtJggw implements java.io.Serializable {

	// Fields

	private String gwid;
	private String sqid;
	private String gwmc;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgXtJggw() {
	}

	/** minimal constructor */
	public TWgXtJggw(String gwid, String sqid, String gwmc) {
		this.gwid = gwid;
		this.sqid = sqid;
		this.gwmc = gwmc;
	}

	/** full constructor */
	public TWgXtJggw(String gwid, String sqid, String gwmc, String yxbj, Timestamp lrsj, String lrry, Timestamp xgsj,
			String xgry) {
		this.gwid = gwid;
		this.sqid = sqid;
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

	@Column(name = "sqid", nullable = false, length = 32)

	public String getSqid() {
		return this.sqid;
	}

	public void setSqid(String sqid) {
		this.sqid = sqid;
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