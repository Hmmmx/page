if (typeof window.SfCwck === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfckxxCntr';
	const loadingMask1 = '#wgSfckxxCntr';
	const loadingMask2 = '#wgSfckxxCntr .col-extended-lg';
	window.SfCwck = {
		bindEvents: function() {
			$('#wgSfckxxCntr button[data-cmd=add]').click(function(){
				if ($('#wgCkJgTree').data('currentNode'))
					SfCwck.popDtlsDialog('create', $('#wgCkJgTree').data('currentNode').data.dm);
				else
					CxMsg.info('请先从机构树中选择机构');
			});
			CxMisc.enableRefresh(cntrSelector, SfCwck.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.bindCheckAll('#wgSfckxxCntr');
			CxMisc.formValidated('#wgCkDtlsFrm', SfCwck.submitCk);
			
			$('#wgCkModalCkglDtls').on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
		refresh: function(){
			let node = $('#wgCkJgTree').data('currentNode');
			if (node) SfCwck.fetchCk(node); //刷新列表
		},
		
		deleteCk: function(el, e) {
			let currentNode = $('#wgCkJgTree').data('currentNode'), subNode = null,
				id = $(el).closest('tr').data('id');
		
		
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此车库？', function(src){
				var target = $(src);
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/cwck/deleteCkxx'),
		            type: "GET",
		            data:{
		                ckid: id
		            },
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask2).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除车库成功');
		            		SfCwck.fetchCk($('#wgCkJgTree').data('currentNode')); //刷新列表
		            	} else CxMsg.info('删除车库失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除车库失败: ' + msg);
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
		
		fetchCk: function(node) {
			CxMisc.resetCheckAll('#wgSfckxxCntr');
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/cwck/getCkxx'),
			    type: "GET",
			    data: {sqdm: node.data.dm},
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask2).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let tmp = $('#wgSfckxxCntr .table-wgsf-ck tbody').empty();
			    			for (let i=0; i<res.data.length; i++) {
			    				tmp.append(`<tr data-id="${res.data[i].ckid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="wgSfckIndexerAll-${i}" name="wgSfckIndexerAll${i}">
								            <label for="wgSfckIndexerAll-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td>${node.text}</td>
			    						<td>${res.data[i].ckmc}</td>
			    					    <td class="dl-item-cmd">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			    								<button type="button" class="btn btn-outline-primary" data-cmd="update" onclick="SfCwck.popDtlsDialog('update', '${res.data[i].ckid}', this)">修改</button>
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="del" onclick="SfCwck.deleteCk(this)">删除</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
			    				
			    			}
			    		} else {
			    			$('#wgSfckxxCntr .table-wgsf-ck tbody').empty().append('<tr><td colspan="4" class="table-empty">暂无数据</td></tr>');
			    		}
			    	} else {
			    		CxMsg.error('载入失败：' + res.message);
			    		$('#wgSfckxxCntr .table-wgsf-ck tbody').empty().append('<tr><td colspan="4" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$('#wgSfckxxCntr .table-wgsf-ck tbody').empty().append('<tr><td colspan="4" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$(loadingMask2).mask('hide');
			    }
			});
		},
		
		
		
		
		
		popDtlsDialog: function(cmd, id, el) {
			let f = document.querySelector('#wgCkDtlsFrm');
			f.reset();
			f.cmd.value = cmd;
			if (cmd == 'create') {
				$('#wgCkModalCkglDtlsLabel').text('添加机构车库');
				f.sqdm.value = id;
			} else {
				$('#wgCkModalCkglDtlsLabel').text('修改机构车库');
				let data = $(el).closest('tr').data('json');
				f.ckid.value = id;
				f.ckmc.value = data.ckmc;
				
			}
			$('#wgCkModalCkglDtls').modal('show');
		},
		
		
		
		
		
		submitCk: function(f) {
			let frm=$(f), prefix = f.cmd.value=='create' ? '添加' : '修改',
				data = frm.serializeJson(),
				url=f.cmd.value=='create' ? CxMisc.finalizeUrl('/wygl/sfxt/cwck/addCkxx') : CxMisc.finalizeUrl('/wygl/sfxt/cwck/updateCkxx');
		
			
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
			    		SfCwck.fetchCk($('#wgCkJgTree').data('currentNode')); //刷新列表
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
SfCwck.bindEvents();
CxWg.loadJgTree(CxMisc.finalizeUrl('/wygl/sfxt/cwck/getSqList'), '#wgCkJgTree', {nodeSelected: SfCwck.fetchCk});

