if (typeof window.SfCwbbYshz === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfCwbbYshzCntr';
	
	const filterFrmSelector = '#wgSfCwbbYshzCntr .filterbar>form[data-type=filter]';
	
	const loadingMask1 = '#wgSfCwbbYshzCntr';
	
	const me = window.SfCwbbYshz = {
		pager: null,
		filterData: null,
		hzxmList: null,
		sums: null,
			
		bind: function() {
			//CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.indicateFilter(cntrSelector, {expanded: true});
			
			$(`${cntrSelector} input[data-cx-ctrl=fcxx-tree]`).fcxxTree();
			//CxMisc.formValidated(filterFrmSelector, me.filter);
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
		},
		
		dc: function(el) {
			let f = document.querySelector(filterFrmSelector);
			if (!CxMisc.validate(f)) return;
			let data = $(f).serializeJson({removeBlankField:true}); // 每次查询后都缓存查询条件，给分页调用
			delete data.fczymc; // 选中的房产资源名称不需要作为参数
			me.filterData = data;
			//if (data.sfzdyq && data.sfzdyq.length == 7) data.sfzdyq += '-01';
			//if (data.sfzdyz && data.sfzdyz.length == 7)
			//	data.sfzdyz = moment(data.sfzdyz += '-01', 'YYYY-MM-DD').add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD');
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
			
			if (me.filterData) {
				let data1 = Object.assign({}, me.filterData);
				delete data1.page;
				delete data1.pageSize;
				$.fileDownload(CxMisc.finalizeUrl('/wygl/sfxt/fytj/dcSfpzhz'), {
	                httpMethod : 'GET',
	                data : data1,
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
		}
	};
}

SfCwbbYshz.bind();