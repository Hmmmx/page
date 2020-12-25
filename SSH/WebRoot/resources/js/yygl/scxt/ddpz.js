if (typeof window.Ddpz === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	window.Ddpz = {
		pager: null,
		filterData: null,
		prdList: null,
		selectedPrdList: {},
		promotions: null,
		noData: '<div class="text-muted text-center py-3"><span style="background-color: #f5f5f5;border-radius: 1rem;padding: .25rem .5rem;font-size:.75rem;">-- 没有数据 --</span></div>',
		
		bind: function(){
			// 以下是过滤栏 相关处理
			CxMisc.indicateFilter('#ddpzCntr', Ddpz.loadFilter); //绑定过滤栏下所有输入框输入提示，有输入时高亮显示
			
			$('#ddpzCntr .filterbar div.date[data-cx-ctrl=date]').datetimepicker({ //初始化日期选择
		        format: 'YYYY-MM-DD',
		        date: null // 必须设置为空，否则会自动选择当天日期
			});
			
			CxMisc.formValidated('#ddpzCntr form[data-type=filter]', Ddpz.filter);
			
			// 以下是订单列表相关处理
			CxMisc.bindCheckAll('#ddpzCntr');
			
			// 以下是添加订单相关处理
			$('#ddpzCntr button[data-cmd=add]').click(function(){
				Ddpz.popCreateDialog('create');
			});
			
			$('#ddpzModalDtls').on('show.bs.modal', function (e) {
				CxMisc.clearValidation(this); //默认任何modal显示时把上次验证结果去掉
				
		    	$(this).find("form")[0].reset();
		    	Ddpz.loadPrd(); // 载入商品列表
			});
			
			$('#ddpzModalDtls .prd-list-cntr .cx-action-bar button').click(function(){
				$(this).closest(".cx-action-bar").find('button').removeClass('active');
				$(this).addClass('active');
			});
			
			$('#ddpzModalDtls .prd-list-cntr .cx-action-bar button[data-cmd=home]').click(function(){
				Ddpz.showHome(this);
			});
			
			$('#ddpzModalDtls .prd-list-cntr .cx-action-bar button[data-cmd=cart]').click(function(){
				Ddpz.showShoppingCart();
			});

			$('#ddpzModalDtls .prd-list-cntr button[data-cmd=clearCart]').click(Ddpz.clearCart);
			
			$('#ddpzDtlsFrm input[name=hyzt]').click(function(){
				if ($(this).closest('form').find('.cx-action-bar button.cx-shopping-cart').hasClass('active')) 
					Ddpz.showShoppingCart(); // 刷新购物车
			});
			
			CxMisc.formValidated('#ddpzDtlsFrm', Ddpz.submitPrd);
			
			// 备注相关处理
			CxMisc.formValidated('#ddpzMiscFrm', Ddpz.submitPrdMisc);
			
			$('#ddpzModalMisc').on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
			
			$('#ddpzMiscFrm input[name=zfbj]').click(function(){
				$(this.form).find('.prd-zfje .value').text($(this.form).find('.prd-zfje .value').attr('data-zfbj-value-'+this.value));
			});
			
			// 解决单元格中如果表格高度不足，在弹出下拉菜单时，菜单显示不正确的问题
			$('#ddpzCntr .table-responsive').on('show.bs.dropdown', function () {
				if ($(this).height() < 220) $('#ddpzCntr .table-responsive').css( {'overflow-x':'visible', 'display': 'flex', 'justify-content': 'flex-end'} );
			});
			$('#ddpzCntr .table-responsive').on('hide.bs.dropdown', function () {
				if ($(this).height() < 220) $('#ddpzCntr .table-responsive').css( {'overflow-x': '', 'display': '', 'justify-content': ''} );
			})
		},
		
		bindProductAction: function(index, el) {
			if ($(el).closest('.prd-selected').length == 0) {
				$(el).find('.prd-action .prd-action-caret button').click(function(){
					Ddpz.selectPrd(this);
				});
				$(el).find('.prd-action .prd-action-more button').click(function(){
					Ddpz.selectPrd(this);
				});
			} else {
				$(el).find('.prd-action .prd-action-more button').click(function(e){
					if ($(this).data('cmd') == 'increase') {
						Ddpz.selectPrd(this);
					} else {
						let qtyObj=$(this).parent().find('.prd-item-qty'),
							oldQty=parseInt(qtyObj.text());
						if (oldQty == 1) {
							let self = this, name=$(this).closest('.prd-info').find('.prd-name').html(), subName=$(this).closest('.prd-info').find('.prd-sub-name').html(),
								names = (!subName || subName == "") ? name : (name + " - " + subName);
							CxCtrl.confirm(`确定删除此商品？<p class="text-info mb-0">${names}</p>`, function(src){
								$(self).closest('.prd').remove();
								Ddpz.selectPrd(self);
								self = null;
							},{
								evt: e,
								src: self,
								placement: 'bottom'
							});
						} else {
							Ddpz.selectPrd(this);
						}
					}
				});
			}
		},
		
		cacheFilterData: function(f) { // 每次查询后都缓存查询条件，给点击分页时调用
			Ddpz.filterData = CxMisc.trimData($(f).serializeJson()); // 删除数据对象中空字符串的属性
			return Ddpz.filterData;
		},
		
		clearCart: function(e) {
			if (Object.keys(Ddpz.selectedPrdList).length > 0) {
				CxCtrl.confirm('是否确定清空购物车？', function(){
					Ddpz.doClearCart();
				},{
					evt: e,
					placement: 'bottom'
				});
			}
		},
		
		doClearCart: function(){
			Ddpz.selectedPrdList = {};
			
			$('#ddpzModalDtls .prd-list-cntr .prd-selected .prd-items').empty().append(Ddpz.noData);
			
			$('#ddpzModalDtls .prd-list-cntr .cx-action-bar button[data-cmd=cart] .cx-badge').remove();
			$('#ddpzPrdTypeList a .cx-badge').remove();
			$('#ddpzModalDtls .prd-list-cntr .prd-selected .cx-sub-action-bar .price').text(0);
			$('#ddpzModalDtls .prd-list-cntr .prd-selected .cx-sub-action-bar .cx-remark').text('共 0 件');
			
			$('#ddpzPrdList .prd .prd-action').each(function(){
				$(this).find('.prd-action-more').css({'display':''}).find('.prd-item-qty').text(0);
				$(this).find('.prd-action-caret').css({'display':''});
			});
		},
		
		execPrdCmd: function(el, cmd, e) {
			let id = $(el).closest('tr').data('id');
			let data = $(el).closest('tr').data('json');
			let evt = e || window.event;
			switch(cmd) {
				case 'remark': 
					let f = document.querySelector('#ddpzMiscFrm');
					f.reset();
					f.cmd.value = cmd;
					f.ddid.value = id;
					f.ddsm.value = data.ddsm;
					f.ddsm.disabled = false;
					$(f.ddsm).closest('.form-group').show();
					
					$(f).find('.prd-zfje').hide();
					f.ddztdm.disabled = true;
					$(f.ddztdm).closest('.form-group').hide();
					f.zffsdm.disabled = true;
					$(f.zffsdm).closest('.form-group').hide();
					f.zfbj.disabled = true;
					$(f.zfbj).closest('.form-group').hide();
					
					$('#ddpzModalMisc').modal('show');
					break;
				case 'pay':
					let f1 = document.querySelector('#ddpzMiscFrm');
					f1.reset();
					f1.cmd.value = cmd;
					f1.ddid.value = id;
					f1.ddsm.disabled = true;
					$(f1.ddsm).closest('.form-group').hide();
					
					$(f1).find('.prd-zfje').show().find('.value')
						.text(data.yjje?data.cjje-data.yjje:data.cjje)
						.attr('data-zfbj-value-1', data.yjje?data.cjje-data.yjje:data.cjje)
						.attr('data-zfbj-value-2', data.cjje);
					f1.ddztdm.disabled = false;
					$(f1.ddztdm).closest('.form-group').show();
					if (f1.ddztdm.options.length == 1) {
						f1.ddztdm.setAttribute('data-selected-value', data.ddztdm);
						Ddpz.getDdzt(f1.ddztdm, true);
					} else {
						$(f1.ddztdm).val(data.ddztdm);
					}
					f1.zffsdm.disabled = false;
					$(f1.zffsdm).closest('.form-group').show();
					if (f1.zffsdm.options.length == 1) {
						Ddpz.getZffs(f1.zffsdm, true);
					}
					f1.zfbj.disabled = false;
					$(f1.zfbj).closest('.form-group').show();
					
					$('#ddpzModalMisc').modal('show');
					break;
				case 'follow':
				case 'done':
				case 'abandon':
					let tooltip = cmd=='follow'? '跟进' : (cmd=='done'?'完成':'作废');
					CxCtrl.confirm(`是否确定${tooltip}此订单？`, function(src){
						var target = $(src);
						CxMisc.ajax({
				            url: CxMisc.finalizeUrl('/ddpz/updateDdpz'),
				            type: "POST",
				            data:{
				                ddid: id,
				                cmd: cmd
				            },
				            beforeSend: function(xhr, cfg) {
				            	$('#ddpzCntr').mask('show');
				            },
				            success: function(res, ts) {
				            	if (res.code == "0") {
				            		CxMsg.info(`${tooltip}订单成功`);
				            		Ddpz.refreshPage(); // 刷新当前页码
				            	} else CxMsg.info(`${tooltip}订单失败: ` + res.message);
				            },
				            error: function(xhr, ts, err) {
				            	var msg = "[" + xhr.status + " : " + ts + "]";
				            	CxMsg.error(`${tooltip}订单失败: ` + msg);
				            },
				            complete: function(xhr, ts) {
				            	$('#ddpzCntr').mask('hide');
				            }
				        });
				    }, {
				    	evt: evt,
				    	src: el, //$(el).closest('.btn-group')[0],
				    	placement: 'top'
				    });
					break;
				default: break;
			}
		},

		filter: function(f){
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/ddpz/getCount'),
			    type: "GET",
			    data: Ddpz.cacheFilterData(f),
			    beforeSend: function(xhr, cfg) {
			    	$('#ddpzCntr').mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		Ddpz.genPager(res.data); // 生成分页
			    		if (res.data == 0) {
			    			$('#ddpzCntr .table-ddpz tbody').empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    		} else {
			    			Ddpz.goto(0, Ddpz.pager.pagination("pageSize")); // 默认打开第一页
			    		}
			    	} else {
			    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
			    		$('#ddpzCntr .table-ddpz tbody').empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    	$('#ddpzCntr .table-ddpz tbody').empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    },
	            complete: function(xhr, ts) {
	            	$('#ddpzCntr').mask('hide');
	            }
			});
		},
		
		getDdzt: function(el, override) {
			if (el.options.length == 1) { // 表示只有默认选项，数据未载入
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/ddpz/getDdzt'),
				    type: "GET",
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		if (res.data && res.data.length>0) {
				    			if (override) {
				    				for (let i=el.options.length-1; i>=0; i--) { //清除上次查询的列表
				    					el.remove(i);
				    				}
				    			}
				    			for (let o of res.data) {
				    				el.add(new Option(o.ddztmc, o.ddztdm));
				    			}
				    			if (el.getAttribute('data-selected-value')) {
				    				$(el).val(el.getAttribute('data-selected-value'));
				    				el.removeAttribute('data-selected-value');
				    			}
				    		}
				    	} else {
				    		CxMsg.warn('获取订单状态列表失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.warn('获取订单状态列表失败：' + msg);
				    }
				});
			}
		},
		
		getZffs: function(el, override) {
			if (el.options.length == 1) { // 表示只有默认选项，数据未载入
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/ddpz/getZffs'),
				    type: "GET",
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		if (res.data && res.data.length>0) {
				    			if (override) {
				    				for (let i=el.options.length-1; i>=0; i--) { //清除上次查询的列表
				    					el.remove(i);
				    				}
				    			}
				    			for (let o of res.data) {
				    				el.add(new Option(o.zffsmc, o.zffsdm));
				    			}
				    		}
				    	} else {
				    		CxMsg.warn('获取支付方式列表失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.warn('获取支付方式列表失败：' + msg);
				    }
				});
			}
		},
		
		getPrdById: function(prdId) {
			if (Ddpz.prdList) {
				for (let i=0; i<Ddpz.prdList.length; i++) {
					let type = Ddpz.prdList[i];
					if (type.spxx && type.spxx.length>0) {
						for (let j=0; j<type.spxx.length; j++) {
							if (type.spxx[j].spid == prdId) return type.spxx[j];
						}
					}
				}
			}
			return null;
		},
		
		getTypeIdByPrdId: function (prdId) {
			if (Ddpz.prdList) {
				for (let i=0; i<Ddpz.prdList.length; i++) {
					let type = Ddpz.prdList[i];
					if (type.spxx && type.spxx.length>0) {
						for (let j=0; j<type.spxx.length; j++) {
							if (type.spxx[j].spid == prdId) return type.splbid;
						}
					}
				}
			}
			return null;
		},
		
		genPager: function(count) { // 生成分页并保存分页句柄到Ddpz.pager
			Ddpz.pager = null;
			let cntr = $('#ddpzCntr .main-content');
			cntr.children('.cx-pagination-cntr').remove(); // 清除上一次生成的分页（如有）
			cntr.append(`<div class="cx-pagination-cntr">
						<div class="cx-pagination" data-cx-ctrl="pagination" data-cx-param="{page:1,records:${count},click:Ddpz.goto}"></div>
					</div>`);
			Ddpz.pager = cntr.find("[data-cx-ctrl=pagination]").pagination();
		},
		
		goto: function(page, pageSize) {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/ddpz/load'),
			    type: "GET",
			    data: Object.assign(Ddpz.filterData, {page: page, pageSize: pageSize}),
			    beforeSend: function(xhr, cfg) {
			    	$('#ddpzCntr').mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		if (res.data && res.data.length>0) {
			    			Ddpz.render(page, pageSize, res.data);
			    		} else {
			    			$('#ddpzCntr .table-ddpz tbody').empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    		}

						Ddpz.pager.pagination("refreshPage", page);
			    	} else {
			    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
			    		$('#ddpzCntr .table-ddpz tbody').empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    	$('#ddpzCntr .table-ddpz tbody').empty().append('<tr><td colspan="9" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$('#ddpzCntr').mask('hide');
			    }
			});
		},
		
		interpretZfbj: function(zfbj) {
			switch(zfbj) {
				case '0': return '未支付';
				case '1': return '已支付';
				case '2': return '已退款';
				default: return '未知';
			}
		},
		interpretZflx: function(zflx) {
			switch(zflx) {
				case '1': return '定金';
				case '2': return '尾款';
				case '3': return '全款';
				default: return '未知';
			}
		},
		
		load: function() {
			Ddpz.prdList = null; // 新打开标签，清除缓存
			Ddpz.selectedPrdList = {};
			Ddpz.filterData = null;
			Ddpz.loadPromotionInfo();
			setTimeout(function(){
				$('#ddpzCntr form[data-type=filter] button[type=submit]').click(); // 提交查询，即相当于载入订单列表
			}, 200); // 延时200ms开始查询，配合标签动画显示完成
		},
		
		loadFilter: function() {
			Ddpz.getDdzt(document.querySelector('#ddpzCntr form[data-type=filter]').ddztdm);
			//Ddpz.getZffs4Filter();
		},
		
		loadPrd: function() {
			if (Ddpz.prdList) {
	    		Ddpz.doClearCart(); // clear shopping cart
	    		$('#ddpzModalDtls .prd-list-cntr .cx-action-bar button[data-cmd=home]').click();
	    		if ($('#ddpzPrdTypeList').children().length == 0) {Ddpz.renderSplb();} // 关闭标签后重新打开，需要重新生成列表
	    	} else { // 初次打开载入商品列表
	    		CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/ddpz/getAllSplb'),
				    type: "GET",
				    beforeSend: function(xhr, cfg) {
				    	$('#ddpzModalDtls .prd-list-cntr').mask('show', {msg: '载入中，请稍候...'});
				    },
				    success: function(res, ts) {
				    	if (res.code == "0" && res.data) {
				    		if (res.data && res.data.length>0) {
				    			Ddpz.prdList = res.data;
				    			Ddpz.renderSplb();
				    		}
				    	} else {
				    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.warn('查询失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	$('#ddpzModalDtls .prd-list-cntr').mask('hide');
				    }
				});
	    	}
		},
		
		loadPromotionInfo: function() {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/ddpz/loadPromotionInfo'),
			    type: "GET",
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			Ddpz.promotions = res.data;
			    		}
			    	} else {
			    		CxCtrl.alert('查询促销信息失败, 请稍后重新打开：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxCtrl.alert('查询促销信息失败：' + msg);
			    }
			});
		},
		
		popCreateDialog: function(cmd) {
			$('#ddpzModalDtls').modal('show');
		},
		
		popViewDialog: function(el) {
			setTimeout(function(){
				let data = $(el).closest('tr').data('json');
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/ddpz/getDtls'),
				    type: "GET",
				    data: {ddid: data.ddid},
				    beforeSend: function(xhr, cfg) {
				    	$('#ddpzModalViewDtls .modal-body').mask('show', {msg: '查询中，请稍候...'});
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		let prdDtls = $('#ddpzModalViewDtls .modal-body .prd-dtls');
				    		prdDtls.find('.prd-ddbh').children('.value').text(data.ddbh);
				    		prdDtls.find('.prd-ddzt').children('.value').text(data.ddztmc);
				    		prdDtls.find('.prd-hydm').children('.value').text(data.hydm?data.hydm:'');
				    		prdDtls.find('.prd-lxr').children('.value').text(data.lxr?data.lxr:'');
				    		prdDtls.find('.prd-lxdh').children('.value').text(data.lxdh?data.lxdh:'');
				    		prdDtls.find('.prd-lxdz').children('.value').text(data.lxdz?data.lxdz:'');
				    		prdDtls.find('.prd-xdsj').children('.value').text(data.xdsj?CxMisc.formatDate(data.xdsj):'');
				    		prdDtls.find('.prd-slsj').children('.value').text(data.slsj?CxMisc.formatDate(data.slsj):'');
				    		prdDtls.find('.prd-wcsj').children('.value').text(data.wcsj?CxMisc.formatDate(data.wcsj):'');
				    		prdDtls.find('.prd-ddsm').children('.value').text(data.ddsm?data.ddsm:'');
				    		
				    		$('#ddpzModalViewDtls .modal-body .spzyh .price').text(data.yhje?data.yhje:0);
				    		$('#ddpzModalViewDtls .modal-body .spzcjje .price').text(data.cjje);
				    		
				    		if (res.data.zfjlList && res.data.zfjlList.length>0) {
				    			let zfjl = prdDtls.find('.prd-zfjl').children('.value').empty();
				    			for (let i=0; i<res.data.zfjlList.length; i++) {
				    				let jl = res.data.zfjlList[i];
				    				zfjl.append(`<p>${Ddpz.interpretZflx(jl.zfjllx)} - ${jl.zffsmc} - ${Ddpz.interpretZfbj(jl.zfbj)} - <span class="price">${jl.zfje}</span></p>`);
				    			}
				    		} else {
					    		prdDtls.find('.prd-zfjl').children('.value').html('<span class="text-black-50">暂无记录</span>');
				    		}
				    		
				    		let prdCntr = $('#ddpzModalViewDtls .modal-body .prd-list-cntr'), prdList=prdCntr.find('.prd-items'), total=0, qty=0, member=data.hybj=='1'?true:false;
				    		prdList.empty();
				    		if (res.data.ddmxList) {
				    			for (let i=0; i<res.data.ddmxList.length; i++) {
				    				let ddmx = res.data.ddmxList[i];
				    				total += ddmx.spsl*ddmx.spdj;
				    				qty += ddmx.spsl;
				    				prdList.append(`<div class="row prd" data-prd-id="${ddmx.spid}">
											<div class="col-5 prd-thumbnail">
												<div><img src="${CxMisc.finalizeUrl(ddmx.spxx.sptplj?ddmx.spxx.sptplj:'/resources/img/no-pic.png')}" alt="产品图片"></div>
											</div>
											<div class="col-7 prd-info">
												<span class="prd-name">${CxMisc.escapeHtml(ddmx.spxx.spmc)}</span>
												<span class="prd-desc">${CxMisc.escapeHtml(ddmx.spxx.spsm?ddmx.spxx.spsm:'暂无说明')}</span>
												<span class="price ${member?'member no-badge':''} my-1">${ddmx.spdj}</span>
												<span class="prd-sub-total">共 ${ddmx.spsl} 件, 小计<span class="price ${member?'member':''} no-badge cx-f-1">${ddmx.spsl*ddmx.spdj}</span></span>
											</div>
										</div>`);
				    			}
				    		} else {
				    			CxMsg.warn('订单异常：无相关商品信息');
				    		}
				    		prdCntr.find('.cx-prompt .price').text(total);
				    		if (member) prdCntr.find('.cx-prompt .price').addClass('member');
				    		else prdCntr.find('.cx-prompt .price').removeClass('member');
				    		prdCntr.find('.cx-prompt .cx-remark').text(`共 ${qty} 件`);
				    	} else {
				    		CxMsg.warn('查询失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.warn('查询失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	$('#ddpzModalViewDtls .modal-body').mask('hide');
				    }
				});
				

				// if (data.wxh) f.wxh.value = data.wxh;
			}, 200); // 延时200ms开始查询，配合动画显示完成
			$('#ddpzModalViewDtls').modal('show');
		},
		
		redefineScrollSpyAction: function() {
			$('#ddpzPrdList').on('activate.bs.scrollspy', function (e, o) {
				let o1=$('.prd-type-list a[href="'+o.relatedTarget+'"]'), o0=o1.parent();
				let t=o1.position().top, h=o0.outerHeight();
				if (t<0 || t>=h-10) o1[0].scrollIntoView(false);
			});
			$('#ddpzPrdTypeList a').click(function(e){
				this.blur();
				e.preventDefault();
				let t=$($(this).attr('href')), c=$('#ddpzPrdList');
				if (t.length > 0)
					c.animate({
						scrollTop: t.offset().top - c.offset().top + c.scrollTop()
					}, 200);
			});
		},
		
		refreshPage: function() {
			Ddpz.goto(Ddpz.pager.pagination("page"), Ddpz.pager.pagination("pageSize"));
		},
		
		renderSplb: function() {
			let splbs = Ddpz.prdList;
			let typeCntr = $('#ddpzPrdTypeList');
			typeCntr.empty();
			for (let i=0; i<splbs.length; i++) {
				typeCntr.append(`<a class="list-group-item list-group-item-action" href="#list-item-${i}" data-type-id="${splbs[i].splbid}">${splbs[i].splbmc}</a>`);
			}
			
			let prdCntr=$('#ddpzPrdList');
			prdCntr.empty();
			for (let i=0; i<splbs.length; i++) {
				let splb = splbs[i];
				if (splb.spxx && splb.spxx.length>0) {
					let prds = [];
					for (let j=0; j<splb.spxx.length; j++) {
						let prd = splb.spxx[j];
						prds.push(`<div class="row prd" data-prd-id="${prd.spid}">
								<div class="col-5 prd-thumbnail">
						 			<div><img src ="${CxMisc.finalizeUrl(prd.sptplj?prd.sptplj:'/resources/img/no-pic.png')}" alt="产品图片" /></div>
						 		</div>
						 		<div class="col-7 prd-info">
						 			<span class="prd-name">${CxMisc.escapeHtml(prd.spmc)}</span>
						 			<span class="prd-desc">${CxMisc.escapeHtml(prd.spsm)}</span>
						 			<span class="price member mt-2">${prd.hyje}</span>
						 			<span class="price my-1">${prd.spje}</span>
						 			<span class="prd-action">
						 				<span class="prd-action-caret">
						 					<button type="button" class="btn btn-success btn-sm" data-cmd="increase"><i class="fas fa-cart-plus"></i></button>
						 				</span>
						 				<span class="prd-action-more">
						 					<button type="button" class="btn btn-success btn-sm" data-cmd="decrease"><i class="fas fa-minus"></i></button>
						 					<span class="prd-item-qty">0</span>
						 					<button type="button" class="btn btn-success btn-sm" data-cmd="increase"><i class="fas fa-plus"></i></button>
						 				</span>
						 			</span>
						 		</div>
						 	</div>`);
					}
					prdCntr.append(`<div>
							 	<h4 id="list-item-${i}" class="prd-type">${splb.splbmc}</h4>
							 	${prds.join('')}
							 </div>`);
				}
			}
			prdCntr.find('div.prd').each(Ddpz.bindProductAction);
			prdCntr.scrollspy({ target: '#ddpzPrdTypeList', offset:30 });
			Ddpz.redefineScrollSpyAction();
			setTimeout(function(){$('#ddpzPrdList').scroll();},200); // 触发一下滚动保证选中第一个类别
		},
		
		render: function(page, pageSize, data) {
			let tmp = $('#ddpzCntr .table-ddpz tbody').empty();
			for (let i=0; i<data.length; i++) {
				tmp.append(`<tr data-id="${data[i].ddid}">
						<td class="td-indexer">
    						<input type="checkbox" id="ddpzIndexer-${i}" name="ddpzIndexer${i}">
				            <label for="ddpzIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td>${data[i].ddbh}</td>
						<td>${data[i].hydm?data[i].hydm:''}</td>
						<td>${CxMisc.formatDate(data[i].xdsj)}</td>
						<td><span class="${data[i].hybj=='1'?'price no-badge member':'price'}">${data[i].cjje}</span></td>
						<td>${data[i].ddztmc}</td>
						<td>${data[i].lxr? CxMisc.escapeHtml(data[i].lxr) : ''}</td>
						<td>${data[i].lxdh? CxMisc.escapeHtml(data[i].lxdh) : ''}</td>
						<td class="dl-item-cmd" style="overflow:visible;">
							<div class="btn-group" role="group" aria-label="操作按纽组">
								<button type="button" class="btn btn-outline-primary" onclick="Ddpz.popViewDialog(this)">详细</button>
								<button type="button" class="btn btn-outline-primary" onclick="Ddpz.execPrdCmd(this, 'follow')">跟进</button>
								<div class="btn-group" role="group">
									<button id="ddpzMoreCmd${i}" type="button" class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">更多</button>
									<div class="dropdown-menu dropdown-menu-right" x-placement="bottom" aria-labelledby="ddpzMoreCmd${i}">
										<a class="dropdown-item" href="javascript:;" onclick="Ddpz.execPrdCmd(this, 'remark')">备注</a>
										<a class="dropdown-item" href="javascript:;" onclick="Ddpz.execPrdCmd(this, 'pay')">支付</a>
										<div class="dropdown-divider"></div>
										<a class="dropdown-item" href="javascript:;" onclick="Ddpz.execPrdCmd(this, 'follow')">跟进</a>
										<a class="dropdown-item" href="javascript:;" onclick="Ddpz.execPrdCmd(this, 'done')">完成</a>
										<a class="dropdown-item" href="javascript:;" onclick="Ddpz.execPrdCmd(this, 'abandon')">作废</a>
									</div>
								</div>
							</div>
						</td>
					</tr>`);
				tmp.children(':last-child').attr('data-json', JSON.stringify(data[i]));
			}
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$('#ddpzCntr .table-ddpz thead th.td-indexer').css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		},
		
		refreshSelectedPrd4Page: function (prdId) {
			let typeId=Ddpz.getTypeIdByPrdId(prdId), type=$(`#ddpzPrdTypeList a[data-type-id="${typeId}"]`),
				cart=type.closest('.prd-list-cntr').find('.cx-action-bar button[data-cmd=cart]'),
				sum=type.closest('.prd-list-cntr').find('.cx-sub-action-bar .price'),
				spzyh=type.closest('.prd-list-cntr').find('.spzyh .price'),
				spzcjje=type.closest('.prd-list-cntr').find('.spzcjje .price'),
				remark=type.closest('.prd-list-cntr').find('.cx-sub-action-bar .cx-remark'),
				
				items=$(`#ddpzModalDtls .prd-list-cntr .prd[data-prd-id="${prdId}"]`);
			
			for (let i=0; i<items.length; i++) {
				if (Ddpz.selectedPrdList[prdId]) {
					$(items[i]).find('.prd-action-more').css({'display':'flex'}).find('.prd-item-qty').text(Ddpz.selectedPrdList[prdId].qty);
					$(items[i]).find('.prd-action-caret').css({'display':'none'});
				} else {
					$(items[i]).find('.prd-action-more').css({'display':''}).find('.prd-item-qty').text(0);
					$(items[i]).find('.prd-action-caret').css({'display':''});
				}
			}

			let prdIds = Object.keys(Ddpz.selectedPrdList), typePrdCount=0, cartCount=0, total=0;
			let member = $('#ddpzDtlsFrm input[name=hyzt]:checked').val() == "1"; // 1表示是会员
			for (let i=0; i<prdIds.length; i++) {
				if (Ddpz.selectedPrdList[prdIds[i]].typeId == typeId) {
					typePrdCount += Ddpz.selectedPrdList[prdIds[i]].qty;
				}
				let prdQty = Ddpz.selectedPrdList[prdIds[i]].qty, prd=Ddpz.getPrdById(prdIds[i]);
				cartCount += prdQty;
				total += (member?prd.hyje:prd.spje) * prdQty;
			}
			
			if (typePrdCount == 0) {
				type.children('.cx-badge').remove();
			} else {
				if (type.children('.cx-badge').length == 0) type.append(`<span class="cx-badge">${typePrdCount}</span>`);
				else type.children('.cx-badge').text(typePrdCount);
			}
			
			if (cartCount == 0) {
				cart.children('.cx-badge').remove();
				sum.text(0);
				spzyh.text(0);
				spzcjje.text(0);
				remark.text(`共 ${cartCount} 件`);
				$('#ddpzModalDtls .prd-list-cntr .prd-selected .prd-items').empty().append(Ddpz.noData);
			} else {
				if (Ddpz.promotions) {
					let tmp = total, ded = 0;
					total = eval(Ddpz.promotions[0].rule.replace(/SUM/g, total));
					ded = tmp - total;
					sum.text(tmp);
					spzyh.text(ded.toFixed(2));
					spzcjje.text(total.toFixed(2));
				} else {
					sum.text(total);
					spzyh.text(0);
					spzcjje.text(total);
				}
				remark.text(`共 ${cartCount} 件`);
				if (cart.children('.cx-badge').length == 0) cart.append(`<span class="cx-badge">${cartCount}</span>`);
				else cart.children('.cx-badge').text(cartCount);
			}
		},
		
		selectPrd: function (el) {
			let target=$(el), cmd=target.data('cmd'), item=target.closest('.prd'), 
				prdId=item.data('prd-id'), typeId=Ddpz.getTypeIdByPrdId(prdId);
			
			if (cmd == 'increase') {
				if (!Ddpz.selectedPrdList[prdId]) Ddpz.selectedPrdList[prdId] = {qty: 0, typeId: typeId};
				Ddpz.selectedPrdList[prdId].qty++;
			} else {
				if (Ddpz.selectedPrdList[prdId]) Ddpz.selectedPrdList[prdId].qty--;
				if (Ddpz.selectedPrdList[prdId].qty <= 0) {
					delete Ddpz.selectedPrdList[prdId];
				}
			}
			Ddpz.refreshSelectedPrd4Page(prdId);
		},
		
		showHome: function(el) {
			$(el).closest('.prd-list-cntr').find('.cx-tab:not(.prd-available)').fadeOut();
		},
		
		showShoppingCart: function() {
			//if (!$('#ddpzModalDtls .prd-list-cntr .prd-selected').is(':visible')){
				let cntr=$('#ddpzModalDtls .prd-list-cntr .prd-selected .prd-items'), selectedPrdIds=Object.keys(Ddpz.selectedPrdList),
					sum=$('#ddpzModalDtls .prd-list-cntr .cx-sub-action-bar .price'), 
					spzyh=$('#ddpzModalDtls .prd-list-cntr .spzyh .price'),
					spzcjje=$('#ddpzModalDtls .prd-list-cntr .spzcjje .price'),
					remark=$('#ddpzModalDtls .prd-list-cntr .cx-sub-action-bar .cx-remark'),
					cartCount=0, total=0;
				let member = $('#ddpzDtlsFrm input[name=hyzt]:checked').val() == "1"; // 1表示是会员
				
				cntr.empty();
				if (selectedPrdIds.length > 0) {
					for (let i=0; i<selectedPrdIds.length; i++) {
						let prd = Ddpz.getPrdById(selectedPrdIds[i]), qty = Ddpz.selectedPrdList[selectedPrdIds[i]].qty;
						cartCount += qty;
						total += (member?prd.hyje:prd.spje)*qty;
						cntr.append(`<div class="row prd" data-prd-id="${prd.spid}">
								<div class="col-5 prd-thumbnail">
						 			<div><img src ="${CxMisc.finalizeUrl(prd.sptplj?prd.sptplj:'/resources/img/no-pic.png')}" alt="产品图片" /></div>
						 		</div>
						 		<div class="col-7 prd-info">
						 			<span class="prd-name">${CxMisc.escapeHtml(prd.spmc)}</span>
						 			<span class="prd-desc">${CxMisc.escapeHtml(prd.spsm)}</span>
						 			<span class="price member mt-2">${prd.hyje}</span>
						 			<span class="price my-1">${prd.spje}</span>
						 			<span class="prd-action">
						 				<span class="prd-action-more" style="display:flex;">
						 					<button type="button" class="btn btn-success btn-sm" data-cmd="decrease"><i class="fas fa-minus"></i></button>
						 					<span class="prd-item-qty">${qty}</span>
						 					<button type="button" class="btn btn-success btn-sm" data-cmd="increase"><i class="fas fa-plus"></i></button>
						 				</span>
						 			</span>
						 		</div>
						 	</div>`);
					}
					cntr.find('div.prd').each(Ddpz.bindProductAction);
				} else {
					cntr.append(Ddpz.noData);
				}
				if (member) sum.addClass('member');
				else sum.removeClass('member');
				if (Ddpz.promotions) {
					let tmp = total, ded = 0;
					total = eval(Ddpz.promotions[0].rule.replace(/SUM/g, total));
					ded = tmp - total;
					sum.text(tmp.toFixed(2));
					spzyh.text(ded.toFixed(2));
					spzcjje.text(total.toFixed(2));
				} else {
					sum.text(total);
					spzyh.text(0);
					spzcjje.text(total);
				}
				remark.text(`共 ${cartCount} 件`);
				$('#ddpzModalDtls .prd-list-cntr .prd-selected').fadeIn();
			//}
		},
		
		submitPrd: function(f) {
			let selectedPrdIds = Object.keys(Ddpz.selectedPrdList);
			if (selectedPrdIds.length > 0) {
				let frm=$(f), tmp=[],
				data = frm.serializeJson();
				for (let i=0; i<selectedPrdIds.length; i++) {
					tmp.push(`${selectedPrdIds[i]},${Ddpz.selectedPrdList[selectedPrdIds[i]].qty}`);
				}
				data.spxx = tmp.join(';');
			
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/ddpz/add'),
				    type: "POST",
				    data: data,
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		setTimeout(function(){CxMsg.info('添加订单成功');}, 600); //延时显示，防止提示框抖动
				    		frm.closest('.modal').modal('hide');
				    		Ddpz.refreshPage(); // 刷新当前页码
				    	} else {
				    		CxMsg.error('添加订单失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('添加订单失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
				    }
				});
			} else {
				CxMsg.info('请至少选择一个商品');
			}
		},
		
		submitPrdMisc: function(f) {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/ddpz/updateDdpz'),
			    type: "POST",
			    data: $(f).serializeJson(),
			    beforeSend: function(xhr, cfg) {
			    	$('#ddpzCntr').mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		setTimeout(function(){CxMsg.info('修改备注成功');}, 600); //延时显示，防止提示框抖动
			    		$(f).closest('.modal').modal('hide');
			    		Ddpz.refreshPage(); // 刷新当前页码
			    	} else {
			    		CxMsg.error('修改备注失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('修改备注失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$('#ddpzCntr').mask('hide');
			    }
			});
		}
	};
}
Ddpz.bind();
Ddpz.load();

