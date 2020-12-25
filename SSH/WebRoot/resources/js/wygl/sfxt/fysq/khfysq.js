if (typeof window.SfScKhfysq === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfScKhfysqCntr';
	const treeSelector = '#wgSfScKhfysqCntr .tv-wrapper';
	const ysfyModalSelector = '#wgSfScKhsfsqYsfyModalDtls';
	const ysfyFrmSelector = '#wgSfScKhsfsqYsfyDtlsFrm';
	const ysfyQrModalSelector = '#wgSfScKhsfsqYsfyQrModalDtls';
	const ysfyQrFrmSelector = '#wgSfScKhsfsqYsfyQrDtlsFrm';
	const ysfyWyjModalSelector = '#wgSfScKhsfsqYsfyWyjModalDtls';
	const ysfyWyjFrmSelector = '#wgSfScKhsfsqYsfyWyjDtlsFrm';
	
	const ycxfyModalSelector = '#wgSfScKhsfsqYcxfyModalDtls';
	const ycxfyFrmSelector = '#wgSfScKhsfsqYcxfyDtlsFrm';
	
	const yskModalSelector = '#wgSfScKhsfsqYskModalDtls';
	const yskFrmSelector = '#wgSfScKhsfsqYskDtlsFrm';
	const yskmxModalSelector = '#wgSfScKhfysqYskmxModalDtls';
	const yskjzModalSelector = '#wgSfScKhsfsqYskjzModalDtls';
	const yskjzFrmSelector = '#wgSfScKhsfsqYskjzDtlsFrm';
	
	const yjModalSelector = '#wgSfScKhsfsqYjModalDtls';
	const yjFrmSelector = '#wgSfScKhsfsqYjDtlsFrm';
	const yjthModalSelector = '#wgSfScKhsfsqYjthModalDtls';
	const yjthFrmSelector = '#wgSfScKhsfsqYjthDtlsFrm';
	
	const ysfyWrapper = '#wgSfScKhfysq_ysfy';
	const ycxfyWrapper = '#wgSfScKhfysq_ycxfy';
	const yskWrapper = '#wgSfScKhfysq_ysk';
	const yskjzWrapper = '#wgSfScKhfysq_yskjz';
	const yjWrapper = '#wgSfScKhfysq_yj';
	
	const mainTblClz = '.table-wgsf-fy-khfysq';
	const idPrefix = 'wgSfScKhfysq';
	const sbrSelector = '#wgSfScKhfysqCntr .col-limited-lg';
	const ctxSelector = '#wgSfScKhfysqCntr .col-extended-lg';
	
	const filterFrmSelector = '#wgSfScKhfysqCntr .toolbar+.filterbar>form[data-type=filter]';
	const sfpzWrapper = '#wgSfScKhfysq_query';
	const sfpzFilterFrmSelector = '#wgSfScKhfysq_query .filterbar>form[data-type=filter]';
	const sfpzTblClz = '.table-wgsf-pz-khsfpz';
	const sfmxModalSelector = '#wgSfScKhfysqSfpzmxModalDtls';
	
	const printIframeSelector = '#wgSfScKhfysqCntr .cx-print-wrapper iframe';
	
	const loadingMask1 = '#wgSfScKhfysqCntr';
	const loadingMask2 = '#wgSfScKhfysqCntr .col-extended';
	
	const me = window.SfScKhfysq = {
		pagerQuery: null,
		pagerYskjz: null,
		filterDataQuery: null,
		filterDataYskjz: null,
			
		bind: function() {
			CxWg.loadFcxxTree(treeSelector, {nodeSelected: me.nodeSelected});
			
			$(cntrSelector).find('.toolbar button[data-cmd=open-add]').click(function(){
				let node = me.getSelectedNode();
				if (node && node.data.type == 'fc') me.openEdit('create', this, node);
				else CxMsg.info('请先从房产资源树中选择房产');
			});
			$(cntrSelector).find('.toolbar select[name=sfxmdm],.toolbar select[name=zhysfsylx]').change(function(){ // 
				let node = me.getSelectedNode();
				if (node) me._fetchYskjz(node, this.parentNode.querySelector('select[name=sfxmdm]'), this.parentNode.querySelector('select[name=zhysfsylx]'));
			}).click(function(){
				if (this.options.length == 0 || !me.getSelectedNode()) CxMsg.info('请先从左边房产资源树中选择目标项');
			});
			$(cntrSelector).find('.toolbar button[data-cmd=open-yskjz]').click(function(e){ // yskjz
				me.openYskjz(this, e);
			});
			$(cntrSelector).find('.toolbar button[data-cmd=confirm]').click(function(){ // ysfy
				me.openEditYsfyQr();
			});
			$(cntrSelector).find('.toolbar button[data-cmd=dy-ysfytz]').click(function(){ // ysfy
				me.dyYsfytz();
			});
			$(cntrSelector).find('.toolbar button[data-cmd=open-scwyj]').click(function(){ // ysfy
				me.openScWyj();
			});
			$(`${cntrSelector}`).find('.toolbar+.filterbar div.date[data-cx-ctrl="date-month"]').datetimepicker({
		        format: 'YYYY-MM', date: null // 必须设置为空，否则会自动选择当天日期
			});
			//$(`${cntrSelector}`).find('.toolbar+.filterbar select').change(function(){this.form.querySelector('button[type=submit]').click();});
			//$(`${cntrSelector}`).find('.toolbar+.filterbar input[type=text]').on('input', function(){this.form.querySelector('button[type=submit]').click();});
			CxMisc.indicateFilter(cntrSelector);
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.formValidated(filterFrmSelector, me.filterKhfy);
			
			CxMisc.bindCheckAll(cntrSelector);
			
			
			$(`${cntrSelector} ${mainTblClz}-ysfy thead .td-indexer input`).change(function(){ me.showSum4Ysfy(); });
			$(`${cntrSelector} ${mainTblClz}-ysfy thead th:nth-child(5)`).click(function(e){ me.showSumDtls4Ysfy(this, e); });
			$(`${ysfyModalSelector}`).find('select[name=fylxdm]').change(function(){
				me.loadJgSfxm2(this);
			});
			$(`${ysfyModalSelector}`).find('select[name=khid], select[name=sfxmdm]').change(function(){
				me.switchYsfySfxm(this);
			});
			$(`${ysfyModalSelector}`).find('select[name=sfbzid]').change(function(){
				me.switchYsfySfbz(this);
			});
			$(`${ysfyModalSelector}`).find('input[name=jfzqq], input[name=jfzqz]').on('input', function(){
				me.inputYsfyJfzq(this);
			});
			$(`${ysfyModalSelector}`).find('div.date[data-cx-ctrl="date-month"]').datetimepicker({
		        format: 'YYYY-MM', date: null // 必须设置为空，否则会自动选择当天日期
			});
			$(`${ysfyModalSelector}`).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD', date: null // 必须设置为空，否则会自动选择当天日期
			});
			CxMisc.formValidated(ysfyFrmSelector, function(f){ me.submitYsfy(f); });
			
			$(`${ysfyQrModalSelector}`).find('div.date[data-cx-ctrl="date"]').datetimepicker({
		        format: 'YYYY-MM-DD', date: null // 必须设置为空，否则会自动选择当天日期
			});
			CxMisc.formValidated(ysfyQrFrmSelector, function(f){ me.submitYsfyQr(f); });
			
			$(`${ysfyWyjModalSelector} input[data-cx-ctrl="fcxx-tree"]`).fcxxTree({ensureSqdm: true});
			$(`${ysfyWyjModalSelector}`).find('div.date[data-cx-ctrl="date"]').datetimepicker({
		        format: 'YYYY-MM-DD', date: null // 必须设置为空，否则会自动选择当天日期
			});
			CxMisc.formValidated(ysfyWyjFrmSelector, function(f){ me.submitYsfyWyj(f); });
			
			
			$(`${ycxfyModalSelector}`).find('select[name=sfxmdm]').change(function(){
				$(this).closest('tr').find('select[name=sklxdm]').val('').trigger('change');
			});
			$(`${ycxfyModalSelector}`).find('select[name=sklxdm]').change(function(){
				me.switchYcxfySklx(this);
			});
			$(`${ycxfyModalSelector}`).find('input[name=dj],input[name=sl]').on('input', function(){
				me.calcYcxfySklx(this);
			});
			$(`${ycxfyModalSelector}`).find('.dl-item-cmd button').click(function(){
				if ($(this).data('cmd') == 'plus') me.plusYcxfySklx(this);
				else me.minusYcxfySklx(this);
			});
			$(`${ycxfyModalSelector}`).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD', date: null
			});
			CxMisc.formValidated(ycxfyFrmSelector, function(f){ me.submitYcxfy(f); });
			
			
			$(`${yskModalSelector}`).find('select[name=khid]').change(function(){ // 选择客户时，全部收费项目都要分别重新查询
				$(this).closest('form').find('table.table-wgsf-fy-khfysq-ysk-add select[name=sfxmdm]').each(function(){
					me.switchYskSfxm(this);
				}); 
			});
			$(`${yskModalSelector}`).find('div.date[data-cx-ctrl="date"]').datetimepicker({
		        format: 'YYYY-MM-DD', date: null
			});
			me.subBindYsk($(`${yskModalSelector} .table-wgsf-fy-khfysq-ysk-add>tbody>tr`)); //绑定默认的第一行事件
			CxMisc.formValidated(yskFrmSelector, function(f){ me.submitYsk(f); });
			
			
			$(`${yskjzModalSelector}`).find('div.date[data-cx-ctrl="date"]').datetimepicker({
		        format: 'YYYY-MM-DD', date: null
			});
			CxMisc.formValidated(yskjzFrmSelector, function(f){ me.submitYskjz(f); });
			
			
			$(`${yjModalSelector}`).find('select[name=yjlxdm]').change(function(){
				let yjlxdm = this.value;
				if (yjlxdm) {
					let sqdm = me.getAncestor(me.getSelectedNode(), 'sq').data.dm, self = this;
					Promise.all([SfScKhfysqYj.getJgyjlxDj(sqdm, yjlxdm)]).then(function ([yjlxdj]) {
						let dj = '';
						if (yjlxdj) {
							let tmp = typeof yjlxdj === 'object' ? yjlxdj : JSON.parse(yjlxdj);
							if (tmp.generic) dj = tmp.generic;
						}
						$(self).closest('tr').find('input[name=sqje]').val(dj);
					}).catch(function(err){
						CxMsg.error('遇到异常: ' + err.message);
					});
				}
			});
			$(`${yjModalSelector}`).find('.dl-item-cmd button').click(function(){
				if ($(this).data('cmd') == 'plus') me.plusYjSklx(this);
				else me.minusYjSklx(this);
			});
			$(`${yjModalSelector},${yjthModalSelector}`).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD', date: null // 必须设置为空，否则会自动选择当天日期
			});
			CxMisc.formValidated(yjFrmSelector, function(f){ me.submitYj(f); });
			CxMisc.formValidated(yjthFrmSelector, function(f){ me.submitYjth(f); });
			
			
			$(`${cntrSelector} .main-content .nav-tabs a[data-toggle=tab]`).on('shown.bs.tab', function (e) {
				me.tabOpened(e.target);
			});
			$(`${cntrSelector} .main-content .nav-tabs a[data-category=ysfy]`).click(); // 默认打开应收费用
			
			
			$('div.modal').find('input[name=print],input[name=dylx]').change(function(){ me.updatePrintCfg(this); });
			$('div.modal').on('show.bs.modal', function (e) { me.initPrintCfg(this); })
			$(`${ysfyModalSelector},${ysfyQrModalSelector},${ycxfyModalSelector},${yskModalSelector},${yjModalSelector},${yjthModalSelector}`).on('show.bs.modal', function (e) { me.lazyLoad(this); })
				.on('hide.bs.modal', function (e) { $(this).find('.modal-body').scrollTop(0); });
			$(`${ysfyModalSelector},${ysfyQrModalSelector},${ysfyWyjModalSelector},${ycxfyModalSelector},${yskModalSelector},${yskjzModalSelector},${yjModalSelector},${yjthModalSelector}`).on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
		subBindYsk: function(tr) {
			$(tr).find('select[name=sfxmdm]').change(function(){
				me.switchYskSfxm(this);
			});
			$(tr).find('input[name=yfs]').on('input', function(){
				me.calcYskYfs(this);
			});
			$(tr).find('input[name=yfse]').on('input', function(){
				me.switchYskYfse(this);
			});
			/*$(tr).find('input[name=fse]').on('input', function(){
				me.switchYskFse(this);
			});*/
			$(tr).find('.dl-item-cmd button').click(function(){
				if ($(this).data('cmd') == 'plus') me.plusYskSfxm(this);
				else me.minusYskSfxm(this);
			});
			$(tr).find('div.date[data-cx-ctrl="date-month"]').datetimepicker({
		        format: 'YYYY-MM', date: null
			}).on('change.datetimepicker', function(){ me.switchYskYsr(this); });
		},
		
		refresh: function(){
			let node = me.getSelectedNode();
			if (node) {
				let tab = $(`${cntrSelector} .main-content .nav-tabs a.active[data-toggle=tab]`);
				let category = tab.attr('data-category');
				
				if (category == 'yskjz') { // 预收款结转有分页，刷新当前页
					CxMisc.resetCheckAll(cntrSelector);
					if (me.pagerYskjz) me.gotoYskjz(me.pagerYskjz.pagination("page"), me.pagerYskjz.pagination("pageSize"));
				} else if (category == 'query') { // 已有凭证有分页，刷新当前页
					CxMisc.resetCheckAll(cntrSelector);
					if (me.pagerQuery && me.pagerQuery.pagination("records")) me.goto(me.pagerQuery.pagination("page"), me.pagerQuery.pagination("pageSize"));
				} else me.fetch(node, category);
			}
		},
		
		showSum4Ysfy: function() {
			let sum = 0, itemChecked = 0;
			$(`${cntrSelector} ${mainTblClz}-ysfy tbody td.td-indexer input`).each(function(){
				if (this.checked) {
					itemChecked++;
					sum += $(this).closest('tr').data('json').fyje;
				};
			});
			let fyjeHdr = $(`${cntrSelector} ${mainTblClz}-ysfy thead th:nth-child(5)`); //第5列是应收金额
			if (itemChecked > 0) {
				if (!fyjeHdr.attr('data-title')) fyjeHdr.attr('data-title', fyjeHdr.text());
				fyjeHdr.html(fyjeHdr.attr('data-title') + '：<span class="text-danger" style="text-decoration:underline;cursor:pointer;">' + sum.toFixed(2)) + '</span>';
			} else {
				if (fyjeHdr.attr('data-title')) fyjeHdr.text(fyjeHdr.attr('data-title'));
			}
		},
		showSumDtls4Ysfy: function(el, e){
			let sum = 0, sum1=0, sum2=0, sum3={}, itemChecked = 0;
			$(`${cntrSelector} ${mainTblClz}-ysfy tbody td.td-indexer input`).each(function(){
				if (this.checked) {
					itemChecked++;
					let data = $(this).closest('tr').data('json');
					sum += data.fyje;
					if (data.fyfldm =='2') sum2 += data.fyje;
					else sum1 += data.fyje;
					if (!sum3[data.sfxmdm]) sum3[data.sfxmdm] = {sfxmdm: data.sfxmdm, sfxmmc: data.sfxmmc, fyje: data.fyje};
					else sum3[data.sfxmdm].fyje += data.fyje;
				};
			});
			
			if (itemChecked > 0) {
				let sfxms = [];
				for (let dm in sum3) {
					sfxms.push(`<span class="d-flex-between"><span>${sum3[dm].sfxmmc}</span><span>${sum3[dm].fyje.toFixed(2)}</span></span>`);
				}
				let m = `<div class="w-100">
						<span class="d-flex-between mb-2"><span>应收费用总金额</span><span>${sum.toFixed(2)}</span></span>
						<span class="d-flex-between"><span>正常费用</span><span>${sum1.toFixed(2)}</span></span>
						<span class="d-flex-between"><span>违约金</span><span>${sum2.toFixed(2)}</span></span>
						<hr>
						${sfxms.join('')}
					</div>`;
				CxCtrl.alert(m, {
			    	evt: e,
			    	src: el,
			    	placement: 'right'
			    });
			}
		},
		
		initPrintCfg: function(m) {
			if (m && m.querySelector('input[name=print]')) 
				m.querySelector('input[name=print]').checked = $.cookie('printReceipt') == 'true';
			if (m && m.querySelector('input[name=dylx]')) {
				let dylx = $.cookie("dylxReceipt");
				CxMisc.selectRadio('dylx', dylx?dylx:'0', m.querySelector('input[name=dylx]').form);
			}
		},
		updatePrintCfg: function(el) {
			if (el.name == 'print') $.cookie("printReceipt", el.checked, {"expires": 3650});
			if (el.name == 'dylx') $.cookie("dylxReceipt", el.value, {"expires": 3650}); // 暂只应用在应收费用
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
				    	$(loadingMask2).mask('show');
				    },
				    success: function(res, ts) {resolve(res);},
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('载入失败：' + msg);
				    	reject(new Error('载入失败：' + msg));
				    },
				    complete: function(xhr, ts) {
				    	$(loadingMask2).mask('hide');
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
				    	$(loadingMask2).mask('show');
				    },
				    success: function(res, ts) {resolve(res.data);},
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('载入失败：' + msg);
				    	reject(new Error('载入失败：' + msg));
				    },
				    complete: function(xhr, ts) {
				    	$(loadingMask2).mask('hide');
				    }
				});
			});
		},
		
		clearStatus: function() { // 需要重新载入的数据，清除已存在的数据与状态
			let el = document.querySelector(`${ysfyFrmSelector} select[name=khid]`); // 客户状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
			
			el = document.querySelector(`${filterFrmSelector} select[name=sfxmdm]`);
			let node = me.getSelectedNode();
			if (node && el.getAttribute('data-sqdm') != me.getAncestor(me.getSelectedNode(), 'sq').data.dm) {
				el.removeAttribute('data-loaded');
				el.removeAttribute('data-sqdm');
				el.selectedIndex = 0;
				for (let i=el.options.length-1; i>=0; i--) el.remove(i);
				$(el).trigger('change');
			}
			
			el = document.querySelector(`${ycxfyFrmSelector} select[name=khid]`); // 客户状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
			el = document.querySelector(`${ycxfyFrmSelector} select[name=sfxmdm]`);
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i);
			
			el = document.querySelector(`${yskFrmSelector} select[name=khid]`); // 客户状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
			el = document.querySelector(`${yskFrmSelector} select[name=sfxmdm]`);
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i);
			
			el = document.querySelector(`${yjFrmSelector} select[name=khid]`); // 客户状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
		},
		
		minusYcxfySklx: function(el) {
			if ($(el).closest('tbody').children('tr').length == 1) CxMsg.info('不能删除最后一个收费项目');
			else {
				let p = $(el).closest('tbody');
				$(el).closest('tr').remove();
				let trs = p.children(), i=1;
				trs.each(function(){ $(this).children('td.td-indexer').children('span').text(i); i++ });
			}
		},
		
		plusYcxfySklx: function(el) {
			let tr = $(el).closest('tr'), ctr = tr.clone(true);
			ctr.insertAfter(tr);
			ctr.find('select[name=sfxmdm],select[name=sklxdm]').each(function(){ this.selectedIndex = 0; });
			ctr.find('input[name=dj],input[name=sl],input[name=sfje]').each(function(){ this.value = ''; });
			let trs = tr.parent().children(), i=1;
			trs.each(function(){ $(this).children('td.td-indexer').children('span').text(i); i++ });
		},
		
		minusYskSfxm: function(el) {
			if ($(el).closest('tbody').children('tr').length == 1) CxMsg.info('不能删除最后一个收费项目');
			else {
				let p = $(el).closest('tbody');
				$(el).closest('tr').remove();
				let trs = p.children(), i=1;
				trs.each(function(){ $(this).children('td.td-indexer').children('span').text(i); i++ });
			}
		},
		
		plusYskSfxm: function(el) {
			/*let tr = $(el).closest('tr'), ctr = tr.clone(true);
			ctr.insertAfter(tr);
			ctr.find('select[name=sfxmdm],select[name=sklxdm]').each(function(){ this.selectedIndex = 0; });
			ctr.find('input[name=yfs],input[name=qye],input[name=fse],input[name=hye]').each(function(){ this.value = ''; });
			ctr.find('div.date[data-cx-ctrl=date-month]').datetimepicker('clear');*/
			if (el.form.cmd.value != 'append') {
				let tr = $(el).closest('tr'), tbody = tr.parent(), time = (new Date()).getTime();
				let html = tr[0].outerHTML.replace(/"(#?wgSfScKhsfsqYsk_ysr(?:q|z)_p).*?"/g, '"$1_'+time+'"'); //修改日期控件的id值
				html = html.replace(/data-current-sfxmdm-je=".*?"/, '');
				tbody.append(html);
				me.subBindYsk(tbody.children('tr:last-child'));
				let trs = tr.parent().children(), i=1;
				trs.each(function(){ $(this).children('td.td-indexer').children('span').text(i); i++ });
			} else CxMsg.info('对已有的预收款不能添加新的收款项目');
		},
		
		minusYjSklx: function(el) {
			if ($(el).closest('tbody').children('tr').length == 1) CxMsg.info('不能删除最后一个收费项目');
			else {
				let p = $(el).closest('tbody');
				$(el).closest('tr').remove();
				let trs = p.children(), i=1;
				trs.each(function(){ $(this).children('td.td-indexer').children('span').text(i); i++ });
			}
		},
		
		plusYjSklx: function(el) {
			let tr = $(el).closest('tr'), ctr = tr.clone(true);
			ctr.insertAfter(tr);
			ctr.find('select[name=yjlxdm]').each(function(){ this.selectedIndex = 0; });
			ctr.find('input[name=sqje]').each(function(){ this.value = ''; });
			let trs = tr.parent().children(), i=1;
			trs.each(function(){ $(this).children('td.td-indexer').children('span').text(i); i++ });
		},
		
		calcYcxfySklx: function(el) {
			let target = $(el), tr = target.closest('tr'), sfje = tr.find('input[name=sfje]')[0];
			if (target.is(':valid')) {
				let sklx = tr.find('select[name=sklxdm]')[0], 
					dj = tr.find('input[name=dj]')[0], sl = tr.find('input[name=sl]')[0];
				if (sklx.value != '01') {// 01 按金额
					if (dj.value != "" && sl.value != '') 
						sfje.value = (parseFloat(dj.value)*parseFloat(sl.value)).toFixed(2);
					else 
						sfje.value = '';
				}
				target.removeClass('is-invalid');
			} else {
				sfje.value = '';
				target.addClass('is-invalid');
			}
		},
		
		switchYsfySfxm: function(src) {
			let f = src.form, sfbz = f.sfbzid, fylxdm = f.fylxdm, sfxmdm = f.sfxmdm, khid = f.khid;
			for (let i=sfbz.options.length-1; i>0; i--) sfbz.remove(i);
			if (fylxdm.value != '' && sfxmdm.value != '' && khid.value != '') {
				let data = {sqdm: me.getAncestor(me.getSelectedNode(), 'sq').data.dm, sfxmdm:sfxmdm.value, fcid: f.fcid.value, khid: khid.value, fylxdm:fylxdm.value};
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfbzBySfxmdm'),
		            type: "GET",
		            data: data,
		            beforeSend: function(xhr, cfg) {
		            	sfbz.disabled = true;
		            	sfxmdm.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) {
		            				sfbz.options.add(new Option(res.data[i].sfbzmc, res.data[i].sfbzid));
		            			}
		            		}
		            		if (sfbz.getAttribute('data-selected-value')) {
	        					$(sfbz).val(sfbz.getAttribute('data-selected-value')).removeAttr('data-selected-value');
	        					if (sfbz.selectedIndex == -1) sfbz.selectedIndex = 0;
	        					$(sfbz).trigger('change');
	        				}
		            	}
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取收费标准列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	sfbz.disabled = false;
		            	sfxmdm.disabled = false;
		            }
		        });
			}
		},
		
		switchYsfySfbz: function(el) {
			let f = el.form;
			if (f.sfbzid.value != '' && f.khid.value != '' && f.fylxdm.value != '') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/sfbz/getSfbzje'),
		            type: "GET",
		            data: {fcid: f.fcid.value, khid: f.khid.value, fylxdm: f.fylxdm.value, sfbzid:f.sfbzid.value},
		            beforeSend: function(xhr, cfg) {
		            	f.khid.disabled = true;
		            	f.sfbzid.disabled = true;
		            	f.sfxmdm.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		f.sfbzid.setAttribute('data-current-sfbzid-je', res.data); //保存当前sfbzid单位金额
		            		if (f.jfzqq.value != '' && f.jfzqz.value != '') {
		            			let s = moment(f.jfzqq.value, 'YYYY-MM-DD'), e = moment(f.jfzqz.value, 'YYYY-MM-DD');
		            			if (!e.isBefore(s)) { // 20200524: 修改计费周期以下限制
			            			let monthDiff = CxMisc.monthDiff(s, e), sfbzidJe = res.data;
			            			if (monthDiff.sameMonth) {
			            				if (monthDiff.intValue == 1)
			            					f.fyje.value = sfbzidJe;
			            				else
			            					f.fyje.value = (sfbzidJe * monthDiff.days / s.daysInMonth()).toFixed(2);
			            			} else {
			            				if (f.sfxmdm.value == '12' ||f.sfxmdm.value == '13' ||f.sfxmdm.value == '14' || f.sfxmdm.value == '15') {
			            					if (monthDiff.intValue == monthDiff.doubleValue) {
			            						f.fyje.value = (sfbzidJe*monthDiff.intValue).toFixed(2);
			            					} else if (monthDiff.intValue) {
			            						let m1 =  (s.daysInMonth() - s.date() +1) / s.daysInMonth(),
				        							m2 =  e.date() / e.daysInMonth();
			            						f.fyje.value = ((m1 + monthDiff.inlineMonths + m2)*sfbzidJe).toFixed(2);
			            					}
			            				} else {
				            				f.fyje.value = '';
					            			CxMsg.info(f.sfxmdm.options[f.sfxmdm.selectedIndex].text+'计费周期起与计费周期止必须是同一个月');
				            			}
			            			}
		            			} else {
	        						f.fyje.value = '';
	        						CxMsg.info('计费周期结束日期不能小于开始日期');
	        					}
		            		}
		            	}
		            },
		            complete: function(xhr, ts) {
		            	f.khid.disabled = false;
		            	f.sfbzid.disabled = false;
		            	f.sfxmdm.disabled = false;
		            }
		        });
			}
			if (f.sfbzid.value == '') f.sfbzid.removeAttribute('data-current-sfbzid-je');
		},
		
		inputYsfyJfzq: function(el) {
			let f = el.form, jfzqq = f.jfzqq.value, jfzqz = f.jfzqz.value, sfbzidJe = parseFloat(f.sfbzid.getAttribute('data-current-sfbzid-je'));
			if (jfzqq != '' && jfzqz != '' && sfbzidJe) {
    			let s = moment(jfzqq, 'YYYY-MM-DD'), e = moment(jfzqz, 'YYYY-MM-DD');
    			if (!e.isBefore(s)) { // 20200524: 修改计费周期以下限制
    				let monthDiff = CxMisc.monthDiff(s, e);
    				if (monthDiff.sameMonth) {
    					if (monthDiff.intValue == 1)
    						f.fyje.value = sfbzidJe;
    					else
    						f.fyje.value = (sfbzidJe * monthDiff.days / s.daysInMonth()).toFixed(2);
    				} else {
    					if (f.sfxmdm.value == '12' || f.sfxmdm.value == '13' ||f.sfxmdm.value == '14' ||f.sfxmdm.value == '15') {
	    					if (monthDiff.intValue == monthDiff.doubleValue) {
	    						f.fyje.value = (sfbzidJe*monthDiff.intValue).toFixed(2);
	    					} else if (monthDiff.intValue) {
	    						let m1 =  (s.daysInMonth() - s.date() +1) / s.daysInMonth(),
									m2 =  e.date() / e.daysInMonth();
	    						f.fyje.value = ((m1 + monthDiff.inlineMonths + m2)*sfbzidJe).toFixed(2);
	    					}
    					} else {
            				f.fyje.value = '';
	            			CxMsg.info(f.sfxmdm.options[f.sfxmdm.selectedIndex].text+'计费周期起与计费周期止必须是同一个月');
            			}
    				}
    			} else {
					f.fyje.value = '';
					CxMsg.info('计费周期结束日期不能小于开始日期');
				}
			}
		},
		
		switchYskSfxm: function(el) {
			let f = el.form, disabled = el.value == '';
			let tr = $(el).closest('tr'), yfs = tr.find('input[name=yfs]')[0], 
				ysrq = tr.find('input[name=ysrq]')[0], ysrz = tr.find('input[name=ysrz]')[0],
				yfse = tr.find('input[name=yfse]')[0], fse = tr.find('input[name=fse]')[0];
			
			yfs.disabled = disabled;
			yfse.disabled = disabled;
			fse.disabled = disabled;
			fse.readOnly = true;
			$(ysrq).closest('.date').datetimepicker(disabled?'disable':'enable');
			$(ysrz).closest('.date').datetimepicker(disabled?'disable':'enable');
			
			if (ysrq.value == '') $(ysrq).closest('.date').datetimepicker('date', moment(new Date()).add(1, 'months'));
			if (el.value != '' && (f.khid.value != '' || f.khid.getAttribute('data-selected-value'))) {
				let data = {
					fcid: f.fcid.value, 
					khid: f.khid.value ? f.khid.value : f.khid.getAttribute('data-selected-value'), 
					sqdm: me.getAncestor(me.getSelectedNode(), 'sq').data.dm, 
					sfxmdm:el.value
				};
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/sfbz/getSfxmje'),
		            type: "GET",
		            data: data,
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		el.setAttribute('data-current-sfxmdm-je', res.data); //保存当前sfxmdm单位金额
		            		me._calcFse(el);
		            	} else CxMsg.error('查询收费项目收费信息失败：' + res.message);
		            },
		            error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('查询收费项目收费信息失败：' + msg);
				    },
		            complete: function(xhr, ts) {
		            	if (el.form.cmd.value != 'append') el.disabled = false; // 已有的预收款基础上添加存入， 只有在原来的项目上添加不能改变项目
		            	else el.disabled = true;
		            }
		        });
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/fy/getYskZk'),
		            type: "GET",
		            data: data,
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		el.setAttribute('data-current-sfxmdm-zk', JSON.stringify(res.data)); //保存当前sfxmdm单位折扣
		            		if (res.data && res.data.length>0) {
		            			yfs.required = true;
		            			ysrq.required = true;
		            			ysrz.required = true;
		            		} else {
		            			yfs.required = false;
		            			ysrq.required = false;
		            			ysrz.required = false;
		            		}
		            		me._calcFse(el);
		            	} else CxMsg.error('查询收费项目折扣信息失败：' + res.message);
		            },
		            error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('查询收费项目折扣信息失败：' + msg);
				    },
		            complete: function(xhr, ts) {
		            	if (el.form.cmd.value != 'append') el.disabled = false; // 已有的预收款基础上添加存入， 只有在原来的项目上添加不能改变项目
		            	else el.disabled = true;
		            }
		        });
			}
		},
		_calcFse: function(sfxmdm){
			let tr = $(sfxmdm).closest('tr'), yfs = tr.find('input[name=yfs]')[0], zkTxt = tr.find('[data-ysk-zk=Y]')[0],
				yfse = tr.find('input[name=yfse]')[0], zk = tr.find('input[name=zk]')[0], fse = tr.find('input[name=fse]')[0];
			let yfs1 = parseInt(yfs.value);
    		if (yfs1 && sfxmdm.getAttribute('data-current-sfxmdm-je') && sfxmdm.getAttribute('data-current-sfxmdm-zk')) {
    			let sfxmdmJe = parseFloat(sfxmdm.getAttribute('data-current-sfxmdm-je')),
    				sfxmdmZk = JSON.parse(sfxmdm.getAttribute('data-current-sfxmdm-zk'));
    			if (sfxmdmJe && sfxmdmZk !== null) {
    				let zk1 = 1;
    				for (let i=0; i<sfxmdmZk.length; i++) {
    					if (sfxmdmZk[i].sfxmdm == sfxmdm.value && yfs1>=sfxmdmZk[i].ysys && zk1>sfxmdmZk[i].zk) {
    						zk1 = sfxmdmZk[i].zk;
    					}
    				}
    				yfse.value = (yfs1 * sfxmdmJe).toFixed(2);
    				yfse.readOnly = zk1<1;
    				zk.value = zk1;
    				zkTxt.innerText = zk1==1 ? '-' : (zk1*10).toFixed(1);
    				fse.value = ((yfs1 * sfxmdmJe) * zk1).toFixed(2);
    			} else {
    				yfse.value = 0;
    				yfse.readOnly = false;
    				zk.value = 1;
    				zkTxt.innerText = '-';
        			fse.value = 0;
    			}
    		} else {
    			yfse.value = 0;
    			yfse.readOnly = false;
				zk.value = 1;
				zkTxt.innerText = '-';
    			fse.value = 0;
    		}
		},
		
		calcYskYfs: function(el) {
			let f = el.form;
			let tr = $(el).closest('tr'), yfs = tr.find('input[name=yfs]')[0], 
				ysrq = tr.find('input[name=ysrq]')[0], ysrz = tr.find('input[name=ysrz]')[0],
				fse = tr.find('input[name=fse]')[0];
			if (yfs.value != '' && ysrq.value != '') {
				try {
					let ysrq1 = moment(ysrq.value+'-01', 'YYYY-MM-DD');
					yfs1 = parseInt(yfs.value);
					$(ysrz).closest('.date').datetimepicker('date', ysrq1.add(yfs1-1, 'months')); //会触发wgSfScKhsfsqYsk_ysrz_p change事件
				} catch(err){}
			}
		},
		switchYskYfse: function(el) {
			let tr = $(el).closest('tr'), 
				yfse = tr.find('input[name=yfse]')[0], fse = tr.find('input[name=fse]')[0];
			fse.value = yfse.value;
		},
		switchYskYsr: function(el) {
			let f = $(el).closest('form')[0];
			let tr = $(el).closest('tr'), yfs = tr.find('input[name=yfs]')[0], sfxmdm = tr.find('select[name=sfxmdm]')[0], 
				ysrq = tr.find('input[name=ysrq]')[0], ysrz = tr.find('input[name=ysrz]')[0],
				fse = tr.find('input[name=fse]')[0];
			if (ysrq.value != '' && ysrz.value != '') {
				try {
					let ysrq1 = moment(ysrq.value+'-01', 'YYYY-MM-DD'), ysrz1 = moment(ysrz.value+'-01', 'YYYY-MM-DD');
					let currMonth = ysrq1.startOf('month'), n=0;
					while (currMonth <= ysrz1) {
						n++;
						currMonth = currMonth.add(1, 'months');
					}
					yfs.value = n;
					me._calcFse(sfxmdm);
					$(fse).trigger('input');
				} catch (err) {}
			}
		},
		/*switchYskFse: function(el) {
			if (el.value == '') {
				el.form.hye.value = el.form.qye.value;
			} else {
				let hye = parseFloat(el.value), qye = parseFloat(el.form.qye.value);
				el.form.hye.value = hye + qye;
			}
		},*/
		
		switchYcxfySklx: function(el) {
			let tr = $(el).closest('tr'), dj = tr.find('input[name=dj]')[0], sl = tr.find('input[name=sl]')[0], sfje = tr.find('input[name=sfje]')[0];
			if (el.value == '01') {// 01 按金额
				dj.disabled = true;
				dj.value = '';
				sl.disabled = true;
				sl.value = '';
				sfje.disabled = false;
			} else {
				dj.disabled = false;
				sl.disabled = false;
				sfje.disabled = true;
				
				let sfxmdm = tr.find('select[name=sfxmdm]'), table = tr.closest('table');
				if (sfxmdm[0].value) {
					if (el.value) {
						if (!table.data('fcxx')) {
							Promise.all([SfScKhfysqZhxx.p_getFcxx(sfxmdm[0].form.fcid.value)]).then(function ([fcxx]) {
								if (fcxx) {
									let json = sfxmdm.data('json'), djCfg=null;
									for (let i=0; i<json.length; i++) {
										if (json[i].sfxmdm == sfxmdm[0].value) {
											djCfg = json[i].djconfig;
											break;
										}
									}
									if (djCfg) {
										let cfg = JSON.parse(djCfg), a = null;
										if (cfg.fclxdm && fcxx.fclxdm && cfg.fclxdm[fcxx.fclxdm]) a = cfg.fclxdm[fcxx.fclxdm];
										if (!a) a = cfg.generic;
										dj.value = a;
									} else dj.value = '';
									if (el.value == '03') sl.value = fcxx.jzmj;
									else sl.value = '';
									$(sl).trigger('input');
									table.data('fcxx', fcxx);
								}
							}).catch(function(err){
								CxMsg.error('遇到异常: ' + err.message);
							});
						} else {
							let fcxx = table.data('fcxx'), json = sfxmdm.data('json'), djCfg=null;
							for (let i=0; i<json.length; i++) {
								if (json[i].sfxmdm == sfxmdm[0].value) {
									djCfg = json[i].djconfig;
									break;
								}
							}
							if (djCfg) {
								let cfg = JSON.parse(djCfg), a = null;
								if (cfg.fclxdm && fcxx.fclxdm && cfg.fclxdm[fcxx.fclxdm]) a = cfg.fclxdm[fcxx.fclxdm];
								if (!a) a = cfg.generic;
								dj.value = a;
							} else dj.value = '';
							if (el.value == '03') sl.value = fcxx.jzmj;
							else sl.value = '';
							$(sl).trigger('input');
						}
					} else {
						dj.value = '';
						sl.value = '';
						$(sl).trigger('input');
					}
				}
			}
		},
		
		tabOpened: function(tab){
			let category = tab.getAttribute('data-category');
			CxWg.selectableFcxxTree(treeSelector, category=='yskjz'); // 只有预付款结转才可以选中非房间节点, 先在查询前执行，否则可能导致不必要和查询 
			$(cntrSelector).find('.toolbar>div>button:not(.d-none),.toolbar>div>label:not(.d-none),.toolbar>div>select:not(.d-none),.toolbar>div>.btn-group:not(.d-none)').each(function(){ if ($(this).data('category') != 'generic') $(this).addClass('d-none'); });
			$(cntrSelector).find(`.toolbar>div>button[data-category=${category}],.toolbar>div>label[data-category=${category}],.toolbar>div>select[data-category=${category}],.toolbar>div>.btn-group[data-category=${category}]`).removeClass('d-none');
			
			let fb = $(`${cntrSelector} .toolbar`).next('.filterbar');
			if (category == 'ysfy') { // 应收费用
				fb.find('input,select').each(function(){ this.disabled = false; }); //暂时只有应收费用才能筛选
				if (fb.data('is-visible') && !fb.is(':visible')) {
					$(`${cntrSelector} .toolbar .btn-group[data-category=ysfy] a[data-cmd=toggle-filterbar]`).click();
				}
				fb.removeData('is-visible');
			} else {
				fb.find('input,select').each(function(){ this.disabled = true; });
				if (fb.data('is-visible') === undefined) fb.data('is-visible', fb.is(':visible')); // 打开其他tab时，记住应收费用的filterbar是否已打开
				if (fb.data('is-visible') && fb.is(':visible')) 
					$(`${cntrSelector} .toolbar .btn-group[data-category=ysfy] a[data-cmd=toggle-filterbar]`).click();
			}
			
			if (category == 'zhxx') { //重新计算综合信息tab内容的高度
				if (fb.is(':visible')) {
					let h1 = fb.outerHeight(true) + ($('#wgSfScKhfysq_zhxx').innerWidth() - $('#wgSfScKhfysq_zhxx').width()); // 加上距离底边的空白
					$('#wgSfScKhfysq_zhxx').css({'max-height': `calc(100vh - 200px - ${h1}px)`});
				} else $('#wgSfScKhfysq_zhxx').css({'max-height': 'calc(100vh - 200px)'});
			}
			
			me.fetch(me.getSelectedNode(), category);
		},
		
		filterKhfy: function(){
			me.fetch(me.getSelectedNode(), $(`${cntrSelector} .main-content .nav-tabs a.active[data-toggle=tab]`).data('category'));
		},
		
		fetch: function(node, category) {
			if (node) {
				CxMisc.resetCheckAll(cntrSelector);
				
				if (node.data.type == 'fc') {
					switch(category) {
					case 'ysfy': me.fetchYsfy(node); break;
					case 'ycxfy': me.fetchYcxfy(node); break;
					case 'ysk': me.fetchYsk(node); break;
					case 'yskjz': me.fetchYskjz(node); break;
					case 'yj': me.fetchYj(node); break;
					case 'query': me.fetchSfpz(node); break; // 收费凭证查询
					case 'zhxx': SfScKhfysqZhxx.fetchZhxx(node);
					default:break;
					}
				} else if (category == 'yskjz') {
					me.fetchYskjz(node);
				}
			}
		},
		fetchSfpz: function(node) {
			let f = document.querySelector(sfpzFilterFrmSelector);
			f.fcid.value = node.data.id;
			me.filter(f);
		},
		fetchYsfy: function(node) {
			me.loadJgSfxm1(); //查询应收费用查询栏的收费项目列表
			
			let data = $(filterFrmSelector).serializeJson({removeBlankField:true});
			if (data.sfxmdm) {
				data.sfxmdmStr = typeof data.sfxmdm === 'object' ? data.sfxmdm.join(',') : data.sfxmdm;
				delete data.sfxmdm;
			}
			if (!data.pxfs) data.pxfs = '01'; //默认按账单月降序
			if (data.sfzdyq && data.sfzdyz && data.sfzdyq>data.sfzdyz) {
				CxMsg.info('账单月份的开始日期不能大于结束日期');
				return;
			}
			data.fcid = node.data.id;
			data.ztbj = '0';
			
			let cols = $(cntrSelector).find(`${mainTblClz}-ysfy thead>tr>th`).length,
				emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fy/getYsfy'),
			    type: "GET",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	$(ysfyWrapper).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	let curr = me.getSelectedNode();
	    			if (curr && curr.data.id == node.data.id) { // 再次检查当前选中的节点是否是提交时的一致，不一致即放弃返回数据（可能是用户短时间内频繁点击多个节点造成）
			    		if (res.code == "0") {
			    			if (res.data && res.data.length>0) {
				    			let tmp = $(cntrSelector).find(`${mainTblClz}-ysfy tbody`).empty();
				    			for (let i=0; i<res.data.length; i++) {
				    				let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
				    				tmp.append(`<tr data-id="${item.ysfyid}">
				    						<td class="td-indexer">
					    						<input type="checkbox" id="${idPrefix}YsfyIndexer-${i}" name="${idPrefix}YsfyIndexer${i}">
									            <label for="${idPrefix}YsfyIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
					    						<span>${i+1}</span>
				    						</td>
				    						<td${khmcTitle}>${khmc}</td>
				    						<td>${item.sfxmmc}</td>
				    						<td>${CxMisc.escapeHtml(item.sfbzmc)}</td>
				    						<td>${item.fyje!==null?item.fyje.toFixed(2):''}</td>
				    						<td>${CxMisc.formatDate(item.jfzqq, 'short')} ~ ${CxMisc.formatDate(item.jfzqz, 'short')}</td>
				    						<td>${CxMisc.formatDate(item.ysrq, 'short')}</td>
				    						<td>${item.sfzdy}</td>
				    						<td>${item.fyfldm=='2'?'违约金':'正常费用'}</td>
				    						<td>${item.sqds!==null?item.sqds:''}</td>
				    						<td>${item.bqds!==null?item.bqds:''}</td>
				    						<td>${item.sl!==null?item.sl:''}</td>
				    						<td>${item.dj!==null?item.dj:''}</td>
				    						<td><pre class="mb-0 cx-f-1">${item.sfsm ? CxMisc.escapeHtml(item.sfsm) : ''}</pre></td>
				    					</tr>`);
				    				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
				    			}
				    			$(`${cntrSelector} ${mainTblClz}-ysfy tbody .td-indexer input`).change(function(){ me.showSum4Ysfy(); });
				    		} else {
				    			$(cntrSelector).find(`${mainTblClz}-ysfy tbody`).empty().append(emptyTmpl);
				    		}
			    			CxMisc.resetCheckAll(cntrSelector); // 保证清空已选中的选项
			    			$(`${cntrSelector} ${mainTblClz}-ysfy thead .td-indexer input`).trigger('change');
				    	} else {
				    		CxMsg.error('载入失败：' + res.message);
				    		$(cntrSelector).find(`${mainTblClz}-ysfy tbody`).empty().append(emptyTmpl);
				    	}
	    			}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$(cntrSelector).find(`${mainTblClz}-ysfy tbody`).empty().append(emptyTmpl);
			    },
			    complete: function(xhr, ts) {
			    	$(ysfyWrapper).mask('hide');
			    }
			});
		},
		
		fetchYcxfy: function(node) {
			let cols = $(cntrSelector).find(`${mainTblClz}-ycxfy thead>tr>th`).length,
				emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fy/getYcxfy'),
			    type: "GET",
			    data: {fcid: node.data.id, ztbj: '1'},
			    beforeSend: function(xhr, cfg) {
			    	$(ycxfyWrapper).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	let curr = me.getSelectedNode();
	    			if (curr && curr.data.id == node.data.id) { // 再次检查当前选中的节点是否是提交时的一致，不一致即放弃返回数据（可能是用户短时间内频繁点击多个节点造成）
				    	if (res.code == "0") {
				    		if (res.data && res.data.length>0) {
				    			let tmp = $(cntrSelector).find(`${mainTblClz}-ycxfy tbody`).empty();
				    			for (let i=0; i<res.data.length; i++) {
				    				let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
				    				tmp.append(`<tr data-id="${item.ycxfyid}">
				    						<td class="td-indexer">
					    						<input type="checkbox" id="${idPrefix}YcxfyIndexer-${i}" name="${idPrefix}YcxfyIndexer${i}">
									            <label for="${idPrefix}YcxfyIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
					    						<span>${i+1}</span>
				    						</td>
				    						<td${khmcTitle}>${khmc}</td>
				    						<td>${item.sfxmmc}</td>
				    						<td>${item.skfsmc}</td>
				    						<td>${item.sklxmc}</td>
				    						<td>${item.sfje!==null ? item.sfje.toFixed(2) : ''}</td>
				    						<td>${item.jfr ? item.jfr : ''}</td>
				    						<td>${item.skrmc?item.skrmc:''}</td>
				    						<td>${CxMisc.formatDate(item.skrq, 'short')}</td>
				    						<td><pre class="mb-0 cx-f-1">${item.skbz?item.skbz:''}</pre></td>
				    					</tr>`);
				    				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
				    			}
				    		} else {
				    			$(cntrSelector).find(`${mainTblClz}-ycxfy tbody`).empty().append(emptyTmpl);
				    		}
				    	} else {
				    		CxMsg.error('载入失败：' + res.message);
				    		$(cntrSelector).find(`${mainTblClz}-ycxfy tbody`).empty().append(emptyTmpl);
				    	}
				    }
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$(cntrSelector).find(`${mainTblClz}-ycxfy tbody`).empty().append(emptyTmpl);
			    },
			    complete: function(xhr, ts) {
			    	$(ycxfyWrapper).mask('hide');
			    }
			});
		},
		
		fetchYsk: function(node) {
			let cols = $(cntrSelector).find(`${mainTblClz}-ysk thead>tr>th`).length,
				emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fy/getYsk'),
			    type: "GET",
			    data: {fcid: node.data.id},
			    beforeSend: function(xhr, cfg) {
			    	$(yskWrapper).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	let curr = me.getSelectedNode();
	    			if (curr && curr.data.id == node.data.id) { // 再次检查当前选中的节点是否是提交时的一致，不一致即放弃返回数据（可能是用户短时间内频繁点击多个节点造成）
				    	if (res.code == "0") {
				    		if (res.data && res.data.length>0) {
				    			let tmp = $(cntrSelector).find(`${mainTblClz}-ysk tbody`).empty();
				    			for (let i=0; i<res.data.length; i++) {
				    				let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
				    				tmp.append(`<tr data-id="${item.yskid}">
				    						<td class="td-indexer">
					    						<input type="checkbox" id="${idPrefix}YskIndexer-${i}" name="${idPrefix}YskIndexer${i}">
									            <label for="${idPrefix}YskIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
					    						<span>${i+1}</span>
				    						</td>
				    						<td${khmcTitle}>${khmc}</td>
				    						<td>${item.sfxmmc}</td>
				    						<td>${item.dqye!==null ? item.dqye.toFixed(2) : ''}</td>
				    						<td>${item.ssze!==null ? item.ssze.toFixed(2) : ''}</td>
				    						<td>${item.szze!==null ? item.szze.toFixed(2) : '0'}</td>
				    						<td class="dl-item-cmd">
				    							<div class="btn-group" role="group" aria-label="操作按纽组">
				    								<button type="button" class="btn btn-outline-primary" data-cmd="yskmx">明细</button>
				    								<button type="button" class="btn btn-outline-primary" data-cmd="open-add">存入</button>
				    							</div>
				    						</td>
				    					</tr>`);
				    				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
				    			}
				    			tmp.find('td.dl-item-cmd button[data-cmd=yskmx]').click(function(){ me.openYskmx(this); });
				    			tmp.find('td.dl-item-cmd button[data-cmd=open-add]').click(function(){ me.openEditYsk('append', this); });
				    		} else {
				    			$(cntrSelector).find(`${mainTblClz}-ysk tbody`).empty().append(emptyTmpl);
				    		}
				    	} else {
				    		CxMsg.error('载入失败：' + res.message);
				    		$(cntrSelector).find(`${mainTblClz}-ysk tbody`).empty().append(emptyTmpl);
				    	}
				    }
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$(cntrSelector).find(`${mainTblClz}-ysk tbody`).empty().append(emptyTmpl);
			    },
			    complete: function(xhr, ts) {
			    	$(yskWrapper).mask('hide');
			    }
			});
		},
		
		fetchYskjz: function(node) {
			let sfxmdm = $(`${cntrSelector} .toolbar select[name=sfxmdm]`)[0], zhysfsylx=$(`${cntrSelector} .toolbar select[name=zhysfsylx]`)[0],
				sqdm = me.getAncestor(node, 'sq').data.dm;
			if (sfxmdm.options.length == 0 || sqdm != sfxmdm.getAttribute('data-sqdm')) {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfxm'),
		            type: "GET",
		            data: {sqdm: sqdm, fylxStr: '01,02,04,05'},
		            beforeSend: function(xhr, cfg) {
		            	sfxmdm.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			let oldDm = sfxmdm.value;
		            			for (let i=sfxmdm.options.length-1; i>=0; i--) sfxmdm.remove(i); //清除上次查询的列表
		            			for (let i=0; i<res.data.length; i++) 
		            				sfxmdm.options.add(new Option(res.data[i].sfxmmc, res.data[i].sfxmdm));
		            			$(sfxmdm).val(oldDm);
	        					if (sfxmdm.selectedIndex == -1) sfxmdm.selectedIndex = 0;
		            			me._fetchYskjz(node, sfxmdm, zhysfsylx);
		            		}
		            		sfxmdm.setAttribute('data-sqdm', sqdm);
		            	} else CxMsg.info('获取收费项目列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取收费项目列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	sfxmdm.disabled = false;
		            }
		        });
			} else me._fetchYskjz(node, sfxmdm, zhysfsylx);
		},
		_fetchYskjz: function(node, sfxmdm, zhysfsylx) {
			let cols = $(cntrSelector).find(`${mainTblClz}-yskjz thead>tr>th`).length,
				emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
			let data = {sfxmdm: sfxmdm.value, zhysfsylx:zhysfsylx.value};
			if (node.data.type == 'sq') data.sqdm = node.data.nid;
			else if (node.data.type == 'qy') data.qyid = node.data.nid;
			else if (node.data.type == 'ly') data.lyid = node.data.nid;
			else if (node.data.type == 'dy') data.dyid = node.data.nid;
			else if (node.data.type == 'fc') data.fcid = node.data.nid;
			if (!data.sqdm) data.sqdm = me.getAncestor(node, 'sq').data.dm;
			me.filterDataYskjz = data; // 每次查询后都缓存查询条件，给点击分页时调用
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fy/getkkysjzCount'),
			    type: "GET",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	$(yskjzWrapper).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	let curr = me.getSelectedNode();
	    			if (curr && curr.data.id == node.data.id) { // 再次检查当前选中的节点是否是提交时的一致，不一致即放弃返回数据（可能是用户短时间内频繁点击多个节点造成）
				    	if (res.code == "0") {
				    		me.genPagerYskjz(res.data); // 生成分页
				    		if (res.data == 0) {
				    			$(cntrSelector).find(`${mainTblClz}-yskjz tbody`).empty().append(emptyTmpl);
				    		} else {
				    			me.gotoYskjz(0, me.pagerYskjz.pagination("pageSize")); // 默认打开第一页
				    		}
				    	} else {
				    		CxMsg.error('载入失败：' + res.message);
				    		$(cntrSelector).find(`${mainTblClz}-yskjz tbody`).empty().append(emptyTmpl);
				    	}
				    }
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$(cntrSelector).find(`${mainTblClz}-yskjz tbody`).empty().append(emptyTmpl);
			    },
			    complete: function(xhr, ts) {
			    	$(yskjzWrapper).mask('hide');
			    }
			});
		},
		genPagerYskjz: function(count) { // 生成分页并保存分页句柄到me.pagerYskjz
			me.pagerYskjz = null;
			let cntr = $(`${yskjzWrapper}`);
			cntr.children('.cx-pagination-cntr').remove(); // 清除上一次生成的分页（如有）
			cntr.append(`<div class="cx-pagination-cntr">
						<div class="cx-pagination" data-cx-ctrl="pagination" data-cx-param="{page:1,pageSize:1000,records:${count},click:SfScKhfysq.gotoYskjz}"></div>
					</div>`);
			me.pagerYskjz = cntr.find("[data-cx-ctrl=pagination]").pagination();
		},
		gotoYskjz: function(page, pageSize) {
			let cols = $(`${cntrSelector} ${mainTblClz}-yskjz thead>tr>th`).length,
				emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
			let data = Object.assign(me.filterDataYskjz, {page: page, pageSize: pageSize});
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fy/getkkYsjz'),
			    type: "GET",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	$(yskjzWrapper).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		if (res.data && res.data.length>0) {
			    			me.renderYskjz(page, pageSize, res.data);
			    		} else {
			    			$(`${cntrSelector} ${mainTblClz}-yskjz tbody`).empty().append(emptyTmpl);
			    		}

						me.pagerYskjz.pagination("refreshPage", page);
			    	} else {
			    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
			    		$(`${cntrSelector} ${mainTblClz}-yskjz tbody`).empty().append(emptyTmpl);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    	$(`${cntrSelector} ${mainTblClz}-yskjz tbody`).empty().append(emptyTmpl);
			    },
			    complete: function(xhr, ts) {
			    	$(yskjzWrapper).mask('hide');
			    }
			});
		},
		renderYskjz: function(page, pageSize, data) {
			let tmp = $(`${cntrSelector} ${mainTblClz}-yskjz tbody`).empty();
			for (let i=0; i<data.length; i++) {
				let item = data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
				tmp.append(`<tr data-id="${item.yskid}" data-fcid="${item.fcid}" data-khid="${item.khid}">
						<td class="td-indexer">
    						<input type="checkbox" id="${idPrefix}YskjzIndexer-${i}" name="${idPrefix}YskjzIndexer${i}">
				            <label for="${idPrefix}YskjzIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td class="overflow-clip-left">${CxMisc.escapeHtml(item.fcmc)}</td>
						<td${khmcTitle}>${khmc}</td>
						<td>${item.sfxmmc}</td>
						<td>${item.dqye ? item.dqye.toFixed(2) : '0.00'}</td>
						<td>${item.wjje ? item.wjje.toFixed(2) : '0.00'}</td>
					</tr>`);
				// tmp.children(':last-child').attr('data-json', JSON.stringify(item));
			}
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz}-yskjz thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		},
		
		fetchYj: function(node) {
			let cols = $(cntrSelector).find(`${mainTblClz}-yj thead>tr>th`).length,
				emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fy/getYjfy'),
			    type: "GET",
			    data: {fcid: node.data.id, ztbj: '1'},
			    beforeSend: function(xhr, cfg) {
			    	$(yjWrapper).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	let curr = me.getSelectedNode();
	    			if (curr && curr.data.id == node.data.id) { // 再次检查当前选中的节点是否是提交时的一致，不一致即放弃返回数据（可能是用户短时间内频繁点击多个节点造成）
				    	if (res.code == "0") {
				    		if (res.data && res.data.length>0) {
				    			let tmp = $(cntrSelector).find(`${mainTblClz}-yj tbody`).empty();
				    			for (let i=0; i<res.data.length; i++) {
				    				let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
				    				tmp.append(`<tr data-id="${item.yjid}">
				    						<td class="td-indexer">
					    						<input type="checkbox" id="${idPrefix}YjIndexer-${i}" name="${idPrefix}YjIndexer${i}">
									            <label for="${idPrefix}YjIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
					    						<span>${i+1}</span>
				    						</td>
				    						<td${khmcTitle}>${khmc}</td>
				    						<td>${item.yjlxmc}</td>
				    						<td>${item.skfsmc}</td>
				    						<td>${item.sqje!==null ? item.sqje.toFixed(2) : ''}</td>
				    						<td>${item.jfr ? item.jfr : ''}</td>
				    						<td>${item.skrmc?item.skrmc:''}</td>
				    						<td>${CxMisc.formatDate(item.skrq, 'short')}</td>
				    						<td>${item.skpjbh?item.skpjbh:''}</td>
				    						<td><pre class="mb-0 cx-f-1">${item.skbz ? item.skbz : ''}</pre></td>
				    						<td>${item.thbj ? (item.thbj=='1'?'已退款':'未退款') : ''}</td>
				    						<td>${item.thjsfsmc ? item.thjsfsmc : ''}</td>
				    						<td>${item.tksj ? CxMisc.formatDate(item.tksj, 'short') : ''}</td>
				    						<td>${item.tkpjbh?item.tkpjbh:''}</td>
				    						<td><pre class="mb-0 cx-f-1">${item.tkbz ? item.tkbz : ''}</pre></td>
				    					    <td class="dl-item-cmd">
				    							<div class="btn-group" role="group" aria-label="操作按纽组">
				    								<button type="button" class="btn btn-outline-primary" data-cmd="yjth"${item.thbj=='1'?' disabled':''}>退押金</button>
				    							</div>
				    						</td>
				    					</tr>`);
				    				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
				    			}
				    			tmp.find('td.dl-item-cmd button[data-cmd=yjth]').click(function(){ me.yjth(this); });
				    		} else {
				    			$(cntrSelector).find(`${mainTblClz}-yj tbody`).empty().append(emptyTmpl);
				    		}
				    	} else {
				    		CxMsg.error('载入失败：' + res.message);
				    		$(cntrSelector).find(`${mainTblClz}-yj tbody`).empty().append(emptyTmpl);
				    	}
	    			}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$(cntrSelector).find(`${mainTblClz}-yj tbody`).empty().append(emptyTmpl);
			    },
			    complete: function(xhr, ts) {
			    	$(yjWrapper).mask('hide');
			    }
			});
		},
		
		getSelectedNode: function() {
			if ($(treeSelector).hasClass('treeview')) {
				let selecteds = $(treeSelector).treeview('getSelected');
				if (selecteds.length > 0) return selecteds[0];
				else return null;
			} return null;
		},
		getAncestor: function(node, type) {
			let tmp = node;
			while(tmp && tmp.data.type != type) tmp = $(treeSelector).treeview('getParent', [tmp.nodeId]);
			return tmp;
		},
		genFcmc: function() {
			let node = me.getSelectedNode(), mc = null;
			if (node) {
				mc = node.data.mc;
				while (node.data && node.data.type != 'sq') {
					node = $(treeSelector).treeview('getParent', [node.nodeId]);
					mc = node.data.mc + ">" + mc;
				}
			}
			return mc;
		},
		
		lazyLoad: function(m) {
			let node = me.getSelectedNode();
			if (node && node.data.type == 'fc') {
				me.loadKhxx(node.data.id, m);
				me.loadJgSfxm(node, m);
			}
			CxMisc.loadAllDmList(m);
		},
		loadJgSfxm: function(node, m) { // 为保持一致性，打开每个tab时都执行该方法 ，但实际上应收费用不会使用到
			if (!m.querySelector('input[name=ysfyid]')) { // 应收费用不需要调用此方法 
				let el = m.querySelector('select[name=sfxmdm]');
				if (el && el.getAttribute('data-loaded') != 'true') {
					let data = {sqdm: me.getAncestor(node, 'sq').data.dm}, ysk = false;
					if (m.id=='wgSfScKhsfsqYskModalDtls') { ysk = true; data.fylxStr = '01,02,04,05,08'; } // 预收款
					else data.fylxdm = '03'; // 03 临时收费
					CxMisc.ajax({
			            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfxm'),
			            type: "GET",
			            data: data,
			            beforeSend: function(xhr, cfg) {
			            	if (el.disabled) el.setAttribute('data-disabled', 'true');
			            	else el.disabled = true;
			            },
			            success: function(res, ts) {
			            	if (res.code == "0") {
			            		if (res.data && res.data.length>0) {
			            			for (let i=0; i<res.data.length; i++) {
			            				// 2020-04-01 修改：废除限制
			            				// if (!ysk || ysk && (res.data[i].sfxmdm=='01' || res.data[i].sfxmdm=='12')) // 预收款暂限定管理费和小车管理费
			            				//	el.options.add(new Option(res.data[i].sfxmmc, res.data[i].sfxmdm));
			            				el.options.add(new Option(res.data[i].sfxmmc, res.data[i].sfxmdm));
			            			}
			            		}
			            		el.setAttribute('data-json', JSON.stringify(res.data));
			            		el.setAttribute('data-loaded', 'true');
			            		if (el.getAttribute('data-selected-value')) {
		        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
		        					if (el.selectedIndex == -1) el.selectedIndex = 0;
		        					$(el).trigger('change');
		        				}
			            	} else CxMsg.info('获取收费项目列表失败: ' + res.message);
			            },
			            error: function(xhr, ts, err) {
			            	var msg = "[" + xhr.status + " : " + ts + "]";
			            	CxMsg.error('获取收费项目列表失败: ' + msg);
			            },
			            complete: function(xhr, ts) {
			            	if (!el.getAttribute('data-disabled')) el.disabled = false;
			            }
			        });
				}
			}
		},
		loadJgSfxm1: function() { // 只用在应收费用查询
			let node = me.getSelectedNode();
			if (node && node.data.type == 'fc') {
				let el = document.querySelector(filterFrmSelector).sfxmdm;
				if (el && el.getAttribute('data-loaded') != 'true') {
					let data = {sqdm: me.getAncestor(node, 'sq').data.dm, fylxStr: '01,02,04,05,08'};
					CxMisc.ajax({
			            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfxm'),
			            type: "GET",
			            data: data,
			            beforeSend: function(xhr, cfg) {
			            	el.disabled = true;
			            },
			            success: function(res, ts) {
			            	if (res.code == "0") {
			            		if (res.data && res.data.length>0) {
			            			for (let i=0; i<res.data.length; i++) {
			            				el.options.add(new Option(res.data[i].sfxmmc, res.data[i].sfxmdm));
			            			}
			            		}
			            		el.setAttribute('data-loaded', 'true');
			            		el.setAttribute('data-sqdm', data.sqdm);
			            		if (el.getAttribute('data-selected-value')) {
		        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
		        					if (el.selectedIndex == -1) el.selectedIndex = 0;
		        					$(el).trigger('change');
		        				}
			            		if (el.multiple && el.getAttribute('data-cx-ctrl') == 'multi-select') {
			            			let disabled = el.disabled;
			    					if (disabled) el.disabled = false;
			            			if ($(el).hasClass('fs-select')) $(el).fSelect('reload');
			            			else {
				    					if (el.getAttribute('data-param')) $(el).fSelect(JSON.parse(el.getAttribute('data-param')));
				    					else $(el).fSelect();
			            			}
			            			if (disabled) el.disabled = true;
			    				}
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
			}
		},
		loadJgSfxm2: function(src) {
			let el = src.form.sfxmdm;
			for (let i=el.options.length-1; i>0; i--) el.remove(i);
			if (src.value != '') {
				let data = {sqdm: me.getAncestor(me.getSelectedNode(), 'sq').data.dm, fylxdm: src.value};
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfxm'),
		            type: "GET",
		            data: data,
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            	src.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) {
		            				el.options.add(new Option(res.data[i].sfxmmc, res.data[i].sfxmdm));
		            			}
		            		}
		            		if (el.getAttribute('data-selected-value')) {
	        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
	        					if (el.selectedIndex == -1) el.selectedIndex = 0;
	        					$(el).trigger('change');
	        				}
		            	} else CxMsg.info('获取收费项目列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取收费项目列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	el.disabled = false;
		            	src.disabled = false;
		            }
		        });
			}
		},
		loadKhxx: function(fcid, m) {
			let el = m.querySelector('select[name=khid]');
			if (el && el.getAttribute('data-loaded') != 'true') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhxxList'),
		            type: "GET",
		            data: {fcid: fcid, lite: true},
		            beforeSend: function(xhr, cfg) {
		            	if (el.disabled) el.setAttribute('data-disabled', 'true');
		            	else el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) 
		            				el.options.add(new Option(res.data[i].khmc, res.data[i].khid));
		            			if (el.getAttribute('data-selected-value')) {
		        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
		        					if (el.selectedIndex == -1) el.selectedIndex = 0;
		        				}
		            		}
		            		el.setAttribute('data-loaded', 'true');
		            	} else CxMsg.info('获取客户列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取客户列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	if (!el.getAttribute('data-disabled')) el.disabled = false;
		            }
		        });
			}
		},

		nodeSelected: function(node) {
			me.clearStatus(); // 选中任何节点都清除状态
			let category = $(`${cntrSelector} .main-content .nav-tabs a.active`).data('category');
			me.fetch(node, category); //刷新列表
		},
		
		openEdit: function(cmd, el, node) {
			switch(el.getAttribute('data-category')) {
			case 'ysfy': me.openEditYsfy(cmd, el, node); break;
			case 'ycxfy': me.openEditYcxfy(cmd, el, node); break;
			case 'ysk': me.openEditYsk(cmd, el, node); break;
			case 'yj': me.openEditYj(cmd, el, node); break;
			default: break;
			}
		},
		openEditYsfyQr: function() {
			// let checkedIds = CxMisc.getCheckedIds($(ysfyWrapper));
			let checkedIds = null, zje = 0, khid = null, khmc = null;
			let trs = document.querySelectorAll(ysfyWrapper + ' table>tbody>tr');
			for (let i=0; i<trs.length; i++) {
				if (trs[i].querySelector('td.td-indexer input') && trs[i].querySelector('td.td-indexer input').checked) {
					if (!checkedIds) checkedIds = [];
					checkedIds.push(trs[i].getAttribute('data-id'));
					let data = $(trs[i]).data('json');
					zje += data.fyje;
					if (!khid) { khid = data.khid; khmc = data.khmc; }
					else { 
						if (khid != data.khid) {
							CxMsg.info('不同客户的收费不能同时确认');
							return;
						}
					}
				}
			}
			
			if (checkedIds) {
				let f = document.querySelector(ysfyQrFrmSelector);
				f.reset();
				f.ysfyidStr.value = checkedIds.join(',');
				f.fcmc.value = me.genFcmc();
				f.khmc.value = khmc;
				f.zjeDummy.value = zje.toFixed(2);
				f.skrmc.value = $('#currentYhmc').text();
				$(`${ysfyQrModalSelector}`).find('div.date[data-cx-ctrl=date]').datetimepicker('date', new Date());
				
				$(ysfyQrModalSelector).modal('show');
			} else {
				CxMsg.info('请先选择至少一项收费');
			}
		},
		dyYsfytz: function() {
			let sfpzmx = null, khid = null, khmc = null, trs = document.querySelectorAll(ysfyWrapper + ' table>tbody>tr');
			for (let i=0; i<trs.length; i++) {
				if (trs[i].querySelector('td.td-indexer input') && trs[i].querySelector('td.td-indexer input').checked) {
					if (!sfpzmx) sfpzmx = [];
					let data = $(trs[i]).data('json');
					sfpzmx.push(data);
					if (!khid) { khid = data.khid; khmc = data.khmc; }
					else { 
						if (khid != data.khid) {
							CxMsg.info('不同客户的收费应分开通知');
							return;
						}
					}
				}
			}
			if (sfpzmx) {
				let dymx = {sfpzmx};
				dymx.sfpz = {pzlydm:'21', fcmc: me.genFcmc(), khmc: khmc, skrmc:$('#currentYhmc').text(), tzrq: moment().format('YYYY-MM-DD')};
				Promise.all([me.getDymb(dymx.sfpz.pzlydm)]).then(function ([dymb]) {
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
			} else {
				CxMsg.info('请先选择至少一项收费');
			}
		},
		openScWyj: function(){
			let tv = $(`${ysfyWyjModalSelector} input[data-cx-ctrl="fcxx-tree"]`);
			if (tv.fcxxTree('initialized')) {
				tv.fcxxTree('clear');
			}
			$(`${ysfyWyjModalSelector} div.date[data-cx-ctrl="date"]`).datetimepicker('clear');
			$(ysfyWyjModalSelector).modal('show');
		},
		/*delYsfy: function(el, e) {
			let checkedIds = CxMisc.getCheckedIds($(ysfyWrapper));
			if (checkedIds && checkedIds.length>0) {
				CxCtrl.confirm('是否确定删除所选收费？', function(src){
					CxMisc.ajax({
			            url: CxMisc.finalizeUrl('/wygl/sfxt/fy/deleteYsfy'),
			            type: "GET",
			            data: {ysfyidStr: checkedIds.join(',')},
			            beforeSend: function(xhr, cfg) {
			            	CxMisc.markAjaxStart($(el));
			            },
			            success: function(res, ts) {
			            	if (res.code == "0") {
			            		CxMsg.info('删除所选收费成功');
			            		let node = me.getSelectedNode();
			    				if (node && node.data.type == 'fc') me.fetchYsfy(node); //刷新列表
			            	} else CxMsg.error('删除所选收费失败: ' + res.message);
			            },
			            error: function(xhr, ts, err) {
			            	var msg = "[" + xhr.status + " : " + ts + "]";
			            	CxMsg.error('删除所选收费失败: ' + msg);
			            },
			            complete: function(xhr, ts) {
			            	CxMisc.markAjaxEnd($(el));
			            }
			        });
			    }, {
			    	evt: e,
			    	src: el,
			    	placement: 'bottom'
			    });
			} else {
				CxMsg.info('请先选择至少一项收费');
			}
		},*/
		openEditYsfy: function(cmd, el, node) {
			let f = document.querySelector(ysfyFrmSelector);
			f.reset();
			f.cmd.value = cmd;
			
			if (cmd == 'create') {
				f.fcid.value = node.data.id;
				f.sqdm.value = me.getAncestor(node, 'sq').data.dm;
				// f.ztbj.value = '0';
				f.fcmc.value = me.genFcmc();
				f.ysfyid.value = '';
				f.ysfypzid.value = '';
			}
			$(ysfyModalSelector).modal('show');
		},
		openEditYcxfy: function(cmd, el, node) {
			let f = document.querySelector(ycxfyFrmSelector);
			f.reset();
			f.cmd.value = cmd;
			
			if (cmd == 'create') {
				f.fcid.value = node.data.id;
				f.sqdm.value = me.getAncestor(node, 'sq').data.dm;
				// f.ztbj.value = '0';
				f.ycxfyid.value = '';
				f.ycxfypzid.value = '';
				f.fcmc.value = me.genFcmc();
				f.skrmc.value = $('#currentYhmc').text();
				$(`${ycxfyModalSelector}`).find('div.date[data-cx-ctrl=date]').datetimepicker('date', new Date());
				
				$(`${ycxfyModalSelector} .table-wgsf-fy-khfysq-ycxfy-add tbody>tr:not(:first-child)`).remove();
			}
			$(ycxfyModalSelector).modal('show');
		},
		openEditYsk: function(cmd, el, node) {
			let f = document.querySelector(yskFrmSelector);
			f.reset();
			f.cmd.value = cmd;
			f.zk.value = '1';
			f.querySelector('[data-ysk-zk=Y]').innerText = '-';
			
			if (cmd == 'create') {
				f.fcid.value = node.data.id;
				f.sqdm.value = me.getAncestor(node, 'sq').data.dm;
				f.yxbj.value = '1';
				f.yskid.value = '';
				
				f.khid.disabled = false;
				f.fcmc.value = me.genFcmc();
				f.skrmc.value = $('#currentYhmc').text();
				$('#wgSfScKhsfsqYsk_fsrq_p').datetimepicker('date', new Date());

				$(`${yskModalSelector} .table-wgsf-fy-khfysq-ysk-add tbody>tr:not(:first-child)`).remove();
				f.sfxmdm.removeAttribute('data-current-sfxmdm-je');
				
				f.sfxmdm.disabled = false;
				$(f).find('div.date[data-cx-ctrl="date-month"]').datetimepicker('clear');
				$(f.fse).trigger('input');
				$(f.sfxmdm).trigger('change');
			} else { // append
				let data = $(el).closest('tr').data('json');
				f.fcid.value = data.fcid;
				f.sqdm.value = data.sqdm;
				f.yxbj.value = '1';
				f.yskid.value = data.yskid;
				
				f.khid.disabled = true;
				f.fcmc.value = data.fcmc;
				if ($(f.khid).data('loaded')) {
					CxMisc.selectSelect('khid', data.khid, f);
				} else f.khid.setAttribute('data-selected-value', data.khid); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				f.skrmc.value = $('#currentYhmc').text();
				$('#wgSfScKhsfsqYsk_fsrq_p').datetimepicker('date', new Date());
				
				$(`${yskModalSelector} .table-wgsf-fy-khfysq-ysk-add tbody>tr:not(:first-child)`).remove();
				f.sfxmdm.removeAttribute('data-current-sfxmdm-je');
				
				$(f).find('div.date[data-cx-ctrl="date-month"]').datetimepicker('clear');
				$(f.fse).trigger('input');
				if ($(f.sfxmdm).data('loaded')) {
					CxMisc.selectSelect('sfxmdm', data.sfxmdm, f); // 该方法会使控件disabled失效
				} else f.sfxmdm.setAttribute('data-selected-value', data.sfxmdm); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
			}
			$(yskModalSelector).modal('show');
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
	            		let tmp = $(`${yskmxModalSelector}  ${mainTblClz}-yskmx tbody`); 
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
		},

		openYskjz: function(el, e){
			let checkedIds = CxMisc.getCheckedIds($(yskjzWrapper));
			if (checkedIds) {
				let f = document.querySelector(yskjzFrmSelector);
				f.reset();
				$('#wgSfScKhsfsqYskjz_fsrq_p').datetimepicker('date', new Date());
				$(yskjzModalSelector).modal('show');
			} else {
				CxMsg.info('请先选择至少一项预收费');
			}
		},
		openEditYj: function(cmd, el, node) {
			let f = document.querySelector(yjFrmSelector);
			f.reset();
			f.cmd.value = cmd;
			
			if (cmd == 'create') {
				f.fcid.value = node.data.id;
				f.sqdm.value = me.getAncestor(node, 'sq').data.dm;
				// f.ztbj.value = '0';
				f.yjid.value = '';
				f.sfpzid.value = '';
				f.fcmc.value = me.genFcmc();
				f.skrmc.value = $('#currentYhmc').text();
				$(`${yjModalSelector}`).find('div.date[data-cx-ctrl=date]').datetimepicker('date', new Date());
				
				$(`${yjModalSelector} .table-wgsf-fy-khfysq-yj-add tbody>tr:not(:first-child)`).remove();
			}
			$(yjModalSelector).modal('show');
		},
		
		submitYsfyQr: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			CxMisc.ajax({
	            url: CxMisc.finalizeUrl('/wygl/sfxt/fy/qrJf'),
	            type: "POST",
	            data: data,
	            beforeSend: function(xhr, cfg) {
	            	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
	            },
	            success: function(res, ts) {
	            	if (res.code == "0") {
	            		CxMsg.info('确认费用收取成功');
	            		if (data.print || data.dylx != '0') me.printSfpz(res.data.sfpzid, '01', data.dylx);
	            		let node = me.getSelectedNode();
	    				if (node && node.data.type == 'fc') me.fetchYsfy(node); //刷新列表
	    				frm.closest('.modal').modal('hide');
	            	} else CxMsg.error('确认费用收取失败: ' + res.message);
	            },
	            error: function(xhr, ts, err) {
	            	var msg = "[" + xhr.status + " : " + ts + "]";
	            	CxMsg.error('确认费用收取失败: ' + msg);
	            },
	            complete: function(xhr, ts) {
	            	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
	            }
	        });
		},
		submitYsfy: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true}), ok = true;
			let txt = data.cmd == 'create' ? '添加' : '修改';
			// 20200524: 修改计费周期以下限制
			if (data.sfxmdm != '12' &&data.sfxmdm != '13' &&data.sfxmdm != '14' && data.sfxmdm != '15') {
				let s = moment(data.jfzqq, 'YYYY-MM-DD'), e = moment(data.jfzqz, 'YYYY-MM-DD'), tmp = moment(new Date());
				tmp.startOf('month').add(1, 'months');
				if (!s.isBefore(tmp) || !e.isBefore(tmp)) {
					ok = false;
					CxMsg.info(f.sfxmdm.options[f.sfxmdm.selectedIndex].text+'计费周期不能大于当前月');
				}
				if (s.month() != e.month()) {
					ok = false;
					CxMsg.info(f.sfxmdm.options[f.sfxmdm.selectedIndex].text+'计费周期起与计费周期止必须是同一个月');
				}
			}
			if (data.jfzqq > data.jfzqz) {
				ok = false;
				f.jfzqz.focus();
				CxMsg.info('计费周期止不能小于计费周期起');
			}
			
			if (ok) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/fy/getCzysfyCount'),
				    type: "GET",
				    data: data,
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		if (res.data > 0) {
				    			CxCtrl.confirm('该收费项目对应计费周期已存在，是否确定继续添加？', function(src){
				    				me._submitYsfy(data, frm, txt);
							    }, {
							    	evt: window.event,
							    	src: frm.find('button[type=submit]')[0],
							    	placement: 'top'
							    });
				    		} else {
				    			me._submitYsfy(data, frm, txt);
				    		}
				    	} else {
				    		CxMsg.warn('查询收费是否存在失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.warn('收费是否存在失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
				    }
				});
			}
		},
		_submitYsfy: function(data, frm, txt){
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl(data.cmd == 'create' ? '/wygl/sfxt/fy/addYsfy' : '/wygl/sfxt/fy/updateYsfy'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info(txt + '成功');
			    		let node = me.getSelectedNode();
						if (node && node.data.type == 'fc') me.fetchYsfy(node); //刷新列表
						frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn(txt + '失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn(txt + '失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
			    }
			});
		},
		submitYsfyWyj: function(f){
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			if (!data.sqdm) {
				CxMsg.info('请选择任何一个房产资源');
				return;
			}
			delete data.fczymc; // 选中的房产资源名称不需要作为参数
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fysq/addSgWyj'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
		        	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
		        },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info('添加成功');
			    		let node = me.getSelectedNode();
						if (node && node.data.type == 'fc') me.fetchYsfy(node); //刷新列表
			    		frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn('添加失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('添加失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
		        }
			});
		},
		
		submitYcxfy: function(f) {
			let trs = f.querySelectorAll('table.table-wgsf-fy-khfysq-ycxfy-add>tbody>tr');
			if (me.validateYcxfy(trs)) {
				let frm = $(f), data = frm.serializeJson({removeBlankField:true});
				let txt = data.cmd == 'create' ? '添加' : '修改';
				delete data.sfxmdm;
				delete data.sklxdm;
				delete data.dj;
				delete data.sl;
				delete data.sfje;
				let ycxfyStr = [];
				for (let i=0; i<trs.length; i++) {
					let sfxmdm = trs[i].querySelector('select[name=sfxmdm]').value, 
						sklxdm = trs[i].querySelector('select[name=sklxdm]').value, 
						dj = trs[i].querySelector('input[name=dj]').value, 
						sl = trs[i].querySelector('input[name=sl]').value,
						sfje = trs[i].querySelector('input[name=sfje]').value;
					ycxfyStr.push(`${sfxmdm},${sklxdm},${dj},${sl},${sfje}`);
				}
				data.ycxfyStr = ycxfyStr.join(';');
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl(data.cmd == 'create' ? '/wygl/sfxt/fy/addYcxfy' : '/wygl/sfxt/fy/updateYcxfy'),
				    type: "POST",
				    data: data,
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		CxMsg.info(txt + '成功');
				    		if (data.print) me.printSfpz(res.data.sfpzid, '02');
				    		let node = me.getSelectedNode();
							if (node && node.data.type == 'fc') me.fetchYcxfy(node); //刷新列表
							frm.closest('.modal').modal('hide');
				    	} else {
				    		CxMsg.warn(txt + '失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.warn(txt + '失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
				    }
				});
			}
		},
		
		_normailizeDate: function(date, type) {
			if (type == 'q' && date && date.length == 7) {
				return date + '-01';
			}
			if (type == 'z' && date && date.length == 7) {
				return moment(date + '-01', 'YYYY-MM-DD').add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD');
			}
			return null;
		},
		submitYsk: function(f) {
			let append = f.cmd.value == 'append';
			if (append) {
				f.khid.disabled = false; 
				$(f).find('.table-wgsf-fy-khfysq-ysk-add select[name=sfxmdm]').each(function(){ this.disabled = false; });
			}
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			let txt = '预收款存入';
			
			data.ysxmList = [];
			if (typeof data.sfxmdm === 'string') { //只有一行收费项目
				data.ysxmList.push({
					yskid: append ? f.yskid.value : null,
					sfxmdm: data.sfxmdm,
					yfs: parseFloat(data.yfs)?parseFloat(data.yfs):0,
					ysrq: me._normailizeDate(data.ysrq, 'q'),
					ysrz: me._normailizeDate(data.ysrz, 'z'),
					yfse: parseFloat(data.yfse),
					zk: parseFloat(data.zk),
					fse: parseFloat(data.fse)
				});
			} else { // 有多行收费项目
				for (let i=0; i<data.sfxmdm.length; i++) {
					data.ysxmList.push({
						yskid: append ? f.yskid.value : null,
						sfxmdm: data.sfxmdm[i],
						yfs: parseFloat(data.yfs[i])?parseFloat(data.yfs[i]):0,
						ysrq: me._normailizeDate(data.ysrq[i], 'q'),
						ysrz: me._normailizeDate(data.ysrz[i], 'z'),
						yfse: parseFloat(data.yfse[i]),
						zk: parseFloat(data.zk[i]),
						fse: parseFloat(data.fse[i])
					});
				}
			}
			for (let i=0; i<data.ysxmList.length; i++) {
				if (data.ysxmList[i].fse <= 0) {
					CxMsg.info('预收款金额必须大于0，请重新输入或删除相应的预收项');
					return;
				}
			}
			
			//if (data.ysrq && data.ysrq.length == 7) data.ysrq += '-01';
			//if (data.ysrz && data.ysrz.length == 7)
			//	data.ysrz = moment(data.ysrz += '-01', 'YYYY-MM-DD').add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD');
			delete data.cmd;
			delete data.qye;
			delete data.hye;
			delete data.sfxmdm;
			delete data.yfs;
			delete data.ysrq;
			delete data.ysrz;
			delete data.yfse;
			delete data.zk;
			delete data.fse;
			if (append) {
				f.khid.disabled = true; 
				$(f).find('.table-wgsf-fy-khfysq-ysk-add select[name=sfxmdm]').each(function(){ this.disabled = true; });
			}
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fy/addYsksr'),
			    type: "POST",
			    contentType: 'application/json;charset=utf-8',
			    data: JSON.stringify(data),
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info(txt + '成功');
			    		if (data.print) me.printSfpz(res.data.sfpzid, '03');
			    		let node = me.getSelectedNode();
						if (node && node.data.type == 'fc') me.fetchYsk(node); //刷新列表
						frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn(txt + '失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn(txt + '失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
			    }
			});
		},
		
		submitYskjz: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			data.sqdm = me.getAncestor(me.getSelectedNode(), 'sq').data.dm;
			data.sfxmdm = $(cntrSelector).find('.toolbar select[name=sfxmdm]').val();
			data.zhysfsylx = $(cntrSelector).find('.toolbar select[name=zhysfsylx]').val();
			let yskList = [];
			$(yskjzWrapper).find('table tbody td.td-indexer input').each(function(){
				if (this.checked) {
					let tr = $(this).closest('tr');
					yskList.push({fcid: tr.data('fcid'), khid: tr.data('khid'), sfxmdm: data.sfxmdm});
				}
			});
			data.yskVoList = yskList;
			
			CxMisc.ajax({
	            url: CxMisc.finalizeUrl('/wygl/sfxt/fy/addYskjz'),
	            type: "POST",
	            contentType: 'application/json;charset=utf-8',
			    data: JSON.stringify(data),
	            beforeSend: function(xhr, cfg) {
	            	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
	            },
	            success: function(res, ts) {
	            	if (res.code == "0") {
	            		CxMsg.info('结转所选预收费成功');
	            		let node = me.getSelectedNode();
						if (node) me.fetchYskjz(node); //刷新列表
						frm.closest('.modal').modal('hide');
	            	} else CxMsg.error('结转所选预收费失败: ' + res.message);
	            },
	            error: function(xhr, ts, err) {
	            	var msg = "[" + xhr.status + " : " + ts + "]";
	            	CxMsg.error('结转所选预收费失败: ' + msg);
	            },
	            complete: function(xhr, ts) {
	            	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
	            }
	        });
		},
		
		submitYj: function(f) {
			let trs = f.querySelectorAll('table.table-wgsf-fy-khfysq-yj-add>tbody>tr');
			
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			let txt = data.cmd == 'create' ? '添加' : '修改';
			delete data.yjlxdm;
			delete data.sqje;
			
			let yjStr = [];
			for (let i=0; i<trs.length; i++) {
				let yjlxdm = trs[i].querySelector('select[name=yjlxdm]').value, 
					sqje = trs[i].querySelector('input[name=sqje]').value;
				yjStr.push(`${yjlxdm},${sqje}`);
			}
			data.yjStr = yjStr.join(';');
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fy/addYjfy'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info(txt + '成功');
			    		if (data.print) me.printSfpz(res.data.sfpzid, '05');
			    		let node = me.getSelectedNode();
						if (node && node.data.type == 'fc') me.fetchYj(node); //刷新列表
						frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn(txt + '失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn(txt + '失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
			    }
			});
		},
		
		submitYjth: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fy/yjTh'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info('押金退还成功');
			    		if (data.print) me.printSfpz(res.data.sfpzid, '06');
			    		let node = me.getSelectedNode();
						if (node && node.data.type == 'fc') me.fetchYj(node); //刷新列表
						frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn('押金退还失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('押金退还失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
			    }
			});
		},
		
		validateYcxfy: function(trs){
			let ok = true;
			for (let i=0; i<trs.length; i++) {
				let sklxdm = trs[i].querySelector('select[name=sklxdm]'), 
					dj = trs[i].querySelector('input[name=dj]'), 
					sl = trs[i].querySelector('input[name=sl]'),
					sfje = trs[i].querySelector('input[name=sfje]');
				if (sklxdm.value != '01' && (dj.value == '' || sl.value == '' || sfje.value == '')) {
					CxMsg.warn('请填写正确数量或清除该行');
					sl.scrollIntoView(true);
					if (dj.value == '') dj.focus();
					else sl.focus();
					ok = false;
					break;
				}
			}
			return ok;
		},
		
		yjth: function(el) {
			let f = document.querySelector(yjthFrmSelector), data = $(el).closest('tr').data('json');
			f.reset();
			f.fcid.value = data.fcid;
			f.sqdm.value = data.sqdm;
			f.yjid.value = data.yjid;
			//f.sfpzid.value = data.sfpzid;
			f.fcmc.value = me.genFcmc();
			f.khmc.value = data.khmc;
			f.yjlxmc.value = data.yjlxmc;
			f.thje.value = data.sqje;
			$(`${yjthModalSelector}`).find('div.date[data-cx-ctrl=date]').datetimepicker('date', new Date());
			
			$(yjthModalSelector).modal('show');
		},
		
		
		
		/* 以下是收费凭证查询 - 与 凭证费用管理一样 */
		filter: function(f) {
			let node = me.getSelectedNode();
			me.filterDataQuery = $(f).serializeJson({removeBlankField:true}); // 每次查询后都缓存查询条件，给点击分页时调用
			
			let cols = $(`${cntrSelector} ${sfpzTblClz} thead>tr>th`).length,
				emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/pz/getSfpzCount'),
			    type: "GET",
			    data: me.filterDataQuery,
			    beforeSend: function(xhr, cfg) {
			    	$(`${cntrSelector} .main-content`).mask('show');
			    },
			    success: function(res, ts) {
			    	let curr = me.getSelectedNode();
			    	if (!curr || curr.data.id != node.data.id) return; // 验证数据返回后当前选中的节点是否与提交时一样，不一致时丢弃数据
			    	if (res.code == "0") {
			    		me.genPager(res.data); // 生成分页
			    		if (res.data == 0) {
			    			$(`${cntrSelector} ${sfpzTblClz} tbody`).empty().append(emptyTmpl);
			    		} else {
			    			me.goto(0, me.pagerQuery.pagination("pageSize")); // 默认打开第一页
			    		}
			    	} else {
			    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
			    		$(`${cntrSelector} ${sfpzTblClz} tbody`).empty().append(emptyTmpl);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    	$(`${cntrSelector} ${sfpzTblClz} tbody`).empty().append(emptyTmpl);
			    },
	            complete: function(xhr, ts) {
	            	$(`${cntrSelector} .main-content`).mask('hide');
	            }
			});
		},
		genPager: function(count) { // 生成分页并保存分页句柄到me.pagerQuery
			me.pagerQuery = null;
			let cntr = $(`${sfpzWrapper}`);
			cntr.children('.cx-pagination-cntr').remove(); // 清除上一次生成的分页（如有）
			cntr.append(`<div class="cx-pagination-cntr">
						<div class="cx-pagination" data-cx-ctrl="pagination" data-cx-param="{page:1,records:${count},click:SfScKhfysq.goto}"></div>
					</div>`);
			me.pagerQuery = cntr.find("[data-cx-ctrl=pagination]").pagination();
		},
		goto: function(page, pageSize) {
			let cols = $(`${cntrSelector} ${sfpzTblClz} thead>tr>th`).length,
				emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/pz/getSfpz'),
			    type: "GET",
			    data: Object.assign(me.filterDataQuery, {page: page, pageSize: pageSize}),
			    beforeSend: function(xhr, cfg) {
			    	$(`${cntrSelector} .main-content`).mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		if (res.data && res.data.sfpzList.length>0) {
			    			me.render(page, pageSize, res.data);
			    		} else {
			    			$(`${cntrSelector} ${sfpzTblClz} tbody`).empty().append(emptyTmpl);
			    		}

						me.pagerQuery.pagination("refreshPage", page);
			    	} else {
			    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
			    		$(`${cntrSelector} ${sfpzTblClz} tbody`).empty().append(emptyTmpl);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    	$(`${cntrSelector} ${sfpzTblClz} tbody`).empty().append(emptyTmpl);
			    },
			    complete: function(xhr, ts) {
			    	$(`${cntrSelector} .main-content`).mask('hide');
			    }
			});
		},
		openDtls: function(id) {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/pz/getSfmx'),
			    type: "GET",
			    data: {sfpzid:id, ztbj: '1'},
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
				    						<td>${item.fyje!==null?item.fyje.toFixed(2):''}</td>
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
				    						<td>${item.sfje!==null ? item.sfje.toFixed(2) : ''}</td>
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
				    						<td>${item.sqje!==null ? item.sqje.toFixed(2) : ''}</td>
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
		refreshPage: function() {
			if (me.pagerQuery && me.pagerQuery.pagination("records")) me.goto(me.pagerQuery.pagination("page"), me.pagerQuery.pagination("pageSize"));
		},
		render: function(page, pageSize, data) {
			let tmp = $(`${cntrSelector} ${sfpzTblClz} tbody`).empty();
			for (let i=0; i<data.sfpzList.length; i++) {
				let item = data.sfpzList[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
				tmp.append(`<tr data-id="${item.sfpzid}" data-pzlydm="${item.pzlydm}">
						<td class="td-indexer">
    						<input type="checkbox" id="${idPrefix}sfpzmxIndexer-${i}" name="${idPrefix}sfpzmxIndexer${i}">
				            <label for="${idPrefix}sfpzmxIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td${khmcTitle}>${khmc}</td>
						<td>${item.pzh}</td>
						<td>${item.pzlymc}</td>
						<td>${item.pzlydm=='06' ? item.thjsfsmc : item.skfsmc}</td>
						<td>${item.pjbh?item.pjbh:''}</td>
						<td>${item.pjlxmc}</td>
						<td>${item.je!==null?item.je.toFixed(2):''}</td>
						<td>${item.jfr ? item.jfr : ''}</td>
						<td>${item.skrmc?item.skrmc:''}</td>
						<td>${item.skrq}</td>
						<td><pre class="mb-0 cx-f-1">${item.skbz?item.skbz:''}</pre></td>
						<td>${item.ztbj=='9'?'已作废':'正常'}</td>
						<td>${item.zfbh?item.zfbh:''}</td>
						<td>${item.zfry?item.zfry:''}</td>
						<td>${item.zfrq?item.zfrq:''}</td>
						<td>${item.zfyy?item.zfyy:''}</td>
						<td class="dl-item-cmd">
							<div class="btn-group" role="group" aria-label="操作按纽组">
								<button type="button" class="btn btn-outline-primary" data-cmd="open-dtls">明细</button>
								<button type="button" class="btn btn-outline-primary" data-cmd="print-sfpz" data-dylx="1">打印</button>
								<button type="button" class="btn btn-outline-primary" data-cmd="print-sfpz" data-dylx="2"${item.pzlydm=='01'?'':' disabled'}>打印汇总</button>
							</div>
						</td>
					</tr>`);
			}
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
				$(`${cntrSelector} ${sfpzTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		}
	};
}

SfScKhfysq.bind();