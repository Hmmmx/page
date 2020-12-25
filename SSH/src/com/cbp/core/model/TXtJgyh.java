package com.cbp.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * TXtJgyh entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_xt_jgyh", uniqueConstraints = @UniqueConstraint(columnNames = "yhdm"))

public class TXtJgyh implements java.io.Serializable {

	// Fields

	private String yhid;
	private String jgid;
	private String gwid;
	private String yhdm;
	private String yhmc;
	private String yhmm;
	private String dzyx;
	private String wxh;
	private String lxdh;
	private String dz;
	private String xb;
	private String yhlx;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TXtJgyh() {
	}

	/** minimal constructor */
	public TXtJgyh(String yhid, String yhdm, String yhmm) {
		this.yhid = yhid;
		this.yhdm = yhdm;
		this.yhmm = yhmm;
	}

	/** full constructor */
	public TXtJgyh(String yhid, String jgid, String gwid, String yhdm, String yhmc, String yhmm, String dzyx,
			String wxh, String lxdh, String dz, String xb, String yhlx, String yxbj, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry) {
		this.yhid = yhid;
		this.jgid = jgid;
		this.gwid = gwid;
		this.yhdm = yhdm;
		this.yhmc = yhmc;
		this.yhmm = yhmm;
		this.dzyx = dzyx;
		this.wxh = wxh;
		this.lxdh = lxdh;
		this.dz = dz;
		this.xb = xb;
		this.yhlx = yhlx;
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

	@Column(name = "jgid", length = 32)

	public String getJgid() {
		return this.jgid;
	}

	public void setJgid(String jgid) {
		this.jgid = jgid;
	}

	@Column(name = "gwid", length = 32)

	public String getGwid() {
		return this.gwid;
	}

	public void setGwid(String gwid) {
		this.gwid = gwid;
	}

	@Column(name = "yhdm", unique = true, nullable = false, length = 32)

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

	@Column(name = "dzyx", length = 50)

	public String getDzyx() {
		return this.dzyx;
	}

	public void setDzyx(String dzyx) {
		this.dzyx = dzyx;
	}

	@Column(name = "wxh", length = 50)

	public String getWxh() {
		return this.wxh;
	}

	public void setWxh(String wxh) {
		this.wxh = wxh;
	}

	@Column(name = "lxdh", length = 50)

	public String getLxdh() {
		return this.lxdh;
	}

	public void setLxdh(String lxdh) {
		this.lxdh = lxdh;
	}

	@Column(name = "dz", length = 200)

	public String getDz() {
		return this.dz;
	}

	public void setDz(String dz) {
		this.dz = dz;
	}

	@Column(name = "xb", length = 1)

	public String getXb() {
		return this.xb;
	}

	public void setXb(String xb) {
		this.xb = xb;
	}

	@Column(name = "yhlx", length = 1)

	public String getYhlx() {
		return this.yhlx;
	}

	public void setYhlx(String yhlx) {
		this.yhlx = yhlx;
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