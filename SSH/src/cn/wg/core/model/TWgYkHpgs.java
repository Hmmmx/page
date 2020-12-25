package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgYkHpgs entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_yk_hpgs")

public class TWgYkHpgs extends BasePersistentObject{

	// Fields

	private String hpgsid;
	private String ykfaid;
	private String wjlxdm;
	private String wjm;
	private String fgfhdm;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgYkHpgs() {
	}

	/** minimal constructor */
	public TWgYkHpgs(String hpgsid) {
		this.hpgsid = hpgsid;
	}

	/** full constructor */
	public TWgYkHpgs(String hpgsid, String ykfaid, String wjlxdm, String wjm, String fgfhdm, Timestamp lrsj,
			String lrry, Timestamp xgsj, String xgry) {
		this.hpgsid = hpgsid;
		this.ykfaid = ykfaid;
		this.wjlxdm = wjlxdm;
		this.wjm = wjm;
		this.fgfhdm = fgfhdm;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "hpgsid", unique = true, nullable = false, length = 32)

	public String getHpgsid() {
		return this.hpgsid;
	}

	public void setHpgsid(String hpgsid) {
		this.hpgsid = hpgsid;
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

	@Column(name = "fgfhdm", length = 10)

	public String getFgfhdm() {
		return this.fgfhdm;
	}

	public void setFgfhdm(String fgfhdm) {
		this.fgfhdm = fgfhdm;
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