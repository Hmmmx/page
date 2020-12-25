if (typeof window.Splb === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	window.Splb = {
		bindEvents: function() {
			$('#splbAdd').click(function(){
			     Splb.splbDialog('create');
			});
			
			CxMisc.bindCheckAll('#splbCntr');
			
			CxMisc.formValidated('#splbFrm', Splb.submitSplb);
			 
			$('#splbModalDtls').on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
	
		
		deleteSplb: function(splbid, el, e) {
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此商品类别？', function(src){
				var target = $(src);
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/splb/deleteSplb'),
		            type: "GET",
		            data:{
		                splbid: splbid
		            },
		            beforeSend: function(xhr, cfg) {
		            	$('#splbCntr').mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            	    CxMsg.info('删除商品类别成功');
		            		Splb.fetchSplb();
		            	} else CxMsg.info('删除商品类别失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除商品类别失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	$('#splbCntr').mask('hide');
		            }
		        });
		    }, {
		    	evt: evt,
		    	src: el,
		    	placement: 'top'
		    });
		},
		
		fetchSplb: function() {
			CxMisc.ajax({
			    url:CxMisc.finalizeUrl('/splb/getSplb'),
			    type: "GET",
			    beforeSend: function(xhr, cfg) {
			    	$('#splbCntr').mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let tmp = $('#splbCntr .table-splb tbody').empty();
			    			for (let i=0; i<res.data.length; i++) {
			    				tmp.append(`<tr data-id="${res.data[i].splbid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="splbIndexer-${i}" name="splbIndexer${i}">
								            <label for="splbIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td>${res.data[i].splbmc}</td>
			    						<td>${res.data[i].plxh}</td>
			    						<td>${res.data[i].yxbj==0?'无效':'有效'}</td>
			    						<td class="dl-item-cmd" style="text-align:center;">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			    								<button type="button" class="btn btn-outline-primary" data-cmd="update" onclick="Splb.splbDialog('update','${res.data[i].splbid}', this)">修改</button>
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="del" onclick="Splb.deleteSplb('${res.data[i].splbid}',this)">删除</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
			    				if (res.data[i].yxbj == 0) tmp.children(':last-child').addClass('tr-disabled').attr('title', '类别已禁用');
			    			}
			    		} else {
			    			$('#splbCntr .table-splb tbody').empty().append('<tr><td colspan="5" class="table-empty">暂无数据</td></tr>');
			    		}
			    	} else {
			    		CxMsg.error('载入失败：' + res.message);
			    		$('#splbCntr .table-splb tbody').empty().append('<tr><td colspan="5" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$('#splbCntr .table-splb tbody').empty().append('<tr><td colspan="5" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$('#splbCntr').mask('hide');
			    }
			});
		},
		
		
		
		splbDialog: function(cmd,splbid,el) {
			let f = document.querySelector('#splbFrm');
			f.reset();
			f.cmd.value = cmd;
			if (cmd == 'create') {
				$('#splbModalDtlsLabel').text('添加商品类别');
			} else {
				$('#splbModalDtlsLabel').text('修改商品类别');
				let data = $(el).closest('tr').data('json');
				f.splbid.value = splbid;
			    f.splbmc.value = data.splbmc;
				f.plxh.value = data.plxh;
				$(f).find("input[name=yxbj]").each(function() {
					if (this.value == data.yxbj) this.click(); 
		        });
			}
			$('#splbModalDtls').modal('show');
		},
		
		
		
		submitSplb: function(f) {
			let frm=$(f), prefix = f.cmd.value=='create' ? '添加' : '修改',
				url=f.cmd.value=='create' ? CxMisc.finalizeUrl('/splb/addSplb') : CxMisc.finalizeUrl('/splb/updateSplb');
			CxMisc.ajax({
			    url: url,
			    type: "POST",
			    data: frm.serializeJson(),
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		setTimeout(function(){CxMsg.info(prefix + '成功');}, 600); //延时显示，防止提示框抖动
			    		frm.closest('.modal').modal('hide');
			    		Splb.fetchSplb();
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

Splb.fetchSplb();
Splb.bindEvents();

