$(function(){
	$('.page-title .back').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	$('.page-title .home').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	
	
	$('.page-body .card-body').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl/znmx'+window.location.search);
	});
	
	CxNotifier.consume();
	CxGz.scroll2BottomLoading(load, $('.page-body .info-list'), {noMoreMsg: '没有更多指南信息了'});
});


function load(onLoaded) {
	let wrap = $('.page-body .info-list'),
		pageSize = 10, page = Math.floor(wrap.children('.info-item').length/pageSize);
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/zn/getZnxx'),
	    type: "GET",
	    data: {sqdm: CxMisc.qs.get('sqdm'), page:page, pageSize:pageSize},
	    success: function(res, ts) {
	    	if (res.code == "0") {
    			if (res.data && res.data.length>0) {
    				for (let i=0; i<res.data.length; i++) {
    					let jl = res.data[i];						
    					wrap.append(`<div class="row no-gutters info-item" data-url="${jl.znljdz}">
										<div class="col-1 thumbnail d-none">
								 			<div class="p-1 d-none">${jl.zntpdz ? '<img src="CxMisc.finalizeUrl(jl.zntpdz)">' : '<i class="far fa-compass" style="font-size:20px;color:#4285f4;"></i>'}</div>
								 		</div>
								 		<div class="col-11 message">
								 			<div class="row no-gutters">
										 		<div class="col-12 subject"><span>${jl.znbt}</span></div>
										 		<!-- <div class="col-3 date"><span>${jl.fbrq}</span></div> -->
									 		</div>
								 			<div class="row no-gutters">
								 				<div class="col sub"><span>${jl.fbrq}</span></div>
								 			</div>
								 		</div>
								 		<div class="col-1 indicator">
								 			<span class="cx-name"><i class="fas fa-angle-right"></i></span>
								 		</div>
									</div>`);
    					wrap.children(':last-child').click(function(){ 
	    					let url = this.getAttribute('data-url');
	    					if (url) window.location.href = url;
	    				});
    				}
    			}

    			onLoaded({hasMore: !(!res.data || res.data.length < pageSize)});
	    	} else {
	    		CxCtrl.alert('查询指南信息失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询指南信息失败：' + msg);
	    }
	});
}




