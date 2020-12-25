$(function(){
	$('.page-title .back').click(function(e){
		window.history.back();
	});
	$('.page-title .home').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	
	$('.page-action-bar .btn[data-cmd=pay]').click(function(e){
		pay(this);
	});
	
	getWjMx();
});

function pay(el) {
	if (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1') { //用于本地展示之用
		CxCtrl.alert('本地不能发起支付');
	} else {
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/pay/unifiedorder'),
		    type: "GET",
		    data: {fcid: CxMisc.qs.get('fcid'), sqdm: CxMisc.qs.get('sqdm'), ywlx: 1},
		    beforeSend: function(xhr, cfg) {
		    	CxMisc.markAjaxStart($(el));
		    },
		    success: function(res, ts) {
		    	if (res.code == "0" && res.data) {
		    		function _onBridgeReady() {
		    			WeixinJSBridge.invoke(
	    					'getBrandWCPayRequest', {
	    						"appId": res.data.appId,
	    						"timeStamp": res.data.timeStamp,
	    						"nonceStr":res.data.nonceStr,
	    						"package":res.data['package'],
	    						"signType":res.data.signType,
	    						"paySign":res.data.paySign
	    					}, function(res) {
		    					if (res.err_msg == "get_brand_wcpay_request:ok") {
		    						CxMisc.markAjaxEnd($(el));
		    						CxNotifier.produce('支付成功');
		    						window.location.href = document.referrer; // 确保刷新页面
		    						//window.history.back();
		    					} else {
		    						CxMisc.markAjaxEnd($(el));
		    						CxCtrl.confirm('未检测到支付成功<br>如非手动取消，请检查已缴费用', function(){
		    							$('.page-action-bar .btn[data-cmd=pay]').click();
		    						}, function(){
		    							window.location.href = document.referrer;
		    							//window.history.back();
		    						}, {
		    							btn:["返回到未缴费用", "再次发起支付"]
		    						});
		    					}
		    			}); 
		    		}
	    			if (typeof WeixinJSBridge == "undefined"){
	    			   if ( document.addEventListener ) {
	    			       document.addEventListener('WeixinJSBridgeReady', _onBridgeReady, false);
	    			   } else if (document.attachEvent) {
	    			       document.attachEvent('WeixinJSBridgeReady', _onBridgeReady); 
	    			       document.attachEvent('onWeixinJSBridgeReady', _onBridgeReady);
	    			   }
	    			} else {
	    			   _onBridgeReady();
	    			}
		    	} else {
		    		CxMisc.markAjaxEnd($(el));
		    		CxCtrl.alert('发起支付失败：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	CxMisc.markAjaxEnd($(el));
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxCtrl.alert('发起支付失败：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	// CxMisc.markAjaxEnd($(el));
	        }
		});
	}
}

function getWjMx() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/jf/getWjfymx'),
	    type: "GET",
	    data: {fcid: CxMisc.qs.get('fcid')},
	    beforeSend: function(xhr, cfg) {
	    	$('.page-body').mask('show');
	    	$('.page-action-bar button[data-cmd=pay]')[0].disabled = true;
	    },
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
    			if (res.data && res.data.length>0) {
    				let smry = $('.jf-mx-smry'), wrap = $('.jf-mx-wrapper'), sum=0;
    				let zdys = [];
    				for (let i=0; i<res.data.length; i++) {
    					if (!zdys.includes(res.data[i].sfzdy)) zdys.push(res.data[i].sfzdy);
    				}
    				for (let i=0; i<zdys.length; i++) {
    					let zdymxs = [], subsum=0;
    					for (let j=0; j<res.data.length; j++) {
    						if (zdys[i] == res.data[j].sfzdy) {
    							sum += res.data[j].fyje;
    							subsum += res.data[j].fyje;
    							zdymxs.push(res.data[j]);
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
    							subMx = `<div class="${hasSubMx?'':'d-none'}">说明：${fy.sfsm}</div>`;
    						}
    						let subMxClzEx = hasSubMx ? ' text-black-50' : ' d-none';
    						mxs.push(`<div class="row no-gutters">
								 		<div class="col-8 cx-d-flex-start pb-1"><span>${fy.sfxmmc?fy.sfxmmc:'-'}</span><button type="button" class="btn btn-link px-1 py-0${subMxClzEx}" style="text-decoration:none;" data-cmd="toggle-more"><i class="fas fa-angle-down"></i></button></div>
								 		<div class="col-4 text-right"><span class="cx-price muted">${fy.fyje!==null?fy.fyje.toFixed(2):'-'}</span></div>
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
    				smry.find('.jf-sum .cx-price').text(CxMisc.qs.get('wjzje'));
    				smry.find('.jf-sum-fee .cx-price').text(CxMisc.qs.get('sxfje'));
    				smry.find('.jf-sum-total .cx-price').text(CxMisc.qs.get('sjzje'));
    				$('.page-action-bar .jf-sum .cx-price').text(CxMisc.qs.get('sjzje'));
    			}
	    	} else {
	    		CxCtrl.alert('查询未缴费用失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询未缴费用失败：' + msg);
	    },
        complete: function(xhr, ts) {
        	$('.page-body').mask('hide');
        	$('.page-action-bar button[data-cmd=pay]')[0].disabled = false;
        }
	});
}