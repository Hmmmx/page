$(function(){
	$('.page-title .back').click(function(e){
		window.history.back();
	});
	$('.page-title .home').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	
	load();
});


function load() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/tp/getTpjg'),
	    type: "GET",
	    data: {tprwid: CxMisc.qs.get('tprwid')},
	    beforeSend: function(xhr, cfg) {
	    	$('.page-body').mask('show');
	    },
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
	    		let wrap = $('.page-body .tpwt-wrapper');
    			if (res.data && res.data.length>0) {
    				let tpwtids = {}, tpwts=[];
    				for (let i=0; i<res.data.length; i++) {
    					if (res.data[i].tpwtid && !tpwtids[res.data[i].tpwtid]) {
    						tpwtids[res.data[i].tpwtid] = {maxPs: 0, xxs: []};
    						tpwts.push({tpwtid: res.data[i].tpwtid, wt: res.data[i].wt, plxh: res.data[i].plxh, dxbj: res.data[i].dxbj});
    					}
    					if (res.data[i].ps && tpwtids[res.data[i].tpwtid].maxPs < res.data[i].ps) tpwtids[res.data[i].tpwtid].maxPs = res.data[i].ps;
    					tpwtids[res.data[i].tpwtid].xxs.push({ps:res.data[i].ps, xx: res.data[i].xx});
    				}
    				
    				for (let i=0; i<tpwts.length; i++) {
    					let wtxx = [];
    					for (let j=0; j<tpwtids[tpwts[i].tpwtid].xxs.length; j++) {
    						let ps = tpwtids[tpwts[i].tpwtid].xxs[j].ps?tpwtids[tpwts[i].tpwtid].xxs[j].ps:0,
    							percent = tpwtids[tpwts[i].tpwtid].maxPs&&ps?Math.floor(100*ps/tpwtids[tpwts[i].tpwtid].maxPs):0;
    						wtxx.push(`<div class="mb-1${j>0?' mt-3':''}">${tpwtids[tpwts[i].tpwtid].xxs[j].xx}</div>
    							<div class="progress" style="border-radius:1em;">
    								<div class="progress-bar bg-success text-right pr-2 cx-d-i-flex-end" style="flex-direction:row;min-width:1.5rem;width: ${percent}%;" role="progressbar">${ps}</div>
    							</div>`);
    					}
    					wrap.append(`<div class="card mt-3">
    						<div class="card-header px-3 py-1">
    							<span><i class="fas fa-question-circle text-primary mr-1"></i><span class="tpwt-title">问题${i+1}[${tpwts[i].dxbj=='1'?'多选':'单选'}]：${tpwts[i].wt}</span></span>
    						</div>
    						<div class="card-body px-4 py-3 tprw-wt">
    							${wtxx.join('')}
    						</div>
    					</div>`);
    				}
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



