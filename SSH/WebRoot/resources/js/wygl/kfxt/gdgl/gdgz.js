if (typeof window.KfGdglGdgz === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgKfGdglGdgzCntr';
	const dtlsModalSelector = '#wgKfGdglGdgzModalDtls';
	const dtlsModalLblSelector = '#wgKfGdglGdgzModalDtlsLabel';
	const dtlsFrmSelector = '#wgKfGdglGdgzDtlsFrm';
	
	//const updateModalSelector = '#wgKfGdglGdgzModalCljlDtls';
	//const updateFrmSelector = '#wgKfGdglGdgzCljlDtlsFrm';
	const viewModalSelector = '#wgKfGdglGdgzModalCljlmx';
	const viewFrmSelector = '#wgKfGdglGdgzCljlmxFrm';
	
	const mainTblClz = '.table-wgkf-gdgl-gdgz';
	const filterFrmSelector = '#wgKfGdglGdgzCntr .filterbar>form[data-type=filter]';
	
	
	const loadingMask1 = '#wgKfGdglGdgzCntr';
	
	const me = window.KfGdglGdgz = {
		pager: null,
		filterData: null,
			
		bind: function() {
			me.getSqList(); 
			
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.indicateFilter(cntrSelector, {expanded: true});
			
			// $(`${cntrSelector} input[data-cx-ctrl=fcxx-tree]`).fcxxTree({ensureSqdm: true});
			CxMisc.formValidated(filterFrmSelector, me.filter);
			$(`${cntrSelector} .toolbar button[data-cmd=open-add]`).click(function(){
				me.openCreate();
			});
			
			//$(`${dtlsModalSelector} input[data-cx-ctrl="fcxx-tree"]`).fcxxTree({ensureSqdm: true, selectable: {'sq':true, 'fc':true}});
			CxMisc.formValidated(dtlsFrmSelector, me.createBx);
			
			//CxMisc.formValidated(updateFrmSelector, me.updateBx);
			
			$(`${cntrSelector} div.date[data-cx-ctrl=date]`).datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			
			$(dtlsModalSelector).on('show.bs.modal', function (e) { CxMisc.loadAllDmList(this); }); // 打开时加载相应有待选代码列表：select[data-lazy-load]
			CxMisc.enableUpload({
				target: dtlsModalSelector+' .btn[data-cmd=upload]', // 启动上传的目标元素（点击该元素开始上传）
				pre: function() { 
					let imgCount = $(`${dtlsModalSelector} .bx-img-wrapper .thumbnail-group`).length;
					if (imgCount >= 4) {
						CxMsg.info('最多只可上传4张图片');
						return false;
					} else return true;
				},
				success: function(e, res){
			    	if (res.data && res.data.length>0) {console.log('dtls');
			    		let imgCount = $(`${dtlsModalSelector} .bx-img-wrapper .thumbnail-group`).length + 1;
			    		$(`${dtlsModalSelector} .bx-img-wrapper`).children('.thumbnail-group').removeClass('col-12 col-6 col-4 col-3').addClass(`col-${12/imgCount}`);
			    		$(`${dtlsModalSelector} .bx-img-wrapper`).append(`<div class="col-${12/imgCount} d-i-flex-center thumbnail-group thumbnail-group-auto">
						                    <div><img src="${CxMisc.finalizeUrl(res.data[0].path)}" onload="KfGdglGdgz.adjustImgSize($('${dtlsModalSelector}'))" style="max-width: none; max-height: 100%;"></div>
						                    <span class="cx-close circle top-right"><span><a href="javascript:;"><i class="fas fa-times"></i></a></span></span>
						                    <input type="hidden" name="bxtpdz" value="${res.data[0].path}">
						                </div>`);
			    		$(`${dtlsModalSelector} .bx-img-wrapper`).children('.thumbnail-group:last-child').find('img').click(function(){
							CxMisc.popImg(this);
						});
			    		$(`${dtlsModalSelector} .bx-img-wrapper`).children('.thumbnail-group:last-child').find('.cx-close').click(function(){
							$(this).closest('.thumbnail-group').remove();
							me.adjustImgSize($(dtlsModalSelector));
						});
			    	} else {
			    		CxMsg.warn('返回的上传信息为空');
			    	}
			    },  // 成功上传后的回调函数
				accept: 'image/gif, image/jpg, image/jpeg, image/png', // 限定的上传文件类型
				maxSize: 512000, // 单个上传文件尺寸最大值
				silent: true // 表示成功时不显示提示信息
			}); 
			/*CxMisc.enableUpload({
				target: updateModalSelector+' .paragraph[data-section=cljl] .btn[data-cmd=upload]', // 启动上传的目标元素（点击该元素开始上传）
				pre: function() { 
					let imgCount = $(`${updateModalSelector} .paragraph[data-section=cljl] .bx-img-wrapper .thumbnail-group`).length;
					if (imgCount >= 4) {
						CxMsg.info('最多只可上传4张图片');
						return false;
					} else return true;
				},
				success: function(e, res){
			    	if (res.data && res.data.length>0) {console.log('update');
			    		let imgCount = $(`${updateModalSelector} .paragraph[data-section=cljl] .bx-img-wrapper .thumbnail-group`).length + 1;
			    		$(`${updateModalSelector} .paragraph[data-section=cljl] .bx-img-wrapper`).children('.thumbnail-group').removeClass('col-12 col-6 col-4 col-3').addClass(`col-${12/imgCount}`);
			    		$(`${updateModalSelector} .paragraph[data-section=cljl] .bx-img-wrapper`).append(`<div class="col-${12/imgCount} d-i-flex-center thumbnail-group thumbnail-group-auto">
						                    <div><img src="${CxMisc.finalizeUrl(res.data[0].path)}" onload="KfGdglGdgz.adjustImgSize($('${updateModalSelector}'))" style="max-width: none; max-height: 100%;"></div>
						                    <span class="cx-close circle top-right"><span><a href="javascript:;"><i class="fas fa-times"></i></a></span></span>
						                    <input type="hidden" name="bxcltpdz" value="${res.data[0].path}">
						                </div>`);
			    		$(`${updateModalSelector} .paragraph[data-section=cljl] .bx-img-wrapper`).children('.thumbnail-group:last-child').find('img').click(function(){
							CxMisc.popImg(this);
						});
			    		$(`${updateModalSelector} .paragraph[data-section=cljl] .bx-img-wrapper`).children('.thumbnail-group:last-child').find('.cx-close').click(function(){
							$(this).closest('.thumbnail-group').remove();
							me.adjustImgSize($(updateModalSelector));
						});
			    	} else {
			    		CxMsg.warn('返回的上传信息为空');
			    	}
			    },  // 成功上传后的回调函数
				accept: 'image/gif, image/jpg, image/jpeg, image/png', // 限定的上传文件类型
				maxSize: 512000, // 单个上传文件尺寸最大值
				silent: true // 表示成功时不显示提示信息
			}); */
		},
		
		refresh: function(opt) {
			if (opt && opt.reload) document.querySelector(`${cntrSelector} .toolbar button[data-cmd=filter]`).click(); // 重新查询包括数量与列表
			else if (me.pager && me.pager.pagination("records")>0) me.goto(me.pager.pagination("page"), me.pager.pagination("pageSize"));
		},
		
		getSqList: function() {
			let el = document.querySelector(`${cntrSelector} .filterbar select[name=sqdm]`);
			if (el.getAttribute('data-loaded') != 'true') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhsq'),
		            type: "GET",
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		let sqdm = document.querySelector(dtlsFrmSelector).sqdm; // 添加工单对话框中的社区
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) {
		            				el.options.add(new Option(res.data[i].sqmc, res.data[i].sqdm));
		            				sqdm.options.add(new Option(res.data[i].sqmc, res.data[i].sqdm));
		            			}
		            		}
		            		el.setAttribute('data-loaded', 'true');
		            	} else CxMsg.info('获取社区列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取社区列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	el.disabled = false;
		            }
		        });
			}
		},
		
		del: function(el, e) {
			let id = $(el).closest('tr').data('id');
			CxCtrl.confirm('是否确定作废此报修？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/kfxt/gdgl/deleteBxxx'),
		            type: "GET",
		            data: {bxid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask1).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('作废报修成功');
		            		me.refresh({reload: true});
		            	} else CxMsg.error('作废报修失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('作废报修失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	$(loadingMask1).mask('hide');
		            }
		        });
		    }, {
		    	evt: e,
		    	src: el,
		    	placement: 'top'
		    });
		},
		
		filter: function(f) {
			let data = $(f).serializeJson({removeBlankField:true}); // 每次查询后都缓存查询条件，给分页调用
			delete data.fczymc; // 选中的房产资源名称不需要作为参数
			me.filterData = data;
			if (me.filterData.bxrqq && me.filterData.bxrqz && me.filterData.bxrqq>me.filterData.bxrqz) {
				CxMsg.info('报修日期的开始日期不能大于结束日期');
				return;
			}
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/kfxt/gdgl/getBxxxCount'),
			    type: "GET",
			    data: me.filterData,
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask1).mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		me.genPager(res.data); // 生成分页
			    		if (res.data == 0) {
			    			$(`${cntrSelector} ${mainTblClz} tbody>tr:not(.table-row-no-data)`).remove();
			    		} else {
			    			me.goto(me.pager ? me.pager.pagination("page") : 0, me.pager.pagination("pageSize")); // 默认打开第一页
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
	            	$(loadingMask1).mask('hide');
	            }
			});
		},
		
		genPager: function(count) { // 生成分页并保存分页句柄到me.pager
			me.pager = null;
			let cntr = $(`${cntrSelector} .main-content`);
			cntr.children('.cx-pagination-cntr').remove(); // 清除上一次生成的分页（如有）
			cntr.append(`<div class="cx-pagination-cntr">
						<div class="cx-pagination" data-cx-ctrl="pagination"></div>
					</div>`);
			me.pager = cntr.find("[data-cx-ctrl=pagination]").pagination({page:1, records:count, click:me.goto});
		},
		goto: function(page, pageSize) {
			if (page < 0) page = 0;
			if (page > me.pager.pagination("lastPage")) page = me.pager.pagination("lastPage");
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/kfxt/gdgl/getBxxx'),
			    type: "GET",
			    data: Object.assign(me.filterData, {page: page, pageSize: pageSize}),
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask1).mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		$(`${cntrSelector} ${mainTblClz} tbody>tr:not(.table-row-no-data)`).remove();
			    		if (res.data && res.data.length>0) me.render(page, pageSize, res.data);
						me.pager.pagination("refreshPage", page);
			    	} else {
			    		CxMsg.warn('查询失败, 请稍后重新打开：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$(loadingMask1).mask('hide');
			    }
			});
		},
		
		render: function(page, pageSize, data) {
			let tmp = $(`${cntrSelector} ${mainTblClz} tbody`);
			for (let i=0; i<data.length; i++) {
				let item = data[i];
				tmp.append(`<tr data-id="${item.bxid}">
						<td class="td-indexer">
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td>${item.sqmc?item.sqmc:'-'}</td>
						<td>${item.bxsxmc?item.bxsxmc:''}</td>
						<td>${item.bxlxmc?item.bxlxmc:''}</td>
						<td>${me.interpretBxlydm(item.bxlydm)}</td>
						<td>${item.lxr?item.lxr:''}</td>
						<td>${item.lxdh?item.lxdh:''}</td>
						<td>${item.txdz?item.txdz:''}</td>
						<td>${CxMisc.formatDate(item.bxrq, 'short')}</td>
						<td><pre class="mb-0 cx-f-1">${item.bxnr}</pre></td>
						<td>${item.sqbmmc?item.sqbmmc:''}</td>
						<td>${item.wyhymc?item.wyhymc:''}</td>
						<td>${me.interpretClztdm(item.clztdm)}</td>
						<td>${me.interpretCljgdm(item.cljgdm)}</td>
						<td>${item.wcrq?CxMisc.formatDate(item.wcrq, 'short'):''}</td>
						<td><pre class="mb-0 cx-f-1">${item.clsm?item.clsm:''}</pre></td>
						<td>${me.interpretZtbj(item.ztbj)}</td>
						<td class="dl-item-cmd">
							<div class="btn-group" role="group" aria-label="操作按纽组">
								<button type="button" class="btn btn-outline-primary" data-cmd="view">详细</button>
								<button type="button" class="btn btn-outline-danger" data-cmd="del">作废</button>
							</div>
						</td>
					</tr>`);
				tmp.children(':last-child').attr('data-json', JSON.stringify(item));
			}
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			//tmp.find('td.dl-item-cmd button[data-cmd="update"]').click(function(){ me.openUpdate($(this).closest('tr').data('json')); });
			tmp.find('td.dl-item-cmd button[data-cmd="view"]').click(function(){ me.openMx($(this).closest('tr').data('json')); });
			tmp.find('td.dl-item-cmd button[data-cmd="del"]').click(function(e){ me.del(this, e); });
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		},
		interpretBxlydm: function(bxlydm){
			switch(bxlydm){
			case '0': return '业主';
			case '1': return '内部';
			}
			return '';
		},
		interpretClztdm: function(dm){
			switch(dm){
			case '0': return '未受理';
			case '1': return '已受理';
			case '2': return '处理中';
			case '3': return '已完成';
			}
			return '';
		},
		interpretCljgdm: function(dm){
			switch(dm){
			case '0': return '未处理成功';
			case '1': return '处理成功';
			}
			return '';
		},
		interpretZtbj: function(dm){
			switch(dm){
			case '1': return '正常';
			case '9': return '作废';
			}
			return '';
		},
		
		openCreate: function() {
			let f = document.querySelector(dtlsFrmSelector);
			f.reset();
			f.cmd.value = 'create';
			f.bxid.value = '';
			//let tv = $(f).find('input[data-cx-ctrl="fcxx-tree"]');
			//if (tv.fcxxTree('initialized')) {
			//	tv.fcxxTree('clear');
			//}
			$(`${dtlsModalSelector} .bx-img-wrapper .thumbnail-group`).remove();

			$(dtlsModalSelector).modal('show');
		},
		
		createBx: function(f){
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			if (!data.sqdm) {
				CxMsg.info('请选择一个社区或具体到一个房产');
				return;
			}
			delete data.fczymc; // 选中的房产资源名称不需要作为参数
			if (data.bxtpdz) {
				if (typeof data.bxtpdz === 'object') {
					for (let i=0; i<data.bxtpdz.length; i++) data['bxtpdz'+(i+1)] = data.bxtpdz[i];
				} else {
					data['bxtpdz1'] = data.bxtpdz;
				}
				delete data.bxtpdz;
			}
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/wygl/kfxt/gdgl/addBxxx'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
		        	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
		        },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info('添加成功');
			    		me.refresh({reload: true});
			    		frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn('添加失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('添加失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
		        }
			});
		},
		
		openMx: function(data) {
			
			let f = document.querySelector(viewFrmSelector);
			f.reset();
			f.sqmc.value = data.sqmc;
			f.bxsxmc.value = data.bxsxmc;
			f.bxlxmc.value = data.bxlxmc;
			f.bxlymc.value = me.interpretBxlydm(data.bxlydm);
			f.lxr.value = data.lxr;
			f.lxdh.value = data.lxdh;
			f.txdz.value = data.txdz;
			f.bxnr.value = data.bxnr;
			let imgs = [];
			if (data.bxtpdz1) imgs.push(data.bxtpdz1);
			if (data.bxtpdz2) imgs.push(data.bxtpdz2);
			if (data.bxtpdz3) imgs.push(data.bxtpdz3);
			if (data.bxtpdz4) imgs.push(data.bxtpdz4);
			
			let wrap = $(`${viewModalSelector} [data-f-name=bxxx] .bx-img-wrapper`);
			wrap.find(`.thumbnail-group`).remove();
			if (imgs.length > 0) {
				for (let i=0; i<imgs.length; i++) {
					wrap.append(`<div class="col-${12/imgs.length} d-i-flex-center thumbnail-group thumbnail-group-auto">
				                    <div><img src="${CxMisc.finalizeUrl(imgs[i])}" onload="KfGdglGdgz.adjustImgSize($('${viewModalSelector} [data-f-name=bxxx] .bx-img-wrapper'))" style="max-width: none; max-height: 100%;"></div>
				                </div>`);
				}
				wrap.children('.thumbnail-group').find('img').click(function(){
					CxMisc.popImg(this);
				});
			}
			
			f.clztmc.value = me.interpretClztdm(data.clztdm);
			f.cljgmc.value = me.interpretCljgdm(data.cljgdm);
			if (data.clsm) f.clsm.value = data.clsm;
			let imgs2 = [];
			if (data.bxcltpdz1) imgs2.push(data.bxcltpdz1);
			if (data.bxcltpdz2) imgs2.push(data.bxcltpdz2);
			if (data.bxcltpdz3) imgs2.push(data.bxcltpdz3);
			if (data.bxcltpdz4) imgs2.push(data.bxcltpdz4);
			
			let wrap2 = $(`${viewModalSelector} [data-f-name=jgmx] .bx-img-wrapper`);
			wrap2.find(`.thumbnail-group`).remove();
			if (imgs2.length > 0) {
				for (let i=0; i<imgs2.length; i++) {
					wrap2.append(`<div class="col-${12/imgs2.length} d-i-flex-center thumbnail-group thumbnail-group-auto">
				                    <div><img src="${CxMisc.finalizeUrl(imgs2[i])}" onload="KfGdglGdgz.adjustImgSize($('${viewModalSelector}  [data-f-name=jgmx] .bx-img-wrapper'))" style="max-width: none; max-height: 100%;"></div>
				                	<input type="hidden" name="bxcltpdz" value="${imgs2[i]}">
				                </div>`);
				}
				wrap2.children('.thumbnail-group').find('img').click(function(){
					CxMisc.popImg(this);
				});
			}
			
			
			$(viewModalSelector).modal('show');
		},
		
		/*openUpdate: function(data) {
			if (data) {
				$(`${updateModalSelector} .bx-img-wrapper .thumbnail-group`).remove();
				
				let f = document.querySelector(updateFrmSelector);
				f.reset();
				f.cmd.value = 'update';
				f.bxid.value = data.bxid;
				f.fcmc.value = data.fcmc?data.fcmc:data.sqmc;
				f.bxlxmc.value = data.bxlxmc;
				f.lxr.value = data.lxr;
				f.lxdh.value = data.lxdh;
				f.bxnr.value = data.bxnr;
				
				let imgs = [];
				if (data.bxtpdz1) imgs.push(data.bxtpdz1);
				if (data.bxtpdz2) imgs.push(data.bxtpdz2);
				if (data.bxtpdz3) imgs.push(data.bxtpdz3);
				if (data.bxtpdz4) imgs.push(data.bxtpdz4);
				if (imgs.length > 0) {
					for (let i=0; i<imgs.length; i++) {
						$(`${updateModalSelector} .paragraph[data-section=bxxx] .bx-img-wrapper`).append(`<div class="col-${12/imgs.length} d-i-flex-center thumbnail-group thumbnail-group-auto">
					                    <div><img src="${CxMisc.finalizeUrl(imgs[i])}" onload="KfGdglGdgz.adjustImgSize($('${dtlsModalSelector}'))" style="max-width: none; max-height: 100%;"></div>
					                </div>`);
					}
		    		$(`${updateModalSelector} .paragraph[data-section=bxxx] .bx-img-wrapper`).children('.thumbnail-group').find('img').click(function(){
						CxMisc.popImg(this);
					});
				}
				
				CxMisc.selectSelect('clztdm', data.clztdm, f);
				CxMisc.selectSelect('cljgdm', data.cljgdm, f);
				if (data.clsm) f.clsm.value = data.clsm;
				let imgs2 = [];
				if (data.bxcltpdz1) imgs2.push(data.bxcltpdz1);
				if (data.bxcltpdz2) imgs2.push(data.bxcltpdz2);
				if (data.bxcltpdz3) imgs2.push(data.bxcltpdz3);
				if (data.bxcltpdz4) imgs2.push(data.bxcltpdz4);
				if (imgs2.length > 0) {
					for (let i=0; i<imgs2.length; i++) {
						$(`${updateModalSelector} .paragraph[data-section=cljl] .bx-img-wrapper`).append(`<div class="col-${12/imgs2.length} d-i-flex-center thumbnail-group thumbnail-group-auto">
					                    <div><img src="${CxMisc.finalizeUrl(imgs2[i])}" onload="KfGdglGdgz.adjustImgSize($('${updateModalSelector}'))" style="max-width: none; max-height: 100%;"></div>
					                	<span class="cx-close circle top-right"><span><a href="javascript:;"><i class="fas fa-times"></i></a></span></span>
					                    <input type="hidden" name="bxcltpdz" value="${imgs2[i]}">
					                </div>`);
					}
		    		$(`${updateModalSelector} .paragraph[data-section=cljl] .bx-img-wrapper`).children('.thumbnail-group').find('img').click(function(){
						CxMisc.popImg(this);
					});
		    		$(`${updateModalSelector} .paragraph[data-section=cljl] .bx-img-wrapper`).children('.thumbnail-group:last-child').find('.cx-close').click(function(){
						$(this).closest('.thumbnail-group').remove();
						me.adjustImgSize($(updateModalSelector));
					});
				}
	
				$(updateModalSelector).modal('show');
			}
		},
		
		updateBx: function(f){
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			if (data.bxcltpdz) {
				if (typeof data.bxcltpdz === 'object') {
					for (let i=0; i<data.bxcltpdz.length; i++) data['bxcltpdz'+(i+1)] = data.bxcltpdz[i];
				} else {
					data['bxcltpdz1'] = data.bxcltpdz;
				}
				delete data.bxcltpdz;
			}
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/wygl/kfxt/gdgl/updateBxxx'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
		        	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
		        },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info('修改成功');
			    		me.refresh({reload: false});
			    		frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn('修改失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('修改失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
		        }
			});
		},*/
		
		adjustImgSize: function(m) { //计算图片与容器的尺寸合图片显示最大化
			let imgCount = m.find('.bx-img-wrapper[data-static!=Y] .thumbnail-group').length;
			m.find('.bx-img-wrapper[data-static!=Y] .thumbnail-group').removeClass('col-12 col-6 col-4 col-3').addClass(`col-${12/imgCount}`).find('img').each(function(){
				let imgWrap = $(this).closest('.thumbnail-group'), 
					ratio0 = imgWrap.width() / imgWrap.height(), ratio1 = this.naturalWidth / this.naturalHeight;
				if (ratio0 > ratio1) {
					this.style.maxWidth = '100%';
					this.style.maxHeight = 'none';
				} else {
					this.style.maxWidth = 'none';
					this.style.maxHeight = '100%';
				}
			});
		}
	};
}

KfGdglGdgz.bind();