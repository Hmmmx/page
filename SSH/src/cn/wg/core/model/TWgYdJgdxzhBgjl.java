package cn.wg.core.model;

import java.sql.Timestamp;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgYdJgdxzhBgjl entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_yd_jgdxzh_bgjl")

public class TWgYdJgdxzhBgjl extends BasePersistentObject{

	// Fields

	private String bgdxzhid;
	private String sqdm;
	private Date bgrq;
	private String bglx;
	private Integer bgts;
	private String bgry;
	private String ztbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgYdJgdxzhBgjl() {
	}

	/** minimal constructor */
	public TWgYdJgdxzhBgjl(String bgdxzhid) {
		this.bgdxzhid = bgdxzhid;
	}

	/** full constructor */
	public TWgYdJgdxzhBgjl(String bgdxzhid, String sqdm, Date bgrq, String bglx, Integer bgts, String bgry, String ztbj,
			Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.bgdxzhid = bgdxzhid;
		this.sqdm = sqdm;
		this.bgrq = bgrq;
		this.bglx = bglx;
		this.bgts = bgts;
		this.bgry = bgry;
		this.ztbj = ztbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "bgdxzhid", unique = true, nullable = false, length = 32)

	public String getBgdxzhid() {
		return this.bgdxzhid;
	}

	public void setBgdxzhid(String bgdxzhid) {
		this.bgdxzhid = bgdxzhid;
	}

	@Column(name = "sqdm", length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "bgrq", length = 10)

	public Date getBgrq() {
		return this.bgrq;
	}

	public void setBgrq(Date bgrq) {
		this.bgrq = bgrq;
	}

	@Column(name = "bglx", length = 1)

	public String getBglx() {
		return this.bglx;
	}

	public void setBglx(String bglx) {
		this.bglx = bglx;
	}

	@Column(name = "bgts")

	public Integer getBgts() {
		return this.bgts;
	}

	public void setBgts(Integer bgts) {
		this.bgts = bgts;
	}

	@Column(name = "bgry", length = 32)

	public String getBgry() {
		return this.bgry;
	}

	public void setBgry(String bgry) {
		this.bgry = bgry;
	}

	@Column(name = "ztbj", length = 1)

	public String getZtbj() {
		return this.ztbj;
	}

	public void setZtbj(String ztbj) {
		this.ztbj = ztbj;
	}

	@Column(name = "lrsj", length = 19)

	public Timestamp getLrsj() {
		return this.lrsj;
	}

	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}

	@Column(name = "lrry", length = 50)

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

	@Column(name = "xgry", length = 50)

	public String getXgry() {
		return this.xgry;
	}

	public void setXgry(String xgry) {
		this.xgry = xgry;
	}

}