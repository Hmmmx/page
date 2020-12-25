if (typeof window.KfBmglSqbm === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgKfBmglSqbmCntr';
	const dtlsModalSelector = '#wgKfBmglSqbmModalDtls';
	const dtlsModalLblSelector = '#wgKfBmglSqbmModalDtlsLabel';
	const dtlsFrmSelector = '#wgKfBmglSqbmDtlsFrm';
	const staffModalSelector = '#wgKfBmglSqbmModalStaff';
	const staffFrmSelector = '#wgKfBmglSqbmStaffFrm';
	
	const staffListWrapper = `${staffModalSelector} .modal-body .cx-editable-list`;
	
	const mainTblClz = '.table-wgkf-bmgl-sqbm';
	
	const loadingMask1 = '#wgKfBmglSqbmCntr';
	
	const me = window.KfBmglSqbm = {
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
			CxMisc.formValidated(dtlsFrmSelector, me.submitBm);
			
			CxMisc.formValidated(staffFrmSelector, me.submitBmhy);
			
			$(dtlsModalSelector).on('show.bs.modal', function (e) { 
				CxMisc.loadAllDmList(this);
				CxMisc.clearValidation(this); 
			}); // 打开时加载相应有待选代码列表：select[data-lazy-load]
			$(staffFrmSelector).on('show.bs.modal', function (e) {
				CxMisc.clearValidation(this); 
			}); 
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
			CxCtrl.confirm('是否确定删除此部门？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/kfxt/bmgl/deleteSqbm'),
		            type: "GET",
		            data: {sqbmid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask1).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除部门成功');
		            		me.refresh();
		            	} else CxMsg.error('删除部门失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除部门失败: ' + msg);
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

		delBmhy: function(e, el){
			let id = $(el).data('id');
			CxCtrl.confirm('是否确定删除此职员？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/kfxt/bmgl/deleteBmhy'),
		            type: "GET",
		            data: {hysqid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(staffListWrapper).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除职员成功');
		            		me.fetchBmhy(el.form.sqbmid.value);
		            	} else CxMsg.error('删除职员失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除职员失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	$(staffListWrapper).mask('hide');
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
				    url: CxMisc.finalizeUrl('/wygl/kfxt/bmgl/getBmxx'),
				    type: "GET",
				    data: me.filterData,
				    beforeSend: function(xhr, cfg) {
				    	$(loadingMask1).mask('show');
				    },
				    success: function(res, ts) {
				    	if (res.code == "0" && res.data) {
				    		$(`${cntrSelector} ${mainTblClz} tbody>tr:not(.table-row-no-data)`).remove();
				    		if (res.data && res.data.length>0) me.render(res.data);
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
		
		render: function(data) {
			let tmp = $(`${cntrSelector} ${mainTblClz} tbody`);
			for (let i=0; i<data.length; i++) {
				let item = data[i];
				tmp.append(`<tr data-id="${item.sqbmid}">
						<td class="td-indexer">
    						<span>${i+1}</span>
						</td>
						<td class="overflow-clip-left">${item.sqbmmc}</td>
						<td>${item.zgmc?CxMisc.escapeHtml(item.zgmc):(item.zgdm?item.zgdm:'')}</td>
						<td>${item.sjzgmc?CxMisc.escapeHtml(item.sjzgmc):(item.sjzgdm?item.sjzgdm:'')}</td>
						<td>${me.interpretBmbj(item.slbmbj)}</td>
						<td class="dl-item-cmd">
							<div class="btn-group" role="group" aria-label="操作按纽组">
								<button type="button" class="btn btn-outline-primary" data-cmd="staff">职员</button>
								<button type="button" class="btn btn-outline-primary" data-cmd="update">修改</button>
								<button type="button" class="btn btn-outline-danger" data-cmd="del">删除</button>
							</div>
						</td>
					</tr>`);
				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
			}
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			tmp.find('td.dl-item-cmd button[data-cmd="staff"]').click(function(){ me.openStaff($(this).closest('tr').data('json')); });
			tmp.find('td.dl-item-cmd button[data-cmd="update"]').click(function(){ me.openEdit('update', $(this).closest('tr').data('json')); });
			tmp.find('td.dl-item-cmd button[data-cmd="del"]').click(function(e){ me.del(this, e); });
		},

		interpretBmbj: function(slbmbj){
			switch(slbmbj){
			case '0': return '默认';
			case '1': return '客服';
			case '2': return '抄表';
			}
			return '';
		},
		
		
		
		fetchBmhy: function(sqbmid){
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/kfxt/bmgl/getBmhy'),
			    type: "GET",
			    data: {sqbmid},
			    beforeSend: function(xhr, cfg) {
			    	$(staffListWrapper).mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		let tmp = $(staffListWrapper).empty();
			    		if (res.data.length>0) {
				    		for (let i=0; i<res.data.length; i++) {
				    			let item = res.data[i];
				    			tmp.append(`<div data-item-type="bmhy">
		                        		<div><span>${item.wyhymc?(item.wyhymc+' ('+ item.wyhydm +')'):item.wyhydm}</span></div>
		                        		<div><button type="button" class="btn btn-outline-danger" data-cmd="del" data-id="${item.hysqid}"><span>删除</span></button></div>
		                        	</div>`);
				    		}
				    		me._bindBmhyCmd($(staffListWrapper).children());
			    		} else {
			    			tmp.append(`<div>
	                        		<div class="text-center text-black-50"><span>暂无职员</span></div>
	                        	</div>`);
			    		}
			    	} else {
			    		CxMsg.warn('查询部门职员失败, 请稍后重新打开：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询部门职员失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$(staffListWrapper).mask('hide');
			    }
			});
		},
		openStaff: function (data) {
			let f = document.querySelector(staffFrmSelector);
			f.reset();
			f.sqbmid.value = data.sqbmid;
			$(wgKfBmglSqbmModalStaffLabel).text('部门职员管理 - ' + data.sqbmmc);
			$(staffModalSelector).modal('show');
			
			setTimeout(function(){me.fetchBmhy(data.sqbmid);}, 400);
		},
		submitBmhy: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			data.sqdm = document.querySelector(`${cntrSelector} .toolbar select[name=sqdm]`).value;
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/kfxt/bmgl/addBmhy'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info('添加成功');
			    		f.wyhydm.value = '';
			    		me.fetchBmhy(f.sqbmid.value);
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
		_bindBmhyCmd: function(wrap){
			$(wrap).find('button[data-cmd=del]').click(function(e){
				me.delBmhy(e, this);
			});
		},
		
		
		openEdit: function (cmd, data) {
			let f = document.querySelector(dtlsFrmSelector);
			f.reset();
			f.cmd.value = cmd;
			
			if (cmd == 'create') {
				f.sqbmid.value = '';
				$(dtlsModalLblSelector).text('添加部门');
			} else {
				f.sqbmid.value = data.sqbmid;
				f.sqbmmc.value = data.sqbmmc;
				if (data.zgdm) f.zgwyhydm.value = data.zgdm;
				if (data.sjzgdm) f.sjzgwyhydm.value = data.sjzgdm;
				//CxMisc.selectRadio('slbmbj', data.slbmbj, f);
				CxMisc.selectSelect('slbmbj', data.slbmbj, f);
				
				$(dtlsModalLblSelector).text('修改部门');
			}
			$(dtlsModalSelector).modal('show');
		},

		
		submitBm: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			data.sqdm = document.querySelector(`${cntrSelector} .toolbar select[name=sqdm]`).value;
			let txt = data.cmd == 'create' ? '添加' : '修改';
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl(data.cmd == 'create' ? '/wygl/kfxt/bmgl/addSqbm' : '/wygl/kfxt/bmgl/updateSqbm'),
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
		},

	};
}

KfBmglSqbm.bind();