$(function(){
	$('.page-title .back').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl/bx'+window.location.search);
	});
	$('.page-title .home').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	
	
	$('.page-body .card-body').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl/bxmx'+window.location.search);
	});
	
	load();
});


function load() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/bx/getBxxx'),
	    type: "GET",
	    data: {sqdm: CxMisc.qs.get('sqdm')},
	    beforeSend: function(xhr, cfg) {
	    	$('.page-body').mask('show');
	    },
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
	    		let wrap = $('.page-body .bx-jl-wrapper');
				wrap.children('.bx-jl').remove();
    			if (res.data && res.data.length>0) {
    				for (let i=0; i<res.data.length; i++) {
    					let jl = res.data[i], clsm = jl.clsm?(jl.clsm+(jl.wcrq?(' ('+jl.wcrq+')'):'')):'无处理说明', 
    							clsmClass=jl.clsm?'text-black-50':'text-black-50 d-none';					
    					wrap.append(`<div class="card bx-jl" data-id="${jl.bxid}">
								<div class="card-header cx-d-flex-between">
									<span><i class="fas fa-city text-primary mr-1"></i><span class="fc-sqmc">${jl.sqmc}</span></span>
									<span class="cx-f-xs text-black-50">${jl.bxrq}</span>
								</div>
								<div class="card-body cx-f-xs">
									<p class="card-text icon-value-pair"><i class="fas fa-tag fa-fw text-info mr-1"></i><span>${jl.bxsxmc} - ${jl.bxlxmc}</span></p>
									<p class="card-text icon-value-pair"><i class="fas fa-mobile-alt fa-fw text-info mr-1"></i><span>${jl.lxdh}(${jl.lxr})</span></p>
									<p class="card-text icon-value-pair${jl.txdz?'':' d-none'}"><i class="fas fa-map-marked-alt fa-fw text-info mr-1"></i><span class="text-black-50">${jl.txdz?jl.txdz:''}</span></p>
									<p class="card-text icon-value-pair"><i class="far fa-sticky-note fa-fw text-info mr-1"></i><span class="text-black-50">${jl.bxnr}</span></p>
									<p class="card-text text-right cx-f-sm" data-jl-attr="cljgdm">
										<span class="text-black-50">${interpretStatus(jl.cljgdm, jl.clztdm)}</span>
										<span class="cx-gray-500 ml-2 mr-0"><i class="fas fa-angle-right"></i></span>
									</p>
									<div class="row no-gutters d-none" data-jl-attr="bxtp">
					                    <div class="no-data"><span>无相应图片</span></div>
					                </div>
					                <div class="bx-cljl d-none" data-jl-attr="cljg">
					                	<div class="bx-cljl-header cx-f-sm">
											<span><i class="fas fa-tools text-primary mr-1"></i><span>跟进处理记录</span></span>
											<span class="cx-f-xs text-black-50">${interpretStatus(jl.cljgdm, jl.clztdm)}</span>
										</div>
										<div class="cx-f-xs mt-2" data-cljl-attr="bxtp">
											<p class="card-text icon-value-pair"><i class="far fa-sticky-note fa-fw text-info mr-1"></i><span class="${clsmClass}">${clsm}</span></p>
										</div>
					                </div>
								</div>
							</div>`);
    					wrap.children(':last-child').attr('data-json', JSON.stringify(jl));
    				}
    				wrap.children('div.no-data').appendTo(wrap); // 把空白提示移动未尾
    				
    				wrap.find('.bx-jl .card-body').click(function(e){
    					if ($(this).find('[data-jl-attr=cljgdm]').is(':visible')) {
    						$(this).find('[data-jl-attr=cljgdm]').addClass('d-none');
    						
    						let imgs = [], imgsWrapper = [], jl = $(this).closest('.card').data('json');
    						if (jl.bxtpdz1)
    							imgs.push(jl.bxtpdz1);
    						if (jl.bxtpdz2)
    							imgs.push(jl.bxtpdz2);
    						if (jl.bxtpdz3)
    							imgs.push(jl.bxtpdz3);
    						if (jl.bxtpdz4)
    							imgs.push(jl.bxtpdz4);
    						for (let i=0; i<imgs.length; i++)
    							imgsWrapper.push(`<div class="col-${12/imgs.length} cx-d-i-flex-center thumbnail thumbnail-auto"><div><img src="${CxMisc.finalizeUrl(imgs[i])}" onload="adjustImgSize(this)" /></div></div>`);
    						$(this).find('[data-jl-attr=bxtp]').removeClass('d-none').append(imgsWrapper.join(''));
    						
    						let imgs2 = [], imgsWrapper2 = [];
    						if (jl.bxcltpdz1)
    							imgs2.push(jl.bxcltpdz1);
    						if (jl.bxcltpdz2)
    							imgs2.push(jl.bxcltpdz2);
    						if (jl.bxcltpdz3)
    							imgs2.push(jl.bxcltpdz3);
    						if (jl.bxcltpdz4)
    							imgs2.push(jl.bxcltpdz4);
    						for (let i=0; i<imgs2.length; i++)
    							imgsWrapper2.push(`<div class="col-${12/imgs2.length} cx-d-i-flex-center thumbnail thumbnail-auto"><div><img src="${CxMisc.finalizeUrl(imgs2[i])}" onload="adjustImgSize(this)" /></div></div>`);
    						if (imgsWrapper2.length>0) {
    							imgsWrapper2.unshift('<div class="row no-gutters mb-0">');
    							imgsWrapper2.push('</div>');
    						}
    						$(this).find('[data-jl-attr=cljg]').removeClass('d-none').find('[data-cljl-attr=bxtp]').append(imgsWrapper2.join(''));
    						
    						$(this).find('.thumbnail img').click(function(){
    	    					CxGz.popImg(this);
    						});
    					}
    				});
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

function interpretStatus(jgdm, ztdm) {
	if (jgdm == '1') {
		return '处理成功';
	} else {
		switch (ztdm) {
		case '0': return '未受理';
		case '1': return '已受理';
		case '2': return '处理中';
		case '3': return '已完成';
		}
	}
	return '';
}

function adjustImgSize(el) { //计算图片与容器的尺寸合图片显示最大化
	let wrap = $(el).closest('.row'), imgCount = wrap.find('.thumbnail').length;
	wrap.find('.thumbnail').removeClass('col-12 col-6 col-4 col-3').addClass(`col-${12/imgCount}`).find('img').each(function(){
		let imgWrap = $(this).closest('.thumbnail'), 
			ratio0 = imgWrap.width() / imgWrap.height(), ratio1 = this.naturalWidth / this.naturalHeight;
		if (ratio0 > ratio1) {
			this.style.maxWidth = '100%';
			this.style.maxHeight = 'none';
		} else {
			this.style.maxWidth = 'none';
			this.style.maxHeight = '100%';
		}
	});
}
