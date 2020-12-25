if (typeof window.SfCwglCkycgl === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfCwglCkycglCntr';
	
	const mainTblClz = '.table-wgsf-cwgl-ckycgl';
	const filterFrmSelector = '#wgSfCwglCkycglCntr .filterbar>form[data-type=filter]';
	
	const updateModalSelector = '#wgSfCwglCkycglUpdateModal';
	const updateFrmSelector = '#wgSfCwglCkycglUpdateFrm';
	
	const loadingMask1 = '#wgSfCwglCkycglCntr';
	
	const me = window.SfCwglCkycgl = {
		pager: null,
		filterData: null,
			
		bind: function() {
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.indicateFilter(cntrSelector, {expanded: true});
			$(`${cntrSelector} input[data-cx-ctrl=fcxx-tree]`).fcxxTree();
			CxMisc.formValidated(filterFrmSelector, me.filter);
			
			$(`${cntrSelector} div.date[data-cx-ctrl=date]`).datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			
			CxMisc.formValidated(updateFrmSelector, function(f){ me.submitUpdate(f); });
			$(`${updateModalSelector}`).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD', date: null // 必须设置为空，否则会自动选择当天日期
			});
			$(`${updateModalSelector}`).on('show.bs.modal', function (e) { 
				CxMisc.clearValidation(this); 
			});
		},
		
		refresh: function() {
			if (me.pager) me.goto(me.pager.pagination("page"), me.pager.pagination("pageSize"));
		},
		
		del: function(e) {
			let el = e.target, xkgzid = $(el).closest('tr').data('id');
			CxCtrl.confirm('是否确定删除所选预存？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/ckycgl/deleteXkgz'),
		            type: "GET",
		            data: {xkgzid},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask1).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除所选预存成功');
		            		me.refresh(); //刷新列表
		            	} else CxMsg.error('删除所选预存失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除所选预存失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	$(loadingMask1).mask('hide');
		            }
		        });
		    }, {
		    	evt: e,
		    	src: el,
		    	placement: 'top'
		    });
		},
		
		filter: function(f) {
			let data = $(f).serializeJson({removeBlankField:true}); // 每次查询后都缓存查询条件，给分页调用
			delete data.fczymc; // 选中的房产资源名称不需要作为参数
			me.filterData = data;
			if (me.filterData.fsrqq && me.filterData.fsrqz && me.filterData.fsrqq>me.filterData.fsrqz) {
				CxMsg.info('预存日期的开始日期不能大于结束日期');
				return;
			}
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/ckycgl/getXkgzCount'),
			    type: "GET",
			    data: me.filterData,
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask1).mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		me.genPager(res.data); // 生成分页
			    		if (res.data == 0) {
			    			$(`${cntrSelector} ${mainTblClz} tbody>tr:not(.table-row-no-data)`).remove();
			    		} else {
			    			me.goto(0, me.pager.pagination("pageSize")); // 默认打开第一页
			    		}
			    	} else {
			    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    },
	            complete: function(xhr, ts) {
	            	$(loadingMask1).mask('hide');
	            }
			});
		},
		
		genPager: function(count) { // 生成分页并保存分页句柄到me.pager
			me.pager = null;
			let cntr = $(`${cntrSelector} .main-content`);
			cntr.children('.cx-pagination-cntr').remove(); // 清除上一次生成的分页（如有）
			cntr.append(`<div class="cx-pagination-cntr">
						<div class="cx-pagination" data-cx-ctrl="pagination"></div>
					</div>`);
			me.pager = cntr.find("[data-cx-ctrl=pagination]").pagination({page:1, records:count, click:me.goto});
		},
		goto: function(page, pageSize) {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/ckycgl/getXkgz'),
			    type: "GET",
			    data: Object.assign(me.filterData, {page: page, pageSize: pageSize}),
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask1).mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		$(`${cntrSelector} ${mainTblClz} tbody>tr:not(.table-row-no-data)`).remove();
			    		if (res.data && res.data.length>0) me.render(page, pageSize, res.data);
						me.pager.pagination("refreshPage", page);
			    	} else {
			    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$(loadingMask1).mask('hide');
			    }
			});
		},
		
		render: function(page, pageSize, data) {
			let tmp = $(`${cntrSelector} ${mainTblClz} tbody`);
			for (let i=0; i<data.length; i++) {
				let item = data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
				tmp.append(`<tr data-id="${item.xkgzid}">
						<td class="td-indexer">
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td class="overflow-clip-left">${item.fcmc?CxMisc.escapeHtml(item.fcmc):''}</td>
						<td${khmcTitle}>${khmc}</td>
						<td>${item.sfxmmc?item.sfxmmc:''}</td>
						<td>${item.fsrq?item.fsrq:''}</td>
						<td>${item.cphm?item.cphm:''}</td>
						<td>${item.cwhm!==null?item.cwhm:''}</td>
						<td>${item.ckh?item.ckh:''}</td>
						<td>${me.clbjmc(item.clbj)}</td>
						<td>${typeof item.xfje==='number'?item.xfje.toFixed(2):''}</td>
						<td>${item.xfys!==null?item.xfys:''}</td>
						<td>${me.xfzq(item.clbj, item.xfrqq, item.xfrqz)}</td>
						<td>${me.ztbjmc(item.ztbj)}</td>
						<td class="dl-item-cmd">
							<div class="btn-group" role="group" aria-label="操作按纽组">
								<button type="button" class="btn btn-outline-primary" data-cmd="update">处理</button>
								<button type="button" class="btn btn-outline-danger" data-cmd="del">删除</button>
							</div>
						</td>
					</tr>`);
				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
			}
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			tmp.find('td.dl-item-cmd button[data-cmd=update]').click(function(){ me.openUpdate(this); });
			tmp.find('td.dl-item-cmd button[data-cmd=del]').click(function(e){ me.del(e); });
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		},
		xfzq: function(clbj, xfrqq, xfrqz) {
			if (clbj == '1') {
				return (xfrqq?xfrqq:'<span class="text-black-50">未填写</span>') + ' ~ ' + (xfrqz?xfrqz:'<span class="text-black-50">未填写</span>');
			}
			return '';
		},
		clbjmc: function(clbj) {
			switch(clbj) {
			case '0': return '未处理';
			case '1': return '已处理';
			}
			return '';
		},
		ztbjmc: function(ztbj) {
			switch(ztbj) {
			case '0': return '未支付';
			case '1': return '已支付';
			case '9': return '作废';
			}
			return '';
		},
		
		openUpdate: function(el) {
			let f = document.querySelector(updateFrmSelector), data = $(el).closest('tr').data('json');
			f.reset();
			f.xkgzid.value = data.xkgzid;
			if (data.xfrqq) $('#wgSfCwglCkycgl_xfrqq_p').datetimepicker('date', data.xfrqq);
			if (data.xfrqz) $('#wgSfCwglCkycgl_xfrqz_p').datetimepicker('date', data.xfrqz);
			$(updateModalSelector).modal('show');
		},
		submitUpdate: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true}), ok = true;
			if (data.xfrqq > data.xfrqz) {
				ok = false;
				f.xfrqz.focus();
				CxMsg.info('续费结束日期不能小于费开始日期');
			}
			if (ok) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/ckycgl/updateXkgz'),
				    type: "POST",
				    data: data,
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		CxMsg.info('修改客户预存信息成功');
				    		me.refresh();
							frm.closest('.modal').modal('hide');
				    	} else {
				    		CxMsg.warn('修改客户预存信息失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.warn('修改客户预存信息失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
				    }
				});
			}
		}
	};
}

SfCwglCkycgl.bind();