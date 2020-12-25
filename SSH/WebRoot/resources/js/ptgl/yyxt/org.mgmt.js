if (typeof window.gSyso === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	window.gSyso = {
		bindEvents: function() {
			$('#sysoOrgSyqxq, #sysoOrgSyqxz').datetimepicker({
				date: new Date(),
		        format: 'YYYY-MM-DD'
			});
			
			$('#sysoAddOrg').click(function(){
				if ($('#sysoOrgTree').data('currentNode'))
					gSyso.popDtlsDialog('create', $('#sysoOrgTree').data('currentNode').srcId);
				else
					CxMsg.info('请先从机构树中选择机构');
			});
			
			CxMisc.bindCheckAll('#sysoMgmtCntr');
			
			CxMisc.formValidated('#sysoOrgDtlsFrm', gSyso.submitSysOrg);
			CxMisc.formValidated('#sysoAssignOrgMenuFrm', gSyso.submitAssignOrgMenu);
			
			$('#sysoModalOrgDtls, #sysoModalAssignSysMenu').on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
		convertNode2OrgMenuTreeNode: function(parentNode, parentTreeNode) {
			if (parentNode.children) {
				parentTreeNode.nodes = [];
				for (let i=0; i<parentNode.children.length; i++) {
					let node = parentNode.children[i], 
						treeNode = {text: node.cdmc, srcId: node.cdid, state: {checked: node.checked}};
					if (node.cdlx == 2) {// !node.children || node.children.length==0
						treeNode.icon = 'far fa-list-alt tv-leaf';
						// treeNode.selectable = false;
					} else {
						treeNode.folder = true;
						gSyso.convertNode2OrgMenuTreeNode(node, treeNode);
					}
					parentTreeNode.nodes.push(treeNode);
				}
			}
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
						treeNode.folder = true;
						gSyso.convertNode2OrgTreeNode(node, treeNode);
					}
					parentTreeNode.nodes.push(treeNode);
				}
			}
		},
		
		deleteSysOrg: function(el, e) {
			let currentNode = $('#sysoOrgTree').data('currentNode'), subNode = null,
				id = $(el).closest('tr').data('id');
			if (currentNode && currentNode.nodes) {
				for (let i=0; i<currentNode.nodes.length; i++) {
					if (currentNode.nodes[i].srcId == id) {
						if (currentNode.nodes[i].nodes && currentNode.nodes[i].nodes.length>0) {
							CxMsg.warn('该机构有下级节点不能删除');
							return;
						}
						subNode = currentNode.nodes[i];
						break;
					}
				}
			}
		
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此机构？', function(src){
				var target = $(src);
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/xtjg/deleteXtjg'),
		            type: "GET",
		            data:{
		                jgid: id
		            },
		            beforeSend: function(xhr, cfg) {
		            	$('#sysoMgmtCntr .col-extended').mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		$('#sysoOrgTree').treeview('disableNode', subNode.nodeId);
		            		target.closest('tr').addClass('tr-deleted').find('button').each(function(){
		            			this.disabled = true;
		            		});
		            		target.closest('tr').addClass('tr-deleted').find('.td-indexer input').each(function(){
		            			this.checked = false;
		            			this.disabled = true;
		            		});
		            		CxMsg.info('删除机构成功');
		            		gSyso.loadOrg(); //刷新列表
		            	} else CxMsg.info('删除机构失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除机构失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	$('#sysoMgmtCntr .col-extended').mask('hide');
		            }
		        });
		    }, {
		    	evt: evt,
		    	src: el,
		    	placement: 'top'
		    });
		},
		
		fetchSubOrg: function(node) {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/xtjg/findJgxx'),
			    type: "GET",
			    data: {jgid: node.srcId},
			    beforeSend: function(xhr, cfg) {
			    	$('#sysoMgmtCntr .col-extended').mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let tmp = $('#sysoMgmtCntr .table-sys-org tbody').empty();
			    			for (let i=0; i<res.data.length; i++) {
			    				tmp.append(`<tr data-id="${res.data[i].jgid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="sysoOrgIndexer-${i}" name="sysoOrgIndexer${i}">
								            <label for="sysoOrgIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td>${res.data[i].jgdm}</td>
			    						<td title="${res.data[i].jgmc}">${res.data[i].jgmc}</td>
			    						<td>${res.data[i].plxh}</td>
			    						<td>${res.data[i].syqxz?res.data[i].syqxz:''}</td>
			    						<td>${node.text}</td>
			    						<td title="${res.data[i].lxr?res.data[i].lxr:''}">${res.data[i].lxr?res.data[i].lxr:''}</td>
			    						<td title="${res.data[i].lxdh?res.data[i].lxdh:''}">${res.data[i].lxdh?res.data[i].lxdh:''}</td>
			    						<td class="dl-item-cmd">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			    								<button type="button" class="btn btn-outline-primary" data-cmd="assign" onclick="gSyso.popAssignSysMenuDialog('assign', '${res.data[i].jgid}', this)" title="指派系统菜单">菜单</button>
			    								<button type="button" class="btn btn-outline-primary" data-cmd="update" onclick="gSyso.popDtlsDialog('update', '${res.data[i].jgid}', this)">修改</button>
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="del" onclick="gSyso.deleteSysOrg(this)">删除</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
			    				if (res.data[i].yxbj == 0) tmp.children(':last-child').addClass('tr-disabled').attr('title', '机构已禁用');
			    			}
			    		} else {
			    			$('#sysoMgmtCntr .table-sys-org tbody').empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    		}
			    	} else {
			    		CxMsg.error('载入失败：' + res.message);
			    		$('#sysoMgmtCntr .table-sys-org tbody').empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$('#sysoMgmtCntr .table-sys-org tbody').empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$('#sysoMgmtCntr .col-extended').mask('hide');
			    }
			});
		},
		
		getSelectedMenuIdList: function() {
			let nodes = $('#sysoModalAssignSysMenu .tv-cntr').treeview('getChecked'), nodeIds = [];
			for (let i=0; i<nodes.length; i++) {
				nodeIds.push(`'${nodes[i].srcId}'`);
			}
			return nodeIds.join(',');
		},
		
		loadOrg: function() {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/xtjg/getXtjg'),
			    type: "GET",
			    beforeSend: function(xhr, cfg) {
			    	$('#sysoMgmtCntr').mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data && res.data.length>0) {
			    		let root = {children: res.data}, treeRoot = {};
			    		gSyso.convertNode2OrgTreeNode(root, treeRoot);
			    		gSyso.renderOrgTreeView(treeRoot.nodes);
			    	} else {
			    		CxMsg.warn('载入系统机构失败, 请稍后重新打开：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入系统机构失败, 请稍后重新打开：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$('#sysoMgmtCntr').mask('hide');
			    }
			});
		},
		
		popDtlsDialog: function(cmd, id, el) {
			let f = document.querySelector('#sysoOrgDtlsFrm');
			f.reset();
			f.cmd.value = cmd;
			if (cmd == 'create') {
				$('#sysoModalOrgDtlsLabel').text('添加组织机构');
				$('#sysoOrgSyqxq, #sysoOrgSyqxz').datetimepicker('clear');
				f.jgid.value = '';
				f.sjjgid.value = id;
			} else {
				$('#sysoModalOrgDtlsLabel').text('修改组织机构');
				let data = $(el).closest('tr').data('json');
				f.jgid.value = id;
				f.sjjgid.value = data.sjjgid;
				f.jgdm.value = data.jgdm;
				f.jgmc.value = data.jgmc;
				f.plxh.value = data.plxh;
				f.lxr.value = data.lxr ? data.lxr : '';
				f.lxdh.value = data.lxdh ? data.lxdh : '';
				$(f).find("input[name=yxbj]").each(function() {
					if (this.value == data.yxbj) this.click(); 
		        });
				if (data.syqxq) $('#sysoOrgSyqxq').datetimepicker('date', data.syqxq);
				if (data.syqxz) $('#sysoOrgSyqxz').datetimepicker('date', data.syqxz);
			}
			$('#sysoModalOrgDtls').modal('show');
		},
		
		popAssignSysMenuDialog: function(cmd, id, el) {
			let f = document.querySelector('#sysoAssignOrgMenuFrm');
			f.jgid.value = id;
			
			$('#sysoModalAssignSysMenu').modal('show');
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/xtjg/getXtJggn'),
			    type: "GET",
			    data: {jgid: id},
			    beforeSend: function(xhr, cfg) {
			    	$('#sysoModalAssignSysMenu .tv-cntr').mask('show', {msg: '正在载入，请稍后...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data && res.data.length>0) {
			    		let root = {children: res.data}, treeRoot = {};
			    		gSyso.convertNode2OrgMenuTreeNode(root, treeRoot);
			    		for (let i=0; i<treeRoot.nodes.length; i++) { // 设置根目录是否选中
			    			let node = treeRoot.nodes[i];
			    			for (let j=0; j<node.nodes.length; j++) {
			    				if (node.nodes[j].state.checked) {
				    				node.state.checked = true;
				    				break;
			    				}
			    			}
			    		}
			    		gSyso.renderOrgMenuTreeView(treeRoot.nodes);
			    	} else {
			    		CxMsg.warn('载入系统机构菜单失败, 请稍后重试：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入系统机构菜单失败, 请稍后重试：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$('#sysoModalAssignSysMenu .tv-cntr').mask('hide');
			    }
			});
		},
		
		renderOrgMenuTreeView: function(data) {
			$('#sysoModalAssignSysMenu .tv-cntr').treeview({
				data: data,
				expandIcon: 'fas fa-angle-right tv-expand',
				collapseIcon: 'fas fa-angle-down tv-expand',
			    checkedIcon: 'fas fa-check-square tv-cbx-checked',
			    partialCheckedIcon: 'far fa-check-square tv-cbx-checked',
			    uncheckedIcon: 'far fa-square tv-cbx-unchecked',
			    showCheckbox: true,
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
			}).on('nodeChecked', function(event, data) {
				$('#sysoModalAssignSysMenu .tv-cntr').treeview('hierCheckNode', [data.nodeId, {silent:true}]);
			}).on('nodeUnchecked', function(event, data) {
				$('#sysoModalAssignSysMenu .tv-cntr').treeview('hierUncheckNode', [data.nodeId, {silent:true}]);
			});
			$('#sysoModalAssignSysMenu .tv-cntr').treeview('scanPartialChecked', [{silent:true}]);
		},
		
		renderOrgTreeView: function(data) {
			let tvCntr = $('#sysoOrgTree'), currentNode = tvCntr.data('currentNode');
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
				$('#sysoOrgTree').data('currentNode', data);
				CxMisc.resetCheckAll('#sysoMgmtCntr');
				gSyso.fetchSubOrg(data);
			});
			
			if (currentNode) {
				tvCntr.treeview('openNode', [currentNode.nodeId, {silent: true}]);
			}
		},
		
		submitAssignOrgMenu: function(f) {
			let frm=$(f),
				data = {
					jgid: f.jgid.value,
					cdidStr: gSyso.getSelectedMenuIdList(),
				};
			
			CxMisc.ajax({
			    url: f.action,
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		setTimeout(function(){CxMsg.info('指派系统菜单成功');}, 600); //延时显示，防止提示框抖动
			    		frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.error('指派系统菜单失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('指派系统菜单失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
			    }
			});
		},
		
		submitSysOrg: function(f) {
			let frm=$(f), prefix = f.cmd.value=='create' ? '添加' : '修改',
				data = frm.serializeJson(),
				url=f.cmd.value=='create' ? CxMisc.finalizeUrl('/xtjg/addXtjg') : CxMisc.finalizeUrl('/xtjg/updateXtjg');
			if (data.syqxq == "") delete data.syqxq;
			if (data.syqxz == "") delete data.syqxz;
			
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
			    		gSyso.loadOrg(); //刷新列表
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
gSyso.bindEvents();
gSyso.loadOrg();

