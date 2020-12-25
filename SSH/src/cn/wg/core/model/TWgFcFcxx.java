package cn.wg.core.model;

import com.ctp.core.model.BasePersistentObject;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * TWgFcFcxx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_fc_fcxx")

public class TWgFcFcxx extends BasePersistentObject{

	// Fields

	private String fcid;
	private String sqdm;
	private String qyid;
	private String lyid;
	private String dyid;
	private String fchm;
	private String fcbh;
	private String fcmc;
	private Integer lcdm;
	private BigDecimal jzmj;
	private BigDecimal tnmj;
	private Date slrq;
	private String slzt;
	private Date rzrq;
	private String rzzt;
	private String zxzt;
	private Date zxrq;
	private String cszt;
	private String fczt;
	private String zlzt;
	private String czzt;
	private Integer plxh;
	private String sshxdm;
	private String cxdm;
	private String fclxdm;
	private String fcxzdm;
	private String bz;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgFcFcxx() {
	}

	/** minimal constructor */
	public TWgFcFcxx(String fcid, String sqdm, String qyid, String lyid, String fchm, Integer lcdm, BigDecimal  jzmj,
			String fczt) {
		this.fcid = fcid;
		this.sqdm = sqdm;
		this.qyid = qyid;
		this.lyid = lyid;
		this.fchm = fchm;
		this.lcdm = lcdm;
		this.jzmj = jzmj;
		this.fczt = fczt;
	}

	/** full constructor */
	public TWgFcFcxx(String fcid, String sqdm, String qyid, String lyid, String dyid, String fchm, String fcbh,
			String fcmc, Integer lcdm, BigDecimal  jzmj, BigDecimal  tnmj, Date slrq, String slzt, Date rzrq, String rzzt,
			String zxzt, Date zxrq, String cszt, String fczt, String zlzt, String czzt, Integer plxh, String sshxdm,
			String cxdm, String fclxdm, String fcxzdm, String bz, Timestamp lrsj, String lrry, Timestamp xgsj,
			String xgry) {
		this.fcid = fcid;
		this.sqdm = sqdm;
		this.qyid = qyid;
		this.lyid = lyid;
		this.dyid = dyid;
		this.fchm = fchm;
		this.fcbh = fcbh;
		this.fcmc = fcmc;
		this.lcdm = lcdm;
		this.jzmj = jzmj;
		this.tnmj = tnmj;
		this.slrq = slrq;
		this.slzt = slzt;
		this.rzrq = rzrq;
		this.rzzt = rzzt;
		this.zxzt = zxzt;
		this.zxrq = zxrq;
		this.cszt = cszt;
		this.fczt = fczt;
		this.zlzt = zlzt;
		this.czzt = czzt;
		this.plxh = plxh;
		this.sshxdm = sshxdm;
		this.cxdm = cxdm;
		this.fclxdm = fclxdm;
		this.fcxzdm = fcxzdm;
		this.bz = bz;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "fcid", unique = true, nullable = false, length = 32)

	public String getFcid() {
		return this.fcid;
	}

	public void setFcid(String fcid) {
		this.fcid = fcid;
	}

	@Column(name = "sqdm", nullable = false, length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "qyid", nullable = false, length = 32)

	public String getQyid() {
		return this.qyid;
	}

	public void setQyid(String qyid) {
		this.qyid = qyid;
	}

	@Column(name = "lyid", nullable = false, length = 32)

	public String getLyid() {
		return this.lyid;
	}

	public void setLyid(String lyid) {
		this.lyid = lyid;
	}

	@Column(name = "dyid", length = 32)

	public String getDyid() {
		return this.dyid;
	}

	public void setDyid(String dyid) {
		this.dyid = dyid;
	}

	@Column(name = "fchm", nullable = false, length = 50)

	public String getFchm() {
		return this.fchm;
	}

	public void setFchm(String fchm) {
		this.fchm = fchm;
	}

	@Column(name = "fcbh", length = 50)

	public String getFcbh() {
		return this.fcbh;
	}

	public void setFcbh(String fcbh) {
		this.fcbh = fcbh;
	}

	@Column(name = "fcmc", length = 100)

	public String getFcmc() {
		return this.fcmc;
	}

	public void setFcmc(String fcmc) {
		this.fcmc = fcmc;
	}

	@Column(name = "lcdm", nullable = false)

	public Integer getLcdm() {
		return this.lcdm;
	}

	public void setLcdm(Integer lcdm) {
		this.lcdm = lcdm;
	}

	@Column(name = "jzmj", nullable = false, precision = 12)

	public BigDecimal  getJzmj() {
		return this.jzmj;
	}

	public void setJzmj(BigDecimal  jzmj) {
		this.jzmj = jzmj;
	}

	@Column(name = "tnmj", precision = 12)

	public BigDecimal  getTnmj() {
		return this.tnmj;
	}

	public void setTnmj(BigDecimal  tnmj) {
		this.tnmj = tnmj;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "slrq", length = 10)

	public Date getSlrq() {
		return this.slrq;
	}

	public void setSlrq(Date slrq) {
		this.slrq = slrq;
	}

	@Column(name = "slzt", length = 1)

	public String getSlzt() {
		return this.slzt;
	}

	public void setSlzt(String slzt) {
		this.slzt = slzt;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "rzrq", length = 10)

	public Date getRzrq() {
		return this.rzrq;
	}

	public void setRzrq(Date rzrq) {
		this.rzrq = rzrq;
	}

	@Column(name = "rzzt", length = 1)

	public String getRzzt() {
		return this.rzzt;
	}

	public void setRzzt(String rzzt) {
		this.rzzt = rzzt;
	}

	@Column(name = "zxzt", length = 1)

	public String getZxzt() {
		return this.zxzt;
	}

	public void setZxzt(String zxzt) {
		this.zxzt = zxzt;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "zxrq", length = 10)

	public Date getZxrq() {
		return this.zxrq;
	}

	public void setZxrq(Date zxrq) {
		this.zxrq = zxrq;
	}

	@Column(name = "cszt", length = 1)

	public String getCszt() {
		return this.cszt;
	}

	public void setCszt(String cszt) {
		this.cszt = cszt;
	}

	@Column(name = "fczt", nullable = false, length = 1)

	public String getFczt() {
		return this.fczt;
	}

	public void setFczt(String fczt) {
		this.fczt = fczt;
	}

	@Column(name = "zlzt", length = 1)

	public String getZlzt() {
		return this.zlzt;
	}

	public void setZlzt(String zlzt) {
		this.zlzt = zlzt;
	}

	@Column(name = "czzt", length = 1)

	public String getCzzt() {
		return this.czzt;
	}

	public void setCzzt(String czzt) {
		this.czzt = czzt;
	}

	@Column(name = "plxh")

	public Integer getPlxh() {
		return this.plxh;
	}

	public void setPlxh(Integer plxh) {
		this.plxh = plxh;
	}

	@Column(name = "sshxdm", length = 10)

	public String getSshxdm() {
		return this.sshxdm;
	}

	public void setSshxdm(String sshxdm) {
		this.sshxdm = sshxdm;
	}

	@Column(name = "cxdm", length = 10)

	public String getCxdm() {
		return this.cxdm;
	}

	public void setCxdm(String cxdm) {
		this.cxdm = cxdm;
	}

	@Column(name = "fclxdm", length = 10)

	public String getFclxdm() {
		return this.fclxdm;
	}

	public void setFclxdm(String fclxdm) {
		this.fclxdm = fclxdm;
	}

	@Column(name = "fcxzdm", length = 10)

	public String getFcxzdm() {
		return this.fcxzdm;
	}

	public void setFcxzdm(String fcxzdm) {
		this.fcxzdm = fcxzdm;
	}

	@Column(name = "bz", length = 500)

	public String getBz() {
		return this.bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

	@Column(name = "lrsj", length = 19)

	public Timestamp getLrsj() {
		return this.lrsj;
	}

	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}

	@Column(name = "lrry", length = 50)

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

	@Column(name = "xgry", length = 50)

	public String getXgry() {
		return this.xgry;
	}

	public void setXgry(String xgry) {
		this.xgry = xgry;
	}

}