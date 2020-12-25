package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;
/**
 * TWgCwCwxx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_cw_cwxx")

public class TWgCwCwxx extends BasePersistentObject{

	// Fields

	private String cwid;
	private String sqdm;
	private String ckid;
	private String cwhm;
	private java.math.BigDecimal cwmj;
	private String ztbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgCwCwxx() {
	}

	/** minimal constructor */
	public TWgCwCwxx(String cwid, String ckid) {
		this.cwid = cwid;
		this.ckid = ckid;
	}

	/** full constructor */
	public TWgCwCwxx(String cwid, String sqdm, String ckid, String cwhm, java.math.BigDecimal cwmj, String ztbj, Timestamp lrsj,
			String lrry, Timestamp xgsj, String xgry) {
		this.cwid = cwid;
		this.sqdm = sqdm;
		this.ckid = ckid;
		this.cwhm = cwhm;
		this.cwmj = cwmj;
		this.ztbj = ztbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "cwid", unique = true, nullable = false, length = 32)

	public String getCwid() {
		return this.cwid;
	}

	public void setCwid(String cwid) {
		this.cwid = cwid;
	}

	@Column(name = "sqdm", length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "ckid", nullable = false, length = 32)

	public String getCkid() {
		return this.ckid;
	}

	public void setCkid(String ckid) {
		this.ckid = ckid;
	}

	@Column(name = "cwhm", length = 50)

	public String getCwhm() {
		return this.cwhm;
	}

	public void setCwhm(String cwhm) {
		this.cwhm = cwhm;
	}

	@Column(name = "cwmj", precision = 12)

	public java.math.BigDecimal getCwmj() {
		return this.cwmj;
	}

	public void setCwmj(java.math.BigDecimal cwmj) {
		this.cwmj = cwmj;
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

	@Column(name = "lrry", length = 32)

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

	@Column(name = "xgry", length = 32)

	public String getXgry() {
		return this.xgry;
	}

	public void setXgry(String xgry) {
		this.xgry = xgry;
	}

}