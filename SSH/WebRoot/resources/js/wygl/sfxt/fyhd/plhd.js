if (typeof window.SfHdPlhd === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfHdPlhdCntr';
	const treeSelector = '#wgSfHdPlhdCntr .tv-wrapper';
	const baSqFrmSelector = '#wgSfHdplhdBaSqFrm';
	const baApplyFrmSelector = '#wgSfHdplhdBaApplyFrm';
	
	const me = window.SfHdPlhd = {
		bind: function() {
			me.loadSqList();
			CxMisc.enableFullpage(cntrSelector);
			$(`${cntrSelector} .toolbar button[data-cmd=back]`).click(function(){
				me.openSqTab(this);
			});
			$(cntrSelector).find('.toolbar button[data-cmd=save]').click(function(e){
				//$(`${baApplyFrmSelector} button[type=submit]`).click();
				me.save(this, e);
			});
			
			$(`${baApplyFrmSelector} select[name=sfbzid], ${baApplyFrmSelector} select[name=khlxdm]`).change(function(){
				//$(treeSelector).treeview('switchKhlx', {presentable:{'kh': this.value}, silent:true});
				me.getYhdKhxx();
			});
			
			$(cntrSelector).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			
			CxMisc.formValidated(baSqFrmSelector, function(f){ me.openSfbzTab(f); });
			CxMisc.formValidated(baApplyFrmSelector, function(f){ 
				//me.save(); 
			});
		},
		
		openSqTab: function(el) {
			$(`${cntrSelector} .toolbar button[data-cmd=back]`)[0].disabled = true;
			$(`${cntrSelector} .toolbar button[data-cmd=save]`)[0].disabled = true;
			
			$(`${cntrSelector} .nav-tabs a[data-type=sq]`).click();
		},
		
		openSfbzTab: function(f) {
			document.querySelector(baApplyFrmSelector).reset();
			// document.querySelector(baApplyFrmSelector).sqdm.value = me.getSqdm();
			me.loadFcxxTree();
			me.loadSfbz(f.sqdm.value);
			
			$(`${cntrSelector} .toolbar button[data-cmd=back]`)[0].disabled = false;
			$(`${cntrSelector} .toolbar button[data-cmd=save]`)[0].disabled = false;
			
			$(`${cntrSelector} .nav-tabs a[data-type=sfbz]`).click();
		},
		
		getSqdm: function() {
			return document.querySelector(baSqFrmSelector).sqdm.value;
		},
		
		getKhlxdm: function() {
			return document.querySelector(baApplyFrmSelector).khlxdm.value;
		},
		
		getCheckedNodeIds: function() {
			let ret = null, checkeds = $(treeSelector).treeview('getChecked');
			if (checkeds) {
				ret = {lys: [], khs: []};
				for (let i=0; i<checkeds.length; i++) {
					let node = checkeds[i];
					//if (node.data.type == 'ly' && !node.state.disabled && !node.loaded) { // 选中的但没有载入过下级数据的楼宇传到后台处理
					//	ret.lys.push(node.data.id);
					//}
					if (node.data.type == 'kh' && !node.state.disabled) {
						ret.khs.push(node.data.id);
					}
				}
			}
			return ret;
		},
		
		loadFcxxTree: function() {
			let tv = $(treeSelector), p = tv.parent();
			if (tv.hasClass('treeview')) tv.treeview('remove'); // 删除旧的已生成的树
			tv.remove();
			p.append('<div class="tv-wrapper"></div>');
			let opt = {
					range: 60, 
					expandAddNode: true,
					checkbox:true, 
					checkedEventType: 'hierarchy', 
					selectable:{}, 
					exclusive:{'kh': true}, 
					presentable:{'sq': me.getSqdm(), 'kh': me.getKhlxdm()}
			};
			CxWg.loadFcxxTree(treeSelector, opt);
		},
		
		loadSfbz: function(sqdm) {
			let el = document.querySelector(baApplyFrmSelector).sfbzid;
			CxMisc.ajax({
	            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfbz'),
	            type: "GET",
	            data: {sqdm: sqdm, fylxdmStr: '01,04'},
	            beforeSend: function(xhr, cfg) {
	            	el.disabled = true;
	            },
	            success: function(res, ts) {
	            	if (res.code == "0") {
            			for (let i=el.options.length-1; i>0; i--) el.options.remove(i); //保留请选择选项
	            		if (res.data && res.data.length>0) {
	            			for (let i=0; i<res.data.length; i++) el.options.add(new Option(res.data[i].sfbzmc, res.data[i].sfbzid));
	            		}
	            	} else CxMsg.info('获取收费标准列表失败: ' + res.message);
	            },
	            error: function(xhr, ts, err) {
	            	var msg = "[" + xhr.status + " : " + ts + "]";
	            	CxMsg.error('获取收费标准列表失败: ' + msg);
	            },
	            complete: function(xhr, ts) {
	            	el.disabled = false;
	            }
	        });
		},
		
		getYhdKhxx: function(){
			let tv = $(treeSelector);
			if (tv.hasClass('treeview')) {
				let f = document.querySelector(baApplyFrmSelector);
				if (f.sfbzid.value) {
					CxMisc.ajax({
			            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getYhdkhxx'),
			            type: "GET",
			            data: {sfbzid: f.sfbzid.value, khlxdm: f.khlxdm.value},
			            beforeSend: function(xhr, cfg) {
			            	f.sfbzid.disabled = true;
			            	f.khlxdm.disabled = true;
			            },
			            success: function(res, ts) {
			            	if (res.code == "0") {
			            		$(treeSelector).treeview('hierCheckSelected', [{silent:true, switchKhlx:f.khlxdm.value, selected:res.data}]);
			            	} else CxMsg.info('获取已核定客户信息失败: ' + res.message);
			            },
			            error: function(xhr, ts, err) {
			            	var msg = "[" + xhr.status + " : " + ts + "]";
			            	CxMsg.error('获取已核定客户信息失败: ' + msg);
			            },
			            complete: function(xhr, ts) {
			            	f.sfbzid.disabled = false;
			            	f.khlxdm.disabled = false;
			            }
			        });
				} else $(treeSelector).treeview('uncheckAll', [{silent:true}]);
			} else CxMsg.info('请先等待房产资源树加载完成');
		},
		
		loadSqList: function() {
			let el = document.querySelector(baSqFrmSelector).sqdm;
			if (el.getAttribute('data-loaded') != 'true') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhsq'),
		            type: "GET",
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) 
		            				el.options.add(new Option(res.data[i].sqmc, res.data[i].sqdm));
		            		}
		            		el.setAttribute('data-loaded', 'true');
		            		if (res.data.length == 1) { //只有一个社区返回时，直接选择第一个
		            			$(`${cntrSelector} .toolbar button[data-cmd=back]`).addClass('d-none');
		            			el.disabled = false;
		            			el.selectedIndex = 1;
		            			el.form.querySelector('button[type=submit]').click();
		            		}
		            	} else CxMsg.info('获取社区列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取社区列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	el.disabled = false;
		            }
		        });
			}
		},
		
		save: function(el, e) {
			let f = document.querySelector(baApplyFrmSelector);
			if (CxMisc.validate(f)) {
				CxCtrl.confirm('请检查并确认是否保存当前核定设置？', function(src){
					let ids = me.getCheckedNodeIds();
					let frm = $(f), data = frm.serializeJson({removeBlankField:true});
					//if (ids.lys.length > 0) data.lyidStr = ids.lys.join(',');
					if (ids.khs.length > 0) data.khidStr = ids.khs.join(',');
					else data.khidStr = "";
						
					CxMisc.ajax({
					    url: CxMisc.finalizeUrl('/wygl/sfxt/hd/addPlhd'),
					    type: "POST",
					    data: data,
					    beforeSend: function(xhr, cfg) {
					    	CxMisc.markAjaxStart($(el));
					    },
					    success: function(res, ts) {
					    	if (res.code == "0") {
					    		CxMsg.info('保存批量核定成功');
					    	} else {
					    		CxMsg.warn('保存批量核定失败：' + res.message);
					    	}
					    },
					    error: function(xhr, ts, err) {
					    	var msg = "[" + xhr.status + " : " + ts + "]";
					    	CxMsg.warn('保存批量核定失败：' + msg);
					    },
					    complete: function(xhr, ts) {
					    	CxMisc.markAjaxEnd($(el));
					    }
					});
				}, {
			    	evt: e,
			    	src: el,
			    	placement: 'bottom'
			    });
			}
		}
	};
}

SfHdPlhd.bind();