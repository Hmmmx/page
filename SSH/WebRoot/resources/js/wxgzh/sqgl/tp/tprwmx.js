$(function(){
	$('.page-title .back').click(function(e){
		window.history.back();
	});
	$('.page-title .home').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	
	$('.page-action-bar .btn[data-cmd=vote]').click(function(e){
		vote(e);
	});
	
	load();
});


function load() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/tp/getTprwmx'),
	    type: "GET",
	    data: {tprwid: CxMisc.qs.get('tprwid')},
	    beforeSend: function(xhr, cfg) {
	    	$('.page-body').mask('show');
	    },
	    success: function(res, ts) {
	    	if (res.code == "0") {
	    		if (res.data) {
		    		let wrap = $('.page-body .tpwt-wrapper');
	    			if (res.data.fcxxList.length>0) {
	    				if (res.data.tpwtList.length>0) {
	    					let f=document.querySelector('.page-body form'), fcid=f.fcid;
	    					for (let i=0; i<res.data.fcxxList.length; i++)
	        					fcid.options.add(new Option(res.data.fcxxList[i].fcmc, res.data.fcxxList[i].fcid));
	        				// if (fcid.options.length == 1) { fcid.selectedIndex = 0; }
	        				$(fcid).fSelect(JSON.parse(fcid.getAttribute('data-param')));
	        				
	        				for (let i=0; i<res.data.tpwtList.length; i++) {
	        					let tpwt = res.data.tpwtList[i], wtxx = [];
	        					for (let j=0; j<tpwt.tpwtxxList.length; j++) {
	        						let tpwtxx = tpwt.tpwtxxList[j];
	        						wtxx.push(`<div class="custom-control ${tpwt.dxbj=='1'?'custom-checkbox':'custom-radio'}">
	    									<input class="custom-control-input" type="${tpwt.dxbj=='1'?'checkbox':'radio'}" name="${tpwtxx.tpwtid}" id="wgGzTpTpwt_xx_${tpwtxx.tpwtxxid}" value="${tpwtxx.tpwtxxid}">
	    									<label class="custom-control-label" for="wgGzTpTpwt_xx_${tpwtxx.tpwtxxid}">${tpwtxx.xx}</label>
	    								</div>`);
	        					}
	        					wrap.append(`<div class="card mt-3">
	        							<div class="card-header px-3 py-1">
	        								<span><i class="fas fa-question-circle text-primary mr-1"></i><span class="tpwt-title">问题${i+1}[${tpwt.dxbj=='1'?'多选':'单选'}]：${tpwt.wt}</span></span>
	        							</div>
	        							<div class="card-body px-4 py-3 tprw-wt" data-tpwtid="${tpwt.tpwtid}">
	        								${wtxx.join('')}
	        							</div>
	        						</div>`);
	        				}
	    				}
	    				wrap.append(`<div class="loading"><span>没有更多问题了</span></div>`);
    				} else {
    					CxCtrl.alert('你已完成投票，请勿重复投票');
    				}
    			} else {
    				CxCtrl.alert('你已完成投票，请勿重复投票');
    			}
	    	} else {
	    		CxCtrl.alert('查询报修记录失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询报修记录失败：' + msg);
	    },
        complete: function(xhr, ts) {
        	$('.page-body').mask('hide');
        }
	});
}

function vote(e) {
	let el=e.target, f=document.querySelector('.page-body form'), tpjg=[], fcxxList=[];
	let wrap = $('.page-body .tpwt-wrapper'), tpwtList = wrap.find('.tprw-wt');
	for (let i=0; i<tpwtList.length; i++) {
		let wtjg = [];
		$(tpwtList[i]).find('input:checked').each(function(){wtjg.push({tpwtxxid: this.value})});
		if (wtjg.length>0) {
			tpjg.push({tpwtid: $(tpwtList[i]).data('tpwtid'), tpwtxxList:wtjg});
		} else {
			CxCtrl.alert(`第${i+1}个问题未完成，请先完成所有问题`);
			return;
		}
	}

	let fcids = $(f.fcid).val();
	if (fcids.length == 0) { //默认选择全部
		for (let i=0; i<f.fcid.options.length; i++) {fcids.push(f.fcid.options[i].value)}
	}
	for (let i=0; i<fcids.length; i++) fcxxList.push({fcid: fcids[i]});
	let data = {tprwid: CxMisc.qs.get('tprwid'), sqdm: CxMisc.qs.get('sqdm'), tpwtList: tpjg, fcxxList: fcxxList};
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/tp/addTpjg'),
	    type: "POST",
	    contentType: 'application/json;charset=utf-8',
	    data: JSON.stringify(data),
	    beforeSend: function(xhr, cfg) {
        	CxMisc.markAjaxStart($(el));
        },
	    success: function(res, ts) {
	    	if (res.code == "0") {
	    		CxNotifier.produce('投票成功');
	    		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl/tp' + window.location.search); //返回列表 
	    	} else {
	    		CxCtrl.alert('投票失败：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('投票失败：' + msg);
	    },
	    complete: function(xhr, ts) {
	    	CxMisc.markAjaxEnd($(el));
        }
	});
}

