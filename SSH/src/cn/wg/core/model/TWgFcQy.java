package cn.wg.core.model;

import com.ctp.core.model.BasePersistentObject;
import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TWgFcQy entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_fc_qy")

public class TWgFcQy extends BasePersistentObject{

	// Fields

	private String qyid;
	private String qymc;
	private String sqdm;
	private Integer plxh;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgFcQy() {
	}

	/** minimal constructor */
	public TWgFcQy(String qyid, String qymc, String sqdm) {
		this.qyid = qyid;
		this.qymc = qymc;
		this.sqdm = sqdm;
	}

	/** full constructor */
	public TWgFcQy(String qyid, String qymc, String sqdm, Integer plxh, String yxbj, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry) {
		this.qyid = qyid;
		this.qymc = qymc;
		this.sqdm = sqdm;
		this.plxh = plxh;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "qyid", unique = true, nullable = false, length = 32)

	public String getQyid() {
		return this.qyid;
	}

	public void setQyid(String qyid) {
		this.qyid = qyid;
	}

	@Column(name = "qymc", nullable = false, length = 50)

	public String getQymc() {
		return this.qymc;
	}

	public void setQymc(String qymc) {
		this.qymc = qymc;
	}

	@Column(name = "sqdm", nullable = false, length = 32)

	public String getSqdm() {
		return this.sqdm;
	}

	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
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