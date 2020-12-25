if (typeof window.GzGgSqgg === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgGzGgSqggCntr';
	const dtlsModalSelector = '#wgGzGgSqggModalDtls';
	const dtlsModalLblSelector = '#wgGzGgSqggModalDtlsLabel';
	const dtlsFrmSelector = '#wgGzGgSqggDtlsFrm';
	
	const mainTblClz = '.table-wggz-gg-sqgg';
	const idPrefix = 'wgGzGgSqgg';
	const loadingMask1 = '#wgGzGgSqggCntr';
	
	const me = window.GzGgSqgg = {
		bind: function() {
			me.getSqList(); 

			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			
			CxMisc.bindCheckAll(cntrSelector);
			
			$(`${cntrSelector} .toolbar select[name=sqdm]`).change(function(){
				me.fetch();
			});
			$(`${cntrSelector} .toolbar button[data-cmd=open-add]`).click(function(){
				me.openEdit('create');
			});
			
			$(dtlsModalSelector).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			
			CxMisc.formValidated(dtlsFrmSelector, me.submitSqgg);
			
			CxMisc.enableUpload({
				target: `${dtlsModalSelector} button[data-cmd=upload]`, // 启动上传的目标元素（点击该元素开始上传）
				success: me.uploaded,  // 成功上传后的回调函数
				accept: 'image/gif, image/jpg, image/jpeg, image/png', // 限定的上传文件类型
				maxSize: 512000, // 单个上传文件尺寸最大值
				silent: true // 表示成功时不显示提示信息
			}); 
		},
		
		refresh: function(){
			me.fetch(); //刷新列表
		},
		
		del: function(el, e) {
			let id = $(el).closest('tr').data('id');
			CxCtrl.confirm('是否确定删除此广告？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/gzxt/gggl/deleteSqgg'),
		            type: "GET",
		            data: {ggid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask1).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除广告成功');
		            		me.refresh();
		            	} else CxMsg.error('删除广告失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除广告失败: ' + msg);
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
		
		fetch: function() {
			CxMisc.resetCheckAll(cntrSelector);
			
			let tmp = $(cntrSelector).find(`${mainTblClz} tbody`);
			tmp.children('tr:not(.table-row-no-data)').remove();
			let sqdm = document.querySelector(`${cntrSelector} .toolbar select[name=sqdm]`).value;
			if (sqdm) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/gzxt/gggl/getSqgg'),
				    type: "GET",
				    data: {sqdm},
				    beforeSend: function(xhr, cfg) {
				    	$(loadingMask1).mask('show', {msg: '载入中，请稍候...'});
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		if (res.data && res.data.length>0) {
				    			for (let i=0; i<res.data.length; i++) {
				    				tmp.append(`<tr data-id="${res.data[i].ggid}">
				    						<td class="td-indexer">
					    						<input type="checkbox" id="${idPrefix}Indexer-${i}" name="${idPrefix}Indexer${i}">
									            <label for="${idPrefix}Indexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
					    						<span>${i+1}</span>
				    						</td>
				    						<td><div class="thumbnail thumbnail-lg"><img src="${CxMisc.finalizeUrl(res.data[i].ggtpdz?res.data[i].ggtpdz:'/resources/img/no-pic.png')}" alt="广告图片"></div></td>
				    						<td class="td-wrap">${res.data[i].ggmc}</td>
				    						<td class="td-wrap">${res.data[i].ggljdz}</td>
				    						<td>${res.data[i].yxrqq?CxMisc.formatDate(res.data[i].yxrqq, 'short'):'未填写'} ~ ${res.data[i].yxrqz?CxMisc.formatDate(res.data[i].yxrqz, 'short'):'未填写'}</td>
				    						<td>${res.data[i].plxh}</td>
				    						<td>${res.data[i].yxbj==0?'无效':'有效'}</td>
				    						<td class="dl-item-cmd">
												<div class="btn-group" role="group" aria-label="操作按纽组">
													<button type="button" class="btn btn-outline-primary" data-cmd="update">修改</button>
						                        	<button type="button" class="btn btn-outline-danger" data-cmd="del">删除</button>
												</div>
											</td>
				    					</tr>`);
				    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
				    			}
				    			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
				    			tmp.find('td.dl-item-cmd button[data-cmd="update"]').click(function(){ 
				    				let data = $(this).closest('tr').data('json');
				    				me.openEdit('update', data);
				    			});
				    			tmp.find('td.dl-item-cmd button[data-cmd=del]').click(function(e){ me.del(this, e); });
				    		}
				    	} else {
				    		CxMsg.error('载入失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('载入失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	$(loadingMask1).mask('hide');
				    }
				});
			}
		},
		interpretBglx: function(bglx) {
			if (bglx == 0) return '充值';
			else if (bglx == 1) return '发送';
			else return '';
		},
		interpretBglxSymbol: function(bglx) {
			if (bglx == 0) return '+ ';
			else if (bglx == 1) return '- ';
			else return '';
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
		            			me.fetch(); //刷新列表
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
				f.ggid.value = '';
				f.ggtpdz.value = '';
				document.querySelector(`${dtlsFrmSelector} .prd-img-wrapper .prd-img`).src = document.querySelector(`${dtlsFrmSelector} .prd-img-wrapper .prd-img`).getAttribute('data-default-pic');
				$('#wgGzGgSqgg_ysrqq_p, #wgGzGgSqgg_ysrqz_p').datetimepicker('clear');
				
				$(dtlsModalLblSelector).text('添加广告');
			} else {
				f.ggid.value = data.ggid;
				f.ggmc.value = data.ggmc;
				f.ggljdz.value = data.ggljdz;
				f.plxh.value = data.plxh;
				f.ggljdz.value = data.ggljdz;
				
				if (data.yxrqq) $('#wgGzGgSqgg_yxrqq_p').datetimepicker('date', data.yxrqq);
				if (data.yxrqz) $('#wgGzGgSqgg_yxrqz_p').datetimepicker('date', data.yxrqz);
				
				CxMisc.selectRadio('yxbj', data.yxbj, f);
				f.ggtpdz.value = data.ggtpdz;
				
				document.querySelector(`${dtlsFrmSelector} .prd-img-wrapper .prd-img`).src = CxMisc.finalizeUrl(data.ggtpdz);
				$(dtlsModalLblSelector).text('修改广告');
			}
			$(dtlsModalSelector).modal('show');
		},
		
		uploaded: function(e, res){
	    	if (res.data && res.data.length>0) {
	    		document.querySelector(dtlsFrmSelector).ggtpdz.value = res.data[0].path;
	    		document.querySelector(`${dtlsFrmSelector} .prd-img-wrapper .prd-img`).src = CxMisc.finalizeUrl(res.data[0].path);
	    	} else {
	    		CxMsg.warn('返回的上传信息为空');
	    	}
	    },
	    
	    submitSqgg: function(f){
	    	let frm=$(f), data = frm.serializeJson({removeBlankField:true}); // 每次查询后都缓存查询条件，给分页调用
	    	data.sqdm = document.querySelector(`${cntrSelector} .toolbar select[name=sqdm]`).value;
	    	let txt = data.cmd == 'create' ? '添加' : '修改';
	    	CxMisc.ajax({
			    url: CxMisc.finalizeUrl(data.cmd == 'create' ? '/wygl/gzxt/gggl/addSqgg' : '/wygl/gzxt/gggl/updateSqgg'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info(txt + '成功');
			    		me.refresh();
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
GzGgSqgg.bind();