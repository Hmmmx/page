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
 * TWgHdSfbzkh entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_hd_sfbzkh")

public class TWgHdSfbzkh extends BasePersistentObject{

	// Fields

	private String hdid;
	private String sfbzid;
	private String fcid;
	private String khid;
	private Date yxrqq;
	private Date yxrqz;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgHdSfbzkh() {
	}

	/** minimal constructor */
	public TWgHdSfbzkh(String hdid, String sfbzid, String khid) {
		this.hdid = hdid;
		this.sfbzid = sfbzid;
		this.khid = khid;
	}

	/** full constructor */
	public TWgHdSfbzkh(String hdid, String sfbzid, String fcid, String khid, Date yxrqq, Date yxrqz, String yxbj,
			Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.hdid = hdid;
		this.sfbzid = sfbzid;
		this.fcid = fcid;
		this.khid = khid;
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

	@Column(name = "hdid", unique = true, nullable = false, length = 32)

	public String getHdid() {
		return this.hdid;
	}

	public void setHdid(String hdid) {
		this.hdid = hdid;
	}

	@Column(name = "sfbzid", nullable = false, length = 32)

	public String getSfbzid() {
		return this.sfbzid;
	}

	public void setSfbzid(String sfbzid) {
		this.sfbzid = sfbzid;
	}

	@Column(name = "fcid", length = 32)

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