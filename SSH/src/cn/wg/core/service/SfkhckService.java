package cn.wg.core.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.UUIDUtil;

import cn.wg.core.model.TWgCwKhckxx;
import cn.wg.core.vo.CwxxVo;
import cn.wg.core.vo.KhckVo;
import common.Logger;

@Service
public class SfkhckService extends BaseService{

	
	private static final Logger logger = Logger.getLogger(SfkhckService.class);
	
	
	public void addCkxx(KhckVo ckvo)throws Exception{
		TWgCwKhckxx ckxx = new TWgCwKhckxx();
		ckxx.setKhckid(UUIDUtil.genId());
		ckxx.setCwid(ckvo.getCwid());
		ckxx.setSqdm(ckvo.getSqdm());
		ckxx.setFcid(ckvo.getFcid());
		ckxx.setKhid(ckvo.getKhid());
		ckxx.setCkh(ckvo.getCkh());
		ckxx.setCklxdm(ckvo.getCklxdm());
		ckxx.setKkrq(ckvo.getKkrq());
		ckxx.setJsrq(ckvo.getJsrq());
		ckxx.setSfbzid(ckvo.getSfbzid());
		ckxx.setCphm(ckvo.getCphm());
		ckxx.setZtbj(ckvo.getZtbj());
		ckxx.setLrry(ckvo.getLrry());
		ckxx.setLrsj(DateUtils.getCurTimestamp());
		ckxx.setBz(ckvo.getBz());
		this.dao.save(ckxx);
	}
	
	public void updateCkxx(KhckVo ckvo) throws Exception{
		TWgCwKhckxx ckxx = (TWgCwKhckxx)this.dao.get(TWgCwKhckxx.class, ckvo.getKhckid());
		ckxx.setCwid(ckvo.getCwid());
		ckxx.setCkh(ckvo.getCkh());
		ckxx.setCklxdm(ckvo.getCklxdm());
		ckxx.setKkrq(ckvo.getKkrq());
		ckxx.setJsrq(ckvo.getJsrq());
		ckxx.setSfbzid(ckvo.getSfbzid());
		ckxx.setCphm(ckvo.getCphm());
		ckxx.setZtbj(ckvo.getZtbj());
		ckxx.setBz(ckvo.getBz());
		ckxx.setXgry(ckvo.getXgry());
		ckxx.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(ckxx);
	}
	
	public void deleteCkxx(String khckid, String xgry) throws Exception{
		TWgCwKhckxx ckxx = (TWgCwKhckxx)this.dao.get(TWgCwKhckxx.class, khckid);
		ckxx.setXgry(xgry);
		ckxx.setZtbj("9");
		ckxx.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(ckxx);
	}
	
	public List<KhckVo> getKhck(String fcid)throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(fcid);
		String sql = "SELECT t1.*,t2.sfbzmc,t5.cklxmc,t3.khmc,t4.cwhm " + 
				" FROM t_wg_cw_khckxx t1 " +
				" LEFT JOIN t_wg_hd_sfbz t2 ON t1.sfbzid = t2.sfbzid " + 
				" INNER JOIN t_wg_kh_khxx t3 ON t1.khid = t3.khid " + 
				" LEFT JOIN t_wg_cw_cwxx t4 ON t1.cwid = t4.cwid " + 
				" LEFT JOIN t_wg_dm_cklx t5 ON t1.cklxdm = t5.cklxdm " + 
				" WHERE t1.fcid = ? and t1.ztbj != '9' order by t1.ckh ";
		List<KhckVo> list =this.dao.findBySQL(sql, params, KhckVo.class);
		return list;
	}
	
	public List<CwxxVo> getCwhm(String cwhm, String sqdm) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(sqdm);
		String sql = "select cwhm from t_wg_cw_cwxx where cwhm = '%"+ cwhm +"%' and sqdm = ? and ztbj = '1' order by length(cwhm) limit 10";
		List<CwxxVo> list = this.dao.findBySQL(sql, params, CwxxVo.class);
		return list;
	}
}
