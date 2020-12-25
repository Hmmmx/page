if (typeof window.gWgp === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	window.gWgp = {
		bindEvents: function() {
			$('#wgAddGw').click(function(){
				if ($('#wgGwTree').data('currentNode'))
					gWgp.popDtlsDialog('create', $('#wgGwTree').data('currentNode').srcId);
				else
					CxMsg.info('请先从机构树中选择机构');
			});
			
			CxMisc.bindCheckAll('#gwWgCntr');
			
			CxMisc.formValidated('#wgGwDtlsFrm', gWgp.submitPos);
			CxMisc.formValidated('#wggwAssignPrivFrm', gWgp.submitAssignPriv);
			
			$('#wgModalGwDtls, #wgModalAssignPriv').on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
		convertNode2PrivTreeNode: function(parentNode, parentTreeNode) {
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
						gWgp.convertNode2PrivTreeNode(node, treeNode);
					}
					parentTreeNode.nodes.push(treeNode);
				}
			}
		},
		
		convertNode2OrgTreeNode: function(parentNode, parentTreeNode) {
			if (parentNode.children) {
				parentTreeNode.nodes = [];
				for (let i=0; i<parentNode.children.length; i++) {
					let node = parentNode.children[i], treeNode = {text: node.sqmc, srcId: node.sqid};
					if (!node.children || node.children.length==0) {
						treeNode.icon = 'far fa-list-alt tv-leaf';
						// treeNode.selectable = false;
					} else {
						// treeNode.selectable = false;
						treeNode.folder = true;
						gWgp.convertNode2OrgTreeNode(node, treeNode);
					}
					parentTreeNode.nodes.push(treeNode);
				}
			}
		},
		
		deletePos: function(el, e) {
			let currentNode = $('#wgGwTree').data('currentNode'),
				id = $(el).closest('tr').data('id');
		
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此岗位？', function(src){
				var target = $(src);
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wggw/deleteJgGw'),
		            type: "GET",
		            data:{
		                gwid: id
		            },
		            beforeSend: function(xhr, cfg) {
		            	$('#gwWgCntr .col-extended').mask('show');
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
		            		CxMsg.info('删除岗位成功');
		            		gWgp.loadOrg(); //刷新列表
		            	} else CxMsg.info('删除岗位失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除岗位失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	$('#gwWgCntr .col-extended').mask('hide');
		            }
		        });
		    }, {
		    	evt: evt,
		    	src: el,
		    	placement: 'top'
		    });
		},
		
		fetchPos: function(node) {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wggw/findJgGw'),
			    type: "GET",
			    data: {sqid: node.srcId},
			    beforeSend: function(xhr, cfg) {
			    	$('#gwWgCntr .col-extended').mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let tmp = $('#gwWgCntr .table-wg-pos tbody').empty();
			    			for (let i=0; i<res.data.length; i++) {
			    				tmp.append(`<tr data-id="${res.data[i].gwid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="wggwPosIndexer-${i}" name="wggwPosIndexer${i}">
								            <label for="wggwPosIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td>${res.data[i].gwmc}</td>
			    						<td class="dl-item-cmd">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			    								<button type="button" class="btn btn-outline-primary" data-cmd="assign" onclick="gWgp.popAssignPrivDialog('assign', '${res.data[i].gwid}', '${res.data[i].sqid}')" title="指派权限">权限</button>
			    								<button type="button" class="btn btn-outline-primary" data-cmd="update" onclick="gWgp.popDtlsDialog('update', '${res.data[i].gwid}', this)">修改</button>
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="del" onclick="gWgp.deletePos(this)">删除</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
			    				if (res.data[i].yxbj == 0) tmp.children(':last-child').addClass('tr-disabled').attr('title', '岗位已禁用');
			    			}
			    		} else {
			    			$('#gwWgCntr .table-wg-pos tbody').empty().append('<tr><td colspan="3" class="table-empty">暂无数据</td></tr>');
			    		}
			    	} else {
			    		CxMsg.error('载入失败：' + res.message);
			    		$('#gwWgCntr .table-wg-pos tbody').empty().append('<tr><td colspan="3" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$('#gwWgCntr .table-wg-pos tbody').empty().append('<tr><td colspan="3" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$('#gwWgCntr .col-extended').mask('hide');
			    }
			});
		},
		
		getSelectedPrivIdList: function() {
			let nodes = $('#wgModalAssignPriv .tv-cntr').treeview('getChecked'), nodeIds = [];
			for (let i=0; i<nodes.length; i++) {
				nodeIds.push(`'${nodes[i].srcId}'`);
			}
			return nodeIds.join(',');
		},
		
		loadOrg: function() {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wgjg/getXtjg'),
			    type: "GET",
			    beforeSend: function(xhr, cfg) {
			    	$('#gwWgCntr').mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data && res.data.length>0) {
			    		let root = {children: res.data}, treeRoot = {};
			    		gWgp.convertNode2OrgTreeNode(root, treeRoot);
			    		gWgp.renderOrgTreeView(treeRoot.nodes);
			    	} else {
			    		CxMsg.warn('载入系统机构失败, 请稍后重新打开：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入系统机构失败, 请稍后重新打开：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$('#gwWgCntr').mask('hide');
			    }
			});
		},
		
		popDtlsDialog: function(cmd, id, el) {
			let f = document.querySelector('#wgGwDtlsFrm');
			f.reset();
			f.cmd.value = cmd;
			if (cmd == 'create') {
				$('#wgModalGwDtlsLabel').text('添加岗位');
				f.gwid.value = '';
				f.sqid.value = id;
			} else {
				$('#wgModalGwDtlsLabel').text('修改岗位');
				let data = $(el).closest('tr').data('json');
				f.gwid.value = id;
				f.sqid.value = data.sqid;
				f.gwmc.value = data.gwmc;
				$(f).find("input[name=yxbj]").each(function() {
					if (this.value == data.yxbj) this.click(); 
		        });
			}
			$('#wgModalGwDtls').modal('show');
		},
		
		popAssignPrivDialog: function(cmd, gwid, sqid) {
			let f = document.querySelector('#wggwAssignPrivFrm');
			f.gwid.value = gwid;
			f.sqid.value = sqid;
			
			$('#wgModalAssignPriv').modal('show');
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wggw/getGwgn'),
			    type: "GET",
			    data: {gwid: gwid, sqid: sqid},
			    beforeSend: function(xhr, cfg) {
			    	$('#wgModalAssignPriv .tv-cntr').mask('show', {msg: '正在载入，请稍后...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data && res.data.length>0) {
			    		let root = {children: res.data}, treeRoot = {};
			    		gWgp.convertNode2PrivTreeNode(root, treeRoot);
			    		for (let i=0; i<treeRoot.nodes.length; i++) { // 设置根目录是否选中
			    			let node = treeRoot.nodes[i];
			    			if (node.nodes) {
				    			for (let j=0; j<node.nodes.length; j++) {
				    				if (node.nodes[j].state.checked) {
					    				node.state.checked = true;
					    				break;
				    				}
				    			}
			    			}
			    		}
			    		gWgp.renderPrivTreeView(treeRoot.nodes);
			    	} else {
			    		CxMsg.warn('载入权限菜单失败, 请稍后重试：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入权限菜单失败, 请稍后重试：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$('#wgModalAssignPriv .tv-cntr').mask('hide');
			    }
			});
		},
		
		renderPrivTreeView: function(data) {
			$('#wgModalAssignPriv .tv-cntr').treeview({
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
				levels: 4
			}).on('nodeChecked', function(event, data) {
				$('#wgModalAssignPriv .tv-cntr').treeview('hierCheckNode', [data.nodeId, {silent:true}]);
			}).on('nodeUnchecked', function(event, data) {
				$('#wgModalAssignPriv .tv-cntr').treeview('hierUncheckNode', [data.nodeId, {silent:true}]);
			});
			$('#wgModalAssignPriv .tv-cntr').treeview('scanPartialChecked', [{silent:true}]);
		},
		
		renderOrgTreeView: function(data) {
			let tvCntr = $('#wgGwTree'), currentNode = tvCntr.data('currentNode');
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
				$('#wgGwTree').data('currentNode', data);
				CxMisc.resetCheckAll('#gwWgCntr');
				gWgp.fetchPos(data);
			});
			
			if (currentNode) {
				tvCntr.treeview('openNode', [currentNode.nodeId, {silent: true}]);
			}
		},
		
		submitAssignPriv: function(f) {
			let frm=$(f),
				data = {
					gwid: f.gwid.value,
					cdidStr: gWgp.getSelectedPrivIdList(),
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
			    		setTimeout(function(){CxMsg.info('指派权限成功');}, 600); //延时显示，防止提示框抖动
			    		frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.error('指派权限失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('指派权限失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
			    }
			});
		},
		
		submitPos: function(f) {
			let frm=$(f), prefix = f.cmd.value=='create' ? '添加' : '修改',
				data = frm.serializeJson(),
				url=f.cmd.value=='create' ? CxMisc.finalizeUrl('/wggw/addJgGw') : CxMisc.finalizeUrl('/wggw/updateJgGw');
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
			    		gWgp.loadOrg(); //刷新列表
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
gWgp.bindEvents();
gWgp.loadOrg();

