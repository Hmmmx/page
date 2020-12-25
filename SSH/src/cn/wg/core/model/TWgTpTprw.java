package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgTpTprw entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_tp_tprw")

public class TWgTpTprw extends BasePersistentObject {

	// Fields

	private String tprwid;
	private String sqdm;
	private String tpmc;
	private String fwlx;
	private String fwid;
	private String fwmc;
	private String rwlx;
	private String rwsm;
	private Timestamp ksrq;
	private Timestamp jsrq;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgTpTprw() {
	}

	/** minimal constructor */
	public TWgTpTprw(String tprwid, String sqdm, String tpmc) {
		this.tprwid = tprwid;
		this.sqdm = sqdm;
		this.tpmc = tpmc;
	}

	/** full constructor */
	public TWgTpTprw(String tprwid, String sqdm, String tpmc, String fwlx, String fwid, String fwmc, String rwlx,
			String rwsm, Timestamp ksrq, Timestamp jsrq, String yxbj, Timestamp lrsj, String lrry, Timestamp xgsj,
			String xgry) {
		this.tprwid = tprwid;
		this.sqdm = sqdm;
		this.tpmc = tpmc;
		this.fwlx = fwlx;
		this.fwid = fwid;
		this.fwmc = fwmc;
		this.rwlx = rwlx;
		this.rwsm = rwsm;
		this.ksrq = ksrq;
		this.jsrq = jsrq;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "tprwid", unique = true, nullable = false, length = 32)

	public String getTprwid() {
		return this.tprwid;
	}

	public void setTprwid(String tprwid) {
		this.tprwid = tprwid;
	}

	@Column(name = "sqdm", nullable = false, length = 50)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "tpmc", nullable = false, length = 100)

	public String getTpmc() {
		return this.tpmc;
	}

	public void setTpmc(String tpmc) {
		this.tpmc = tpmc;
	}

	@Column(name = "fwlx", length = 1)

	public String getFwlx() {
		return this.fwlx;
	}

	public void setFwlx(String fwlx) {
		this.fwlx = fwlx;
	}

	@Column(name = "fwid", length = 32)

	public String getFwid() {
		return this.fwid;
	}

	public void setFwid(String fwid) {
		this.fwid = fwid;
	}

	@Column(name = "fwmc", length = 100)

	public String getFwmc() {
		return this.fwmc;
	}

	public void setFwmc(String fwmc) {
		this.fwmc = fwmc;
	}

	@Column(name = "rwlx", length = 1)

	public String getRwlx() {
		return this.rwlx;
	}

	public void setRwlx(String rwlx) {
		this.rwlx = rwlx;
	}

	@Column(name = "rwsm", length = 500)

	public String getRwsm() {
		return this.rwsm;
	}

	public void setRwsm(String rwsm) {
		this.rwsm = rwsm;
	}

	@Column(name = "ksrq", length = 19)

	public Timestamp getKsrq() {
		return this.ksrq;
	}

	public void setKsrq(Timestamp ksrq) {
		this.ksrq = ksrq;
	}

	@Column(name = "jsrq", length = 19)

	public Timestamp getJsrq() {
		return this.jsrq;
	}

	public void setJsrq(Timestamp jsrq) {
		this.jsrq = jsrq;
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