$(function(){
	$('.page-title .back').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	$('.page-title .home').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	
	$('.page-action-bar .btn[data-cmd=bind]').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl/fc/bind');
	});
	
	CxNotifier.consume();
	
	let redirect = CxMisc.qs.get('redirect');
	if (redirect) window.location.href = CxMisc.finalizeUrl4Wx(redirect);
	else loadFc();
});

function unbind(el) {
	let name = $(el).closest('.card').find('.card-header').text();
	CxCtrl.confirm(`确定解除绑定此房产？<p class="text-info">${name}</p>`, function(src){
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/sqgl/fc/bind/deleteFcbind'),
		    type: "GET",
		    data: {hyfcid: el.getAttribute('data-id')},
		    beforeSend: function(xhr, cfg) {
		    	$('.my-property-list').mask('show');
		    },
		    success: function(res, ts) {
		    	if (res.code == "0") {
		    		loadFc();
		    		CxCtrl.alert('解除绑定房产成功');
		    	} else {
		    		CxCtrl.alert('解除绑定房产失败, 请稍后重新打开：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxCtrl.alert('解除绑定房产失败：' + msg);
		    },
            complete: function(xhr, ts) {
            	$('.my-property-list').mask('hide');
            }
		});
	});
}


function loadFc() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/getFc'),
	    type: "GET",
	    beforeSend: function(xhr, cfg) {
	    	$('.my-property-list').mask('show');
	    },
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
	    		let wrap = $('.my-property-list .my-property-wrapper');
				wrap.children('.my-property').remove();
    			if (res.data && res.data.length>0) {
    				for (let i=0; i<res.data.length; i++) {
    					let fc = res.data[i];
    					wrap.append(`<div class="card my-property" data-id="${fc.hyfcid}">
								<div class="card-header"><i class="fas fa-city text-primary mr-1"></i><span>${fc.sqmc}</span></div>
								<div class="card-body cx-f-xs">
									<p class="card-text icon-value-pair"><i class="fas fa-map-marked-alt fa-fw text-info mr-1"></i><span>${fc.fcmc}</span></p>
									<p class="card-text icon-value-pair${fc.sjhm?'':' d-none'}"><i class="fas fa-mobile-alt fa-fw text-info mr-1"></i><span>${fc.sjhm}</span></p>
									<div class="text-right">
									<button type="button" class="btn btn-outline-secondary btn-sm" data-cmd="unbind" data-id="${fc.hyfcid}"><i class="fas fa-unlink mr-1"></i>解除绑定</button>
									</div>
								</div>
							</div>`);
    				}
    				wrap.find('.my-property .btn[data-cmd=unbind]').click(function(e){
    					unbind(this);
    				});
    				wrap.children('div.no-data').appendTo(wrap); // 把空白提示移动未尾
    			}
	    	} else {
	    		CxCtrl.alert('查询用户绑定房产失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询用户绑定房产失败：' + msg);
	    },
        complete: function(xhr, ts) {
        	$('.my-property-list').mask('hide');
        }
	});
}