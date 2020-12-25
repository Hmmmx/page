if (typeof window.SfScKhsfpz === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfScKhsfpzCntr';
	const treeSelector = '#wgSfScKhsfpzCntr .tv-wrapper';
	const filterFrmSelector = '#wgSfScKhsfpzCntr .filterbar>form[data-type=filter]';
	const repealModalSelector = '#wgSfScKhsfpzModalDtls';
	const repealFrmSelector = '#wgSfScKhsfpzDtlsFrm';
	const editModalSelector = '#wgSfScKhsfpzEditModalDtls';
	const editFrmSelector = '#wgSfScKhsfpzEditDtlsFrm';
	const sfmxModalSelector = '#wgSfScKhsfpzMxModalDtls';
	
	const mainTblClz = '.table-wgsf-pz-khsfpz';
	const idPrefix = 'wgSfScKhsfpz';
	const sbrSelector = '#wgSfScKhsfpzCntr .col-limited-lg';
	const ctxSelector = '#wgSfScKhsfpzCntr .col-extended-lg';
	
	const me = window.SfScKhsfpz = {
		pager: null,
		filterData: null,
		
		bind: function() {
			CxWg.loadFcxxTree(treeSelector, {nodeSelected: me.nodeSelected});
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			/*$(cntrSelector).find('.toolbar button[data-cmd="open-repeal"]').click(function(){
				let checkedIds = CxMisc.getCheckedIds($(`${cntrSelector}`));
				if (checkedIds) me.openRepeal(checkedIds);
				else CxMsg.info('请先选择至少一项收费凭证');
			});*/
			
			CxMisc.formValidated(filterFrmSelector, me.filter);
			
			CxMisc.bindCheckAll(cntrSelector);
			
			$(`${repealModalSelector}`).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD', date: null // 必须设置为空，否则会自动选择当天日期
			});
			CxMisc.formValidated(repealFrmSelector, function(f){ me.submitRepeal(f); });
			$(`${repealModalSelector}`).on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
			
			$(`${editModalSelector}`).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD', date: null // 必须设置为空，否则会自动选择当天日期
			});
			CxMisc.formValidated(editFrmSelector, function(f){ me.submitEdit(f); });
			$(`${editModalSelector}`).on('show.bs.modal', function (e) { 
				me.lazyLoad(this);
				CxMisc.clearValidation(this); 
			}); //默认任何modal显示时把上次验证结果去掉
		},
		refresh: function() {
			me.refreshPage();
		},
		
		cacheFilterData: function(f) { // 每次查询后都缓存查询条件，给点击分页时调用
			me.filterData = $(f).serializeJson({removeBlankField:true});
		},
		lazyLoad: function(m) {
			CxMisc.loadAllDmList(m);
		},
		filter: function(f) {
			let node = me.getSelectedNode();
			me.cacheFilterData(f);
			
			let cols = $(`${cntrSelector} ${mainTblClz} thead>tr>th`).length,
				emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/pz/getSfpzCount'),
			    type: "GET",
			    data: me.filterData,
			    beforeSend: function(xhr, cfg) {
			    	$(`${cntrSelector} .main-content`).mask('show');
			    },
			    success: function(res, ts) {
			    	let curr = me.getSelectedNode();
			    	if (!curr || curr.data.id != node.data.id) return; // 验证数据返回后当前选中的节点是否与提交时一样，不一致时丢弃数据
			    	if (res.code == "0") {
			    		me.genPager(res.data); // 生成分页
			    		if (res.data == 0) {
			    			$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
			    		} else {
			    			me.goto(0, me.pager.pagination("pageSize")); // 默认打开第一页
			    		}
			    	} else {
			    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
			    		$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    	$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
			    },
	            complete: function(xhr, ts) {
	            	$(`${cntrSelector} .main-content`).mask('hide');
	            }
			});
		},
		getSelectedNode: function() {
			let selecteds = $(treeSelector).treeview('getSelected');
			if (selecteds.length > 0) return selecteds[0];
			else return null;
		},
		genPager: function(count) { // 生成分页并保存分页句柄到me.pager
			me.pager = null;
			let cntr = $(`${cntrSelector} .main-content`);
			cntr.children('.cx-pagination-cntr').remove(); // 清除上一次生成的分页（如有）
			cntr.append(`<div class="cx-pagination-cntr">
						<div class="cx-pagination" data-cx-ctrl="pagination" data-cx-param="{page:1,records:${count},click:SfScKhsfpz.goto}"></div>
					</div>`);
			me.pager = cntr.find("[data-cx-ctrl=pagination]").pagination();
		},
		goto: function(page, pageSize) {
			let cols = $(`${cntrSelector} ${mainTblClz} thead>tr>th`).length,
				emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/pz/getSfpz'),
			    type: "GET",
			    data: Object.assign(me.filterData, {page: page, pageSize: pageSize}),
			    beforeSend: function(xhr, cfg) {
			    	$(`${cntrSelector} .main-content`).mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		if (res.data && res.data.sfpzList.length>0) {
			    			me.render(page, pageSize, res.data);
			    		} else {
			    			$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
			    		}

						me.pager.pagination("refreshPage", page);
			    	} else {
			    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
			    		$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    	$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
			    },
			    complete: function(xhr, ts) {
			    	$(`${cntrSelector} .main-content`).mask('hide');
			    }
			});
		},
		nodeSelected: function(node) {
			me.filterData = null;
			document.querySelector(filterFrmSelector).fcid.value = node.data.id;
			$(`${filterFrmSelector} button[type=submit]`).click(); // 马上提交默认条件查询，即相当于载入默认列表
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
		openEdit: function(el) {
			let data = $(el).closest('tr').data('json');
			let f = document.querySelector(editFrmSelector);
			f.reset();
			f.sfpzid.value = data.sfpzid;
			if (f.skfsdm.getAttribute("data-accept-values").includes(data.skfsdm)) {
				f.skfsdm.disabled = false;
				$(f.skfsdm).closest('.form-group').removeClass('d-none');
				if ($(f.skfsdm).data('loaded')) {
					CxMisc.selectSelect('skfsdm', data.skfsdm, f);
				} else f.skfsdm.setAttribute('data-selected-value', data.skfsdm); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
			} else {
				f.skfsdm.disabled = true;
				$(f.skfsdm).closest('.form-group').addClass('d-none');
			}
			if (data.skrq) $('#wgSfScKhsfpzEdit_skrq_p').datetimepicker('date', data.skrq);
			
			$(editModalSelector).modal('show');
		},
		openRepeal: function(ids) {
			let f = document.querySelector(repealFrmSelector);
			f.reset();
			if (typeof ids === 'string') {
				f.sfpzid.value = ids;
				f.sfpzidStr.value = '';
			} else {
				f.sfpzid.value = '';
				f.sfpzidStr.value = ids.join(',');
			}
			f.zfry.value = $('#currentYhmc').text();
			$(`${repealModalSelector}`).find('div.date[data-cx-ctrl=date]').datetimepicker('date', new Date());
			
			$(repealModalSelector).modal('show');
		},
		refreshPage: function() {
			if (me.pager && me.pager.pagination("records")) me.goto(me.pager.pagination("page"), me.pager.pagination("pageSize"));
		},
		render: function(page, pageSize, data) {
			let tmp = $(`${cntrSelector} ${mainTblClz} tbody`).empty();
			for (let i=0; i<data.sfpzList.length; i++) {
				let item = data.sfpzList[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
				tmp.append(`<tr data-id="${item.sfpzid}">
						<td class="td-indexer">
    						<input type="checkbox" id="${idPrefix}Indexer-${i}" name="${idPrefix}Indexer${i}">
				            <label for="${idPrefix}Indexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td${khmcTitle}>${khmc}</td>
						<td>${item.pzh}</td>
						<td>${item.pzlymc}</td>
						<td>${item.pzlydm=='06' ? item.thjsfsmc : item.skfsmc}</td>
						<td>${item.pjbh?item.pjbh:''}</td>
						<td>${item.pjlxmc}</td>
						<td>${item.je?item.je.toFixed(2):''}</td>
						<td>${item.jfr ? item.jfr : ''}</td>
						<td>${item.skrmc?item.skrmc:''}</td>
						<td>${item.skrq}</td>
						<td><pre class="mb-0 cx-f-1">${item.skbz?item.skbz:''}</pre></td>
						<td>${item.ztbj=='9'?'已作废':'正常'}</td>
						<td>${item.zfbh?item.zfbh:''}</td>
						<td>${item.zfry?item.zfry:''}</td>
						<td>${item.zfrq?item.zfrq:''}</td>
						<td><pre class="mb-0 cx-f-1">${item.zfyy?item.zfyy:''}</pre></td>
						<td class="dl-item-cmd">
							<div class="btn-group" role="group" aria-label="操作按纽组">
								<button type="button" class="btn btn-outline-primary" data-cmd="open-dtls">明细</button>
								<button type="button" class="btn btn-outline-danger" data-cmd="open-edit"${item.ztbj=='9'?' disabled':''}>修改</button>
								<button type="button" class="btn btn-outline-danger" data-cmd="open-repeal"${item.ztbj=='9'?' disabled':''}>作废</button>
							</div>
						</td>
					</tr>`);
				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
			}
			tmp.find('td.dl-item-cmd button[data-cmd="open-repeal"]').click(function(){ me.openRepeal($(this).closest('tr').data('id')); });
			tmp.find('td.dl-item-cmd button[data-cmd="open-edit"]').click(function(){ me.openEdit(this); });
			tmp.find('td.dl-item-cmd button[data-cmd="open-dtls"]').click(function(){ me.openDtls($(this).closest('tr').data('id')); });
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		},
		submitEdit: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/pz/updateSfpz'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info('收费凭证修改成功');
			    		me.refreshPage(); //刷新列表
						frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn('收费凭证修改失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('收费凭证修改失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
			    }
			});
		},
		submitRepeal: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/pz/deleteSfpz'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info('收费凭证作废成功');
			    		me.refreshPage(); //刷新列表
						frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn('收费凭证作废失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('收费凭证作废失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
			    }
			});
		}
	};
}
SfScKhsfpz.bind();