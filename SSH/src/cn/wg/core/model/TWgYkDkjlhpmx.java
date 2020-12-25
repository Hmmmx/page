package cn.wg.core.model;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ctp.core.model.BasePersistentObject;

/**
 * TWgYkDkjlhpmx entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_yk_dkjlhpmx")

public class TWgYkDkjlhpmx extends BasePersistentObject{

	// Fields

	private String dkjlhpmxid;
	private String dkjlid;
	private String yhzh;
	private String yhzhmc;
	private String yhzjhm;
	private String yhhh;
	private String yhhb;
	private String htbh;
	private String jfbh;
	private java.math.BigDecimal hpje;
	private String dkcgbj;
	private String dkjgsm;
	private String dzcgbj;
	private String dzjgsm;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgYkDkjlhpmx() {
	}

	/** minimal constructor */
	public TWgYkDkjlhpmx(String dkjlhpmxid, String dkjlid) {
		this.dkjlhpmxid = dkjlhpmxid;
		this.dkjlid = dkjlid;
	}

	/** full constructor */
	public TWgYkDkjlhpmx(String dkjlhpmxid, String dkjlid, String yhzh, String yhzhmc, String yhzjhm, String yhhh,
			String yhhb, String htbh, String jfbh, java.math.BigDecimal hpje, String dkcgbj, String dkjgsm, String dzcgbj,
			String dzjgsm, Timestamp lrsj, String lrry, Timestamp xgsj, String xgry) {
		this.dkjlhpmxid = dkjlhpmxid;
		this.dkjlid = dkjlid;
		this.yhzh = yhzh;
		this.yhzhmc = yhzhmc;
		this.yhzjhm = yhzjhm;
		this.yhhh = yhhh;
		this.yhhb = yhhb;
		this.htbh = htbh;
		this.jfbh = jfbh;
		this.hpje = hpje;
		this.dkcgbj = dkcgbj;
		this.dkjgsm = dkjgsm;
		this.dzcgbj = dzcgbj;
		this.dzjgsm = dzjgsm;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "dkjlhpmxid", unique = true, nullable = false, length = 32)

	public String getDkjlhpmxid() {
		return this.dkjlhpmxid;
	}

	public void setDkjlhpmxid(String dkjlhpmxid) {
		this.dkjlhpmxid = dkjlhpmxid;
	}

	@Column(name = "dkjlid", nullable = false, length = 32)

	public String getDkjlid() {
		return this.dkjlid;
	}

	public void setDkjlid(String dkjlid) {
		this.dkjlid = dkjlid;
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

	@Column(name = "htbh", length = 50)

	public String getHtbh() {
		return this.htbh;
	}

	public void setHtbh(String htbh) {
		this.htbh = htbh;
	}

	@Column(name = "jfbh", length = 50)

	public String getJfbh() {
		return this.jfbh;
	}

	public void setJfbh(String jfbh) {
		this.jfbh = jfbh;
	}

	@Column(name = "hpje", precision = 12)

	public java.math.BigDecimal getHpje() {
		return this.hpje;
	}

	public void setHpje(java.math.BigDecimal hpje) {
		this.hpje = hpje;
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