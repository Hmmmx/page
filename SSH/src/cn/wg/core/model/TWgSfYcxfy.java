package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgSfYcxfy entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_sf_ycxfy")

public class TWgSfYcxfy extends BasePersistentObject{

	// Fields

	private String ycxfyid;
	private String khid;
	private String fcid;
	private String sqdm;
	private String sfxmdm;
	private String sklxdm;
	private java.math.BigDecimal dj;
	private java.math.BigDecimal sl;
	private java.math.BigDecimal sfje;
	private String ycxfypzid;
	private String ztbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgSfYcxfy() {
	}

	/** minimal constructor */
	public TWgSfYcxfy(String ycxfyid, String ycxfypzid) {
		this.ycxfyid = ycxfyid;
		this.ycxfypzid = ycxfypzid;
	}

	/** full constructor */
	public TWgSfYcxfy(String ycxfyid, String khid, String fcid, String sqdm, String sfxmdm, String sklxdm, java.math.BigDecimal dj,
			java.math.BigDecimal sl, java.math.BigDecimal sfje, String ycxfypzid, String ztbj, Timestamp lrsj, String lrry, Timestamp xgsj,
			String xgry) {
		this.ycxfyid = ycxfyid;
		this.khid = khid;
		this.fcid = fcid;
		this.sqdm = sqdm;
		this.sfxmdm = sfxmdm;
		this.sklxdm = sklxdm;
		this.dj = dj;
		this.sl = sl;
		this.sfje = sfje;
		this.ycxfypzid = ycxfypzid;
		this.ztbj = ztbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "ycxfyid", unique = true, nullable = false, length = 32)

	public String getYcxfyid() {
		return this.ycxfyid;
	}

	public void setYcxfyid(String ycxfyid) {
		this.ycxfyid = ycxfyid;
	}

	@Column(name = "khid", length = 32)

	public String getKhid() {
		return this.khid;
	}

	public void setKhid(String khid) {
		this.khid = khid;
	}

	@Column(name = "fcid", length = 32)

	public String getFcid() {
		return this.fcid;
	}

	public void setFcid(String fcid) {
		this.fcid = fcid;
	}

	@Column(name = "sqdm", length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "sfxmdm", length = 32)

	public String getSfxmdm() {
		return this.sfxmdm;
	}

	public void setSfxmdm(String sfxmdm) {
		this.sfxmdm = sfxmdm;
	}

	@Column(name = "sklxdm", length = 32)

	public String getSklxdm() {
		return this.sklxdm;
	}

	public void setSklxdm(String sklxdm) {
		this.sklxdm = sklxdm;
	}

	@Column(name = "dj", precision = 12)

	public java.math.BigDecimal getDj() {
		return this.dj;
	}

	public void setDj(java.math.BigDecimal dj) {
		this.dj = dj;
	}

	@Column(name = "sl", precision = 12)

	public java.math.BigDecimal getSl() {
		return this.sl;
	}

	public void setSl(java.math.BigDecimal sl) {
		this.sl = sl;
	}

	@Column(name = "sfje", precision = 12)

	public java.math.BigDecimal getSfje() {
		return this.sfje;
	}

	public void setSfje(java.math.BigDecimal sfje) {
		this.sfje = sfje;
	}

	@Column(name = "ycxfypzid", nullable = false, length = 32)

	public String getYcxfypzid() {
		return this.ycxfypzid;
	}

	public void setYcxfypzid(String ycxfypzid) {
		this.ycxfypzid = ycxfypzid;
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