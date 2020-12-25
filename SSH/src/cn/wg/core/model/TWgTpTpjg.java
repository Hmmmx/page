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
 * TWgTpTpjg entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_tp_tpjg")

public class TWgTpTpjg extends BasePersistentObject {

	// Fields

	private String tpjgid;
	private String tprwid;
	private String tpwtid;
	private String tpwtxxid;
	private Date tprq;
	private String hyid;
	private String fcid;
	private String khid;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgTpTpjg() {
	}

	/** minimal constructor */
	public TWgTpTpjg(String tpjgid, String tprwid, String tpwtid, String tpwtxxid, Date tprq, String hyid, String fcid,
			String khid, String yxbj) {
		this.tpjgid = tpjgid;
		this.tprwid = tprwid;
		this.tpwtid = tpwtid;
		this.tpwtxxid = tpwtxxid;
		this.tprq = tprq;
		this.hyid = hyid;
		this.fcid = fcid;
		this.khid = khid;
		this.yxbj = yxbj;
	}

	/** full constructor */
	public TWgTpTpjg(String tpjgid, String tprwid, String tpwtid, String tpwtxxid, Date tprq, String hyid, String fcid,
			String khid, String yxbj, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.tpjgid = tpjgid;
		this.tprwid = tprwid;
		this.tpwtid = tpwtid;
		this.tpwtxxid = tpwtxxid;
		this.tprq = tprq;
		this.hyid = hyid;
		this.fcid = fcid;
		this.khid = khid;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "tpjgid", unique = true, nullable = false, length = 32)

	public String getTpjgid() {
		return this.tpjgid;
	}

	public void setTpjgid(String tpjgid) {
		this.tpjgid = tpjgid;
	}

	@Column(name = "tprwid", nullable = false, length = 32)

	public String getTprwid() {
		return this.tprwid;
	}

	public void setTprwid(String tprwid) {
		this.tprwid = tprwid;
	}

	@Column(name = "tpwtid", nullable = false, length = 32)

	public String getTpwtid() {
		return this.tpwtid;
	}

	public void setTpwtid(String tpwtid) {
		this.tpwtid = tpwtid;
	}

	@Column(name = "tpwtxxid", nullable = false, length = 32)

	public String getTpwtxxid() {
		return this.tpwtxxid;
	}

	public void setTpwtxxid(String tpwtxxid) {
		this.tpwtxxid = tpwtxxid;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "tprq", nullable = false, length = 10)

	public Date getTprq() {
		return this.tprq;
	}

	public void setTprq(Date tprq) {
		this.tprq = tprq;
	}

	@Column(name = "hyid", nullable = false, length = 32)

	public String getHyid() {
		return this.hyid;
	}

	public void setHyid(String hyid) {
		this.hyid = hyid;
	}

	@Column(name = "fcid", nullable = false, length = 32)

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

	@Column(name = "yxbj", nullable = false, length = 1)

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