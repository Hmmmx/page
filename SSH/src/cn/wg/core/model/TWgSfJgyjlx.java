package cn.wg.core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgSfJgyjlx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_sf_jgyjlx", catalog = "sqdb")

public class TWgSfJgyjlx extends BasePersistentObject {

	// Fields

	private String jgyjlxid;
	private String sqdm;
	private String yjlxdm;
	private String yjlxmc;
	private String djconfig;
	private String yxbj;

	// Constructors

	/** default constructor */
	public TWgSfJgyjlx() {
	}

	/** minimal constructor */
	public TWgSfJgyjlx(String jgyjlxid) {
		this.jgyjlxid = jgyjlxid;
	}

	/** full constructor */
	public TWgSfJgyjlx(String jgyjlxid, String sqdm, String yjlxdm, String yjlxmc, String djconfig, String yxbj) {
		this.jgyjlxid = jgyjlxid;
		this.sqdm = sqdm;
		this.yjlxdm = yjlxdm;
		this.yjlxmc = yjlxmc;
		this.djconfig = djconfig;
		this.yxbj = yxbj;
	}

	// Property accessors
	@Id

	@Column(name = "jgyjlxid", unique = true, nullable = false, length = 32)

	public String getJgyjlxid() {
		return this.jgyjlxid;
	}

	public void setJgyjlxid(String jgyjlxid) {
		this.jgyjlxid = jgyjlxid;
	}

	@Column(name = "sqdm", length = 50)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "yjlxdm", length = 50)

	public String getYjlxdm() {
		return this.yjlxdm;
	}

	public void setYjlxdm(String yjlxdm) {
		this.yjlxdm = yjlxdm;
	}

	@Column(name = "yjlxmc", length = 50)

	public String getYjlxmc() {
		return this.yjlxmc;
	}

	public void setYjlxmc(String yjlxmc) {
		this.yjlxmc = yjlxmc;
	}

	@Column(name = "djconfig", length = 100)

	public String getDjconfig() {
		return this.djconfig;
	}

	public void setDjconfig(String djconfig) {
		this.djconfig = djconfig;
	}

	@Column(name = "yxbj", length = 1)

	public String getYxbj() {
		return this.yxbj;
	}

	public void setYxbj(String yxbj) {
		this.yxbj = yxbj;
	}

}