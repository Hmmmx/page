package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgWySbxc entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_wy_sbxc", catalog = "sqdb")

public class TWgWySbxc extends BasePersistentObject {

	// Fields

	private String sbxcid;
	private String sqdm;
	private String xcsbbt;
	private String ewmurl;
	private String yxbj;
	private String bz;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgWySbxc() {
	}

	/** minimal constructor */
	public TWgWySbxc(String sbxcid, String sqdm, String xcsbbt) {
		this.sbxcid = sbxcid;
		this.sqdm = sqdm;
		this.xcsbbt = xcsbbt;
	}

	/** full constructor */
	public TWgWySbxc(String sbxcid, String sqdm, String xcsbbt, String ewmurl, String yxbj, String bz, Timestamp lrsj,
			String lrry, Timestamp xgsj, String xgry) {
		this.sbxcid = sbxcid;
		this.sqdm = sqdm;
		this.xcsbbt = xcsbbt;
		this.ewmurl = ewmurl;
		this.yxbj = yxbj;
		this.bz = bz;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "sbxcid", unique = true, nullable = false, length = 32)

	public String getSbxcid() {
		return this.sbxcid;
	}

	public void setSbxcid(String sbxcid) {
		this.sbxcid = sbxcid;
	}

	@Column(name = "sqdm", nullable = false, length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "xcsbbt", nullable = false, length = 100)

	public String getXcsbbt() {
		return this.xcsbbt;
	}

	public void setXcsbbt(String xcsbbt) {
		this.xcsbbt = xcsbbt;
	}

	@Column(name = "ewmurl", length = 200)

	public String getEwmurl() {
		return this.ewmurl;
	}

	public void setEwmurl(String ewmurl) {
		this.ewmurl = ewmurl;
	}

	@Column(name = "yxbj", length = 1)

	public String getYxbj() {
		return this.yxbj;
	}

	public void setYxbj(String yxbj) {
		this.yxbj = yxbj;
	}

	@Column(name = "bz", length = 500)

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