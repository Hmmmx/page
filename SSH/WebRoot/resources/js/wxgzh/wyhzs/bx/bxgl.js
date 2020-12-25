async function prepare(){
	gHyxx = await p_getHyxx();
	if (gHyxx.code) {
		CxCtrl.alert(gHyxx.message);
	} else {
		if (!gHyxx.wyhymc || !gHyxx.sjhm) {
			CxCtrl.confirm('请先打开公众号菜单&lt;我的&gt;完善会员信息<br>是否立刻跳转到该页面？', function(){
				window.location.href = CxMisc.finalizeUrl4Wx('/gz/wyhzs/hygl?src=bx');
			});
		} else if (gHyxx.shbj != '1') {
			CxCtrl.alert('请等待后台完成会员审核');
		} else {
			gHylx = await p_getHylx();
			let res = await p_getSq();
			if (res.code == '0') {
				let el = document.querySelector('.page-title .link[data-cmd="switch-sq"]');
				el.setAttribute('data-sq-list', JSON.stringify(res.data));
				switchSq(CxMisc.qs.get('sqdm'));
				
				if (res.data && res.data.length>0) $('.page-title .link').removeClass('disabled');
			} else CxCtrl.alert(res.message);
		}
	}
}
function p_getHylx(){
	return new Promise(function(resolve, reject){
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/hygl/getHylx'),
		    type: "GET",
		    beforeSend: function(xhr, cfg) {
		    //	$('.page-body').mask('show');
		    },
		    success: function(res, ts) {
		    	if (res.code == "0")
		    		resolve(res);
		    	else 
		    		resolve({code:'failed', message: '获取会员类型信息失败：' + res.message});
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	resolve({code:'error', message: '获取会员类型信息失败：' + msg});
		    },
	        complete: function(xhr, ts) {
	        //	$('.page-body').mask('hide');
	        }
		});
	});
}
function p_getSq(){
	return new Promise(function(resolve, reject){
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/hygl/getSq'),
		    type: "GET",
		    beforeSend: function(xhr, cfg) {
		    	$('.page-body').mask('show');
		    },
		    success: function(res, ts) {
		    	if (res.code == "0")
		    		resolve(res);
		    	else 
		    		resolve({code:'failed', message: '获取社区部门信息失败：' + res.message});
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	resolve({code:'error', message: '获取社区部门信息失败：' + msg});
		    },
	        complete: function(xhr, ts) {
	        	$('.page-body').mask('hide');
	        }
		});
	});
}


function popSwitchSq(el) {
	let sqList = JSON.parse(el.getAttribute('data-sq-list')), sqdm = getCurrentSq().sqdm;//, currIdx = el.getAttribute('data-current-idx');
	if (sqList && sqList.length>0) {
		let wrap = $('#commonSqModalDtls .sq-list-wrapper').empty();
		for (let i=0; i<sqList.length; i++) {
			wrap.append(`<div><a class="d-inline-flex rounded w-100 p-2 ${sqdm==sqList[i].sqdm? ' bg-primary text-white' : ''}" href="javascript:;" data-sqdm="${sqList[i].sqdm}">${sqList[i].sqmc}</a></div>`);
		}
		wrap.find('a').click(function(){
			if (!$(this).hasClass('bg-primary')) {// 非当前小区
				switchSq(this.getAttribute('data-sqdm'));
				$('#commonSqModalDtls').modal('hide');
			}
		});
		$('#commonSqModalDtls').modal('show');
	}
}

function switchSq(sqdm) {
	let el = document.querySelector('.page-title .link[data-cmd="switch-sq"]');
	let sqList = JSON.parse(el.getAttribute('data-sq-list'));
	if (sqList.length>0) {
		let sq = sqList[0];
		for (let i=0; i<sqList.length; i++) { if (sqList[i].sqdm == sqdm) { sq = sqList[i]; break; } }
		el.querySelector('[data-f-name="sqmc"]').innerHTML = `${sq.sqmc}${sqList.length>1?'<i class="fas fa-angle-down ml-1"></i>':''}`;
		
		el.setAttribute('data-current-sq', JSON.stringify(sq));
		
		getBxxx({reset:true});
	} else {
		el.querySelector('[data-f-name="sqmc"]').innerHTML = '暂无社区';
	}
}
function getCurrentSq() {
	let sq = document.querySelector('.page-title .link[data-cmd="switch-sq"]').getAttribute('data-current-sq');
	if (sq) return JSON.parse(sq);
	else null;
}


function push2History(data) {
	var p = CxMisc.qs.parse(CxMisc.qs.extract(window.location.href));
	if (data.sqdm) p.sqdm = data.sqdm;
	if (data.clztdm !== undefined) p.clztdm = data.clztdm;
	else if (p.clztdm !== undefined) delete p.clztdm;
	if (data.y) p.y = data.y;
	else delete p.y;
	window.history.replaceState(null, document.title, "?" + CxMisc.qs.stringify(p));
}

function getBxxx(opt){
	let wrap = $('.page-body .bxxx-list-wrapper .bxxx-list-body');
	if (wrap.children('.more').length == 0) {
		wrap.append('<div class="more"><span><i class="fas fa-circle-notch mr-1"></i>更多...</span></div>');
	}
	let more = wrap.children('.more');
	if (opt.reset) {
		$('.page-body .bxxx-list-wrapper .bxxx-list-body .bxxx').remove();
		more.removeData('has-more');
		more.find('span').html('<i class="fas fa-circle-notch mr-1"></i>更多...');
		more.click();
	}
	
	if (opt.init) {
		let _click = async function(){
			let now = new Date().getTime();
	    	if ((!more.data('last-checking') || now-more.data('last-checking')>400) && (more.data('loading') != 'Y' && more.data('has-more') != 'N')) {
	    		more.data('last-checking', now);
	    		more.data('loading', 'Y');
	    		more.find('i').addClass('fa-spin');
	    		$('.page-body .cx-status-bar a[data-toggle="tab"]').addClass('disabled');
	    		$('.page-title .link[data-cmd="switch-sq"]').addClass('disabled');
	    		
	    		let zt = document.querySelector('.page-body .cx-status-bar a.active').getAttribute('data-status'),
	    			data = {sqdm: getCurrentSq().sqdm};
		    	if (zt != '') data.clztdm = zt;
		    	data.pageSize = 50;
		    	data.page = Math.floor($('.page-body .bxxx-list-wrapper .bxxx-list-body .bxxx').length/data.pageSize);
		    	let res = await p_getBxxx(data);
		    	
		    	if (res.code == '0') renderBxxxList(res.data);
		    	else CxCtrl.alert(res.message);
		    	
		    	let y = CxMisc.qs.get('y');
		    	if (y) setTimeout(function(){$(document).scrollTop(y);},400);
		    	
	    		
	    		if (res.data===null || res.data.length < data.pageSize) {
	    			more.data('has-more', 'N'); // 小于pageSize时表示没有更多数据
	    			more.find('span').text('没有更多报修了');
				};
	    		more.appendTo(more.parent()); // 把空白提示行移到未尾
	    		more.data('loading', 'N');
	    		more.find('i').removeClass('fa-spin');
	    		$('.page-body .cx-status-bar a[data-toggle="tab"]').removeClass('disabled');
	    		$('.page-title .link[data-cmd="switch-sq"]').removeClass('disabled');
	    	}
		};
		more.click(_click);
		
		$(document).scroll(function() {
			let scrollTop = $(document).scrollTop(),
				h0 = $(window).height(),
				h1 = $(document).height();
			if (h1 - (scrollTop + h0) < 40) //距离底部高度小于40px
				more.click();
		});
	}
}
function p_getBxxx(data){
	return new Promise(function(resolve, reject){
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/bx/getBxxx'),
		    type: "GET",
		    data: data,
		    success: function(res, ts) {
		    	if (res.code == "0")
		    		resolve(res);
		    	else 
		    		resolve({code:'failed', message: '获取报修信息失败：' + res.message});
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	resolve({code:'error', message: '获取报修信息失败：' + msg});
		    },
		});
	});
}
function renderBxxxList(data) {
	let wrap = $('.page-body .bxxx-list-wrapper .bxxx-list-body');
	for (let i=0; i<data.length; i++) {
		let item = data[i], clsm = item.clsm?('处理说明：'+item.clsm+(item.wcrq?(' ('+item.wcrq+')'):'')):'无处理说明', 
			clsmClass=item.clsm?'text-black-50':'text-black-50 d-none';
		wrap.append(`<div class="bxxx" data-id="${item.bxid}">
				<div class="cx-d-flex-between"><span><span class="text-success">${interpretClztdm(item.clztdm)}</span> ${item.bxsxmc} - ${item.bxlxmc} <span class="cx-f-xs text-black-50">来自：${interpretBxlydm(item.bxlydm)}</span></span><span>${item.bxrq}</span></div>
				<div><span>${item.lxr}</span> - <a href="tel:${item.lxdh}">${item.lxdh} <i class="fas fa-phone"></i></a></div>
				<div style="${item.txdz?'':'display:none;'}"><span class="cx-f-xs text-black-50">${item.txdz?('地址：'+item.txdz):''}</span></div>
				<div class="mb-1"><span class="cx-f-xs text-black-50">内容：${item.bxnr}</span></div>
				<div class="mt-1 cx-d-flex-between cx-f-sm d-none" style="display:none;" data-f-name="cljg">
					<span>${interpretCljgdm(item.cljgdm)}</span>
					<span>${item.wcrq?item.wcrq:''}</span>
				</div>
				<div class="mb-1 cx-f-xs" style="display:none;" data-f-name="cljg">
					<span class="${clsmClass}">${clsm}</span>
				</div>
					
				<div class="row no-gutters p-relative" style="display:none;" data-f-name="bxtp">
                    <div class="no-data"><span>无报修图片</span></div>
                </div>
                <div style="display:none;" data-f-name="cljg"><div class="my-2" data-f-name="bxcltp"></div></div>
				<div class="text-right">
					<button type="button" class="btn btn-sm btn-outline-secondary" data-cmd="show-mx"><i class="fas fa-angle-down mr-1"></i><span>详细</span></button>
					${processable(item)?'<button type="button" class="btn btn-sm btn-outline-primary" data-cmd="allot"><i class="far fa-share-square mr-1"></i><span>调拨</span></button>':''}
					${followable(item)?'<button type="button" class="btn btn-sm btn-outline-primary" data-cmd="follow"><i class="far fa-flag mr-1"></i><span>受理</span></button>':''}
					${processable(item)?'<button type="button" class="btn btn-sm btn-outline-primary" data-cmd="process"><i class="fas fa-hammer mr-1"></i><span>处理</span></button>':''}
					${processable(item)?'<button type="button" class="btn btn-sm btn-outline-primary" data-cmd="done"><i class="fas fa-check mr-1"></i><span>提交</span></button>':''}
					${verifyable(item)?'<button type="button" class="btn btn-sm btn-outline-primary" data-cmd="fallback"><i class="fas fa-backspace mr-1"></i><span>退回</span></button>':''}
					${verifyable(item)?'<button type="button" class="btn btn-sm btn-outline-primary" data-cmd="pass"><i class="far fa-check-circle mr-1"></i><span>通过</span></button>':''}
					${undoable(item)?'<button type="button" class="btn btn-sm btn-outline-primary" data-cmd="undo"><i class="fas fa-undo mr-1"></i><span>重新激活</span></button>':''}
				</div>
			</div>`);
		wrap.children(':last-child').attr('data-json', JSON.stringify(item));
	}
	wrap.find('button[data-cmd="show-mx"]').click(function(){ showBxxxMx(this); });
	wrap.find('button[data-cmd="allot"]').click(function(){ allot(this); });
	wrap.find('button[data-cmd="follow"]').click(function(){ follow(this); });
	wrap.find('button[data-cmd="process"]').click(function(){ process(this); });
	wrap.find('button[data-cmd="done"]').click(function(){ done(this); });
	wrap.find('button[data-cmd="fallback"]').click(function(){ fallback(this); });
	wrap.find('button[data-cmd="pass"]').click(function(){ pass(this); });
	wrap.find('button[data-cmd="undo"]').click(function(){ undo(this); });
}

function interpretBxlydm(bxlydm){
	switch(bxlydm){
	case '0': return '业主';
	case '1': return '内部';
	}
	return '-';
}
function interpretClztdm(dm){
	switch(dm){
	case '0': return '未受理';
	case '1': return '处理中';
	case '2': return '待审核';
	case '3': return '已完成';
	}
	return '';
}
function interpretCljgdm(dm){
	switch(dm){
	case '0': return '未处理成功';
	case '1': return '处理成功';
	}
	return '';
}
function followable(item) {
	if (gHylx.code == '0') {
		return gHylx.data.hylx == '0' && item.clztdm == '0';
	}
	return false;
}
function processable(item) {
	if (gHylx.code == '0') {
		return gHylx.data.hylx == '0' && item.clztdm == '1';
	}
	return false;
}
function verifyable(item) {
	if (gHylx.code == '0') {
		return gHylx.data.hylx == '1' && item.clztdm == '2';
	}
	return false;
}
function undoable(item) {
	if (gHylx.code == '0') {
		return gHylx.data.hylx == '1' && item.clztdm == '3';
	}
	return false;
}

function process(el) {
	let f = document.querySelector('#processBxModal form'), item = $(el).closest('.bxxx').data('json');
	f.reset();
	f.bxid.value = item.bxid;
	if (item.cljgdm) CxMisc.selectSelect('cljgdm', item.cljgdm, f);
	if (item.clsm) f.clsm.value = item.clsm;
	
	$('#processBxModal .bx-img-wrapper .thumbnail').remove();
	let imgs2 = [], imgsWrapper2 = [];
	if (item.bxcltpdz1)
		imgs2.push(item.bxcltpdz1);
	if (item.bxcltpdz2)
		imgs2.push(item.bxcltpdz2);
	if (item.bxcltpdz3)
		imgs2.push(item.bxcltpdz3);
	if (item.bxcltpdz4)
		imgs2.push(item.bxcltpdz4);
	if (imgs2.length > 0) {
		for (let i=0; i<imgs2.length; i++) {
			imgsWrapper2.push(`<div class="col-${12/imgs2.length} cx-d-i-flex-center thumbnail thumbnail-auto">
						<div><img src="${CxMisc.finalizeUrl(imgs2[i])}" onload="adjustImgSize($(this).closest('.bx-img-wrapper'))" style="max-width: none; max-height: 100%;"></div>
						<span class="cx-close circle top-right"><span><a href="javascript:;"><i class="fas fa-times"></i></a></span></span>
						<input type="hidden" name="bxcltpdz" value="${imgs2[i]}">
				</div>`);
		}
		setTimeout(function(){
			$('#processBxModal .bx-img-wrapper').append(imgsWrapper2.join(''));
			$('#processBxModal .bx-img-wrapper').find('.thumbnail img').click(function(){
				CxGz.popImg(this);
			});
			$('#processBxModal .bx-img-wrapper').find('.thumbnail .cx-close').click(function(){
				$(this).closest('.thumbnail').remove();
				adjustImgSize($('#processBxModal .bx-img-wrapper'));
			});
		}, 200); //延时生成，保证圣诞框显示后再生成
	}
	$('#processBxModal').modal('show');
}
function done(el) {
	let target = $(el), item = target.closest('.bxxx').data('json');
	if (item.clsm) {
		let f = document.querySelector('#submitBxclModal form');
		f.reset();
		f.bxid.value = item.bxid;
		$('#submitBxclModal').modal('show');
	} else CxCtrl.alert('请先完成报修处理后再提交');
}
function fallback(el) {
	let target = $(el), item = target.closest('.bxxx').data('json');
	let f = document.querySelector('#fallbackBxclModal form');
	f.reset();
	f.bxid.value = item.bxid;
	$('#fallbackBxclModal').modal('show');
}
function pass(el) {
	let item = $(el).closest('.bxxx').data('json');
	CxCtrl.confirm(`确定通过该${item.bxsxmc}？`, function(){
		let data = {bxid: item.bxid, bxcllxdm: '6', clnr: `通过审核${item.bxsxmc}`};
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/bx/updateBxcl'),
		    type: "POST",
		    data: data,
		    beforeSend: function(xhr, cfg) {
		    	$('.page-body').mask('show');
		    },
		    success: function(res, ts) {
		    	if (res.code == "0") {
		    		CxCtrl.alert('审核成功');
		    		getBxxx({reset:true});
		    	} else CxMsg.warn('审核失败：' + res.message);
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.warn('审核失败：' + msg);
		    },
	        complete: function(xhr, ts) {
	        	$('.page-body').mask('hide');
	        }
		});
	});
}
function undo(el) {
	let target = $(el), item = target.closest('.bxxx').data('json');
	let f = document.querySelector('#undoBxclModal form');
	f.reset();
	f.bxid.value = item.bxid;
	$('#undoBxclModal').modal('show');
}

function showBxxxMx(el) {
	let target = $(el), wrap = target.closest('.bxxx');
		
	let imgs = [], imgsWrapper = [], item = target.closest('.bxxx').data('json');
	if (item.bxtpdz1)
		imgs.push(item.bxtpdz1);
	if (item.bxtpdz2)
		imgs.push(item.bxtpdz2);
	if (item.bxtpdz3)
		imgs.push(item.bxtpdz3);
	if (item.bxtpdz4)
		imgs.push(item.bxtpdz4);
	if (imgs.length > 0) {
		for (let i=0; i<imgs.length; i++)
			imgsWrapper.push(`<div class="col-${12/imgs.length} cx-d-i-flex-center thumbnail thumbnail-auto"><div><img src="${CxMisc.finalizeUrl(imgs[i])}" onload="adjustImgSize($(this).closest('.row'))" style="max-width: none; max-height: 100%;"/></div></div>`);
		imgsWrapper.push('<div class="bubble top-left"><span>报修图片</span></div>');
		wrap.find('[data-f-name=bxtp]').append(imgsWrapper.join(''));
	}
	let imgs2 = [], imgsWrapper2 = [];
	if (item.bxcltpdz1)
		imgs2.push(item.bxcltpdz1);
	if (item.bxcltpdz2)
		imgs2.push(item.bxcltpdz2);
	if (item.bxcltpdz3)
		imgs2.push(item.bxcltpdz3);
	if (item.bxcltpdz4)
		imgs2.push(item.bxcltpdz4);
	if (imgs2.length > 0) {
		for (let i=0; i<imgs2.length; i++)
			imgsWrapper2.push(`<div class="col-${12/imgs2.length} cx-d-i-flex-center thumbnail thumbnail-auto"><div><img src="${CxMisc.finalizeUrl(imgs2[i])}" onload="adjustImgSize($(this).closest('.row'))" style="max-width: none; max-height: 100%;"/></div></div>`);
		imgsWrapper2.push('<div class="bubble top-left"><span>处理图片</span></div>');
		imgsWrapper2.unshift('<div class="row no-gutters p-relative mb-0">');
		imgsWrapper2.push('</div>');
		wrap.find('[data-f-name=cljg]').find('[data-f-name=bxcltp]').append(imgsWrapper2.join(''));
	}
	wrap.find('.thumbnail img').click(function(){
		CxGz.popImg(this);
	});
	target.addClass('d-none');
	wrap.find('[data-f-name=bxtp],[data-f-name=cljg]').slideDown();
}
function allot(el){
	let f = document.querySelector('#allotBxModal form'), item = $(el).closest('.bxxx').data('json');
	f.bxid.value = item.bxid;
	f.clnr.value = '';
	if (f.towybmid.getAttribute('data-loaded') != 'true') {
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/hygl/getSqbm'),
		    type: "GET",
		    data: {sqdm: getCurrentSq().sqdm},
		    success: function(res, ts) {
		    	if (res.code == "0") {
		    		if (res.data) {
            			for (let i=0; i<res.data.length; i++) {
            				f.towybmid.options.add(new Option(res.data[i].sqbmmc, res.data[i].sqbmid));
            			}
            		}
		    		f.towybmid.setAttribute('data-loaded', 'true');
		    	} else CxMsg.warn('获取社区部门信息失败：' + res.message);
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.warn('获取社区部门信息失败：' + msg);
		    }
		});
	}
	$('#allotBxModal').modal('show');
}
function follow(el){
	let item = $(el).closest('.bxxx').data('json');
	CxCtrl.confirm(`确定受理该${item.bxsxmc}？`, function(){
		let data = {bxid: item.bxid, bxcllxdm: '1', clnr: `受理${item.bxsxmc}`};
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/bx/updateBxcl'),
		    type: "POST",
		    data: data,
		    beforeSend: function(xhr, cfg) {
		    	$('.page-body').mask('show');
		    },
		    success: function(res, ts) {
		    	if (res.code == "0") {
		    		CxCtrl.alert('受理成功');
		    		getBxxx({reset:true});
		    	} else CxMsg.warn('受理失败：' + res.message);
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.warn('受理失败：' + msg);
		    },
	        complete: function(xhr, ts) {
	        	$('.page-body').mask('hide');
	        }
		});
	});
}

function upload(el){
	if (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1') { //用于本地展示之用
		CxCtrl.alert('本地不能上传图片到微信');
	} else {
		if (!gBxcs) {
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/gz/wyhzs/bx/getBxcs'),
			    type: "GET",
			    data: {url: window.location.href},
			    beforeSend: function(xhr, cfg) {
		        	CxMisc.markAjaxStart($(el));
		        },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		gBxcs = res.data;
			    		wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来    
							appId: gBxcs.appid,
							timestamp: gBxcs.timestamp,
							nonceStr: gBxcs.nonceStr,
							signature: gBxcs.signature,
							jsApiList: ['checkJsApi', 'chooseImage', 'previewImage', 'uploadImage']
			    		});
			    		wx.ready(function(){
			    			upload(el);
			    		});
			    		wx.error(function(res){
			    			CxCtrl.alert('获取微信上传功能失败：'+res.errMsg);
			    		});
			    	} else {
			    		CxCtrl.alert('获取报修上传参数失败, 请稍后重新打开：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxCtrl.alert('获取报修上传参数失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd($(el));
		        }
			});
		} else {
			let imgCount = $('#processBxModal .bx-img-wrapper .thumbnail').length;
			if (imgCount < 4) {
				wx.chooseImage({
					count: 4 - imgCount,
					sizeType: ['original', 'compressed'],
				    sourceType: ['camera', 'album'],
				    success: function (res) {
				    	let localIds = res.localIds, localIdIndex = 0;
				    	
				    	let _upload = function() {
					    	wx.uploadImage({
						        localId: localIds[localIdIndex],
						        isShowProgressTips: 1, // 默认为1，显示进度提示
						        success: function (resp) {
						        	imgCount++;
						        	let wrap = $('#processBxModal .bx-img-wrapper');
						        	wrap.children('.thumbnail').removeClass('col-12 col-6 col-4 col-3').addClass(`col-${12/imgCount}`);
						        	wrap.append(`<div class="col-${12/imgCount} cx-d-i-flex-center thumbnail thumbnail-auto">
						        					<div><img src="${localIds[localIdIndex]}" onload="adjustImgSize($(this).closest('.bx-img-wrapper'))" style="max-width: none; max-height: 100%;"></div>
						        					<span class="cx-close circle top-right"><span><a href="javascript:;"><i class="fas fa-times"></i></a></span></span>
						        					<input type="hidden" name="bxcltpdz" value="${resp.serverId}">
						        			</div>`);
						        	wrap.children('.thumbnail:last-child').find('img').click(function(){
										CxGz.popImg(this);
									});
						        	wrap.children('.thumbnail:last-child').find('.cx-close').click(function(){
										$(this).closest('.thumbnail').remove();
										adjustImgSize(wrap);
									});
						        	
						            //如果还有照片，继续上传
									localIdIndex++;
									if (imgCount<4 && localIdIndex < localIds.length) {
										_upload();
									}
						        },fail: function (error) {
						        	CxCtrl.alert(JSON.stringify(error));
						        }
						    });
					    }
				    	_upload();
					}
				});
			} else CxCtrl.alert('最多只可上传4张图片');
		}
	}
}

function adjustImgSize(wrap) { //计算图片与容器的尺寸合图片显示最大化
	let imgCount = wrap.find('.thumbnail').length;
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


function bind(){
	let qs = CxMisc.qs.parse(CxMisc.qs.extract(window.location.href));
	if (qs.clztdm !== undefined) $(`.page-body .cx-status-bar a[data-toggle="tab"][data-status="${qs.clztdm}"]`).click();
	else {
		if (qs.sqdm) $(`.page-body .cx-status-bar a[data-toggle="tab"][data-status=""]`).click();
		else $(`.page-body .cx-status-bar a[data-toggle="tab"][data-status="0"]`).click();
	}
	
	$('.page-title .link[data-cmd="switch-sq"]').click(function(e){
		if (!$(this).hasClass('disabled')) {
			popSwitchSq(this);
		}
	});
	
	$('.page-title .link[data-cmd="create-bx"]').click(function(e){
		if (!$(this).hasClass('disabled')) {
			let data = {y: parseInt($(document).scrollTop())};
			let clztdm = document.querySelector('.page-body .cx-status-bar a.active').getAttribute('data-status');
			if (clztdm != '') data.clztdm = clztdm;
			data.sqdm = getCurrentSq().sqdm;
			push2History(data);
			window.location.href = CxMisc.finalizeUrl4Wx('/gz/wyhzs/bx/add?sqdm='+data.sqdm);
		}
	});
	
	$('.page-body .cx-status-bar a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		getBxxx({reset:true});
	});
	
	CxMisc.formValidated('#allotBxModal form', function(f){
		let frm = $(f), data = frm.serializeJson({removeBlankField:true});
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/bx/updateBxcl'),
		    type: "POST",
		    data: data,
		    beforeSend: function(xhr, cfg) {
	        	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
	        },
		    success: function(res, ts) {
		    	if (res.code == "0") {
		    		CxCtrl.alert('调拨成功');
		    		getBxxx({reset:true});
		    		frm.closest('.modal').modal('hide');
		    	} else {
		    		CxMsg.warn('调拨失败：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.warn('调拨失败：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
	        }
		});
	});
	
	
	$('#processBxModal .btn[data-cmd=upload]').click(function(e){
		upload(this);
	});
	CxMisc.formValidated('#processBxModal form', function(f){
		let frm = $(f), data = frm.serializeJson({removeBlankField:true});
		if (data.bxcltpdz) {
			if (typeof data.bxcltpdz === 'object') {
				for (let i=0; i<data.bxcltpdz.length; i++) data['bxcltpdz'+(i+1)] = data.bxcltpdz[i];
			} else {
				data['bxcltpdz1'] = data.bxcltpdz;
			}
			delete data.bxcltpdz;
		}
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/bx/updateBxcl'),
		    type: "POST",
		    data: data,
		    beforeSend: function(xhr, cfg) {
	        	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
	        },
		    success: function(res, ts) {
		    	if (res.code == "0") {
		    		CxCtrl.alert('保存成功');
		    		getBxxx({reset:true});
		    		frm.closest('.modal').modal('hide');
		    	} else {
		    		CxMsg.warn('保存失败：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.warn('保存失败：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
	        }
		});
	});
	
	
	CxMisc.formValidated('#submitBxclModal form', function(f){
		let frm = $(f), data = frm.serializeJson({removeBlankField:true});
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/bx/updateBxcl'),
		    type: "POST",
		    data: data,
		    beforeSend: function(xhr, cfg) {
	        	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
	        },
		    success: function(res, ts) {
		    	if (res.code == "0") {
		    		CxCtrl.alert('提交成功');
		    		getBxxx({reset:true});
		    		frm.closest('.modal').modal('hide');
		    	} else {
		    		CxMsg.warn('提交失败：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.warn('提交失败：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
	        }
		});
	});
	
	CxMisc.formValidated('#fallbackBxclModal form', function(f){
		let frm = $(f), data = frm.serializeJson({removeBlankField:true});
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/bx/updateBxcl'),
		    type: "POST",
		    data: data,
		    beforeSend: function(xhr, cfg) {
	        	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
	        },
		    success: function(res, ts) {
		    	if (res.code == "0") {
		    		CxCtrl.alert('退回成功');
		    		getBxxx({reset:true});
		    		frm.closest('.modal').modal('hide');
		    	} else {
		    		CxMsg.warn('退回失败：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.warn('退回失败：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
	        }
		});
	});
	
	CxMisc.formValidated('#undoBxclModal form', function(f){
		let frm = $(f), data = frm.serializeJson({removeBlankField:true});
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/bx/updateBxcl'),
		    type: "POST",
		    data: data,
		    beforeSend: function(xhr, cfg) {
	        	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
	        },
		    success: function(res, ts) {
		    	if (res.code == "0") {
		    		CxCtrl.alert('重新激活成功');
		    		getBxxx({reset:true});
		    		frm.closest('.modal').modal('hide');
		    	} else {
		    		CxMsg.warn('重新激活失败：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.warn('重新激活失败：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
	        }
		});
	});
	
	getBxxx({init: true});
	
	CxNotifier.consume();
}

let gBxcs = null, gHyxx = null, gHylx = null;
$(function(){
	bind();
	prepare();
});

