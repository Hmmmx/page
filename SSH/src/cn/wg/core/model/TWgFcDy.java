package cn.wg.core.model;

import com.ctp.core.model.BasePersistentObject;
import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TWgFcDy entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_fc_dy")

public class TWgFcDy extends BasePersistentObject{

	// Fields

	private String dyid;
	private String lyid;
	private String dymc;
	private Integer plxh;
	private String yxbj;
	private Timestamp lrsj;
	private String lrry;
	private Timestamp xgsj;
	private String xgry;

	// Constructors

	/** default constructor */
	public TWgFcDy() {
	}

	/** minimal constructor */
	public TWgFcDy(String dyid, String lyid, String dymc) {
		this.dyid = dyid;
		this.lyid = lyid;
		this.dymc = dymc;
	}

	/** full constructor */
	public TWgFcDy(String dyid, String lyid, String dymc, Integer plxh, String yxbj, Timestamp lrsj, String lrry,
			Timestamp xgsj, String xgry) {
		this.dyid = dyid;
		this.lyid = lyid;
		this.dymc = dymc;
		this.plxh = plxh;
		this.yxbj = yxbj;
		this.lrsj = lrsj;
		this.lrry = lrry;
		this.xgsj = xgsj;
		this.xgry = xgry;
	}

	// Property accessors
	@Id

	@Column(name = "dyid", unique = true, nullable = false, length = 32)

	public String getDyid() {
		return this.dyid;
	}

	public void setDyid(String dyid) {
		this.dyid = dyid;
	}

	@Column(name = "lyid", nullable = false, length = 32)

	public String getLyid() {
		return this.lyid;
	}

	public void setLyid(String lyid) {
		this.lyid = lyid;
	}

	@Column(name = "dymc", nullable = false, length = 50)

	public String getDymc() {
		return this.dymc;
	}

	public void setDymc(String dymc) {
		this.dymc = dymc;
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