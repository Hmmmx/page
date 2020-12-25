$(function(){
	$('.page-title .back').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	$('.page-title .home').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	
	
	$('.page-body .card-body').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl/tpmx'+window.location.search);
	});
	
	CxNotifier.consume();
	CxGz.scroll2BottomLoading(load, $('.page-body .tp-jl-wrapper'), {noMoreMsg: '没有更多投票了'});
});


function load(loadingCb) {
	let wrap = $('.page-body .tp-jl-wrapper'),
		pageSize = 10, page = Math.floor(wrap.children('.tp-jl').length/pageSize);
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/tp/getTprw'),
	    type: "GET",
	    data: {sqdm: CxMisc.qs.get('sqdm'), page:page, pageSize:pageSize},
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
	    		let wrap = $('.page-body .tp-jl-wrapper');
    			if (res.data && res.data.length>0) {
    				for (let i=0; i<res.data.length; i++) {
    					let jl = res.data[i];						
    					wrap.append(`<div class="card tp-jl" data-id="${jl.tprwid}">
								<div class="card-header cx-d-flex-between">
									<span class="cx-ellipsis" style="flex-shrink:1;max-width: 75%;"><i class="fas fa-vote-yea text-primary mr-1"></i><span>${jl.tpmc}</span></span>
									<span class="cx-f-sm text-black-50">${interpretTpzt(jl.tps?jl.tps:0, jl.ktps, jl.jsrq)}</span>
								</div>
								<div class="card-body cx-f-xs">
									<p class="card-text icon-value-pair"><i class="fas fa-vote-yea fa-fw text-info mr-1"></i><span>${jl.tpmc}</span></p>
									<p class="card-text icon-value-pair"><i class="fas fa-calendar-alt fa-fw text-info mr-1"></i><span>${formatRq(jl.ksrq)} ~ ${formatRq(jl.jsrq)}</span></p>
									<p class="card-text icon-value-pair"><i class="fas fa-info-circle fa-fw text-info mr-1"></i><span class="text-black-50">${jl.rwsm?jl.rwsm:'无投票说明'}</span></p>
									<p class="card-text text-right cx-f-sm">
										<span class="text-black-50 mr-3">已投${jl.tpzs?jl.tpzs:0}票</span>
										<span class="text-black-50">${interpretZt(jl.ksrq, jl.jsrq, jl.yxbj)}</span>
										<span class="cx-gray-500 ml-2 mr-0"><i class="fas fa-angle-right"></i></span>
									</p>
								</div>
							</div>`);
    					wrap.children(':last-child').attr('data-json', JSON.stringify(jl));
    				}
    				//wrap.children('div.no-data').appendTo(wrap); // 把空白提示移动未尾
    				wrap.find('.tp-jl .card-body').click(function(e){
    					let tprwid = $(this).parent().attr("data-id"), data = $(this).parent().data("json"),
							sqdm = CxMisc.qs.get('sqdm');
    					let code = getTpztCode(data.tps?data.tps:0, data.ktps, data.ksrq, data.jsrq, data.yxbj);
    					if (code >= 40) {
    						window.location.href = CxMisc.finalizeUrl4Wx(`/gz/sqgl/tp/tpjg?tprwid=${tprwid}&sqdm=${sqdm}`);
    					} else if (code >=30) {
    						CxCtrl.alert('为不影响所有人投票意愿，投票结束后才能查看投票结果');
    					} else if (code >=20) {
    						window.location.href = CxMisc.finalizeUrl4Wx(`/gz/sqgl/tp/tprwmx?tprwid=${tprwid}&sqdm=${sqdm}`);
    					} else if (code >=10) {
    						CxCtrl.alert('该投票未开始');
    					} else CxCtrl.alert('该投票已无效');
    				});
    			}

				loadingCb({hasMore: !(res.data===null || res.data.length < pageSize)});
	    	} else {
	    		CxCtrl.alert('查询投票失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询投票失败：' + msg);
	    }
	});
}

function formatRq(rq) {
	return rq ? rq.substring(0, 16) : '-';
}

function getTpztCode(tps, ktps, ksrq, jsrq, yxbj){
	if (yxbj == '0') return 0; 
	else {
		let now = moment().valueOf();
		if (moment(ksrq, 'YYYY-MM-DD HH:mm:ss').valueOf() > now) return 10;
		else if (moment(jsrq, 'YYYY-MM-DD HH:mm:ss').valueOf() < now) return 40;
		else {
			if (ktps > 1) {
				if (tps == 0) return 20;
				else if (tps >= ktps) return 30;
				else return 21;
			} else {
				if (tps == 0) return 20;
				else return 30;
			}
		}
	}
}

function interpretTpzt(tps, ktps, jsrq){
	let now = moment().valueOf(), due = moment(jsrq, 'YYYY-MM-DD HH:mm:ss').valueOf() < now;
	if (ktps > 1) {
		if (!tps || tps == 0) return due ? `未投票 [${tps}/${ktps}]` : `<span class="text-success">未投票 [${tps}/${ktps}]</span>`;
		else if (tps >= ktps) return `已投票 [${tps}/${ktps}]`;
		else return due ? `已部分投票 [${tps}/${ktps}]` : `<span class="text-success">已部分投票 [${tps}/${ktps}]</span>`;
	} else {
		if (!tps || tps == 0) return due ? `未投票` : `<span class="text-success">未投票</span>`;
		else return `已投票`;
	}
}
function interpretZt(ksrq, jsrq, yxbj){
	if (yxbj == '0') return '无效';
	else {
		let now = moment().valueOf();
		if (moment(ksrq, 'YYYY-MM-DD HH:mm:ss').valueOf() > now) return '未开始';
		else if (moment(jsrq, 'YYYY-MM-DD HH:mm:ss').valueOf() < now) return '已结束';
		else return '<span class="text-success font-weight-bold">正在投票</span>';
	}
}

