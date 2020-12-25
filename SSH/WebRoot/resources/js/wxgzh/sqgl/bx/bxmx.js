$(function(){
	$('.page-title .back').click(function(e){
		window.history.back();
	});
	$('.page-title .home').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	
	loadMx();
});

function loadMx() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/bx/getBxmx'),
	    type: "GET",
	    data: {bxid: CxMisc.qs.get('bxid')},
	    beforeSend: function(xhr, cfg) {
	    	$('.page-body').mask('show');
	    },
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
	    		let wrap = $('.page-body .bx-jl-wrapper');
    			if (res.data && res.data.length>0) {
    				for (let i=0; i<res.data.length; i++) {
    					let jl = res.data[i];
    					let imgs = [], imgsWrapper = [];
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
						
    					wrap.append(`<div class="card bx-jl-smry" data-id="${jl.bxid}">
								<div class="card-header cx-d-flex-between">
									<span><i class="fas fa-city text-primary mr-1"></i><span class="fc-sqmc">${CxMisc.qs.get('sqmc')}</span></span>
									<span class="cx-f-xs text-black-50">${jl.bxrq}</span>
								</div>
								<div class="card-body cx-f-xs">
									<p class="card-text icon-value-pair"><i class="fas fa-map-marked-alt fa-fw text-info mr-1"></i><span class="fc-fcmc">${CxMisc.qs.get('fcmc')}</span></p>
									<p class="card-text icon-value-pair"><i class="fas fa-tag fa-fw text-info mr-1"></i><span>${jl.bxlxmc}</span></p>
									<p class="card-text icon-value-pair"><i class="fas fa-mobile-alt fa-fw text-info mr-1"></i><span>${jl.lxdh}(${jl.lxr})</span></p>
									<p class="card-text icon-value-pair"><i class="far fa-sticky-note fa-fw text-info mr-1"></i><span class="text-black-50">${jl.bxnr}</span></p>
									<p class="card-text text-right cx-f-sm">
										<span class="text-black-50">${interpretStatus(jl.cljgdm, jl.clztdm)}</span>
									</p>
									<div class="row no-gutters mb-0">
					                	${imgsWrapper.join('')}
					                    <div class="no-data"><span>无相应图片</span></div>
					                </div>
								</div>
							</div>`);
    				}
    				wrap.find('.bx-jl-smry img').click(function(){
    					CxGz.popImg(this);
					});
    				loadClMx();
    			}
	    	} else {
	    		CxCtrl.alert('查询报修明细失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询报修明细失败：' + msg);
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

function loadClMx() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/bx/getBxclmx'),
	    type: "GET",
	    data: {bxid: CxMisc.qs.get('bxid')},
	    beforeSend: function(xhr, cfg) {
	    	$('.page-body').mask('show');
	    },
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
	    		let wrap = $('.page-body .bx-jl-wrapper');
    			if (res.data && res.data.length>0) {
    				for (let i=0; i<res.data.length; i++) {
    					let jl = res.data[i];
    					
    					let imgs = [], imgsWrapper = [];
						if (jl.bxcltpdz1)
							imgs.push(jl.bxcltpdz1);
						if (jl.bxcltpdz2)
							imgs.push(jl.bxcltpdz2);
						if (jl.bxcltpdz3)
							imgs.push(jl.bxcltpdz3);
						if (jl.bxcltpdz4)
							imgs.push(jl.bxcltpdz4);
						for (let i=0; i<imgs.length; i++)
							imgsWrapper.push(`<div class="col-${12/imgs.length} cx-d-i-flex-center thumbnail thumbnail-auto"><div><img src="${CxMisc.finalizeUrl(imgs[i])}" onload="adjustImgSize(this)" /></div></div>`);
						
						if (imgsWrapper.length>0) {
							imgsWrapper.unshift('<div class="row no-gutters mb-0">');
							imgsWrapper.push('</div>');
						}
    					wrap.append(`<div class="card bx-cljl-smry" data-id="${jl.clbxid}">
								<div class="card-header cx-d-flex-between">
									<span><i class="fas fa-tools text-primary mr-1"></i><span>跟进处理记录</span></span>
									<span class="cx-f-xs text-black-50">${jl.bxclrq}</span>
								</div>
								<div class="card-body cx-f-xs">
									<p class="card-text icon-value-pair"><i class="far fa-sticky-note fa-fw text-info mr-1"></i><span class="text-black-50">${jl.clnr}</span></p>
									${imgsWrapper.join('')}
								</div>
							</div>`);
    				}
    				wrap.find('.bx-cljl-smry img').click(function(){
    					CxGz.popImg(this);
					});
    			} else {
    				wrap.append(`<div class="card bx-cljl-smry">
							<div class="card-header">
								<span><i class="fas fa-wrench text-primary mr-1"></i><span>跟进处理记录</span></span>
							</div>
							<div class="card-body cx-f-xs">
								<div class="row no-gutters mb-0">
				                    <div class="no-data"><span>暂无处理记录</span></div>
				                </div>
							</div>
						</div>`);
    			}
	    	} else {
	    		CxCtrl.alert('查询报修明细失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询报修明细失败：' + msg);
	    },
        complete: function(xhr, ts) {
        	$('.page-body').mask('hide');
        }
	});
}

function adjustImgSize(el) { //计算图片与容器的尺寸合图片显示最大化
	let wrap = $(el).closest('.card-body'), imgCount = wrap.find('.thumbnail').length;
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
