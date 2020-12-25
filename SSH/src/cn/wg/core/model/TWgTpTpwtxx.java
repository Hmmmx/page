package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgTpTpwtxx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_tp_tpwtxx")

public class TWgTpTpwtxx extends BasePersistentObject{

	// Fields

	private String tpwtxxid;
	private String tpwtid;
	private String xx;
	private Integer plxh;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgTpTpwtxx() {
	}

	/** minimal constructor */
	public TWgTpTpwtxx(String tpwtxxid, String tpwtid, String xx, Integer plxh) {
		this.tpwtxxid = tpwtxxid;
		this.tpwtid = tpwtid;
		this.xx = xx;
		this.plxh = plxh;
	}

	/** full constructor */
	public TWgTpTpwtxx(String tpwtxxid, String tpwtid, String xx, Integer plxh, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry) {
		this.tpwtxxid = tpwtxxid;
		this.tpwtid = tpwtid;
		this.xx = xx;
		this.plxh = plxh;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "tpwtxxid", unique = true, nullable = false, length = 32)

	public String getTpwtxxid() {
		return this.tpwtxxid;
	}

	public void setTpwtxxid(String tpwtxxid) {
		this.tpwtxxid = tpwtxxid;
	}

	@Column(name = "tpwtid", nullable = false, length = 32)

	public String getTpwtid() {
		return this.tpwtid;
	}

	public void setTpwtid(String tpwtid) {
		this.tpwtid = tpwtid;
	}

	@Column(name = "xx", nullable = false, length = 100)

	public String getXx() {
		return this.xx;
	}

	public void setXx(String xx) {
		this.xx = xx;
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