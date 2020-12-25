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
 * TWgKhKhxx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_kh_khxx")

public class TWgKhKhxx extends BasePersistentObject{

	// Fields

	private String khid;
	private String sqdm;
	private String fcid;
	private String khmc;
	private String khlxdm;
	private String yxbj;
	private String zjlxdm;
	private String zjhm;
	private String dkbj;
	private String dkfadm;
	private String yhzh;
	private String yhzhmc;
	private String yhzjhm;
	private String jfbh;
	private String yhhh;
	private String yhhb;
	private String htbh;
	private String crzh;
	private String xbdm;
	private Date jsrq;
	private Date tcrq;
	private Date csrq;
	private String lxdh;
	private String sjhm;
	private String dzyx;
	private String jzdz;
	private String khbq;
	private String jjlxrxm;
	private String jjlxrdh;
	private String bz;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgKhKhxx() {
	}

	/** minimal constructor */
	public TWgKhKhxx(String khid, String sqdm, String fcid, String khmc, String khlxdm) {
		this.khid = khid;
		this.sqdm = sqdm;
		this.fcid = fcid;
		this.khmc = khmc;
		this.khlxdm = khlxdm;
	}

	/** full constructor */
	public TWgKhKhxx(String khid, String sqdm, String fcid, String khmc, String khlxdm, String yxbj, String zjlxdm,
			String zjhm, String dkbj, String dkfadm, String yhzh, String yhzhmc, String yhzjhm, String jfbh,
			String yhhh, String yhhb, String htbh, String crzh, String xbdm, Date jsrq, Date tcrq, Date csrq,
			String lxdh, String sjhm, String dzyx, String jzdz, String khbq, String jjlxrxm, String jjlxrdh, String bz,
			Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.khid = khid;
		this.sqdm = sqdm;
		this.fcid = fcid;
		this.khmc = khmc;
		this.khlxdm = khlxdm;
		this.yxbj = yxbj;
		this.zjlxdm = zjlxdm;
		this.zjhm = zjhm;
		this.dkbj = dkbj;
		this.dkfadm = dkfadm;
		this.yhzh = yhzh;
		this.yhzhmc = yhzhmc;
		this.yhzjhm = yhzjhm;
		this.jfbh = jfbh;
		this.yhhh = yhhh;
		this.yhhb = yhhb;
		this.htbh = htbh;
		this.crzh = crzh;
		this.xbdm = xbdm;
		this.jsrq = jsrq;
		this.tcrq = tcrq;
		this.csrq = csrq;
		this.lxdh = lxdh;
		this.sjhm = sjhm;
		this.dzyx = dzyx;
		this.jzdz = jzdz;
		this.khbq = khbq;
		this.jjlxrxm = jjlxrxm;
		this.jjlxrdh = jjlxrdh;
		this.bz = bz;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "khid", unique = true, nullable = false, length = 32)

	public String getKhid() {
		return this.khid;
	}

	public void setKhid(String khid) {
		this.khid = khid;
	}

	@Column(name = "sqdm", nullable = false, length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}

	@Column(name = "fcid", nullable = false, length = 32)

	public String getFcid() {
		return this.fcid;
	}

	public void setFcid(String fcid) {
		this.fcid = fcid;
	}

	@Column(name = "khmc", nullable = false, length = 50)

	public String getKhmc() {
		return this.khmc;
	}

	public void setKhmc(String khmc) {
		this.khmc = khmc;
	}

	@Column(name = "khlxdm", nullable = false, length = 10)

	public String getKhlxdm() {
		return this.khlxdm;
	}

	public void setKhlxdm(String khlxdm) {
		this.khlxdm = khlxdm;
	}

	@Column(name = "yxbj", length = 1)

	public String getYxbj() {
		return this.yxbj;
	}

	public void setYxbj(String yxbj) {
		this.yxbj = yxbj;
	}

	@Column(name = "zjlxdm", length = 10)

	public String getZjlxdm() {
		return this.zjlxdm;
	}

	public void setZjlxdm(String zjlxdm) {
		this.zjlxdm = zjlxdm;
	}

	@Column(name = "zjhm", length = 50)

	public String getZjhm() {
		return this.zjhm;
	}

	public void setZjhm(String zjhm) {
		this.zjhm = zjhm;
	}

	@Column(name = "dkbj", length = 1)

	public String getDkbj() {
		return this.dkbj;
	}

	public void setDkbj(String dkbj) {
		this.dkbj = dkbj;
	}

	@Column(name = "dkfadm", length = 10)

	public String getDkfadm() {
		return this.dkfadm;
	}

	public void setDkfadm(String dkfadm) {
		this.dkfadm = dkfadm;
	}

	@Column(name = "yhzh", length = 50)

	public String getYhzh() {
		return this.yhzh;
	}

	public void setYhzh(String yhzh) {
		this.yhzh = yhzh;
	}

	@Column(name = "yhzhmc", length = 100)

	public String getYhzhmc() {
		return this.yhzhmc;
	}

	public void setYhzhmc(String yhzhmc) {
		this.yhzhmc = yhzhmc;
	}

	@Column(name = "yhzjhm", length = 100)

	public String getYhzjhm() {
		return this.yhzjhm;
	}

	public void setYhzjhm(String yhzjhm) {
		this.yhzjhm = yhzjhm;
	}

	@Column(name = "jfbh", length = 50)

	public String getJfbh() {
		return this.jfbh;
	}

	public void setJfbh(String jfbh) {
		this.jfbh = jfbh;
	}

	@Column(name = "yhhh", length = 32)

	public String getYhhh() {
		return this.yhhh;
	}

	public void setYhhh(String yhhh) {
		this.yhhh = yhhh;
	}

	@Column(name = "yhhb", length = 32)

	public String getYhhb() {
		return this.yhhb;
	}

	public void setYhhb(String yhhb) {
		this.yhhb = yhhb;
	}

	@Column(name = "htbh", length = 50)

	public String getHtbh() {
		return this.htbh;
	}

	public void setHtbh(String htbh) {
		this.htbh = htbh;
	}

	@Column(name = "crzh", length = 50)

	public String getCrzh() {
		return this.crzh;
	}

	public void setCrzh(String crzh) {
		this.crzh = crzh;
	}

	@Column(name = "xbdm", length = 10)

	public String getXbdm() {
		return this.xbdm;
	}

	public void setXbdm(String xbdm) {
		this.xbdm = xbdm;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "jsrq", length = 10)

	public Date getJsrq() {
		return this.jsrq;
	}

	public void setJsrq(Date jsrq) {
		this.jsrq = jsrq;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "tcrq", length = 10)

	public Date getTcrq() {
		return this.tcrq;
	}

	public void setTcrq(Date tcrq) {
		this.tcrq = tcrq;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "csrq", length = 10)

	public Date getCsrq() {
		return this.csrq;
	}

	public void setCsrq(Date csrq) {
		this.csrq = csrq;
	}

	@Column(name = "lxdh", length = 100)

	public String getLxdh() {
		return this.lxdh;
	}

	public void setLxdh(String lxdh) {
		this.lxdh = lxdh;
	}

	@Column(name = "sjhm", length = 32)

	public String getSjhm() {
		return this.sjhm;
	}

	public void setSjhm(String sjhm) {
		this.sjhm = sjhm;
	}

	@Column(name = "dzyx", length = 32)

	public String getDzyx() {
		return this.dzyx;
	}

	public void setDzyx(String dzyx) {
		this.dzyx = dzyx;
	}

	@Column(name = "jzdz", length = 100)

	public String getJzdz() {
		return this.jzdz;
	}

	public void setJzdz(String jzdz) {
		this.jzdz = jzdz;
	}

	@Column(name = "khbq", length = 32)

	public String getKhbq() {
		return this.khbq;
	}

	public void setKhbq(String khbq) {
		this.khbq = khbq;
	}

	@Column(name = "jjlxrxm", length = 100)

	public String getJjlxrxm() {
		return this.jjlxrxm;
	}

	public void setJjlxrxm(String jjlxrxm) {
		this.jjlxrxm = jjlxrxm;
	}

	@Column(name = "jjlxrdh", length = 100)

	public String getJjlxrdh() {
		return this.jjlxrdh;
	}

	public void setJjlxrdh(String jjlxrdh) {
		this.jjlxrdh = jjlxrdh;
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