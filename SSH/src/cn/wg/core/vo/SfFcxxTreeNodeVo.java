package cn.wg.core.vo;

import java.util.HashMap;

import com.ctp.core.vo.BaseValueObject;

public class SfFcxxTreeNodeVo  extends BaseValueObject{
	private static final long serialVersionUID = 1106359672893546442L;
	
	private String id;
	private String dm;
	private String mc;
	private String sub; // sub mc of node, eg: 张三  of 101(张三)
	private String nid; // tree node id: id or dm
	private String pid; // tree parent node id
	private String type; // sq qy ly dy fc
	private String yxbj;
	private HashMap<String, Object> ext; // 扩展属性：其他节点特性相关的属性放在这里
	private Integer plxh;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDm() {
		return dm;
	}
	public void setDm(String dm) {
		this.dm = dm;
	}
	public String getMc() {
		return mc;
	}
	public void setMc(String mc) {
		this.mc = mc;
	}
	public String getSub() {
		return sub;
	}
	public void setSub(String sub) {
		this.sub = sub;
	}
	public String getNid() {
		return nid;
	}
	public void setNid(String nid) {
		this.nid = nid;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getYxbj() {
		return yxbj;
	}
	public void setYxbj(String yxbj) {
		this.yxbj = yxbj;
	}
	public HashMap<String, Object> getExt() {
		return ext;
	}
	public void setExt(HashMap<String, Object> ext) {
		this.ext = ext;
	}
	public Integer getPlxh() {
		return plxh;
	}
	public void setPlxh(Integer plxh) {
		this.plxh = plxh;
	}
	
}
