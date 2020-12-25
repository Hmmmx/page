package cn.wg.core.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.UUIDUtil;
import com.ctp.core.utils.ValueTransform;

import cn.wg.core.model.TWgKhKhxx;
import cn.wg.core.vo.KhxxVo;
import cn.wg.core.vo.SqVo;

@Service
public class SfKhxxService extends BaseService {

	private static final Logger logger = Logger.getLogger(SfKhxxService.class);

	/**
	 * @Description: 新增客户信息
	 * @param: KhxxVo：客户信息vo
	 * @return: void
	 * @throws Exception
	 * @author hwh
	 * @Date 20191214
	 */
	public void addKhxx(KhxxVo khVo) throws Exception {
		TWgKhKhxx khxx = new TWgKhKhxx();
		khVo.setKhid(UUIDUtil.genId());
		ValueTransform.vo2bo(khVo, khxx);
		this.dao.save(khxx);
		
	}

	/** 
	 * @Description: 修改客户信息
	 * @param: KhxxVo：客户信息vo
	 * @return: void
	 * @throws Exception
	 * @author hwh
	 * @Date 20191214
	 */
	@SuppressWarnings("unchecked")
	public void updateKhxx(KhxxVo vo) throws Exception {
		TWgKhKhxx khxx = (TWgKhKhxx) this.dao.get(TWgKhKhxx.class, vo.getKhid());
		khxx.setKhmc(vo.getKhmc());
		khxx.setKhlxdm(vo.getKhlxdm());
		khxx.setYxbj(vo.getYxbj());
		khxx.setZjlxdm(vo.getZjlxdm());
		khxx.setZjhm(vo.getZjhm());
		khxx.setDkbj(vo.getDkbj());
		khxx.setDkfadm(vo.getDkfadm());
		khxx.setYhzh(vo.getYhzh());
		khxx.setYhzhmc(vo.getYhzhmc());
		khxx.setYhzjhm(vo.getYhzjhm());
		khxx.setJfbh(vo.getJfbh());
		khxx.setYhhh(vo.getYhhh());
		khxx.setHtbh(vo.getHtbh());
		khxx.setCrzh(vo.getCrzh());
		khxx.setXbdm(vo.getXbdm());
		khxx.setJsrq(vo.getJsrq());
		khxx.setTcrq(vo.getTcrq());
		khxx.setCsrq(vo.getCsrq());
		khxx.setLxdh(vo.getLxdh());
		khxx.setSjhm(vo.getSjhm());
		khxx.setDzyx(vo.getDzyx());
		khxx.setJzdz(vo.getJzdz());
		khxx.setKhbq(vo.getKhbq());
		khxx.setJjlxrdh(vo.getJjlxrdh());
		khxx.setJjlxrxm(vo.getJjlxrxm());
		khxx.setBz(vo.getBz());
		this.dao.update(khxx);
	}

	/**
	 * @Description: 删除客户
	 * @param: khid 客户ID
	 * @return: void
	 * @throws Exception
	 * @author hwh
	 * @Date 20191214
	 */
	@SuppressWarnings("unchecked")
	public void deleteKhxx(String khid, String xgry) throws Exception {
		TWgKhKhxx khxx = (TWgKhKhxx) this.dao.get(TWgKhKhxx.class, khid);
		khxx.setXgsj(DateUtils.getCurTimestamp());
		khxx.setXgry(xgry);
		khxx.setYxbj("9");
		this.dao.update(khxx);
	}

	/**
	 * @Description: 查询房间客户信息
	 * @param: fcid 房产ID
	 * @param: lite 是否读取轻量级数据
	 * @return: List<KhxxVo>
	 * @throws Exception
	 * @author hwh
	 * @Date 20191214
	 */
	@SuppressWarnings("unchecked")
	public List<KhxxVo> getKhxxList(String fcid, boolean lite) throws Exception {
		ArrayList<String> params = new ArrayList<String>();
		params.add(fcid);
		String sql = null;
		if (lite) // 轻量级：只读取少量必要数据，提高性能
			sql = "select t.khid, t.khmc from t_wg_kh_khxx t where t.fcid=? and t.yxbj!='9' order by t.khlxdm, t.khmc";
		else 
			sql = "select t.* from t_wg_kh_khxx t where t.fcid=? and t.yxbj!='9' order by t.khlxdm, t.khmc";
		List<KhxxVo> voList = this.dao.findBySQL(sql, params,KhxxVo.class);
		return voList;
	}
	
	/**
	 * @Description: 获取用户社区 不含物业公司
	 * @param: sqid 社区ID  sqlx 社区类型
	 * @param: lite 是否读取轻量级数据
	 * @return: List<KhxxVo>
	 * @throws Exception
	 * @author hwh
	 * @Date 20191214
	 */
	@SuppressWarnings("unchecked")
	public List<SqVo> getKhsq(String sqid, String sqlx) throws Exception {
		ArrayList<String> params = new ArrayList<String>();
		params.add(sqid);
		String sql="";
		if(sqlx.equals("1")) { //用户机构为物业公司
		 sql="select t.sqdm,t.sqmc from t_wg_xt_jgxx t where t.sjsqid=? and t.yxbj='1' ";
		}else if(sqlx.equals("2")) {//用户机构为物业小区
		sql="select t.sqdm,t.sqmc from t_wg_xt_jgxx t where t.sqid=? and t.yxbj='1' ";
		}
		List<SqVo> voList = this.dao.findBySQL(sql, params,SqVo.class);
		return voList;
	}
}
