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
 * TWgSfYjth entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_sf_yjth")

public class TWgSfYjth extends BasePersistentObject{

	// Fields

	private String yjthid;
	private String yjid;
	private String sfpzid;
	private String skr;
	private Date tksj;
	private String tkr;
	private String tkbz;
	private String pjbh;
	private String pjlxdm;
	private String pzh;
	private String ztbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgSfYjth() {
	}

	/** minimal constructor */
	public TWgSfYjth(String yjthid, String yjid) {
		this.yjthid = yjthid;
		this.yjid = yjid;
	}

	/** full constructor */
	public TWgSfYjth(String yjthid, String yjid, String sfpzid, String skr, Date tksj, String tkr, String tkbz,
			String pjbh, String pjlxdm, String pzh, String ztbj, Timestamp lrsj, String lrry, Timestamp xgsj,
			String xgry) {
		this.yjthid = yjthid;
		this.yjid = yjid;
		this.sfpzid = sfpzid;
		this.skr = skr;
		this.tksj = tksj;
		this.tkr = tkr;
		this.tkbz = tkbz;
		this.pjbh = pjbh;
		this.pjlxdm = pjlxdm;
		this.pzh = pzh;
		this.ztbj = ztbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "yjthid", unique = true, nullable = false, length = 32)

	public String getYjthid() {
		return this.yjthid;
	}

	public void setYjthid(String yjthid) {
		this.yjthid = yjthid;
	}

	@Column(name = "yjid", nullable = false, length = 32)

	public String getYjid() {
		return this.yjid;
	}

	public void setYjid(String yjid) {
		this.yjid = yjid;
	}

	@Column(name = "sfpzid", length = 32)

	public String getSfpzid() {
		return this.sfpzid;
	}

	public void setSfpzid(String sfpzid) {
		this.sfpzid = sfpzid;
	}

	@Column(name = "skr", length = 50)

	public String getSkr() {
		return this.skr;
	}

	public void setSkr(String skr) {
		this.skr = skr;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "tksj", length = 10)

	public Date getTksj() {
		return this.tksj;
	}

	public void setTksj(Date tksj) {
		this.tksj = tksj;
	}

	@Column(name = "tkr", length = 20)

	public String getTkr() {
		return this.tkr;
	}

	public void setTkr(String tkr) {
		this.tkr = tkr;
	}

	@Column(name = "tkbz", length = 100)

	public String getTkbz() {
		return this.tkbz;
	}

	public void setTkbz(String tkbz) {
		this.tkbz = tkbz;
	}

	@Column(name = "pjbh", length = 50)

	public String getPjbh() {
		return this.pjbh;
	}

	public void setPjbh(String pjbh) {
		this.pjbh = pjbh;
	}

	@Column(name = "pjlxdm", length = 50)

	public String getPjlxdm() {
		return this.pjlxdm;
	}

	public void setPjlxdm(String pjlxdm) {
		this.pjlxdm = pjlxdm;
	}

	@Column(name = "pzh", length = 50)

	public String getPzh() {
		return this.pzh;
	}

	public void setPzh(String pzh) {
		this.pzh = pzh;
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