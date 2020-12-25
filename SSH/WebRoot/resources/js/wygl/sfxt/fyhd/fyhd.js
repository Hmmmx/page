if (typeof window.SfHdFyhd === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfHdFyhdCntr';
	const treeSelector = '#wgSfHdFyhdCntr .tv-wrapper';
	const dtlsModalSelector = '#wgSfHdFyhdModalDtls';
	const dtlsModalLblSelector = '#wgSfHdFyhdModalDtlsLabel';
	const dtlsFrmSelector = '#wgSfHdFyhdDtlsFrm';
	
	const mainTblClz = '.table-wgsf-hd-fyhd';
	const idPrefix = 'wgSfHdFyhd';
	const loadingMask1 = '#wgSfHdFyhdCntr';
	const loadingMask2 = '#wgSfHdFyhdCntr .col-extended-lg';
	
	const me = window.SfHdFyhd = {
		bind: function() {
			CxWg.loadFcxxTree(treeSelector, {nodeSelected: me.nodeSelected});
			me.preLoad(); // 预先载入数据，优化页面显示效果
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.bindCheckAll(cntrSelector);
			$(cntrSelector).find('.toolbar button[data-cmd=open-add]').click(function(){
				let node = me.getSelectedNode();
				if (node && node.data.type == 'fc') me.openEdit('create', node, this);
				else CxMsg.info('请先从房产资源树中选择房产');
			});
			
			CxMisc.formValidated(dtlsFrmSelector, function(f){ me.submit(f); });
			$(dtlsModalSelector).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			$(dtlsModalSelector).on('show.bs.modal', function (e) { me.lazyLoad(this); });
			$(dtlsModalSelector).on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
		refresh: function(){
			let node = me.getSelectedNode();
			if (node && node.data.type == 'fc') me.fetch(node); //刷新列表
		},
		
		clearStatus: function() { // 需要重新载入的数据，清除已存在的数据与状态
			let el = document.querySelector(`${dtlsFrmSelector} select[name=khid]`); // 客户状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
			
			el = document.querySelector(`${dtlsFrmSelector} select[name=sfbzid]`); // 收费标准状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>=0; i--) el.remove(i); //清除上次查询的列表
			if (el.multiple && el.getAttribute('data-cx-ctrl') == 'multi-select') {
    			if ($(el).hasClass('fs-select')) $(el).fSelect('reload');
			}
		},
		
		del: function(el, e) {
			let id = $(el).closest('tr').data('id');
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此收费标准？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/deleteHdxx'),
		            type: "GET",
		            data: {hdid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask2).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除收费标准成功');
		            		me.refresh();
		            	} else CxMsg.error('删除收费标准失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除收费标准失败: ' + msg);
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
			CxMisc.resetCheckAll(cntrSelector);
			if (node.data.type == 'fc') {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getHdxxList'),
				    type: "GET",
				    data: {fcid: node.data.id},
				    beforeSend: function(xhr, cfg) {
				    	$(loadingMask2).mask('show', {msg: '载入中，请稍候...'});
				    },
				    success: function(res, ts) {
				    	let curr = me.getSelectedNode();
				    	if (!curr || curr.data.id != node.data.id) return; // 验证数据返回后当前选中的节点是否与提交时一样，不一致时丢弃数据
				    	if (res.code == "0") {
				    		if (res.data && res.data.length>0) {
				    			let tmp = $(cntrSelector).find(`${mainTblClz} tbody`).empty();
				    			for (let i=0; i<res.data.length; i++) {
				    				let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
				    				tmp.append(`<tr data-id="${item.hdid}">
				    						<td class="td-indexer">
					    						<input type="checkbox" id="${idPrefix}Indexer-${i}" name="${idPrefix}Indexer${i}">
									            <label for="${idPrefix}Indexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
					    						<span>${i+1}</span>
				    						</td>
				    						<td${khmcTitle}>${khmc}</td>
				    						<td>${CxMisc.escapeHtml(item.fylxmc)}</td>
				    						<td>${CxMisc.escapeHtml(item.sfxmmc)}</td>
				    						<td title="${CxMisc.escapeHtml(item.sfbzmc)}">${CxMisc.escapeHtml(item.sfbzmc)}</td>
				    						<td>${item.yxrqq ? CxMisc.formatDate(item.yxrqq, 'short') : ''}</td>
				    						<td>${item.yxrqz ? CxMisc.formatDate(item.yxrqz, 'short') : ''}</td>
				    					    <td class="dl-item-cmd">
				    							<div class="btn-group" role="group" aria-label="操作按纽组">
				    								<button type="button" class="btn btn-outline-primary" data-cmd="update">修改</button>
				                                	<button type="button" class="btn btn-outline-danger" data-cmd="del">删除</button>
				    							</div>
				    						</td>
				    					</tr>`);
				    				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
				    			}
				    			tmp.find('td.dl-item-cmd button[data-cmd=update]').click(function(){ me.openEdit('update', this); });
				    			tmp.find('td.dl-item-cmd button[data-cmd=del]').click(function(){ me.del(this); });
				    		} else {
				    			$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="8" class="table-empty">暂无数据</td></tr>');
				    		}
				    	} else {
				    		CxMsg.error('载入失败：' + res.message);
				    		$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="8" class="table-empty">暂无数据</td></tr>');
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('载入失败：' + msg);
				    	$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="8" class="table-empty">暂无数据</td></tr>');
				    },
				    complete: function(xhr, ts) {
				    	$(loadingMask2).mask('hide');
				    }
				});
			} else { // 非房产节点都显示空表格
				$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="8" class="table-empty">暂无数据</td></tr>');
			}
		},
		
		getSelectedNode: function() {
			let selecteds = $(treeSelector).treeview('getSelected');
			if (selecteds.length > 0) return selecteds[0];
			else return null;
		},
		getAncestor: function(node, type) {
			let tmp = node;
			while(tmp && tmp.data.type != type) tmp = $(treeSelector).treeview('getParent', [tmp.nodeId]);
			return tmp;
		},
		
		genFcmc: function() {
			let node = me.getSelectedNode(), mc = null;
			if (node) {
				mc = node.data.mc;
				while (node.data && node.data.type != 'sq') {
					node = $(treeSelector).treeview('getParent', [node.nodeId]);
					mc = node.data.mc + ">" + mc;
				}
			}
			return mc;
		},
		
		lazyLoad: function(m) {
			let node = me.getSelectedNode();
			if (node && node.data.type == 'fc') {
				me.loadKhxx(node.data.id, m);
				me.loadSfbz(me.getAncestor(node, 'sq').data.dm, m);
			}
			CxMisc.loadAllDmList(m);
		},
		loadKhxx: function(fcid, m) {
			let el = m.querySelector('select[name=khid]'); //document.querySelector(`${dtlsFrmSelector} select[name=khid]`);
			if (el.getAttribute('data-loaded') != 'true') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhxxList'),
		            type: "GET",
		            data: {fcid: fcid, lite: true},
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
		loadSfbz: function(sqdm, m) {
			let el = m.querySelector('select[name=sfbzid]'); //document.querySelector(`${dtlsFrmSelector} select[name=sfbzid]`);
			if (el.getAttribute('data-loaded') != 'true') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfbz'),
		            type: "GET",
		            data: {sqdm: sqdm, fylxdmStr: '01,04'},
		            beforeSend: function(xhr, cfg) {
		            //	el.disabled = true;
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
		            			if (el.getAttribute('data-disabled') == 'true') {
		            				el.disabled = true;
		            				el.removeAttribute('data-disabled');
		            			} else el.disabled = false;
		            			if (el.multiple && el.getAttribute('data-cx-ctrl') == 'multi-select') {
			            			if ($(el).hasClass('fs-select')) $(el).fSelect('reload');
			            			else {
				    					if (el.getAttribute('data-param')) $(el).fSelect(JSON.parse(el.getAttribute('data-param')));
				    					else $(el).fSelect();
			            			}
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
		            //	if (el.getAttribute('data-disabled') != 'true') el.disabled = false;
		            }
		        });
			}
		},

		nodeSelected: function(node) {
			me.clearStatus(); // 选中任何节点都清除状态
			me.fetch(node); //刷新列表
		},
		
		openEdit: function(cmd, el) {
			let f = document.querySelector(dtlsFrmSelector);
			f.reset();
			f.cmd.value = cmd;
			f.yxbj.value = '1';
			f.fcmc.value = me.genFcmc();
			if (cmd == 'create') {
				let node = me.getSelectedNode();
				f.fcid.value = node.data.id;
				f.hdid.value = '';
				f.sfbzid.disabled = false;
				if (f.sfbzid.multiple && f.sfbzid.getAttribute('data-cx-ctrl') == 'multi-select') {
        			if ($(f.sfbzid).hasClass('fs-select')) $(f.sfbzid).fSelect('reload');
				}
				
				$(dtlsModalLblSelector).text('添加费用核定');
			} else {
				let data = $(el).closest('tr').data('json');
				f.fcid.value = data.fcid;
				f.hdid.value = data.hdid;
				
				if ($(f.khid).data('loaded')) {
					$(f.khid).val(data.khid);
					if (f.khid.selectedIndex == -1) f.khid.selectedIndex = 0;
				} else {
					f.khid.setAttribute('data-selected-value', data.khid); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				}
				if ($(f.sfbzid).data('loaded')) {
					$(f.sfbzid).val(data.sfbzid);
					if (f.sfbzid.selectedIndex == -1) f.sfbzid.selectedIndex = 0;
					f.sfbzid.disabled = true;
					if (f.sfbzid.multiple && f.sfbzid.getAttribute('data-cx-ctrl') == 'multi-select') {
	        			if ($(f.sfbzid).hasClass('fs-select')) $(f.sfbzid).fSelect('reload');
					}
				} else {
					f.sfbzid.setAttribute('data-disabled', 'true'); 
					f.sfbzid.setAttribute('data-selected-value', data.sfbzid); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				}
				
				if (data.yxrqq) $('#wgSfHdFyhd_yxrqq_p').datetimepicker('date', data.yxrqq);
				if (data.yxrqz) $('#wgSfHdFyhd_yxrqz_p').datetimepicker('date', data.yxrqz);
				
				$(dtlsModalLblSelector).text('修改费用核定');
			}
			$(dtlsModalSelector).modal('show');
		},
		
		preLoad: function() { // 预先载入代码数据，优化页面显示效果
			//
		},
		
		submit: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			let txt = data.cmd == 'create' ? '添加' : '修改';
			if (data.cmd == 'create') {
				if (data.sfbzid) {
					data.sfbzidList = typeof data.sfbzid === 'object' ? data.sfbzid : [data.sfbzid];
					delete data.sfbzid;
				}
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/hd/addHdxx'),
				    type: "POST",
				    contentType: 'application/json;charset=utf-8',
				    data: JSON.stringify(data),
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		CxMsg.info(txt + '成功');
				    		me.refresh();
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
			} else
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/hd/updateHdxx'),
				    type: "POST",
				    data: data,
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		CxMsg.info(txt + '成功');
				    		me.refresh();
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

SfHdFyhd.bind();