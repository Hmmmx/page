package cn.wg.core.model;

import com.ctp.core.model.BasePersistentObject;
import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TWgFcLy entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_fc_ly")

public class TWgFcLy extends BasePersistentObject{

	// Fields

	private String lyid;
	private String qyid;
	private String lymc;
	private Integer plxh;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgFcLy() {
	}

	/** minimal constructor */
	public TWgFcLy(String lyid, String qyid, String lymc) {
		this.lyid = lyid;
		this.qyid = qyid;
		this.lymc = lymc;
	}

	/** full constructor */
	public TWgFcLy(String lyid, String qyid, String lymc, Integer plxh, String yxbj, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry) {
		this.lyid = lyid;
		this.qyid = qyid;
		this.lymc = lymc;
		this.plxh = plxh;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "lyid", unique = true, nullable = false, length = 32)

	public String getLyid() {
		return this.lyid;
	}

	public void setLyid(String lyid) {
		this.lyid = lyid;
	}

	@Column(name = "qyid", nullable = false, length = 32)

	public String getQyid() {
		return this.qyid;
	}

	public void setQyid(String qyid) {
		this.qyid = qyid;
	}

	@Column(name = "lymc", nullable = false, length = 50)

	public String getLymc() {
		return this.lymc;
	}

	public void setLymc(String lymc) {
		this.lymc = lymc;
	}

	@Column(name = "plxh")

	public Integer getPlxh() {
		return this.plxh;
	}

	public void setPlxh(Integer plxh) {
		this.plxh = plxh;
	}

	@Column(name = "yxbj", length = 1)

	public String getYxbj() {
		return this.yxbj;
	}

	public void setYxbj(String yxbj) {
		this.yxbj = yxbj;
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