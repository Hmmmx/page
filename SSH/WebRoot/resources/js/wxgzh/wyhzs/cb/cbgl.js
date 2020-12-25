function genCmbxIndexer(lcdmMap){
	let idxList = [];
	for (let lcdm in lcdmMap) {
		idxList.push(`<span data-f-name='lcdm'>${lcdm}</span>`);
	}
	let wrap = $('body');
	wrap.children('.cbmx-lcdm-indexer').remove();
	if (idxList.length > 1) {
		wrap.append(`<div class="cbmx-lcdm-indexer">${idxList.join('')}</div>`).find('span[data-f-name=lcdm]').click(function(){
			let lc = $('.cbmx-list-wrapper .cbmx-list-body .cbmx-lc-wrapper[data-lcdm="'+this.innerText+'"]');
			if (lc.length == 1) {
				let t0 = $(document.querySelector('.cbmx-list-wrapper .cbmx-list-body .cbmx-lc-wrapper')).offset().top;
				lc.css({transition: '', 'background-color': '#f5deb3'}); //#f5deb3, f0e68c
				$("body,html").animate({scrollTop: lc.offset().top - t0}, 300, function(){
					setTimeout(function(){lc.css({transition: 'background-color .5s linear .6s', 'background-color': ''});}, 50);
				});
			}
		});
		
		let h0=window.innerHeight, h1=$('.page-title').outerHeight(true), 
			h2=$('.page-body .cx-filter-bar').outerHeight(true), h3=20,
			h = document.querySelector('.cbmx-lcdm-indexer').scrollHeight,
			hh = h0 - h1 - h2 - h3;
		if (h < hh) $('.cbmx-lcdm-indexer').css({'top': Math.floor((hh-h)/2)+'px'});
	}
}

async function prepare(){
	CxWg.loadAllDmList(document.querySelector('.page-body'));
	
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
			gSqbmList = await p_getHybm();

			let res = await p_getSq();
			if (res.code == '0') {
				let sqList = [];
				for (let i=0; i<res.data.length; i++) {
					if (cbable(res.data[i].sqdm)) sqList.push(res.data[i]);
				}
				
				let el = document.querySelector('.page-title .link[data-cmd="switch-sq"]');
				el.setAttribute('data-sq-list', JSON.stringify(sqList));
				switchSq(CxMisc.qs.get('sqdm'));
				
				if (sqList && sqList.length>0) $('.page-title .link').removeClass('disabled');
			} else CxCtrl.alert(res.message);
		}
	}
}
function cbable(sqdm){
	if (gSqbmList && sqdm) {
		for (let i=0; i<gSqbmList.length; i++) {
			if (gSqbmList[i].sqdm == sqdm) {
				if (gSqbmList[i].slbmbj == '2') return true; //抄表部门
			}
		}
	}
	return false;
}

function p_getHybm() {
	return new Promise(function(resolve, reject){
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/hygl/getHybm'),
		    type: "GET",
		    success: function(res, ts) {
		    	if (res.code == "0")
		    		resolve(res.data);
		    	else 
		    		resolve({code:'failed', message: '获取社区部门信息失败：' + res.message});
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	resolve({code:'error', message: '获取社区部门信息失败：' + msg});
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
		
		let tv = $('.page-body input[data-cx-ctrl="fcxx-tree"]');
		tv.fcxxTree('refresh');
		if (tv.fcxxTree('initialized')) {
			tv.fcxxTree('clear');
		}
	} else {
		el.querySelector('[data-f-name="sqmc"]').innerHTML = '暂无社区';
	}
}
function getCurrentSq() {
	let sq = document.querySelector('.page-title .link[data-cmd="switch-sq"]').getAttribute('data-current-sq');
	if (sq) return JSON.parse(sq);
	else null;
}


function getCbjlList(e) {
	let el=e.target, f=document.querySelector('.page-body .cx-filter-bar form');
	if (f.fczymc.value != '' && f.yblxdm.value != '') {
		let data = $(f).serializeJson({removeBlankField:true});
		delete data.fczymc; // 选中的房产资源名称不需要作为参数
		CxMisc.ajax({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/cb/getCbjlList'),
		    type: "GET",
		    data: data,
		    beforeSend: function(xhr, cfg) {
		    	$('.page-body').mask('show', {msg: '载入中，请稍候...'});
		    },
		    success: function(res, ts) {
		    	$('.cbmx-list-wrapper .cbmx-list-body .cbmx-lc-wrapper').remove();
		    	if (res.code == '0') {
		    		let lcdmMap = {};
		    		for (let i=0; i<res.data.length; i++) {
		    			let item = res.data[i], lcdm = item.lcdm+'';
		    			if (!lcdmMap[lcdm]) lcdmMap[lcdm] = [];
		    			lcdmMap[lcdm].push(item);
		    		}
		    		
		    		let wrap = $('.cbmx-list-wrapper .cbmx-list-body');
		    		for (let lcdm in lcdmMap) {
		    			wrap.append(`<div class="cx-paragraph cbmx-lc-wrapper" data-lcdm="${lcdm}">
								<div class="cx-para-title"><span>${lcdm}层</span></div>
								<div class="cbmx-lc-list">
									<div class="row no-gutters cbmx-title">
						                <div class="col"><span>房号</span></div>
						                <div class="col text-center"><span>上期读数</span></div>
						                <div class="col text-center"><span>本期读数</span></div>
						                <div class="col-2 text-center"><span>更多</span></div>
						            </div>
								</div>
							</div>`);
		    			let lcWrap = wrap.children(':last-child').find('.cbmx-lc-list');
		    			for (let i=0; i<lcdmMap[lcdm].length; i++) {
		    				let item = lcdmMap[lcdm][i];
		    				lcWrap.append(`<div class="row no-gutters cbmx-item" data-id="${item.khybcbid}" data-ybid="${item.khybid}">
					                <div class="col" data-f-name="fchm">${item.fchm}</div>
					                <div class="col text-center" data-f-name="sqds">${item.sqds!==null?item.sqds:'0'}</div>
					                <div class="col">
					                    <input type="text" class="form-control form-control-sm" name="bqds" value="${item.bqds!==null?item.bqds:''}" maxlength="12" pattern="^0|(0\\.\\d+)|([1-9]\\d*)|([1-9]\\d*\\.\\d+)$" autocomplete="off">
					                </div>
					                <div class="col-2 text-center">
					                    <button type="button" class="btn btn-link" data-cmd="more"><i class="fas fa-ellipsis-h"></i></button>
					                </div>
					            </div>`);
		    				lcWrap.children(':last-child').attr('data-json', JSON.stringify(item));
		    			}
		    		}
		    		wrap.find('input[name=bqds]').on('input', function(){ markUpdated($(this).closest('.cbmx-item')); });
		    		wrap.find('button[data-cmd=more]').click(function(){ openMore(this); });
		    		
		    		genCmbxIndexer(lcdmMap);
		    		adjustPageLayout();
		    	} else {
		    		CxCtrl.alert('载入抄表记录失败：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxCtrl.alert('载入抄表记录失败：' + msg);
		    	$('.cbmx-list-wrapper .cbmx-list-body .cbmx-lc-wrapper').remove();
		    },
		    complete: function(xhr, ts) {
		    	$('.page-body').mask('hide');
		    }
		});
	}
}

function getCbmxData(el) {
	let moreData = $(el).attr('data-more'),
		json = $(el).data('json'), 
		more = moreData ? JSON.parse(moreData) : {},
		bqds = $(el).find('input[name=bqds]').val();
	return Object.assign({}, json, more, {bqds: bqds});
}
function openMore(el){
	let cbmx = getCbmxData($(el).closest('.cbmx-item')), f = document.querySelector('#cbmxMoreModal form');
	f.reset();
	if (cbmx.khybcbid) f.khybcbid.value = cbmx.khybcbid;
	if (cbmx.khybid) f.khybid.value = cbmx.khybid;
	
	if (cbmx.fchm) f.fchm.value = cbmx.fchm;
	if (cbmx.ghbj !== null) CxMisc.selectSelect('ghbj', cbmx.ghbj, f);
	
	if (cbmx.jbyl !== null) f.jbyl.value = cbmx.jbyl;
	else f.jbyl.value = '0';
	
	if (cbmx.sqcbrq) $('#cbmxMoreCblrSqDtp_p').datetimepicker('date', cbmx.sqcbrq);
	if (cbmx.bqcbrq) $('#cbmxMoreCblrBqDtp_p').datetimepicker('date', cbmx.bqcbrq);
	else $('#cbmxMoreCblrBqDtp_p').datetimepicker('date', new Date());
	
	if (cbmx.sqds !== null) f.sqds.value = cbmx.sqds;
	else f.sqds.value = '0';
	
	if (cbmx.bqds !== null) f.bqds.value = cbmx.bqds;
	if (cbmx.bqyl !== null) f.bqyl.value = cbmx.bqyl;
	
	if (cbmx.bz) f.bz.value = cbmx.bz;
	
	$('#cbmxMoreModal').modal('show');
}
function saveMore(f){
	let frm = $(f), data = frm.serializeJson({removeBlankField:true});
	let item = null;
	if (data.khybcbid) item = $(`.cbmx-list-wrapper .cbmx-list-body .cbmx-lc-wrapper .cbmx-item[data-id="${data.khybcbid}"]`);
	else item = $(`.cbmx-list-wrapper .cbmx-list-body .cbmx-lc-wrapper .cbmx-item[data-ybid="${data.khybid}"]`);
	
	if (data.sqds !== null) item.find('[data-f-name=sqds]').text(data.sqds);
	if (data.bqds !== null) item.find('input[name=bqds]').val(data.bqds);
	
	delete data.khybcbid;
	delete data.khybid;
	item.attr('data-more', JSON.stringify(data));
	item.find('button[data-cmd=more]').addClass('has-more');
	markUpdated(item);
	$('#cbmxMoreModal').modal('hide');
}

function saveCbmx(e) {
	let el=e.target, f=document.querySelector('.cbmx-list-wrapper form');
	if (CxMisc.validate(f)) {
		let cbmxList = $('.cbmx-list-wrapper .cbmx-list-body .cbmx-lc-wrapper .cbmx-item');
		if (cbmxList.length > 0) {
			let khybcbmxvoList = [], today = moment(new Date()).format('YYYY-MM-DD');
			cbmxList.each(function(){
				let updated = $(this).find('[data-f-name=fchm]').hasClass('updated'), bqds = this.querySelector('input[name=bqds]').value;
				if (updated && bqds) {
					let cbmx = getCbmxData(this);
					if (!cbmx.bqcbrq) cbmx.bqcbrq = today;
					if (cbmx.jbyl === null) cbmx.jbyl = 0;
					if (typeof cbmx.sqds !== 'number') cbmx.sqds = parseFloat(cbmx.sqds);
					if (typeof cbmx.jbyl !== 'number') cbmx.jbyl = parseFloat(cbmx.jbyl);
					if (typeof cbmx.bqds !== 'number') cbmx.bqds = parseFloat(cbmx.bqds);
					cbmx.bqyl = cbmx.bqds - cbmx.sqds;
					cbmx.sjyl = cbmx.ghbj == '1' ? (cbmx.bqyl+cbmx.jbyl) : cbmx.bqyl;
					khybcbmxvoList.push({
						khybcbid: cbmx.khybcbid,
						khybid: cbmx.khybid,
						sqcbid: cbmx.sqcbid,
						sqcbrq: cbmx.sqcbrq,
						sqds: cbmx.sqds,
						bqcbrq: cbmx.bqcbrq,
						bqds: cbmx.bqds,
						bqyl: cbmx.bqyl,
						ghbj: cbmx.ghbj,
						jbyl: cbmx.jbyl,
						sjyl: cbmx.sjyl,
						bz: cbmx.bz
					});
				}
			});
			if (khybcbmxvoList.length > 0) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/gz/wyhzs/cb/saveFccblr'),
				    type: "POST",
				    contentType: 'application/json;charset=utf-8',
				    data: JSON.stringify({khybcbmxvoList}),
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart($(el));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		CxToast.info('抄表录入保存成功');
				    		refresh();
				    	} else {
				    		CxToast.warn('抄表录入保存失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxToast.warn('抄表录入保存失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	CxMisc.markAjaxEnd($(el));
				    }
				});
			}
		}
	} else {
		CxToast.warn('请先修正或删除有错误的输入框');
		return false;
	}
}

function markUpdated(wrap){
	wrap.find('[data-f-name=fchm]').addClass('updated');
}

function refresh() {
	$('.page-body .cx-filter-bar select[name=yblxdm]').trigger('change');
}

function bind(){
	$('.page-title .link[data-cmd="switch-sq"]').click(function(e){
		if (!$(this).hasClass('disabled')) {
			popSwitchSq(this);
		}
	});
	
	$('.page-body .cx-filter-bar input[data-cx-ctrl=fcxx-tree]').on('input', function(e){
		getCbjlList(e);
	});
	$('.page-body .cx-filter-bar select[name=yblxdm]').change(function(e){
		getCbjlList(e);
	});
	
	$('#cbmxMoreModal div.date[data-cx-ctrl=date]').datetimepicker({
        format: 'YYYY-MM-DD',
	    date: null
	});
	$('#cbmxMoreModal select[name=ghbj]').change(function(){
		let f = this.form, disabled = this.value==0;
		f.jbyl.disabled = disabled;
		f.sqcbrq.disabled = disabled;
		f.sqds.disabled = disabled;
		if (disabled) { 
			let json = null;
			if (f.khybcbid.value) json = $(`.cbmx-list-wrapper .cbmx-list-body .cbmx-lc-wrapper .cbmx-item[data-id="${f.khybcbid.value}"]`).data('json');
			else json = $(`.cbmx-list-wrapper .cbmx-list-body .cbmx-lc-wrapper .cbmx-item[data-ybid="${f.khybid.value}"]`).data('json');
			f.sqcbrq.value = json.ysqcbrq; // 重新把值置为最原始数值
			f.sqds.value = json.ysqds;
			$(f.bqds).trigger('blur'); // 触发更改本期计数时方法
		}
	});
	$('#cbmxMoreModal input[name=sqds]').on('blur', function(){ // 触发更改本期计数时方法
		$(this.form.bqds).trigger('blur');
	});
	$('#cbmxMoreModal input[name=bqds]').on('blur', function(){ // 触发更改本期计数时方法
		let f = this.form;
		if (this.value != '' && $(this).is(':valid')) {
			let sqds = parseFloat(f.sqds.value), bqds = parseFloat(this.value);
			if (bqds >= sqds) {
				f.bqyl.value = bqds - sqds;
			} else { 
				f.bqyl.value = '';
				let now = new Date();
				if (gLastChecked == null || now.getTime() - gLastChecked.getTime() > 10000) { //短时间内不显示过多提示
					gLastChecked = now;
					CxToast.warn('本期读数不能小于上期读数'); 
				}
			}
		} else {
			f.bqyl.value = '';
		}
	});
	CxMisc.formValidated('#cbmxMoreModal form', function(f){ saveMore(f); });
	
	$('.page-action-bar button[data-cmd=save]').click(function(e){
		saveCbmx(e);
	});
}

let gHyxx = null, gSqbmList = null, gLastChecked = null;
$(function(){
	adjustPageLayout();
	bind();
	prepare();
	
	$('.cx-cbr').addClass('d-none'); // disable back2top
	window.setInterval(function(){
		$.get(CxMisc.finalizeUrl('/keepalive'), function(result){});
	}, 200000);
});

