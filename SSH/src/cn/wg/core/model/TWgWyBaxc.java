package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgWyBaxc entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_wy_baxc", catalog = "sqdb")

public class TWgWyBaxc extends BasePersistentObject {

	// Fields

	private String baxcid;
	private String xcddbt;
	private String sqdm;
	private String ewmurl;
	private String yxbj;
	private String bz;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgWyBaxc() {
	}

	/** minimal constructor */
	public TWgWyBaxc(String baxcid, String xcddbt, String sqdm) {
		this.baxcid = baxcid;
		this.xcddbt = xcddbt;
		this.sqdm = sqdm;
	}

	/** full constructor */
	public TWgWyBaxc(String baxcid, String xcddbt, String sqdm, String ewmurl, String yxbj, String bz, Timestamp lrsj,
			String lrry, Timestamp xgsj, String xgry) {
		this.baxcid = baxcid;
		this.xcddbt = xcddbt;
		this.sqdm = sqdm;
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

	@Column(name = "baxcid", unique = true, nullable = false, length = 32)

	public String getBaxcid() {
		return this.baxcid;
	}

	public void setBaxcid(String baxcid) {
		this.baxcid = baxcid;
	}

	@Column(name = "xcddbt", nullable = false, length = 100)

	public String getXcddbt() {
		return this.xcddbt;
	}

	public void setXcddbt(String xcddbt) {
		this.xcddbt = xcddbt;
	}

	@Column(name = "sqdm", nullable = false, length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
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