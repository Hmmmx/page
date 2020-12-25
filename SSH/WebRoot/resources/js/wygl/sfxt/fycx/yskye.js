if (typeof window.SfCwbbYskye === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfCwbbYskyeCntr';
	const yskmxModalSelector = '#wgSfCwbbYskyeYskmxModalDtls';
	
	const mainTblClz = '.table-wgsf-cwbb-ysk-ye';
	const filterFrmSelector = '#wgSfCwbbYskyeCntr .filterbar>form[data-type=filter]';
	
	const loadingMask1 = '#wgSfCwbbYskyeCntr';
	
	const me = window.SfCwbbYskye = {
		pager: null,
		filterData: null,
			
		bind: function() {
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.indicateFilter(cntrSelector, {expanded: true});
			$(`${cntrSelector} .filterbar input[data-cx-ctrl=fcxx-tree]`).on('input', function(){
				me.getJgSfxm(this);
			});

			$(`${cntrSelector} .filterbar input[data-cx-ctrl=fcxx-tree]`).fcxxTree();
			CxMisc.formValidated(filterFrmSelector, me.filter);
			$(`${cntrSelector} .toolbar button[data-cmd=dc]`).click(function(){
				me.dc(this);
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
				$.fileDownload(CxMisc.finalizeUrl('/wygl/sfxt/yskcx/dcYsk'), {
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

			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/yskcx/getYskCount'),
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
			    url: CxMisc.finalizeUrl('/wygl/sfxt/yskcx/getYsk'),
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
				tmp.append(`<tr data-id="${item.yskid}">
						<td class="td-indexer">
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td class="overflow-clip-left">${CxMisc.escapeHtml(item.fcmc)}</td>
						<td${khmcTitle}>${khmc}</td>
						<td>${item.sfxmmc}</td>
						<td>${item.dqye!==null?item.dqye.toFixed(2):'0'}</td>
						<td>${item.ssze!==null?item.ssze.toFixed(2):'0'}</td>
						<td>${item.szze!==null?item.szze.toFixed(2):'0'}</td>
						<td class="dl-item-cmd">
							<div class="btn-group" role="group" aria-label="操作按纽组">
								<button type="button" class="btn btn-outline-primary" data-cmd="yskmx">明细</button>
							</div>
						</td>
					</tr>`);
			}
			tmp.find('td.dl-item-cmd button[data-cmd=yskmx]').click(function(){ me.openYskmx(this); });
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		},
		
		openYskmx: function(el) {
			CxMisc.ajax({
	            url: CxMisc.finalizeUrl('wygl/sfxt/fy/getYskmx'),
	            type: "GET",
	            data: {yskid:$(el).closest('tr').data('id')},
	            beforeSend: function(xhr, cfg) {
	            	$(loadingMask1).mask('show', {msg: '载入中，请稍候...'});
	            },
	            success: function(res, ts) {
	            	if (res.code == "0") {
	            		let tmp = $(`${yskmxModalSelector} .table-wgsf-cwbb-ysk-ye-yskmx tbody`); 
	            		tmp.children('tr:not(.table-row-no-data)').remove();
	            		if (res.data && res.data.length>0) {
		            		for (let i=0; i<res.data.length; i++) {
		            			tmp.append(`<tr data-id="${res.data[i].sfpzid}">
			    						<td class="td-indexer">
				    						<span>${i+1}</span>
			    						</td>
			    						<td>${res.data[i].ywbz}</td>
			    						<td>${res.data[i].ysrq?res.data[i].ysrq:'<span class="text-black-50">未填写</span>'} ~ ${res.data[i].ysrz?res.data[i].ysrz:'<span class="text-black-50">未填写</span>'}</td>
			    						<td>${res.data[i].fsrq}</td>
			    						<td>${res.data[i].qye!==null?res.data[i].qye.toFixed(2):'0'}</td>
			    						<td>${res.data[i].fse!==null?res.data[i].fse.toFixed(2):'0'}</td>
			    						<td>${res.data[i].hye!==null?res.data[i].hye.toFixed(2):'0'}</td>
			    					</tr>`);
		            		}
	            		}
	            		tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
	    				$(yskmxModalSelector).modal('show');
	            	} else CxMsg.error('查询明细失败: ' + res.message);
	            },
	            error: function(xhr, ts, err) {
	            	var msg = "[" + xhr.status + " : " + ts + "]";
	            	CxMsg.error('查询明细失败: ' + msg);
	            },
	            complete: function(xhr, ts) {
	            	$(loadingMask1).mask('hide');
	            }
	        });
		}
	};
}

SfCwbbYskye.bind();