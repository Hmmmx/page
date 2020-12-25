package cn.wg.core.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.UUIDUtil;
import com.ctp.core.utils.ValueTransform;

import cn.wg.core.model.TWgCbKhyb;
import cn.wg.core.model.TWgCbKhybcbmx;
import cn.wg.core.model.TWgHdSfbz;
import cn.wg.core.model.TWgKhKhxx;
import cn.wg.core.model.TWgSfFysc;
import cn.wg.core.model.TWgSfYcxfy;
import cn.wg.core.model.TWgSfYsfy;
import cn.wg.core.vo.FccbmxVo;
import cn.wg.core.vo.FcybVo;
import cn.wg.core.vo.FcybcxVo;
import common.Logger;

@Service
public class SfCbfccblrService extends BaseService {

	private static final Logger logger = Logger.getLogger(SfCbfccblrService.class);
	
	@SuppressWarnings("unchecked")
	public void saveCblr(List<FccbmxVo> fccbmxList) throws Exception{
		for (FccbmxVo cbvo : fccbmxList) {
			logger.debug("=============bccbvo.getKhybcbid()="+cbvo.getKhybcbid());
			if(cbvo.getKhybcbid() != null) {
				TWgCbKhybcbmx cbmx = (TWgCbKhybcbmx) this.dao.get(TWgCbKhybcbmx.class, cbvo.getKhybcbid());
				ValueTransform.vo2bo(cbvo, cbmx);
				cbmx.setBz(cbvo.getBz());
				cbmx.setJbyl(cbvo.getJbyl());
				Date zjcbrq = cbvo.getBqcbrq();
				this.dao.update(cbmx);
				
				TWgCbKhyb khyb = (TWgCbKhyb) this.dao.get(TWgCbKhyb.class, cbvo.getKhybid());
				khyb.setZjcbid(UUIDUtil.genId());
				khyb.setZjcbrq(zjcbrq);
				this.dao.update(khyb);
			}else {
				ArrayList<String> params = new ArrayList<String>();
				params.add(cbvo.getKhybid());
				String sql = "select count(*) from t_wg_cb_khybcbmx where khybid = ? and fyscbj = '0' and shbj in ('0','1')";
				if(this.dao.queryCount(sql, params) > 0) {
					throw new Exception("数据重复:请查询后重新录入");
				}
				TWgCbKhybcbmx cbmx = new TWgCbKhybcbmx();
				ValueTransform.vo2bo(cbvo, cbmx);
				Date zjcbrq = cbmx.getBqcbrq();
				cbmx.setKhybcbid(UUIDUtil.genId());
				cbmx.setLrsj(DateUtils.getCurTimestamp());
				this.dao.save(cbmx);
				
				TWgCbKhyb khyb = (TWgCbKhyb) this.dao.get(TWgCbKhyb.class, cbvo.getKhybid());
				khyb.setZjcbid(UUIDUtil.genId());
				khyb.setZjcbrq(zjcbrq);
				this.dao.update(khyb);
			}
		}
	}
	
	public void updateCblr(List<FccbmxVo> fccbmxList) throws Exception{
		for(FccbmxVo vo : fccbmxList) {
			vo.setSjyl(vo.getBqyl().add(vo.getJbyl()));
			if(vo.getKhybcbid() != null && vo.getKhybcbid().length() > 0) {
				TWgCbKhybcbmx cbmx = (TWgCbKhybcbmx) this.dao.get(TWgCbKhybcbmx.class, vo.getKhybcbid());
				vo.setShbj(vo.getShbj());
				vo.setFyscbj(vo.getFyscbj());
				ValueTransform.vo2bo(vo, cbmx);
				cbmx.setBz(vo.getBz());
				cbmx.setJbyl(vo.getJbyl());
				String fyscbj = vo.getFyscbj();
				this.dao.update(cbmx);
				
				if("1".equals(fyscbj)) {
					TWgCbKhyb khyb = (TWgCbKhyb) this.dao.get(TWgCbKhyb.class, vo.getKhybid());
					TWgHdSfbz sfbz = (TWgHdSfbz) this.dao.get(TWgCbKhyb.class, khyb.getSfbzid());
					BigDecimal dj = sfbz.getDj();
					BigDecimal bl = khyb.getBl();
					BigDecimal sjyj = cbmx.getSjyl();
					ArrayList<String> params = new ArrayList<String>();
					params.add(sfbz.getSqdm());
					params.add(khyb.getFcid());
					params.add(khyb.getKhid());
					params.add(cbmx.getKhybcbid());
					String sql = "select count(*) from t_wg_sf_ysfy where sqdm = ? and fcid = ? and khid = ? and zyid = ? and ztbj = '0' ";
					List<TWgSfYsfy> list = this.dao.findBySQL(sql, params, TWgSfYsfy.class);
					if(list != null && list.size() > 0) {
						TWgSfYsfy ysfy=(TWgSfYsfy)list.get(0);
						ysfy.setDj(dj);
						ysfy.setBl(bl);
						ysfy.setBqds(vo.getBqds());
						ysfy.setSqds(vo.getSqds());
						ysfy.setSl(sjyj);
						ysfy.setFyje(dj.multiply(bl).multiply(sjyj));
						this.dao.update(ysfy);
					}else {
						String sql1 = "select count(*) from t_wg_sf_ysfy where sqdm = ? and fcid = ? and khid = ? and zyid = ? and ztbj = '1' ";
						List<TWgSfYsfy> list1 = this.dao.findBySQL(sql1, params, TWgSfYsfy.class);
						if(list1 !=null && list1.size() > 0) {
							throw new Exception("此费用已缴，请联系工作人员修改");
						}
					}
				}
			}
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<FccbmxVo> getCbjlList(FcybcxVo cxvo) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		
		String sql = "select t.khybid,t2.fcmc,t2.fchm,t3.khmc,t4.yblxmc,t.bl,t.ds,t.ybbh,t1.khybcbid sqcbid,t1.bqcbrq sqcbrq,t1.bqds sqds from t_wg_cb_khyb t left join t_wg_cb_khybcbmx t1 on t.khybid=t1.khybid and t.zjcbid=t1.khybcbid and t1.shbj='1',t_wg_fc_fcxx t2,t_wg_kh_khxx t3,t_wg_dm_yblx t4 where t.fcid=t2.fcid and t.khid=t3.khid and t.yblxdm=t4.yblxdm and t.yxbj='1' and t2.fczt='1' ";

		if(StringUtils.isNotBlank(cxvo.getYblxdm())) {
			sql = sql + "and t.yblxdm = ? ";
			params.add(cxvo.getYblxdm());
		}
		
		if(StringUtils.isNotBlank(cxvo.getSqdm())) {
			sql = sql + "and .t2.sqdm = ? ";
			params.add(cxvo.getSqdm());
		}
		
		if(StringUtils.isNotBlank(cxvo.getQyid())) {
			sql = sql + "and t2.qyid = ? ";
			params.add(cxvo.getQyid());
		}
		
		if(StringUtils.isNotBlank(cxvo.getLyid())) {
			sql = sql + "and t2.lyid = ? ";
			params.add(cxvo.getLyid());
		}
		
		if(StringUtils.isNotBlank(cxvo.getDyid())) {
			sql = sql + "and t2.dyid = ? ";
			params.add(cxvo.getDyid());
		}
		
		if(StringUtils.isNotBlank(cxvo.getFcid())) {
			sql = sql + "and t2.fcid = ?";
			params.add(cxvo.getFcid());
		}
		
		sql = sql + " order by t2.sqdm,t.yblxdm,t2.qyid,t2.lyid,t2.dyid,t2.plxh ";
		
		List<FccbmxVo> list = this.dao.findBySQL(sql, params, FccbmxVo.class);
		
		ArrayList<String> bccbparams = new ArrayList<String>();
		
		String bccbsql = "select t1.* from t_wg_cb_khyb t,t_wg_cb_khybcbmx t1,t_wg_fc_fcxx t2,t_wg_kh_khxx t3,t_wg_dm_yblx t4 where  t.khybid=t1.khybid  and t.fcid=t2.fcid and t.khid=t3.khid and t.yblxdm=t4.yblxdm and t1.shbj in('0','1') and t1.fyscbj='0' and t.yxbj='1' and t2.fczt='1' ";
		
		if(StringUtils.isNotBlank(cxvo.getYblxdm())) {
			bccbsql = bccbsql + "and t.yblxdm = ? ";
			bccbparams.add(cxvo.getYblxdm());
		}
		
		if(StringUtils.isNotBlank(cxvo.getSqdm())) {
			bccbsql = bccbsql + "and t2.sqdm = ? ";
			bccbparams.add(cxvo.getSqdm());
		}
		
		if(StringUtils.isNotBlank(cxvo.getQyid())) {
			bccbsql = bccbsql + "and t2.qyid = ? ";
			bccbparams.add(cxvo.getQyid());
		}
		
		if(StringUtils.isNotBlank(cxvo.getLyid())) {
			bccbsql = bccbsql + "and t2.lyid = ? ";
			bccbparams.add(cxvo.getLyid());
		}
		
		if(StringUtils.isNotBlank(cxvo.getDyid())) {
			bccbsql = bccbsql + "and t2.dyid = ? ";
			bccbparams.add(cxvo.getDyid());
		}
		
		if(StringUtils.isNotBlank(cxvo.getFcid())) {
			bccbsql = bccbsql + "and t2.fcid = ? ";
			bccbparams.add(cxvo.getFcid());
		}
		
		List<FccbmxVo> bccbmxList = this.dao.findBySQL(bccbsql, bccbparams, FccbmxVo.class);
		HashMap<String, FccbmxVo> bccbmap = new HashMap<String, FccbmxVo>();
		for (FccbmxVo bccbvo : bccbmxList) {
			bccbmap.put(bccbvo.getKhybid(), bccbvo);
		}
		
		for (FccbmxVo cbvo : list) {
			
			if(StringUtils.isBlank(cbvo.getSqcbid())) {
				cbvo.setSqds(cbvo.getDs());
				cbvo.setSqcbrq(cbvo.getAzrq());
			}
			
			cbvo.setYsqcbrq(cbvo.getSqcbrq());
			cbvo.setYsqds(cbvo.getSqds());
			cbvo.setGhbj("0");
			if(bccbmap.containsKey(cbvo.getKhybid())) {
				FccbmxVo tempvo = (FccbmxVo) bccbmap.get(cbvo.getKhybid());
				
				cbvo.setKhybcbid(tempvo.getKhybcbid());
				cbvo.setSqcbrq(tempvo.getSqcbrq());
				cbvo.setSqds(tempvo.getSqds());
				cbvo.setBqcbrq(tempvo.getBqcbrq());
				cbvo.setBqds(tempvo.getBqds());
				
				cbvo.setBqyl(tempvo.getBqyl());
				cbvo.setJbyl(tempvo.getJbyl());
				cbvo.setSjyl(tempvo.getSjyl());
				cbvo.setGhbj(tempvo.getGhbj());
				cbvo.setBz(tempvo.getBz());
				
			}
		}		
		return list;	
	}
}
