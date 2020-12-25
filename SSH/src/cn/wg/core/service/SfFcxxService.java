package cn.wg.core.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.cbp.core.vo.WgjgVo;
import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.UUIDUtil;

import cn.wg.core.model.TWgFcDy;
import cn.wg.core.model.TWgFcFcxx;
import cn.wg.core.model.TWgFcLy;
import cn.wg.core.model.TWgFcQy;
import cn.wg.core.vo.FcFcxxVo;
import cn.wg.core.vo.FcdyVo;
import cn.wg.core.vo.FclyVo;
import cn.wg.core.vo.FcqyVo;
import cn.wg.core.vo.SfFcxxTreeNodeVo;

@Service
public class SfFcxxService extends BaseService {

	/**
	 * 加载房产树节点列表，前端再根据列表生成树（默认只加载到楼宇级）
	 * 
	 * @param sqid
	 * @param sqlx
	 * @param mode 完全或轻量 full lite (默认是lite), 完全时结果包含无效的节点
	 * @param range 范围对应房产5级加上客户总共6级，10，20，30，40，50，60
	 * @return: List<SfFcxxTreeNodeVo>
	 * @author stanley
	 * @Date 20191213
	 */
	public List<SfFcxxTreeNodeVo> getFcxxTree(String sqid, String sqlx, String mode, int range) {
		List<SfFcxxTreeNodeVo> list = null;
		if ("1".equals(sqlx) || "2".equals(sqlx)) { // 物业, 小区
			String yxbj = "full".equalsIgnoreCase(mode) ? "'0', '1'" : "'1'";

			List<SfFcxxTreeNodeVo> list2 = null;
			List<SfFcxxTreeNodeVo> list3 = null;
			List<SfFcxxTreeNodeVo> list4 = null;
			List<SfFcxxTreeNodeVo> list5 = null;
			List<SfFcxxTreeNodeVo> list6 = null;

			ArrayList<Object> params = new ArrayList<Object>();
			params.add(sqid);

			String sq = "1".equals(sqlx) ? "sjsqid=?" : "sqid=?";
			String sql1 = "select a.sqid id, a.sqdm dm, a.sqmc mc, a.sqdm nid, '_root_' pid, 'sq' type, a.yxbj, a.plxh from t_wg_xt_jgxx a where a."
					+ sq + " and a.yxbj='1' ORDER BY a.plxh ";
			list = this.dao.findBySQL(sql1, params, SfFcxxTreeNodeVo.class);

			if (list != null && list.size() > 0) {
				List<String> conditions = new ArrayList<String>();
				for (SfFcxxTreeNodeVo nodeVo : list) {
					conditions.add("'" + nodeVo.getNid() + "'");
				}
				String sql2 = "select a.qyid id, '_NULL_' dm, a.qymc mc, a.qyid nid, a.sqdm pid, 'qy' type, a.yxbj, a.plxh from t_wg_fc_qy a "
						+ "where a.sqdm in (" + String.join(",", conditions) + ") and a.yxbj in (" + yxbj + ") "
						+ "ORDER BY a.plxh ";
				/*
				 * String sql2 =
				 * "select a.qyid id, '_NULL_' dm, a.qymc mc, a.qyid nid, a.sqdm pid, 'qy' type, a.yxbj, a.plxh from t_wg_fc_qy a "
				 * + "inner join t_wg_xt_jgxx b on a.sqdm = b.sqdm " +
				 * "where b."+sq+" and b.yxbj='1' and a.yxbj='1' " + "ORDER BY a.plxh ";
				 */ // 区域与社区数量较少，联表查询一次
				list2 = this.dao.findBySQL(sql2, SfFcxxTreeNodeVo.class);
			}
			if (list2 != null && list2.size() > 0) {
				List<String> conditions = new ArrayList<String>();
				for (SfFcxxTreeNodeVo nodeVo : list2) {
					conditions.add("'" + nodeVo.getNid() + "'");
				}
				String sql3 = "select a.lyid id, '_NULL_' dm, a.lymc mc, a.lyid nid, a.qyid pid, 'ly' type, a.yxbj, a.plxh from t_wg_fc_ly a "
						+ "where a.qyid in (" + String.join(",", conditions) + ") and a.yxbj in (" + yxbj
						+ ") order by a.plxh";
				/*
				 * select a.lyid id, '_NULL_' dm, a.lymc mc, a.lyid nid, a.qyid pid, 'ly' type,
				 * a.yxbj from t_wg_fc_ly a inner join t_wg_fc_qy b on a.qyid=b.qyid inner join
				 * t_wg_xt_jgxx c on b.sqdm = c.sqdm where c.sjsqid=? and c.yxbj='1' and
				 * b.yxbj='1' and a.yxbj='1' order by a.plxh
				 */
				list3 = this.dao.findBySQL(sql3, SfFcxxTreeNodeVo.class);
			}
			if (list3 != null && list3.size() > 0) {
				List<String> conditions = new ArrayList<String>();
				for (SfFcxxTreeNodeVo nodeVo : list3) {
					conditions.add("'" + nodeVo.getNid() + "'");
				}
				String lyidStr = String.join(",", conditions);
				if (range >= 40) {
					String sql4 = "select a.dyid id, '_NULL_' dm, a.dymc mc, a.dyid nid, a.lyid pid, 'dy' type, a.yxbj, a.plxh "
							+ "from t_wg_fc_dy a where a.lyid in (" + lyidStr + ") and a.yxbj in (" + yxbj + ") order by a.plxh";
						list4 = this.dao.findBySQL(sql4, SfFcxxTreeNodeVo.class);
				}
				if (range >= 50) {
					String sql5 = "select a.* from t_wg_fc_fcxx a where a.lyid in (" + lyidStr + ") and a.fczt in (" + yxbj + ") order by a.plxh";
					List<FcFcxxVo> fcxxList = this.dao.findBySQL(sql5, FcFcxxVo.class);
					if (fcxxList != null && fcxxList.size() > 0) {
						list5 = new ArrayList<SfFcxxTreeNodeVo>();
						for (FcFcxxVo fcxxVo : fcxxList) {
							SfFcxxTreeNodeVo nodeVo = new SfFcxxTreeNodeVo();
							nodeVo.setId(fcxxVo.getFcid());
							nodeVo.setDm("_NULL_");
							nodeVo.setMc(fcxxVo.getFchm());
							nodeVo.setNid(fcxxVo.getFcid());
							nodeVo.setPid(StringUtils.isBlank(fcxxVo.getDyid()) ? fcxxVo.getLyid() : fcxxVo.getDyid()); // 不在单元下就是默认在楼宇下
							nodeVo.setType("fc");
							nodeVo.setYxbj(fcxxVo.getFczt());
							nodeVo.setPlxh(fcxxVo.getPlxh());
							HashMap<String, Object> ext = new HashMap<String, Object>();
							ext.put("slzt", fcxxVo.getSlzt());
							ext.put("rzzt", fcxxVo.getRzzt());
							// ext.put("zxzt", fcxxVo.getZxzt());
							// ext.put("cszt", fcxxVo.getCszt());
							ext.put("zlzt", fcxxVo.getZlzt());
							// ext.put("fczt", fcxxVo.getFczt());
							// ext.put("czzt", fcxxVo.getCzzt());
							nodeVo.setExt(ext); // 所有的状态信息（或其他信息）放在扩展map中，用于生成树时显示当前房产的状态
							list5.add(nodeVo);
						}
						
						if (range >= 55) {
							conditions.clear();
							for (SfFcxxTreeNodeVo nodeVo : list5) {
								conditions.add("'" + nodeVo.getId() + "'");
							}
							String fcxxStr = String.join(",", conditions);
							String sql6 = "select khid id, '_NULL_' dm, khmc mc, khlxdm sub, khid nid, fcid pid, 'kh' type, yxbj from t_wg_kh_khxx where fcid in ("
									+ fcxxStr + ") and yxbj in (" + yxbj + ") order by fcid, khlxdm, khmc";
							list6 = this.dao.findBySQL(sql6, SfFcxxTreeNodeVo.class);
							if (list6 != null) {
								for (SfFcxxTreeNodeVo nodeVo5 : list5) {
									for (SfFcxxTreeNodeVo nodeVo6 : list6) {
										if (nodeVo6.getPid().equals(nodeVo5.getId())) { // 找到房产第一个对应客户即退出
											nodeVo5.setSub(nodeVo6.getMc()); // 把客户名称作为上级节点（即房产节点）的副名称，生成树时副名称显示在名称后面
											break;
										}
									}
								}
								if (range >= 60) { // 客户级范围大于等于60 
									for (SfFcxxTreeNodeVo nodeVo6 : list6) {
										nodeVo6.setPlxh(1); // hibernate 不支持直接在select中以数字为列，故手动设置
									}
								}
							}
						}
					}
				}
				
			}
			if (list2 != null)
				list.addAll(list2);
			if (list3 != null)
				list.addAll(list3);
			if (list4 != null)
				list.addAll(list4);
			if (list5 != null)
				list.addAll(list5);
			if (list6 != null)
				list.addAll(list6);
		}

		return list;
	}

	/**
	 * 用于前端ajax查询时返回下级所有节点
	 * @param fcxxTreeNodeVo
	 * @param mode 完全或轻量 full lite (默认是lite), 完全时结果包含无效的节点
	 * @param range 范围对应房产5级加上客户总共6级，10，20，30，40，50，60
	 * @return
	 */
	public List<SfFcxxTreeNodeVo> getFcxxTreeNode(SfFcxxTreeNodeVo fcxxTreeNodeVo, String mode, int range) {
		List<SfFcxxTreeNodeVo> list = null;

		if (fcxxTreeNodeVo.getType().equals("ly")) { // 查询节点的下级节点，当前只用于楼宇节点ajax查询
			String yxbj = "full".equalsIgnoreCase(mode) ? "'0', '1'" : "'1'";

			ArrayList<Object> params = new ArrayList<Object>();
			params.add(fcxxTreeNodeVo.getId());

			String sql1 = "select a.dyid id, '_NULL_' dm, a.dymc mc, a.dyid nid, a.lyid pid, 'dy' type, a.yxbj, a.plxh "
					+ "from t_wg_fc_dy a where a.lyid=? and a.yxbj in (" + yxbj + ") order by a.plxh";
			list = this.dao.findBySQL(sql1, params, SfFcxxTreeNodeVo.class);

			String sql2 = "select a.* from t_wg_fc_fcxx a where a.lyid=? and a.fczt in (" + yxbj + ") order by a.plxh";
			List<FcFcxxVo> list1 = this.dao.findBySQL(sql2, params, FcFcxxVo.class);
			if (list1 != null && list1.size() > 0) {
				List<SfFcxxTreeNodeVo> list2 = new ArrayList<SfFcxxTreeNodeVo>();
				for (FcFcxxVo fcxxVo : list1) {
					SfFcxxTreeNodeVo nodeVo = new SfFcxxTreeNodeVo();
					nodeVo.setId(fcxxVo.getFcid());
					nodeVo.setDm("_NULL_");
					nodeVo.setMc(fcxxVo.getFchm());
					nodeVo.setNid(fcxxVo.getFcid());
					nodeVo.setPid(StringUtils.isBlank(fcxxVo.getDyid()) ? fcxxTreeNodeVo.getId() : fcxxVo.getDyid()); // 不在单元下就是默认在楼宇下
					nodeVo.setType("fc");
					nodeVo.setYxbj(fcxxVo.getFczt());
					nodeVo.setPlxh(fcxxVo.getPlxh());
					HashMap<String, Object> ext = new HashMap<String, Object>();
					ext.put("slzt", fcxxVo.getSlzt());
					ext.put("rzzt", fcxxVo.getRzzt());
					// ext.put("zxzt", fcxxVo.getZxzt());
					// ext.put("cszt", fcxxVo.getCszt());
					ext.put("zlzt", fcxxVo.getZlzt());
					// ext.put("fczt", fcxxVo.getFczt());
					// ext.put("czzt", fcxxVo.getCzzt());
					nodeVo.setExt(ext); // 所有的状态信息（或其他信息）放在扩展map中，用于生成树时显示当前房产的状态
					list2.add(nodeVo);
				}
				list.addAll(list2);

				if (range >= 55) { // 55表示在房产一级需要带上相应客户信息；查询房产第一个客户名称 - 分开查询 ，减少复杂度和提高性能
					List<String> conditions = new ArrayList<String>();
					conditions.clear();
					for (SfFcxxTreeNodeVo nodeVo : list2) {
						conditions.add("'" + nodeVo.getId() + "'");
					}
					String sql3 = "select khid id, '_NULL_' dm, khmc mc, khlxdm sub, khid nid, fcid pid, 'kh' type, yxbj from t_wg_kh_khxx where fcid in ("
							+ String.join(",", conditions) + ") and yxbj in (" + yxbj + ") order by fcid, khlxdm, khmc";
					List<SfFcxxTreeNodeVo> list3 = this.dao.findBySQL(sql3, SfFcxxTreeNodeVo.class);
					if (list3 != null) {
						for (SfFcxxTreeNodeVo nodeVo2 : list2) {
							for (SfFcxxTreeNodeVo nodeVo3 : list3) {
								if (nodeVo3.getPid().equals(nodeVo2.getId())) { // 找到房产第一个对应客户即退出
									nodeVo2.setSub(nodeVo3.getMc()); // 把客户名称作为上级节点（即房产节点）的副名称，生成树时副名称显示在名称后面
									break;
								}
							}
						}
						if (range >= 60) { // 客户级范围大于等于60 
							for (SfFcxxTreeNodeVo nodeVo3 : list3) {
								nodeVo3.setPlxh(1); // hibernate 不支持直接在select中以数字为列，故手动设置
							}
							list.addAll(list3);
						}
					}
				}
			}
		}
		return list;
	}

	public Object getSpInfo(SfFcxxTreeNodeVo fcxxTreeNodeVo) {
		Object ret = null;
		if (fcxxTreeNodeVo.getType().equals("sq")) {
			ArrayList<Object> params = new ArrayList<Object>();
			params.add(fcxxTreeNodeVo.getId());
			String sql = "select a.* from t_wg_xt_jgxx a where a.sqid=?";
			List<WgjgVo> list = this.dao.findBySQL(sql, params, WgjgVo.class);
			if (list != null && list.size() > 0)
				ret = list.get(0);
		}
		if (fcxxTreeNodeVo.getType().equals("qy")) {
			ArrayList<Object> params = new ArrayList<Object>();
			params.add(fcxxTreeNodeVo.getId());
			String sql = "select a.* from t_wg_fc_qy a where a.qyid=?";
			List<FcqyVo> list = this.dao.findBySQL(sql, params, FcqyVo.class);
			if (list != null && list.size() > 0)
				ret = list.get(0);
		}
		if (fcxxTreeNodeVo.getType().equals("ly")) {
			ArrayList<Object> params = new ArrayList<Object>();
			params.add(fcxxTreeNodeVo.getId());
			String sql = "select a.* from t_wg_fc_ly a where a.lyid=?";
			List<FclyVo> list = this.dao.findBySQL(sql, params, FclyVo.class);
			if (list != null && list.size() > 0)
				ret = list.get(0);
		}
		if (fcxxTreeNodeVo.getType().equals("dy")) {
			ArrayList<Object> params = new ArrayList<Object>();
			params.add(fcxxTreeNodeVo.getId());
			String sql = "select a.* from t_wg_fc_dy a where a.dyid=?";
			List<FcdyVo> list = this.dao.findBySQL(sql, params, FcdyVo.class);
			if (list != null && list.size() > 0)
				ret = list.get(0);
		}
		if (fcxxTreeNodeVo.getType().equals("fc")) {
			ArrayList<Object> params = new ArrayList<Object>();
			params.add(fcxxTreeNodeVo.getId());
			String sql = "select a.* from t_wg_fc_fcxx a where a.fcid=?";
			List<FcFcxxVo> list = this.dao.findBySQL(sql, params, FcFcxxVo.class);
			if (list != null && list.size() > 0)
				ret = list.get(0);
		}
		return ret;
	}

	public void del(SfFcxxTreeNodeVo fcxxTreeVo) throws Exception {
		ArrayList<String> params = new ArrayList<String>();
		params.add(fcxxTreeVo.getId());
		if (fcxxTreeVo.getType().equals("qy")) {
			String sql = "select count(*) t from t_wg_fc_ly where qyid=? and yxbj='1'";
			if (this.dao.queryCount(sql, params) > 0) {
				throw new Exception("下级有数据，无法删除");
			} else {
				sql = "update t_wg_fc_qy a set a.yxbj='9' where a.qyid=?";
				this.dao.executeSql(sql, params);
			}
		} else if (fcxxTreeVo.getType().equals("ly")) {
			String sql = "select count(*) t from t_wg_fc_dy where lyid=? and yxbj='1'";
			if (this.dao.queryCount(sql, params) > 0) {
				throw new Exception("下级有数据，无法删除");
			} else {
				sql = "select count(*) t from t_wg_fc_fcxx where lyid=? and fczt='1'";
				if (this.dao.queryCount(sql, params) > 0) {
					throw new Exception("下级有数据，无法删除");
				} else {
					sql = "update t_wg_fc_ly a set a.yxbj='9' where a.lyid=?";
					this.dao.executeSql(sql, params);
				}
			}
		} else if (fcxxTreeVo.getType().equals("dy")) {
			String sql = "select count(*) t from t_wg_fc_fcxx where dyid=? and fczt='1'";
			if (this.dao.queryCount(sql, params) > 0) {
				throw new Exception("下级有数据，无法删除");
			} else {
				sql = "update t_wg_fc_dy a set a.yxbj='9' where a.dyid=?";
				this.dao.executeSql(sql, params);
			}
		} else if (fcxxTreeVo.getType().equals("fc")) {
			String sql = "update t_wg_fc_fcxx a set a.fczt='9' where a.fcid=?";
			this.dao.executeSql(sql, params);
		}
	}

	public List<SfFcxxTreeNodeVo> addQy(FcqyVo fcqyVo) throws Exception {
		ArrayList<String> params = new ArrayList<String>();
		params.add(fcqyVo.getSqdm());
		params.add(fcqyVo.getQymc());
		String sql = "select count(*) t from t_wg_fc_qy where sqdm=? and qymc=? and yxbj in ('0', '1')";
		if (this.dao.queryCount(sql, params) > 0) {
			throw new Exception("此名称已存在，请使用其他名称");
		}

		Integer plxh1 = fcqyVo.getPlxh();
		boolean plxhUpdated = plxh1 != null;
		if (plxhUpdated) {
			this.adjustPlxh("t_wg_fc_qy", "sqdm", fcqyVo.getSqdm(), plxh1);
		}

		TWgFcQy qy = new TWgFcQy();
		qy.setQyid(UUIDUtil.genId());
		qy.setSqdm(fcqyVo.getSqdm());
		qy.setQymc(fcqyVo.getQymc());
		qy.setPlxh(fcqyVo.getPlxh());
		qy.setYxbj(fcqyVo.getYxbj());
		qy.setLrry(fcqyVo.getLrry());
		qy.setLrsj(DateUtils.getCurTimestamp());
		this.dao.save(qy);

		List<SfFcxxTreeNodeVo> list = new ArrayList<SfFcxxTreeNodeVo>(); // 返回树节点信息
		SfFcxxTreeNodeVo vo = new SfFcxxTreeNodeVo();
		vo.setId(qy.getQyid());
		vo.setDm("_NULL_");
		vo.setMc(qy.getQymc());
		vo.setNid(qy.getQyid());
		vo.setPid(qy.getSqdm());
		vo.setType("qy");
		vo.setYxbj("1");
		vo.setPlxh(qy.getPlxh());
		list.add(vo);
		return list;
	}

	public List<SfFcxxTreeNodeVo> addLy(FclyVo fclyVo) throws Exception {
		ArrayList<String> params = new ArrayList<String>();
		params.add(fclyVo.getQyid());
		params.add(fclyVo.getLymc());
		String sql = "select count(*) t from t_wg_fc_ly where qyid=? and lymc=? and yxbj in ('0', '1')";
		if (this.dao.queryCount(sql, params) > 0) {
			throw new Exception("此名称已存在，请使用其他名称");
		}

		Integer plxh1 = fclyVo.getPlxh();
		boolean plxhUpdated = plxh1 != null;
		if (plxhUpdated) {
			this.adjustPlxh("t_wg_fc_ly", "qyid", fclyVo.getQyid(), plxh1);
		}

		TWgFcLy ly = new TWgFcLy();
		ly.setLyid(UUIDUtil.genId());
		ly.setQyid(fclyVo.getQyid());
		ly.setLymc(fclyVo.getLymc());
		ly.setPlxh(fclyVo.getPlxh());
		ly.setYxbj(fclyVo.getYxbj());
		ly.setLrry(fclyVo.getLrry());
		ly.setLrsj(DateUtils.getCurTimestamp());
		this.dao.save(ly);

		List<SfFcxxTreeNodeVo> list = new ArrayList<SfFcxxTreeNodeVo>(); // 返回树节点信息
		SfFcxxTreeNodeVo vo = new SfFcxxTreeNodeVo();
		vo.setId(ly.getLyid());
		vo.setDm("_NULL_");
		vo.setMc(ly.getLymc());
		vo.setNid(ly.getLyid());
		vo.setPid(ly.getQyid());
		vo.setType("ly");
		vo.setYxbj("1");
		vo.setPlxh(ly.getPlxh());
		list.add(vo);
		return list;
	}

	public List<SfFcxxTreeNodeVo> addDy(FcdyVo fcdyVo) throws Exception {
		ArrayList<String> params = new ArrayList<String>();
		params.add(fcdyVo.getLyid());
		params.add(fcdyVo.getDymc());
		String sql = "select count(*) t from t_wg_fc_dy where lyid=? and dymc=? and yxbj in ('0', '1')";
		if (this.dao.queryCount(sql, params) > 0) {
			throw new Exception("此名称已存在，请使用其他名称");
		}

		Integer plxh1 = fcdyVo.getPlxh();
		boolean plxhUpdated = plxh1 != null;
		if (plxhUpdated) {
			this.adjustPlxh("t_wg_fc_dy", "lyid", fcdyVo.getLyid(), plxh1);
		}

		TWgFcDy dy = new TWgFcDy();
		dy.setDyid(UUIDUtil.genId());
		dy.setLyid(fcdyVo.getLyid());
		dy.setDymc(fcdyVo.getDymc());
		dy.setPlxh(fcdyVo.getPlxh());
		dy.setYxbj(fcdyVo.getYxbj());
		dy.setLrry(fcdyVo.getLrry());
		dy.setLrsj(DateUtils.getCurTimestamp());
		this.dao.save(dy);

		List<SfFcxxTreeNodeVo> list = new ArrayList<SfFcxxTreeNodeVo>(); // 返回树节点信息
		SfFcxxTreeNodeVo vo = new SfFcxxTreeNodeVo();
		vo.setId(dy.getDyid());
		vo.setDm("_NULL_");
		vo.setMc(dy.getDymc());
		vo.setNid(dy.getDyid());
		vo.setPid(dy.getLyid());
		vo.setType("dy");
		vo.setYxbj("1");
		vo.setPlxh(dy.getPlxh());
		list.add(vo);
		return list;
	}

	public List<SfFcxxTreeNodeVo> addFcxx(FcFcxxVo fcFcxxVo) throws Exception {
		ArrayList<String> params = new ArrayList<String>();
		String sql = null;
		if (StringUtils.isNotBlank(fcFcxxVo.getDyid())) { // 有单元id表示房产放在单元下，否则放在楼宇下
			params.add(fcFcxxVo.getDyid());
			params.add(fcFcxxVo.getFchm());
			sql = "select count(*) t from t_wg_fc_fcxx where dyid=? and fchm=? and fczt in ('0', '1')";
		} else {
			params.add(fcFcxxVo.getLyid());
			params.add(fcFcxxVo.getFchm());
			sql = "select count(*) t from t_wg_fc_fcxx where lyid=? and fchm=? and fczt in ('0', '1')";
		}
		if (this.dao.queryCount(sql, params) > 0) {
			throw new Exception("此名称已存在，请使用其他名称");
		}

		Integer plxh1 = fcFcxxVo.getPlxh();
		boolean plxhUpdated = plxh1 != null;
		if (plxhUpdated) {
			if (StringUtils.isNotBlank(fcFcxxVo.getDyid()))
				this.adjustPlxh("t_wg_fc_fcxx", "dyid", fcFcxxVo.getDyid(), plxh1);
			else
				this.adjustPlxh("t_wg_fc_fcxx", "lyid", fcFcxxVo.getLyid(), plxh1);
		}

		TWgFcFcxx fc = new TWgFcFcxx();
		fc.setFcid(UUIDUtil.genId());
		fc.setSqdm(fcFcxxVo.getSqdm());
		fc.setQyid(fcFcxxVo.getQyid());
		fc.setLyid(fcFcxxVo.getLyid());
		fc.setDyid(fcFcxxVo.getDyid());
		fc.setFchm(fcFcxxVo.getFchm());
		fc.setFcmc(fcFcxxVo.getFcmc());
		fc.setLcdm(fcFcxxVo.getLcdm());
		fc.setJzmj(fcFcxxVo.getJzmj());
		fc.setTnmj(fcFcxxVo.getTnmj());
		fc.setSlzt(fcFcxxVo.getSlzt());
		if (fcFcxxVo.getSlrq() != null)
			fc.setSlrq(fcFcxxVo.getSlrq());
		fc.setRzzt(fcFcxxVo.getRzzt());
		if (fcFcxxVo.getRzrq() != null)
			fc.setRzrq(fcFcxxVo.getRzrq());
		fc.setZxzt(fcFcxxVo.getZxzt());
		if (fcFcxxVo.getZxrq() != null)
			fc.setZxrq(fcFcxxVo.getZxrq());

		fc.setCszt(fcFcxxVo.getCszt());
		fc.setFczt(fcFcxxVo.getFczt());
		fc.setZlzt(fcFcxxVo.getZlzt());
		fc.setCzzt(fcFcxxVo.getCzzt());
		fc.setPlxh(fcFcxxVo.getPlxh());
		if (StringUtils.isNotBlank(fcFcxxVo.getSshxdm()))
			fc.setSshxdm(fcFcxxVo.getSshxdm());
		if (StringUtils.isNotBlank(fcFcxxVo.getCxdm()))
			fc.setCxdm(fcFcxxVo.getCxdm());
		if (StringUtils.isNotBlank(fcFcxxVo.getFclxdm()))
			fc.setFclxdm(fcFcxxVo.getFclxdm());
		if (StringUtils.isNotBlank(fcFcxxVo.getFcxzdm()))
			fc.setFcxzdm(fcFcxxVo.getFcxzdm());
		fc.setBz(fcFcxxVo.getBz());

		fc.setLrry(fcFcxxVo.getLrry());
		fc.setLrsj(DateUtils.getCurTimestamp());
		this.dao.save(fc);

		List<SfFcxxTreeNodeVo> list = new ArrayList<SfFcxxTreeNodeVo>(); // 返回树节点信息
		SfFcxxTreeNodeVo vo = new SfFcxxTreeNodeVo();
		vo.setId(fc.getFcid());
		vo.setDm("_NULL_");
		vo.setMc(fc.getFchm());
		vo.setNid(fc.getFcid());
		vo.setPid(StringUtils.isNotBlank(fc.getDyid()) ? fc.getDyid() : fc.getLyid());
		vo.setType("fc");
		vo.setYxbj("1");
		vo.setPlxh(fc.getPlxh());

		HashMap<String, Object> ext = new HashMap<String, Object>(); // 与ajax获取treenode一样，返回房产状态信息，生成树节点时显示
		ext.put("slzt", fcFcxxVo.getSlzt());
		ext.put("rzzt", fcFcxxVo.getRzzt());
		// ext.put("zxzt", fcFcxxVo.getZxzt());
		// ext.put("cszt", fcFcxxVo.getCszt());
		ext.put("zlzt", fcFcxxVo.getZlzt());
		// ext.put("fczt", fcFcxxVo.getFczt());
		// ext.put("czzt", fcFcxxVo.getCzzt());
		vo.setExt(ext); // 所有的状态信息（或其他信息）放在扩展map中，用于生成树时显示当前房产的状态

		list.add(vo);
		return list;
	}

	public void updateQy(FcqyVo fcqyVo) throws Exception {
		ArrayList<String> params0 = new ArrayList<String>();
		params0.add(fcqyVo.getSqdm());
		params0.add(fcqyVo.getQyid());
		params0.add(fcqyVo.getQymc());
		String sql = "select count(*) t from t_wg_fc_qy where sqdm=? and qyid!=? and qymc=? and yxbj in ('0', '1')";
		if (this.dao.queryCount(sql, params0) > 0) {
			throw new Exception("此名称已存在，请使用其他名称");
		}

		TWgFcQy qy = (TWgFcQy) this.dao.get(TWgFcQy.class, fcqyVo.getQyid());
		Integer plxh0 = qy.getPlxh(), plxh1 = fcqyVo.getPlxh();
		boolean plxhUpdated = plxh1 != null && (plxh0 == null || plxh0.intValue() != plxh1.intValue());
		if (plxhUpdated) {
			this.adjustPlxh("t_wg_fc_qy", "sqdm", qy.getSqdm(), plxh1);
		}

		String mc0 = qy.getQymc(), mc1 = fcqyVo.getQymc();
		boolean mcUpdated = !mc0.equals(mc1);
		qy.setQymc(mc1);
		qy.setPlxh(fcqyVo.getPlxh());
		qy.setYxbj(fcqyVo.getYxbj());
		qy.setXgry(fcqyVo.getXgry());
		qy.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(qy);
		if (mcUpdated) {
			ArrayList<Object> params = new ArrayList<Object>();
			params.add(fcqyVo.getQyid());
			String sql1 = "select a.lyid id from t_wg_fc_ly a where a.qyid=?";
			List<SfFcxxTreeNodeVo> list1 = this.dao.findBySQL(sql1, params, SfFcxxTreeNodeVo.class);

			if (list1 != null && list1.size() > 0) {
				params.clear();
				params.add(">" + mc0 + ">");
				params.add(">" + mc1 + ">");
				params.add(fcqyVo.getQyid());
				String sql3 = "update t_wg_fc_fcxx a set a.fcmc=replace(a.fcmc,?,?) where a.qyid=?";
				this.dao.executeSql(sql3, params);
				/*
				 * List<String> conditions =new ArrayList<String>(); for (SfFcxxTreeNodeVo vo:
				 * list1) { conditions.add("'"+vo.getId()+"'"); } String sql2 =
				 * "select a.dyid id from t_wg_fc_dy a where a.lyid in ("+ String.join(",",
				 * conditions) +")"; List<SfFcxxTreeNodeVo> list2 = this.dao.findBySQL(sql2,
				 * SfFcxxTreeNodeVo.class);
				 * 
				 * params.clear(); params.add(">"+mc0+">"); params.add(">"+mc1+">"); for
				 * (SfFcxxTreeNodeVo vo: list2) { conditions.add("'"+vo.getId()+"'"); } String
				 * sql3 =
				 * "update t_wg_fc_fcxx a set a.fcmc=replace(a.fcmc,?,?) where a.lydyid in ("+
				 * String.join(",", conditions) +")"; this.dao.executeSql(sql3, params);
				 */
			}
		}
	}

	public void updateLy(FclyVo fclyVo) throws Exception {
		ArrayList<String> params0 = new ArrayList<String>();
		params0.add(fclyVo.getQyid());
		params0.add(fclyVo.getLyid());
		params0.add(fclyVo.getLymc());
		String sql = "select count(*) t from t_wg_fc_ly where qyid=? and lyid!=? and lymc=? and yxbj in ('0', '1')";
		if (this.dao.queryCount(sql, params0) > 0) {
			throw new Exception("此名称已存在，请使用其他名称");
		}

		TWgFcLy ly = (TWgFcLy) this.dao.get(TWgFcLy.class, fclyVo.getLyid());
		Integer plxh0 = ly.getPlxh(), plxh1 = fclyVo.getPlxh();
		boolean plxhUpdated = plxh1 != null && (plxh0 == null || plxh0.intValue() != plxh1.intValue());
		if (plxhUpdated) {
			this.adjustPlxh("t_wg_fc_ly", "qyid", ly.getQyid(), plxh1);
		}

		String mc0 = ly.getLymc(), mc1 = fclyVo.getLymc();
		boolean mcUpdated = !mc0.equals(mc1);
		ly.setLymc(mc1);
		ly.setPlxh(fclyVo.getPlxh());
		ly.setYxbj(fclyVo.getYxbj());
		ly.setXgry(fclyVo.getXgry());
		ly.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(ly);
		if (mcUpdated) {
			ArrayList<Object> params = new ArrayList<Object>();
			params.add(">" + mc0 + ">");
			params.add(">" + mc1 + ">");
			params.add(fclyVo.getLyid());
			String sql2 = "update t_wg_fc_fcxx a set a.fcmc=replace(a.fcmc,?,?) where a.lyid=?";
			this.dao.executeSql(sql2, params);
			/*
			 * ArrayList<Object> params = new ArrayList<Object>();
			 * params.add(fclyVo.getLyid()); String sql1 =
			 * "select a.dyid id from t_wg_fc_dy a where a.lyid=?"; List<SfFcxxTreeNodeVo>
			 * list1 = this.dao.findBySQL(sql1, params, SfFcxxTreeNodeVo.class);
			 * 
			 * params.clear(); params.add(">"+mc0+">"); params.add(">"+mc1+">");
			 * List<String> conditions =new ArrayList<String>();
			 * conditions.add("'"+fclyVo.getLyid()+"'"); for (SfFcxxTreeNodeVo vo: list1) {
			 * conditions.add("'"+vo.getId()+"'"); } String sql2 =
			 * "update t_wg_fc_fcxx a set a.fcmc=replace(a.fcmc,?,?) where a.lydyid in ("+
			 * String.join(",", conditions) +")"; this.dao.executeSql(sql2, params);
			 */
		}
	}

	public void updateDy(FcdyVo fcdyVo) throws Exception {
		ArrayList<String> params0 = new ArrayList<String>();
		params0.add(fcdyVo.getLyid());
		params0.add(fcdyVo.getDyid());
		params0.add(fcdyVo.getDymc());
		String sql = "select count(*) t from t_wg_fc_dy where lyid=? and dyid!=? and dymc=? and yxbj in ('0', '1')";
		if (this.dao.queryCount(sql, params0) > 0) {
			throw new Exception("此名称已存在，请使用其他名称");
		}

		TWgFcDy dy = (TWgFcDy) this.dao.get(TWgFcDy.class, fcdyVo.getDyid());
		Integer plxh0 = dy.getPlxh(), plxh1 = fcdyVo.getPlxh();
		boolean plxhUpdated = plxh1 != null && (plxh0 == null || plxh0.intValue() != plxh1.intValue());
		if (plxhUpdated) {
			this.adjustPlxh("t_wg_fc_dy", "lyid", dy.getLyid(), plxh1);
		}

		String mc0 = dy.getDymc(), mc1 = fcdyVo.getDymc();
		boolean mcUpdated = !mc0.equals(mc1);
		dy.setDymc(mc1);
		dy.setPlxh(fcdyVo.getPlxh());
		dy.setYxbj(fcdyVo.getYxbj());
		dy.setXgry(fcdyVo.getXgry());
		dy.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(dy);
		if (mcUpdated) {
			ArrayList<Object> params = new ArrayList<Object>();
			params.add(">" + mc0 + ">");
			params.add(">" + mc1 + ">");
			params.add(fcdyVo.getDyid());
			String sql1 = "update t_wg_fc_fcxx a set a.fcmc=replace(a.fcmc,?,?) where a.dyid=?";
			this.dao.executeSql(sql1, params);
			/*
			 * ArrayList<Object> params = new ArrayList<Object>(); params.add(">"+mc0+">");
			 * params.add(">"+mc1+">"); params.add(fcdyVo.getDyid()); String sql1 =
			 * "update t_wg_fc_fcxx a set a.fcmc=replace(a.fcmc,?,?) where a.lydyid=?";
			 * this.dao.executeSql(sql1, params);
			 */
		}
	}

	public void updateFcxx(FcFcxxVo fcFcxxVo) throws Exception {
		ArrayList<String> params0 = new ArrayList<String>();
		String sql = null;
		if (StringUtils.isNotBlank(fcFcxxVo.getDyid())) { // 有单元id表示房产放在单元下，否则放在楼宇下
			params0.add(fcFcxxVo.getDyid());
			params0.add(fcFcxxVo.getFcid());
			params0.add(fcFcxxVo.getFchm());
			sql = "select count(*) t from t_wg_fc_fcxx where dyid=? and fcid!=? and fchm=? and fczt in ('0', '1')";
		} else {
			params0.add(fcFcxxVo.getLyid());
			params0.add(fcFcxxVo.getFcid());
			params0.add(fcFcxxVo.getFchm());
			sql = "select count(*) t from t_wg_fc_fcxx where lyid=? and fcid!=? and fchm=? and fczt in ('0', '1')";
		}
		if (this.dao.queryCount(sql, params0) > 0) {
			throw new Exception("此名称已存在，请使用其他名称");
		}

		TWgFcFcxx fc = (TWgFcFcxx) this.dao.get(TWgFcFcxx.class, fcFcxxVo.getFcid());
		Integer plxh0 = fc.getPlxh(), plxh1 = fcFcxxVo.getPlxh();
		boolean plxhUpdated = plxh1 != null && (plxh0 == null || plxh0.intValue() != plxh1.intValue());
		if (plxhUpdated) {
			if (StringUtils.isNotBlank(fcFcxxVo.getDyid()))
				this.adjustPlxh("t_wg_fc_fcxx", "dyid", fc.getDyid(), plxh1);
			else
				this.adjustPlxh("t_wg_fc_fcxx", "lyid", fc.getLyid(), plxh1);
		}

		fc.setFchm(fcFcxxVo.getFchm());
		fc.setFcmc(fcFcxxVo.getFcmc());
		fc.setLcdm(fcFcxxVo.getLcdm());
		fc.setJzmj(fcFcxxVo.getJzmj());
		fc.setTnmj(fcFcxxVo.getTnmj());
		fc.setSlzt(fcFcxxVo.getSlzt());
		if (fcFcxxVo.getSlrq() != null)
			fc.setSlrq(fcFcxxVo.getSlrq());
		fc.setRzzt(fcFcxxVo.getRzzt());
		if (fcFcxxVo.getRzrq() != null)
			fc.setRzrq(fcFcxxVo.getRzrq());
		fc.setZxzt(fcFcxxVo.getZxzt());
		if (fcFcxxVo.getZxrq() != null)
			fc.setZxrq(fcFcxxVo.getZxrq());

		fc.setCszt(fcFcxxVo.getCszt());
		fc.setFczt(fcFcxxVo.getFczt());
		fc.setZlzt(fcFcxxVo.getZlzt());
		fc.setCzzt(fcFcxxVo.getCzzt());
		fc.setPlxh(fcFcxxVo.getPlxh());
		if (StringUtils.isNotBlank(fcFcxxVo.getSshxdm()))
			fc.setSshxdm(fcFcxxVo.getSshxdm());
		if (StringUtils.isNotBlank(fcFcxxVo.getCxdm()))
			fc.setCxdm(fcFcxxVo.getCxdm());
		if (StringUtils.isNotBlank(fcFcxxVo.getFclxdm()))
			fc.setFclxdm(fcFcxxVo.getFclxdm());
		if (StringUtils.isNotBlank(fcFcxxVo.getFcxzdm()))
			fc.setFcxzdm(fcFcxxVo.getFcxzdm());
		fc.setBz(fcFcxxVo.getBz());

		fc.setXgry(fcFcxxVo.getXgry());
		fc.setXgsj(DateUtils.getCurTimestamp());
		this.dao.update(fc);
	}

	/**
	 * 根据实际调整需要被调整节点的排列序号
	 * 
	 * @param t
	 * @param f
	 * @param id
	 * @param plxh
	 */
	private void adjustPlxh(String t, String f, String id, Integer plxh) {
		ArrayList<Object> params = new ArrayList<Object>();
		params.add(id);
		params.add(plxh);
		String sql = String.format("select plxh from %s where %s=? and plxh>=? and %s in ('0', '1') order by plxh", t,
				f, t.equals("t_wg_fc_fcxx") ? "fczt" : "yxbj");
		List<SfFcxxTreeNodeVo> list = this.dao.findBySQL(sql, params, SfFcxxTreeNodeVo.class);
		if (list != null && list.size() > 0) {
			if (list.get(0).getPlxh().intValue() <= plxh.intValue()) { // 第一个节点的序号不大于当前节点序号时，表示有需要调整的节点序号
				int index = plxh.intValue();
				for (int i = 0; i < list.size(); i++) { // 找到最后一个需要加1的排列序号
					if (list.get(i).getPlxh().intValue() > index + 1) {
						break;
					} else {
						index = list.get(i).getPlxh().intValue();
					}
				}
				int start = plxh.intValue(), end = index;
				params.clear();
				params.add(id);
				params.add(start);
				params.add(end);
				sql = String.format(
						"update %s a set a.plxh=a.plxh+1 where a.%s=? and a.plxh>=? and a.plxh<=? and a.%s in ('0', '1')",
						t, f, t.equals("t_wg_fc_fcxx") ? "fczt" : "yxbj");
				this.dao.executeSql(sql, params);
			}
		}
	}
}
