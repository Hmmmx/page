package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgWySbxcmx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_wy_sbxcmx", catalog = "sqdb")

public class TWgWySbxcmx extends BasePersistentObject {

	// Fields

	private String sbxcmxid;
	private String sbxcid;
	private String hyid;
	private String xcsm;
	private Timestamp xcsj;
	private String xctpdz1;
	private String xctpdz2;
	private String xctpdz3;
	private String xctpdz4;
	private String ztbj;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgWySbxcmx() {
	}

	/** minimal constructor */
	public TWgWySbxcmx(String sbxcmxid, String sbxcid, String hyid) {
		this.sbxcmxid = sbxcmxid;
		this.sbxcid = sbxcid;
		this.hyid = hyid;
	}

	/** full constructor */
	public TWgWySbxcmx(String sbxcmxid, String sbxcid, String hyid, String xcsm, Timestamp xcsj, String xctpdz1,
			String xctpdz2, String xctpdz3, String xctpdz4, String ztbj, String yxbj, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry) {
		this.sbxcmxid = sbxcmxid;
		this.sbxcid = sbxcid;
		this.hyid = hyid;
		this.xcsm = xcsm;
		this.xcsj = xcsj;
		this.xctpdz1 = xctpdz1;
		this.xctpdz2 = xctpdz2;
		this.xctpdz3 = xctpdz3;
		this.xctpdz4 = xctpdz4;
		this.ztbj = ztbj;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "sbxcmxid", unique = true, nullable = false, length = 32)

	public String getSbxcmxid() {
		return this.sbxcmxid;
	}

	public void setSbxcmxid(String sbxcmxid) {
		this.sbxcmxid = sbxcmxid;
	}

	@Column(name = "sbxcid", nullable = false, length = 32)

	public String getSbxcid() {
		return this.sbxcid;
	}

	public void setSbxcid(String sbxcid) {
		this.sbxcid = sbxcid;
	}

	@Column(name = "hyid", nullable = false, length = 100)

	public String getHyid() {
		return this.hyid;
	}

	public void setHyid(String hyid) {
		this.hyid = hyid;
	}

	@Column(name = "xcsm", length = 500)

	public String getXcsm() {
		return this.xcsm;
	}

	public void setXcsm(String xcsm) {
		this.xcsm = xcsm;
	}

	@Column(name = "xcsj", length = 19)

	public Timestamp getXcsj() {
		return this.xcsj;
	}

	public void setXcsj(Timestamp xcsj) {
		this.xcsj = xcsj;
	}

	@Column(name = "xctpdz1", length = 200)

	public String getXctpdz1() {
		return this.xctpdz1;
	}

	public void setXctpdz1(String xctpdz1) {
		this.xctpdz1 = xctpdz1;
	}

	@Column(name = "xctpdz2", length = 200)

	public String getXctpdz2() {
		return this.xctpdz2;
	}

	public void setXctpdz2(String xctpdz2) {
		this.xctpdz2 = xctpdz2;
	}

	@Column(name = "xctpdz3", length = 200)

	public String getXctpdz3() {
		return this.xctpdz3;
	}

	public void setXctpdz3(String xctpdz3) {
		this.xctpdz3 = xctpdz3;
	}

	@Column(name = "xctpdz4", length = 200)

	public String getXctpdz4() {
		return this.xctpdz4;
	}

	public void setXctpdz4(String xctpdz4) {
		this.xctpdz4 = xctpdz4;
	}

	@Column(name = "ztbj", length = 1)

	public String getZtbj() {
		return this.ztbj;
	}

	public void setZtbj(String ztbj) {
		this.ztbj = ztbj;
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