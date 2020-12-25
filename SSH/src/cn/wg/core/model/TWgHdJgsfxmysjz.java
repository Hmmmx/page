package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgHdJgsfxmysjz entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_hd_jgsfxmysjz")

public class TWgHdJgsfxmysjz extends BasePersistentObject{

	// Fields

	private String sfxmysjzid;
	private String sqdm;
	private String zhysksfxmdm;
	private String jzsfxmdm;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgHdJgsfxmysjz() {
	}

	/** minimal constructor */
	public TWgHdJgsfxmysjz(String sfxmysjzid, String sqdm, String jzsfxmdm) {
		this.sfxmysjzid = sfxmysjzid;
		this.sqdm = sqdm;
		this.jzsfxmdm = jzsfxmdm;
	}

	/** full constructor */
	public TWgHdJgsfxmysjz(String sfxmysjzid, String sqdm, String zhysksfxmdm, String jzsfxmdm, String yxbj,
			Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.sfxmysjzid = sfxmysjzid;
		this.sqdm = sqdm;
		this.zhysksfxmdm = zhysksfxmdm;
		this.jzsfxmdm = jzsfxmdm;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "sfxmysjzid", unique = true, nullable = false, length = 32)

	public String getSfxmysjzid() {
		return this.sfxmysjzid;
	}

	public void setSfxmysjzid(String sfxmysjzid) {
		this.sfxmysjzid = sfxmysjzid;
	}

	@Column(name = "sqdm", nullable = false, length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "zhysksfxmdm", length = 32)

	public String getZhysksfxmdm() {
		return this.zhysksfxmdm;
	}

	public void setZhysksfxmdm(String zhysksfxmdm) {
		this.zhysksfxmdm = zhysksfxmdm;
	}

	@Column(name = "jzsfxmdm", nullable = false, length = 32)

	public String getJzsfxmdm() {
		return this.jzsfxmdm;
	}

	public void setJzsfxmdm(String jzsfxmdm) {
		this.jzsfxmdm = jzsfxmdm;
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