package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgYkSpgs entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_yk_spgs")

public class TWgYkSpgs extends BasePersistentObject{

	// Fields

	private String spgsid;
	private String ykfaid;
	private String wjlxdm;
	private String wjm;
	private String fgfhdm;
	private java.math.BigDecimal sxf;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgYkSpgs() {
	}

	/** minimal constructor */
	public TWgYkSpgs(String spgsid) {
		this.spgsid = spgsid;
	}

	/** full constructor */
	public TWgYkSpgs(String spgsid, String ykfaid, String wjlxdm, String wjm, String fgfhdm, java.math.BigDecimal sxf, Timestamp lrsj,
			String lrry, Timestamp xgsj, String xgry) {
		this.spgsid = spgsid;
		this.ykfaid = ykfaid;
		this.wjlxdm = wjlxdm;
		this.wjm = wjm;
		this.fgfhdm = fgfhdm;
		this.sxf = sxf;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "spgsid", unique = true, nullable = false, length = 32)

	public String getSpgsid() {
		return this.spgsid;
	}

	public void setSpgsid(String spgsid) {
		this.spgsid = spgsid;
	}

	@Column(name = "ykfaid", length = 32)

	public String getYkfaid() {
		return this.ykfaid;
	}

	public void setYkfaid(String ykfaid) {
		this.ykfaid = ykfaid;
	}

	@Column(name = "wjlxdm", length = 10)

	public String getWjlxdm() {
		return this.wjlxdm;
	}

	public void setWjlxdm(String wjlxdm) {
		this.wjlxdm = wjlxdm;
	}

	@Column(name = "wjm", length = 50)

	public String getWjm() {
		return this.wjm;
	}

	public void setWjm(String wjm) {
		this.wjm = wjm;
	}

	@Column(name = "fgfhdm", length = 32)

	public String getFgfhdm() {
		return this.fgfhdm;
	}

	public void setFgfhdm(String fgfhdm) {
		this.fgfhdm = fgfhdm;
	}

	@Column(name = "sxf", precision = 18)

	public java.math.BigDecimal getSxf() {
		return this.sxf;
	}

	public void setSxf(java.math.BigDecimal sxf) {
		this.sxf = sxf;
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