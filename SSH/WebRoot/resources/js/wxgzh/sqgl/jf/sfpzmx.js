$(function(){
	$('.page-title .back').click(function(e){
		window.history.back();
	});
	$('.page-title .home').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	
	getSfpzMx();
});

function getSfpzMx() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/jf/getSfmx'),
	    type: "GET",
	    data: {sfpzid: CxMisc.qs.get('sfpzid')},
	    beforeSend: function(xhr, cfg) {
	    	$('.page-body').mask('show');
	    },
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
    			if (res.data && res.data.length>0) {
    				let smry = $('.jf-mx-smry'), wrap = $('.jf-mx-wrapper'), sum=0;
    				let zdys = [];
    				for (let i=0; i<res.data.length; i++) {
    					if (res.data[i].sfzdy) {
    						if (!zdys.includes(res.data[i].sfzdy)) zdys.push(res.data[i].sfzdy);
    					} else { //预存没有账单月，取缴费日期
    						if (!zdys.includes(res.data[i].fsrq)) zdys.push(res.data[i].fsrq);
    					}
    				}
    				for (let i=0; i<zdys.length; i++) {
    					let zdymxs = [], subsum=0;
    					for (let j=0; j<res.data.length; j++) {
    						if (res.data[i].sfzdy) {
	    						if (zdys[i] == res.data[j].sfzdy) {
	    							sum += res.data[j].fyje;
	        						subsum += res.data[j].fyje;
	    							zdymxs.push(res.data[j]);
	    						}
    						} else { //预存没有账单月，取缴费金额
    							if (zdys[i] == res.data[j].fsrq) {
    								sum += res.data[j].fse;
        							subsum += res.data[j].fse;
        							zdymxs.push(res.data[j]);
    							}
    						}
    					}
    					let mxs = [];
    					for (let j=0; j<zdymxs.length; j++) {
    						let fy = zdymxs[j];
    						let hasSubMx = false, subMx = '';
    						if (fy.sfxmdm == '01') { // 物业管理费
    							hasSubMx = true;
    							subMx = `<div><span>${fy.sl?'数量/面积：'+fy.sl:'数量/面积：-'}${fy.dj?'，单价：'+fy.dj:'，单价：-'}${typeof fy.zk==='number'&&fy.zk!=1?'，折扣：'+(fy.zk*10).toFixed(1):''}</span></div>
										<div class="${fy.sfsm?'':'d-none'}">说明：${fy.sfsm?fy.sfsm:'-'}</div>`;
    						} else if (fy.sfxmdm == '02' || fy.sfxmdm == '25') { // 水费，电费
    							hasSubMx = true;
    							subMx = `<div><span>${fy.sqds?'上期读数：'+fy.sqds:'上期读数：-'}${fy.bqds?'，本期读数：'+fy.bqds:'，本期读数：-'}</span></div>
    									<div><span>${fy.sl?'用量：'+fy.sl:'用量：-'}${fy.dj?'，单价：'+fy.dj:'，单价：-'}${typeof fy.bl==='number'&&fy.bl!=1?'，倍率：'+fy.bl:''}</span></div>
    									<div class="${fy.sfsm?'':'d-none'}">说明：${fy.sfsm?fy.sfsm:'-'}</div>`;
    						} else {
    							hasSubMx = fy.sfsm !== null && fy.sfsm != '';
    							if (!fy.sfzdy && (fy.ysrq || fy.ysrz)) { //预存显示相应的周期
    								subMx = `<div>续费周期：${fy.ysrq?fy.ysrq:'未填写'} ~ ${fy.ysrz?fy.ysrz:'未填写'}</div>
    									<div class="${hasSubMx?'':'d-none'}">说明：${fy.sfsm}</div>`;
    								hasSubMx = true; //生成明细后再设置为true
    							} else subMx = `<div class="${hasSubMx?'':'d-none'}">说明：${fy.sfsm}</div>`;
    						}
    						let subMxClzEx = hasSubMx ? ' text-black-50' : ' d-none', fyje = fy.sfzdy ? fy.fyje : fy.fse; //预存没有账单月，取缴费金额
    						mxs.push(`<div class="row no-gutters">
								 		<div class="col-8 cx-d-flex-start pb-1"><span>${fy.sfxmmc?fy.sfxmmc:'-'}</span><button type="button" class="btn btn-link px-1 py-0${subMxClzEx}" style="text-decoration:none;" data-cmd="toggle-more"><i class="fas fa-angle-down"></i></button></div>
								 		<div class="col-4 text-right"><span class="cx-price muted">${fyje!==null?fyje.toFixed(2):'-'}</span></div>
								 		<div class="col-12 pl-3 pb-1${subMxClzEx}" style="display:none;" data-f-name="more">${subMx}</div>
							 		</div>`);
    					}
    					wrap.append(`<div class="card">
								<div class="card-header"><i class="far fa-calendar-alt text-primary mr-1"></i><span>${zdys[i]}</span></div>
								<div class="card-body cx-f-xs">
									${mxs.join('')}
									<div class="row no-gutters border-top pt-1 mt-1">
								 		<div class="col jf-mx-item"><span>小计</span></div>
								 		<div class="col jf-mx-item text-right"><span class="cx-price cx-f-sm muted">${subsum.toFixed(2)}</span></div>
							 		</div>
								</div>
							</div>`);
    				}
    				wrap.find('button[data-cmd=toggle-more]').click(function(){
    					let self = this, icon = $(self).find('i');
    					if (icon.hasClass('fa-angle-down'))
	    					$(this).closest('.row').find('[data-f-name=more]').slideDown('fast', function(){ icon.removeClass('fa-angle-down').addClass('fa-angle-up'); });
    					else 
    						$(this).closest('.row').find('[data-f-name=more]').slideUp('fast', function(){ icon.removeClass('fa-angle-up').addClass('fa-angle-down'); });
    				});
    				smry.find('.jf-sq span').text(CxMisc.qs.get('sqmc'));
    				smry.find('.jf-fc span').text(CxMisc.qs.get('fcmc'));
    				smry.find('.jf-sum .cx-price').text(sum.toFixed(2));
    			}
	    	} else {
	    		CxCtrl.alert('查询已缴费用失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询已缴费用失败：' + msg);
	    },
        complete: function(xhr, ts) {
        	$('.page-body').mask('hide');
        }
	});
}