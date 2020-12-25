package cn.wg.core.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.UUIDUtil;

import cn.wg.core.model.TWgCwCwxx;
import cn.wg.core.vo.CkxxVo;
import cn.wg.core.vo.CwxxVo;
import common.Logger;

@Service
public class SfCwxxService extends BaseService{

	private static final Logger logger = Logger.getLogger(SfCwxxService.class);
	
	
	public void addCwxx(CwxxVo cwvo) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(cwvo.getSqdm());
		params.add(cwvo.getCwhm());
		String sql = "select count(*) from t_wg_cw_cwxx where sqdm = ? and cwhm = ? and ztbj = '1'";
		if(this.dao.queryCount(sql, params) > 0) {
			throw new Exception("此小区存在相同车位号码，无法新增");
		}
		TWgCwCwxx cwxx = new TWgCwCwxx();
		cwxx.setCkid(UUIDUtil.genId());
		cwxx.setSqdm(cwvo.getSqdm());
		cwxx.setCkid(cwvo.getCkid());
		cwxx.setCwhm(cwvo.getCwhm());
		cwxx.setCwmj(cwvo.getCwmj());
		cwxx.setZtbj(cwvo.getZtbj());
		cwxx.setLrry(cwvo.getLrry());
		cwxx.setLrsj(DateUtils.getCurTimestamp());
		this.dao.save(cwxx);
	}
	
	public void updateCwxx(CwxxVo cwvo)throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(cwvo.getSqdm());
		params.add(cwvo.getCwhm());
		params.add(cwvo.getCwid());
		String sql = "select count(*) from t_wg_cw_cwxx where sqdm = ? and cwhm = ? and cwid = ? and ztbj = '1'";
		if(this.dao.queryCount(sql, params) > 0) {
			throw new Exception("此小区存在相同车位号码，无法修改");
		}
		TWgCwCwxx cwxx = (TWgCwCwxx)this.dao.get(TWgCwCwxx.class, cwvo.getCwid());
		cwxx.setCwhm(cwvo.getCwhm());
		cwxx.setCwmj(cwvo.getCwmj());
		cwxx.setZtbj(cwvo.getZtbj());
		cwxx.setXgry(cwvo.getXgry());
		cwxx.setXgsj(cwvo.getXgsj());
		this.dao.update(cwxx);
	}
	
	public void deleteCwxx(String cwid)throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(cwid);
		String sql = "select count(*) from t_wg_cw_khckxx where cwid = ? and ztbj = '1'";
		if(this.dao.queryCount(sql, params) > 0) {
			throw new Exception("此车位尚存在车卡，无法删除");
		}
		TWgCwCwxx cwxx = (TWgCwCwxx)this.dao.get(TWgCwCwxx.class, cwid);
		cwxx.setZtbj("9");
		this.dao.update(cwxx);
	}
	
	public List<TWgCwCwxx> getCwxx(String ckid)throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(ckid);
		String sql = "select cwid,cwhm,cwmj,ztbj from t_wg_cw_cwxx where ckid = ? and ztbj = '1' order by cwhm";
		List<TWgCwCwxx> list = this.dao.findBySQL(sql, params, TWgCwCwxx.class);
		return list;
	}
	
	public List<Map<String, Object>> getCkList(String sqdm, String sqlx) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		params.add(sqdm);
		String sql = "select sqdm,sqmc,sqid from t_wg_xt_jgxx where sqdm = ? and yxbj = '1'";
		List<CkxxVo> list2 = this.dao.findBySQL(sql, params, CkxxVo.class);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("dm", list2.get(0).getSqdm());
		map.put("mc", list2.get(0).getSqmc());
		
		if(sqlx.equals("1")) {
			ArrayList<String> params2 = new ArrayList<String>();
			params.add(list2.get(0).getSqid());
			String sql2 = "select sqdm,sqid,sqmc from t_wg_xt_jgxx where sqid = ? and yxbj = '1'";
			List<CkxxVo> list3 = this.dao.findBySQL(sql2, params2, CkxxVo.class);
			if(list2 != null && list2.size()> 0) {
				List<Map<String, Object>> childrenList = new ArrayList<Map<String,Object>>();
				for(CkxxVo org : list2) {
					Map<String, Object> map2 = new HashMap<String, Object>();
					map2.put("dm", org.getSqdm());
					map2.put("mc", org.getSqmc());
					map2.put("children",this.getChildren(org.getSqdm()));
					childrenList.add(map2);
				}
				map.put("children", childrenList);
			}						
		}else {
			map.put("children", this.getChildren(list2.get(0).getSqdm()));
		}
		list.add(map);
		return list;
	}
	
	private List<Map<String, Object>> getChildren(String sqdm) throws Exception{
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		ArrayList<String> params = new ArrayList<String>();
		params.add(sqdm);
		String sql = "select ckid,ckmc from t_wg_cw_ckxx where sqdm = ?";
		List<CkxxVo> list2 = this.dao.findBySQL(sql, params, CkxxVo.class);
		if(!StringUtils.isEmpty(list2) && list2.size() > 0) {
			for(CkxxVo org : list2) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("dm", org.getCkid());
				map.put("mc", org.getCkmc());
				list.add(map);
			}
		}
		return list;
	}
}
