package com.cbp.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TWgXtJgyhdlrz entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_xt_jgyhdlrz")

public class TWgXtJgyhdlrz implements java.io.Serializable {

	// Fields

	private String dlrzid;
	private String yhid;
	private Timestamp dlsj;
	private String dlip;
	private Timestamp tcsj;
	private String zt;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;
	private String session;

	// Constructors

	/** default constructor */
	public TWgXtJgyhdlrz() {
	}

	/** minimal constructor */
	public TWgXtJgyhdlrz(String dlrzid, String yhid, Timestamp dlsj, String session) {
		this.dlrzid = dlrzid;
		this.yhid = yhid;
		this.dlsj = dlsj;
		this.session = session;
	}

	/** full constructor */
	public TWgXtJgyhdlrz(String dlrzid, String yhid, Timestamp dlsj, String dlip, Timestamp tcsj, String zt,
			Timestamp lrsj, String lrry, Timestamp xgsj, String xgry, String session) {
		this.dlrzid = dlrzid;
		this.yhid = yhid;
		this.dlsj = dlsj;
		this.dlip = dlip;
		this.tcsj = tcsj;
		this.zt = zt;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
		this.session = session;
	}

	// Property accessors
	@Id

	@Column(name = "dlrzid", unique = true, nullable = false, length = 32)

	public String getDlrzid() {
		return this.dlrzid;
	}

	public void setDlrzid(String dlrzid) {
		this.dlrzid = dlrzid;
	}

	@Column(name = "yhid", nullable = false, length = 32)

	public String getYhid() {
		return this.yhid;
	}

	public void setYhid(String yhid) {
		this.yhid = yhid;
	}

	@Column(name = "dlsj", nullable = false, length = 19)

	public Timestamp getDlsj() {
		return this.dlsj;
	}

	public void setDlsj(Timestamp dlsj) {
		this.dlsj = dlsj;
	}

	@Column(name = "dlip", length = 50)

	public String getDlip() {
		return this.dlip;
	}

	public void setDlip(String dlip) {
		this.dlip = dlip;
	}

	@Column(name = "tcsj", length = 19)

	public Timestamp getTcsj() {
		return this.tcsj;
	}

	public void setTcsj(Timestamp tcsj) {
		this.tcsj = tcsj;
	}

	@Column(name = "zt", length = 1)

	public String getZt() {
		return this.zt;
	}

	public void setZt(String zt) {
		this.zt = zt;
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

	@Column(name = "session", nullable = false, length = 500)

	public String getSession() {
		return this.session;
	}

	public void setSession(String session) {
		this.session = session;
	}

}