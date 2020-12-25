package com.ctp.core.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.ctp.core.vo.DmVo;
@Service
public class DmService extends BaseService {
	private static HashMap<String, List<DmVo>> CACHE_DM_MAP = new HashMap<String, List<DmVo>>();
	
	/**
	 * 通用获取相应代码配置表的数据，并缓存到内存中
	 * @param type 数据库中相应代码表的类型名称，如目标表是t_wg_dm_cklx, type值就是 cklx
	 * @param q query查询条件
	 * @return
	 */
	public List<DmVo> get(String type, String q) {
		List<DmVo> dmVoList = null;
		if (!CACHE_DM_MAP.containsKey(type)) {
			String sql = String.format("select t.%sdm dm,t.%smc mc from t_wg_dm_%s t where t.yxbj='1' order by t.%sdm", type, type, type, type);
			//CACHE_DM_MAP.put(type, this.dao.findBySQL(sql, DmVo.class));
			//dmVoList = CACHE_DM_MAP.get(type);
			dmVoList = this.dao.findBySQL(sql, DmVo.class); //暂不缓存，系统稳定后再缓存
		} else {
			dmVoList = CACHE_DM_MAP.get(type);
		}
		
		if (StringUtils.isBlank(q)) {
			return dmVoList;
		} else {
			List<DmVo> retList = new ArrayList<DmVo>();
			for (DmVo dmVo: dmVoList) {
				if (dmVo.getMc().indexOf(q) > -1) retList.add(dmVo);
			}
			return retList;
		}
	}
	
	/**
	 * 通用获取相应代码配置表的数据，并缓存到内存中
	 * @param category 数据库中相应代码表的业务类型名称，如目标表是t_bx_dm_bxlx, category值就是 bx
	 * @param type 数据库中相应代码表的类型名称，如目标表是t_bx_dm_bxlx, type值就是 bxlx
	 * @param q query查询条件
	 * @return
	 */
	public List<DmVo> get(String category, String type, String q) {
		List<DmVo> dmVoList = null;
		if (!CACHE_DM_MAP.containsKey(type)) {
			String sql = String.format("select t.%sdm dm,t.%smc mc from t_%s_dm_%s t where t.yxbj='1' order by t.%sdm", type, type, category, type, type);
			//CACHE_DM_MAP.put(type, this.dao.findBySQL(sql, DmVo.class));
			//dmVoList = CACHE_DM_MAP.get(type);
			dmVoList = this.dao.findBySQL(sql, DmVo.class); //暂不缓存，系统稳定后再缓存
		} else {
			dmVoList = CACHE_DM_MAP.get(type);
		}
		
		if (StringUtils.isBlank(q)) {
			return dmVoList;
		} else {
			List<DmVo> retList = new ArrayList<DmVo>();
			for (DmVo dmVo: dmVoList) {
				if (dmVo.getMc().indexOf(q) > -1) retList.add(dmVo);
			}
			return retList;
		}
	}
}
