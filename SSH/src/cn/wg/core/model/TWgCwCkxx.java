package cn.wg.core.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;
/**
 * TWgCwCkxx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_cw_ckxx")

public class TWgCwCkxx extends BasePersistentObject{

	// Fields

	private String ckid;
	private String sqdm;
	private String ckmc;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgCwCkxx() {
	}

	/** minimal constructor */
	public TWgCwCkxx(String ckid) {
		this.ckid = ckid;
	}

	/** full constructor */
	public TWgCwCkxx(String ckid, String sqdm, String ckmc, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.ckid = ckid;
		this.sqdm = sqdm;
		this.ckmc = ckmc;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "ckid", unique = true, nullable = false, length = 32)

	public String getCkid() {
		return this.ckid;
	}

	public void setCkid(String ckid) {
		this.ckid = ckid;
	}

	@Column(name = "sqdm", length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "ckmc", length = 50)

	public String getCkmc() {
		return this.ckmc;
	}

	public void setCkmc(String ckmc) {
		this.ckmc = ckmc;
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