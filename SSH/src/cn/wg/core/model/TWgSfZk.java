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
 * TWgSfZk entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_sf_zk")

public class TWgSfZk extends BasePersistentObject{

	// Fields

	private String zkid;
	private String sqdm;
	private String sfxmdm;
	private String zklx;
	private Integer ysys;
	private java.math.BigDecimal zk;
	private Date yxrqq;
	private Date yxrqz;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgSfZk() {
	}

	/** minimal constructor */
	public TWgSfZk(String zkid) {
		this.zkid = zkid;
	}

	/** full constructor */
	public TWgSfZk(String zkid, String sqdm, String sfxmdm, String zklx, Integer ysys, java.math.BigDecimal zk, Date yxrqq,
			Date yxrqz, String yxbj, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.zkid = zkid;
		this.sqdm = sqdm;
		this.sfxmdm = sfxmdm;
		this.zklx = zklx;
		this.ysys = ysys;
		this.zk = zk;
		this.yxrqq = yxrqq;
		this.yxrqz = yxrqz;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "zkid", unique = true, nullable = false, length = 32)

	public String getZkid() {
		return this.zkid;
	}

	public void setZkid(String zkid) {
		this.zkid = zkid;
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

	@Column(name = "zklx", length = 1)

	public String getZklx() {
		return this.zklx;
	}

	public void setZklx(String zklx) {
		this.zklx = zklx;
	}

	@Column(name = "ysys")

	public Integer getYsys() {
		return this.ysys;
	}

	public void setYsys(Integer ysys) {
		this.ysys = ysys;
	}

	@Column(name = "zk", precision = 12)

	public java.math.BigDecimal getZk() {
		return this.zk;
	}

	public void setZk(java.math.BigDecimal zk) {
		this.zk = zk;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "yxrqq", length = 10)

	public Date getYxrqq() {
		return this.yxrqq;
	}

	public void setYxrqq(Date yxrqq) {
		this.yxrqq = yxrqq;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "yxrqz", length = 10)

	public Date getYxrqz() {
		return this.yxrqz;
	}

	public void setYxrqz(Date yxrqz) {
		this.yxrqz = yxrqz;
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