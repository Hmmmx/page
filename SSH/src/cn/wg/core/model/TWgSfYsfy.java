package cn.wg.core.model;

import java.math.BigDecimal;
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
 * TWgSfYsfy entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_sf_ysfy", catalog = "sqdb")

public class TWgSfYsfy extends BasePersistentObject {

	// Fields

	private String ysfyid;
	private String ysfypzid;
	private String sqdm;
	private String fcid;
	private String khid;
	private String sfxmdm;
	private String sfbzid;
	private String zyid;
	private BigDecimal dj;
	private BigDecimal bl;
	private BigDecimal sqds;
	private BigDecimal bqds;
	private BigDecimal sl;
	private BigDecimal yfyje;
	private BigDecimal zk;
	private BigDecimal fyje;
	private BigDecimal ysfyje;
	private Date jfzqq;
	private Date jfzqz;
	private Date ysrq;
	private String sfzdy;
	private String fyscid;
	private String fyfldm;
	private String ztbj;
	private String sfsm;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgSfYsfy() {
	}

	/** minimal constructor */
	public TWgSfYsfy(String ysfyid, String sqdm) {
		this.ysfyid = ysfyid;
		this.sqdm = sqdm;
	}

	/** full constructor */
	public TWgSfYsfy(String ysfyid, String ysfypzid, String sqdm, String fcid, String khid, String sfxmdm,
			String sfbzid, String zyid, BigDecimal dj, BigDecimal bl, BigDecimal sqds, BigDecimal bqds, BigDecimal sl, BigDecimal yfyje,
			BigDecimal zk, BigDecimal fyje, BigDecimal ysfyje, Date jfzqq, Date jfzqz, Date ysrq, String sfzdy, String fyscid,
			String fyfldm, String ztbj, String sfsm, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.ysfyid = ysfyid;
		this.ysfypzid = ysfypzid;
		this.sqdm = sqdm;
		this.fcid = fcid;
		this.khid = khid;
		this.sfxmdm = sfxmdm;
		this.sfbzid = sfbzid;
		this.zyid = zyid;
		this.dj = dj;
		this.bl = bl;
		this.sqds = sqds;
		this.bqds = bqds;
		this.sl = sl;
		this.yfyje = yfyje;
		this.zk = zk;
		this.fyje = fyje;
		this.ysfyje = ysfyje;
		this.jfzqq = jfzqq;
		this.jfzqz = jfzqz;
		this.ysrq = ysrq;
		this.sfzdy = sfzdy;
		this.fyscid = fyscid;
		this.fyfldm = fyfldm;
		this.ztbj = ztbj;
		this.sfsm = sfsm;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "ysfyid", unique = true, nullable = false, length = 32)

	public String getYsfyid() {
		return this.ysfyid;
	}

	public void setYsfyid(String ysfyid) {
		this.ysfyid = ysfyid;
	}

	@Column(name = "ysfypzid", length = 32)

	public String getYsfypzid() {
		return this.ysfypzid;
	}

	public void setYsfypzid(String ysfypzid) {
		this.ysfypzid = ysfypzid;
	}

	@Column(name = "sqdm", nullable = false, length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "fcid", length = 32)

	public String getFcid() {
		return this.fcid;
	}

	public void setFcid(String fcid) {
		this.fcid = fcid;
	}

	@Column(name = "khid", length = 32)

	public String getKhid() {
		return this.khid;
	}

	public void setKhid(String khid) {
		this.khid = khid;
	}

	@Column(name = "sfxmdm", length = 32)

	public String getSfxmdm() {
		return this.sfxmdm;
	}

	public void setSfxmdm(String sfxmdm) {
		this.sfxmdm = sfxmdm;
	}

	@Column(name = "sfbzid", length = 32)

	public String getSfbzid() {
		return this.sfbzid;
	}

	public void setSfbzid(String sfbzid) {
		this.sfbzid = sfbzid;
	}

	@Column(name = "zyid", length = 32)

	public String getZyid() {
		return this.zyid;
	}

	public void setZyid(String zyid) {
		this.zyid = zyid;
	}

	@Column(name = "dj", precision = 12, scale = 4)

	public BigDecimal getDj() {
		return this.dj;
	}

	public void setDj(BigDecimal dj) {
		this.dj = dj;
	}

	@Column(name = "bl", precision = 12)

	public BigDecimal getBl() {
		return this.bl;
	}

	public void setBl(BigDecimal bl) {
		this.bl = bl;
	}

	@Column(name = "sqds", precision = 12)

	public BigDecimal getSqds() {
		return this.sqds;
	}

	public void setSqds(BigDecimal sqds) {
		this.sqds = sqds;
	}

	@Column(name = "bqds", precision = 12)

	public BigDecimal getBqds() {
		return this.bqds;
	}

	public void setBqds(BigDecimal bqds) {
		this.bqds = bqds;
	}

	@Column(name = "sl", precision = 12, scale = 4)

	public BigDecimal getSl() {
		return this.sl;
	}

	public void setSl(BigDecimal sl) {
		this.sl = sl;
	}

	@Column(name = "yfyje", precision = 12)

	public BigDecimal getYfyje() {
		return this.yfyje;
	}

	public void setYfyje(BigDecimal yfyje) {
		this.yfyje = yfyje;
	}

	@Column(name = "zk", precision = 12)

	public BigDecimal getZk() {
		return this.zk;
	}

	public void setZk(BigDecimal zk) {
		this.zk = zk;
	}

	@Column(name = "fyje", precision = 12)

	public BigDecimal getFyje() {
		return this.fyje;
	}

	public void setFyje(BigDecimal fyje) {
		this.fyje = fyje;
	}

	@Column(name = "ysfyje", precision = 12)

	public BigDecimal getYsfyje() {
		return this.ysfyje;
	}

	public void setYsfyje(BigDecimal ysfyje) {
		this.ysfyje = ysfyje;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "jfzqq", length = 10)

	public Date getJfzqq() {
		return this.jfzqq;
	}

	public void setJfzqq(Date jfzqq) {
		this.jfzqq = jfzqq;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "jfzqz", length = 10)

	public Date getJfzqz() {
		return this.jfzqz;
	}

	public void setJfzqz(Date jfzqz) {
		this.jfzqz = jfzqz;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "ysrq", length = 10)

	public Date getYsrq() {
		return this.ysrq;
	}

	public void setYsrq(Date ysrq) {
		this.ysrq = ysrq;
	}

	@Column(name = "sfzdy", length = 10)

	public String getSfzdy() {
		return this.sfzdy;
	}

	public void setSfzdy(String sfzdy) {
		this.sfzdy = sfzdy;
	}

	@Column(name = "fyscid", length = 32)

	public String getFyscid() {
		return this.fyscid;
	}

	public void setFyscid(String fyscid) {
		this.fyscid = fyscid;
	}

	@Column(name = "fyfldm", length = 1)

	public String getFyfldm() {
		return this.fyfldm;
	}

	public void setFyfldm(String fyfldm) {
		this.fyfldm = fyfldm;
	}

	@Column(name = "ztbj", length = 1)

	public String getZtbj() {
		return this.ztbj;
	}

	public void setZtbj(String ztbj) {
		this.ztbj = ztbj;
	}

	@Column(name = "sfsm", length = 200)

	public String getSfsm() {
		return this.sfsm;
	}

	public void setSfsm(String sfsm) {
		this.sfsm = sfsm;
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