if (typeof window.SfCwbbYcxfymx === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfCwbbYcxfymxCntr';
	
	const mainTblClz = '.table-wgsf-cwbb-ycxfymx';
	const filterFrmSelector = '#wgSfCwbbYcxfymxCntr .filterbar>form[data-type=filter]';
	
	const loadingMask1 = '#wgSfCwbbYcxfymxCntr';
	
	const me = window.SfCwbbYcxfymx = {
		pager: null,
		filterData: null,
			
		bind: function() {
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.indicateFilter(cntrSelector, {expanded: true});
			$(`${cntrSelector} input[data-cx-ctrl=fcxx-tree]`).on('input', function(){
				me.getJgSfxm(this);
			});
			$(`${cntrSelector} input[data-cx-ctrl=fcxx-tree]`).fcxxTree();
			CxMisc.formValidated(filterFrmSelector, me.filter);
			$(`${cntrSelector} .toolbar button[data-cmd=dc]`).click(function(){
				me.dc(this);
			});
			
			$(`${cntrSelector} div.date[data-cx-ctrl=date]`).datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
		},
		
		refresh: function() {
			if (me.pager) me.goto(me.pager.pagination("page"), me.pager.pagination("pageSize"));
		},
		
		getJgSfxm: function(src) {
			let sqdm = $(src).fcxxTree('sqdm'), el = src.form.sfxmdm;
			if (sqdm && sqdm != el.getAttribute('data-sqdm')) {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfxm'),
		            type: "GET",
		            data: {sqdm: sqdm},
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		el.selectedIndex = 0;
	            			for (let i=el.options.length-1; i>0; i--) el.remove(i);
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) 
		            				el.options.add(new Option(res.data[i].sfxmmc, res.data[i].sfxmdm));
		            			if (el.getAttribute('data-selected-value')) {
		        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
		        					if (el.selectedIndex == -1) el.selectedIndex = 0;
		        				}
		            		}
	            			el.setAttribute('data-sqdm', sqdm);
		            	} else CxMsg.info('获取收费项目列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取收费项目列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	el.disabled = false;
		            }
		        });
			}
		},
		
		dc: function(el) {
			if (me.filterData) {
				$.fileDownload(CxMisc.finalizeUrl('/wygl/sfxt/ycxcx/dcYcxfymx'), {
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
		
		filter: function(f) {
			let data = $(f).serializeJson({removeBlankField:true}); // 每次查询后都缓存查询条件，给分页调用
			delete data.fczymc; // 选中的房产资源名称不需要作为参数
			me.filterData = data;
			if (me.filterData.skrqq && me.filterData.skrqz && me.filterData.skrqq>me.filterData.skrqz) {
				CxMsg.info('收款日期的开始日期不能大于结束日期');
				return;
			}
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/ycxcx/getYcxfymxCount'),
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
			    url: CxMisc.finalizeUrl('/wygl/sfxt/ycxcx/getYcxfymx'),
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
						<td>${item.sfxmmc}</td>
						<td>${item.sfje!==null?item.sfje.toFixed(2):''}</td>
						<td>${item.skrq!==null?item.skrq:''}</td>
						<td>${item.skfsmc?item.skfsmc:''}</td>
						<td>${item.skrmc!==null?item.skrmc:''}</td>
						<td>${item.pjbh!==null?item.pjbh:''}</td>
						<td>${item.pzh!==null?item.pzh:''}</td>
						<td><pre class="mb-0 cx-f-1">${item.skbz!==null?item.skbz:''}</pre></td>
					</tr>`);
			}
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		}
		
	};
}

SfCwbbYcxfymx.bind();