package cn.wg.core.model;

import java.math.BigDecimal;
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
 * TWgSfXkgz entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_sf_xkgz", catalog = "sqdb")

public class TWgSfXkgz extends BasePersistentObject {

	// Fields

	private String xkgzid;
	private String sqdm;
	private String fcid;
	private String khid;
	private String sfxmdm;
	private String wxyhdm;
	private String sfbzid;
	private Date xfrqq;
	private Date xfrqz;
	private String cwhm;
	private String ckh;
	private String cphm;
	private String xfys;
	private BigDecimal xfje;
	private Date fsrq;
	private String xksfpzid;
	private String clbj;
	private String ztbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgSfXkgz() {
	}

	/** minimal constructor */
	public TWgSfXkgz(String xkgzid, String sqdm, String fcid, String khid, String cwhm, String ckh, String cphm,
			String xfys, String xksfpzid) {
		this.xkgzid = xkgzid;
		this.sqdm = sqdm;
		this.fcid = fcid;
		this.khid = khid;
		this.cwhm = cwhm;
		this.ckh = ckh;
		this.cphm = cphm;
		this.xfys = xfys;
		this.xksfpzid = xksfpzid;
	}

	/** full constructor */
	public TWgSfXkgz(String xkgzid, String sqdm, String fcid, String khid, String sfxmdm, String wxyhdm, String sfbzid,
			Date xfrqq, Date xfrqz, String cwhm, String ckh, String cphm, String xfys, BigDecimal xfje, Date fsrq,
			String xksfpzid, String clbj, String ztbj, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.xkgzid = xkgzid;
		this.sqdm = sqdm;
		this.fcid = fcid;
		this.khid = khid;
		this.sfxmdm = sfxmdm;
		this.wxyhdm = wxyhdm;
		this.sfbzid = sfbzid;
		this.xfrqq = xfrqq;
		this.xfrqz = xfrqz;
		this.cwhm = cwhm;
		this.ckh = ckh;
		this.cphm = cphm;
		this.xfys = xfys;
		this.xfje = xfje;
		this.fsrq = fsrq;
		this.xksfpzid = xksfpzid;
		this.clbj = clbj;
		this.ztbj = ztbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "xkgzid", unique = true, nullable = false, length = 32)

	public String getXkgzid() {
		return this.xkgzid;
	}

	public void setXkgzid(String xkgzid) {
		this.xkgzid = xkgzid;
	}

	@Column(name = "sqdm", nullable = false, length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "fcid", nullable = false, length = 32)

	public String getFcid() {
		return this.fcid;
	}

	public void setFcid(String fcid) {
		this.fcid = fcid;
	}

	@Column(name = "khid", nullable = false, length = 32)

	public String getKhid() {
		return this.khid;
	}

	public void setKhid(String khid) {
		this.khid = khid;
	}

	@Column(name = "sfxmdm", length = 50)

	public String getSfxmdm() {
		return this.sfxmdm;
	}

	public void setSfxmdm(String sfxmdm) {
		this.sfxmdm = sfxmdm;
	}

	@Column(name = "wxyhdm", length = 32)

	public String getWxyhdm() {
		return this.wxyhdm;
	}

	public void setWxyhdm(String wxyhdm) {
		this.wxyhdm = wxyhdm;
	}

	@Column(name = "sfbzid", length = 32)

	public String getSfbzid() {
		return this.sfbzid;
	}

	public void setSfbzid(String sfbzid) {
		this.sfbzid = sfbzid;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "xfrqq", length = 10)

	public Date getXfrqq() {
		return this.xfrqq;
	}

	public void setXfrqq(Date xfrqq) {
		this.xfrqq = xfrqq;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "xfrqz", length = 10)

	public Date getXfrqz() {
		return this.xfrqz;
	}

	public void setXfrqz(Date xfrqz) {
		this.xfrqz = xfrqz;
	}

	@Column(name = "cwhm", nullable = false, length = 32)

	public String getCwhm() {
		return this.cwhm;
	}

	public void setCwhm(String cwhm) {
		this.cwhm = cwhm;
	}

	@Column(name = "ckh", nullable = false, length = 32)

	public String getCkh() {
		return this.ckh;
	}

	public void setCkh(String ckh) {
		this.ckh = ckh;
	}

	@Column(name = "cphm", nullable = false, length = 32)

	public String getCphm() {
		return this.cphm;
	}

	public void setCphm(String cphm) {
		this.cphm = cphm;
	}

	@Column(name = "xfys", nullable = false, length = 32)

	public String getXfys() {
		return this.xfys;
	}

	public void setXfys(String xfys) {
		this.xfys = xfys;
	}

	@Column(name = "xfje", precision = 12)

	public BigDecimal getXfje() {
		return this.xfje;
	}

	public void setXfje(BigDecimal xfje) {
		this.xfje = xfje;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "fsrq", length = 10)

	public Date getFsrq() {
		return this.fsrq;
	}

	public void setFsrq(Date fsrq) {
		this.fsrq = fsrq;
	}

	@Column(name = "xksfpzid", nullable = false, length = 32)

	public String getXksfpzid() {
		return this.xksfpzid;
	}

	public void setXksfpzid(String xksfpzid) {
		this.xksfpzid = xksfpzid;
	}

	@Column(name = "clbj", length = 1)

	public String getClbj() {
		return this.clbj;
	}

	public void setClbj(String clbj) {
		this.clbj = clbj;
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