if (typeof window.SfCwxx === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfcwxxCntr';
	const loadingMask1 = '#wgSfcwxxCntr';
	const loadingMask2 = '#wgSfcwxxCntr .col-extended-lg';
	
	window.SfCwxx = {
		bindEvents: function() {
			$('#wgSfcwxxCntr button[data-cmd=add]').click(function(){
				if ($('#wgCwJgTree').data('currentNode'))
					SfCwxx.popDtlsDialog('create', $('#wgCwJgTree').data('currentNode').data.dm);
				else
					CxMsg.info('请先从车库树中选择车库');
			});
			CxMisc.enableRefresh(cntrSelector, SfCwxx.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.bindCheckAll('#wgSfcwxxCntr');
			CxMisc.formValidated('#wgCwDtlsFrm', SfCwxx.submitCw);
			
			$('#wgCwModalCwglDtls').on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
		refresh: function(){
			let node = $('#wgCwJgTree').data('currentNode');
			if (node) SfCwxx.fetchCw(node); //刷新列表
		},
		
		deleteCw: function(el, e) {
			let currentNode = $('#wgCwJgTree').data('currentNode'), subNode = null,
				id = $(el).closest('tr').data('id');
		
		
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此车位？', function(src){
				var target = $(src);
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/cwxx/deleteCwxx'),
		            type: "GET",
		            data:{
		                cwid: id
		            },
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask2).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除车位成功');
		            		SfCwxx.fetchCw($('#wgCwJgTree').data('currentNode')); //刷新列表
		            	} else CxMsg.info('删除车位失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除车位失败: ' + msg);
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
		
		fetchCw: function(node) {
			CxMisc.resetCheckAll('#wgSfcwxxCntr');
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/cwxx/getCwxx'),
			    type: "GET",
			    data: {ckid: node.data.dm},
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask2).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let tmp = $('#wgSfcwxxCntr .table-wgsf-cw tbody').empty();
			    			for (let i=0; i<res.data.length; i++) {
			    				tmp.append(`<tr data-id="${res.data[i].cwid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="wgSfcwIndexerAll-${i}" name="wgSfcwIndexerAll${i}">
								            <label for="wgSfcwIndexerAll-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td>${node.text}</td>
			    						<td>${res.data[i].cwhm}</td>
			    						<td>${res.data[i].cwmj ? res.data[i].cwmj.toFixed(2) : ''}</td>
			    						<td>${res.data[i].ztbj==1?'正常':'作废'}</td>
			    					    <td class="dl-item-cmd">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			    								<button type="button" class="btn btn-outline-primary" data-cmd="update" onclick="SfCwxx.popDtlsDialog('update', '${res.data[i].cwid}', this)">修改</button>
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="del" onclick="SfCwxx.deleteCw(this)">删除</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
			    				
			    			}
			    		} else {
			    			$('#wgSfcwxxCntr .table-wgsf-cw tbody').empty().append('<tr><td colspan="6" class="table-empty">暂无数据</td></tr>');
			    		}
			    	} else {
			    		CxMsg.error('载入失败：' + res.message);
			    		$('#wgSfcwxxCntr .table-wgsf-cw tbody').empty().append('<tr><td colspan="6" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$('#wgSfcwxxCntr .table-wgsf-cw tbody').empty().append('<tr><td colspan="6" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$(loadingMask2).mask('hide');
			    }
			});
		},
		
		getSelectedNode: function() {
			let selecteds = $('#wgCwJgTree').treeview('getSelected');
			if (selecteds.length > 0) return selecteds[0];
			else return null;
		},
		getSqNode: function() {
			let node = SfCwxx.getSelectedNode();
			if (node) return $('#wgCwJgTree').treeview('getParent', [node.nodeId]);
			else return null;
		},
		
		
		popDtlsDialog: function(cmd, id, el) {
			let sqNode = SfCwxx.getSqNode();
			if (sqNode) {
				let f = document.querySelector('#wgCwDtlsFrm');
				f.reset();
				f.cmd.value = cmd;
				f.sqdm.value = sqNode.data.dm;
				if (cmd == 'create') {
					$('#wgCwModalCwglDtlsLabel').text('添加机构车位');
					f.ckid.value = id;
				} else {
					$('#wgCwModalCwglDtlsLabel').text('修改机构车位');
					let data = $(el).closest('tr').data('json');
					f.cwid.value = id;
					f.cwhm.value = data.cwhm;
					f.cwmj.value = data.cwmj;
					f.ztbj.value = data.ztbj;
					
				}
				$('#wgCwModalCwglDtls').modal('show');
			} else {
				CxMsg.info('请先选择车库');
			}
		},
		
		
		
		
		
		submitCw: function(f) {
			let frm=$(f), prefix = f.cmd.value=='create' ? '添加' : '修改',
				data = frm.serializeJson(),
				url=f.cmd.value=='create' ? CxMisc.finalizeUrl('/wygl/sfxt/cwxx/addCwxx') : CxMisc.finalizeUrl('/wygl/sfxt/cwxx/updateCwxx');
		
			
			CxMisc.ajax({
			    url: url,
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		setTimeout(function(){CxMsg.info(prefix + '成功');}, 600); //延时显示，防止提示框抖动
			    		SfCwxx.fetchCw($('#wgCwJgTree').data('currentNode')); //刷新列表
			    		frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.error(prefix + '失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error(prefix + '失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
			    }
			});
		}
	};
}
SfCwxx.bindEvents();
CxWg.loadJgTree(CxMisc.finalizeUrl('/wygl/sfxt/cwxx/getCkList'), '#wgCwJgTree', {nodeSelected: SfCwxx.fetchCw});

