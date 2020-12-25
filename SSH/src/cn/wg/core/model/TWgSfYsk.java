package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgSfYsk entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_sf_ysk")

public class TWgSfYsk extends BasePersistentObject{

	// Fields

	private String yskid;
	private String sqdm;
	private String fcid;
	private String khid;
	private String sfxmdm;
	private java.math.BigDecimal dqye;
	private java.math.BigDecimal ssze;
	private java.math.BigDecimal szze;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgSfYsk() {
	}

	/** minimal constructor */
	public TWgSfYsk(String yskid) {
		this.yskid = yskid;
	}

	/** full constructor */
	public TWgSfYsk(String yskid, String sqdm, String fcid, String khid, String sfxmdm, java.math.BigDecimal dqye, java.math.BigDecimal ssze,
			java.math.BigDecimal szze, String yxbj, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.yskid = yskid;
		this.sqdm = sqdm;
		this.fcid = fcid;
		this.khid = khid;
		this.sfxmdm = sfxmdm;
		this.dqye = dqye;
		this.ssze = ssze;
		this.szze = szze;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "yskid", unique = true, nullable = false, length = 32)

	public String getYskid() {
		return this.yskid;
	}

	public void setYskid(String yskid) {
		this.yskid = yskid;
	}

	@Column(name = "sqdm", length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "fcid", length = 32)

	public String getFcid() {
		return this.fcid;
	}

	public void setFcid(String fcid) {
		this.fcid = fcid;
	}

	@Column(name = "khid", length = 32)

	public String getKhid() {
		return this.khid;
	}

	public void setKhid(String khid) {
		this.khid = khid;
	}

	@Column(name = "sfxmdm", length = 32)

	public String getSfxmdm() {
		return this.sfxmdm;
	}

	public void setSfxmdm(String sfxmdm) {
		this.sfxmdm = sfxmdm;
	}

	@Column(name = "dqye", precision = 12)

	public java.math.BigDecimal getDqye() {
		return this.dqye;
	}

	public void setDqye(java.math.BigDecimal dqye) {
		this.dqye = dqye;
	}

	@Column(name = "ssze", precision = 12)

	public java.math.BigDecimal getSsze() {
		return this.ssze;
	}

	public void setSsze(java.math.BigDecimal ssze) {
		this.ssze = ssze;
	}

	@Column(name = "szze", precision = 12)

	public java.math.BigDecimal getSzze() {
		return this.szze;
	}

	public void setSzze(java.math.BigDecimal szze) {
		this.szze = szze;
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