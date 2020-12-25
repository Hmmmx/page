if (typeof window.SfKhKhxx === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfKhKhxxCntr';
	const treeSelector = '#wgSfKhKhxxCntr .tv-wrapper';
	const dtlsModalSelector = '#wgSfKhKhxxModalDtls';
	const dtlsModalLblSelector = '#wgSfKhKhxxModalDtlsLabel';
	const dtlsFrmSelector = '#wgSfKhKhxxDtlsFrm';
	
	const mainTblClz = '.table-wgsf-khxx';
	const idPrefix = 'wgSfKhKhxx';
	const loadingMask1 = '#wgSfKhKhxxCntr';
	const loadingMask2 = '#wgSfKhKhxxCntr .col-extended-lg';
	
	const me = window.SfKhKhxx = {
		bind: function() {
			CxWg.loadFcxxTree(treeSelector, {nodeSelected: function(node){ me.nodeSelected(node); }});
			me.preLoad(); // 预先载入代码数据，优化页面显示效果
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			$(cntrSelector).find('.toolbar button[data-cmd=open-add]').click(function(){
				let node = me.getSelectedNode();
				if (node && node.data.type == 'fc') me.openEdit('create', this);
				else CxMsg.info('请先从房产资源树中选择房产');
			});
			
			$(dtlsModalSelector).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			$(dtlsModalSelector).find('.paragraph>.p-header:not(.disabled)').click(function(){
				$(this).next().slideToggle();
				let idr = $(this).children('span:last-child').children('i');
				if (idr.hasClass('expanded')) {
					idr.removeClass().addClass(idr.attr('data-collapsed-class'));
				} else {
					idr.removeClass().addClass(idr.attr('data-expanded-class'));
				}
			});
			$(dtlsModalSelector).find('input[name=dkbj]').click(function(){
		        me.switchDkbj(this);
			});
			
			CxMisc.bindCheckAll(cntrSelector);
			
			CxMisc.formValidated(dtlsFrmSelector, function(f){ me.submit(f); });
			
			$(dtlsModalSelector).on('hide.bs.modal', function (e) { $(this).find('.modal-body').scrollTop(0); });
			$(dtlsModalSelector).on('show.bs.modal', function (e) { me.lazyLoad(this); }); // 打开时加载相应有待选代码列表：select[data-lazy-load]
			$(dtlsModalSelector).on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
		refresh: function(){
			let node = me.getSelectedNode();
			if (node && node.data.type == 'fc') me.fetch(node); //刷新列表
		},
		
		del: function(el, e) {
			let id = $(el).closest('tr').data('id');
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此客户？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/deleteKhxx'),
		            type: "POST",
		            data: {khid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask2).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除客户成功');
		            		me.refresh();
		            	} else CxMsg.error('删除客户失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除客户失败: ' + msg);
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
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhxxList'),
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
			    				tmp.append(`<tr data-id="${item.khid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="${idPrefix}Indexer-${i}" name="${idPrefix}Indexer${i}">
								            <label for="${idPrefix}Indexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td${khmcTitle}>${khmc}</td>
			    						<td data-cmd="khlxdm" data-value="${item.khlxdm}">查询中..</td>
			    						<td>${item.xbdm !== null? (item.xbdm==1?'男':'女') : '未填写'}</td>
			    						<td>${item.lxdh ? item.lxdh : ''}</td>
			    						<td>${item.sjhm ? item.sjhm : ''}</td>
			    						<td>${item.dkbj == '0' ? '否' : '是'}</td>
			    						<td>${item.yxbj == '0' ? '无效' : '有效'}</td>
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
			    			
			    			let proxyKhlx = document.querySelector(`${dtlsFrmSelector} select[name=khlxdm]`);
			    			CxMisc.getDmList(proxyKhlx, function(list){ // 如果有预先载入数据，性能会最佳
			    				tmp.find('[data-cmd=khlxdm]').each(function(){
			    					for (let i=0; i<list.length; i++) 
			    						if (list[i].dm == this.getAttribute('data-value')) { this.innerText = list[i].mc; break; }
			    				});
		    				});
			    		} else {
			    			$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    		}
			    	} else {
			    		CxMsg.error('载入失败：' + res.message);
			    		$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$(loadingMask2).mask('hide');
			    }
			});
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
		
		lazyLoad: function(f) {
			CxMisc.loadAllDmList(f);
		},
		
		nodeSelected: function(node) {
			if (node.data.type == 'fc') {
				me.fetch(node); //刷新列表
			}
		},
		
		openEdit: function(cmd, el) {
			let f = document.querySelector(dtlsFrmSelector);
			f.reset();
			f.cmd.value = cmd;
			if (cmd == 'create') {
				let node = me.getSelectedNode();
				f.fcid.value = node.data.id;
				f.sqdm.value = me.getAncestor(node, 'sq').data.dm;
				f.khid.value = '';
				
				$(dtlsModalLblSelector).text('添加客户');
			} else {
				let data = $(el).closest('tr').data('json');
				f.fcid.value = data.fcid;
				f.sqdm.value = data.sqdm;
				f.khid.value = data.khid;
				f.khmc.value = data.khmc;
				if ($(f.khlxdm).data('loaded')) {
					$(f.khlxdm).val(data.khlxdm);
					if (f.khlxdm.selectedIndex == -1) f.khlxdm.selectedIndex = 0;
				} else {
					f.khlxdm.setAttribute('data-selected-value', data.khlxdm); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				}
				CxMisc.selectRadio('yxbj', data.yxbj, f);
				
				if (data.zjlxdm) {
					if ($(f.zjlxdm).data('loaded')) {
						$(f.zjlxdm).val(data.zjlxdm);
						if (f.zjlxdm.selectedIndex == -1) f.zjlxdm.selectedIndex = 0;
					} else {
						f.zjlxdm.setAttribute('data-selected-value', data.zjlxdm); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
					}
				}
				if (data.zjhm) f.zjhm.value = data.zjhm;
				if (data.csrq) $('#wgSfKhKhxx_csrq_p').datetimepicker('date', data.csrq);
				if (data.xbdm) CxMisc.selectRadio('xbdm', data.xbdm, f);
				if (data.jsrq) $('#wgSfKhKhxx_jsrq_p').datetimepicker('date', data.jsrq);
				if (data.tcrq) $('#wgSfKhKhxx_tcrq_p').datetimepicker('date', data.tcrq);
				if (data.htbh) f.htbh.value = data.htbh;
				if (data.crzh) f.crzh.value = data.crzh;
				
				if (data.dkbj) CxMisc.selectRadio('dkbj', data.dkbj, f);
				if (data.dkfadm) {
					if ($(f.dkfadm).data('loaded')) {
						$(f.dkfadm).val(data.dkfadm);
						if (f.dkfadm.selectedIndex == -1) f.dkfadm.selectedIndex = 0;
					} else {
						f.dkfadm.setAttribute('data-selected-value', data.dkfadm); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
					}
				}
				if (data.yhzh) f.yhzh.value = data.yhzh;
				if (data.yhzhmc) f.yhzhmc.value = data.yhzhmc;
				if (data.yhzjhm) f.yhzjhm.value = data.yhzjhm;
				if (data.yhhh) f.yhhh.value = data.yhhh;
				if (data.yhhb) f.yhhb.value = data.yhhb;
				if (data.jfbh) f.jfbh.value = data.jfbh;
				
				if (data.lxdh) f.lxdh.value = data.lxdh;
				if (data.sjhm) f.sjhm.value = data.sjhm;
				if (data.dzyx) f.dzyx.value = data.dzyx;
				if (data.khbq) f.khbq.value = data.khbq;
				if (data.jjlxrxm) f.jjlxrxm.value = data.jjlxrxm;
				if (data.jjlxrdh) f.jjlxrdh.value = data.jjlxrdh;
				if (data.jzdz) f.jzdz.value = data.jzdz;
				
				if (data.bz) f.bz.value = data.bz;
				
				$(dtlsModalLblSelector).text('修改客户');
			}
			$(dtlsModalSelector).modal('show');
		},
		
		preLoad: function() { // 预先载入代码数据，优化页面显示效果
			CxMisc.getDmList(document.querySelector(`${dtlsFrmSelector} select[name=khlxdm]`));
		},
		switchDkbj: function(el) {
			let f = el.form;
			if (el.value == '1') {
				f.dkfadm.required = true;
				f.yhzh.required = true;
				f.yhzhmc.required = true;
				$(f.dkfadm).closest('.form-group').find(`label[for=${f.dkfadm.id}]`).addClass('required');
				$(f.yhzh).closest('.form-group').find(`label[for=${f.yhzh.id}]`).addClass('required');
				$(f.yhzhmc).closest('.form-group').find(`label[for=${f.yhzhmc.id}]`).addClass('required');
			} else {
				f.dkfadm.required = false;
				f.yhzh.required = false;
				f.yhzhmc.required = false;
				$(f.dkfadm).closest('.form-group').find(`label[for=${f.dkfadm.id}]`).removeClass('required');
				$(f.yhzh).closest('.form-group').find(`label[for=${f.yhzh.id}]`).removeClass('required');
				$(f.yhzhmc).closest('.form-group').find(`label[for=${f.yhzhmc.id}]`).removeClass('required');
			}
		},
		submit: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			let txt = data.cmd == 'create' ? '添加' : '修改';
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl(data.cmd == 'create' ? '/wygl/sfxt/khgl/khxx/addKhxx' : '/wygl/sfxt/khgl/khxx/updateKhxx'),
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

SfKhKhxx.bind();