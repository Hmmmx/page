$(function(){
	$('.page-title .back').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	$('.page-title .home').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	
	
	$('.page-body .nav-tabs a[data-toggle=tab]').on('shown.bs.tab', function (e) {
		tabOpened(e.target);
	});
	
	$('.page-action-bar .btn[data-cmd="submit-yc"]').click(function(e){
		submitYc(e);
	});
	
	restoreStateOnPageLoad();
	CxNotifier.consume();
	
	
	$('#jf_pre form select[name=fcid]').change(function(){ getKhxx(this); });
	$('#jf_pre form select[name=fcid],#jf_pre form select[name=khid],#jf_pre form select[name=sfxmdm]').change(function(){ getKhckxx(this); });
	$('#jf_pre form select[name=fcid],#jf_pre form select[name=khckid],#jf_pre form select[name=xfys]').change(function(){ getYcJe(this); });
	getFc();
	getJgSfxm();
});

let gFirstLoad = true;
function restoreStateOnPageLoad(){
	let qs = CxMisc.qs.parse(CxMisc.qs.extract(window.location.href));
	if (qs.jflx !== undefined) 
		$(`.page-body .nav-tabs a[data-toggle=tab][data-category=${qs.jflx}]`).click();
	else 
		$('.page-body .nav-tabs .nav-item:first-child a[data-toggle=tab]').click();
}
function restoreStateAfterLoad(){
	if (gFirstLoad) {
		gFirstLoad = false;
		let jflx = document.querySelector('.page-body .nav-tabs a.active[data-toggle=tab]').getAttribute('data-category');
		let y = CxMisc.qs.get('y');
		if (y) setTimeout(function(){$(`#jf_${jflx}`).scrollTop(y);},400);
	}
}
function pushState() {
	var p = CxMisc.qs.parse(CxMisc.qs.extract(window.location.href));
	p.jflx = document.querySelector('.page-body .nav-tabs a.active[data-toggle=tab]').getAttribute('data-category');
	let y = parseInt($(`#jf_${p.jflx}`).scrollTop());
	if (y) p.y = y;
	else delete p.y;
	window.history.replaceState(null, document.title, "?" + CxMisc.qs.stringify(p));
}

function tabOpened(tab){
	let category = tab.getAttribute('data-category');
	if (category == 'pre') {
		$('.page-action-bar').removeClass('d-none');
	} else {
		$('.page-action-bar').addClass('d-none');
	}
	loadList(tab, category);
}

function loadList(tab, category) {
	if (!tab.getAttribute('data-loaded')) {
		if (category == 'due') {
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/gz/sqgl/jf/getWjfy'),
			    type: "GET",
			    data: {sqdm: CxMisc.qs.get('sqdm')},
			    beforeSend: function(xhr, cfg) {
			    	$('.page-body').mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		let wrap = $('#jf_due');
						wrap.children('.fy-item').remove();
		    			if (res.data && res.data.length>0) {
		    				for (let i=0; i<res.data.length; i++) {
		    					let fy = res.data[i];
		    					wrap.append(`<div class="card fy-item" data-id="${fy.fcid}">
										<div class="card-header"><i class="fas fa-city text-primary mr-1"></i><span class="fy-sqmc">${fy.sqmc?fy.sqmc:fy.fcmc.substring(0,fy.fcmc.indexOf('>'))}</span></div>
										<div class="card-body cx-f-xs">
											<p class="card-text icon-value-pair">
												<i class="fas fa-map-marked-alt fa-fw text-info mr-1"></i><span class="fy-fcmc">${fy.fcmc}</span>
											</p>
											<p class="card-text text-right">
												<span class="text-black-50">待缴金额</span><span class="cx-price cx-f-xl">${fy.wjzje?fy.wjzje.toFixed(2):'-'}</span>
											 	<span class="ml-2 cx-f-nm cx-gray-500"><i class="fas fa-angle-right"></i></span>
											</p>
										</div>
									</div>`);
		    					wrap.children(':last-child').attr('data-json', JSON.stringify(fy));
		    				}
		    				wrap.children('div.no-data').appendTo(wrap); // 把空白提示移动未尾
		    				wrap.find('.fy-item .card-body').click(function(e){
		    					let data = $(this).parent().data("json"),
		    						sqmc = encodeURIComponent($(this).parent().find('.card-header .fy-sqmc').text()),
		    						fcmc = encodeURIComponent($(this).find('.fy-fcmc').text()),
		    						fcid = data.fcid, wjzje = data.wjzje?data.wjzje.toFixed(2):0, sxfje = data.sxfje?data.sxfje.toFixed(2):0, sjzje = data.sjzje?data.sjzje.toFixed(2):0, 
		    						sqdm = CxMisc.qs.get('sqdm');
		    					pushState();
		    					window.location.href = CxMisc.finalizeUrl4Wx(`/gz/sqgl/jfmx?fcid=${fcid}&sqmc=${sqmc}&fcmc=${fcmc}&sqdm=${sqdm}&wjzje=${wjzje}&sxfje=${sxfje}&sjzje=${sjzje}`);
		    				});
		    			}
		    			restoreStateAfterLoad();
		    			tab.setAttribute('data-loaded', 'true');
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
		        }
			});
		} else if (category == 'done') {
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/gz/sqgl/jf/getSfpz'),
			    type: "GET",
			    data: {sqdm: CxMisc.qs.get('sqdm')},
			    beforeSend: function(xhr, cfg) {
			    	$('.page-body').mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		let wrap = $('#jf_done');
						wrap.children('.fy-item').remove();
		    			if (res.data && res.data.length>0) {
		    				for (let i=0; i<res.data.length; i++) {
		    					let fy = res.data[i];
		    					wrap.append(`<div class="card fy-item" data-id="${fy.sfpzid}">
										<div class="card-header cx-d-flex-between">
											<span><i class="fas fa-city text-primary mr-1"></i><span class="fy-sqmc">${fy.sqmc?fy.sqmc:fy.fcmc.substring(0,fy.fcmc.indexOf('>'))}</span></span>
											<span class="text-black-50 cx-f-xs">${fy.skrq?fy.skrq:''}</span>
										</div>
										<div class="card-body cx-f-xs">
											<p class="card-text icon-value-pair">
												<i class="fas fa-map-marked-alt fa-fw text-info mr-1"></i><span class="fy-fcmc">${fy.fcmc}</span>
											</p>
											<p class="card-text icon-value-pair">
												<i class="fas fa-file-invoice-dollar fa-fw text-info mr-1"></i><span>${fy.skfsmc?fy.skfsmc:'-'}${fy.pzlymc?(' ('+fy.pzlymc+')'):''}</span>
											</p>
											<p class="card-text text-right">
												<span class="text-black-50">已缴金额</span><span class="cx-price cx-f-xl">${fy.je!==null?fy.je.toFixed(2):'-'}</span>
											 	<span class="ml-2 cx-f-nm cx-gray-500"><i class="fas fa-angle-right"></i></span>
											</p>
										</div>
									</div>`);
		    				}
		    				wrap.children('div.no-data').appendTo(wrap); // 把空白提示移动未尾
		    				wrap.find('.fy-item .card-body').click(function(e){
		    					let sqmc = encodeURIComponent($(this).parent().find('.card-header .fy-sqmc').text());
		    						fcmc = encodeURIComponent($(this).find('.fy-fcmc').text()),
		    						sfpzid = $(this).parent().attr("data-id");
		    					pushState();
		    					window.location.href = CxMisc.finalizeUrl4Wx(`/gz/sqgl/jfsfpzmx?sfpzid=${sfpzid}&sqmc=${sqmc}&fcmc=${fcmc}`);
		    				});
		    			}
		    			restoreStateAfterLoad();
		    			tab.setAttribute('data-loaded', 'true');
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
	}
}

function getFc() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/getFc'),
	    type: "GET",
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
    			if (res.data && res.data.length>0) {
    				let el = document.querySelector('#jf_pre form').fcid, sqdm = CxMisc.qs.get('sqdm');
    				for (let i=0; i<res.data.length; i++) { // 只显示当前小区房产
    					if (res.data[i].sqdm == sqdm) el.options.add(new Option(res.data[i].fcmc, res.data[i].fcid));
    				}
    			}
	    	} else {
	    		CxCtrl.alert('查询用户绑定房产失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询用户绑定房产失败：' + msg);
	    }
	});
}
function getKhxx(fcid){
	let khid = fcid.form.khid;
	for (let i=khid.options.length-1; i>0; i--) khid.remove(i);
	
	if (fcid.value != '') {
		CxMisc.ajax({
	        url: CxMisc.finalizeUrl('/gz/sqgl/ycxx/getKhxx'),
	        type: "GET",
	        data: {fcid:fcid.value},
	        beforeSend: function(xhr, cfg) {
	        	fcid.disabled = true;
	        },
	        success: function(res, ts) {
	        	if (res.code == "0") {
	        		if (res.data && res.data.length>0) {
	    				for (let i=0; i<res.data.length; i++) {
	    					let item = res.data[i];
	        				khid.options.add(new Option(item.khmc, item.khid));
	        			}
	        		}
	        	} else CxCtrl.alert('获取客户信息失败: ' + res.message);
	        },
	        error: function(xhr, ts, err) {
	        	var msg = "[" + xhr.status + " : " + ts + "]";
	        	CxCtrl.alert('获取客户信息失败: ' + msg);
	        },
	        complete: function(xhr, ts) {
	        	fcid.disabled = false;
	        }
	    });
	}
}
function getKhckxx(el){
	let fcid = el.form.fcid.value, khid = el.form.khid.value, sfxmdm = el.form.sfxmdm.value;
	let khckid = el.form.khckid;
	for (let i=khckid.options.length-1; i>0; i--) khckid.remove(i);
	if (fcid && khid && sfxmdm) {
		CxMisc.ajax({
	        url: CxMisc.finalizeUrl('/gz/sqgl/ycxx/getKhck'),
	        type: "GET",
	        data: {fcid, khid, sfxmdm},
	        beforeSend: function(xhr, cfg) {
	        	khckid.disabled = true;
	        },
	        success: function(res, ts) {
	        	if (res.code == "0") {
	        		if (res.data && res.data.length>0) {
	    				for (let i=0; i<res.data.length; i++) {
	    					let item = res.data[i];
	        				khckid.options.add(new Option(item.cphm?item.cphm:(item.cwhm?item.cwhm:(item.ckh?item.ckh:'车卡信息未知')), item.khckid));
	        			}
	    				khckid.setAttribute('data-json', JSON.stringify(res.data));
	        		}
	        	} else CxCtrl.alert('获取客户车卡信息失败: ' + res.message);
	        },
	        error: function(xhr, ts, err) {
	        	var msg = "[" + xhr.status + " : " + ts + "]";
	        	CxCtrl.alert('获取客户车卡信息失败: ' + msg);
	        },
	        complete: function(xhr, ts) {
	        	khckid.disabled = false;
	        }
	    });
	}
}
function getJgSfxm(){
	let el = document.querySelector('#jf_pre form').sfxmdm;
	let data = {sqdm: CxMisc.qs.get('sqdm'), fylxdm: '05'};
	CxMisc.ajax({
        url: CxMisc.finalizeUrl('/gz/sqgl/jf/getSfxm'),
        type: "GET",
        data: data,
        beforeSend: function(xhr, cfg) {
        	el.disabled = true;
        },
        success: function(res, ts) {
        	if (res.code == "0") {
        		if (res.data && res.data.length>0) {
        			for (let i=0; i<res.data.length; i++) {
        				let item = res.data[i];
        				if (item.sfxmdm=='12' || item.sfxmdm=='13' || item.sfxmdm=='14' || item.sfxmdm=='15') // 预收款暂限定管理费和小车管理费
        					el.options.add(new Option(item.sfxmmc, item.sfxmdm));
        			}
        		}
        	} else CxCtrl.alert('获取收费项目列表失败: ' + res.message);
        },
        error: function(xhr, ts, err) {
        	var msg = "[" + xhr.status + " : " + ts + "]";
        	CxCtrl.alert('获取收费项目列表失败: ' + msg);
        },
        complete: function(xhr, ts) {
        	el.disabled = false;
        }
    });
}
function getSelectedKhckxx(){
	let khckid = document.querySelector('#jf_pre form').khckid, ckList = JSON.parse(khckid.getAttribute('data-json'));
	if (ckList && khckid.value) {
		for (let i=0; i<ckList.length; i++) {
			if (ckList[i].khckid == khckid.value) return ckList[i];
		}
	}
	return null;
}
function getYcJe(el) {
	let ckxx = getSelectedKhckxx(), fcid = el.form.fcid.value, xfys = el.form.xfys.value;
	if (ckxx && fcid && xfys) {
		CxMisc.ajax({
	        url: CxMisc.finalizeUrl('/gz/sqgl/ycxx/getJe'),
	        type: "GET",
	        data: {sfbzid: ckxx.sfbzid, fcid: fcid, xfys: xfys},
	        success: function(res, ts) {
	        	if (res.code == "0") {
	        		if (typeof res.data === 'number') el.form.querySelector('span[data-f-name=je]').innerText = res.data.toFixed(2); //el.form.dummyJe.value = res.data;
	        		else el.form.querySelector('span[data-f-name=je]').innerText = 0; // el.form.dummyJe.value = '';
	        	} else el.form.querySelector('span[data-f-name=je]').innerText = 0; // el.form.dummyJe.value = '';
	        },
	        error: function(xhr, ts, err) {
	        	var msg = "[" + xhr.status + " : " + ts + "]";
	        	CxCtrl.alert('获取收费项目列表失败: ' + msg);
	        	el.form.querySelector('span[data-f-name=je]').innerText = 0; // el.form.dummyJe.value = '';
	        }
	    });
	} else el.form.querySelector('span[data-f-name=je]').innerText = 0; // el.form.dummyJe.value = '';
}

function submitYc(e) {
	let el=e.target, f=document.querySelector('#jf_pre form');
	if (CxMisc.validate(f)) {
		let ckxx = getSelectedKhckxx();
		let data = $(f).serializeJson({removeBlankField:true});
		data.sqdm = CxMisc.qs.get('sqdm');
		data.sfbzid = ckxx.sfbzid;
		data.cwhm = ckxx.cwhm;
		data.cphm = ckxx.cphm;
		data.ckh = ckxx.ckh;
		data.ywlx = '2';
		pay(el, data);
	}
}

function pay(el, data) {
	if (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1') { //用于本地展示之用
		CxCtrl.alert('本地不能发起支付');
	} else {
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/pay/unifiedorder'),
		    type: "GET",
		    data: data,
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
		    						CxCtrl.alert('支付成功');
		    						document.querySelector('#jf_pre form').reset();
		    						$('.page-body .nav-tabs a[data-category=done]').removeAttr('data-loaded'); //确保重新查询列表
		    						$('.page-body .nav-tabs a[data-category=done]').click();
		    					} else {
		    						CxMisc.markAjaxEnd($(el));
		    						if (res.err_msg != "get_brand_wcpay_request:cancel") {
			    						CxCtrl.confirm('未检测到支付成功<br>如非手动取消，请检查已缴费用', function(){
			    							$('.page-action-bar .btn[data-cmd="submit-yc"]').click();
			    						}, function(){
			    							document.querySelector('#jf_pre form').reset();
			    							$('.page-body .nav-tabs a[data-category=done]').click();
			    						}, {
			    							btn:["返回到未缴费用", "再次发起支付"]
			    						});
		    						}
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