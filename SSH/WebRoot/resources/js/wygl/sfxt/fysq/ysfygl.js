if (typeof window.SfFyYsfygl === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfFyYsfyglCntr';
	const treeSelector = '#wgSfFyYsfyglCntr .tv-wrapper';

	const editModalSelector = '#wgSfFyYsfyglModalDtls';
	const editFrmSelector = '#wgSfFyYsfyglDtlsFrm';
	
	const wyjModalSelector = '#wgSfFyYsfyglWyjModalDtls';
	const wyjFrmSelector = '#wgSfFyYsfyglWyjDtlsFrm';
	
	const mainTblClz = '.table-wgsf-fy-ysfygl';
	const idPrefix = 'wgSfFyYsfygl';
	const sbrSelector = '#wgSfFyYsfyglCntr .col-limited-lg';
	const ctxSelector = '#wgSfFyYsfyglCntr .col-extended-lg';
	
	const loadingMask1 = '#wgSfFyYsfyglCntr';
	const loadingMask2 = '#wgSfFyYsfyglCntr .col-extended-lg';
	
	const me = window.SfFyYsfygl = {
		pager: null,
		filterData: null,
		
		bind: function() {
			CxWg.loadFcxxTree(treeSelector, {nodeSelected: me.nodeSelected});
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			
			CxMisc.bindCheckAll(cntrSelector);
			
			$(cntrSelector).find('.toolbar button[data-cmd=open-scwyj]').click(function(){ // ysfy
				me.openScWyj();
			});
			$(cntrSelector).find('.toolbar button[data-cmd=del]').click(function(e){
				me.delYsfy(this, 'batch', e);
			});
			
			$(`${wyjModalSelector} input[data-cx-ctrl="fcxx-tree"]`).fcxxTree({ensureSqdm: true});
			$(`${wyjModalSelector}`).find('div.date[data-cx-ctrl="date"]').datetimepicker({
		        format: 'YYYY-MM-DD', date: null // 必须设置为空，否则会自动选择当天日期
			});
			CxMisc.formValidated(wyjFrmSelector, function(f){ me.submitYsfyWyj(f); });
			$(`${wyjModalSelector}`).on('show.bs.modal', function (e) { CxMisc.clearValidation(this); });
			
			$(`${editModalSelector}`).find('select[name=fylxdm]').change(function(){
				me.loadJgSfxm(this);
			});
			$(`${editModalSelector}`).find('select[name=sfxmdm]').change(function(){
				me.switchYsfySfxm(this);
			});
			$(`${editModalSelector}`).find('select[name=khid], select[name=sfbzid]').change(function(){
				me.switchYsfySfbz(this);
			});
			$(`${editModalSelector}`).find('input[name=jfzqq], input[name=jfzqz]').on('input', function(){
				me.inputYsfyJfzq(this);
			});
			$(`${editModalSelector}`).find('div.date[data-cx-ctrl="date-month"]').datetimepicker({
		        format: 'YYYY-MM', date: null // 必须设置为空，否则会自动选择当天日期
			});
			$(`${editModalSelector}`).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD', date: null // 必须设置为空，否则会自动选择当天日期
			});
			CxMisc.formValidated(editFrmSelector, function(f){ me.submitEdit(f); });
			$(`${editModalSelector}`).on('show.bs.modal', function (e) { 
				me.lazyLoad(this);
				CxMisc.clearValidation(this); 
			}); //默认任何modal显示时把上次验证结果去掉
		},

		refresh: function(){
			let node = me.getSelectedNode();
			if (node && node.data.type == 'fc') me.fetch(node); //刷新列表
		},
		
		clearStatus: function() { // 需要重新载入的数据，清除已存在的数据与状态
			let el = document.querySelector(`${editFrmSelector} select[name=khid]`); // 客户状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
		},
		
		lazyLoad: function(m) {
			let node = me.getSelectedNode();
			if (node && node.data.type == 'fc') {
				me.loadKhxx(node.data.id, m);
			}
			CxMisc.loadAllDmList(m);
		},
		
		getSelectedNode: function() {
			let selecteds = $(treeSelector).treeview('getSelected');
			if (selecteds.length > 0) return selecteds[0];
			else return null;
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
		
		nodeSelected: function(node) {
			me.clearStatus(); // 选中任何节点都清除状态
			me.fetch(node); //刷新列表
		},
		
		fetch: function(node) {
			let cols = $(cntrSelector).find(`${mainTblClz} thead>tr>th`).length,
				emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fy/getYsfy'),
			    type: "GET",
			    data: {fcid: node.data.id, ztbj: '0', pxfs: '01'},
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask2).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	let curr = me.getSelectedNode();
	    			if (curr && curr.data.id == node.data.id) { // 再次检查当前选中的节点是否是提交时的一致，不一致即放弃返回数据（可能是用户短时间内频繁点击多个节点造成）
			    		if (res.code == "0") {
			    			if (res.data && res.data.length>0) {
				    			let tmp = $(cntrSelector).find(`${mainTblClz} tbody`).empty();
				    			for (let i=0; i<res.data.length; i++) {
				    				let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
				    				tmp.append(`<tr data-id="${item.ysfyid}">
				    						<td class="td-indexer">
					    						<input type="checkbox" id="${idPrefix}Indexer-${i}" name="${idPrefix}Indexer${i}">
									            <label for="${idPrefix}Indexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
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
				    						<td class="dl-item-cmd">
				    							<div class="btn-group" role="group" aria-label="操作按纽组">
				    								<button type="button" class="btn btn-outline-primary" data-cmd="update">修改</button>
				                                	<button type="button" class="btn btn-outline-danger" data-cmd="del">删除</button>
				    							</div>
				    						</td>
				    					</tr>`);
				    				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
				    			}
				    			tmp.find('td.dl-item-cmd button[data-cmd=update]').click(function(){ me.openYsfyEdit('update', this); });
				    			tmp.find('td.dl-item-cmd button[data-cmd=del]').click(function(e){ me.delYsfy(this, 'single', e); });
				    		} else {
				    			$(cntrSelector).find(`${mainTblClz} tbody`).empty().append(emptyTmpl);
				    		}
				    	} else {
				    		CxMsg.error('载入失败：' + res.message);
				    		$(cntrSelector).find(`${mainTblClz} tbody`).empty().append(emptyTmpl);
				    	}
	    			}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$(cntrSelector).find(`${mainTblClz} tbody`).empty().append(emptyTmpl);
			    },
			    complete: function(xhr, ts) {
			    	$(loadingMask2).mask('hide');
			    }
			});
		},
		
		
		delYsfy: function(el, type, e) {
			let checkedIds = null;
			if (type == 'single') {
				checkedIds = [$(el).closest('tr').data('id')];
			} else { //batch
				checkedIds = CxMisc.getCheckedIds($(`${cntrSelector} .main-content`));
			}
			if (checkedIds && checkedIds.length>0) {
				CxCtrl.confirm(type == 'single' ? '是否确定删除所选该收费？' : '是否确定删除所选收费？', function(src){
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
			            		me.refresh(); //刷新列表
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
			    	placement: type == 'single' ? 'top' : 'bottom'
			    });
			} else {
				CxMsg.info('请先选择至少一项收费');
			}
		},
		
		openYsfyEdit: function(cmd, el) {
			let node = me.getSelectedNode();
			if (node && node.data.type == 'fc') {
				let f = document.querySelector(editFrmSelector);
				f.reset();
				f.cmd.value = cmd;
				
				if (cmd == 'update') {
					let data = $(el).closest('tr').data('json');
					
					f.fcid.value = node.data.id;
					f.sqdm.value = me.getAncestor(node, 'sq').data.dm;
					// f.ztbj.value = '0';
					f.fcmc.value = me.genFcmc();
					f.ysfyid.value = data.ysfyid;
					f.ysfypzid.value = data.ysfypzid;
					
					if ($(f.khid).data('loaded')) {
						CxMisc.selectSelect('khid', data.khid, f);
					} else f.khid.setAttribute('data-selected-value', data.khid); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
					
					if ($(f.fylxdm).data('loaded')) {
						CxMisc.selectSelect('fylxdm', data.fylxdm, f);
					} else f.fylxdm.setAttribute('data-selected-value', data.fylxdm);
					
					if ($(f.sfxmdm).data('loaded')) {
						CxMisc.selectSelect('sfxmdm', data.sfxmdm, f);
					} else f.sfxmdm.setAttribute('data-selected-value', data.sfxmdm);
					
					if (data.jfzqq) $('#wgSfFyYsfygl_jfzqq_p').datetimepicker('date', data.jfzqq);
					if (data.jfzqz) $('#wgSfFyYsfygl_jfzqz_p').datetimepicker('date', data.jfzqz);
					if (data.ysrq) $('#wgSfFyYsfygl_ysrq_p').datetimepicker('date', data.ysrq);
					if (data.sfzdy) $('#wgSfFyYsfygl_sfzdy_p').datetimepicker('date', data.sfzdy);
					
					if ($(f.sfbzid).data('loaded')) {
						CxMisc.selectSelect('sfbzid', data.sfbzid, f);
					} else f.sfbzid.setAttribute('data-selected-value', data.sfbzid);
					if (data.fyje) {
						f.fyje.value = data.fyje;
						f.fyje.setAttribute('data-init-fyje', 'Y'); // 标明是修改时第一次载入，在第一次默认的查询收费标准金额后，不覆盖该数值 
					}
					if (data.sfsm) f.sfsm.value = data.sfsm;
				}
				$(editModalSelector).modal('show');
			} else CxMsg.info('请先从房产资源树中选择房产');
		},
		
		openScWyj: function(){
			let tv = $(`${wyjModalSelector} input[data-cx-ctrl="fcxx-tree"]`);
			if (tv.fcxxTree('initialized')) {
				tv.fcxxTree('clear');
			}
			$(`${wyjModalSelector} div.date[data-cx-ctrl="date"]`).datetimepicker('clear');
			$(wyjModalSelector).modal('show');
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
		loadJgSfxm: function(src) {
			let fylxdm = src, sfxmdm = src.form.sfxmdm;
			for (let i=sfxmdm.options.length-1; i>0; i--) sfxmdm.remove(i);
			if (fylxdm.value != '') {
				let data = {sqdm: me.getAncestor(me.getSelectedNode(), 'sq').data.dm, fylxdm: fylxdm.value};
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfxm'),
		            type: "GET",
		            data: data,
		            beforeSend: function(xhr, cfg) {
		            	sfxmdm.disabled = true;
		            	fylxdm.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) {
		            				sfxmdm.options.add(new Option(res.data[i].sfxmmc, res.data[i].sfxmdm));
		            			}
		            		}
		            		if (sfxmdm.getAttribute('data-selected-value')) {
	        					$(sfxmdm).val(sfxmdm.getAttribute('data-selected-value')).removeAttr('data-selected-value');
	        					if (sfxmdm.selectedIndex == -1) sfxmdm.selectedIndex = 0;
	        					$(sfxmdm).trigger('change');
	        				}
		            	} else CxMsg.info('获取收费项目列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取收费项目列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	sfxmdm.disabled = false;
		            	fylxdm.disabled = false;
		            }
		        });
			}
		},
		switchYsfySfxm: function(src) {
			let f = src.form, el = f.sfbzid;
			for (let i=el.options.length-1; i>0; i--) el.remove(i);
			if (src.value != '') {
				let data = {sqdm: me.getAncestor(me.getSelectedNode(), 'sq').data.dm, sfxmdm:src.value, fcid: f.fcid.value, khid: f.khid.value, fylxdm:f.fylxdm.value};
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfbzBySfxmdm'),
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
		            				el.options.add(new Option(res.data[i].sfbzmc, res.data[i].sfbzid));
		            			}
		            		}
		            		if (el.getAttribute('data-selected-value')) {
	        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
	        					if (el.selectedIndex == -1) el.selectedIndex = 0;
	        					$(el).trigger('change');
	        				}
		            	}
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取收费标准列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	el.disabled = false;
		            	src.disabled = false;
		            	f.sfxmdm.disabled = true; // 不能修改费用类型和收费项目
		            	f.fylxdm.disabled = true;
		            	f.khid.disabled = true;
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
		            	//f.khid.disabled = true;
		            	f.sfbzid.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		f.sfbzid.setAttribute('data-current-sfbzid-je', res.data); //保存当前sfbzid单位金额
		            		if (f.fyje.getAttribute('data-init-fyje')) { // 打开时默认查询一次金额，此时不覆盖原金额
		            			f.fyje.removeAttribute('data-init-fyje');
		            		} else {
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
		            	}
		            },
		            complete: function(xhr, ts) {
		            	//f.khid.disabled = false;
		            	f.sfbzid.disabled = false;
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
			    		me.refresh();
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
		
		
		submitEdit: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true}), ok = true;
			let txt = data.cmd == 'create' ? '添加' : '修改';
			// 20200524: 修改计费周期以下限制
			if (f.sfxmdm.value != '12' &&f.sfxmdm.value != '13' &&f.sfxmdm.value != '14' && f.sfxmdm.value != '15') {
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
				    data: Object.assign({}, {sfxmdm: f.sfxmdm.value}, data),
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		if (res.data > 0) {
				    			CxCtrl.confirm('该收费项目对应计费周期已存在，是否确定继续修改？', function(src){
				    				me._submitEdit(data, frm, txt);
							    }, {
							    	evt: window.event,
							    	src: frm.find('button[type=submit]')[0],
							    	placement: 'top'
							    });
				    		} else {
				    			setTimeout(function(){me._submitEdit(data, frm, txt);}, 400);
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
		_submitEdit: function(data, frm, txt){
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
SfFyYsfygl.bind();