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
 * TWgYdJgwxfsjl entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_yd_jgwxfsjl")

public class TWgYdJgwxfsjl extends BasePersistentObject{

	// Fields

	private String wxid;
	private String sqdm;
	private String gzhdm;
	private String fcid;
	private String khid;
	private String fsrydm;
	private Date fsrq;
	private String wxyhdm;
	private String mbdm;
	private String mbbh;
	private String mbnr;
	private String mbcs;
	private Long wxts;
	private String wxpch;
	private String clzt;
	private String fsjgdm;
	private String fsjgsm;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgYdJgwxfsjl() {
	}

	/** minimal constructor */
	public TWgYdJgwxfsjl(String wxid) {
		this.wxid = wxid;
	}

	/** full constructor */
	public TWgYdJgwxfsjl(String wxid, String sqdm, String gzhdm, String fcid, String khid, String fsrydm, Date fsrq,
			String wxyhdm, String mbdm, String mbbh, String mbnr, String mbcs, Long wxts, String wxpch, String clzt,
			String fsjgdm, String fsjgsm, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.wxid = wxid;
		this.sqdm = sqdm;
		this.gzhdm = gzhdm;
		this.fcid = fcid;
		this.khid = khid;
		this.fsrydm = fsrydm;
		this.fsrq = fsrq;
		this.wxyhdm = wxyhdm;
		this.mbdm = mbdm;
		this.mbbh = mbbh;
		this.mbnr = mbnr;
		this.mbcs = mbcs;
		this.wxts = wxts;
		this.wxpch = wxpch;
		this.clzt = clzt;
		this.fsjgdm = fsjgdm;
		this.fsjgsm = fsjgsm;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "wxid", unique = true, nullable = false, length = 32)

	public String getWxid() {
		return this.wxid;
	}

	public void setWxid(String wxid) {
		this.wxid = wxid;
	}

	@Column(name = "sqdm", length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "gzhdm", length = 32)

	public String getGzhdm() {
		return this.gzhdm;
	}

	public void setGzhdm(String gzhdm) {
		this.gzhdm = gzhdm;
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

	@Column(name = "fsrydm", length = 32)

	public String getFsrydm() {
		return this.fsrydm;
	}

	public void setFsrydm(String fsrydm) {
		this.fsrydm = fsrydm;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "fsrq", length = 10)

	public Date getFsrq() {
		return this.fsrq;
	}

	public void setFsrq(Date fsrq) {
		this.fsrq = fsrq;
	}

	@Column(name = "wxyhdm", length = 32)

	public String getWxyhdm() {
		return this.wxyhdm;
	}

	public void setWxyhdm(String wxyhdm) {
		this.wxyhdm = wxyhdm;
	}

	@Column(name = "mbdm", length = 200)

	public String getMbdm() {
		return this.mbdm;
	}

	public void setMbdm(String mbdm) {
		this.mbdm = mbdm;
	}

	@Column(name = "mbbh", length = 100)

	public String getMbbh() {
		return this.mbbh;
	}

	public void setMbbh(String mbbh) {
		this.mbbh = mbbh;
	}

	@Column(name = "mbnr", length = 1000)

	public String getMbnr() {
		return this.mbnr;
	}

	public void setMbnr(String mbnr) {
		this.mbnr = mbnr;
	}

	@Column(name = "mbcs", length = 1000)

	public String getMbcs() {
		return this.mbcs;
	}

	public void setMbcs(String mbcs) {
		this.mbcs = mbcs;
	}

	@Column(name = "wxts")

	public Long getWxts() {
		return this.wxts;
	}

	public void setWxts(Long wxts) {
		this.wxts = wxts;
	}

	@Column(name = "wxpch", length = 32)

	public String getWxpch() {
		return this.wxpch;
	}

	public void setWxpch(String wxpch) {
		this.wxpch = wxpch;
	}

	@Column(name = "clzt", length = 1)

	public String getClzt() {
		return this.clzt;
	}

	public void setClzt(String clzt) {
		this.clzt = clzt;
	}

	@Column(name = "fsjgdm", length = 100)

	public String getFsjgdm() {
		return this.fsjgdm;
	}

	public void setFsjgdm(String fsjgdm) {
		this.fsjgdm = fsjgdm;
	}

	@Column(name = "fsjgsm", length = 100)

	public String getFsjgsm() {
		return this.fsjgsm;
	}

	public void setFsjgsm(String fsjgsm) {
		this.fsjgsm = fsjgsm;
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

	@Column(name = "xgry", length = 50)

	public String getXgry() {
		return this.xgry;
	}

	public void setXgry(String xgry) {
		this.xgry = xgry;
	}

}