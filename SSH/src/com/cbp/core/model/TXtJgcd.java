package com.cbp.core.model;

import java.sql.Timestamp;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * TXtJgcd entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_xt_jgcd")

public class TXtJgcd implements java.io.Serializable {

	// Fields

	private TXtJgcdId id;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TXtJgcd() {
	}

	/** minimal constructor */
	public TXtJgcd(TXtJgcdId id) {
		this.id = id;
	}

	/** full constructor */
	public TXtJgcd(TXtJgcdId id, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.id = id;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@EmbeddedId

	@AttributeOverrides({
			@AttributeOverride(name = "jgid", column = @Column(name = "jgid", nullable = false, length = 32)),
			@AttributeOverride(name = "cdid", column = @Column(name = "cdid", nullable = false, length = 32)) })

	public TXtJgcdId getId() {
		return this.id;
	}

	public void setId(TXtJgcdId id) {
		this.id = id;
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