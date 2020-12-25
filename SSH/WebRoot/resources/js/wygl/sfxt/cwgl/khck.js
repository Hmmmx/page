if (typeof window.SfCwKhck === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfCwKhckCntr';
	const loadingMask1 = '#wgSfCwKhckCntr';
	const loadingMask2 = '#wgSfCwKhckCntr .col-extended-lg';
	
	window.SfCwKhck = {
		bind: function() {
			CxWg.loadFcxxTree('#wgSfCwKhckCntr .tv-wrapper', {nodeSelected: SfCwKhck.nodeSelected});
			SfCwKhck.preLoad(); // 预先载入数据，优化页面显示效果
			CxMisc.enableRefresh(cntrSelector, SfCwKhck.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.bindCheckAll('#wgSfCwKhckCntr');
			
			CxMisc.formValidated('#wgSfCwKhckDtlsFrm', function(f){ SfCwKhck.submit(f); });
			
			$('#wgSfCwKhckCntr .toolbar button[data-cmd=open-add]').click(function(){
				let node = SfCwKhck.getSelectedNode();
				if (node && node.data.type == 'fc') SfCwKhck.openEdit('create', this);
				else CxMsg.info('请先从房产资源树中选择房产');
			});
			
			$('#wgSfCwKhckModalDtls div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			$("#wgSfCwKhckModalDtls [data-cx-ctrl=suggest]").suggest({fetch:SfCwKhck.qCw});
			$('#wgSfCwKhckModalDtls').on('show.bs.modal', function (e) { SfCwKhck.lazyLoad(this); });
			
			$('#wgSfCwKhckModalDtls').on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
		refresh: function(){
			let node = SfCwKhck.getSelectedNode();
			if (node) SfCwKhck.fetch(node); //刷新列表
		},
		
		clearStatus: function() { // 需要重新载入的数据，清除已存在的数据与状态
			let el = document.querySelector('#wgSfCwKhckDtlsFrm select[name=khid]'); // 客户状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
			
			el = document.querySelector('#wgSfCwKhckDtlsFrm select[name=sfbzid]'); // 收费标准状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
		},
		
		del: function(el, e) {
			let id = $(el).closest('tr').data('id');
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此车卡？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/cwkhck/deleteKhck'),
		            type: "GET",
		            data: {khckid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask2).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除车卡成功');
		            		let node = SfCwKhck.getSelectedNode();
		    				if (node && node.data.type == 'fc') SfCwKhck.fetch(node); //刷新列表
		            	} else CxMsg.error('删除车卡失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除车卡失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	$(loadingMask2).mask('hide');
		            }
		        });
		    }, {
		    	evt: evt,
		    	src: el,
		    	placement: 'top'
		    });
		},
		
		fetch: function(node) {
			CxMisc.resetCheckAll('#wgSfCwKhckCntr');
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/cwkhck/getKhck'),
			    type: "GET",
			    data: {fcid: node.data.id},
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask2).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let tmp = $('#wgSfCwKhckCntr .table-wgsf-khck tbody').empty();
			    			for (let i=0; i<res.data.length; i++) {
			    				let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
			    				tmp.append(`<tr data-id="${item.khckid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="wgSfCwKhckIndexer-${i}" name="wgSfCwKhckIndexer${i}">
								            <label for="wgSfCwKhckIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td${khmcTitle}>${khmc}</td>
			    						<td>${item.cphm?item.cphm:''}</td>
			    						<td>${item.cwhm?item.cwhm:''}</td>
			    						<td title="${item.sfbzmc? item.sfbzmc : ''}">${item.sfbzmc? item.sfbzmc : ''}</td>
			    						<td>${item.ckh ? item.ckh : ''}</td>
			    						<td>${item.cklxmc ? item.cklxmc : ''}</td>
			    						<td>${item.jsrq ? CxMisc.formatDate(item.jsrq, 'short') : ''}</td>
			    						<td>${item.ztbj == '9' ? '作废' : '有效'}</td>
			    					    <td class="dl-item-cmd">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			    								<button type="button" class="btn btn-outline-primary" data-cmd="update" onclick="SfCwKhck.openEdit('update', this)">修改</button>
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="del" onclick="SfCwKhck.del(this)">删除</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
			    			}
			    		} else {
			    			$('#wgSfCwKhckCntr .table-wgsf-khck tbody').empty().append('<tr><td colspan="10" class="table-empty">暂无数据</td></tr>');
			    		}
			    	} else {
			    		CxMsg.error('载入失败：' + res.message);
			    		$('#wgSfCwKhckCntr .table-wgsf-khck tbody').empty().append('<tr><td colspan="10" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$('#wgSfCwKhckCntr .table-wgsf-khck tbody').empty().append('<tr><td colspan="10" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$(loadingMask2).mask('hide');
			    }
			});
		},
		
		getSelectedNode: function() {
			let selecteds = $('#wgSfCwKhckCntr .tv-wrapper').treeview('getSelected');
			if (selecteds.length > 0) return selecteds[0];
			else return null;
		},
		getAncestor: function(node, type) {
			let tmp = node;
			while(tmp && tmp.data.type != type) {
				tmp = $('#wgSfCwKhckCntr .tv-wrapper').treeview('getParent', [tmp.nodeId]);
			}
			return tmp;
		},
		
		lazyLoad: function(f) {
			let node = SfCwKhck.getSelectedNode();
			if (node && node.data.type == 'fc') {
				SfCwKhck.loadKhxx(node);
				SfCwKhck.loadSfbz(SfCwKhck.getAncestor(node, 'sq'));
			}
			CxMisc.loadAllDmList(f);
		},
		loadKhxx: function(node) {
			let el = document.querySelector('#wgSfCwKhckDtlsFrm select[name=khid]');
			if (el.getAttribute('data-loaded') != 'true') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhxxList'),
		            type: "GET",
		            data: {fcid: node.data.id, lite: true},
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) 
		            				el.options.add(new Option(res.data[i].khmc, res.data[i].khid));
		            			if (el.getAttribute('data-selected-value')) {
		        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
		        					if (el.selectedIndex == -1) el.selectedIndex = 0;
		        				}
		            		}
		            		el.setAttribute('data-loaded', 'true');
		            	} else CxMsg.info('获取客户列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取客户列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	el.disabled = false;
		            }
		        });
			}
		},
		loadSfbz: function(node) {
			let el = document.querySelector('#wgSfCwKhckDtlsFrm select[name=sfbzid]');
			if (el.getAttribute('data-loaded') != 'true') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfbz'),
		            type: "GET",
		            data: {sqdm: node.data.dm, fylxdmStr: '05'},
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) 
		            				el.options.add(new Option(res.data[i].sfbzmc, res.data[i].sfbzid));
		            			if (el.getAttribute('data-selected-value')) {
		        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
		        					if (el.selectedIndex == -1) el.selectedIndex = 0;
		        				}
		            		}
		            		el.setAttribute('data-loaded', 'true');
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
			}
		},
		
		nodeSelected: function(node) {
			if (node.data.type == 'fc') {
				SfCwKhck.clearStatus();
				SfCwKhck.fetch(node); //刷新列表
			}
		},
		
		openEdit: function(cmd, el) {
			let f = document.querySelector('#wgSfCwKhckDtlsFrm');
			f.reset();
			f.cmd.value = cmd;
			$("#wgSfCwKhckModalDtls [data-cx-ctrl=suggest]").suggest('clear');
			if (cmd == 'create') {
				let node = SfCwKhck.getSelectedNode();
				let sqdm = SfCwKhck.getAncestor(node, 'sq').data.dm;
				f.fcid.value = node.data.id;
				f.khckid.value = '';
				f.sqdm.value = sqdm;
				$('#wgSfCwKhckModalDtlsLabel').text('添加车卡');
			} else {
				let data = $(el).closest('tr').data('json');
				f.fcid.value = data.fcid;
				f.khckid.value = data.khckid;
				f.sqdm.value = data.sqdm;
				
				if ($(f.khid).data('loaded')) {
					$(f.khid).val(data.khid);
					if (f.khid.selectedIndex == -1) f.khid.selectedIndex = 0;
				} else f.khid.setAttribute('data-selected-value', data.khid); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				f.cphm.value = data.cphm;
				$("#wgSfCwKhckModalDtls [data-cx-ctrl=suggest]").suggest('value', {value: data.cwid, text: data.cwhm});
				if ($(f.sfbzid).data('loaded')) {
					$(f.sfbzid).val(data.sfbzid);
					if (f.sfbzid.selectedIndex == -1) f.sfbzid.selectedIndex = 0;
				} else f.sfbzid.setAttribute('data-selected-value', data.sfbzid); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				
				if (data.ckh) f.ckh.value = data.ckh;
				if (data.cklxdm) {
					if ($(f.cklxdm).data('loaded')) {
						$(f.cklxdm).val(data.cklxdm);
						if (f.cklxdm.selectedIndex == -1) f.cklxdm.selectedIndex = 0;
					} else f.cklxdm.setAttribute('data-selected-value', data.cklxdm); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				}
				if (data.kkrq) $('#wgSfCwKhck_kkrq_p').datetimepicker('date', data.kkrq);
				if (data.jsrq) $('#wgSfCwKhck_jsrq_p').datetimepicker('date', data.jsrq);
				if (data.ztbj) CxMisc.selectRadio('ztbj', data.ztbj, f);
				
				if (data.bz) f.bz.value = data.bz;
				
				$('#wgSfCwKhckModalDtlsLabel').text('修改车卡');
			}
			$('#wgSfCwKhckModalDtls').modal('show');
		},
		
		preLoad: function() { // 预先载入代码数据，优化页面显示效果
			//
		},
		
		qCw: function(v, cb) {
			if (v.trim() != "") {
				let sqdm = document.querySelector('#wgSfCwKhckDtlsFrm').sqdm.value;
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/cwkhck/getCwhm'),
				    type: "GET",
				    data: {cwhm: v, sqdm: sqdm},
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		let ret = [], data = res.data;
				    		if (data) {
				    			for (let i=0; i<data.length; i++) {
				    				ret.push({text: data[i].cwhm, value: data[i].cwid});
				    			}
				    		}
				    		cb(null, ret);
				    	} else {
				    		CxMsg.warn('查询车位失败：' + res.message);
				    		cb('查询车位失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.warn('查询车位失败：' + msg);
				    	cb('查询车位失败：' + msg);
				    }
				});
			} else cb(null, null);
		},
		
		submit: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			if (data.cwhm) {
				data.cwid = $(f.cwhm).suggest('value').value;
				delete data.cwhm;
			}
			let txt = data.cmd == 'create' ? '添加' : '修改';
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl(data.cmd == 'create' ? '/wygl/sfxt/cwkhck/addKhck' : '/wygl/sfxt/cwkhck/updateKhck'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info(txt + '成功');
			    		let node = SfCwKhck.getSelectedNode();
						if (node && node.data.type == 'fc') SfCwKhck.fetch(node); //刷新列表
						frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn(txt + '失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn(txt + '失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
			    }
			});
		}
	};
}

SfCwKhck.bind();