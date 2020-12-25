if (typeof window.gSysm === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	window.gSysm = {
		bindEvents: function() {
			$('#sysmAddFuncMenu').click(function(){
				if ($('#sysmMenuTree').data('currentNode'))
					gSysm.popSysMenuDialog('create', $('#sysmMenuTree').data('currentNode').srcId);
				else
					CxMsg.info('请先从菜单树中选择功能菜单');
			});
			
			CxMisc.bindCheckAll('#sysmMgmtCntr');
			
			$('#sysmMenuDtlsFrm input[name=cdlx]').click(function(){
				if (this.value == '0' || this.value == '1') { // 系统 或导航
					this.form.url.required = false;
					$(this.form.url).closest('.form-group').children('label').removeClass('required');
				} else { // 功能
					this.form.url.required = true;
					$(this.form.url).closest('.form-group').children('label').addClass('required');
				}
			});
			
			CxMisc.formValidated('#sysmMenuDtlsFrm', gSysm.submitSysMenu);
			 
			$('#sysmModalMenuDtls').on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
		convertNode2TreeNode: function(parentNode, parentTreeNode) {
			if (parentNode.children) {
				parentTreeNode.nodes = [];
				for (let i=0; i<parentNode.children.length; i++) {
					let node = parentNode.children[i], treeNode = {text: node.cdmc, srcId: node.cdid};
					if (node.cdlx == 2) {// !node.children || node.children.length==0
						treeNode.icon = 'far fa-list-alt tv-leaf'; // fab fa-pagelines
						treeNode.selectable = false;
					} else {
						treeNode.folder = true;
						gSysm.convertNode2TreeNode(node, treeNode);
					}
					parentTreeNode.nodes.push(treeNode);
				}
			}
		},
		
		deleteSysMenu: function(el, e) {
			let currentNode = $('#sysmMenuTree').data('currentNode'), subNode = null,
				cdid = $(el).closest('tr').data('id');
			if (currentNode && currentNode.nodes) {
				for (let i=0; i<currentNode.nodes.length; i++) {
					if (currentNode.nodes[i].srcId == cdid) {
						if (currentNode.nodes[i].nodes && currentNode.nodes[i].nodes.length>0) {
							CxMsg.warn('该功能菜单有下级节点不能删除');
							return;
						}
						subNode = currentNode.nodes[i];
						break;
					}
				}
			}
		
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此功能菜单？', function(src){
				var target = $(src);
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/xtgn/deleteXtgn'),
		            type: "GET",
		            data:{
		                cdid: cdid
		            },
		            beforeSend: function(xhr, cfg) {
		            	$('#sysmMgmtCntr .col-extended').mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		$('#sysmMenuTree').treeview('disableNode', subNode.nodeId);
		            		target.closest('tr').addClass('tr-deleted').find('button').each(function(){
		            			this.disabled = true;
		            		});
		            		target.closest('tr').addClass('tr-deleted').find('.td-indexer input').each(function(){
		            			this.checked = false;
		            			this.disabled = true;
		            		});
		            		CxMsg.info('删除功能菜单成功');
		            		gSysm.loadFuncMenu(); //刷新列表
		            	} else CxMsg.info('删除功能菜单失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除功能菜单失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	$('#sysmMgmtCntr .col-extended').mask('hide');
		            }
		        });
		    }, {
		    	evt: evt,
		    	src: el,
		    	placement: 'top'
		    });
		},
		
		fetchSubFuncMenu: function(node) {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/xtgn/findXtgn'),
			    type: "GET",
			    data: {cdid: node.srcId},
			    beforeSend: function(xhr, cfg) {
			    	$('#sysmMgmtCntr .col-extended').mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let tmp = $('#sysmMgmtCntr .table-sys-menu tbody').empty();
			    			for (let i=0; i<res.data.length; i++) {
			    				tmp.append(`<tr data-id="${res.data[i].cdid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="sysmMenuIndexer-${i}" name="sysmMenuIndexer${i}">
								            <label for="sysmMenuIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td>${res.data[i].cdmc}</td>
			    						<td>${res.data[i].cdlx==0?'系统':(res.data[i].cdlx==1?'导航':'功能')}</td>
			    						<td>${res.data[i].plxh}</td>
			    						<td>${node.text}</td>
			    						<td title="${res.data[i].url?res.data[i].url:''}">${res.data[i].url?res.data[i].url:''}</td>
			    						<td class="dl-item-cmd">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			    								<button type="button" class="btn btn-outline-primary" data-cmd="update" onclick="gSysm.popSysMenuDialog('update', '${res.data[i].cdid}', this)">修改</button>
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="del" onclick="gSysm.deleteSysMenu(this)">删除</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
			    				if (res.data[i].yxbj == 0) tmp.children(':last-child').addClass('tr-disabled').attr('title', '菜单已禁用');
			    			}
			    		} else {
			    			$('#sysmMgmtCntr .table-sys-menu tbody').empty().append('<tr><td colspan="7" class="table-empty">暂无数据</td></tr>');
			    		}
			    	} else {
			    		CxMsg.error('载入失败：' + res.message);
			    		$('#sysmMgmtCntr .table-sys-menu tbody').empty().append('<tr><td colspan="7" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$('#sysmMgmtCntr .table-sys-menu tbody').empty().append('<tr><td colspan="7" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$('#sysmMgmtCntr .col-extended').mask('hide');
			    }
			});
		},
		
		loadFuncMenu: function() {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/xtgn/getXtgn'),
			    type: "GET",
			    beforeSend: function(xhr, cfg) {
			    	$('#sysmMgmtCntr').mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data && res.data.length>0) {
			    		let root = {children: res.data}, treeRoot = {};
			    		gSysm.convertNode2TreeNode(root, treeRoot);
			    		gSysm.renderTreeView(treeRoot.nodes);
			    	} else {
			    		CxMsg.warn('载入功能菜单失败, 请稍后重新打开：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入功能菜单失败, 请稍后重新打开：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$('#sysmMgmtCntr').mask('hide');
			    }
			});
		},
		
		popSysMenuDialog: function(cmd, menuId, el) {
			let f = document.querySelector('#sysmMenuDtlsFrm');
			f.reset();
			f.cmd.value = cmd;
			if (cmd == 'create') {
				$('#sysmModalMenuDtlsLabel').text('添加功能菜单');
				f.cdid.value = '';
				f.sjcdid.value = menuId;
				$(f).find("input[name=cdlx][value=1]").click(); // 恢复类型默认设置
			} else {
				$('#sysmModalMenuDtlsLabel').text('修改功能菜单');
				let data = $(el).closest('tr').data('json');
				f.cdid.value = menuId;
				f.sjcdid.value = data.sjcdid;
				f.cdmc.value = data.cdmc;
				f.plxh.value = data.plxh;
				$(f).find("input[name=cdlx]").each(function() {
					if (this.value == data.cdlx) this.click(); 
		        });
				$(f).find("input[name=yxbj]").each(function() {
					if (this.value == data.yxbj) this.click(); 
		        });
				f.url.value = data.url ? data.url : '';
			}
			$('#sysmModalMenuDtls').modal('show');
		},
		
		renderTreeView: function(data) {
			let tvCntr = $('#sysmMenuTree'), currentNode = tvCntr.data('currentNode');
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
				levels: 2
			}).on('nodeSelected', function(event, data) {
				$('#sysmMenuTree').data('currentNode', data);
				CxMisc.resetCheckAll('#sysmMgmtCntr');
				gSysm.fetchSubFuncMenu(data);
			});
			
			if (currentNode) {
				tvCntr.treeview('openNode', [currentNode.nodeId, {silent: true}]);
			}
		},
		
		submitSysMenu: function(f) {
			let frm=$(f), prefix = f.cmd.value=='create' ? '添加' : '修改',
				url=f.cmd.value=='create' ? CxMisc.finalizeUrl('/xtgn/addXtgn') : CxMisc.finalizeUrl('/xtgn/updateXtgn');
			CxMisc.ajax({
			    url: url,
			    type: "POST",
			    data: frm.serializeJson(),
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		setTimeout(function(){CxMsg.info(prefix + '成功');}, 600); //延时显示，防止提示框抖动
			    		gSysm.loadFuncMenu(); //刷新列表
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
gSysm.bindEvents();
gSysm.loadFuncMenu();

