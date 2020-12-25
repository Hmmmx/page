$(function(){
	$('.page-title .back').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	$('.page-title .home').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	
	
	$('.page-body .card-body').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl/gxmx'+window.location.search);
	});
	
	CxNotifier.consume();
	CxGz.scroll2BottomLoading(load, $('.page-body .gx-jl-wrapper'), {noMoreMsg: '没有更多二手信息了'});
});


function load(loadingCb) {
	let wrap = $('.page-body .gx-jl-wrapper'),
		pageSize = 10, page = Math.floor(wrap.children('.gx-jl').length/pageSize);
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/gx/getGxxx'),
	    type: "GET",
	    data: {sqdm: CxMisc.qs.get('sqdm'), page:page, pageSize:pageSize},
	    success: function(res, ts) {
	    	if (res.code == "0") {
	    		let wrap = $('.page-body .gx-jl-wrapper');
    			if (res.data && res.data.length>0) {
    				for (let i=0; i<res.data.length; i++) {
    					let jl = res.data[i];						
    					wrap.append(`<div class="card gx-jl" data-id="${jl.gxid}">
								<div class="card-header cx-d-flex-between">
									<span class="cx-ellipsis" style="flex-shrink:1;max-width: 75%;"><i class="fas fa-vote-yea text-primary mr-1"></i><span>${jl.gxmc}</span></span>
									<span class="cx-f-sm text-black-50">gx</span>
								</div>
								<div class="card-body cx-f-xs">
									<p class="card-text icon-value-pair"><i class="fas fa-vote-yea fa-fw text-info mr-1"></i><span>${jl.gxmc}</span></p>
									<p class="card-text icon-value-pair"><i class="fas fa-calendar-alt fa-fw text-info mr-1"></i><span>${formatRq(jl.ksrq)} ~ ${formatRq(jl.jsrq)}</span></p>
									<p class="card-text icon-value-pair"><i class="fas fa-info-circle fa-fw text-info mr-1"></i><span class="text-black-50">${jl.rwsm?jl.rwsm:'无说明'}</span></p>
									<p class="card-text text-right cx-f-sm">
										<span class="text-black-50">${interpretZt(jl.ksrq, jl.jsrq, jl.yxbj)}</span>
										<span class="cx-gray-500 ml-2 mr-0"><i class="fas fa-angle-right"></i></span>
									</p>
								</div>
							</div>`);
    					wrap.children(':last-child').attr('data-json', JSON.stringify(jl));
    				}
    				//wrap.children('div.no-data').appendTo(wrap); // 把空白提示移动未尾
    				wrap.find('.gx-jl .card-body').click(function(e){
    					let gxid = $(this).parent().attr("data-id"), data = $(this).parent().data("json"),
							sqdm = CxMisc.qs.get('sqdm');
    					window.location.href = CxMisc.finalizeUrl4Wx(`/gz/sqgl/gx/gxmx?gxid=${gxid}&sqdm=${sqdm}`);
    				});
    			}

				loadingCb({hasMore: !(!res.data || res.data.length < pageSize)});
	    	} else {
	    		CxCtrl.alert('查询二手信息失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询二手信息失败：' + msg);
	    }
	});
}

function formatRq(rq) {
	return rq ? rq.substring(0, 16) : '-';
}


function interpretZt(ksrq, jsrq, yxbj){
	if (yxbj == '0') return '无效';
	else {
		let now = moment().valueOf();
		if (moment(ksrq, 'YYYY-MM-DD HH:mm:ss').valueOf() > now) return '未开始';
		else if (moment(jsrq, 'YYYY-MM-DD HH:mm:ss').valueOf() < now) return '已结束';
		else return '<span class="text-success font-weight-bold">正在</span>';
	}
}

