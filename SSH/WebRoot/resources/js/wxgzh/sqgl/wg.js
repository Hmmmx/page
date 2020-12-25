/**
 * 只有url, options 与 jgid 不同，不要直接修改此文件
 */
const CxWg = {
	loadFcxxTree: function(target, options) {
		options = Object.assign({level: 4}, options, {selectable: {'fc':true}}); //默认房产可被选中
		let jgid = null; // 该参数暂在此处获取
		if (document.querySelector('.page-body select[name=jgid]')) 
			jgid = document.querySelector('.page-body select[name=jgid]').value;
		else if (CxMisc.qs.get('jgid')) 
			jgid = CxMisc.qs.get('jgid');
		else if (CxMisc.qs.get('sqid')) 
			jgid = CxMisc.qs.get('sqid');
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/sqgl/loadFcxxTree'),
		    type: "GET",
		    data: {mode: options.mode?options.mode:null, jgid: jgid},
		    beforeSend: function(xhr, cfg) {
		    	$(target).mask('show');
		    },
		    success: function(res, ts) {
		    	if (res.code == "0") {
		    		if (res.data && res.data.length>0) 
		    			CxWg.renderTree(target,
		    				CxWg.fcList2Tree(res.data, options),
		    				options);
		    		else { // modified
		    			// if ($(target).treeview('initialized')) $(target).treeview('remove');
		    			CxCtrl.alert('该小区无房产信息返回');
		    		}
		    	} else {
		    		CxCtrl.alert('载入房产信息失败, 请稍后重新打开：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxCtrl.alert('载入房产信息失败, 请稍后重新打开：' + msg);
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
		/*let clz = null;
		if (status) {
			if (status.zlzt) clz = status.zlzt == '1' ? 'ycz' : 'wcz';
			else if (status.rzzt) clz = status.rzzt == '1' ? 'yrz' : 'wrz';
			else if (status.slzt) clz = status.slzt == '1' ? 'ysl' : 'wsl';
		}
		return clz ? ('iconfont icondoor tv-fc ' + clz) : 'iconfont icondoor tv-fc';*/  // modified
		return 'iconfont icondoor tv-fc';
	},
	khTreeNodeStatusClz: function(khlxdm) {
		let clz = null;
		if (khlxdm) {
			clz = 'khlxdm-' + khlxdm;
		}
		return clz ? ('far fa-user tv-kh ' + clz) : 'far fa-user tv-kh';
	},
	
	fcxxTreeNodeAjax: function(node, options, complete) {
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/sqgl/loadFcxxTreeNode'),
		    type: "GET",
		    data: {id: node.data.id, type: node.data.type, mode: options.mode, range: options.range},
		    success: function(res, ts) {
		    	let subs = null;
		    	if (res.code == "0" && res.data) {
		    		subs = CxWg.fcList2TreeNode(res.data, node, options);
		    	} else {
		    		CxCtrl.alert('载入信息失败, 请稍后重试：' + res.message);
		    	}
		    	complete(subs); // 调用complete，更新treeview
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxCtrl.alert('载入信息失败, 请稍后重试：' + msg);
		    	complete();
		    }
		});
	},
	
	
	
	renderTree: function(selector, data, options) {
		let tvCntr = $(selector), 
			// currentNode = tvCntr.data('currentNode'), //modified
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
			// tvCntr.data('currentNode', data);
			if (options && typeof options.nodeSelected === 'function') options.nodeSelected(data);
		});
		
		// if (currentNode) {
		// 	tvCntr.treeview('openNode', [currentNode.nodeId, {silent: true}]);
		// }
	}
};