if (typeof window.SfCwbbSfpzmx === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfCwbbSfpzmxCntr';
	const sfmxModalSelector = '#wgSfCwbbSfpzmxModalDtls';
	
	const mainTblClz = '.table-wgsf-cwbb-sfpzmx';
	const filterFrmSelector = '#wgSfCwbbSfpzmxCntr .filterbar>form[data-type=filter]';
	const printIframeSelector = '#wgSfCwbbSfpzmxCntr .cx-print-wrapper iframe';
	
	const loadingMask1 = '#wgSfCwbbSfpzmxCntr';
	
	const me = window.SfCwbbSfpzmx = {
		pager: null,
		filterData: null,
		sums: null,
			
		bind: function() {
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.indicateFilter(cntrSelector, {expanded: true});
			$(`${cntrSelector} input[data-cx-ctrl=fcxx-tree]`).on('input', function(){
				me.getSkrList(this);
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
		
		getSkrList: function(src) {
			let sqdm = $(src).fcxxTree('sqdm'), el = src.form.skr;
			if (sqdm && sqdm != el.getAttribute('data-sqdm')) {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/pz/getJgyh'),
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
		            				el.options.add(new Option(res.data[i].yhmc, res.data[i].yhdm));
		            			if (el.getAttribute('data-selected-value')) {
		        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
		        					if (el.selectedIndex == -1) el.selectedIndex = 0;
		        				}
		            		}
		            		el.setAttribute('data-sqdm', sqdm);
		            	} else CxMsg.info('获取收款人列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取收款人列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	el.disabled = false;
		            }
		        });
			}
		},
		
		dc: function(el) {
			if (me.filterData) {
				$.fileDownload(CxMisc.finalizeUrl('/wygl/sfxt/pz/dcPzmx'), {
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
			if (data.pzlydm) {
				data.pzlydmstr = typeof data.pzlydm === 'object' ? data.pzlydm.join(',') : data.pzlydm;
				delete data.pzlydm;
			}
			data.jglx = '11'; //结果需要明细和合计数据
			delete data.fczymc; // 选中的房产资源名称不需要作为参数
			me.filterData = data;
			if (me.filterData.skrqq && me.filterData.skrqz && me.filterData.skrqq>me.filterData.skrqz) {
				CxMsg.info('收款日期的开始日期不能大于结束日期');
				return;
			}
			if (me.filterData.zfrqq && me.filterData.zfrqz && me.filterData.zfrqq>me.filterData.zfrqz) {
				CxMsg.info('作废日期的开始日期不能大于结束日期');
				return;
			}
			me.sums = null;
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/pz/getSfpzCount'),
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
			    url: CxMisc.finalizeUrl('/wygl/sfxt/pz/getSfpz'),
			    type: "GET",
			    data: Object.assign(me.filterData, {page: page, pageSize: pageSize}),
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask1).mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		$(`${cntrSelector} ${mainTblClz} tbody>tr:not(.table-row-no-data)`).remove();
			    		if (res.data && res.data.sfpzList.length>0) me.render(page, pageSize, res.data);
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
		
		openDtls: function(id) {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/pz/getSfmx'),
			    type: "GET",
			    data: {sfpzid:id}, // 该页面查询 所有明细，包括作废, ztbj不用设置
			    beforeSend: function(xhr, cfg) {
			    	$(`${sfmxModalSelector} .modal-body`).mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		$(`${sfmxModalSelector} .modal-body table`).addClass('d-none');
			    		if (res.data && res.data.length>0) {
			    			let isYsfy = res.data[0].ysfyid && res.data[0].ysfyid != '',
			    				isYcxfy = res.data[0].ycxfyid && res.data[0].ycxfyid != '',
			    				isYsk = res.data[0].yskid && res.data[0].yskid != '',
			    				isYj = res.data[0].yjid && res.data[0].yjid != '';
			    			if (isYsfy) {
			    				let table = $(`${sfmxModalSelector} .modal-body table.table-wgsf-fy-khfysq-ysfy-mx`), tbody = table.find('tbody');
			    				table.removeClass('d-none');
			    				tbody.empty();
			    				for (let i=0; i<res.data.length; i++) {
			    					let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
			    					tbody.append(`<tr>
				    						<td class="td-indexer">
					    						<span>${i+1}</span>
				    						</td>
				    						<td${khmcTitle}>${khmc}</td>
				    						<td>${item.sfxmmc}</td>
				    						<td>${CxMisc.escapeHtml(item.sfbzmc)}</td>
				    						<td>${item.fyje.toFixed(2)}</td>
				    						<td>${CxMisc.formatDate(item.jfzqq, 'short')} ~ ${CxMisc.formatDate(item.jfzqz, 'short')}</td>
				    						<td>${CxMisc.formatDate(item.ysrq, 'short')}</td>
				    						<td>${item.sfzdy}</td>
				    						<td>${item.fyfldm=='2'?'违约金':(item.fyfldm=='1'?'正常费用':'-')}</td>
				    						<td><pre class="mb-0 cx-f-1">${item.sfsm ? CxMisc.escapeHtml(item.sfsm) : ''}</pre></td>
				    					</tr>`);
				    			}
			    			} else if (isYcxfy) {
			    				let table = $(`${sfmxModalSelector} .modal-body table.table-wgsf-fy-khfysq-ycxfy-mx`), tbody = table.find('tbody');
			    				table.removeClass('d-none');
			    				tbody.empty();
			    				for (let i=0; i<res.data.length; i++) {
			    					let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
			    					tbody.append(`<tr>
				    						<td class="td-indexer">
					    						<span>${i+1}</span>
				    						</td>
				    						<td${khmcTitle}>${khmc}</td>
				    						<td>${item.sfxmmc}</td>
				    						<td>${item.skfsmc}</td>
				    						<td>${item.sklxmc}</td>
				    						<td>${item.sfje ? item.sfje.toFixed(2) : ''}</td>
				    						<td>${item.jfr ? item.jfr : ''}</td>
				    						<td>${item.skrmc?item.skrmc:''}</td>
				    						<td>${CxMisc.formatDate(item.skrq, 'short')}</td>
				    						<td><pre class="mb-0 cx-f-1">${item.skbz?item.skbz:''}</pre></td>
				    					</tr>`);
				    			}
			    			} else if (isYsk) {
			    				let table = $(`${sfmxModalSelector} .modal-body table.table-wgsf-fy-khfysq-ysk-mx`), tbody = table.find('tbody');
			    				table.removeClass('d-none');
			    				tbody.empty();
			    				for (let i=0; i<res.data.length; i++) {
			    					let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
			    					tbody.append(`<tr>
				    						<td class="td-indexer">
					    						<span>${i+1}</span>
				    						</td>
				    						<td${khmcTitle}>${khmc}</td>
				    						<td>${item.sfxmmc}</td>
				    						<td>${item.ysrq?item.ysrq:'<span class="text-black-50">未填写</span>'} ~ ${item.ysrz?item.ysrz:'<span class="text-black-50">未填写</span>'}</td>
				    						<td>${item.fsrq}</td>
				    						<td>${item.qye!==null?item.qye.toFixed(2):'0'}</td>
			    							<td>${item.fse!==null?item.fse.toFixed(2):'0'}</td>
			    							<td>${item.hye!==null?item.hye.toFixed(2):'0'}</td>
				    						<td><pre class="mb-0 cx-f-1">${item.skbz?item.skbz:''}</pre></td>
				    					</tr>`);
				    			}
			    			} else if (isYj) {
			    				let table = $(`${sfmxModalSelector} .modal-body table.table-wgsf-fy-khfysq-yj-mx`), tbody = table.find('tbody');
			    				table.removeClass('d-none');
			    				tbody.empty();
			    				for (let i=0; i<res.data.length; i++) {
			    					let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
			    					tbody.append(`<tr>
				    						<td class="td-indexer">
					    						<span>${i+1}</span>
				    						</td>
				    						<td${khmcTitle}>${khmc}</td>
				    						<td>${item.yjlxmc}</td>
				    						<td>${item.sklxmc}</td>
				    						<td>${item.sqje ? item.sqje.toFixed(2) : ''}</td>
				    						<td>${item.jfr ? item.jfr : ''}</td>
				    						<td>${item.skrmc?item.skrmc:''}</td>
				    						<td>${CxMisc.formatDate(item.skrq, 'short')}</td>
				    						<td><pre class="mb-0 cx-f-1">${item.skbz?item.skbz:''}</pre></td>
				    						<td>${item.thbj ? (item.thbj=='1'?'已退款':'未退款') : ''}</td>
				    						<td>${item.thjsfsmc ? item.thjsfsmc : ''}</td>
				    						<td>${item.tksj ? CxMisc.formatDate(item.tksj, 'short') : ''}</td>
				    						<td><pre class="mb-0 cx-f-1">${item.tkbz ? item.tkbz:''}</pre></td>
				    					</tr>`);
				    			}
			    			}
			    		} else {
			    			$(`${sfmxModalSelector} .modal-body table.table-wgsf-fy-khfysq-nodata`).removeClass('d-none');
			    		}
			    	} else {
			    		CxMsg.warn('获取凭证明细失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('获取凭证明细失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$(`${sfmxModalSelector} .modal-body`).mask('hide');
			    }
			});
			$(sfmxModalSelector).modal('show');
		},
		
		
		formatData: function(data, pageSize) {
			let ret = { sfpz:data.sfpz, sfpzmxPages:[], stat:{total:0, zwdxTotal:null} };
			if (!data.sfpzmx) data.sfpzmx = [];
			let pageCount = Math.ceil(data.sfpzmx.length/pageSize);
			for (let i=0; i<pageCount; i++) {
				let sfpzmxs = data.sfpzmx.slice(i*pageSize, (i+1)*pageSize), subTotal=0;
				if (data.sfpz.pzlydm == '01') for (let j=0; j<sfpzmxs.length; j++) subTotal += sfpzmxs[j].fyje; //应收费用
				else if (data.sfpz.pzlydm == '02') for (let j=0; j<sfpzmxs.length; j++) subTotal += sfpzmxs[j].sfje; //一次性
				else if (data.sfpz.pzlydm == '03') for (let j=0; j<sfpzmxs.length; j++) subTotal += sfpzmxs[j].fse; //预收款
				else if (data.sfpz.pzlydm == '05') for (let j=0; j<sfpzmxs.length; j++) subTotal += sfpzmxs[j].sqje; //押金
				else if (data.sfpz.pzlydm == '06') for (let j=0; j<sfpzmxs.length; j++) subTotal += sfpzmxs[j].sqje; //押金退还
				else if (data.sfpz.pzlydm == '21') for (let j=0; j<sfpzmxs.length; j++) subTotal += sfpzmxs[j].fyje; //应收费用通知
				ret.sfpzmxPages.push({
					page: i+1,
					pageSize: pageSize,
					subTotal: subTotal.toFixed(2),
					sfpzmxs: sfpzmxs
				});
				ret.stat.total += subTotal;
			}
			if (data.sfpz.pzlydm == '03') { // 预收款是否有折扣
				for (let i=0; i<data.sfpzmx.length; i++) if (data.sfpzmx[i].zk < 1) { ret.stat.hasZk = true; break; }
			}
			ret.stat.pageCount = pageCount;
			ret.stat.total = ret.stat.total.toFixed(2);
			ret.stat.zwdxTotal = CxMisc.toChineseUpperCase(ret.stat.total);
			return ret;
		},
		getDymb: function(pzlydm) {
			let mblx = null;
			switch(pzlydm) {
			case '01': mblx = 'ysfy'; break;
			case '02': mblx = 'ycxfy'; break;
			case '03': mblx = 'ysk'; break;
			case '04': mblx = 'yskjz'; break;
			case '05': mblx = 'yj'; break;
			case '06': mblx = 'yjth'; break;
			case '07': mblx = 'zlzyc'; break;
			case '21': mblx = 'ysfytz'; break;
			default: break;
			}
			return new Promise(function(resolve, reject) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/dyhj/getDymb'),
				    type: "GET",
				    dataType: "html",
				    data: {mblx: mblx},
				    beforeSend: function(xhr, cfg) {
				    	$(loadingMask1).mask('show');
				    },
				    success: function(res, ts) {resolve(res);},
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('载入失败：' + msg);
				    	reject(new Error('载入失败：' + msg));
				    },
				    complete: function(xhr, ts) {
				    	$(loadingMask1).mask('hide');
				    }
				});
			});
		},
		getDymx: function(sfpzid, dylx) {
			return new Promise(function(resolve, reject) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/pz/print'),
				    type: "GET",
				    data: {sfpzid: sfpzid, dylx: dylx},
				    beforeSend: function(xhr, cfg) {
				    	$(loadingMask1).mask('show');
				    },
				    success: function(res, ts) {resolve(res.data);},
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('载入失败：' + msg);
				    	reject(new Error('载入失败：' + msg));
				    },
				    complete: function(xhr, ts) {
				    	$(loadingMask1).mask('hide');
				    }
				});
			});
		},
		printSfpz: function(sfpzid, pzlydm, dylx) {
			Promise.all([me.getDymb(pzlydm), me.getDymx(sfpzid, dylx)]).then(function ([dymb, dymx]) {
				let pageSize = 10;
		    	if (/data-print-page-size="(\d+)"/.test(dymb)) pageSize = RegExp.$1;
		    	let iBody = document.querySelector(printIframeSelector).contentWindow.document.body;
		    	if (iBody) {
			    	iBody.innerHTML = dymb;
			    	let data = {data: me.formatData(dymx, pageSize)};
			    	new Vue({
			    		el: iBody,
			    		data: data,
			    		mounted: function(){
			    			setTimeout(function(){document.querySelector(printIframeSelector).contentWindow.print();},300); // 延时执行，确保打印页面生成后再打印
			    		}
			    	});
		    	} else {
		    		CxMsg.error('打印异常，新关闭当前标签或刷新页面后重试');
		    	}
			}).catch(function(err){
				CxMsg.error('遇到异常，打印不能完成，请稍后重试：' + err.message);
			});
		},
		
		render: function(page, pageSize, data) {
			if (page == 0) { //只需要在第一页时重新生成列标题
				me.sums = {fyje: data.sfpzFyjeSum, fcmc: '所有房产合计'};
			}
			
			let tmp = $(`${cntrSelector} ${mainTblClz} tbody`);
			for (let i=0; i<data.sfpzList.length; i++) {
				let item = data.sfpzList[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
				tmp.append(`<tr data-id="${item.sfpzid}" data-pzlydm="${item.pzlydm}">
						<td class="td-indexer">
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td class="overflow-clip-left">${item.fcmc?CxMisc.escapeHtml(item.fcmc):''}</td>
						<td${khmcTitle}>${khmc}</td>
						<td>${item.pzh?item.pzh:''}</td>
						<td>${item.pzlymc}</td>
						<td>${item.pzlydm=='06' ? item.thjsfsmc : item.skfsmc}</td>
						<td>${item.pjbh?item.pjbh:''}</td>
						<td>${item.pjlxmc?item.pjlxmc:''}</td>
						<td>${item.je?item.je.toFixed(2):''}</td>
						<td>${item.jfr ? item.jfr : ''}</td>
						<td>${item.skrmc?item.skrmc:''}</td>
						<td>${item.skrq}</td>
						<td><pre class="mb-0 cx-f-1">${item.skbz?item.skbz:''}</pre></td>
						<td>${item.ztbj=='9'?'作废':'正常'}</td>
						<td class="dl-item-cmd">
							<div class="btn-group" role="group" aria-label="操作按纽组">
								<button type="button" class="btn btn-outline-primary" data-cmd="open-dtls">明细</button>
								<button type="button" class="btn btn-outline-primary" data-cmd="print-sfpz" data-dylx="1">打印</button>
								<button type="button" class="btn btn-outline-primary" data-cmd="print-sfpz" data-dylx="2"${item.pzlydm=='01'?'':' disabled'}>打印汇总</button>
							</div>
						</td>
					</tr>`);
			}
			
			if (me.sums) { //如果有所有房产合计
				tmp.append(`<tr>
						<td class="td-indexer">
    						<span>-</span>
						</td>
						<td>${me.sums.fcmc}</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td>${me.sums.fyje}</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td><span>-</span></td>
					</tr>`);
			}
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			tmp.find('td.dl-item-cmd button[data-cmd="print-sfpz"]').click(function(){ 
				let tr = $(this).closest('tr');
				me.printSfpz(tr.data('id'), tr.data('pzlydm'), this.getAttribute('data-dylx')); 
				this.disabled = true;
				let $this = this;
				setTimeout(function(){ $this.disabled = false; }, 6000); //6秒内不能再点击打印
			});
			tmp.find('td.dl-item-cmd button[data-cmd="open-dtls"]').click(function(){ me.openDtls($(this).closest('tr').data('id')); });
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		}
		
	};
}

SfCwbbSfpzmx.bind();