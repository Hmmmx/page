package cn.wg.core.service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ctp.core.service.BaseService;
import com.ctp.core.utils.DateUtils;
import com.ctp.core.utils.UUIDUtil;

import cn.wg.core.model.TWgHdSfbz;
import cn.wg.core.vo.FyscVo;
import cn.wg.core.vo.SfbzVo;
import common.Logger;

@Service
public class SfSckhfyscService extends BaseService{

	private static final Logger logger = Logger.getLogger(SfSckhfyscService.class);
	
	@SuppressWarnings("unchecked")
	public void saveScfy(FyscVo scvo)throws Exception{
		String jfrqq = scvo.getJfqsrq();
		String jfrqz = scvo.getJfjsrq();
		String sfbzid = scvo.getSfbzid();
		BigDecimal zje = scvo.getZje();
		String bz = scvo.getBz();
		String lrry = scvo.getLrry();
		TWgHdSfbz sfbz = (TWgHdSfbz)this.dao.get(TWgHdSfbz.class, sfbzid);
		Long jdz = Long.parseLong(sfbz.getJddm());
		String jfgs = sfbz.getJfgs();
		
		ArrayList<String> paramsjgsfxm = new ArrayList<String>();
		paramsjgsfxm.add(sfbz.getSfxmdm());
		paramsjgsfxm.add(sfbz.getSqdm());
		String sql = "select fylxdm from t_wg_hd_jgsfxm where sfxmdm = ? and sqdm = ? and yxbj = '1' ";
		List listfylxdm = this.dao.findBySQL(sql, paramsjgsfxm);
		String fylxdm = (String)listfylxdm.get(0);
		
		String jffsdm = sfbz.getJffsdm();
		String ysybj = sfbz.getYsybj();
		Integer ysysl = sfbz.getYsrsl();
		String ysrbj = sfbz.getYsrbj();
		Integer ysrsl = sfbz.getYsrsl();
		if(ysrsl == null)
			ysrsl = 0;
		Integer zdysl = sfbz.getZdysl();
		if(zdysl == null)
			zdysl = 0;
		String ysrqy = jfrqq;
		if("1".equals(ysrbj))
			ysrqy = jfrqz;
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date dt = sdf.parse(ysrqy);
		Calendar rightNow  =Calendar.getInstance();
		rightNow.setTime(dt);
		rightNow.add(Calendar.MONTH, ysysl);
		Date dt1 = rightNow.getTime();
		String ysrq = null;
		if("1".equals(ysrbj)) {
			Calendar c = Calendar.getInstance();
			c.setTime(dt1);
			c.set(Calendar.DAY_OF_MONTH,c.getActualMaximum(Calendar.DAY_OF_MONTH));
			ysrq = DateUtils.dateToString(c.getTime());
		}else {
			ysrq = DateUtils.dateToString(dt1).substring(0, 7) + "-" + ysrsl;
		}
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(sdf.parse(ysrq));
		cal.add(Calendar.MONTH, zdysl);
		Date dtcal = cal.getTime();
		String dtcalStr = DateUtils.dateToString(dtcal);
		String zdy = dtcalStr.substring(0, 7);
		String fyscid = UUIDUtil.genId();
		
		if("1".equals(fylxdm)) {
			this.dao.executeSql("");
		}
		
	}
}
