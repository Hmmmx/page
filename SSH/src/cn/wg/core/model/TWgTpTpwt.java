package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgTpTpwt entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_tp_tpwt")

public class TWgTpTpwt extends BasePersistentObject {

	// Fields

	private String tpwtid;
	private String tprwid;
	private String wt;
	private String dxbj;
	private Integer plxh;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgTpTpwt() {
	}

	/** minimal constructor */
	public TWgTpTpwt(String tpwtid, String tprwid, String wt, String dxbj, Integer plxh) {
		this.tpwtid = tpwtid;
		this.tprwid = tprwid;
		this.wt = wt;
		this.dxbj = dxbj;
		this.plxh = plxh;
	}

	/** full constructor */
	public TWgTpTpwt(String tpwtid, String tprwid, String wt, String dxbj, Integer plxh, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry) {
		this.tpwtid = tpwtid;
		this.tprwid = tprwid;
		this.wt = wt;
		this.dxbj = dxbj;
		this.plxh = plxh;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "tpwtid", unique = true, nullable = false, length = 32)

	public String getTpwtid() {
		return this.tpwtid;
	}

	public void setTpwtid(String tpwtid) {
		this.tpwtid = tpwtid;
	}

	@Column(name = "tprwid", nullable = false, length = 32)

	public String getTprwid() {
		return this.tprwid;
	}

	public void setTprwid(String tprwid) {
		this.tprwid = tprwid;
	}

	@Column(name = "wt", nullable = false, length = 100)

	public String getWt() {
		return this.wt;
	}

	public void setWt(String wt) {
		this.wt = wt;
	}

	@Column(name = "dxbj", nullable = false, length = 1)

	public String getDxbj() {
		return this.dxbj;
	}

	public void setDxbj(String dxbj) {
		this.dxbj = dxbj;
	}

	@Column(name = "plxh", nullable = false)

	public Integer getPlxh() {
		return this.plxh;
	}

	public void setPlxh(Integer plxh) {
		this.plxh = plxh;
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