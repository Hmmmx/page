if (typeof window.KfSbxcSbxc === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgKfSbxcSbxcCntr';
	const dtlsModalSelector = '#wgKfSbxcSbxcModalDtls';
	const dtlsModalLblSelector = '#wgKfSbxcSbxcModalDtlsLabel';
	const dtlsFrmSelector = '#wgKfSbxcSbxcDtlsFrm';
	
	
	const mainTblClz = '.table-wgkf-sbxc-sbxc';
	
	const loadingMask1 = '#wgKfSbxcSbxcCntr';
	
	const me = window.KfSbxcSbxc = {
		pager: null,
		filterData: null,
			
		bind: function() {
			me.getSqList(); 
			
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.bindCheckAll(cntrSelector);
			
			$(`${cntrSelector} .toolbar select[name=sqdm]`).change(function(){
				me.filter();
			});
			$(`${cntrSelector} .toolbar button[data-cmd=open-add]`).click(function(){
				me.openEdit('create');
			});
			CxMisc.formValidated(dtlsFrmSelector, me.submitXcsb);
			
			
			$(dtlsModalSelector).on('show.bs.modal', function (e) { 
				CxMisc.loadAllDmList(this);
				CxMisc.clearValidation(this); 
			}); // 打开时加载相应有待选代码列表：select[data-lazy-load]
		},
		
		refresh: function() {
			me.filter();
		},
		
		getSqList: function() {
			let el = document.querySelector(`${cntrSelector} .toolbar select[name=sqdm]`);
			if (el.getAttribute('data-loaded') != 'true') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhsq'),
		            type: "GET",
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) 
		            				el.options.add(new Option(res.data[i].sqmc, res.data[i].sqdm));
		            			me.filter(); //刷新列表
		            		}
		            		el.setAttribute('data-loaded', 'true');
		            	} else CxMsg.info('获取社区列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取社区列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	el.disabled = false;
		            }
		        });
			}
		},
		
		del: function(el, e) {
			let id = $(el).closest('tr').data('id');
			CxCtrl.confirm('是否确定删除此巡查设备？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/kfxt/sbxc/deleteXcsb'),
		            type: "GET",
		            data: {sbxcid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask1).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除巡查设备成功');
		            		me.refresh();
		            	} else CxMsg.error('删除巡查设备失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除巡查设备失败: ' + msg);
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


		
		filter: function() {
			let sqdm = document.querySelector(`${cntrSelector} .toolbar select[name=sqdm]`).value;
			me.filterData = {sqdm};
			if (me.filterData.sqdm) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/kfxt/sbxc/getXcsbCount'),
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
				    			me.goto(me.pager ? me.pager.pagination("page") : 0, me.pager.pagination("pageSize")); // 默认打开第一页
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
			}
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
			if (page < 0) page = 0;
			if (page > me.pager.pagination("lastPage")) page = me.pager.pagination("lastPage");
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/kfxt/sbxc/getXcsb'),
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
				let item = data[i];
				tmp.append(`<tr data-id="${item.sbxcid}">
						<td class="td-indexer">
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td><div class="thumbnail thumbnail-lg"><img class="c-pointer" src="${CxMisc.finalizeUrl(item.ewmurl?item.ewmurl:'/resources/img/no-pic.png')}" alt="二维码图片"></div></td>
						<td>${CxMisc.escapeHtml(item.xcsbbt)}</td>
						<td><pre class="mb-0 cx-f-1">${item.bz?item.bz:''}</pre></td>
						<td class="dl-item-cmd">
							<div class="btn-group" role="group" aria-label="操作按纽组">
								<button type="button" class="btn btn-outline-primary" data-cmd="dl">下载</button>
								<button type="button" class="btn btn-outline-primary" data-cmd="update">修改</button>
								<button type="button" class="btn btn-outline-danger" data-cmd="del">删除</button>
							</div>
							<a class="d-none" href="${CxMisc.finalizeUrl(item.ewmurl?item.ewmurl:'/resources/img/no-pic.png')}" download="${CxMisc.escapeHtml(item.xcsbbt)}.png">download</a>
						</td>
					</tr>`);
				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
			}
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			tmp.find('.thumbnail img').click(function(){ CxMisc.popImg(this); });
			tmp.find('td.dl-item-cmd button[data-cmd="dl"]').click(function(){ me.dlQrCode(this); });
			tmp.find('td.dl-item-cmd button[data-cmd="update"]').click(function(){ me.openEdit('update', $(this).closest('tr').data('json')); });
			tmp.find('td.dl-item-cmd button[data-cmd="del"]').click(function(e){ me.del(this, e); });
		},
		
		dlQrCode: function (el){
			$(el).closest('td').find('a[download]')[0].click();
		},
		openEdit: function (cmd, data) {
			let f = document.querySelector(dtlsFrmSelector);
			f.reset();
			f.cmd.value = cmd;
			
			if (cmd == 'create') {
				f.sbxcid.value = '';
				$(dtlsModalLblSelector).text('添加巡查设备');
			} else {
				f.sbxcid.value = data.sbxcid;
				f.xcsbbt.value = data.xcsbbt;
				if (data.bz) f.bz.value = data.bz;
				$(dtlsModalLblSelector).text('修改巡查设备');
			}
			$(dtlsModalSelector).modal('show');
		},

		
		submitXcsb: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			data.sqdm = document.querySelector(`${cntrSelector} .toolbar select[name=sqdm]`).value;
			let txt = data.cmd == 'create' ? '添加' : '修改';
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl(data.cmd == 'create' ? '/wygl/kfxt/sbxc/addXcsb' : '/wygl/kfxt/sbxc/updateXcsb'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info(txt + '成功');
			    		me.refresh();
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

	};
}

KfSbxcSbxc.bind();