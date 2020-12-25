if (typeof window.Spxx === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	window.Spxx = {
			pager: null,
			filterData: null,
			
		bindEvents: function() {
			CxMisc.indicateFilter('#spxxCntr');
			$('#spxxAdd').click(function(){
				Spxx.spxxDialog('create');
			});
			
			CxMisc.bindCheckAll('#spxxCntr');

			CxMisc.formValidated('#spxxCntr form[data-type=filter]', Spxx.filter);
			CxMisc.formValidated('#spxxFrm', Spxx.submitSpxx);
			
			$('#spxxModalDtls').on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
			
			// 文件上传相关处理
			CxMisc.enableUpload({
				// url: CxMisc.finalizeUrl('/wygl/sfxt/yhdk/drdkfy'), // 默认上传到/upload
				// validate: { method: me.validateHpwjdr }, // 额外的验证：method: 验证函数， errorMsg: 失败时显示的信息（可不填)
				// data: me.dataHpwjdr,  // 额外的参数：json对象或返回值是json对象的函数
				target: '#spxxModalDtls .prd-img-action-bar button[data-cmd=upload]', // 启动上传的目标元素（点击该元素开始上传）
				success: Spxx.uploaded,  // 成功上传后的回调函数
				accept: 'image/gif, image/jpg, image/jpeg, image/png', // 限定的上传文件类型
				maxSize: 512000, // 单个上传文件尺寸最大值
				silent: true // 表示成功时不显示提示信息
			}); 
		},
		
	
		filter: function(f){
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/spxx/getCount'),
			    type: "GET",
			    data: Spxx.cacheFilterData(f),
			    beforeSend: function(xhr, cfg) {
			    	$('#spxxCntr').mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		Spxx.genPager(res.data); // 生成分页
			    		if (res.data == 0) {
			    			$('#spxxCntr .table-spxx tbody').empty().append('<tr><td colspan="11" class="table-empty">暂无数据</td></tr>');
			    		} else {
			    			Spxx.goto(0, Spxx.pager.pagination("pageSize")); // 默认打开第一页
			    		}
			    	} else {
			    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
			    		$('#spxxCntr .table-spxx tbody').empty().append('<tr><td colspan="11" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    	$('#spxxCntr .table-spxx tbody').empty().append('<tr><td colspan="11" class="table-empty">暂无数据</td></tr>');
			    },
	            complete: function(xhr, ts) {
	            	$('#spxxCntr').mask('hide');
	            }
			});
		},
		
		cacheFilterData: function(f) { // 每次查询后都缓存查询条件，给点击分页时调用
			Spxx.filterData = CxMisc.trimData($(f).serializeJson()); // 删除数据对象中空字符串的属性
			return Spxx.filterData;
		},
		
		deleteSpxx: function(spid, el, e) {
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此商品？', function(src){
				var target = $(src);
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/spxx/deleteSpxx'),
		            type: "GET",
		            data:{
		                spid: spid
		            },
		            beforeSend: function(xhr, cfg) {
		            	$('#spxxCntr').mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            	    CxMsg.info('删除商品成功');
		            	    Spxx.goto(Spxx.pager.pagination("page"), Spxx.pager.pagination("pageSize"));
		            	} else CxMsg.info('删除商品失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除商品失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	$('#spxxCntr').mask('hide');
		            }
		        });
		    }, {
		    	evt: evt,
		    	src: el,
		    	placement: 'top'
		    });
		},
		genPager: function(count) { // 生成分页并保存分页句柄到Spxx.pager
			Spxx.pager = null;
			let cntr = $('#spxxCntr .main-content');
			cntr.children('.cx-pagination-cntr').remove(); // 清除上一次生成的分页（如有）
			cntr.append(`<div class="cx-pagination-cntr">
						<div class="cx-pagination" data-cx-ctrl="pagination" data-cx-param="{page:1,records:${count},click:Spxx.goto}"></div>
					</div>`);
			Spxx.pager = cntr.find("[data-cx-ctrl=pagination]").pagination();
		},
		
		goto: function(page, pageSize) {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/spxx/findSpxx'),
			    type: "GET",
			    data: Object.assign(Spxx.filterData, {page: page, pageSize: pageSize}),
			    beforeSend: function(xhr, cfg) {
			    	$('#spxxCntr').mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		if (res.data && res.data.length>0) {
			    			Spxx.render(page, pageSize, res.data);
			    		} else {
			    			$('#spxxCntr .table-spxx tbody').empty().append('<tr><td colspan="11" class="table-empty">暂无数据</td></tr>');
			    		}

			    		Spxx.pager.pagination("refreshPage", page);
			    	} else {
			    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
			    		$('#spxxCntr .table-spxx tbody').empty().append('<tr><td colspan="11" class="table-empty">暂无数据</td></tr>');
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    	$('#spxxCntr .table-spxx tbody').empty().append('<tr><td colspan="11" class="table-empty">暂无数据</td></tr>');
			    },
			    complete: function(xhr, ts) {
			    	$('#spxxCntr').mask('hide');
			    }
			});
		},
		
		render: function(page, pageSize, data) {
			let tmp = $('#spxxCntr .table-spxx tbody').empty();
			for (let i=0; i<data.length; i++) {
				tmp.append(`<tr data-id="${data[i].spid}">
						<td class="td-indexer">
						<input type="checkbox" id="spxxIndexer-${i}" name="spxxIndexer${i}">
			            <label for="spxxIndexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						<span>${i+1}</span>
					</td>
					<td><div class="thumbnail"><img src="${CxMisc.finalizeUrl(data[i].sptplj?data[i].sptplj:'/resources/img/no-pic.png')}" alt="商品图片"></div></td>
					<td>${CxMisc.escapeHtml(data[i].spmc)}</td>
					<td>${data[i].splbmc}</td>
					<td>${CxMisc.escapeHtml(data[i].spsm)}</td>
					<td><span class="price">${data[i].spyjje}</span></td>
					<td><span class="price">${data[i].spje}</span></td>
					<td><span class="price">${data[i].hyje}</span></td>
					<td>${data[i].plxh}</td>
					<td>${data[i].yxbj==0?'无效':'有效'}</td>
					<td class="dl-item-cmd" style="text-align:center;">
						<div class="btn-group" role="group" aria-label="操作按纽组">
							<button type="button" class="btn btn-outline-primary" data-cmd="update" onclick="Spxx.spxxDialog('update','${data[i].spid}', this)">修改</button>
                        	<button type="button" class="btn btn-outline-danger" data-cmd="del" onclick="Spxx.deleteSpxx('${data[i].spid}',this)">删除</button>
						</div>
					</td>
				</tr>`);
				tmp.children(':last-child').attr('data-json', JSON.stringify(data[i]));
			}
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$('#spxxCntr .table-spxx thead th.td-indexer').css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		},
		
		
		
		
		spxxDialog: function(cmd,spid,el) {
			let f = document.querySelector('#spxxFrm');
			f.reset();
			f.cmd.value = cmd;
			
			if (cmd == 'create') {
				$('#spxxModalDtlsLabel').text('添加商品信息');
				f.splbid.removeAttribute('data-selected-value');
				$(f).find('.prd-img-wrapper .prd-img')[0].src = $(f).find('.prd-img-wrapper .prd-img').data('default-pic');
			} else {
				$('#spxxModalDtlsLabel').text('修改商品信息');
				let data = $(el).closest('tr').data('json');
				f.spid.value = spid;
				f.spmc.value =data.spmc;
				f.spsm.value =data.spsm;
				// f.splbid.setAttribute('data-selected-value', data.splbid);
				$(f.splbid).val(data.splbid);
				f.spyjje.value =data.spyjje;
				f.spje.value =data.spje;
				f.hyje.value =data.hyje;
				f.plxh.value = data.plxh;
				$(f).find("input[name=yxbj]").each(function() {
					if (this.value == data.yxbj) this.click(); 
		        });
				if (data.sptplj) {
					f.sptplj.value = data.sptplj;
					$(f).find('.prd-img-wrapper .prd-img')[0].src = CxMisc.finalizeUrl(data.sptplj);
				} else {
					$(f).find('.prd-img-wrapper .prd-img')[0].src = $(f).find('.prd-img-wrapper .prd-img').data('default-pic');
				}
			}
			$('#spxxModalDtls').modal('show');
		},
		
		loadSplbList:function(){
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/splb/getSplb'),
			    type: "GET",
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let f1 = document.querySelector('#spxxFrm');
			    			let f2 = document.querySelector('#filter');
			    			f1.splbid.options.length = 0;
			    			f2.splbid.options.length = 0;
			    			f2.splbid.options.add(new Option("请选择",""));
			    			for (let i=0; i<res.data.length; i++) {
			    				f1.splbid.options.add(new Option(res.data[i].splbmc, res.data[i].splbid));
			    				f2.splbid.options.add(new Option(res.data[i].splbmc, res.data[i].splbid));
			    			}
			    			f1.splbid.selectedIndex = 0;
			    			f2.splbid.selectedIndex = 0;
			    		}
			    	} else {
			    		CxMsg.warn('载入商品列表失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('载入商品列表失败：' + msg);
			    },
			});
		},
		load: function() { // 点击过滤提交按纽执行查询
			setTimeout(function(){
				$('#spxxCntr form[data-type=filter] button[type=submit]').click();
			}, 200); // 延时200ms开始查询，配合标签动画显示完成
		},
		submitSpxx: function(f) {
			let frm=$(f), prefix = f.cmd.value=='create' ? '添加' : '修改',
				url=f.cmd.value=='create' ? CxMisc.finalizeUrl('/spxx/addSpxx') : CxMisc.finalizeUrl('/spxx/updateSpxx');
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
			    		frm.closest('.modal').modal('hide');
			    		Spxx.goto(Spxx.pager.pagination("page"), Spxx.pager.pagination("pageSize"));
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
		},

	    uploaded: function(e, res){
	    	if (res.data && res.data.length>0) {
	    		document.querySelector('#spxxFrm').sptplj.value = res.data[0].path;
	    		document.querySelector('#spxxFrm .prd-img-wrapper .prd-img').src = CxMisc.finalizeUrl(res.data[0].path);
	    	} else {
	    		CxMsg.warn('返回的上传信息为空');
	    	}
	    }
	};
}

Spxx.bindEvents();
Spxx.load();
Spxx.loadSplbList();

