if (typeof window.QxGwSqgw === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgQxGwSqgwCntr';
	const treeSelector = '#wgQxGwSqgwCntr .tv-wrapper';
	const dtlsModalSelector = '#wgQxGwSqgwModalDtls';
	const dtlsModalLblSelector = '#wgQxGwSqgwModalDtlsLabel';
	const dtlsFrmSelector = '#wgQxGwSqgwDtlsFrm';
	const qxModalSelector = '#wgQxGwSqgwModalQx';
	const qxFrmSelector = '#wgQxGwSqgwQxFrm';
	const qxTreeSelector = '#wgQxGwSqgwQxFrm .tv-wrapper';
	const mainTblClz = '.table-wgqx-gw-sqgw';
	
	const idPrefix = 'wgQxGwSqgw';
	const loadingMask1 = '#wgQxGwSqgwCntr';
	const loadingMask2 = '#wgQxGwSqgwCntr .col-extended-lg';
	
	const me = window.QxGwSqgw = {
			bind: function() {
				CxMisc.enableRefresh(cntrSelector, me.refresh);
				CxMisc.enableFullpage(cntrSelector);
				CxMisc.bindCheckAll(cntrSelector);
				
				CxWg.loadSqTree(treeSelector, {level:5, nodeSelected: me.nodeSelected});
				
				$(cntrSelector).find('.toolbar button[data-cmd=open-add]').click(function(){ me.openEditGw('create', this); });
				
				CxMisc.formValidated(dtlsFrmSelector, me.submitGw);
				CxMisc.formValidated(qxFrmSelector, me.submitQx);
				
				$(`${dtlsModalSelector}, ${qxModalSelector}`).on('show.bs.modal', function (e) { 
					CxMisc.clearValidation(this); 
				}); //默认任何modal显示时把上次验证结果去掉
			},
			
			refresh: function(){
				let node = me.getSelectedNode();
				if (node) me.fetch(node); //刷新列表
			},
			
			delGw: function(el, e) {
				let id = $(el).closest('tr').data('id');
				CxCtrl.confirm('是否确定删除此岗位？', function(src){
					var target = $(src);
					CxMisc.ajax({
			            url: CxMisc.finalizeUrl('/wggw/deleteJgGw'),
			            type: "GET",
			            data:{ gwid: id},
			            beforeSend: function(xhr, cfg) {
			            	$(loadingMask2).mask('show');
			            },
			            success: function(res, ts) {
			            	if (res.code == "0") {
			            		CxMsg.info('删除岗位成功');
			            		me.refresh(); //刷新列表
			            	} else CxMsg.error('删除岗位失败: ' + res.message);
			            },
			            error: function(xhr, ts, err) {
			            	var msg = "[" + xhr.status + " : " + ts + "]";
			            	CxMsg.error('删除岗位失败: ' + msg);
			            },
			            complete: function(xhr, ts) {
			            	$(loadingMask2).mask('hide');
			            }
			        });
			    }, {
			    	evt: e,
			    	src: el,
			    	placement: 'top'
			    });
			},
			
			fetch: function(node) {
				CxMisc.resetCheckAll(cntrSelector);
				let cols = $(`${cntrSelector} ${mainTblClz} thead>tr>th`).length,
					emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
				
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wggw/findJgGw'),
				    type: "GET",
				    data: {sqid: node.data.sqid},
				    beforeSend: function(xhr, cfg) {
				    	$(loadingMask2).mask('show', {msg: '载入中，请稍候...'});
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		if (res.data && res.data.length>0) {
				    			let tmp = $(cntrSelector).find(`${mainTblClz} tbody`).empty();
				    			for (let i=0; i<res.data.length; i++) {
				    				tmp.append(`<tr data-id="${res.data[i].gwid}">
				    						<td class="td-indexer">
					    						<input type="checkbox" id="${idPrefix}Indexer-${i}" name="${idPrefix}Indexer${i}">
									            <label for="${idPrefix}Indexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
					    						<span>${i+1}</span>
				    						</td>
				    						<td>${res.data[i].gwmc}</td>
				    						<td class="dl-item-cmd">
				    							<div class="btn-group" role="group" aria-label="操作按纽组">
				    								<button type="button" class="btn btn-outline-primary" data-cmd="assign" title="指派权限">权限</button>
				    								<button type="button" class="btn btn-outline-primary" data-cmd="update">修改</button>
				                                	<button type="button" class="btn btn-outline-danger" data-cmd="del">删除</button>
				    							</div>
				    						</td>
				    					</tr>`);
				    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
				    				if (res.data[i].yxbj == 0) tmp.children(':last-child').addClass('tr-disabled').attr('title', '岗位已禁用');
				    			}
				    			tmp.find('td.dl-item-cmd button[data-cmd=assign]').click(function(){ me.openAssignQx(this); });
				    			tmp.find('td.dl-item-cmd button[data-cmd=update]').click(function(){ me.openEditGw('update', this); });
				    			tmp.find('td.dl-item-cmd button[data-cmd=del]').click(function(e){ me.delGw(this, e); });
				    		} else {
				    			$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
				    		}
				    	} else {
				    		CxMsg.error('载入失败：' + res.message);
				    		$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('载入失败：' + msg);
				    	$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
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
			
			nodeSelected: function(node) {
				me.fetch(node); //刷新列表
			},
			
			openEditGw: function(cmd, el) {
				let node = me.getSelectedNode();
				if (node) {
					let f = document.querySelector(dtlsFrmSelector);
					f.reset();
					f.cmd.value = cmd;
					if (cmd == 'create') {
						$(dtlsModalLblSelector).text('添加岗位');
						f.gwid.value = '';
						f.sqid.value = node.data.sqid;
					} else {
						$(dtlsModalLblSelector).text('修改岗位');
						let data = $(el).closest('tr').data('json');
						f.gwid.value = data.gwid;
						f.sqid.value = data.sqid;
						f.gwmc.value = data.gwmc;
						if (data.yxbj !== null) CxMisc.selectRadio('yxbj', data.yxbj, f);
					}
					$(dtlsModalSelector).modal('show');
				} else CxMsg.info('请先从机构树中选择机构');
			},
			
			openAssignQx: function(el) {
				let data = $(el).closest('tr').data('json');
				let f = document.querySelector(qxFrmSelector);
				f.gwid.value = data.gwid;
				f.sqid.value = data.sqid;
				
				$(qxModalSelector).modal('show');
				CxWg.loadGwqxTree(qxTreeSelector, {gwid: data.gwid, sqid: data.sqid}, {level:4});
			},
			
			submitQx: function(f) {
				let frm=$(f), data = {gwid: f.gwid.value, cdidStr: CxWg.getGwqxTreeSelectedNodeCdid(qxTreeSelector)};
				
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wggw/addGwgn'),
				    type: "POST",
				    data: data,
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		setTimeout(function(){CxMsg.info('指派权限成功');}, 600); //延时显示，防止提示框抖动
				    		frm.closest('.modal').modal('hide');
				    	} else {
				    		CxMsg.error('指派权限失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('指派权限失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
				    }
				});
			},
			
			submitGw: function(f) {
				let frm=$(f), txt = f.cmd.value=='create' ? '添加' : '修改',
					data = frm.serializeJson({removeBlankField:true}),
					url=f.cmd.value=='create' ? CxMisc.finalizeUrl('/wggw/addJgGw') : CxMisc.finalizeUrl('/wggw/updateJgGw');
				
				CxMisc.ajax({
				    url: url,
				    type: "POST",
				    data: data,
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		setTimeout(function(){CxMsg.info(txt + '成功');}, 600); //延时显示，防止提示框抖动
				    		me.refresh(); //刷新列表
				    		frm.closest('.modal').modal('hide');
				    	} else {
				    		CxMsg.error(txt + '失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error(txt + '失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
				    }
				});
			}
	}
}
QxGwSqgw.bind();