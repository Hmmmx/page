if (typeof window.gSysu === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	window.gSysu = {
		bindEvents: function() {
			$('#sysuAddUser').click(function(){
				if ($('#sysuOrgTree').data('currentNode'))
					gSysu.popDtlsDialog('create', $('#sysuOrgTree').data('currentNode').srcId);
				else
					CxMsg.info('请先从机构树中选择机构');
			});
			
			CxMisc.bindCheckAll('#sysuMgmtCntr');
			
			CxMisc.formValidated('#sysuUserDtlsFrm', gSysu.submitUser);
			CxMisc.formValidated('#sysuResetPwdFrm', gSysu.submitResetPwd);
			
			$('#sysuModalUserDtls, #sysuResetPwdFrm').on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
		convertNode2OrgTreeNode: function(parentNode, parentTreeNode) {
			if (parentNode.children) {
				parentTreeNode.nodes = [];
				for (let i=0; i<parentNode.children.length; i++) {
					let node = parentNode.children[i], treeNode = {text: node.jgmc, srcId: node.jgid};
					if (!node.children || node.children.length==0) {
						treeNode.icon = 'far fa-list-alt tv-leaf';
						// treeNode.selectable = false;
					} else {
						treeNode.selectable = false;
						treeNode.folder = true;
						gSysu.convertNode2OrgTreeNode(node, treeNode);
					}
					parentTreeNode.nodes.push(treeNode);
				}
			}
		},
		
		deleteUser: function(el, e) {
			let id = $(el).closest('tr').data('id');
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此用户？', function(src){
				var target = $(src);
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/jgyh/deleteJgYh'),
		            type: "GET",
		            data:{
		                yhid: id
		            },
		            beforeSend: function(xhr, cfg) {
		            	$('#sysuMgmtCntr .col-extended').mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		target.closest('tr').addClass('tr-deleted').find('button').each(function(){
		            			this.disabled = true;
		            		});
		            		target.closest('tr').addClass('tr-deleted').find('.td-indexer input').each(function(){
		            			this.checked = false;
		            			this.disabled = true;
		            		});
		            		CxMsg.info('删除用户成功');
		            		gSysu.loadOrg(); //刷新列表
		            	} else CxMsg.info('删除用户失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除用户失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	$('#sysuMgmtCntr .col-extended').mask('hide');
		            }
		        });
		    }, {
		    	evt: evt,
		    	src: el,
		    	placement: 'top'
		    });
		},
		
		fetchUser: function(node) {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/jgyh/findJgYh'),
			    type: "GET",
			    data: {jgid: node.srcId},
			    beforeSend: function(xhr, cfg) {
			    	$('#sysuMgmtCntr .col-extended').mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let tmp = $('#sysuMgmtCntr .table-sys-user tbody').empty();
			    			for (let i=0; i<res.data.length; i++) {
			    				tmp.append(`<tr data-id="${res.data[i].yhid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="sysuUserIndexer-${i}" name="sysuUserIndexer${i}">
								            <label for="sysuUserIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td>${res.data[i].yhdm}</td>
			    						<td>${CxMisc.escapeHtml(res.data[i].yhmc)}</td>
			    						<td>${res.data[i].gwmc}</td>
			    						<td>${res.data[i].yhlx !== null? (res.data[i].yhlx==1?'管理员':'普通用户') : ''}</td>
			    						<td>${res.data[i].xb !== null? (res.data[i].xb==1?'男':'女') : ''}</td>
			    						<td>${res.data[i].lxdh? res.data[i].lxdh : ''}</td>
			    						<td>${res.data[i].wxh? CxMisc.escapeHtml(res.data[i].wxh) : ''}</td>
			    						<td>${res.data[i].dzyx? CxMisc.escapeHtml(res.data[i].dzyx) : ''}</td>
			    						<td>${res.data[i].dz? CxMisc.escapeHtml(res.data[i].dz) : ''}</td>
			    						<td class="dl-item-cmd">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			    								<button type="button" class="btn btn-outline-primary" data-cmd="assign" onclick="gSysu.popResetPwdDialog('reset', '${res.data[i].yhid}', this)">重置密码</button>
			    								<button type="button" class="btn btn-outline-primary" data-cmd="update" onclick="gSysu.popDtlsDialog('update', '${res.data[i].yhid}', this)">修改</button>
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="del" onclick="gSysu.deleteUser(this)">删除</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
			    				if (res.data[i].yxbj == 0) tmp.children(':last-child').addClass('tr-disabled').attr('title', '用户已禁用');
			    			}
			    		} else {
			    			$('.table-sys-user tbody').empty().append('<tr><td colspan="11" class="table-empty">暂无数据</td></tr>');
			    		}
			    	} else {
			    		CxMsg.error('载入失败：' + res.message);
			    		$('#sysuMgmtCntr .table-sys-user tbody').empty().append('<tr><td colspan="11" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$('#sysuMgmtCntr .table-sys-user tbody').empty().append('<tr><td colspan="11" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$('#sysuMgmtCntr .col-extended').mask('hide');
			    }
			});
		},
		
		loadOrg: function() {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/xtjg/getXtjg'),
			    type: "GET",
			    beforeSend: function(xhr, cfg) {
			    	$('#sysuMgmtCntr').mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data && res.data.length>0) {
			    		let root = {children: res.data}, treeRoot = {};
			    		gSysu.convertNode2OrgTreeNode(root, treeRoot);
			    		gSysu.renderOrgTreeView(treeRoot.nodes);
			    	} else {
			    		CxMsg.warn('载入系统机构失败, 请稍后重新打开：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入系统机构失败, 请稍后重新打开：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$('#sysuMgmtCntr').mask('hide');
			    }
			});
		},
		
		popDtlsDialog: function(cmd, id, el) {
			let f = document.querySelector('#sysuUserDtlsFrm'), loadPosList = false;
			f.reset();
			f.cmd.value = cmd;
			if (cmd == 'create') {
				$('#sysuModalUserDtlsLabel').text('添加用户');
				f.yhid.value = '';
				f.yhmm.disabled = false;
				$(f.yhmm).closest('.form-group').css('display', '');
				if (f.jgid.value != id) { // 展开新机构列表后未开过窗口，载入岗位列表
					f.jgid.value = id;
					loadPosList = true;
					f.gwid.removeAttribute('data-selected-value');
				}
			} else {
				$('#sysuModalUserDtlsLabel').text('修改用户');
				let data = $(el).closest('tr').data('json');
				f.yhid.value = id;
				if (f.jgid.value != data.jgid) { // 展开新机构列表后未开过窗口，载入岗位列表
					f.jgid.value = data.jgid;
					loadPosList = true;
					f.gwid.setAttribute('data-selected-value', data.gwid);
				} else {
					f.gwid.removeAttribute('data-selected-value');
					$(f.gwid).val(data.gwid);
					if (f.gwid.selectedIndex == -1) f.gwid.selectedIndex = 0;
				}
				f.yhdm.value = data.yhdm;
				f.yhmc.value = data.yhmc;
				f.yhmm.disabled = true;
				$(f.yhmm).closest('.form-group').css('display', 'none');
				$(f).find("input[name=yhlx]").each(function() {
					if (this.value == data.yhlx) this.click(); 
		        });
				$(f).find("input[name=xb]").each(function() {
					if (this.value == data.xb) this.click(); 
		        });
				$(f).find("input[name=yxbj]").each(function() {
					if (this.value == data.yxbj) this.click(); 
		        });
				if (data.wxh) f.wxh.value = data.wxh;
				if (data.dzyx) f.dzyx.value = data.dzyx;
				if (data.lxdh) f.lxdh.value = data.lxdh;
				if (data.dz) f.dz.value = data.dz;
			}
			if (loadPosList) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/jggw/findJgGw'),
				    type: "GET",
				    data: {jgid: f.jgid.value},
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		if (res.data && res.data.length>0) {
				    			let f1 = document.querySelector('#sysuUserDtlsFrm');
				    			f1.gwid.options.length = 0;
				    			for (let i=0; i<res.data.length; i++) {
				    				f1.gwid.options.add(new Option(res.data[i].gwmc, res.data[i].gwid));
				    			}
				    			if (f1.gwid.getAttribute('data-selected-value')) $(f1.gwid).val(f1.gwid.getAttribute('data-selected-value'));
				    			if (f1.gwid.selectedIndex == -1) f1.gwid.selectedIndex = 0;
				    		}
				    	} else {
				    		document.querySelector('#sysuUserDtlsFrm').jgid.value = '';
				    		CxMsg.warn('载入岗位列表失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	document.querySelector('#sysuUserDtlsFrm').jgid.value = '';
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.warn('载入岗位列表失败：' + msg);
				    },
				});
			}
			$('#sysuModalUserDtls').modal('show');
		},
		
		popResetPwdDialog: function(cmd, id, el) {
			let f = document.querySelector('#sysuResetPwdFrm');
			f.reset();
			f.yhid.value = id;
			let data = $(el).closest('tr').data('json');
			f.yhmc.value = data.yhmc;
			$('#sysuModalResetPwd').modal('show');
		},
		
		renderOrgTreeView: function(data) {
			let tvCntr = $('#sysuOrgTree'), currentNode = tvCntr.data('currentNode');
			tvCntr.treeview({
				data: data,
				expandIcon: 'fas fa-angle-right tv-expand',
				collapseIcon: 'fas fa-angle-down tv-expand',
			    checkedIcon: 'fas fa-check-square tv-cbx-checked',
			    uncheckedIcon: 'far fa-square tv-cbx-unchecked',
			    // showCheckbox: true,
			    showBorder:false,
			    emptyIcon: 'fas fa-minus transparent',
			    nodeIcon: 'far fa-folder tv-branch',
			    iconExt: {
			    	folderOpen: 'far fa-folder-open tv-branch', 
			    	folderClosed: 'far fa-folder tv-branch'
			    },
			    selectedBackColor: '#b8ecfd',
			    selectedColor: '#212529',
				levels: 4
			}).on('nodeSelected', function(event, data) {
				$('#sysuOrgTree').data('currentNode', data);
				CxMisc.resetCheckAll('#sysuMgmtCntr');
				gSysu.fetchUser(data);
			});
			
			if (currentNode) {
				tvCntr.treeview('openNode', [currentNode.nodeId, {silent: true}]);
			}
		},
		
		submitResetPwd: function(f) {
			let frm=$(f);
			CxMisc.ajax({
			    url: f.action,
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
		
		submitUser: function(f) {
			let frm=$(f), prefix = f.cmd.value=='create' ? '添加' : '修改',
				data = frm.serializeJson(),
				url=f.cmd.value=='create' ? CxMisc.finalizeUrl('/jgyh/addJgYh') : CxMisc.finalizeUrl('/jgyh/updateJgYh');
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
			    		setTimeout(function(){CxMsg.info(prefix + '成功');}, 600); //延时显示，防止提示框抖动
			    		gSysu.loadOrg(); //刷新列表
			    		frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.error(prefix + '失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error(prefix + '失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
			    }
			});
		}
	};
}
gSysu.bindEvents();
gSysu.loadOrg();

