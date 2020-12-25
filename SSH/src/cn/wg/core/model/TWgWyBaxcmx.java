package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgWyBaxcmx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_wy_baxcmx", catalog = "sqdb")

public class TWgWyBaxcmx extends BasePersistentObject {

	// Fields

	private String baxcmxid;
	private String baxcid;
	private String hyid;
	private Timestamp xcsj;
	private String xcsm;
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
	public TWgWyBaxcmx() {
	}

	/** minimal constructor */
	public TWgWyBaxcmx(String baxcmxid, String baxcid, String hyid) {
		this.baxcmxid = baxcmxid;
		this.baxcid = baxcid;
		this.hyid = hyid;
	}

	/** full constructor */
	public TWgWyBaxcmx(String baxcmxid, String baxcid, String hyid, Timestamp xcsj, String xcsm, String xctpdz1,
			String xctpdz2, String xctpdz3, String xctpdz4, String ztbj, String yxbj, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry) {
		this.baxcmxid = baxcmxid;
		this.baxcid = baxcid;
		this.hyid = hyid;
		this.xcsj = xcsj;
		this.xcsm = xcsm;
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

	@Column(name = "baxcmxid", unique = true, nullable = false, length = 32)

	public String getBaxcmxid() {
		return this.baxcmxid;
	}

	public void setBaxcmxid(String baxcmxid) {
		this.baxcmxid = baxcmxid;
	}

	@Column(name = "baxcid", nullable = false, length = 32)

	public String getBaxcid() {
		return this.baxcid;
	}

	public void setBaxcid(String baxcid) {
		this.baxcid = baxcid;
	}

	@Column(name = "hyid", nullable = false, length = 100)

	public String getHyid() {
		return this.hyid;
	}

	public void setHyid(String hyid) {
		this.hyid = hyid;
	}

	@Column(name = "xcsj", length = 19)

	public Timestamp getXcsj() {
		return this.xcsj;
	}

	public void setXcsj(Timestamp xcsj) {
		this.xcsj = xcsj;
	}

	@Column(name = "xcsm", length = 500)

	public String getXcsm() {
		return this.xcsm;
	}

	public void setXcsm(String xcsm) {
		this.xcsm = xcsm;
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