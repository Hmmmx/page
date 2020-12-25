package cn.wg.core.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.ExactitudeCalculate;
import com.ctp.core.utils.UUIDUtil;
import com.ctp.core.utils.ValueTransform;

import cn.wg.core.model.TWgHdSfbz;
import cn.wg.core.vo.SfbzVo;
import common.Logger;
import jxl.write.DateTime;

@Service
public class SfSfbzService extends BaseService{

	private static final Logger logger = Logger.getLogger(SfSfbzService.class);
	
	public void addSfbz(SfbzVo sfvo) throws Exception{
		if(sfvo.getDj() == null) {
			String jffsdm = sfvo.getJffsdm();
			if(jffsdm.equals("01") || jffsdm.equals("03") || jffsdm.equals("03")) {
				throw new Exception("改计费方式需要设置单价");
			}
		}
		ArrayList<String> params = new ArrayList<String>();
		params.add(sfvo.getSfbzmc());
		params.add(sfvo.getSqdm());
		String sql = "select count(*) from t_wg_hd_sfbz where sfbzmc = ? and sqdm = ? and yxbj = '1'";
		if(this.dao.queryCount(sql, params)> 0 ) {
			throw new Exception("本小区已有同名收费标准，无法新增");
		}
		TWgHdSfbz sfbz = new TWgHdSfbz();
		sfvo.setSfbzid(UUIDUtil.genId());
		sfvo.setSrfsdm("1");
		sfvo.setYxbj("1");
		ValueTransform.vo2bo(sfvo, sfbz);
		this.dao.save(sfbz);
	}
	
	public void updateSfbz(SfbzVo sfvo) throws Exception{
		if (sfvo.getDj() == null) {
			String jffsdm = sfvo.getJffsdm();
			if (jffsdm.equals("01") || jffsdm.equals("02") || jffsdm.equals("03"))
				throw new Exception("该计费方式需设置单价");
		}
		ArrayList<String> params = new ArrayList<String>();
		params.add(sfvo.getSfbzmc());
		params.add(sfvo.getSqdm());
		params.add(sfvo.getSfbzid());
		String sql = "select count(*) from t_wg_hd_sfbz where sfbzmc = ? and sqdm = ? and sfbzid != ? and yxbj != '9'";
		if(this.dao.queryCount(sql, params) > 0) {
			throw new Exception("本小区已有同名收费标准，无法修改");
		}
		TWgHdSfbz sfbz = (TWgHdSfbz)this.dao.get(TWgHdSfbz.class, sfvo.getSfbzid());
		ValueTransform.vo2bo(sfvo, sfbz);
		sfbz.setWyjid(sfvo.getWyjid());
		this.dao.update(sfbz);
		
	}
	
	public void deleteSfbz(String sfbzid, String xgry) throws Exception{
		TWgHdSfbz sfbz = (TWgHdSfbz)this.dao.get(TWgHdSfbz.class, sfbzid);
		sfbz.setYxbj("9");
		sfbz.setXgsj(DateUtils.getCurTimestamp());
		sfbz.setXgry(xgry);
		this.dao.update(sfbz);
		
		String sql = "update t_wg_hd_sfbzkh set yxbj = '9' where sfbzid = '"+ sfbzid +"'";
		this.dao.executeSql(sql);
	}
	
	@SuppressWarnings("unchecked")
	public List<SfbzVo> getSfbz(String sqdm, String sqlx) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(sqdm);
		if(sqlx.equals("1")) {
			String sql = "select t.*,t2.sfxmmc,t4.jffsmc,t5.sqmc,t6.dwmc,t7.fylxdm,t7.fylxmc from t_wg_hd_sfbz t "
					+ "inner join t_wg_hd_jgsfxm t2 on t.sfxmdm=t2.sfxmdm and t.sqdm=t2.sqdm "
					+ "inner join t_wg_dm_fylx t7 on t2.fylxdm =t7.fylxdm and t7.yxbj='1' "
					+ "inner join t_wg_dm_jffs t4 on t.jffsdm=t4.jffsdm "
					+ "inner join t_wg_xt_jgxx t5 on t.sqdm=t5.sqdm "
					+ "left join t_wg_dm_dw t6 on t.dwdm=t6.dwdm and t6.yxbj='1' " // left join 单位代码表（单位代码是可选字段）
					+ "where t.sqdm in (select a.sqdm from t_wg_xt_jgxx a, t_wg_xt_jgxx b where a.sjsqid=b.sqid and b.sqdm=? and b.yxbj='1') "
					+ "and t.yxbj='1' order by sfxmdm,sfbzmc ";
			List<SfbzVo> list = this.dao.findBySQL(sql, params, SfbzVo.class);
			return list;
		}else {
			String sql = "select t.*,t2.sfxmmc,t3.jffsmc,t4.sqmc,t5.fylxmc,t6.dwmc,t5.fylxdm from t_wg_hd_sfbz t " +  
					" INNER JOIN t_wg_hd_jgsfxm t2 ON t.sfxmdm = t2.sfxmdm and t.sqdm = t2.sqdm " +  
					" INNER JOIN t_wg_dm_jffs t3 ON t.jffsdm = t3.jffsdm " +  
					" INNER JOIN t_wg_xt_jgxx t4 ON t.sqdm = t4.sqdm " +  
					" INNER JOIN t_wg_dm_fylx t5 ON t2.fylxdm = t5.fylxdm and t5.yxbj = '1' " +  
					" LEFT JOIN t_wg_dm_dw t6 ON t.dwdm = t6.dwdm and t6.yxbj = '1' " +  
					" where t.sqdm = ? and t.yxbj = '1' ORDER BY t.sfxmdm,t.sfbzmc ";
			List<SfbzVo> list = this.dao.findBySQL(sql, params, SfbzVo.class);
			return list;
		}
	}
	
	public Double getSfbzje(String fcid, String khid, String sfbzid, String fylxdm) throws Exception{
		Double dyje = 0d;
		
		ArrayList<String> params = new ArrayList<String>();
		params.add(khid);
		params.add(fcid);
		params.add(sfbzid);
		String sql = "";
		if(fylxdm.equals("01") || fylxdm.equals("04"))
			sql = "select t.sfbzid,t2.sfbzmc,t3.jzmj,t2.dj,t2.sfxmdm "
					+ "from t_wg_hd_sfbzkh t,t_wg_hd_sfbz t2,t_wg_fc_fcxx t3 where "
					+ "t.khid = ? and t.fcid = ? and t.fcid = t3.fcid "
					+ "and t.sfbzid = t2.sfbzid "
					+ "and t.sfbzid = ? and t.yxbj = '1' and t2.yxbj = '1' ";
		
		if(fylxdm.equals("02"))
			sql = "select t.sfbzid,t2.sfbzmc,t3.jzmj,t2.dj,t2.jffsdm,t2.sfxmdm "
					+ "from t_wg_cb_khyb t,t_wg_hd_sfbz t2,t_wg_fc_fcxx t3 where "
					+ "t.khid = ? and t.fcid = ? and t.sfbzid = ? and t.fcid = t3.fcid "
					+ "and t.sfbzid = t2.sfbzid "
					+ "and t.yxbj = '1' and t2.yxbj = '1' ";
		
		if(fylxdm.equals("05"))
			sql = "select t,sfbzid,t2.sfbzmc,t3.jzmj,t2.dj,t2.jffsdm,t2.sfxmdm "
					+ "from t_wg_cw_khckxx t,t_wg_hd_sfbz t2,t_wg_fc_fcxx t3 where "
					+ "t.khid = ? t.fcid = ? and t.sfbzid = ? and t.fcid = t3.fcid "
					+ "and t.sfbzid = t2.sfbzid and t.ztbj = '1' and t2.yxbj = '1' ";
		 List<SfbzVo> volist = this.dao.findBySQL(sql, params, SfbzVo.class);
		 if(volist.size() > 0) {
			 String jffsdm = volist.get(0).getJffsdm();
			 if(jffsdm.equals("01")) {
				 dyje = ExactitudeCalculate.mul(volist.get(0).getJzmj().doubleValue(), volist.get(0).getDj().doubleValue(),2);
			 }else if (jffsdm.equals("03")) {
				 dyje = ExactitudeCalculate.round(volist.get(0).getDj().doubleValue());
			 }
		 }
		 
		 return dyje;
	}
	
	public List<SfbzVo> getWyjlxList(String sqdm) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(sqdm);
		String sql = "select wyjid,wyjmc from t_wg_hd_wyj where sqdm = ? and yxbj = '1' ";
		return this.dao.findBySQL(sql, params, SfbzVo.class);
	}
	
	public Double getSfxmje(String fcid, String khid, String sfxmdm, String sqdm) throws Exception{
		ArrayList<String> params2 = new ArrayList<String>();
		params2.add(sfxmdm);
		params2.add(sqdm);
		String sql2 = "select t.fylxdm from t_wg_hd_jgsfxm t where t.sfxmdm = ? and t.sqdm = ?";
		List<SfbzVo> list = this.dao.findBySQL(sql2, params2, SfbzVo.class);
		String fylxdm = list.get(0).getFylxdm();
		Double dyje = 0d;
		if(!fylxdm.equals("08")) {
			String sql = "";
			ArrayList<String> params = new ArrayList<String>();
			params.add(khid);
			params.add(fcid);
			params.add(sfxmdm);
			if(fylxdm.equals("01") || fylxdm.equals("04"))
				sql = "select t.sfbzid,t2.sfbzmc,t3.jzmj,t2.dj,t2.jffsdm,t2.sfxmdm "
						+ "from t_wg_hd_sfbzkht,t_wg_hd_sfbz t2,t_wg_fc_fcxx t3 where "
						+ "t.khid = ? and t.fcid = ? and t.fcid = t3.fcid "
						+ "and t.sfbzid = t2.sfbzid"
						+ "and t2.sfxmdm = ? and yxbj = '1' and t2.yxbj = '1' ";
			if(fylxdm.equals("02"))
				sql = "select t.sfbzid,t2.sfbzmc,t3.jzmj,t2.dj,t2.jffsdm,t2.sfxmdm"
						+ "from t_wg_cb_khyb t,t_wg_hd_sfbz t2,t_wg_fc_fcxx t3 where "
						+ "t.khid = ? and t.fcid = ? and t2.sfxmdm = ? and t.fcid = t3.fcid "
						+ "t.sfbzid = t2.sfbzid "
						+ "and t.yxbj = '1' and t2.yxbj = '1' ";
			if(fylxdm.equals("05"))
				sql = "select t.sfbzid,t2.sfbzmc,t3.jzmj,t2.dj,t2.jffsdm,t2.sfxmdm,t4.cwmj "
						+ "from t_wg_cw_khckxx t left join t_wg_cw_cwxx t4 on t.cwid = t4.cwid ,"
						+ "t_wg_hd_sfbz t2,t_wg_fc_fcxx t3 where t.khid = ? "
						+ "and t.fcid = ? and t2.sfxmdm = ? and t.fcid = t3.fcid "
						+ "and t.sfbzid = t2.sfbzid and t.ztbj = '1' and t2.yxbj = '1' ";
			List<SfbzVo> volist = this.dao.findBySQL(sql, params, SfbzVo.class);
			
			if(volist.size() > 0) {
				for(SfbzVo bzvo : volist) {
					if(bzvo.getJffsdm().equals("01")) {
						dyje = dyje + ExactitudeCalculate.mul(bzvo.getJzmj().doubleValue(), volist.get(0).getDj().doubleValue(), 2);
					}else if (bzvo.getJffsdm().equals("03")) {
						dyje = dyje + ExactitudeCalculate.round(bzvo.getDj().doubleValue(),2);
					}
				}
			}
		}
		return dyje;
	}
	
	
}
