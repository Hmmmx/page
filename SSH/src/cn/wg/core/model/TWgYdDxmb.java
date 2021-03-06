package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgYdDxmb entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_yd_dxmb")

public class TWgYdDxmb extends BasePersistentObject{

	// Fields

	private String dxmbid;
	private String mbdm;
	private String mbbh;
	private String bt;
	private String nr;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgYdDxmb() {
	}

	/** minimal constructor */
	public TWgYdDxmb(String dxmbid) {
		this.dxmbid = dxmbid;
	}

	/** full constructor */
	public TWgYdDxmb(String dxmbid, String mbdm, String mbbh, String bt, String nr, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry) {
		this.dxmbid = dxmbid;
		this.mbdm = mbdm;
		this.mbbh = mbbh;
		this.bt = bt;
		this.nr = nr;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "dxmbid", unique = true, nullable = false, length = 32)

	public String getDxmbid() {
		return this.dxmbid;
	}

	public void setDxmbid(String dxmbid) {
		this.dxmbid = dxmbid;
	}

	@Column(name = "mbdm", length = 2)

	public String getMbdm() {
		return this.mbdm;
	}

	public void setMbdm(String mbdm) {
		this.mbdm = mbdm;
	}

	@Column(name = "mbbh", length = 20)

	public String getMbbh() {
		return this.mbbh;
	}

	public void setMbbh(String mbbh) {
		this.mbbh = mbbh;
	}

	@Column(name = "bt", length = 100)

	public String getBt() {
		return this.bt;
	}

	public void setBt(String bt) {
		this.bt = bt;
	}

	@Column(name = "nr", length = 500)

	public String getNr() {
		return this.nr;
	}

	public void setNr(String nr) {
		this.nr = nr;
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