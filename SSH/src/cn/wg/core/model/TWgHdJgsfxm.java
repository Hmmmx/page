package cn.wg.core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgHdJgsfxm entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_hd_jgsfxm", catalog = "sqdb")

public class TWgHdJgsfxm extends BasePersistentObject {

	// Fields

	private String jgsfxmid;
	private String sqdm;
	private String sfxmdm;
	private String sfxmmc;
	private String fylxdm;
	private String djconfig;
	private String yxbj;

	// Constructors

	/** default constructor */
	public TWgHdJgsfxm() {
	}

	/** minimal constructor */
	public TWgHdJgsfxm(String jgsfxmid, String sqdm, String sfxmdm, String sfxmmc, String fylxdm) {
		this.jgsfxmid = jgsfxmid;
		this.sqdm = sqdm;
		this.sfxmdm = sfxmdm;
		this.sfxmmc = sfxmmc;
		this.fylxdm = fylxdm;
	}

	/** full constructor */
	public TWgHdJgsfxm(String jgsfxmid, String sqdm, String sfxmdm, String sfxmmc, String fylxdm, String djconfig,
			String yxbj) {
		this.jgsfxmid = jgsfxmid;
		this.sqdm = sqdm;
		this.sfxmdm = sfxmdm;
		this.sfxmmc = sfxmmc;
		this.fylxdm = fylxdm;
		this.djconfig = djconfig;
		this.yxbj = yxbj;
	}

	// Property accessors
	@Id

	@Column(name = "jgsfxmid", unique = true, nullable = false, length = 32)

	public String getJgsfxmid() {
		return this.jgsfxmid;
	}

	public void setJgsfxmid(String jgsfxmid) {
		this.jgsfxmid = jgsfxmid;
	}

	@Column(name = "sqdm", nullable = false, length = 50)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "sfxmdm", nullable = false, length = 50)

	public String getSfxmdm() {
		return this.sfxmdm;
	}

	public void setSfxmdm(String sfxmdm) {
		this.sfxmdm = sfxmdm;
	}

	@Column(name = "sfxmmc", nullable = false, length = 50)

	public String getSfxmmc() {
		return this.sfxmmc;
	}

	public void setSfxmmc(String sfxmmc) {
		this.sfxmmc = sfxmmc;
	}

	@Column(name = "fylxdm", nullable = false, length = 50)

	public String getFylxdm() {
		return this.fylxdm;
	}

	public void setFylxdm(String fylxdm) {
		this.fylxdm = fylxdm;
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