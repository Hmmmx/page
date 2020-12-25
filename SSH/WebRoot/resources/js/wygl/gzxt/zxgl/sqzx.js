if (typeof window.GzZxSqzx === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgGzZxSqzxCntr';
	const dtlsModalSelector = '#wgGzZxSqzxModalDtls';
	const dtlsModalLblSelector = '#wgGzZxSqzxModalDtlsLabel';
	const dtlsFrmSelector = '#wgGzZxSqzxDtlsFrm';
	
	const mainTblClz = '.table-wggz-zx-sqzx';
	const idPrefix = 'wgGzZxSqzx';
	const loadingMask1 = '#wgGzZxSqzxCntr';
	
	const me = window.GzZxSqzx = {
		pager: null,
		filterData: null,
			
		bind: function() {
			me.getSqList(); 

			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			
			CxMisc.bindCheckAll(cntrSelector);
			
			$(`${cntrSelector} .toolbar select[name=sqdm]`).change(function(){
				me.filter();
			});
			$(`${cntrSelector} .toolbar button[data-cmd=open-add]`).click(function(){
				me.openEdit('create');
			});
			
			$(dtlsModalSelector).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			
			CxMisc.formValidated(dtlsFrmSelector, me.submitSqzx);
			
			/*CxMisc.enableUpload({
				target: `${dtlsModalSelector} button[data-cmd=upload]`, // 启动上传的目标元素（点击该元素开始上传）
				success: me.uploaded,  // 成功上传后的回调函数
				accept: 'image/gif, image/jpg, image/jpeg, image/png', // 限定的上传文件类型
				maxSize: 512000, // 单个上传文件尺寸最大值
				silent: true // 表示成功时不显示提示信息
			}); */
		},
		
		refresh: function(opt) {
			if (opt && opt.reload) me.filter(); // 重新查询包括数量与列表
			else if (me.pager && me.pager.pagination("records")>0) me.goto(me.pager.pagination("page"), me.pager.pagination("pageSize"));
		},
		
		del: function(el, e) {
			let id = $(el).closest('tr').data('id');
			CxCtrl.confirm('是否确定删除此资讯？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/gzxt/zxgl/deleteSqzx'),
		            type: "GET",
		            data: {zxid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask1).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除资讯成功');
		            		me.refresh({reload: true});
		            	} else CxMsg.error('删除资讯失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除资讯失败: ' + msg);
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
		
		filter: function(){
			let sqdm = document.querySelector(`${cntrSelector} .toolbar select[name=sqdm]`).value;
			me.filterData = {sqdm};
			if (me.filterData.sqdm) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/gzxt/zxgl/getSqzxCount'),
				    type: "GET",
				    data: me.filterData,
				    beforeSend: function(xhr, cfg) {
				    	$(loadingMask1).mask('show');
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		let oldPage = me.pager ? me.pager.pagination("page") : 0;
				    		me.genPager(res.data); // 生成分页
				    		if (res.data == 0) {
				    			$(`${cntrSelector} ${mainTblClz} tbody>tr:not(.table-row-no-data)`).remove();
				    		} else {
				    			me.goto(oldPage, me.pager.pagination("pageSize")); // 默认打开第一页
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
			}
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
			    url: CxMisc.finalizeUrl('/wygl/gzxt/zxgl/getSqzx'),
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
				tmp.append(`<tr data-id="${data[i].zxid}">
						<td class="td-indexer">
    						<input type="checkbox" id="${idPrefix}Indexer-${i}" name="${idPrefix}Indexer${i}">
				            <label for="${idPrefix}Indexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td class="td-wrap">${data[i].zxbt}</td>
						<td class="td-wrap">${data[i].zxljdz}</td>
						<td>${data[i].fbrq?CxMisc.formatDate(data[i].fbrq, 'short'):'未填写'}</td>
						<td>${data[i].yxbj==0?'无效':'有效'}</td>
						<td class="dl-item-cmd">
							<div class="btn-group" role="group" aria-label="操作按纽组">
								<button type="button" class="btn btn-outline-primary" data-cmd="update">修改</button>
	                        	<button type="button" class="btn btn-outline-danger" data-cmd="del">删除</button>
							</div>
						</td>
					</tr>`);
				tmp.children(':last-child').attr('data-json', JSON.stringify(data[i]));
			}
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			tmp.find('td.dl-item-cmd button[data-cmd="update"]').click(function(){ 
				let data = $(this).closest('tr').data('json');
				me.openEdit('update', data);
			});
			tmp.find('td.dl-item-cmd button[data-cmd=del]').click(function(e){ me.del(this, e); });
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		},
		
		getSqList: function() {
			let el = document.querySelector(`${cntrSelector} .toolbar select[name=sqdm]`);
			if (el.getAttribute('data-loaded') != 'true') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhsq'),
		            type: "GET",
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) 
		            				el.options.add(new Option(res.data[i].sqmc, res.data[i].sqdm));
		            			me.filter(); //刷新列表
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
		
		openEdit: function(cmd, data) {
			let f = document.querySelector(dtlsFrmSelector);
			f.reset();
			f.cmd.value = cmd;
			
			if (cmd == 'create') {
				f.zxid.value = '';
				//f.zxtpdz.value = '';
				//document.querySelector(`${dtlsFrmSelector} .prd-img-wrapper .prd-img`).src = document.querySelector(`${dtlsFrmSelector} .prd-img-wrapper .prd-img`).getAttribute('data-default-pic');
				$('#wgGzZxSqzx_fbrq_p').datetimepicker('clear');
				
				$(dtlsModalLblSelector).text('添加资讯');
			} else {
				f.zxid.value = data.zxid;
				f.zxbt.value = data.zxbt;
				f.zxljdz.value = data.zxljdz;
				
				if (data.fbrq) $('#wgGzZxSqzx_fbrq_p').datetimepicker('date', data.fbrq);
				
				CxMisc.selectRadio('yxbj', data.yxbj, f);
				
				$(dtlsModalLblSelector).text('修改资讯');
			}
			$(dtlsModalSelector).modal('show');
		},
		
		/*uploaded: function(e, res){
	    	if (res.data && res.data.length>0) {
	    		document.querySelector(dtlsFrmSelector).zxtpdz.value = res.data[0].path;
	    		document.querySelector(`${dtlsFrmSelector} .prd-img-wrapper .prd-img`).src = CxMisc.finalizeUrl(res.data[0].path);
	    	} else {
	    		CxMsg.warn('返回的上传信息为空');
	    	}
	    },*/
	    
	    submitSqzx: function(f){
	    	let frm=$(f), data = frm.serializeJson({removeBlankField:true}); // 每次查询后都缓存查询条件，给分页调用
	    	data.sqdm = document.querySelector(`${cntrSelector} .toolbar select[name=sqdm]`).value;
	    	let txt = data.cmd == 'create' ? '添加' : '修改';
	    	CxMisc.ajax({
			    url: CxMisc.finalizeUrl(data.cmd == 'create' ? '/wygl/gzxt/zxgl/addSqzx' : '/wygl/gzxt/zxgl/updateSqzx'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info(txt + '成功');
			    		me.refresh({reload: data.cmd == 'create'});
			    		frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn(txt + '失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn(txt + '失败：' + msg);
			    },
	            complete: function(xhr, ts) {
	            	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
	            }
			});
	    }
	}
}
GzZxSqzx.bind();