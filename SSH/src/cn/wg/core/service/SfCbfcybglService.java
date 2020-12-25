package cn.wg.core.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ctp.core.service.BaseService;
import com.ctp.core.utils.UUIDUtil;
import com.ctp.core.utils.ValueTransform;

import cn.wg.core.model.TWgCbKhyb;
import cn.wg.core.vo.FccbVo;
import cn.wg.core.vo.FccbmxVo;
import cn.wg.core.vo.FcybVo;
import common.Logger;

@Service
public class SfCbfcybglService extends BaseService{
	
	private static final Logger logger = Logger.getLogger(SfCbfcybglService.class);
	
	public void addKhyb(FcybVo ybvo) throws Exception{
		TWgCbKhyb khyb = new TWgCbKhyb();
		ValueTransform.vo2bo(ybvo, khyb);
		khyb.setKhybid(UUIDUtil.genId());
		this.dao.save(khyb);
	}
	
	@SuppressWarnings("unchecked")
	public void updateKhyb(FcybVo ybvo) throws Exception{
		TWgCbKhyb khyb = (TWgCbKhyb) this.dao.get(TWgCbKhyb.class, ybvo.getKhybid());
		ValueTransform.vo2bo(ybvo, khyb);
		khyb.setAzrq(ybvo.getAzrq());
		khyb.setBz(ybvo.getBz());
		khyb.setKsrq(ybvo.getKsrq());
		khyb.setJsrq(ybvo.getJsrq());
		khyb.setLc(ybvo.getLc());
		khyb.setBl(ybvo.getBl());
		khyb.setDs(ybvo.getDs());
		this.updateKhyb(ybvo);
	}
	
	@SuppressWarnings("unchecked")
	public void deleteKhyb(String khybid) throws Exception{
		TWgCbKhyb khyb = (TWgCbKhyb) this.dao.get(TWgCbKhyb.class, khybid);
		this.dao.delete(khyb);
	}
	
	
	@SuppressWarnings("unchecked")
	public List<FcybVo> getFcyb(String fcid) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(fcid);
		String sql = "select t.*,t2.fcmc,t3.khmc,t4.sfbzmc,t5.yblxmc from t_wg_dm_yblx t5, t_wg_hd_sfbz t4, t_wg_kh_khxx t3, t_wg_fc_fcxx t2, t_wg_cb_khyb t where t2.fcid = ? and t.sfbzid = t4.sfbzid and t.yblxdm = t5.yblxdm and t2.fcid = t3.fcid and t3.khid = t.khid and t.yxbj = '1' and t3.yxbj = '1' and t4.yxbj = '1' and t5.yxbj = '1' ";
		List<FcybVo> list = this.dao.findBySQL(sql, params, FcybVo.class);
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public List<FccbmxVo> getFckhybList(String fcid) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(fcid);
		String sql = "select t3.khmc,t4.yblxmc,t1.* from t_wg_cb_khyb t,t_wg_cb_khybcbmx t1,t_wg_fc_fcxx t2,t_wg_kh_khxx t3,t_wg_dm_yblx t4 where t.fcid=t2.fcid and t.khid=t3.khid and t.khybid=t1.khybid and t2.fcid=t3.fcid  and t.yblxdm=t4.yblxdm  and t2.fcid=? order by t.khid,t4.yblxdm,t1.bqcbrq";
		List<FccbmxVo> list = this.dao.findBySQL(sql, params, FccbmxVo.class);
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public List<FccbmxVo> getKhybList(String khybid) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(khybid);
		String sql = "select t3.khmc,t4.yblxmc,t1.* from t_wg_cb_khyb t,t_wg_cb_khybcbmx t1,t_wg_fc_fcxx t2,t_wg_kh_khxx t3,t_wg_dm_yblx t4 where t.fcid=t2.fcid and t.khid=t3.khid and t.khybid=t1.khybid and t2.fcid=t3.fcid  and t.yblxdm=t4.yblxdm  and t.khybid=? order by t.khid,t4.yblxdm,t1.bqcbrq";
		List<FccbmxVo> list = this.dao.findBySQL(sql, params, FccbmxVo.class);
		return list;
	}
}
