if (typeof window.QxYhSqyh === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgQxYhSqyhCntr';
	const treeSelector = '#wgQxYhSqyhCntr .tv-wrapper';
	const dtlsModalSelector = '#wgQxYhSqyhModalDtls';
	const dtlsModalLblSelector = '#wgQxYhSqyhModalDtlsLabel';
	const dtlsFrmSelector = '#wgQxYhSqyhDtlsFrm';
	const pwdModalSelector = '#wgQxYhSqyhModalResetPwd';
	const pwdFrmSelector = '#wgQxYhSqyhResetPwdFrm';
	const mainTblClz = '.table-wgqx-yh-sqyh';
	
	const idPrefix = 'wgQxYhSqyh';
	const loadingMask1 = '#wgQxYhSqyhCntr';
	const loadingMask2 = '#wgQxYhSqyhCntr .col-extended-lg';
	
	const me = window.QxYhSqyh = {
			bind: function() {
				CxMisc.enableRefresh(cntrSelector, me.refresh);
				CxMisc.enableFullpage(cntrSelector);
				CxMisc.bindCheckAll(cntrSelector);
				
				CxWg.loadSqTree(treeSelector, {level:5, nodeSelected: me.nodeSelected});
				
				$(cntrSelector).find('.toolbar button[data-cmd=open-add]').click(function(){ me.openEditYh('create', this); });
				
				$(`${dtlsModalSelector} input[name=yhlx]`).click(function(){ me.switchYhlx(this); });
				
				CxMisc.formValidated(dtlsFrmSelector, me.submitYh);
				CxMisc.formValidated(pwdFrmSelector, me.submitResetPwd);
				
				$(`${dtlsModalSelector}, ${pwdModalSelector}`).on('show.bs.modal', function (e) { 
					CxMisc.clearValidation(this); 
				}); //默认任何modal显示时把上次验证结果去掉
			},
			
			refresh: function(){
				let node = me.getSelectedNode();
				if (node) me.fetch(node); //刷新列表
			},
			
			delYh: function(el, e) {
				let id = $(el).closest('tr').data('id');
				CxCtrl.confirm('是否确定删除此用户？', function(src){
					var target = $(src);
					CxMisc.ajax({
			            url: CxMisc.finalizeUrl('/wgyh/deleteJgYh'),
			            type: "GET",
			            data:{ yhid: id},
			            beforeSend: function(xhr, cfg) {
			            	$(loadingMask2).mask('show');
			            },
			            success: function(res, ts) {
			            	if (res.code == "0") {
			            		CxMsg.info('删除用户成功');
			            		me.refresh(); //刷新列表
			            	} else CxMsg.error('删除用户失败: ' + res.message);
			            },
			            error: function(xhr, ts, err) {
			            	var msg = "[" + xhr.status + " : " + ts + "]";
			            	CxMsg.error('删除用户失败: ' + msg);
			            },
			            complete: function(xhr, ts) {
			            	$(loadingMask2).mask('hide');
			            }
			        });
			    }, {
			    	evt: e,
			    	src: el,
			    	placement: 'top'
			    });
			},
			
			fetch: function(node) {
				CxMisc.resetCheckAll(cntrSelector);
				let cols = $(`${cntrSelector} ${mainTblClz} thead>tr>th`).length,
					emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
				
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wgyh/findJgYh'),
				    type: "GET",
				    data: {sqid: node.data.sqid},
				    beforeSend: function(xhr, cfg) {
				    	$(loadingMask2).mask('show', {msg: '载入中，请稍候...'});
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		if (res.data && res.data.length>0) {
				    			let tmp = $(cntrSelector).find(`${mainTblClz} tbody`).empty();
				    			for (let i=0; i<res.data.length; i++) {
				    				tmp.append(`<tr data-id="${res.data[i].yhid}">
				    						<td class="td-indexer">
					    						<input type="checkbox" id="wgUserIndexer-${i}" name="wgUserIndexer{i}">
									            <label for="wgUserIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
					    						<span>${i+1}</span>
				    						</td>
				    						<td>${res.data[i].yhdm}</td>
				    						<td>${CxMisc.escapeHtml(res.data[i].yhmc)}</td>
				    						<td>${res.data[i].gwmc}</td>
				    						<td>${res.data[i].yhlx !== null? (res.data[i].yhlx==1?'管理员':'普通用户') : ''}</td>
				    						<td>${res.data[i].xb !== null? (res.data[i].xb==1?'男':'女') : ''}</td>
				    						<td>${res.data[i].lxdh? res.data[i].lxdh : ''}</td>
				    						<td>${res.data[i].wxh? CxMisc.escapeHtml(res.data[i].wxh) : ''}</td>
				    						<td>${res.data[i].dz? CxMisc.escapeHtml(res.data[i].dz) : ''}</td>
				    						<td class="dl-item-cmd">
				    							<div class="btn-group" role="group" aria-label="操作按纽组">
				    								<button type="button" class="btn btn-outline-primary" data-cmd="reset">重置密码</button>
				    								<button type="button" class="btn btn-outline-primary" data-cmd="update">修改</button>
				                                	<button type="button" class="btn btn-outline-danger" data-cmd="del">删除</button>
				    							</div>
				    						</td>
				    					</tr>`);
				    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
				    				if (res.data[i].yxbj == 0) tmp.children(':last-child').addClass('tr-disabled').attr('title', '用户已禁用');
				    			}
				    			tmp.find('td.dl-item-cmd button[data-cmd=reset]').click(function(){ me.openResetPwd(this); });
				    			tmp.find('td.dl-item-cmd button[data-cmd=update]').click(function(){ me.openEditYh('update', this); });
				    			tmp.find('td.dl-item-cmd button[data-cmd=del]').click(function(e){ me.delYh(this, e); });
				    		} else {
				    			$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
				    		}
				    	} else {
				    		CxMsg.error('载入失败：' + res.message);
				    		$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('载入失败：' + msg);
				    	$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
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
			
			nodeSelected: function(node) {
				me.fetch(node); //刷新列表
			},
			
			openEditYh: function(cmd, el) {
				let node = me.getSelectedNode();
				if (node) {
					let f = document.querySelector(dtlsFrmSelector), loadGwList = false;
					f.reset();
					f.cmd.value = cmd;
					if (cmd == 'create') {
						let id = node.data.sqid;
						$(dtlsModalLblSelector).text('添加用户');
						f.yhid.value = '';
						f.yhdm.disabled = false;
						f.yhmm.disabled = false;
						$(f.yhmm).parent().css('display', '').prev().css('display', '');
						CxMisc.selectRadio('yhlx', '0', f); // 默认选择普通用户
						if (f.sqid.value != id) { // 展开新机构列表后未开过窗口，载入岗位列表
							f.sqid.value = id;
							loadGwList = true;
							f.gwid.removeAttribute('data-selected-value');
						}
					} else {
						$(dtlsModalLblSelector).text('修改用户');
						let data = $(el).closest('tr').data('json');
						f.yhid.value = data.yhid;
						if (f.sqid.value != data.sqid) { // 展开新机构列表后未开过窗口，载入岗位列表
							f.sqid.value = data.sqid;
							loadGwList = true;
							f.gwid.setAttribute('data-selected-value', data.gwid);
						} else {
							f.gwid.removeAttribute('data-selected-value');
							$(f.gwid).val(data.gwid);
							if (f.gwid.selectedIndex == -1) f.gwid.selectedIndex = 0;
						}
						f.yhdm.value = data.yhdm;
						f.yhmc.value = data.yhmc;
						f.yhdm.disabled = true;
						f.yhmm.disabled = true;
						$(f.yhmm).parent().css('display', 'none').prev().css('display', 'none');
						if (data.yhlx !== null) CxMisc.selectRadio('yhlx', data.yhlx, f);
						else CxMisc.selectRadio('yhlx', '0', f); // 默认选择普通用户
						if (data.xb !== null) CxMisc.selectRadio('xb', data.xb, f);
						if (data.yxbj !== null) CxMisc.selectRadio('yxbj', data.yxbj, f);
						if (data.wxh) f.wxh.value = data.wxh;
						if (data.dzyx) f.dzyx.value = data.dzyx;
						if (data.lxdh) f.lxdh.value = data.lxdh;
						if (data.dz) f.dz.value = data.dz;
					}
					if (loadGwList) {
						CxMisc.ajax({
						    url: CxMisc.finalizeUrl('/wggw/findJgGw'),
						    type: "GET",
						    data: {sqid: f.sqid.value},
						    success: function(res, ts) {
						    	if (res.code == "0") {
						    		if (res.data && res.data.length>0) {
						    			let f1 = document.querySelector(dtlsFrmSelector);
						    			for (let i=f1.gwid.options.length-1; i>0; i--) f1.gwid.remove(i);
						    			for (let i=0; i<res.data.length; i++) {
						    				f1.gwid.options.add(new Option(res.data[i].gwmc, res.data[i].gwid));
						    			}
						    			if (f1.gwid.getAttribute('data-selected-value')) $(f1.gwid).val(f1.gwid.getAttribute('data-selected-value'));
						    			if (f1.gwid.selectedIndex == -1) f1.gwid.selectedIndex = 0;
						    		}
						    	} else {
						    		document.querySelector(dtlsFrmSelector).sqid.value = '';
						    		CxMsg.warn('载入岗位列表失败：' + res.message);
						    	}
						    },
						    error: function(xhr, ts, err) {
						    	document.querySelector(dtlsFrmSelector).sqid.value = '';
						    	var msg = "[" + xhr.status + " : " + ts + "]";
						    	CxMsg.warn('载入岗位列表失败：' + msg);
						    },
						});
					}
					$(dtlsModalSelector).modal('show');
				} else CxMsg.info('请先从机构树中选择机构');
			},
			
			openResetPwd: function(el) {
				let f = document.querySelector(pwdFrmSelector);
				f.reset();
				let data = $(el).closest('tr').data('json');
				f.yhid.value = data.yhid;
				f.yhmc.value = data.yhmc;
				$(pwdModalSelector).modal('show');
			},
			
			switchYhlx: function(el) {
				let required = el.form.yhlx.value == '0';
				el.form.gwid.required = required;
				if (required) 
					$(el.form.gwid).parent().prev().addClass('required');
				else
					$(el.form.gwid).parent().prev().removeClass('required');
			},
			
			submitResetPwd: function(f) {
				let frm = $(f);
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wgyh/resetPassword'),
				    type: "POST",
				    data: {yhid: f.yhid.value, yhmm: f.yhmm.value},
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		setTimeout(function(){CxMsg.info('重置密码成功');}, 600); //延时显示，防止提示框抖动
				    		frm.closest('.modal').modal('hide');
				    	} else {
				    		CxMsg.error('重置密码失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('重置密码失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
				    }
				});
			},
			
			submitYh: function(f) {
				let frm=$(f), txt = f.cmd.value=='create' ? '添加' : '修改',
					data = frm.serializeJson({removeBlankField:true}),
					url=f.cmd.value=='create' ? CxMisc.finalizeUrl('/wgyh/addJgYh') : CxMisc.finalizeUrl('/wgyh/updateJgYh');
				if (f.cmd.value=='update') delete data.yhmm;
				
				CxMisc.ajax({
				    url: url,
				    type: "POST",
				    data: data,
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		setTimeout(function(){CxMsg.info(txt + '成功');}, 600); //延时显示，防止提示框抖动
				    		me.refresh(); //刷新列表
				    		frm.closest('.modal').modal('hide');
				    	} else {
				    		CxMsg.error(txt + '失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error(txt + '失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
				    }
				});
			}
	}
}
QxYhSqyh.bind();