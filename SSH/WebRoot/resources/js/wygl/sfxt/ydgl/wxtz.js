if (typeof window.SfYdWxtz === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfYdWxtzCntr';
	const mbFrmSelector = '#wgSfYdWxtzMbFrm';
	const fsFrmSelector = '#wgSfYdWxtzFsFrm';
	
	const loadingMask1 = '#wgSfYdWxtzCntr';
	
	const me = window.SfYdWxtz = {
		bind: function() {
			me.refresh();
			
			//CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			
			$(`${mbFrmSelector} select[name=mbdm]`).change(function(){
				me.switchMbdm(this);
			});
			$(`${mbFrmSelector} button[data-cmd=next]`).click(function(){
				me.gotoFs(this);
			});
			
			$(`${fsFrmSelector} input[data-cx-ctrl=fcxx-tree]`).fcxxTree({ensureSqdm:true});
			$(`${fsFrmSelector} div.date[data-cx-ctrl=date]`).datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			$(`${fsFrmSelector} select[name=dkbj]`).change(function(){
		        me.switchDkbj(this);
			});
			CxMisc.loadAllDmList(document.querySelector(fsFrmSelector));
			$(`${fsFrmSelector} button[data-cmd=prev]`).click(function(){
				me.gotoMb(this);
			});
			$(`${fsFrmSelector} button[data-cmd=send]`).click(function(){
				me.submitFs(this);
			});
		},
		
		refresh: function(){
			// document.querySelector(mbFrmSelector).reset();
			
			me.getMb();
			if (!$(`${cntrSelector} .main-content .nav-tabs a[data-type=mb]`).hasClass('active')) // 显示选择模板页
				$(`${cntrSelector} .main-content .nav-tabs a[data-type=mb]`).click();
		},
		
		getMb: function(){
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/wxtz/getMbxx'),
			    type: "GET",
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask1).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let f = document.querySelector(mbFrmSelector);
			    			for (let i=f.mbdm.options.length-1; i>0; i--) f.mbdm.remove(i);
			    			for (let i=0; i<res.data.length; i++) {
			    				f.mbdm.options.add(new Option(res.data[i].bt, res.data[i].mbdm));
			    			}
			    			f.setAttribute('data-json', JSON.stringify(res.data));
			    		}
			    	} else {
			    		CxMsg.error('载入微信模板失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入微信模板失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$(loadingMask1).mask('hide');
			    }
			});
		},
		
		gotoFs: function(el) {
			if (CxMisc.validate(el.form)) {
				$(`${cntrSelector} .main-content .nav-tabs a[data-type=fs]`).click();
			}
		},
		gotoMb: function(el) {
			$(`${cntrSelector} .main-content .nav-tabs a[data-type=mb]`).click();
		},
		
		switchMbdm: function(el) {
			el.form.mbnr.value = '';
			let mbxxList = JSON.parse(el.form.getAttribute('data-json'));
			for (let i=0; i<mbxxList.length; i++) {
				if (mbxxList[i].mbdm == el.value) {
					el.form.mbnr.value = mbxxList[i].nr;
					break;
				}
			}
		},
		switchDkbj: function(el) {
			let disabled = el.value != '1';
			el.form.dkfadm.disabled = disabled;
			el.form.dkfadm.required = !disabled;
			if (!disabled) $(el.form.dkfadm).closest('.form-group').children('label').addClass('required');
			else $(el.form.dkfadm).closest('.form-group').children('label').removeClass('required');
		},
		
		submitFs: function(el) {
			if (CxMisc.validate(el.form)) {
				let f1 = document.querySelector(mbFrmSelector), f2 = document.querySelector(fsFrmSelector);
				let data1 = $(f1).serializeJson({removeBlankField:true}), data2 = $(f2).serializeJson({removeBlankField:true}); // 每次查询后都缓存查询条件，给分页调用
				delete data2.fczymc; // 选中的房产资源名称不需要作为参数
				let data = Object.assign({}, data1, data2);
				
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/wxtz/addWxtz'),
				    type: "POST",
				    data: data,
				    beforeSend: function(xhr, cfg) {
				    	$(loadingMask1).mask('show', {msg: '处理中，请稍候...'});
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		CxMsg.info('提交发送任务成功');
				    		me.gotoMb();
				    		document.querySelector(mbFrmSelector).reset();
				    	} else {
				    		CxMsg.error('提交发送任务失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('提交发送任务失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	$(loadingMask1).mask('hide');
				    }
				});
			}
		}
	}
}
SfYdWxtz.bind();