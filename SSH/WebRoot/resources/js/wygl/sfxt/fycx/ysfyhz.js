if (typeof window.SfCwbbYsfyhz === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfCwbbYsfyhzCntr';
	
	const mainTblClz = '.table-wgsf-cwbb-ysfyhz';
	const filterFrmSelector = '#wgSfCwbbYsfyhzCntr .filterbar>form[data-type=filter]';
	
	const loadingMask1 = '#wgSfCwbbYsfyhzCntr';
	
	const me = window.SfCwbbYsfyhz = {
		pager: null,
		filterData: null,
		hzxmList: null,
		sums: null,
		statusWatcher: 0,
			
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
			$(`${cntrSelector} div.date[data-cx-ctrl="date-month"]`).datetimepicker({
		        format: 'YYYY-MM',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			$(`${cntrSelector} .filterbar select[name=ztbj]`).change(function(){
				me.switchZtbj(this);
			});
			
			me.statusWatcher = window.setInterval(function(){ // 监视收款方式是否已下载完成（暂用该方式，之后考虑在标签中用配置事件方式实现）
				if (document.querySelector(`${cntrSelector} .filterbar select[name=skfsdm]`).getAttribute('data-loaded') == 'true') {
					$(`${cntrSelector} .filterbar select[name=ztbj]`).trigger('change');
					window.clearInterval(me.statusWatcher);
					me.statusWatcher = 0;
				}
			}, 400);
		},
		
		refresh: function() {
			if (me.pager) me.goto(me.pager.pagination("page"), me.pager.pagination("pageSize"));
		},
		
		switchZtbj: function(el){
			el.form.skfsdm.disabled = el.value != '1';
			if (el.value == '1') {
				$('#wgSfCwbbYsfyhz_skrqq_p').datetimepicker('enable');
				$('#wgSfCwbbYsfyhz_skrqz_p').datetimepicker('enable');
			} else {
				$('#wgSfCwbbYsfyhz_skrqq_p').datetimepicker('disable');
				$('#wgSfCwbbYsfyhz_skrqz_p').datetimepicker('disable');
			}
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
				let data = Object.assign({}, me.filterData);
				delete data.page;
				delete data.pageSize;
				$.fileDownload(CxMisc.finalizeUrl('/wygl/sfxt/fycx/dcSfhz'), {
	                httpMethod : 'GET',
	                data : data,
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
			//if (data.sfzdyq && data.sfzdyq.length == 7) data.sfzdyq += '-01';
			//if (data.sfzdyz && data.sfzdyz.length == 7)
			//	data.sfzdyz = moment(data.sfzdyz += '-01', 'YYYY-MM-DD').add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD');
			delete data.fczymc; // 选中的房产资源名称不需要作为参数
			me.filterData = data;
			if (me.filterData.jfzqq && me.filterData.jfzqz && me.filterData.jfzqq>me.filterData.jfzqz) {
				CxMsg.info('计费周期的开始日期不能大于结束日期');
				return;
			}
			if (me.filterData.ysrqq && me.filterData.ysrqz && me.filterData.ysrqq>me.filterData.ysrqz) {
				CxMsg.info('应收日期的开始日期不能大于结束日期');
				return;
			}
			if (me.filterData.sfzdyq && me.filterData.sfzdyz && me.filterData.sfzdyq>me.filterData.sfzdyz) {
				CxMsg.info('收费账单月的开始日期不能大于结束日期');
				return;
			}
			if (me.filterData.skrqq && me.filterData.skrqz && me.filterData.skrqq>me.filterData.skrqz) {
				CxMsg.info('收款日期的开始日期不能大于结束日期');
				return;
			}
			me.hzxmList = null; // 每次重置条件查询都把上一次的汇总项目列表清空
			me.sums = null;
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fycx/getSfhzCount'),
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
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fycx/getSfhz'),
			    type: "GET",
			    data: Object.assign(me.filterData, {page: page, pageSize: pageSize}),
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask1).mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		$(`${cntrSelector} ${mainTblClz} tbody>tr:not(.table-row-no-data)`).remove();
			    		if (res.data && res.data.hzfcList.length>0) me.render(page, pageSize, res.data);
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
			let hzfcList = data.hzfcList;
			
			if (page == 0) { //只需要在第一页时重新生成列标题
				me.hzxmList = data.hzxmList;
				$(`${cntrSelector} ${mainTblClz} thead>tr>th:nth-child(n+4)`).remove();
				for (let i=0; i<me.hzxmList.length; i++) {
					$(`${cntrSelector} ${mainTblClz} thead>tr`).append(`<th>${me.hzxmList[i].sfxmmc}</th>`);
				}
				$(`${cntrSelector} ${mainTblClz} thead>tr`).append(`<th>合计</th>`);
				
				me.sums = data.sums;
			}
			
			let tmp = $(`${cntrSelector} ${mainTblClz} tbody`);
			for (let i=0; i<hzfcList.length; i++) {
				let hzfc = hzfcList[i], fyje = [], subTotal = 0, khmc = CxMisc.escapeHtml(hzfc.khmc), khmcTitle=hzfc.khmc&&hzfc.khmc.length>7?` title="${khmc}"`:'';
				for (let j=0; j<me.hzxmList.length; j++) {
					fyje.push(`<td>${hzfc.fyje[me.hzxmList[j].sfxmdm]?hzfc.fyje[me.hzxmList[j].sfxmdm].toFixed(2):'0.00'}</td>`);
					if (hzfc.fyje[me.hzxmList[j].sfxmdm]) subTotal += hzfc.fyje[me.hzxmList[j].sfxmdm];
				}
				fyje.push(`<td>${subTotal.toFixed(2)}</td>`);
				tmp.append(`<tr>
						<td class="td-indexer">
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td class="overflow-clip-left">${CxMisc.escapeHtml(hzfc.fcmc)}</td>
						<td${khmcTitle}>${khmc}</td>
						${fyje.join('')}
					</tr>`);
			}
			
			if (me.sums) { //如果有所有房产合计
				let sums = [], total = 0;
				for (let j=0; j<me.hzxmList.length; j++) {
					let sum = me.sums.fyje[me.hzxmList[j].sfxmdm] ? me.sums.fyje[me.hzxmList[j].sfxmdm] : 0;
					sums.push(`<td>${sum ? sum.toFixed(2) : '0.00'}</td>`);
					if (sum) total += sum;
				}
				sums.push(`<td>${total.toFixed(2)}</td>`);
				tmp.append(`<tr>
						<td class="td-indexer">
    						<span>-</span>
						</td>
						<td>${me.sums.fcmc}</td><td></td>
						${sums.join('')}
					</tr>`);
			}
			
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
			
			if (page == 0) { //只需要在第一页时重新计算列宽度
				let ths = $(`${cntrSelector} ${mainTblClz} thead th`);
				for (let i=3; i<ths.length; i++){ // 计算并调整每个收费项目列的宽度
					if (ths[i].innerText.length >= 6) ths[i].style.width = `${ths[i].innerText.length+1}em`;
				}
				if ($(ths[1]).width() < 316) ths[1].style.width = '22em'; // 保证房产名称能全部显示
				$(`${cntrSelector} ${mainTblClz} tbody>tr.table-row-no-data td.table-empty`).attr('colspan', ths.length); // 重置空白行的colspan以适配实际列数
			}
		}
	};
}

SfCwbbYsfyhz.bind();