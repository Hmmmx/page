package cn.wg.core.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.UUIDUtil;

import cn.wg.core.model.TWgCwCkxx;
import cn.wg.core.vo.CkxxVo;
import common.Logger;

@Service
public class SfCwckService extends BaseService{

	private static final Logger logger = Logger.getLogger(SfCwckService.class);
	

	public void addCkxx(CkxxVo ckvo) {
		TWgCwCkxx ckxx = new TWgCwCkxx();
		ckxx.setCkid(UUIDUtil.genId());
		ckxx.setCkmc(ckvo.getCkmc());
		ckxx.setSqdm(ckvo.getSqdm());
		ckxx.setLrry(ckvo.getLrry());
		ckxx.setLrsj(DateUtils.getCurTimestamp());
		this.dao.save(ckxx);
	}
	@SuppressWarnings("unchecked")
	public void updateCkxx(CkxxVo ckvo){
		TWgCwCkxx ckxx = (TWgCwCkxx)this.dao.get(TWgCwCkxx.class, ckvo.getCkid());
		ckxx.setCkmc(ckvo.getCkmc());
		ckxx.setXgry(ckvo.getXgry());
		ckxx.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(ckxx);
	}
	
	@SuppressWarnings("unchecked")
	public void deleteCkxx(String ckid) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(ckid);
		String sql = "select count(*) from t_wg_cw_cwxx where ckid = ? and ztbj='1'";		
		if(this.dao.queryCount(sql, params) > 0) {
			throw new Exception("此车库尚有车位，无法删除");
		}
		TWgCwCkxx ckxx = (TWgCwCkxx) this.dao.get(TWgCwCkxx.class, ckid);
		this.dao.delete(ckxx);
	}
	
	@SuppressWarnings("unchecked")
	public List<TWgCwCkxx> getCkxx(String sqdm) throws Exception{
		ArrayList<String> params = new ArrayList<String>();
		params.add(sqdm);
		String sql = "select ckid,ckmc,lrry,lrsj,sqdm from t_wg_cw_ckxx where sqdm = ? ";
		List<TWgCwCkxx> list = this.dao.findBySQL(sql, params,TWgCwCkxx.class);
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getSqList(String sqdm, String sqlx)throws Exception{
		List<Map<String, Object>> orgList = new ArrayList<Map<String,Object>>();
		ArrayList<String> params = new ArrayList<String>();
		params.add(sqdm);
		String sql = "select sqdm,sqmc,sqid from t_wg_xt_jgxx where sqdm = ? and yxbj = '1'";
		List<CkxxVo> list = this.dao.findBySQL(sql, params, CkxxVo.class);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("dm", list.get(0).getSqdm());
		map.put("mc", list.get(0).getSqmc());
		if(sqlx.equals("1")) {
			ArrayList<String> params2 = new ArrayList<String>();
			params2.add(list.get(0).getSqid());
			String sql2 = "select sqdm,sqmc from t_wg_xt_jgxx where sjsqid = ? and yxbj = '1'";
			List<CkxxVo> list2 = this.dao.findBySQL(sql2, params2, CkxxVo.class);
			if(list2 != null && list2.size() > 0) {
				List<Map<String, Object>> childrenlist = new ArrayList<Map<String,Object>>();
				for(CkxxVo org : list2){
					Map<String, Object> map2 = new HashMap<String, Object>();
					map2.put("dm", org.getSqdm());
					map2.put("mc", org.getSqmc());
					childrenlist.add(map2);
				}
				map.put("childrem", childrenlist);
			}
		}
		orgList.add(map);
		
		return orgList;
	}
}
