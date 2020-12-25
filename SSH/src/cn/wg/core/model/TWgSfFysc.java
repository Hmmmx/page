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
 * TWgSfFysc entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_sf_fysc")

public class TWgSfFysc extends BasePersistentObject{

	// Fields

	private String fyscid;
	private String sfbzid;
	private String sqdm;
	private Date jfzqq;
	private Date jfzqz;
	private java.math.BigDecimal zje;
	private Date ysrq;
	private String zdy;
	private Date scrq;
	private String scry;
	private Date zfrq;
	private String zfry;
	private Integer scts;
	private String ztbj;
	private String bz;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgSfFysc() {
	}

	/** minimal constructor */
	public TWgSfFysc(String fyscid) {
		this.fyscid = fyscid;
	}

	/** full constructor */
	public TWgSfFysc(String fyscid, String sfbzid, String sqdm, Date jfzqq, Date jfzqz, java.math.BigDecimal zje, Date ysrq,
			String zdy, Date scrq, String scry, Date zfrq, String zfry, Integer scts, String ztbj, String bz,
			Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.fyscid = fyscid;
		this.sfbzid = sfbzid;
		this.sqdm = sqdm;
		this.jfzqq = jfzqq;
		this.jfzqz = jfzqz;
		this.zje = zje;
		this.ysrq = ysrq;
		this.zdy = zdy;
		this.scrq = scrq;
		this.scry = scry;
		this.zfrq = zfrq;
		this.zfry = zfry;
		this.scts = scts;
		this.ztbj = ztbj;
		this.bz = bz;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "fyscid", unique = true, nullable = false, length = 32)

	public String getFyscid() {
		return this.fyscid;
	}

	public void setFyscid(String fyscid) {
		this.fyscid = fyscid;
	}

	@Column(name = "sfbzid", length = 32)

	public String getSfbzid() {
		return this.sfbzid;
	}

	public void setSfbzid(String sfbzid) {
		this.sfbzid = sfbzid;
	}

	@Column(name = "sqdm", length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "jfzqq", length = 10)

	public Date getJfzqq() {
		return this.jfzqq;
	}

	public void setJfzqq(Date jfzqq) {
		this.jfzqq = jfzqq;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "jfzqz", length = 10)

	public Date getJfzqz() {
		return this.jfzqz;
	}

	public void setJfzqz(Date jfzqz) {
		this.jfzqz = jfzqz;
	}

	@Column(name = "zje", precision = 12)

	public java.math.BigDecimal getZje() {
		return this.zje;
	}

	public void setZje(java.math.BigDecimal zje) {
		this.zje = zje;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "ysrq", length = 10)

	public Date getYsrq() {
		return this.ysrq;
	}

	public void setYsrq(Date ysrq) {
		this.ysrq = ysrq;
	}

	@Column(name = "zdy", length = 10)

	public String getZdy() {
		return this.zdy;
	}

	public void setZdy(String zdy) {
		this.zdy = zdy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "scrq", length = 10)

	public Date getScrq() {
		return this.scrq;
	}

	public void setScrq(Date scrq) {
		this.scrq = scrq;
	}

	@Column(name = "scry", length = 32)

	public String getScry() {
		return this.scry;
	}

	public void setScry(String scry) {
		this.scry = scry;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "zfrq", length = 10)

	public Date getZfrq() {
		return this.zfrq;
	}

	public void setZfrq(Date zfrq) {
		this.zfrq = zfrq;
	}

	@Column(name = "zfry", length = 32)

	public String getZfry() {
		return this.zfry;
	}

	public void setZfry(String zfry) {
		this.zfry = zfry;
	}

	@Column(name = "scts")

	public Integer getScts() {
		return this.scts;
	}

	public void setScts(Integer scts) {
		this.scts = scts;
	}

	@Column(name = "ztbj", length = 1)

	public String getZtbj() {
		return this.ztbj;
	}

	public void setZtbj(String ztbj) {
		this.ztbj = ztbj;
	}

	@Column(name = "bz", length = 200)

	public String getBz() {
		return this.bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
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