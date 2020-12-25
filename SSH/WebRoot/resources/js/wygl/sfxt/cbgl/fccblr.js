if (typeof window.SfCbKhybCblr === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfCbKhybCblrCntr';
	const treeSelector = '#wgSfCbKhybCblrCntr .tv-wrapper';
	const inputFrmSelector = '#wgSfCbKhybCblrInputFrm';
	
	const mainTblClz = '.table-wgsf-khyb-cblr';
	const sbrSelector = '#wgSfCbKhybCblrCntr .col-limited-lg';
	const ctxSelector = '#wgSfCbKhybCblrCntr .col-extended-lg';
	//const filterFrmSelector = '#wgSfCbKhybCblrCntr .filterbar>form[data-type=filter]';
	
	const dateRegexp = /^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$/;
	
	const loadingMask1 = '#wgSfCbKhybCblrCntr';
	const loadingMask2 = '#wgSfCbKhybCblrCntr .col-extended-lg';
	
	let lastChecked = null;
	
	const me = window.SfCbKhybCblr = {
		filterData: null,
			
		bind: function() {
			CxWg.loadFcxxTree(treeSelector, {nodeSelected: me.nodeSelected, selectable: {'sq':true, 'qy': true, 'ly': true, 'dy':true, 'fc': true}});
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			//CxMisc.indicateFilter(cntrSelector, {expanded: true});
			//CxMisc.formValidated(filterFrmSelector, me.filter);
			
			let yblxdm = document.querySelector(`${cntrSelector} .toolbar select[name=yblxdm]`);
			CxMisc.getDmList(yblxdm, function(list){
				for (let i=0; i<list.length; i++) yblxdm.options.add(new Option(list[i].mc, list[i].dm));
				yblxdm.selectedIndex = 1; //默认选择第一项（水表） - 首次载入不触发查询
				me.cacheFilterData(yblxdm);
			});
			$(yblxdm).change(function(){ me.filter(this); });
			
			$(cntrSelector).find('.toolbar button[data-cmd=save]').click(function(){
				if (me.getSelectedNode()) me.save();
				else CxMsg.info('请先从房产资源树中选择任何节点开始');
			});
			$(cntrSelector).find('.toolbar button[data-cmd=copy]').click(function(){
				let i = this.getAttribute('data-row-index'), j = this.getAttribute('data-cell-index');
				if (i && j) {
					i = parseInt(i), j = parseInt(j);
					let src = $(cntrSelector).find(`${mainTblClz} tbody>tr:nth-child(${i+1})`), target = src.nextAll();
					if (src.find(`td:nth-child(${j+1}) select[name=ghbj]`).length == 0) { // 选中的不是下拉框（即是输入框）
						target.find(`td:nth-child(${j+1}) input`).val(src.find(`td:nth-child(${j+1}) input`).val());
					} else {// 选中的是更换新表下拉框
						target.find(`td:nth-child(${j+1}) select[name=ghbj]`).val(src.find(`td:nth-child(${j+1}) select[name=ghbj]`).val()).trigger('change');
					}
					this.removeAttribute('data-row-index');
					this.removeAttribute('data-cell-index');
				} else CxMsg.info('请先选择要开始一行的更换新表、上次抄表日期或本次抄表日期');
			});
			
			
		},
		refresh: function(){
			let node = me.getSelectedNode();
			if (node) me.fetch(node); //刷新列表
		},
		cacheFilterData: function(el) { // 每次查询后都缓存查询条件，给点击树节点时调用
			if (el.nodeName == 'FORM') me.filterData = $(el).serializeJson({removeBlankField:true});
			else {
				me.filterData = {};
				if (el.value) me.filterData[el.name] = el.value;
			}
		},
		filter: function(el) {
			me.cacheFilterData(el);
			let node = me.getSelectedNode();
			if (node) me.fetch(node);
			else CxMsg.info('请先从房产资源树中选择相应节点，然后再查询');
		},
		
		fetch: function(node) {
			let data = Object.assign({}, me.filterData);
			if (node.data.type == 'sq') data.sqdm = node.data.dm;
			else if (node.data.type == 'qy') data.qyid = node.data.id;
			else if (node.data.type == 'ly') data.lyid = node.data.id;
			else if (node.data.type == 'dy') data.dyid = node.data.id;
			else if (node.data.type == 'fc') data.fcid = node.data.id;
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/cbgl/fccblr/getCbjlList'),
			    type: "GET",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask2).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		let curr = me.getSelectedNode();
						if (!curr || curr.data.id != node.data.id) return; // 验证数据返回后当前选中的节点是否与提交时一样，不一致时丢弃数据
			    		if (res.data && res.data.length>0) {
			    			let tmp = $(cntrSelector).find(`${mainTblClz} tbody`).empty();
			    			for (let i=0; i<res.data.length; i++) {
			    				let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
			    				tmp.append(`<tr data-id="${item.khybcbid}">
			    						<td class="td-indexer">
				    						<span>${i+1}</span>
			    						</td>
			    						<td class="overflow-clip-left">${CxMisc.escapeHtml(item.fcmc)}</td>
			    						<td${khmcTitle}>${khmc}</td>
			    						<td>${item.yblxmc}</td>
			    						<td>${item.ybbh}</td>
			    						<td>${item.bl!==null&&item.bl!==undefined ? item.bl.toFixed(2) : ''}</td>
			    						<td><select class="custom-select custom-select-sm cx-f-nm" name="ghbj">
												<option value="0"${!item.ghbj||item.ghbj=='0' ? ' selected' : ''}>否</option>
												<option value="1"${item.ghbj=='1' ? ' selected' : ''}>是</option>
											</select>
			    						</td>
			    						<td>
			    						<input type="text" class="form-control form-control-sm text-right cx-f-1" name="jbyl" data-sn="1" value="${item.jbyl!==null&&item.jbyl!==undefined?item.jbyl:'0'}" pattern="^0|(0\\.\\d+)|([1-9]\\d*)|([1-9]\\d*\\.\\d+)$"${item.ghbj!='1' ? ' disabled' : ''} required>
			    						</td>
			    						<td class="td-date">
			    							<div class="input-group input-group-sm date" id="wgSfCbKhybCblrSqDtp${i}_p" data-target-input="nearest" data-cx-ctrl="date" data-init-value="${item.sqcbrq?item.sqcbrq:''}">
											    <input type="text" class="form-control datetimepicker-input cx-f-1" name="sqcbrq" data-target="#wgSfCbKhybCblrSqDtp${i}_p" maxlength="10" autocomplete="off"${item.ghbj!='1' ? ' disabled' : ''} novalidate>
											    <div class="input-group-append" data-target="#wgSfCbKhybCblrSqDtp${i}_p" data-toggle="datetimepicker">
											        <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
											    </div>
											</div>
			    						</td>
			    						<td class="td-date">
			    							<div class="input-group input-group-sm date" id="wgSfCbKhybCblrDtp${i}_p" data-target-input="nearest" data-cx-ctrl="date" data-init-value="${item.bqcbrq?item.bqcbrq:''}">
											    <input type="text" class="form-control datetimepicker-input cx-f-1" name="bqcbrq" data-target="#wgSfCbKhybCblrDtp${i}_p" maxlength="10" autocomplete="off" novalidate>
											    <div class="input-group-append" data-target="#wgSfCbKhybCblrDtp${i}_p" data-toggle="datetimepicker">
											        <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
											    </div>
											</div>
										</td>
										<td>
			    						<input type="text" class="form-control form-control-sm text-right cx-f-1" name="sqds" data-sn="2" value="${item.sqds!==null&&item.sqds!==undefined?item.sqds:'0'}" pattern="^0|(0\\.\\d+)|([1-9]\\d*)|([1-9]\\d*\\.\\d+)$"${item.ghbj!='1' ? ' disabled' : ''} required>
			    						</td>
			    						<td><input type="text" class="form-control form-control-sm text-right cx-f-1" name="bqds" value="${item.bqds!==null&&item.bqds!==undefined?item.bqds:''}" data-bqyl="${item.bqyl!==null&&item.bqyl!==undefined?item.bqyl:''}" data-sn="3" pattern="^0|(0\\.\\d+)|([1-9]\\d*)|([1-9]\\d*\\.\\d+)$"></td>
			    						<td data-field="bqyl">${item.bqyl!==null&&item.bqyl!==undefined?item.bqyl:''}</td>
			    						<td><input type="text" class="form-control form-control-sm cx-f-1" name="bz" value="${item.bz?item.bz:''}" data-sn="4"></td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
			    			}
			    			let dtp = tmp.find('div[data-cx-ctrl=date]');
			    			if (dtp.length > 0) {
				    			dtp.each(function() {
				    				let v = this.getAttribute('data-init-value');
				    				if (v && v != "") $(this).datetimepicker({format: 'YYYY-MM-DD', date: v});
				    				else $(this).datetimepicker({format: 'YYYY-MM-DD', date: null});
				    			});
				    			if (tmp.closest('.table-responsive').height() < 380) { // 解决dtp显示时因为table-responsive设置了overflow时超出表格部分会隐藏的问题
				    				tmp.find('div[data-cx-ctrl=date] button').click(function(){
					    				 $(this).closest('.table-responsive').addClass('max-height');
					    			}).on('blur', function(){
					    				 $(this).closest('.table-responsive').removeClass('max-height');
					    			});
				    				dtp.on('hide.datetimepicker', function(){ $(this).closest('.table-responsive').removeClass('max-height'); });
				    			}
			    			}
			    			tmp.find('select[name=ghbj]').change(function(){
			    				let tr = $(this).closest('tr'), disabled = this.value==0;
			    				let sqcbrq = tr.find('input[name=sqcbrq]')[0]; 
			    					sqds = tr.find('input[name=sqds]')[0]; 
			    				tr.find('input[name=jbyl]')[0].disabled = disabled;
			    				sqcbrq.disabled = disabled;
			    				sqds.disabled = disabled;
			    				if (disabled) { 
			    					let json = tr.data('json');
			    					sqcbrq.value = json.ysqcbrq; // 重新把值置为最原始数值
			    					sqds.value = json.ysqds;
			    					tr.find('input[name=bqds]').trigger('blur'); // 触发更改本期计数时方法
			    				}
			    			})
			    			tmp.find('input[name=sqds]').on('blur', function(){ // 触发更改本期计数时方法
			    				$(this).closest('tr').find('input[name=bqds]').trigger('blur');
			    			});
			    			tmp.find('select[name=ghbj],input[name=sqcbrq],input[name=bqcbrq]').on('blur', function(){
			    				$(cntrSelector).find('.toolbar button[data-cmd=copy]').attr('data-row-index', $(this).closest('tr').index())
			    																	.attr('data-cell-index', $(this).closest('td').index());
			    			});
			    			tmp.find('input[name=bqds]').on('blur', function(){
			    				this.value = this.value.trim();
			    				$(this).removeClass('is-invalid');
			    				if (this.value != '') {
			    					if ($(this).is(':valid')) {
					    				let tr = $(this).closest('tr'), sqds = parseFloat(tr.find('input[name=sqds]')[0].value), bqds = parseFloat(this.value);
					    				let ghbj = tr.find('select[name=ghbj]')[0].value == 1;
					    				//if (ghbj) {
					    				//	this.setAttribute('data-bqyl', bqds);
				    					//	tr.find('[data-field=bqyl]').text(bqds);
					    				//} else {
					    					if (bqds >= sqds) {
					    						this.setAttribute('data-bqyl', bqds - sqds);
					    						tr.find('[data-field=bqyl]').text(bqds - sqds);
					    					} else { 
					    						this.setAttribute('data-bqyl', '');
					    						tr.find('[data-field=bqyl]').text(''); 
					    						let now = new Date();
					    						if (lastChecked == null || now.getTime() - lastChecked.getTime() > 10000) { //短时间内不显示过多提示
					    							lastChecked = now;
					    							CxMsg.warn('本期读数不能小于上期读数'); 
					    						}
					    						$(this).addClass('is-invalid');
					    					}
					    				//}
			    					} else {
			    						this.setAttribute('data-bqyl', '');
			    						$(this).addClass('is-invalid');
			    						$(this).closest('tr').find('[data-field=bqyl]').text('');
			    					}
			    				} else {
			    					this.setAttribute('data-bqyl', '');
			    					$(this).closest('tr').find('[data-field=bqyl]').text('');
			    				}
			    			});
			    			tmp.find('input[data-sn]').keydown(function(e){
			    				let tr = $(this).closest('tr');
			    				if (tr.parent().children().length > 1) {
				    				if (e.keyCode == 13 || e.keyCode == 38 || e.keyCode == 40) {
				    					e.preventDefault();
				    					let sn = parseInt(this.getAttribute('data-sn')), ptr = tr.prev(), ntr = tr.next();
				    					if (e.keyCode == 38) {
				    						let input = null;
				    						if (ptr.length == 0) input = tr.parent().children(':last-child').find(`input[data-sn=${sn}]`)[0];
				    						else input = ptr.find(`input[data-sn=${sn}]`)[0];
				    						CxMisc.moveCaret2End(input);
				    					} else if (e.keyCode == 40) {
				    						let input = null;
				    						if (ntr.length == 0) input = tr.parent().children(':first-child').find(`input[data-sn=${sn}]`)[0];
				    						else input = ntr.find(`input[data-sn=${sn}]`)[0];
				    						CxMisc.moveCaret2End(input);
				    					} else { // 13
				    						if (this.getAttribute('name') == 'sqds') { //上次读数
				    							let ntd = $(this).closest('td').next(); // 本次读数必须在上次读数之后
				    							CxMisc.moveCaret2End(ntd.find(`input[data-sn=${sn+1}]`)[0]);
				    						} else if (this.getAttribute('name') == 'bqds') {
				    							let ptd = $(this).closest('td').prev(); // 上次读数必须在本次读数之前
				    							if (ptd.find(`input[data-sn=${sn-1}]`)[0].disabled)
				    								CxMisc.moveCaret2End(ntr.find(`input[data-sn=${sn}]`)[0]);
				    							else 
				    								CxMisc.moveCaret2End(ntr.find(`input[data-sn=${sn-1}]`)[0]);
				    						} else {
					    						if (ntr.length > 0) {
					    							CxMisc.moveCaret2End(ntr.find(`input[data-sn=${sn}]`)[0]);
						    					}
				    						}
				    					}
		                            }
			    				}
			    			});
			    		} else {
			    			$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="14" class="table-empty">暂无数据</td></tr>');
			    		}
			    	} else {
			    		CxMsg.error('载入失败：' + res.message);
			    		$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="14" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="14" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$(loadingMask2).mask('hide');
			    }
			});
		},
		
		getSelectedNode: function() {
			if ($(treeSelector).hasClass('treeview')) {
				let selecteds = $(treeSelector).treeview('getSelected');
				if (selecteds.length > 0) return selecteds[0];
			}
			return null;
		},
		
		nodeSelected: function(node) {
			me.fetch(node); //刷新列表
		},
		
		save: function() {
			let f = document.querySelector(inputFrmSelector), 
				trs = f.querySelectorAll('table.table-wgsf-khyb-cblr>tbody>tr');
			if (me.validate(f, trs)) {
				let data = [];
				for (let i=0; i<trs.length; i++) {
					let ghbj = trs[i].querySelector('select[name=ghbj]').value, 
						jbyl = trs[i].querySelector('input[name=jbyl]').value, 
						sqcbrq = trs[i].querySelector('input[name=sqcbrq]').value, 
						sqds = trs[i].querySelector('input[name=sqds]').value,
						bqcbrq = trs[i].querySelector('input[name=bqcbrq]').value, 
						bqds = trs[i].querySelector('input[name=bqds]').value,
						bqyl = trs[i].querySelector('input[name=bqds]').getAttribute('data-bqyl'),
						bz = trs[i].querySelector('input[name=bz]').value;
					if (bqcbrq != "" && bqds != "") {
						let json = $(trs[i]).data('json'), fields = [];
						fields.push(json.khybcbid);
						fields.push(json.khybid);
						fields.push(json.sqcbid);
						//if (ghbj == '0') { // 设为否时取原始数据（可能用户保存过数据也不采用）
						//	fields.push(json.ysqcbrq); //重新把值置为最原始数值
						//	fields.push(json.ysqds);
						//} else {
							fields.push(sqcbrq);
							fields.push(sqds);
						//}
						fields.push(bqcbrq);
						fields.push(bqds);
						fields.push(bqyl);
						//fields.push(json.ghid);
						//fields.push(json.ghbj);
						//fields.push(json.jbyl);
						fields.push(ghbj);
						fields.push(jbyl);
						//fields.push(json.sjyl);
						if (ghbj == '1') fields.push(bqyl+jbyl);
						else fields.push(bqyl);
						fields.push(bz);
						data.push(fields.join('&0ie9&'));
					}
				}
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/cbgl/fccblr/saveFccblr'),
				    type: "POST",
				    data: {cbjlmx: data.join('@0ie9@')},
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart($(cntrSelector).find('.toolbar button[data-cmd=save]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		CxMsg.info('抄表录入保存成功');
				    		me.refresh();
				    	} else {
				    		CxMsg.warn('抄表录入保存失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.warn('抄表录入保存失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	CxMisc.markAjaxEnd($(cntrSelector).find('.toolbar button[data-cmd=save]'));
				    }
				});
			}
		},
		
		validate: function(f, trs){
			if (CxMisc.validate(f)) {
				let ok = true;
				for (let i=0; i<trs.length; i++) {
					let sqcbrq = trs[i].querySelector('input[name=sqcbrq]'), 
						sqds = trs[i].querySelector('input[name=sqds]'),
						ghbj = trs[i].querySelector('select[name=ghbj]'),
						bqcbrq = trs[i].querySelector('input[name=bqcbrq]'), 
						bqds = trs[i].querySelector('input[name=bqds]');
					/*if (bqds.value != '' && bqds.getAttribute('data-bqyl') == '') {
						CxMsg.warn('请检查读数是否正确');
						bqds.scrollIntoView(true);
						$(bqds).addClass('is-invalid').focus();
						ok = false;
						break;
					}*/
					if (ghbj.value == '1') {
						if (sqcbrq.value == "" || sqds.value == "") {
							let idx = $(bqds).closest('tr').find('td.td-indexer span').text();
							CxMsg.warn(`更换新表时，上次抄表日期与上次读数都必须填写，请检查第${idx}行房产是否漏填信息`);
							sqds.scrollIntoView(true);
							$(sqds).focus();
							ok = false;
							break;
						}
					}
					if (bqcbrq.value == "" && bqds.value != "" || bqcbrq.value != "" && bqds.value == "") {
						let idx = $(bqds).closest('tr').find('td.td-indexer span').text();
						CxMsg.warn(`日期与读数必须同时填写，请检查第${idx}行房产是否漏填信息`);
						bqds.scrollIntoView(true);
						$(bqds).focus();
						ok = false;
						break;
					}
					if (bqcbrq.value != "" && !dateRegexp.test(bqcbrq.value)) {
						CxMsg.warn('日期格式不正确');
						bqcbrq.scrollIntoView(true);
						$(bqcbrq).focus();
						ok = false;
						break;
					}
				}
				return ok;
			} else {
				CxMsg.warn('请先修正或删除有错误的输入框后再保存');
				return false;
			}
		}
	};
}

SfCbKhybCblr.bind();