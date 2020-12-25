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
 * TWgYdJgdxfsjl entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_yd_jgdxfsjl")

public class TWgYdJgdxfsjl extends BasePersistentObject{

	// Fields

	private String dxid;
	private String sqdm;
	private String fcid;
	private String khid;
	private String fsrydm;
	private Date fsrq;
	private String sjhm;
	private String mbbh;
	private String mbnr;
	private String mbdm;
	private String mbcs;
	private Integer dxts;
	private String dxpch;
	private String clzt;
	private String fsjgdm;
	private String dxqm;
	private String fsjgsm;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgYdJgdxfsjl() {
	}

	/** minimal constructor */
	public TWgYdJgdxfsjl(String dxid) {
		this.dxid = dxid;
	}

	/** full constructor */
	public TWgYdJgdxfsjl(String dxid, String sqdm, String fcid, String khid, String fsrydm, Date fsrq, String sjhm,
			String mbbh, String mbnr, String mbdm, String mbcs, Integer dxts, String dxpch, String clzt, String fsjgdm,
			String dxqm, String fsjgsm, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.dxid = dxid;
		this.sqdm = sqdm;
		this.fcid = fcid;
		this.khid = khid;
		this.fsrydm = fsrydm;
		this.fsrq = fsrq;
		this.sjhm = sjhm;
		this.mbbh = mbbh;
		this.mbnr = mbnr;
		this.mbdm = mbdm;
		this.mbcs = mbcs;
		this.dxts = dxts;
		this.dxpch = dxpch;
		this.clzt = clzt;
		this.fsjgdm = fsjgdm;
		this.dxqm = dxqm;
		this.fsjgsm = fsjgsm;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "dxid", unique = true, nullable = false, length = 32)

	public String getDxid() {
		return this.dxid;
	}

	public void setDxid(String dxid) {
		this.dxid = dxid;
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

	@Column(name = "fsrydm", length = 20)

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

	@Column(name = "sjhm", length = 32)

	public String getSjhm() {
		return this.sjhm;
	}

	public void setSjhm(String sjhm) {
		this.sjhm = sjhm;
	}

	@Column(name = "mbbh", length = 20)

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

	@Column(name = "mbdm", length = 32)

	public String getMbdm() {
		return this.mbdm;
	}

	public void setMbdm(String mbdm) {
		this.mbdm = mbdm;
	}

	@Column(name = "mbcs", length = 1000)

	public String getMbcs() {
		return this.mbcs;
	}

	public void setMbcs(String mbcs) {
		this.mbcs = mbcs;
	}

	@Column(name = "dxts")

	public Integer getDxts() {
		return this.dxts;
	}

	public void setDxts(Integer dxts) {
		this.dxts = dxts;
	}

	@Column(name = "dxpch", length = 32)

	public String getDxpch() {
		return this.dxpch;
	}

	public void setDxpch(String dxpch) {
		this.dxpch = dxpch;
	}

	@Column(name = "clzt", length = 4)

	public String getClzt() {
		return this.clzt;
	}

	public void setClzt(String clzt) {
		this.clzt = clzt;
	}

	@Column(name = "fsjgdm", length = 1)

	public String getFsjgdm() {
		return this.fsjgdm;
	}

	public void setFsjgdm(String fsjgdm) {
		this.fsjgdm = fsjgdm;
	}

	@Column(name = "dxqm", length = 50)

	public String getDxqm() {
		return this.dxqm;
	}

	public void setDxqm(String dxqm) {
		this.dxqm = dxqm;
	}

	@Column(name = "fsjgsm", length = 50)

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