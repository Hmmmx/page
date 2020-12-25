package com.cbp.core.model;

import java.sql.Timestamp;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * TWgXtJgcd entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_xt_jgcd")

public class TWgXtJgcd implements java.io.Serializable {

	// Fields

	private TWgXtJgcdId id;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgXtJgcd() {
	}

	/** minimal constructor */
	public TWgXtJgcd(TWgXtJgcdId id, String yxbj, Timestamp lrsj, String lrry) {
		this.id = id;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
	}

	/** full constructor */
	public TWgXtJgcd(TWgXtJgcdId id, String yxbj, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.id = id;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@EmbeddedId

	@AttributeOverrides({
			@AttributeOverride(name = "sqid", column = @Column(name = "sqid", nullable = false, length = 32)),
			@AttributeOverride(name = "cdid", column = @Column(name = "cdid", nullable = false, length = 32)) })

	public TWgXtJgcdId getId() {
		return this.id;
	}

	public void setId(TWgXtJgcdId id) {
		this.id = id;
	}

	@Column(name = "yxbj", nullable = false, length = 1)

	public String getYxbj() {
		return this.yxbj;
	}

	public void setYxbj(String yxbj) {
		this.yxbj = yxbj;
	}

	@Column(name = "lrsj", nullable = false, length = 19)

	public Timestamp getLrsj() {
		return this.lrsj;
	}

	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}

	@Column(name = "lrry", nullable = false, length = 20)

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