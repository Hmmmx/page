if (typeof window.SfCbKhyb === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfCbKhybCntr';
	const treeSelector = '#wgSfCbKhybCntr .tv-wrapper';
	const dtlsModalSelector = '#wgSfCbKhybModalDtls';
	const dtlsModalLblSelector = '#wgSfCbKhybModalDtlsLabel';
	const dtlsFrmSelector = '#wgSfCbKhybDtlsFrm';
	const batchModalSelector = '#wgSfCbKhybBatchModalDtls';
	const batchFrmSelector = '#wgSfCbKhybBatchDtlsFrm';
	const cbjlModalSelector = '#wgSfCbKhybCbjlModalDtls';
	
	const mainTblClz = '.table-wgsf-khyb';
	const idPrefix = 'wgSfCbKhyb';
	
	const loadingMask1 = '#wgSfCbKhybCntr';
	const loadingMask2 = '#wgSfCbKhybCntr .col-extended-lg';
	
	const dateRegexp = /^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$/;
	let lastChecked = null;
	
	const me = window.SfCbKhyb = {
		bind: function() {
			CxWg.loadFcxxTree(treeSelector, {nodeSelected: me.nodeSelected});
			me.preLoad(); // 预先载入数据，优化页面显示效果
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.bindCheckAll(cntrSelector);
			
			$(cntrSelector).find('.toolbar button[data-cmd=open-add]').click(function(){
				let node = me.getSelectedNode();
				if (node && node.data.type == 'fc') me.openEdit('create', node, this);
				else CxMsg.info('请先从房产资源树中选择房产');
			});
			$(cntrSelector).find('.toolbar button[data-cmd=open-batch-add]').click(function(){
				me.openBatchEdit();
			});
			
			CxMisc.formValidated(dtlsFrmSelector, function(f){ me.submit(f); });
			$(dtlsModalSelector).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			$(dtlsModalSelector).on('show.bs.modal', function (e) { me.lazyLoad(this); });
			$(dtlsModalSelector).on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
			
			CxMisc.formValidated(batchFrmSelector, function(f){ me.submitBatch(f); });
			$(`${batchFrmSelector} input[data-cx-ctrl=fcxx-tree]`).on('input', function(){
				me.loadSfbz($(this).fcxxTree('sqdm'), batchModalSelector);
			}).fcxxTree();
			$(batchModalSelector).on('show.bs.modal', function (e) { me.lazyLoadBatch(this); });
			$(batchModalSelector).on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
		refresh: function(){
			let node = me.getSelectedNode();
			if (node && node.data.type == 'fc') me.fetch(node); //刷新列表
		},
		
		clearStatus: function() { // 需要重新载入的数据，清除已存在的数据与状态
			let el = document.querySelector(`${dtlsFrmSelector} select[name=khid]`); // 客户状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
			
			el = document.querySelector(`${dtlsFrmSelector} select[name=sfbzid]`); // 收费标准状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
		},
		
		del: function(el, e) {
			let id = $(el).closest('tr').data('id');
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此仪表？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/cbgl/khyb/deleteKhyb'),
		            type: "GET",
		            data: {khybid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask2).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除仪表成功');
		            		me.refresh();
		            	} else CxMsg.error('删除仪表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除仪表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	$(loadingMask2).mask('hide');
		            }
		        });
		    }, {
		    	evt: evt,
		    	src: el,
		    	placement: 'top'
		    });
		},
		
		fetch: function(node) {
			CxMisc.resetCheckAll(cntrSelector);
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/cbgl/khyb/getKhybList'),
			    type: "GET",
			    data: {fcid: node.data.id},
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask2).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	let curr = me.getSelectedNode();
			    	if (!curr || curr.data.id != node.data.id) return; // 验证数据返回后当前选中的节点是否与提交时一样，不一致时丢弃数据
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let tmp = $(cntrSelector).find(`${mainTblClz} tbody`).empty();
			    			for (let i=0; i<res.data.length; i++) {
				    			let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
			    				tmp.append(`<tr data-id="${item.khybid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="${idPrefix}Indexer-${i}" name="${idPrefix}Indexer${i}">
								            <label for="${idPrefix}Indexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td${khmcTitle}>${khmc}</td>
			    						<td>${CxMisc.escapeHtml(item.ybbh)}</td>
			    						<td>${item.yblxmc}</td>
			    						<td title="${CxMisc.escapeHtml(item.sfbzmc)}">${CxMisc.escapeHtml(item.sfbzmc)}</td>
			    						<td>${item.ksrq ? CxMisc.formatDate(item.ksrq, 'short') : ''}</td>
			    						<td>${item.jsrq ? CxMisc.formatDate(item.jsrq, 'short') : ''}</td>
			    						<td>${item.yxbj == '0' ? '无效' : '有效'}</td>
			    					    <td class="dl-item-cmd">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			    								<button type="button" class="btn btn-outline-primary" data-cmd="open-cbjl">抄表记录</button>
			    								<button type="button" class="btn btn-outline-primary" data-cmd="update">修改</button>
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="del">删除</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
			    			}
			    			tmp.find('td.dl-item-cmd button[data-cmd="open-cbjl"]').click(function(){ me.openCbjl($(this).closest('tr').data('id')); });
			    			tmp.find('td.dl-item-cmd button[data-cmd=update]').click(function(){ me.openEdit('update', this); });
			    			tmp.find('td.dl-item-cmd button[data-cmd=del]').click(function(){ me.del(this); });
			    		} else {
			    			$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    		}
			    	} else {
			    		CxMsg.error('载入失败：' + res.message);
			    		$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$(cntrSelector).find(`${mainTblClz} tbody`).empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$(loadingMask2).mask('hide');
			    }
			});
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
		
		lazyLoadBatch: function(m) {
			CxMisc.loadAllDmList(m);
		},
		lazyLoad: function(m) {
			let node = me.getSelectedNode();
			if (node && node.data.type == 'fc') {
				me.loadKhxx(node.data.id);
				me.loadSfbz(me.getAncestor(node, 'sq').data.dm, dtlsModalSelector);
			}
			CxMisc.loadAllDmList(m);
		},
		loadKhxx: function(fcid) {
			let el = document.querySelector(`${dtlsFrmSelector} select[name=khid]`);
			if (el.getAttribute('data-loaded') != 'true') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhxxList'),
		            type: "GET",
		            data: {fcid: fcid, lite: true},
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
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
		            	el.disabled = false;
		            }
		        });
			}
		},
		loadSfbz: function(sqdm, m) {
			let el = document.querySelector(`${m} select[name=sfbzid]`);
			if (el.getAttribute('data-loaded') != 'true') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfbz'),
		            type: "GET",
		            data: {sqdm: sqdm, fylxdmStr: '02'},
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) 
		            				el.options.add(new Option(res.data[i].sfbzmc, res.data[i].sfbzid));
		            			if (el.getAttribute('data-selected-value')) {
		        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
		        					if (el.selectedIndex == -1) el.selectedIndex = 0;
		        				}
		            		}
		            		el.setAttribute('data-loaded', 'true');
		            	} else CxMsg.info('获取收费标准列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取收费标准列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	el.disabled = false;
		            }
		        });
			}
		},

		nodeSelected: function(node) {
			if (node.data.type == 'fc') {
				me.clearStatus();
				me.fetch(node); //刷新列表
			}
		},
		
		openCbjl: function(id) {
			$(`${cbjlModalSelector} .table tbody>tr:not(.table-row-no-data)`).remove();
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/cbgl/khyb/getKhybmxList'),
			    type: "GET",
			    data: {khybid: id},
			    beforeSend: function(xhr, cfg) {
			    	$(`${cbjlModalSelector} .table`).mask('show', {msg: '查询中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let tmp = $(`${cbjlModalSelector} .table tbody`);
			    			for (let i=0; i<res.data.length; i++) {
				    			let item = res.data[i], khmc=CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
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
			    							<div class="input-group input-group-sm date" id="wgSfCbKhybCbjlSqDtp${i}_p" data-target-input="nearest" data-cx-ctrl="date" data-init-value="${item.sqcbrq?item.sqcbrq:''}">
											    <input type="text" class="form-control datetimepicker-input cx-f-1" name="sqcbrq" data-target="#wgSfCbKhybCbjlSqDtp${i}_p" maxlength="10" autocomplete="off"${item.ghbj!='1' ? ' disabled' : ''} novalidate>
											    <div class="input-group-append" data-target="#wgSfCbKhybCbjlSqDtp${i}_p" data-toggle="datetimepicker">
											        <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
											    </div>
											</div>
			    						</td>
			    						<td class="td-date">
			    							<div class="input-group input-group-sm date" id="wgSfCbKhybCbjlDtp${i}_p" data-target-input="nearest" data-cx-ctrl="date" data-init-value="${item.bqcbrq?item.bqcbrq:''}">
											    <input type="text" class="form-control datetimepicker-input cx-f-1" name="bqcbrq" data-target="#wgSfCbKhybCbjlDtp${i}_p" maxlength="10" autocomplete="off" novalidate>
											    <div class="input-group-append" data-target="#wgSfCbKhybCbjlDtp${i}_p" data-toggle="datetimepicker">
											        <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
											    </div>
											</div>
										</td>
										<td>
			    						<input type="text" class="form-control form-control-sm text-right cx-f-1" name="sqds" data-sn="2" value="${item.sqds!==null&&item.sqds!==undefined?item.sqds:'0'}" pattern="^0|(0\\.\\d+)|([1-9]\\d*)|([1-9]\\d*\\.\\d+)$"${item.ghbj!='1' ? ' disabled' : ''} required>
			    						</td>
			    						<td><input type="text" class="form-control form-control-sm text-right cx-f-1" name="bqds" value="${item.bqds!==null&&item.bqds!==undefined?item.bqds:''}" data-bqyl="${item.bqyl?item.bqyl:''}" data-sn="3" pattern="^0|(0\\.\\d+)|([1-9]\\d*)|([1-9]\\d*\\.\\d+)$"></td>
			    						<td data-field="bqyl">${item.bqyl!==null&&item.bqyl!==undefined?item.bqyl:''}</td>
			    						<td><input type="text" class="form-control form-control-sm cx-f-1" name="bz" value="${item.bz?item.bz:''}" data-sn="4"></td>
			    						<td class="dl-item-cmd text-center">
											<div class="btn-group" role="group" aria-label="操作按纽组">
												<button type="button" class="btn btn-outline-primary" data-cmd="update">提交修改</button>
											</div>
										</td>
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
			    			/*tmp.find('select[name=ghbj],input[name=sqcbrq],input[name=bqcbrq]').on('blur', function(){
			    				$(cntrSelector).find('.toolbar button[data-cmd=copy]').attr('data-row-index', $(this).closest('tr').index())
			    																	.attr('data-cell-index', $(this).closest('td').index());
			    			});*/
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
			    			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			    			tmp.find('td.dl-item-cmd button[data-cmd="update"]').click(function(e){ 
			    				me.popUpdateCbjl(this, e);
			    			});
			    		}
			    	} else {
			    		CxMsg.warn('查询抄表记录失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询抄表记录失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$(`${cbjlModalSelector} .table`).mask('hide');
			    }
			});
			$(cbjlModalSelector).modal('show');
		},
		popUpdateCbjl: function(el, e){
			CxCtrl.confirm('是否确定修改此抄表记录？', function(src){
				me.updateCbjl(el);
		    }, {
		    	evt: e,
		    	src: el,
		    	placement: 'top'
		    });
		},
		updateCbjl: function(el) {
			let f = el.form, trs = [$(el).closest('tr')[0]];
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
				    url: CxMisc.finalizeUrl('/wygl/sfxt/cbgl/fccblr/updateFccblr'),
				    type: "POST",
				    data: {cbjlmx: data.join('@0ie9@')},
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart($(cntrSelector).find('.toolbar button[data-cmd=save]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		CxMsg.info('抄表记录修改成功');
				    	} else {
				    		CxMsg.warn('抄表记录修改失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.warn('抄表记录修改失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	CxMisc.markAjaxEnd($(cntrSelector).find('.toolbar button[data-cmd=save]'));
				    }
				});
			}
		},
		validate: function(f, trs){
			let ok = true;
			if (!CxMisc.validate(f)) {
				for (let i=0; i<trs.length; i++) {
					if ($(trs[i]).find('input[type=text]:invalid').length>0) { ok = false; break; }
					if ($(trs[i]).find('input[type=text].is-invalid').length>0) { ok = false; break; }
				}
			}
			if (ok) {
				CxMisc.clearValidation(f);
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
		},
		
		openEdit: function(cmd, el) {
			let f = document.querySelector(dtlsFrmSelector);
			f.reset();
			f.cmd.value = cmd;
			if (cmd == 'create') {
				let node = me.getSelectedNode();
				f.fcid.value = node.data.id;
				f.khybid.value = '';
				
				$(dtlsModalLblSelector).text('添加仪表');
			} else {
				let data = $(el).closest('tr').data('json');
				f.fcid.value = data.fcid;
				f.khybid.value = data.khybid;
				
				if ($(f.khid).data('loaded')) {
					$(f.khid).val(data.khid);
					if (f.khid.selectedIndex == -1) f.khid.selectedIndex = 0;
				} else {
					f.khid.setAttribute('data-selected-value', data.khid); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				}
				f.ybbh.value = data.ybbh;
				if ($(f.yblxdm).data('loaded')) {
					$(f.yblxdm).val(data.yblxdm);
					if (f.yblxdm.selectedIndex == -1) f.yblxdm.selectedIndex = 0;
				} else {
					f.yblxdm.setAttribute('data-selected-value', data.yblxdm); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				}
				if ($(f.sfbzid).data('loaded')) {
					$(f.sfbzid).val(data.sfbzid);
					if (f.sfbzid.selectedIndex == -1) f.sfbzid.selectedIndex = 0;
				} else {
					f.sfbzid.setAttribute('data-selected-value', data.sfbzid); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				}
				
				if (data.ksrq) $('#wgSfCbKhyb_ksrq_p').datetimepicker('date', data.ksrq);
				if (data.jsrq) $('#wgSfCbKhyb_jsrq_p').datetimepicker('date', data.jsrq);
				if (data.azrq) $('#wgSfCbKhyb_azrq_p').datetimepicker('date', data.azrq);
				if (data.ds !== null) f.ds.value = data.ds;
				if (data.lc !== null) f.lc.value = data.lc;
				if (data.bl !== null) f.bl.value = data.bl;
				if (data.yxbj) CxMisc.selectRadio('yxbj', data.yxbj, f);
				if (data.bz) f.bz.value = data.bz;
				
				$(dtlsModalLblSelector).text('修改仪表');
			}
			$(dtlsModalSelector).modal('show');
		},
		
		openBatchEdit: function(cmd, el) {
			let f = document.querySelector(batchFrmSelector);
			f.reset();
			
			el = f.sfbzid; // 收费标准状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
			
			$(batchModalSelector).modal('show');
		},
		
		preLoad: function() { // 预先载入代码数据，优化页面显示效果
			//
		},
		
		submit: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			let txt = data.cmd == 'create' ? '添加' : '修改';
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl(data.cmd == 'create' ? '/wygl/sfxt/cbgl/khyb/addKhyb' : '/wygl/sfxt/cbgl/khyb/updateKhyb'),
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
		submitBatch: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			delete data.fczymc; // 选中的房产资源名称不需要作为参数
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/cbgl/khyb/addPlKhyb'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info('批量添加成功');
			    		me.refresh();
						frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn('批量添加失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('批量添加失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
			    }
			});
		}
	};
}

SfCbKhyb.bind();