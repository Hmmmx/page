async function prepare(){
	let hyxx = await p_getHyxx();
	
	if (hyxx.code) {
		CxCtrl.alert(hyxx.message);
	} else {
		if (hyxx.wyhydm) $('[data-f-name="hydm"]').text(hyxx.wyhydm);
		let f = document.querySelector('.page-body form');
		if (hyxx.wyhymc) f.wyhymc.value = hyxx.wyhymc;
		if (hyxx.sjhm) f.sjhm.value = hyxx.sjhm;
		
		let redirect = CxMisc.qs.get('src') && CxMisc.qs.get('src')!='';
		if (redirect) $('.page-title .back').removeClass('d-none');
		
		if (!hyxx.wyhymc || !hyxx.sjhm) {
			if (!redirect) CxCtrl.alert('请完善会员信息'); // 从其他页面跳转来的不显示提示
		} else if (hyxx.shbj != '1') {
			CxCtrl.alert('请等待后台完成会员审核');
		} else {
			let hybmList = await p_getHybm();
			if (hybmList && hybmList.length>0) {
				let wrap = $('.page-body [data-f-name=hybm] .cx-pair-list');
				let sqs = {};
				for (let i=0; i<hybmList.length; i++) {
					if (hybmList[i].sqdm && !sqs[hybmList[i].sqdm]) sqs[hybmList[i].sqdm] = {mc:hybmList[i].sqmc, bms:[]};
					let bmmc = hybmList[i].sqbmmc;
					if (hybmList[i].hylx != '0')  bmmc += '('+ (hybmList[i].hylx=='1'?'主管':'上级主管') +')';
					sqs[hybmList[i].sqdm].bms.push(bmmc);
				}
				for (let sq in sqs) {
					wrap.append(`<div class="cx-pair"><div>${sqs[sq].mc}</div><div>${sqs[sq].bms.join(', ')}</div></div>`);
				}
				document.querySelector('.page-action-bar button[data-cmd=unbind]').disabled = false;
			}
		}
	}
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

function bind(){
	$('.page-title .back').click(function(e){
		window.history.back();
	});
	
	$('.page-action-bar button[data-cmd=save]').click(function(e){
		let el=e.target, f=document.querySelector('.page-body form');
		if (CxMisc.validate(f)) {
			let data = $(f).serializeJson({removeBlankField:true});
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/gz/wyhzs/hygl/updateHyxx'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
		        	CxMisc.markAjaxStart($(el));
		        },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxCtrl.alert('保存成功');
			    	} else {
			    		CxCtrl.alert('保存失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxCtrl.alert('保存失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd($(el));
		        }
			});
		}
	});
	
	$('.page-action-bar button[data-cmd=unbind]').click(function(e){
		let self = this;
		CxCtrl.confirm('是否确定解除所有社区的所有部门？', function(){
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/gz/wyhzs/hygl/deleteBmhy'),
			    type: "GET",
			    beforeSend: function(xhr, cfg) {
		        	CxMisc.markAjaxStart($(self));
		        },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		$('.page-body [data-f-name=hybm] .cx-pair-list').children('.cx-pair').remove();
			    		setTimeout(function(){self.disabled = true;}, 400);
			    		CxCtrl.alert('解除部门成功');
			    	} else {
			    		CxCtrl.alert('解除部门失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxCtrl.alert('解除部门失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd($(self));
		        }
			});
		});
	});
}

$(function(){
	adjustPageLayout();
	bind();
	prepare();
});