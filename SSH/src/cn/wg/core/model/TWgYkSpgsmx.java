package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgYkSpgsmx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_yk_spgsmx")

public class TWgYkSpgsmx extends BasePersistentObject{

	// Fields

	private String spgsmxid;
	private String spgsid;
	private String lm;
	private String zd;
	private String zdz;
	private Short lxh;
	private String mxlx;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgYkSpgsmx() {
	}

	/** minimal constructor */
	public TWgYkSpgsmx(String spgsmxid) {
		this.spgsmxid = spgsmxid;
	}

	/** full constructor */
	public TWgYkSpgsmx(String spgsmxid, String spgsid, String lm, String zd, String zdz, Short lxh, String mxlx,
			Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.spgsmxid = spgsmxid;
		this.spgsid = spgsid;
		this.lm = lm;
		this.zd = zd;
		this.zdz = zdz;
		this.lxh = lxh;
		this.mxlx = mxlx;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "spgsmxid", unique = true, nullable = false, length = 32)

	public String getSpgsmxid() {
		return this.spgsmxid;
	}

	public void setSpgsmxid(String spgsmxid) {
		this.spgsmxid = spgsmxid;
	}

	@Column(name = "spgsid", length = 32)

	public String getSpgsid() {
		return this.spgsid;
	}

	public void setSpgsid(String spgsid) {
		this.spgsid = spgsid;
	}

	@Column(name = "lm", length = 50)

	public String getLm() {
		return this.lm;
	}

	public void setLm(String lm) {
		this.lm = lm;
	}

	@Column(name = "zd", length = 10)

	public String getZd() {
		return this.zd;
	}

	public void setZd(String zd) {
		this.zd = zd;
	}

	@Column(name = "zdz", length = 50)

	public String getZdz() {
		return this.zdz;
	}

	public void setZdz(String zdz) {
		this.zdz = zdz;
	}

	@Column(name = "lxh")

	public Short getLxh() {
		return this.lxh;
	}

	public void setLxh(Short lxh) {
		this.lxh = lxh;
	}

	@Column(name = "mxlx")

	public String getMxlx() {
		return this.mxlx;
	}

	public void setMxlx(String mxlx) {
		this.mxlx = mxlx;
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