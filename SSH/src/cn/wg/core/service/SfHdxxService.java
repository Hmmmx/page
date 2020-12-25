package cn.wg.core.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.StringTool;
import com.ctp.core.utils.UUIDUtil;
import org.apache.commons.lang.StringUtils;

import cn.wg.core.model.TWgHdSfbzkh;
import cn.wg.core.vo.HdxxVo;
import cn.wg.core.vo.KhxxVo;
import common.Logger;

@Service
public class SfHdxxService extends BaseService{
	private static final Logger logger = Logger.getLogger(SfHdxxService.class);
	
	@SuppressWarnings("unchecked")
	public void addHdxx(HdxxVo hdvo) throws Exception{
		ArrayList<String> list = hdvo.getSfbzidList();
		List<String> orglist = new ArrayList<String>();
		for (String a : list) {
			orglist.add("'"+ a +"'");
		}
		String sfbzlist = String.join(",", orglist);
		
		ArrayList<String> params = new ArrayList<String>();
		params.add(hdvo.getKhid());
		params.add(hdvo.getFcid());
		String sql = "select count(*) from t_wg_hd_sfbzkh where khid = ? and fcid = ? and sfbzid in ("+ sfbzlist+ ") and yxbj = '1' ";
		
		if(this.dao.queryCount(sql, params) > 0) {
			throw new Exception("此客户已有该收费标准，无法新增");
		}
		
		for (String a : list) {
			TWgHdSfbzkh sfkh = new TWgHdSfbzkh();
			sfkh.setHdid(UUIDUtil.genId());
			sfkh.setSfbzid(a);
			sfkh.setFcid(hdvo.getFcid());
			sfkh.setKhid(hdvo.getKhid());
			sfkh.setYxrqq(hdvo.getYxrqq());
			sfkh.setYxrqz(hdvo.getYxrqz());
			sfkh.setYxbj("1");
			sfkh.setLrry(hdvo.getLrry());
			sfkh.setLrsj(DateUtils.getCurTimestamp());
			this.dao.save(sfkh);
		}
		
	}
	
	@SuppressWarnings("unchecked")
	public void addPlhd(HdxxVo hdvo) throws Exception{
		String sfbzid = hdvo.getSfbzid();
		String sqlDel = "delete t from t_wg_hd_sfbzkh t where sfbzid = '" + sfbzid + "' ";
		this.dao.executeSql(sqlDel);
		if(StringUtils.isNotBlank(hdvo.getKhidStr())) {
			StringBuilder khidList = StringTool.StrSql(hdvo.getKhidStr());
			String sql = "select t.khid,t.fcid from t_wg_kh_khxx t where t.khid in ("+ khidList +") and t.yxbj = '1' ";
			List<KhxxVo> volist = this.dao.findBySQL(sql, KhxxVo.class);
			if(volist.size() > 0 && volist != null) {
				String sql3 = "insert into t_wg_hd_sfbzkh (hdid,sfbzid,fcid,khid,yxrqq,yxrqz,yxbj,lrry,lrsj) VALUES ";
				for(int i = 0; i < volist.size(); i++) {
					List<String> conditions = new ArrayList<String>();
					conditions.add("'"+ UUIDUtil.genId() +"'");
					conditions.add("'"+ sfbzid +"'");
					conditions.add("'"+ volist.get(i).getFcid() +"'");
					conditions.add("'"+ volist.get(i).getKhid() +"'");
					conditions.add(hdvo.getYxrqq() == null ? null : "'"+ DateUtils.dateToString(hdvo.getYxrqq()) +"'");
					conditions.add(hdvo.getYxrqz() == null ? null : "'"+ DateUtils.dateToString(hdvo.getYxrqz()) +"'");
					conditions.add("'1'");
					conditions.add("'"+ hdvo.getLrry() +"'");
					conditions.add("now()");
					String ret = String.join(",", conditions);
					if(i != 0)
						sql3 += ",";
					sql3 += "(" + ret + ")";
				}
				this.dao.executeSql(sql3);
			}
		}
	}
	
	@SuppressWarnings("unchecked")
	public void updateHdxx(HdxxVo hdvo) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(hdvo.getKhid());
		params.add(hdvo.getFcid());
		params.add(hdvo.getSfbzid());
		String sql = "select count(*) from t_wg_hd_sfbzkh where khid = ? and fcid = ? and sfbzid = ? and yxbj = '1' ";
		
		if(this.dao.queryCount(sql, params) > 0) {
			throw new Exception("此客户已有该收费标准，无法修改");
		}
		
		TWgHdSfbzkh sfkh = (TWgHdSfbzkh )this.dao.get(TWgHdSfbzkh.class, hdvo.getHdid());
		sfkh.setKhid(hdvo.getKhid());
		sfkh.setYxrqq(hdvo.getYxrqq());
		sfkh.setYxrqz(hdvo.getYxrqz());
		sfkh.setXgry(hdvo.getXgry());
		sfkh.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(sfkh);
	}
	
	@SuppressWarnings("unchecked")
	public void deleteHdxx(String hdid) throws Exception{
		this.dao.delete(this.dao.get(TWgHdSfbzkh.class, hdid));
	}
	
	@SuppressWarnings("unchecked")
	public List<HdxxVo> getHdxx(String fcid) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(fcid);
		String sql = "SELECT t.*,t2.sfbzmc,t3.fylxmc,t4.sfxmmc,t5.khmc,t6.fcmc from t_wg_hd_sfbzkh t, t_wg_hd_sfbz t2, t_wg_dm_fylx t3, t_wg_hd_jgsfxm t4, t_wg_kh_khxx t5, t_wg_fc_fcxx t6 where t.fcid = ? and t.yxbj = '1' " + 
				" AND t.sfbzid = t2.sfbzid AND t2.sfxmdm = t4.sfxmdm AND t3.fylxdm = t4.fylxdm AND t.fcid = t6.fcid and t.khid = t5.khid AND t2.sqdm = t4.sqdm ORDER BY t3.fylxmc,t4.sfxmdm " ;
		List<HdxxVo> list = this.dao.findBySQL(sql, params, HdxxVo.class);
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public List<HdxxVo> getYhdkhxx(String sfbzid, String khlxdm) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(sfbzid);
		String sql = null;
		if("ALL".equals(khlxdm)) {
			sql = "select t1.fcid,t1.khid from t_wg_hd_sfbzkh t1, t_wg_hd_sfbz t2 where t1.sfbzid = t2.sfbzid and t1.sfbzid = ? and t1.yxbj = '1' and t2.yxbj = '1' ";
		}else{
			params.add(khlxdm);
			sql = "select fcid,khid, from t_wg_sfbzkh t,t_wg_hd_sfbz t2, t_wg_kh_khxx where t.sfbzid = t2.sfbzid and t.khid = t3.khid and t.sfbzid = ? and t3.khlxdm = ? and t.yxbj = '1' and t2.yxbj = '1' ";
		}
		List<HdxxVo> list = this.dao.findBySQL(sql, params, HdxxVo.class);
		return list;
	} 
	
	@SuppressWarnings("unchecked")
	public List<HdxxVo> getSfbzBySfxmdm(String fcid, String khid, String sfxmdm, String fylxdm)throws Exception{
		String sql = "";
		ArrayList<String> params = new ArrayList<String>();
		params.add(fcid);
		params.add(khid);
		params.add(sfxmdm);
		if(fylxdm.equals("01") || fylxdm.equals("04")) {
			sql = "select t.sfbzid,t.sfbzmc from t_wg_hd_sfbz t,t_wg_hd_sfbzkh t2 where t.sfbzid = t2.sfbzid and t2.fcid = ? and t2.khid = ? and t.sfxmdm = ? and t.yxbj = '1' and t2.yxbj = '1' order by t.sfxmdm,t.sfbzmc ";
		}else if(fylxdm.equals("02")) {
			sql = "select t.sfbzid,t.sfbzmc from t_wg_hd_sfbz t,t_wg_cb_khyb t2 where t.sfbzid = t2.sfbzid and t2.fcid = ? and t2.khid = ? and t.sfxmdm = ? and t.yxbj = '1' and t2.yxbj = '1' order by t.sfxmdm,t.sfbzmc ";
		}else if(fylxdm.equals("05")) {
			sql = "select t.sfbzid,t.sfbzmc from t_wg_hd_sfbz t,t_wg_cw_khckxx t2 where t.sfbzid = t2.sfbzid and t2.fcid = ? and t2.khid = ? and t.sfxmdm = ? and t.yxbj = '1' and t2.ztbj = '1' order by t.sfxmdm,t.sfbzmc ";
		}
		List<HdxxVo> list = this.dao.findBySQL(sql, params, HdxxVo.class);
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public List<HdxxVo> getSfbzByFylxdm(String sqdm, String fylxdmStr) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(sqdm);
		String sql = "select t.sfbzid,t.sfbzmc,t.sfxmdm,t2.sfxmmc from t_wg_hd_sfbz t, t_wg_hd_jgsfxm t2 where t.sfxmdm = t2.sfxmdm and t.sqdm = t2.sqdm and t.yxbj = '1' and t2.yxbj = '1' and t.sqdm = ?";
		if(!StringUtils.isEmpty(fylxdmStr)) {
			sql += " and fylxdm in (" + fylxdmStr + ") ";
		}
		sql += "order by t.sfxmdm,t.sfbzmc";
		List<HdxxVo> list = this.dao.findBySQL(sql, params, HdxxVo.class);
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public List<HdxxVo> getSfxmByFylxdm(String sqdm, String fylxdm, String fylxStr) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(sqdm);
		String sql = "select sfxmdm,sfxmmc,djconfig from t_wg_hd_jgsfxm where sqdm = ? and yxbj = '1' ";
		if(!StringUtils.isEmpty(fylxdm)) {
			params.add(fylxdm);
			sql += " and fylxdm = ? ";
		}else if(!StringUtils.isEmpty(fylxStr)) {
			params.add(fylxStr);
			sql += " and fylxdm in ("+ StringTool.StrSql(fylxStr) +")";
		}
		sql += " order by sfxmdm ";
		List<HdxxVo> list = this.dao.findBySQL(sql, params, HdxxVo.class);
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public List<HdxxVo> getJgyjdj(String sqdm) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(sqdm);
		String sql = "select yjlxdm,yjlxmc,djconfig from t_wg_hd_jgyjlx where sqdm = ? and yxbj ='1' order by yjlxdm ";
		List<HdxxVo> list = this.dao.findBySQL(sql, params, HdxxVo.class);
		return list;
	}

}
