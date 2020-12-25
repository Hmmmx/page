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
 * TWgCbKhybcbmx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_cb_khybcbmx")

public class TWgCbKhybcbmx extends BasePersistentObject{

	// Fields

	private String khybcbid;
	private String khybid;
	private String sqcbid;
	private Date sqcbrq;
	private java.math.BigDecimal sqds;
	private Date bqcbrq;
	private java.math.BigDecimal bqds;
	private java.math.BigDecimal bqyl;
	private String ghbj;
	private java.math.BigDecimal jbyl;
	private java.math.BigDecimal sjyl;
	private String czry;
	private String bz;
	private String shbj;
	private String fyscbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgCbKhybcbmx() {
	}

	/** minimal constructor */
	public TWgCbKhybcbmx(String khybcbid, String khybid) {
		this.khybcbid = khybcbid;
		this.khybid = khybid;
	}

	/** full constructor */
	public TWgCbKhybcbmx(String khybcbid, String khybid, String sqcbid, Date sqcbrq, java.math.BigDecimal sqds, Date bqcbrq,
			java.math.BigDecimal bqds, java.math.BigDecimal bqyl, String ghbj, java.math.BigDecimal jbyl, java.math.BigDecimal sjyl, String czry, String bz, String shbj,
			String fyscbj, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.khybcbid = khybcbid;
		this.khybid = khybid;
		this.sqcbid = sqcbid;
		this.sqcbrq = sqcbrq;
		this.sqds = sqds;
		this.bqcbrq = bqcbrq;
		this.bqds = bqds;
		this.bqyl = bqyl;
		this.ghbj = ghbj;
		this.jbyl = jbyl;
		this.sjyl = sjyl;
		this.czry = czry;
		this.bz = bz;
		this.shbj = shbj;
		this.fyscbj = fyscbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "khybcbid", unique = true, nullable = false, length = 32)

	public String getKhybcbid() {
		return this.khybcbid;
	}

	public void setKhybcbid(String khybcbid) {
		this.khybcbid = khybcbid;
	}

	@Column(name = "khybid", nullable = false, length = 32)

	public String getKhybid() {
		return this.khybid;
	}

	public void setKhybid(String khybid) {
		this.khybid = khybid;
	}

	@Column(name = "sqcbid", length = 32)

	public String getSqcbid() {
		return this.sqcbid;
	}

	public void setSqcbid(String sqcbid) {
		this.sqcbid = sqcbid;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "sqcbrq", length = 10)

	public Date getSqcbrq() {
		return this.sqcbrq;
	}

	public void setSqcbrq(Date sqcbrq) {
		this.sqcbrq = sqcbrq;
	}

	@Column(name = "sqds", precision = 12)

	public java.math.BigDecimal getSqds() {
		return this.sqds;
	}

	public void setSqds(java.math.BigDecimal sqds) {
		this.sqds = sqds;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "bqcbrq", length = 10)

	public Date getBqcbrq() {
		return this.bqcbrq;
	}

	public void setBqcbrq(Date bqcbrq) {
		this.bqcbrq = bqcbrq;
	}

	@Column(name = "bqds", precision = 12)

	public java.math.BigDecimal getBqds() {
		return this.bqds;
	}

	public void setBqds(java.math.BigDecimal bqds) {
		this.bqds = bqds;
	}

	@Column(name = "bqyl", precision = 12)

	public java.math.BigDecimal getBqyl() {
		return this.bqyl;
	}

	public void setBqyl(java.math.BigDecimal bqyl) {
		this.bqyl = bqyl;
	}

	@Column(name = "ghbj", length = 1)

	public String getGhbj() {
		return this.ghbj;
	}

	public void setGhbj(String ghbj) {
		this.ghbj = ghbj;
	}

	@Column(name = "jbyl", precision = 12)

	public java.math.BigDecimal getJbyl() {
		return this.jbyl;
	}

	public void setJbyl(java.math.BigDecimal jbyl) {
		this.jbyl = jbyl;
	}

	@Column(name = "sjyl", precision = 12)

	public java.math.BigDecimal getSjyl() {
		return this.sjyl;
	}

	public void setSjyl(java.math.BigDecimal sjyl) {
		this.sjyl = sjyl;
	}

	@Column(name = "czry", length = 20)

	public String getCzry() {
		return this.czry;
	}

	public void setCzry(String czry) {
		this.czry = czry;
	}

	@Column(name = "bz", length = 500)

	public String getBz() {
		return this.bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

	@Column(name = "shbj", length = 1)

	public String getShbj() {
		return this.shbj;
	}

	public void setShbj(String shbj) {
		this.shbj = shbj;
	}

	@Column(name = "fyscbj", length = 1)

	public String getFyscbj() {
		return this.fyscbj;
	}

	public void setFyscbj(String fyscbj) {
		this.fyscbj = fyscbj;
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