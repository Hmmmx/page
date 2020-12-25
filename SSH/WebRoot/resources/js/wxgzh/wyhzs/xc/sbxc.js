async function prepare(){
	gHyxx = await p_getHyxx();
	if (gHyxx.code) {
		CxCtrl.alert(gHyxx.message);
	} else {
		if (!gHyxx.wyhymc || !gHyxx.sjhm) {
			CxCtrl.confirm('请先打开公众号菜单&lt;我的&gt;完善会员信息<br>是否立刻跳转到该页面？', function(){
				window.location.href = CxMisc.finalizeUrl4Wx('/gz/wyhzs/hygl?src=xc');
			});
		} else if (gHyxx.shbj != '1') {
			CxCtrl.alert('请等待后台完成会员审核');
		} else {
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
	let sqList = JSON.parse(el.getAttribute('data-sq-list')), sqdm = getCurrentSq().sqdm;
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
		
		getSbxc({reset:true});
	} else {
		el.querySelector('[data-f-name="sqmc"]').innerHTML = '暂无社区';
	}
}
function getCurrentSq() {
	let sq = document.querySelector('.page-title .link[data-cmd="switch-sq"]').getAttribute('data-current-sq');
	if (sq) return JSON.parse(sq);
	else null;
}

function getSbxc(opt){
	let wrap = $('.page-body .sbxc-list-wrapper .sbxc-list-body');
	if (wrap.children('.more').length == 0) {
		wrap.append('<div class="more"><span><i class="fas fa-circle-notch mr-1"></i>更多...</span></div>');
	}
	let more = wrap.children('.more');
	if (opt.reset) {
		$('.page-body .sbxc-list-wrapper .sbxc-list-body .sbxc').remove();
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
	    		$('.page-title .link[data-cmd="switch-sq"]').addClass('disabled');
	    		
	    		let f = document.querySelector('#queryListModal form'),
	    			data = $(f).serializeJson({removeBlankField:true});
	    		if (data.xcrqq) data.xcrqq += ":00";
				if (data.xcrqz) data.xcrqz += ":00";
	    		data.sqdm = getCurrentSq().sqdm;
		    	data.pageSize = 50;
		    	data.page = Math.floor($('.page-body .sbxc-list-wrapper .sbxc-list-body .sbxc').length/data.pageSize);
		    	let res = await p_getSbxc(data);
		    	
		    	if (res.code == '0') renderSbxcList(res.data);
		    	else CxCtrl.alert(res.message);
		    	
		    	let y = CxMisc.qs.get('y');
		    	if (y) setTimeout(function(){$(document).scrollTop(y);},400);
		    	
	    		
	    		if (res.data===null || res.data.length < data.pageSize) {
	    			more.data('has-more', 'N'); // 小于pageSize时表示没有更多数据
	    			more.find('span').text('没有更多巡查记录了');
				};
	    		more.appendTo(more.parent()); // 把空白提示行移到未尾
	    		more.data('loading', 'N');
	    		more.find('i').removeClass('fa-spin');
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
function p_getSbxc(data){
	return new Promise(function(resolve, reject){
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/sbxc/getXcmx'),
		    type: "GET",
		    data: data,
		    success: function(res, ts) {
		    	if (res.code == "0")
		    		resolve(res);
		    	else 
		    		resolve({code:'failed', message: '获取巡查记录信息失败：' + res.message});
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	resolve({code:'error', message: '获取巡查记录信息失败：' + msg});
		    },
		});
	});
}
function renderSbxcList(data) {
	let wrap = $('.page-body .sbxc-list-wrapper .sbxc-list-body');
	for (let i=0; i<data.length; i++) {
		let item = data[i], xcsm = item.xcsm?('巡查说明：'+item.xcsm):'无巡查说明', 
			xcsmClass=item.xcsm?' text-black-50':' text-black-50 d-none';
		wrap.append(`<div class="sbxc" data-id="${item.sbxcmxid}">
				<div class="mb-1">${CxMisc.escapeHtml(item.xcsbbt)}</div>
				<div class="mb-1">${interpretZtbj(item.ztbj)} - <span class="cx-f-sm">${item.xcsj}</span></div>
				<div class="mb-1 cx-f-xs ${xcsmClass}">${xcsm}</div>
				<div class="row no-gutters p-relative" style="display:none;" data-f-name="xctp">
                    <div class="no-data"><span>无巡查图片</span></div>
                </div>
				<div class="text-right">
					<button type="button" class="btn btn-sm btn-outline-secondary" data-cmd="show-mx"><i class="fas fa-angle-down mr-1"></i><span>详细</span></button>
				</div>
			</div>`);
		wrap.children(':last-child').attr('data-json', JSON.stringify(item));
	}
	wrap.find('button[data-cmd="show-mx"]').click(function(){ showSbxcMx(this); });
}

function interpretZtbj(dm){
	switch(dm){
		case '0': return '<span class="text-danger">不正常</span>';
		case '1': return '正常';
	}
	return '';
}


function showSbxcMx(el) {
	let target = $(el), wrap = target.closest('.sbxc');
		
	let imgs = [], imgsWrapper = [], item = target.closest('.sbxc').data('json');
	if (item.xctpdz1)
		imgs.push(item.xctpdz1);
	if (item.xctpdz2)
		imgs.push(item.xctpdz2);
	if (item.xctpdz3)
		imgs.push(item.xctpdz3);
	if (item.xctpdz4)
		imgs.push(item.xctpdz4);
	if (imgs.length > 0) {
		for (let i=0; i<imgs.length; i++)
			imgsWrapper.push(`<div class="col-${12/imgs.length} cx-d-i-flex-center thumbnail thumbnail-auto"><div><img src="${CxMisc.finalizeUrl(imgs[i])}" onload="adjustImgSize($(this).closest('.row'))" style="max-width: none; max-height: 100%;"/></div></div>`);
		imgsWrapper.push('<div class="bubble top-left"><span>巡查图片</span></div>');
		wrap.find('[data-f-name=xctp]').append(imgsWrapper.join(''));
	}
	
	wrap.find('.thumbnail img').click(function(){
		CxGz.popImg(this);
	});
	target.addClass('d-none');
	wrap.find('[data-f-name=xctp],[data-f-name=cljg]').slideDown();
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
	
	$('.page-title .link[data-cmd="switch-sq"]').click(function(e){
		if (!$(this).hasClass('disabled')) {
			popSwitchSq(this);
		}
	});
	
	$('.page-title .link[data-cmd="query"]').click(function(e){
		if (!$(this).hasClass('disabled')) {
			$('#queryListModal').modal('show');
		}
	});
	CxMisc.formValidated('#queryListModal form', function(f){ 
		if (CxMisc.validate(f)) { 
			getSbxc({reset:true}); 
			$('#queryListModal').modal('hide');
		} 
	});
	
	$('#queryListModal div.date[data-cx-ctrl="date-time"]').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        debug: false,
	    date: null
	});
	
	getSbxc({init: true});
	CxNotifier.consume();
}

let gHyxx = null;
$(function(){
	let sbxcid = CxMisc.qs.get('sbxcid');
	if (sbxcid) {
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/wyhzs/sbxc/add?sbxcid='+sbxcid);
	} else {
		prepare();
		bind();
	}
});

