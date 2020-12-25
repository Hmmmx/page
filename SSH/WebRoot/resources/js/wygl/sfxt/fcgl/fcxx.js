if (typeof window.SfFcFcxx === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const tvCfg = {mode: 'full', selectable: {'sq':true, 'qy':true, 'ly':true, 'dy':true, 'fc':true}};
	const cntrSelector = '#wgSfFcFcxxCntr';
	const loadingMask1 = '#wgSfFcFcxxCntr';
	const loadingMask2 = '#wgSfFcFcxxCntr .col-extended';
	
	window.SfFcFcxx = {
		bind: function() {
			CxWg.loadFcxxTree('#wgSfFcFcxxCntr .tv-wrapper', Object.assign({}, tvCfg, {nodeSelected: SfFcFcxx.nodeSelected}));
			CxMisc.enableFullpage(cntrSelector);
			$('#wgSfFcFcxxCntr div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			
			$('#wgSfFcFcxx_fcDtls input[name=fchm]').on('input', function(){
				SfFcFcxx.genFcmc(this);
			});
			
			$('#wgSfFcFcxxCntr .toolbar button[data-cmd=back]').click(function(){
				SfFcFcxx.back(this);
			});
			
			$('#wgSfFcFcxxCntr .toolbar button[data-cmd=open-add], #wgSfFcFcxxCntr .toolbar .btn-group[data-cmd=open-add] [data-type]').click(function(){
				SfFcFcxx.openAdd(this);
			});
			
			$('#wgSfFcFcxxCntr .toolbar button[data-cmd=update], #wgSfFcFcxxCntr .toolbar button[data-cmd=add]').click(function(){
				SfFcFcxx.submit(this);
			});
			
			$('#wgSfFcFcxxCntr .toolbar button[data-cmd=del]').click(function(e){
				SfFcFcxx.del(e, this);
			});
		},
		
		back: function() {
			let node = $('#wgSfFcFcxxCntr .tv-wrapper').treeview('getSelected')[0];
			SfFcFcxx.openDtls(node);
		},
		
		clearStatus: function() {
			$('#wgSfFcFcxxCntr form[data-auto-validate=true]').each(function(){
				this.reset();
				$(this).removeClass('was-validated').find('input[type=hidden]').val(''); // 设置所有hidden为空值
			});
		},
		
		del: function(evt, el) {
			let target = $(el), hasSub = false;
				node = $('#wgSfFcFcxxCntr .tv-wrapper').treeview('getSelected')[0], 
				mc = node.data.mc, id = node.data.id, type = node.data.type, nodeId = node.nodeId;
			if (node.nodes) {
				for (let i=0; i<node.nodes.length; i++) {
					if (!node.nodes[i].state.deleted) {
						hasSub = true;
						break;
					}
				}
			}
			if (hasSub) {
				CxMsg.info('请先删除下级节点');
			} else {
				CxCtrl.confirm('是否确定删除'+mc+'？', function(src){
					CxMisc.ajax({
					    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/del'),
					    type: "POST",
					    data: {id: id, type: type},
					    beforeSend: function(xhr, cfg) {
					    	CxMisc.markAjaxStart(target);
					    },
					    success: function(res, ts) {
					    	if (res.code == "0") {
					    		CxMsg.info('删除成功');
					    		$('#wgSfFcFcxxCntr .tv-wrapper').treeview('deleteNode', [nodeId, {silent: true}]);
					    		SfFcFcxx.openDef();
					    	} else {
					    		CxMsg.warn('删除失败：' + res.message);
					    	}
					    },
					    error: function(xhr, ts, err) {
					    	var msg = "[" + xhr.status + " : " + ts + "]";
					    	CxMsg.warn('删除失败：' + msg);
					    },
					    complete: function(xhr, ts) {
					    	CxMisc.markAjaxEnd(target);
					    }
					});
				}, {
			    	evt: evt,
			    	src: el,
			    	placement: 'bottom'
			    });
			}
		},
		
		getSelectedNode: function() {
			if ($('#wgSfFcFcxxCntr .tv-wrapper').hasClass('treeview')) {
				let selecteds = $('#wgSfFcFcxxCntr .tv-wrapper').treeview('getSelected');
				if (selecteds.length > 0) return selecteds[0];
				else return null;
			} return null;
		},
		
		genFcmc: function(el) {
			let node = $('#wgSfFcFcxxCntr .tv-wrapper').treeview('getSelected')[0], mc = el.value;
			if (node.data.type != 'fc') mc = node.data.mc + ">" + mc;
			while (node && node.data && node.data.type != 'sq') {
				node = $('#wgSfFcFcxxCntr .tv-wrapper').treeview('getParent', [node.nodeId]);
				mc = node.data.mc + ">" + mc;
			}
			el.form.fcmc.value = mc.length>100?mc.substring(0,100):mc;
		},
		
		getInfo: function(node, mode) {
			SfFcFcxx.clearStatus();
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/getInfo'),
			    type: "GET",
			    data: {id: node.data.id, type: node.data.type, mode: mode},
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask2).mask('show');
			    },
			    success: function(res, ts) {
			    	let curr = SfFcFcxx.getSelectedNode();
			    	if (!curr || curr.data.id != node.data.id) return; // 验证数据返回后当前选中的节点是否与提交时一样，不一致时丢弃数据
			    	if (res.code == "0") {
			    		if (res.data) {
			    			if (node.data.type == 'sq') {
				    			let f = document.querySelector('#wgSfFcFcxx_sqDtls form'), data = res.data;
				    			f.sqid.value = data.sqid;
				    			f.sqdm.value = data.sqdm;
				    			f.sqmc.value = data.sqmc;
				    			if (data.syqxq) $('#wgSfFcFcxx_sq_syqxq_p').datetimepicker('date', data.syqxq);
				    			if (data.syqxz) $('#wgSfFcFcxx_sq_syqxz_p').datetimepicker('date', data.syqxz);
				    			if (data.plxh !== null) f.plxh.value = data.plxh;
				    			if (data.yxbj !== null) CxMisc.selectRadio('yxbj', data.yxbj, f);
				    			if (data.lxr) f.lxr.value = data.lxr;
				    			if (data.lxdh) f.lxdh.value = data.lxdh;
				    			if (data.dz) f.dz.value = data.dz;
				    			if (data.bz) f.bz.value = data.bz;
			    			} else if (node.data.type == 'qy') {
			    				let f = document.querySelector('#wgSfFcFcxx_qyDtls form'), data = res.data;
				    			f.qyid.value = data.qyid;
				    			f.sqdm.value = data.sqdm;
				    			f.qymc.value = data.qymc;
				    			if (data.plxh !== null) f.plxh.value = data.plxh;
				    			if (data.yxbj !== null) CxMisc.selectRadio('yxbj', data.yxbj, f);
			    			} else if (node.data.type == 'ly') {
			    				let f = document.querySelector('#wgSfFcFcxx_lyDtls form'), data = res.data;
				    			f.lyid.value = data.lyid;
				    			f.qyid.value = data.qyid;
				    			f.lymc.value = data.lymc;
				    			if (data.plxh !== null) f.plxh.value = data.plxh;
				    			if (data.yxbj !== null) CxMisc.selectRadio('yxbj', data.yxbj, f);
			    			} else if (node.data.type == 'dy') {
			    				let f = document.querySelector('#wgSfFcFcxx_dyDtls form'), data = res.data;
				    			f.dyid.value = data.dyid;
				    			f.lyid.value = data.lyid;
				    			f.dymc.value = data.dymc;
				    			if (data.plxh !== null) f.plxh.value = data.plxh;
				    			if (data.yxbj !== null) CxMisc.selectRadio('yxbj', data.yxbj, f);
			    			} else if (node.data.type == 'fc') {
			    				let f = document.querySelector('#wgSfFcFcxx_fcDtls form'), data = res.data;
				    			f.fcid.value = data.fcid;
				    			f.dyid.value = data.dyid;
				    			f.lyid.value = data.lyid;
				    			f.qyid.value = data.qyid;
				    			f.sqdm.value = data.sqdm;
				    			f.fchm.value = data.fchm;
				    			f.fcmc.value = data.fcmc;
				    			if (data.lcdm) $(f.lcdm).val(data.lcdm);
				    			if (data.plxh !== null) f.plxh.value = data.plxh;
				    			if (data.jzmj !== null) f.jzmj.value = data.jzmj;
				    			if (data.tnmj !== null) f.tnmj.value = data.tnmj;
				    			if (data.slzt) CxMisc.selectRadio('slzt', data.slzt, f);
				    			if (data.slrq) $('#wgSfFcFcxx_fc_slrq_p').datetimepicker('date', data.slrq);
				    			if (data.rzzt) CxMisc.selectRadio('rzzt', data.rzzt, f);
				    			if (data.rzrq) $('#wgSfFcFcxx_fc_rzrq_p').datetimepicker('date', data.rzrq);
				    			if (data.zxzt) CxMisc.selectRadio('zxzt', data.zxzt, f);
				    			if (data.zxrq) $('#wgSfFcFcxx_fc_zxrq_p').datetimepicker('date', data.zxrq);
				    			if (data.cszt) CxMisc.selectRadio('cszt', data.cszt, f);
				    			if (data.fczt) CxMisc.selectRadio('fczt', data.fczt, f);
				    			if (data.zlzt) CxMisc.selectRadio('zlzt', data.zlzt, f);
				    			if (data.czzt) CxMisc.selectRadio('czzt', data.czzt, f);
				    			if (data.sshxdm) $(f.sshxdm).val(data.sshxdm);
				    			if (data.cxdm) $(f.cxdm).val(data.cxdm);
				    			if (data.fclxdm) $(f.fclxdm).val(data.fclxdm);
				    			if (data.fcxzdm) $(f.fcxzdm).val(data.fcxzdm);
				    			if (data.bz) f.bz.value = data.bz;
			    			}
			    		}
			    	} else {
			    		CxMsg.warn('查询失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$(loadingMask2).mask('hide');
			    }
			});
		},
		
		openAdd: function(el) {
			let parent = $(el).closest('.toolbar').children(':first-child'), subType = $(el).data('sub-type');
			parent.children('.btn-group[data-cmd=open-add]').addClass('d-none').each(function(){this.disabled = true;});
			parent.children('button[data-cmd=open-add],button[data-cmd=update],button[data-cmd=del]').addClass('d-none').each(function(){this.disabled = true;});
			parent.children('button[data-cmd=back],button[data-cmd=add]').attr('data-type', subType).removeClass('d-none').each(function(){this.disabled = false;}) // back, save btn
			
			$(`#wgSfFcFcxxCntr .main-content ul.nav-tabs>li>a[data-type=${subType}]`).click();
			
			let node = $('#wgSfFcFcxxCntr .tv-wrapper').treeview('getSelected')[0];
			if (subType == 'sq') {
				let f = document.querySelector('#wgSfFcFcxx_sqDtls form');
				f.sqid.value = '';
			} else if (subType == 'qy') {
				let f = document.querySelector('#wgSfFcFcxx_qyDtls form');
				f.qyid.value = '';
				f.sqdm.value = node.data.dm;
			} else if (subType == 'ly') {
				let f = document.querySelector('#wgSfFcFcxx_lyDtls form');
				f.lyid.value = '';
				f.qyid.value = node.data.id;
			} else if (subType == 'dy') {
				let f = document.querySelector('#wgSfFcFcxx_dyDtls form');
				f.dyid.value = '';
				f.lyid.value = node.data.id;
			} else if (subType == 'fc') {
				let f = document.querySelector('#wgSfFcFcxx_fcDtls form');
				f.fcid.value = '';
				let pTreeNode = null;
				if (node.data.type == 'dy') {
					f.dyid.value = node.data.id;
					pTreeNode = $('#wgSfFcFcxxCntr .tv-wrapper').treeview('getParent', [node.nodeId]);
					f.lyid.value = pTreeNode.data.id;
				} else {
					f.dyid.value = '';
					pTreeNode = node;
					f.lyid.value = node.data.id;
				}
				pTreeNode = $('#wgSfFcFcxxCntr .tv-wrapper').treeview('getParent', [pTreeNode.nodeId]);
    			f.qyid.value = pTreeNode.data.id;
    			pTreeNode = $('#wgSfFcFcxxCntr .tv-wrapper').treeview('getParent', [pTreeNode.nodeId]);
				f.sqdm.value = pTreeNode.data.dm;
			}
		},
		
		openDef: function() {
			$(`#wgSfFcFcxxCntr .main-content ul.nav-tabs>li>a[data-type=zy]`).click();
			setTimeout(function(){$('#wgSfFcFcxxCntr .toolbar button').each(function(){this.disabled = true;});}, 200); // ajax操作后会重新激活按纽，故须延时后再禁用
		},
		
		openDtls: function(node) {
			$('#wgSfFcFcxxCntr .toolbar button').each(function(){this.disabled = false;});
			$('#wgSfFcFcxxCntr .toolbar .btn-group[data-cmd=open-add]').addClass("d-none");
			$(`#wgSfFcFcxxCntr .toolbar button[data-cmd=open-add][data-type!=${node.data.type}]`).addClass("d-none");
			$(`#wgSfFcFcxxCntr .toolbar button[data-cmd=open-add][data-type=${node.data.type}]`).removeClass("d-none");
			$('#wgSfFcFcxxCntr .toolbar button[data-cmd=update],#wgSfFcFcxxCntr .toolbar button[data-cmd=del]').removeClass("d-none");
			$('#wgSfFcFcxxCntr .toolbar button[data-cmd=back],#wgSfFcFcxxCntr .toolbar button[data-cmd=add]').addClass("d-none");
			if (node.data.type == 'ly') {
				$('#wgSfFcFcxxCntr .toolbar .btn-group[data-cmd=open-add]').removeClass("d-none");
				// $('#wgSfFcFcxxCntr .toolbar button[data-cmd=open-add][data-type=dy]').removeClass("d-none");
			}
			if (node.data.type == 'sq') {
				$('#wgSfFcFcxxCntr .toolbar button[data-cmd=update],#wgSfFcFcxxCntr .toolbar button[data-cmd=add],#wgSfFcFcxxCntr .toolbar button[data-cmd=del]').each(function(){this.disabled = true;});
			}
			
			$(`#wgSfFcFcxxCntr .main-content ul.nav-tabs>li>a[data-type=${node.data.type}]`).click();
		},
		
		submit: function(el) {
			let target = $(el), cmd = target.data('cmd');
			let node = $('#wgSfFcFcxxCntr .tv-wrapper').treeview('getSelected')[0];
			if (cmd == 'add') {
				if (node.ajax && node.loading) {
					CxMsg.info('请等待查询完成再保存');
					return;
				}
				
				let type = target.attr('data-type');
				if (type == 'qy') {
					let f = document.querySelector('#wgSfFcFcxx_qyDtls form');
					if (f.qyid.value == '' && CxMisc.validate(f)) {
						$(f).removeClass('was-validated');
				    	CxMisc.ajax({
						    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/editQy'),
						    type: "POST",
						    data: $(f).serializeJson(),
						    beforeSend: function(xhr, cfg) {
						    	CxMisc.markAjaxStart(target);
						    },
						    success: function(res, ts) {
						    	if (res.code == "0") {
						    		CxMsg.info('保存成功');
						    		if (!node.ajax || node.ajax && node.loaded) {
							    		let subs = CxWg.fcList2TreeNode(res.data, node, tvCfg);
							    		$('#wgSfFcFcxxCntr .tv-wrapper').treeview('addNode', [node.nodeId, {node: subs, silent: true}]);
						    		}
						    	} else {
						    		CxMsg.warn('保存失败：' + res.message);
						    	}
						    },
						    error: function(xhr, ts, err) {
						    	var msg = "[" + xhr.status + " : " + ts + "]";
						    	CxMsg.warn('保存失败：' + msg);
						    },
						    complete: function(xhr, ts) {
						    	CxMisc.markAjaxEnd(target);
						    }
						});
					}
				} else if (type == 'ly') {
					let f = document.querySelector('#wgSfFcFcxx_lyDtls form');
					if (f.lyid.value == '' && CxMisc.validate(f)) {
						$(f).removeClass('was-validated');
						CxMisc.ajax({
						    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/editLy'),
						    type: "POST",
						    data: $(f).serializeJson(),
						    beforeSend: function(xhr, cfg) {
						    	CxMisc.markAjaxStart(target);
						    },
						    success: function(res, ts) {
						    	if (res.code == "0") {
						    		CxMsg.info('保存成功');
						    		if (!node.ajax || node.ajax && node.loaded) {
							    		let subs = CxWg.fcList2TreeNode(res.data, node, tvCfg);
							    		$('#wgSfFcFcxxCntr .tv-wrapper').treeview('addNode', [node.nodeId, {node: subs, silent: true}]);
						    		}
						    	} else {
						    		CxMsg.warn('保存失败：' + res.message);
						    	}
						    },
						    error: function(xhr, ts, err) {
						    	var msg = "[" + xhr.status + " : " + ts + "]";
						    	CxMsg.warn('保存失败：' + msg);
						    },
						    complete: function(xhr, ts) {
						    	CxMisc.markAjaxEnd(target);
						    }
						});
					}
				} else if (type == 'dy') {
					let f = document.querySelector('#wgSfFcFcxx_dyDtls form');
					if (f.dyid.value == '' && CxMisc.validate(f)) {
						$(f).removeClass('was-validated');
						CxMisc.ajax({
						    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/editDy'),
						    type: "POST",
						    data: $(f).serializeJson(),
						    beforeSend: function(xhr, cfg) {
						    	CxMisc.markAjaxStart(target);
						    },
						    success: function(res, ts) {
						    	if (res.code == "0") {
						    		CxMsg.info('保存成功');
						    		if (!node.ajax || node.ajax && node.loaded) {
							    		let subs = CxWg.fcList2TreeNode(res.data, node, tvCfg);
							    		$('#wgSfFcFcxxCntr .tv-wrapper').treeview('addNode', [node.nodeId, {node: subs, silent: true}]);
						    		}
						    	} else {
						    		CxMsg.warn('保存失败：' + res.message);
						    	}
						    },
						    error: function(xhr, ts, err) {
						    	var msg = "[" + xhr.status + " : " + ts + "]";
						    	CxMsg.warn('保存失败：' + msg);
						    },
						    complete: function(xhr, ts) {
						    	CxMisc.markAjaxEnd(target);
						    }
						});
					}
				} else if (type == 'fc') {
					let f = document.querySelector('#wgSfFcFcxx_fcDtls form');
					if (f.fcid.value == '' && CxMisc.validate(f)) {
						$(f).removeClass('was-validated');
						let data = $(f).serializeJson({removeBlankField:true});
						
						CxMisc.ajax({
						    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/editFcxx'),
						    type: "POST",
						    data: data,
						    beforeSend: function(xhr, cfg) {
						    	CxMisc.markAjaxStart(target);
						    },
						    success: function(res, ts) {
						    	if (res.code == "0") {
						    		CxMsg.info('保存成功');
						    		if (!node.ajax || node.ajax && node.loaded) {
							    		let subs = CxWg.fcList2TreeNode(res.data, node, tvCfg);
							    		$('#wgSfFcFcxxCntr .tv-wrapper').treeview('addNode', [node.nodeId, {node: subs, silent: true}]);
						    		}
						    	} else {
						    		CxMsg.warn('保存失败：' + res.message);
						    	}
						    },
						    error: function(xhr, ts, err) {
						    	var msg = "[" + xhr.status + " : " + ts + "]";
						    	CxMsg.warn('保存失败：' + msg);
						    },
						    complete: function(xhr, ts) {
						    	CxMisc.markAjaxEnd(target);
						    }
						});
					}
				}
			} else if (cmd == 'update') {
				if (node.data.type == 'qy') {
					let f = document.querySelector('#wgSfFcFcxx_qyDtls form');
					if (f.qyid.value != '' && CxMisc.validate(f)) {
						$(f).removeClass('was-validated');
				    	CxMisc.ajax({
						    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/editQy'),
						    type: "POST",
						    data: $(f).serializeJson(),
						    beforeSend: function(xhr, cfg) {
						    	CxMisc.markAjaxStart(target);
						    },
						    success: function(res, ts) {
						    	if (res.code == "0") {
						    		CxMsg.info('修改成功');
						    		let d = {
					    				text: f.qymc.value, 
						    			state: Object.assign({}, node.state, {invalid: f.yxbj.value=="0"}),
						    			silent: true
						    		};
						    		if (f.plxh.value != "") {
						    			d.data = Object.assign({}, node.data);
						    			d.data.plxh = parseInt(f.plxh.value);
						    		}
						    		$('#wgSfFcFcxxCntr .tv-wrapper').treeview('editNode', [node.nodeId, d]);
						    	} else {
						    		CxMsg.warn('修改失败：' + res.message);
						    	}
						    },
						    error: function(xhr, ts, err) {
						    	var msg = "[" + xhr.status + " : " + ts + "]";
						    	CxMsg.warn('修改失败：' + msg);
						    },
						    complete: function(xhr, ts) {
						    	CxMisc.markAjaxEnd(target);
						    }
						});
					}
				} else if (node.data.type == 'ly') {
					let f = document.querySelector('#wgSfFcFcxx_lyDtls form');
					if (f.lyid.value != '' && CxMisc.validate(f)) {
						$(f).removeClass('was-validated');
						CxMisc.ajax({
						    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/editLy'),
						    type: "POST",
						    data: $(f).serializeJson(),
						    beforeSend: function(xhr, cfg) {
						    	CxMisc.markAjaxStart(target);
						    },
						    success: function(res, ts) {
						    	if (res.code == "0") {
						    		CxMsg.info('修改成功');
						    		let d = {
					    				text: f.lymc.value, 
					    				state: Object.assign({}, node.state, {invalid: f.yxbj.value=="0"}),
						    			silent: true
						    		};
						    		if (f.plxh.value != "") {
						    			d.data = Object.assign({}, node.data);
						    			d.data.plxh = parseInt(f.plxh.value);
						    		}
						    		$('#wgSfFcFcxxCntr .tv-wrapper').treeview('editNode', [node.nodeId, d]);
						    	} else {
						    		CxMsg.warn('修改失败：' + res.message);
						    	}
						    },
						    error: function(xhr, ts, err) {
						    	var msg = "[" + xhr.status + " : " + ts + "]";
						    	CxMsg.warn('修改失败：' + msg);
						    },
						    complete: function(xhr, ts) {
						    	CxMisc.markAjaxEnd(target);
						    }
						});
					}
				} else if (node.data.type == 'dy') {
					let f = document.querySelector('#wgSfFcFcxx_dyDtls form');
					if (f.dyid.value != '' && CxMisc.validate(f)) {
						$(f).removeClass('was-validated');
						CxMisc.ajax({
						    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/editDy'),
						    type: "POST",
						    data: $(f).serializeJson(),
						    beforeSend: function(xhr, cfg) {
						    	CxMisc.markAjaxStart(target);
						    },
						    success: function(res, ts) {
						    	if (res.code == "0") {
						    		CxMsg.info('修改成功');
						    		let d = {
					    				text: f.dymc.value, 
					    				state: Object.assign({}, node.state, {invalid: f.yxbj.value=="0"}),
						    			silent: true
						    		};
						    		if (f.plxh.value != "") {
						    			d.data = Object.assign({}, node.data);
						    			d.data.plxh = parseInt(f.plxh.value);
						    		}
						    		$('#wgSfFcFcxxCntr .tv-wrapper').treeview('editNode', [node.nodeId, d]);
						    	} else {
						    		CxMsg.warn('修改失败：' + res.message);
						    	}
						    },
						    error: function(xhr, ts, err) {
						    	var msg = "[" + xhr.status + " : " + ts + "]";
						    	CxMsg.warn('修改失败：' + msg);
						    },
						    complete: function(xhr, ts) {
						    	CxMisc.markAjaxEnd(target);
						    }
						});
					}
				} else if (node.data.type == 'fc') {
					let f = document.querySelector('#wgSfFcFcxx_fcDtls form');
					if (f.fcid.value != '' && CxMisc.validate(f)) {
						$(f).removeClass('was-validated');
						let data = $(f).serializeJson({removeBlankField:true});
						
						CxMisc.ajax({
						    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/editFcxx'),
						    type: "POST",
						    data: data,
						    beforeSend: function(xhr, cfg) {
						    	CxMisc.markAjaxStart(target);
						    },
						    success: function(res, ts) {
						    	if (res.code == "0") {
						    		CxMsg.info('修改成功');
						    		let d = {
						    			icon: CxWg.fcTreeNodeStatusClz({zlzt:data.zlzt, rzzt:data.rzzt, slzt:data.slzt}),
						    			text: node.data.sub ? `${f.fchm.value}(${node.data.sub})` : f.fchm.value, 
						    			state: Object.assign({}, node.state, {invalid: f.fczt.value=="0"}),
						    			silent: true
						    		};
						    		if (f.plxh.value != "") {
						    			d.data = Object.assign({}, node.data);
						    			d.data.plxh = parseInt(f.plxh.value);
						    		}
						    		$('#wgSfFcFcxxCntr .tv-wrapper').treeview('editNode', [node.nodeId, d]);
						    	} else {
						    		CxMsg.warn('修改失败：' + res.message);
						    	}
						    },
						    error: function(xhr, ts, err) {
						    	var msg = "[" + xhr.status + " : " + ts + "]";
						    	CxMsg.warn('修改失败：' + msg);
						    },
						    complete: function(xhr, ts) {
						    	CxMisc.markAjaxEnd(target);
						    }
						});
					}
				}
			}
		},
		
		nodeSelected: function(node) {
			SfFcFcxx.openDtls(node);
			SfFcFcxx.getInfo(node);
		}
	};
}

SfFcFcxx.bind();