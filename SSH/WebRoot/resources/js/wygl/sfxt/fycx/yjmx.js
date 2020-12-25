if (typeof window.SfCwbbYjmx === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfCwbbYjmxCntr';
	
	const mainTblClz = '.table-wgsf-cwbb-yjmx';
	const filterFrmSelector = '#wgSfCwbbYjmxCntr .filterbar>form[data-type=filter]';
	
	const loadingMask1 = '#wgSfCwbbYjmxCntr';
	
	const me = window.SfCwbbYjmx = {
		pager: null,
		filterData: null,
			
		bind: function() {
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.indicateFilter(cntrSelector, {expanded: true});
			$(`${cntrSelector} .filterbar select[name=czlx]`).change(function(){
				me.switchCzlx(this);
			});
			$(`${cntrSelector} .filterbar input[data-cx-ctrl=fcxx-tree]`).fcxxTree();
			CxMisc.formValidated(filterFrmSelector, me.filter);
			$(`${cntrSelector} .toolbar button[data-cmd=dc]`).click(function(){
				me.dc(this);
			});
			
			$(`${cntrSelector} .filterbar div.date[data-cx-ctrl=date]`).datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
		},
		
		refresh: function() {
			if (me.pager) me.goto(me.pager.pagination("page"), me.pager.pagination("pageSize"));
		},
		
		dc: function(el) {
			if (me.filterData) {
				$.fileDownload(CxMisc.finalizeUrl('/wygl/sfxt/yjcx/dcYjsrmx'), {
	                httpMethod : 'GET',
	                data : me.filterData,
	                prepareCallback : function(url) {
	                	CxMisc.markAjaxStart($(el));
	                },
	                successCallback : function(url) {
	                	CxMisc.markAjaxEnd($(el));
	                    CxMsg.info('文件导出成功');
	                },
	                failCallback : function(html, url) {
	                	CxMisc.markAjaxEnd($(el));
	                	let txt = CxMisc.getHtmlText(html);
	                	try {
	                		let res = JSON.parse(txt);
	                		CxMsg.warn('文件文件导出失败：' + res.message);
	                	} catch(err) {
	                		CxMsg.warn('文件文件导出失败：' + txt);
	                	}
	                	
	                }
	            });
			} else CxMsg.info('请先执行查询');
		},
		
		switchCzlx: function(el) {
			$(`${cntrSelector} .filterbar [data-czlx]`).find('select').each(function(){this.disabled = true});
			$(`${cntrSelector} .filterbar [data-czlx] div.date[data-cx-ctrl=date]`).datetimepicker('disable');
			if (el.value != '') {
				$(`${cntrSelector} .filterbar [data-czlx=${el.value}]`).find('select').each(function(){this.disabled = false});
				$(`${cntrSelector} .filterbar [data-czlx=${el.value}] div.date[data-cx-ctrl=date]`).datetimepicker('enable');
			}
		},
		
		filter: function(f) {
			let data = $(f).serializeJson({removeBlankField:true}); // 每次查询后都缓存查询条件，给分页调用
			delete data.fczymc; // 选中的房产资源名称不需要作为参数
			me.filterData = data;
			if (me.filterData.skrqq && me.filterData.skrqz && me.filterData.skrqq>me.filterData.skrqz) {
				CxMsg.info('收款日期的开始日期不能大于结束日期');
				return;
			}
			if (me.filterData.tkrqq && me.filterData.tkrqz && me.filterData.tkrqq>me.filterData.tkrqz) {
				CxMsg.info('退款日期的开始日期不能大于结束日期');
				return;
			}
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/yjcx/getYjmxCount'),
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
			    url: CxMisc.finalizeUrl('/wygl/sfxt/yjcx/getYjmx'),
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
				tmp.append(`<tr>
						<td class="td-indexer">
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td class="overflow-clip-left">${item.fcmc?CxMisc.escapeHtml(item.fcmc):''}</td>
						<td${khmcTitle}>${khmc}</td>
						<td>${item.yjlxmc?item.yjlxmc:''}</td>
						<td>${item.sqje!==null?item.sqje.toFixed(2):''}</td>
						<td>${me.filterData.czlx=='0' ? (item.skrq?item.skrq:'') : (item.tksj?item.tksj:'')}</td>
						
						<td>${me.filterData.czlx=='0' ? (item.skfsmc?item.skfsmc:'') : (item.thjsfsmc?item.thjsfsmc:'')}</td>
						<td>${me.filterData.czlx=='0' ? (item.skrmc?item.skrmc:'') : (item.tkrmc?item.tkrmc:'')}</td>
						<td>${item.pjbh!==null?item.pjbh:''}</td>
						<td>${item.pzh!==null?item.pzh:''}</td>
						<td>${item.thbj=='0' ? '未退' : '已退'}</td>
						
						<td><pre class="mb-0 cx-f-1">${me.filterData.czlx=='0' ? (item.skbz!==null?item.skbz:'') : (item.tkbz!==null?item.tkbz:'')}</pre></td>
					</tr>`);
			}
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移到未尾
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		}
		
	};
}

SfCwbbYjmx.bind();