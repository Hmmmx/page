if (typeof window.SfWycxFcxxcx === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfWycxFcxxcxCntr';
	
	const mainTblClz = '.table-wgsf-wycx-fcxxcx';
	const filterFrmSelector = '#wgSfWycxFcxxcxCntr .filterbar>form[data-type=filter]';
	
	const loadingMask1 = '#wgSfWycxFcxxcxCntr';
	
	const me = window.SfWycxFcxxcx = {
		pager: null,
		filterData: null,
			
		bind: function() {
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.indicateFilter(cntrSelector, {expanded: true});
			$(`${cntrSelector} input[data-cx-ctrl=fcxx-tree]`).fcxxTree({ensureSqdm:true});
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
		
		dc: function(el) {
			if (me.filterData) {
				$.fileDownload(CxMisc.finalizeUrl('/wygl/sfxt/fccx/dcFcxx'), {
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
			if (me.filterData.slrqq && me.filterData.slrqz && me.filterData.slrqq>me.filterData.slrqz) {
				CxMsg.info('收楼日期的开始日期不能大于结束日期');
				return;
			}
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fccx/getFcxxCount'),
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
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fccx/getFcxx'),
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
				tmp.append(`<tr>
						<td class="td-indexer">
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td class="overflow-clip-left">${data[i].fcmc?CxMisc.escapeHtml(data[i].fcmc):''}</td>
						<td>${data[i].lcdm}</td>
						<td>${me.sshxmc(data[i].sshxdm)}</td>
						<td>${me.fcxzmc(data[i].fcxzdm)}</td>
						<td>${me.fclxmc(data[i].fclxdm)}</td>
						<td>${data[i].jzmj!==null?data[i].jzmj.toFixed(2):''}</td>
						<td>${data[i].tnmj!==null?data[i].tnmj.toFixed(2):''}</td>
						<td>${data[i].slrq?data[i].slrq:''}</td>
						<td>${me.slztmc(data[i].slzt)}</td>
						<td>${me.rzztmc(data[i].rzzt)}</td>
						<td>${me.zxztmc(data[i].zxzt)}</td>
						<td>${me.fcztmc(data[i].fczt)}</td>
						<td>${me.zlztmc(data[i].zlzt)}</td>
						<td>${me.csztmc(data[i].cszt)}</td>
					</tr>`);
			}
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		},
		
		slztmc: function(slzt) {
			switch(slzt) {
			case '0': return '未收楼';
			case '1': return '未收楼';
			}
			return '';
		},
		rzztmc: function(rzzt) {
			switch(rzzt) {
			case '0': return '未入住';
			case '1': return '已入住';
			}
			return '';
		},
		csztmc: function(cszt) {
			switch(cszt) {
			case '0': return '待售';
			case '1': return '已售';
			}
			return '';
		},
		fcztmc: function(fczt) {
			switch(fczt) {
			case '0': return '无效';
			case '1': return '有效';
			}
			return '';
		},
		zlztmc: function(zlzt) {
			switch(zlzt) {
			case '0': return '待租';
			case '1': return '已租';
			}
			return '';
		},
		zxztmc: function(zxzt) {
			switch(zxzt) {
			case '0': return '未装修';
			case '1': return '装修中';
			case '2': return '已装修'
			}
			return '';
		},
		czztmc: function(czzt) {
			switch(czzt) {
			case '0': return '不可租';
			case '1': return '可租';
			}
			return '';
		},
		
		sshxmc: function(sshxdm) {
			switch(sshxdm) {
			case '1': return '1室';
			case '2': return '2室';
			case '3': return '3室';
			case '4': return '4室';
			case '5': return '5室';
			case '6': return '5室以上';
			}
			return '';
		},
		fcxzmc: function(fcxzdm) {
			switch(fcxzdm) {
			case '1': return '商铺房';
			case '2': return '经济适用房';
			case '3': return '房改房';
			case '4': return '廉租房';
			case '5': return '周转房';
			case '6': return '人才房';
			case '7': return '公租房';
			case '8': return '其他';
			}
			return '';
		},
		fclxmc: function(fclxdm) {
			switch(fclxdm) {
			case '1': return '普通住宅';
			case '2': return '公寓';
			case '3': return '别墅';
			case '4': return '写字楼';
			case '5': return '商铺';
			/*case '6': return '小高层';
			case '7': return '高层';*/
			case '8': return '其他';
			}
			return '';
		}
	};
}

SfWycxFcxxcx.bind();