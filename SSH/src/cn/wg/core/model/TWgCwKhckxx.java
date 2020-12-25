package cn.wg.core.model;

import com.ctp.core.model.BasePersistentObject;
import java.sql.Timestamp;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * TWgCwKhckxx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_cw_khckxx")

public class TWgCwKhckxx extends BasePersistentObject{

	// Fields

	private String khckid;
	private String cwid;
	private String sqdm;
	private String fcid;
	private String khid;
	private String ckh;
	private String cklxdm;
	private Date kkrq;
	private Date jsrq;
	private String sfbzid;
	private String cphm;
	private String ztbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;
	private String bz;

	// Constructors

	/** default constructor */
	public TWgCwKhckxx() {
	}

	/** minimal constructor */
	public TWgCwKhckxx(String khckid) {
		this.khckid = khckid;
	}

	/** full constructor */
	public TWgCwKhckxx(String khckid, String cwid, String sqdm, String fcid, String khid, String ckh, String cklxdm,
			Date kkrq, Date jsrq, String sfbzid, String cphm, String ztbj, Timestamp lrsj, String lrry, Timestamp xgsj,
			String xgry, String bz) {
		this.khckid = khckid;
		this.cwid = cwid;
		this.sqdm = sqdm;
		this.fcid = fcid;
		this.khid = khid;
		this.ckh = ckh;
		this.cklxdm = cklxdm;
		this.kkrq = kkrq;
		this.jsrq = jsrq;
		this.sfbzid = sfbzid;
		this.cphm = cphm;
		this.ztbj = ztbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
		this.bz = bz;
	}

	// Property accessors
	@Id

	@Column(name = "khckid", unique = true, nullable = false, length = 32)

	public String getKhckid() {
		return this.khckid;
	}

	public void setKhckid(String khckid) {
		this.khckid = khckid;
	}

	@Column(name = "cwid", length = 32)

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

	@Column(name = "ckh", length = 50)

	public String getCkh() {
		return this.ckh;
	}

	public void setCkh(String ckh) {
		this.ckh = ckh;
	}

	@Column(name = "cklxdm", length = 10)

	public String getCklxdm() {
		return this.cklxdm;
	}

	public void setCklxdm(String cklxdm) {
		this.cklxdm = cklxdm;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "kkrq", length = 10)

	public Date getKkrq() {
		return this.kkrq;
	}

	public void setKkrq(Date kkrq) {
		this.kkrq = kkrq;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "jsrq", length = 10)

	public Date getJsrq() {
		return this.jsrq;
	}

	public void setJsrq(Date jsrq) {
		this.jsrq = jsrq;
	}

	@Column(name = "sfbzid", length = 32)

	public String getSfbzid() {
		return this.sfbzid;
	}

	public void setSfbzid(String sfbzid) {
		this.sfbzid = sfbzid;
	}

	@Column(name = "cphm", length = 50)

	public String getCphm() {
		return this.cphm;
	}

	public void setCphm(String cphm) {
		this.cphm = cphm;
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

	@Column(name = "bz", length = 500)

	public String getBz() {
		return this.bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

}