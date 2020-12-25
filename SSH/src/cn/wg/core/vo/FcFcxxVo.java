package cn.wg.core.vo;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

import com.ctp.core.vo.BaseValueObject;

public class FcFcxxVo  extends BaseValueObject{
	private static final long serialVersionUID = 8571093911262127445L;
	
	private String fcid;
	private String sqdm;
	private String qyid;
	private String lyid;
	private String dyid;
	private String fchm;
	private String fcbh;
	private String fcmc;
	private Integer lcdm;
	private BigDecimal  jzmj;
	private BigDecimal  tnmj;
	private Date slrq;
	private Date slrqq;
	private Date slrqz;
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
	private String ywbj;
	private int page;
	private int pageSize;
	
	public Date getSlrqq() {
		return slrqq;
	}
	public void setSlrqq(Date slrqq) {
		this.slrqq = slrqq;
	}
	public Date getSlrqz() {
		return slrqz;
	}
	public void setSlrqz(Date slrqz) {
		this.slrqz = slrqz;
	}
	public String getYwbj() {
		return ywbj;
	}
	public void setYwbj(String ywbj) {
		this.ywbj = ywbj;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public String getFcid() {
		return fcid;
	}
	public void setFcid(String fcid) {
		this.fcid = fcid;
	}
	public String getSqdm() {
		return sqdm;
	}
	public void setSqdm(String sqdm) {
		this.sqdm = sqdm;
	}
	public String getQyid() {
		return qyid;
	}
	public void setQyid(String qyid) {
		this.qyid = qyid;
	}
	public String getLyid() {
		return lyid;
	}
	public void setLyid(String lyid) {
		this.lyid = lyid;
	}
	public String getDyid() {
		return dyid;
	}
	public void setDyid(String dyid) {
		this.dyid = dyid;
	}
	
	public String getFchm() {
		return fchm;
	}
	public void setFchm(String fchm) {
		this.fchm = fchm;
	}
	public String getFcbh() {
		return fcbh;
	}
	public void setFcbh(String fcbh) {
		this.fcbh = fcbh;
	}
	public String getFcmc() {
		return fcmc;
	}
	public void setFcmc(String fcmc) {
		this.fcmc = fcmc;
	}
	public String getFczt() {
		return fczt;
	}
	public void setFczt(String fczt) {
		this.fczt = fczt;
	}
	
	public Integer getLcdm() {
		return lcdm;
	}
	public void setLcdm(Integer lcdm) {
		this.lcdm = lcdm;
	}
	public BigDecimal  getJzmj() {
		return jzmj;
	}
	public void setJzmj(BigDecimal  jzmj) {
		this.jzmj = jzmj;
	}
	public BigDecimal  getTnmj() {
		return tnmj;
	}
	public void setTnmj(BigDecimal  tnmj) {
		this.tnmj = tnmj;
	}
	public Date getSlrq() {
		return slrq;
	}
	public void setSlrq(Date slrq) {
		this.slrq = slrq;
	}
	public String getSlzt() {
		return slzt;
	}
	public void setSlzt(String slzt) {
		this.slzt = slzt;
	}
	public Date getRzrq() {
		return rzrq;
	}
	public void setRzrq(Date rzrq) {
		this.rzrq = rzrq;
	}
	public String getRzzt() {
		return rzzt;
	}
	public void setRzzt(String rzzt) {
		this.rzzt = rzzt;
	}
	public String getZxzt() {
		return zxzt;
	}
	public void setZxzt(String zxzt) {
		this.zxzt = zxzt;
	}
	public Date getZxrq() {
		return zxrq;
	}
	public void setZxrq(Date zxrq) {
		this.zxrq = zxrq;
	}
	public String getCszt() {
		return cszt;
	}
	public void setCszt(String cszt) {
		this.cszt = cszt;
	}
	public String getZlzt() {
		return zlzt;
	}
	public void setZlzt(String zlzt) {
		this.zlzt = zlzt;
	}
	public String getCzzt() {
		return czzt;
	}
	public void setCzzt(String czzt) {
		this.czzt = czzt;
	}
	public Integer getPlxh() {
		return plxh;
	}
	public void setPlxh(Integer plxh) {
		this.plxh = plxh;
	}
	public String getSshxdm() {
		return sshxdm;
	}
	public void setSshxdm(String sshxdm) {
		this.sshxdm = sshxdm;
	}
	public String getCxdm() {
		return cxdm;
	}
	public void setCxdm(String cxdm) {
		this.cxdm = cxdm;
	}
	public String getFclxdm() {
		return fclxdm;
	}
	public void setFclxdm(String fclxdm) {
		this.fclxdm = fclxdm;
	}
	public String getFcxzdm() {
		return fcxzdm;
	}
	public void setFcxzdm(String fcxzdm) {
		this.fcxzdm = fcxzdm;
	}
	public String getBz() {
		return bz;
	}
	public void setBz(String bz) {
		this.bz = bz;
	}
	public Timestamp getLrsj() {
		return lrsj;
	}
	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}
	public String getLrry() {
		return lrry;
	}
	public void setLrry(String lrry) {
		this.lrry = lrry;
	}
	public Timestamp getXgsj() {
		return xgsj;
	}
	public void setXgsj(Timestamp xgsj) {
		this.xgsj = xgsj;
	}
	public String getXgry() {
		return xgry;
	}
	public void setXgry(String xgry) {
		this.xgry = xgry;
	}
}
