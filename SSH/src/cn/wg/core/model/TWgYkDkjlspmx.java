package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgYkDkjlspmx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_yk_dkjlspmx")

public class TWgYkDkjlspmx extends BasePersistentObject{

	// Fields

	private String dkjlspmxid;
	private String dkjlid;
	private String khid;
	private String fcid;
	private String yhzh;
	private String yhzhmc;
	private String yhzjhm;
	private String yhhh;
	private String yhhb;
	private String jfbh;
	private String htbh;
	private java.math.BigDecimal dkje;
	private String dkcgbj;
	private String dkjgsm;
	private String dkjlhpmxid;
	private String dzcgbj;
	private String dzjgsm;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgYkDkjlspmx() {
	}

	/** minimal constructor */
	public TWgYkDkjlspmx(String dkjlspmxid, String dkjlid, String khid, String fcid) {
		this.dkjlspmxid = dkjlspmxid;
		this.dkjlid = dkjlid;
		this.khid = khid;
		this.fcid = fcid;
	}

	/** full constructor */
	public TWgYkDkjlspmx(String dkjlspmxid, String dkjlid, String khid, String fcid, String yhzh, String yhzhmc,
			String yhzjhm, String yhhh, String yhhb, String jfbh, String htbh, java.math.BigDecimal dkje, String dkcgbj,
			String dkjgsm, String dkjlhpmxid, String dzcgbj, String dzjgsm, Timestamp lrsj, String lrry, Timestamp xgsj,
			String xgry) {
		this.dkjlspmxid = dkjlspmxid;
		this.dkjlid = dkjlid;
		this.khid = khid;
		this.fcid = fcid;
		this.yhzh = yhzh;
		this.yhzhmc = yhzhmc;
		this.yhzjhm = yhzjhm;
		this.yhhh = yhhh;
		this.yhhb = yhhb;
		this.jfbh = jfbh;
		this.htbh = htbh;
		this.dkje = dkje;
		this.dkcgbj = dkcgbj;
		this.dkjgsm = dkjgsm;
		this.dkjlhpmxid = dkjlhpmxid;
		this.dzcgbj = dzcgbj;
		this.dzjgsm = dzjgsm;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "dkjlspmxid", unique = true, nullable = false, length = 32)

	public String getDkjlspmxid() {
		return this.dkjlspmxid;
	}

	public void setDkjlspmxid(String dkjlspmxid) {
		this.dkjlspmxid = dkjlspmxid;
	}

	@Column(name = "dkjlid", nullable = false, length = 32)

	public String getDkjlid() {
		return this.dkjlid;
	}

	public void setDkjlid(String dkjlid) {
		this.dkjlid = dkjlid;
	}

	@Column(name = "khid", nullable = false, length = 32)

	public String getKhid() {
		return this.khid;
	}

	public void setKhid(String khid) {
		this.khid = khid;
	}

	@Column(name = "fcid", nullable = false, length = 32)

	public String getFcid() {
		return this.fcid;
	}

	public void setFcid(String fcid) {
		this.fcid = fcid;
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

	@Column(name = "jfbh", length = 50)

	public String getJfbh() {
		return this.jfbh;
	}

	public void setJfbh(String jfbh) {
		this.jfbh = jfbh;
	}

	@Column(name = "htbh", length = 50)

	public String getHtbh() {
		return this.htbh;
	}

	public void setHtbh(String htbh) {
		this.htbh = htbh;
	}

	@Column(name = "dkje", precision = 12)

	public java.math.BigDecimal getDkje() {
		return this.dkje;
	}

	public void setDkje(java.math.BigDecimal dkje) {
		this.dkje = dkje;
	}

	@Column(name = "dkcgbj", length = 1)

	public String getDkcgbj() {
		return this.dkcgbj;
	}

	public void setDkcgbj(String dkcgbj) {
		this.dkcgbj = dkcgbj;
	}

	@Column(name = "dkjgsm", length = 200)

	public String getDkjgsm() {
		return this.dkjgsm;
	}

	public void setDkjgsm(String dkjgsm) {
		this.dkjgsm = dkjgsm;
	}

	@Column(name = "dkjlhpmxid", length = 32)

	public String getDkjlhpmxid() {
		return this.dkjlhpmxid;
	}

	public void setDkjlhpmxid(String dkjlhpmxid) {
		this.dkjlhpmxid = dkjlhpmxid;
	}

	@Column(name = "dzcgbj", length = 1)

	public String getDzcgbj() {
		return this.dzcgbj;
	}

	public void setDzcgbj(String dzcgbj) {
		this.dzcgbj = dzcgbj;
	}

	@Column(name = "dzjgsm", length = 200)

	public String getDzjgsm() {
		return this.dzjgsm;
	}

	public void setDzjgsm(String dzjgsm) {
		this.dzjgsm = dzjgsm;
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