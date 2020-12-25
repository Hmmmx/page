const CxWg = {
	selectableFcxxTree: function(target, selectable) {
		if ($(target).hasClass('treeview')) { // 有此class表示树忆生成
			$(target).treeview('setOptions', [{silent:true, selectable: {'sq':selectable, 'qy':selectable, 'ly':selectable, 'dy':selectable, 'fc':true}}]);
			let targets = [];
			let nodes = $(target).treeview('getAllNodes');
			for (let i=0; i<nodes.length; i++) {
				if (nodes[i].data.type == 'sq' || nodes[i].data.type == 'qy' || nodes[i].data.type == 'ly' || nodes[i].data.type == 'dy') {
					targets.push(nodes[i].nodeId);
				}
			}
			if (targets.length>0) $(target).treeview('editNodeWithoutRender', [targets, {selectable:selectable}]);
			let selected = $(target).treeview('getSelected');
			if (selected && selected.length>0) {
				if (selected[0].data.type != 'fc') $(target).treeview('unselectNode', [selected[0].nodeId]);
			}
		}
	},
	
	
	
	loadGwqxTree: function(target, data, options) {
		CxMisc.ajax({
		    url: CxMisc.finalizeUrl('/wggw/getGwgn'),
		    type: "GET",
		    data: data,
		    beforeSend: function(xhr, cfg) {
		    	$(target).mask('show', {msg: '正在载入，请稍后...'});
		    },
		    success: function(res, ts) {
		    	if (res.code == "0" && res.data && res.data.length>0) {
		    		let gwqxTreeData = CxWg.gwqxData2Tree(res.data);
		    		for (let i=0; i<gwqxTreeData.length; i++) { // 设置根目录是否选中
		    			let node = gwqxTreeData[i];
		    			if (node.nodes) {
			    			for (let j=0; j<node.nodes.length; j++) {
			    				if (node.nodes[j].state.checked) {
				    				node.state.checked = true;
				    				break;
			    				}
			    			}
		    			}
		    		}
		    		CxWg.renderGwqxTreeView(target, gwqxTreeData, options);
		    	} else {
		    		CxMsg.warn('载入权限菜单失败, 请稍后重试：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.error('载入权限菜单失败, 请稍后重试：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	$(target).mask('hide');
		    }
		});
	},
	gwqxData2Tree: function(data) {
		let root = {children: data}, treeRoot = {};
		CxWg._gwwxData2Tree(root, treeRoot);
		return treeRoot.nodes;
	},
	_gwwxData2Tree: function(parentNode, parentTreeNode) {
		if (parentNode.children) {
			parentTreeNode.nodes = [];
			for (let i=0; i<parentNode.children.length; i++) {
				let node = parentNode.children[i], 
					treeNode = {text: node.cdmc, data: node, state: {checked: node.checked}};
				if (node.cdlx == 2) {// !node.children || node.children.length==0
					treeNode.icon = 'far fa-list-alt tv-leaf';
					// treeNode.selectable = false;
				} else {
					// treeNode.selectable = false;
					treeNode.folder = true;
					CxWg._gwwxData2Tree(node, treeNode);
				}
				parentTreeNode.nodes.push(treeNode);
			}
		}
	},
	renderGwqxTreeView: function(target, data, options) {
		$(target).treeview({
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
		    levels: options && options.level ? options.level : 4
		}).on('nodeChecked', function(event, data) {
			$(target).treeview('hierCheckNode', [data.nodeId, {silent:true}]);
		}).on('nodeUnchecked', function(event, data) {
			$(target).treeview('hierUncheckNode', [data.nodeId, {silent:true}]);
		});
		$(target).treeview('scanPartialChecked', [{silent:true}]);
	},
	getGwqxTreeSelectedNodeCdid: function(target) {
		let nodes = $(target).treeview('getChecked'), nodeIds = [];
		for (let i=0; i<nodes.length; i++) {
			nodeIds.push(`'${nodes[i].data.cdid}'`);
		}
		return nodeIds.join(',');
	},
	
	
	
	loadSqTree: function(target, options) {
		CxMisc.ajax({
		    url: CxMisc.finalizeUrl('/wgjg/getXtjg'),
		    type: "GET",
		    beforeSend: function(xhr, cfg) {
		    	$(target).mask('show');
		    },
		    success: function(res, ts) {
		    	if (res.code == "0" && res.data && res.data.length>0) {
		    		CxWg.renderTree(target,
		    				CxWg.sqgwData2Tree(res.data),
		    				options);
		    	} else {
		    		CxMsg.warn('载入机构失败, 请稍后重新打开：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.error('载入机构失败, 请稍后重新打开：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	$(target).mask('hide');
		    }
		});
	},
	sqgwData2Tree: function(data) {
		let root = {children: data}, treeRoot = {};
		CxWg._sqgwData2Tree(root, treeRoot);
		return treeRoot.nodes;
	},
	_sqgwData2Tree: function(parentNode, parentTreeNode) {
		if (parentNode.children) {
			parentTreeNode.nodes = [];
			for (let i=0; i<parentNode.children.length; i++) {
				let node = parentNode.children[i], treeNode = {text: node.sqmc, data: node};
				if (!node.children) { // || node.children.length==0
					treeNode.icon = 'far fa-list-alt tv-leaf';
					// treeNode.selectable = false;
				} else {
					// treeNode.selectable = false;
					if (node.sqid == '0') // 根目录
						treeNode.selectable = false;
					treeNode.folder = true;
					CxWg._sqgwData2Tree(node, treeNode);
				}
				parentTreeNode.nodes.push(treeNode);
			}
		}
	},
	
	
	
	loadJgTree: function(url, target, options) {
		CxMisc.ajax({
		    url: url,
		    type: "GET",
		    beforeSend: function(xhr, cfg) {
		    	$(target).mask('show');
		    },
		    success: function(res, ts) {
		    	if (res.code == "0" && res.data && res.data.length>0) {
		    		CxWg.renderTree(target,
		    				CxWg.sqData2Tree(res.data),
		    				options);
		    	} else {
		    		CxMsg.warn('载入机构失败, 请稍后重新打开：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.error('载入机构失败, 请稍后重新打开：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	$(target).mask('hide');
		    }
		});
	},
	sqData2Tree: function(data) {
		let root = {children: data}, treeRoot = {};
		CxWg._sqData2Tree(root, treeRoot);
		return treeRoot.nodes;
	},
	_sqData2Tree: function(parentNode, parentTreeNode) {
		if (parentNode.children) {
			parentTreeNode.nodes = [];
			for (let i=0; i<parentNode.children.length; i++) {
				let node = parentNode.children[i], treeNode = {text: node.mc, data: node};
				if (!node.children) { // || node.children.length==0
					treeNode.icon = 'far fa-list-alt tv-leaf';
					// treeNode.selectable = false;
				} else {
					treeNode.folder = true;
					treeNode.selectable = false;
					CxWg._sqData2Tree(node, treeNode);
				}
				parentTreeNode.nodes.push(treeNode);
			}
		}
	},
	

	
	loadFcxxTree: function(target, options) {
		options = Object.assign({level: 4, selectable: {'fc':true}}, options); //默认房产可被选中
		CxMisc.ajax({
		    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/loadFcxxTree'),
		    type: "GET",
		    data: {mode: options.mode?options.mode:null, range: options.range?options.range:30},
		    beforeSend: function(xhr, cfg) {
		    	$(target).mask('show');
		    },
		    success: function(res, ts) {
		    	if (res.code == "0" && res.data && res.data.length>0) {
		    		CxWg.renderTree(target,
		    				CxWg.fcList2Tree(res.data, options),
		    				options);
		    	} else {
		    		CxMsg.warn('载入房产信息失败, 请稍后重新打开：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.error('载入房产信息失败, 请稍后重新打开：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	$(target).mask('hide');
				if (options && typeof options.treeLoaded === 'function') options.treeLoaded();
		    }
		});
	},
	fcList2Tree: function(list, options) {
		let root = {
			text: '房产资源', 
			value: 'SfFcxxRoot', 
			icon: 'fas fa-home tv-total', 
			selectable: false, 
			data: {type: 'root'},
			type: 'root',
			nodes: []
		};
		for (let i=0; i<list.length; i++) {
			if (list[i].type == 'sq') {
				if (!options.presentable || !options.presentable['sq'] || options.presentable['sq'] == list[i].dm) { //  批量核定生成树时，限定只显示选中的社区
					let sq = {
						text: list[i].mc, 
						icon: 'fas fa-city tv-sq', 
						selectable: options.selectable['sq'] === true, 
						data: list[i]
					};
					if (list[i].yxbj !== undefined) sq.state = {invalid: list[i].yxbj=='0'};
					root.nodes.push(sq);
					for (let j=0; j<list.length; j++) {
						if (list[j].type == 'qy' && list[j].pid == list[i].nid) {
							let qy = {
								text: list[j].mc, 
								icon: 'fas fa-landmark tv-qy', 
								selectable: options.selectable['qy'] === true, 
								data: list[j]
							};
							if (list[j].yxbj !== undefined) qy.state = {invalid: list[j].yxbj=='0'};
							if (!sq.nodes) sq.nodes = [];
							sq.nodes.push(qy);
							for (let k=0; k<list.length; k++) {
								if (list[k].type == 'ly' && list[k].pid == list[j].nid) {
									let ly = {
										text: list[k].mc, 
										icon: 'fas fa-building tv-ly', 
										selectable: options.selectable['ly'] === true, 
										data: list[k],
										nodes: [],
										ajax: true
									};
									if (list[k].yxbj !== undefined) ly.state = {invalid: list[k].yxbj=='0'};
									if (!qy.nodes) qy.nodes = [];
									qy.nodes.push(ly);
									if (options.range && options.range>=40) {
										ly.ajax = false;
										ly.nodes = CxWg.fcList2TreeNode(list, ly, options);
									}
								}
							}
						}
					}
				}
			}
		}
		return [root];
	},
	
	fcList2TreeNode: function(list, parent, options) {
		let subs = null;
		if (list && list.length>0) {
			for (let i=0; i<list.length; i++) {
				if (list[i].pid == parent.data.nid) {
					if (list[i].type == 'qy') {
						let qy = {
							text: list[i].mc, 
							icon: 'fas fa-landmark tv-qy', 
							selectable: options.selectable['qy'] === true,
							data: list[i]
						};
						if (list[i].yxbj !== undefined) qy.state = {invalid: list[i].yxbj=='0'};
						if (subs === null) subs = [];
						subs.push(qy);
					} else if (list[i].type == 'ly') {
						let ly = {
							text: list[i].mc, 
							icon: 'fas fa-building tv-ly', 
							selectable: options.selectable['ly'] === true,
							data: list[i]
						};
						if (list[i].yxbj !== undefined) ly.state = {invalid: list[i].yxbj=='0'};
						if (subs === null) subs = [];
						subs.push(ly);
					} else if (list[i].type == 'dy') {
						let dy = {
							text: list[i].mc, 
							icon: 'far fa-building tv-dy', 
							selectable: options.selectable['dy'] === true,
							data: list[i]
						};
						if (list[i].yxbj !== undefined) dy.state = {invalid: list[i].yxbj=='0'};
						if (subs === null) subs = [];
						subs.push(dy);
						dy.nodes = CxWg.fcList2TreeNode(list, dy, options);
					} else if (list[i].type == 'fc') {
						let fc = {
							text: list[i].sub ? `${list[i].mc}(${list[i].sub})` : list[i].mc, 
							icon: CxWg.fcTreeNodeStatusClz(list[i].ext), 
							selectable: options.selectable['fc'] === true,
							data: list[i]
						};
						if (list[i].yxbj !== undefined) fc.state = {invalid: list[i].yxbj=='0'};
						if (subs === null) subs = [];
						subs.push(fc);
						fc.nodes = CxWg.fcList2TreeNode(list, fc, options);
					} else if (list[i].type == 'kh') {
						let kh = {
							text: list[i].mc, 
							icon: CxWg.khTreeNodeStatusClz(list[i].sub), 
							selectable: options.selectable['kh'] === true,
							data: list[i]
						};
						if (list[i].yxbj !== undefined) kh.state = {invalid: list[i].yxbj=='0'};
						if (subs === null) subs = [];
						subs.push(kh);
					}
				}
			}
		}
		return subs;
	},
	
	fcTreeNodeStatusClz: function(status) {
		let clz = null;
		if (status) {
			if (status.zlzt) clz = status.zlzt == '1' ? 'ycz' : 'wcz';
			else if (status.rzzt) clz = status.rzzt == '1' ? 'yrz' : 'wrz';
			else if (status.slzt) clz = status.slzt == '1' ? 'ysl' : 'wsl';
		}
		return clz ? ('iconfont icondoor tv-fc ' + clz) : 'iconfont icondoor tv-fc';
	},
	khTreeNodeStatusClz: function(khlxdm) {
		let clz = null;
		if (khlxdm) {
			clz = 'khlxdm-' + khlxdm;
		}
		return clz ? ('far fa-user tv-kh ' + clz) : 'far fa-user tv-kh';
	},
	
	fcxxTreeNodeAjax: function(node, options, complete) {
		CxMisc.ajax({
		    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/loadFcxxTreeNode'),
		    type: "GET",
		    data: {id: node.data.id, type: node.data.type, mode: options.mode, range: options.range},
		    success: function(res, ts) {
		    	let subs = null;
		    	if (res.code == "0" && res.data) {
		    		subs = CxWg.fcList2TreeNode(res.data, node, options);
		    	} else {
		    		CxMsg.warn('载入信息失败, 请稍后重试：' + res.message);
		    	}
		    	complete(subs); // 调用complete，更新treeview
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxMsg.error('载入信息失败, 请稍后重试：' + msg);
		    	complete();
		    }
		});
	},
	
	
	
	renderTree: function(selector, data, options) {
		let tvCntr = $(selector), 
			currentNode = tvCntr.data('currentNode'),
			opt = {
				data: data,
				expandIcon: 'fas fa-angle-right tv-expand',
				collapseIcon: 'fas fa-angle-down tv-expand',
			    checkedIcon: 'fas fa-check-square tv-cbx-checked',
			    partialCheckedIcon: 'far fa-check-square tv-cbx-checked',
			    uncheckedIcon: 'far fa-square tv-cbx-unchecked',
			    showCheckbox: options && options.checkbox ? true : false,
			    showBorder:false,
			    emptyIcon: 'fas fa-minus transparent',
			    nodeIcon: 'far fa-folder tv-branch',
			    iconExt: {
			    	folderOpen: 'far fa-folder-open tv-branch', 
			    	folderClosed: 'far fa-folder tv-branch',
			    	loading: 'fas fa-circle-notch fa-spin tv-loading'
			    },
			    selectedBackColor: '#b8ecfd',
			    selectedColor: '#212529',
			    unselectedEnabled: options && options.unselectedEnabled ? true : false,
				levels: options && options.level ? options.level : 3
			};
		if (options) {
			if (options.mode) opt.mode = options.mode; // 查询节点时的模式：full 所有节点，lite 只包含有效节点
			if (options.range !== undefined) opt.range = options.range; // 请求查询下级节点时的范围（暂只支持客户级） range : 'kh'
			if (options.expandAddNode !== undefined) opt.expandAddNode = options.expandAddNode; //  动态添加节点后，是否展开该节点（展开层数与树展开层数相同） expandAddNode : true
			if (options.checkedEventType !== undefined) opt.checkedEventType = options.checkedEventType; // 选中checkbox时的事件类型，默认是只选中当前元素， checkedEventType : 'hierarchy'时选中上下级相关所有元素
			if (options.selectable !== undefined) opt.selectable = options.selectable; // 设置允许选择的节点：selectable：{'sq':true, .... 'kh':true}
			if (options.exclusive !== undefined) opt.exclusive = options.exclusive; // 设置只能选择一个节点的层级，如同一房产下客户层只能选一个 exclusive：{'kh':true}
			if (options.presentable !== undefined) opt.presentable = options.presentable; // 设置显示的节点，如只显示业主客户 presentable：{'kh':'00'}
		}
		opt.ajaxHandler = CxWg.fcxxTreeNodeAjax;
		let tv = tvCntr.treeview(opt).on('nodeSelected', function(event, data) {
			tvCntr.data('currentNode', data);
			if (options && typeof options.nodeSelected === 'function') options.nodeSelected(data);
		});
		
		if (currentNode) {
			tvCntr.treeview('openNode', [currentNode.nodeId, {silent: true}]);
		}
	}
};