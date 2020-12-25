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
 * TWgYkDkjl entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_yk_dkjl")

public class TWgYkDkjl extends BasePersistentObject{

	// Fields

	private String dkjlid;
	private String sqdm;
	private String dkfadm;
	private String sfxmdmstr;
	private Date sprq;
	private String spwjm;
	private String sprdm;
	private Date hprq;
	private Date ykkkrq;
	private String hpwjm;
	private String hprdm;
	private java.math.BigDecimal dkzje;
	private java.math.BigDecimal dkcgzje;
	private String dzzt;
	private String dzjg;
	private String xhzt;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgYkDkjl() {
	}

	/** minimal constructor */
	public TWgYkDkjl(String dkjlid) {
		this.dkjlid = dkjlid;
	}

	/** full constructor */
	public TWgYkDkjl(String dkjlid, String sqdm, String dkfadm, String sfxmdmstr, Date sprq, String spwjm, String sprdm,
			Date hprq, Date ykkkrq, String hpwjm, String hprdm, java.math.BigDecimal dkzje, java.math.BigDecimal dkcgzje, String dzzt, String dzjg,
			String xhzt, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.dkjlid = dkjlid;
		this.sqdm = sqdm;
		this.dkfadm = dkfadm;
		this.sfxmdmstr = sfxmdmstr;
		this.sprq = sprq;
		this.spwjm = spwjm;
		this.sprdm = sprdm;
		this.hprq = hprq;
		this.ykkkrq = ykkkrq;
		this.hpwjm = hpwjm;
		this.hprdm = hprdm;
		this.dkzje = dkzje;
		this.dkcgzje = dkcgzje;
		this.dzzt = dzzt;
		this.dzjg = dzjg;
		this.xhzt = xhzt;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "dkjlid", unique = true, nullable = false, length = 32)

	public String getDkjlid() {
		return this.dkjlid;
	}

	public void setDkjlid(String dkjlid) {
		this.dkjlid = dkjlid;
	}

	@Column(name = "sqdm", length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "dkfadm", length = 32)

	public String getDkfadm() {
		return this.dkfadm;
	}

	public void setDkfadm(String dkfadm) {
		this.dkfadm = dkfadm;
	}

	@Column(name = "sfxmdmstr", length = 500)

	public String getSfxmdmstr() {
		return this.sfxmdmstr;
	}

	public void setSfxmdmstr(String sfxmdmstr) {
		this.sfxmdmstr = sfxmdmstr;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "sprq", length = 10)

	public Date getSprq() {
		return this.sprq;
	}

	public void setSprq(Date sprq) {
		this.sprq = sprq;
	}

	@Column(name = "spwjm", length = 100)

	public String getSpwjm() {
		return this.spwjm;
	}

	public void setSpwjm(String spwjm) {
		this.spwjm = spwjm;
	}

	@Column(name = "sprdm", length = 32)

	public String getSprdm() {
		return this.sprdm;
	}

	public void setSprdm(String sprdm) {
		this.sprdm = sprdm;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "hprq", length = 10)

	public Date getHprq() {
		return this.hprq;
	}

	public void setHprq(Date hprq) {
		this.hprq = hprq;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "ykkkrq", length = 10)

	public Date getYkkkrq() {
		return this.ykkkrq;
	}

	public void setYkkkrq(Date ykkkrq) {
		this.ykkkrq = ykkkrq;
	}

	@Column(name = "hpwjm", length = 100)

	public String getHpwjm() {
		return this.hpwjm;
	}

	public void setHpwjm(String hpwjm) {
		this.hpwjm = hpwjm;
	}

	@Column(name = "hprdm", length = 32)

	public String getHprdm() {
		return this.hprdm;
	}

	public void setHprdm(String hprdm) {
		this.hprdm = hprdm;
	}

	@Column(name = "dkzje", precision = 12)

	public java.math.BigDecimal getDkzje() {
		return this.dkzje;
	}

	public void setDkzje(java.math.BigDecimal dkzje) {
		this.dkzje = dkzje;
	}

	@Column(name = "dkcgzje", precision = 12)

	public java.math.BigDecimal getDkcgzje() {
		return this.dkcgzje;
	}

	public void setDkcgzje(java.math.BigDecimal dkcgzje) {
		this.dkcgzje = dkcgzje;
	}

	@Column(name = "dzzt", length = 1)

	public String getDzzt() {
		return this.dzzt;
	}

	public void setDzzt(String dzzt) {
		this.dzzt = dzzt;
	}

	@Column(name = "dzjg", length = 250)

	public String getDzjg() {
		return this.dzjg;
	}

	public void setDzjg(String dzjg) {
		this.dzjg = dzjg;
	}

	@Column(name = "xhzt", length = 1)

	public String getXhzt() {
		return this.xhzt;
	}

	public void setXhzt(String xhzt) {
		this.xhzt = xhzt;
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