package com.cbp.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TXtXtcs entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_xt_xtcs")

public class TXtXtcs implements java.io.Serializable {

	// Fields

	private String code;
	private String value;
	private String bz;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TXtXtcs() {
	}

	/** minimal constructor */
	public TXtXtcs(String code, String value, String yxbj) {
		this.code = code;
		this.value = value;
		this.yxbj = yxbj;
	}

	/** full constructor */
	public TXtXtcs(String code, String value, String bz, String yxbj, Timestamp lrsj, String lrry, Timestamp xgsj,
			String xgry) {
		this.code = code;
		this.value = value;
		this.bz = bz;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "code", unique = true, nullable = false, length = 32)

	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(name = "value", nullable = false, length = 2048)

	public String getValue() {
		return this.value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Column(name = "bz", length = 500)

	public String getBz() {
		return this.bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

	@Column(name = "yxbj", nullable = false, length = 1)

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