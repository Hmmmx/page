if (typeof window.SfScKhfysc === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfScKhfyscCntr';
	const dtlsModalSelector = '#wgSfScKhfyscModalDtls';
	const dtlsFrmSelector = '#wgSfScKhfyscDtlsFrm';
	
	const mainTblClz = '.table-wgsf-fy-khfysc';
	const idPrefix = 'wgSfScKhfysc';
	const loadingMask1 = '#wgSfCbKhybCntr';
	
	const me = window.SfScKhfysc = {
		bind: function() {
			me.fetch(); 
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.bindCheckAll(cntrSelector);
			$(cntrSelector).find('.toolbar button[data-cmd=save]').click(function(){
				me.openEdit();
			});
			
			$(dtlsFrmSelector).find('div.date[data-cx-ctrl=date]').datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			
			$(`${dtlsFrmSelector} select[name=sqdm]`).change(function(){
				if (this.value != "") {
					me.loadSfbz(this.value);
				}
			});
			CxMisc.formValidated(dtlsFrmSelector, function(f){ me.submitFysc(f); });
			$(dtlsModalSelector).on('show.bs.modal', function (e) { 
				me.lazyLoad(this); 
				CxMisc.clearValidation(this); //默认任何modal显示时把上次验证结果去掉
			});
		},
		
		refresh: function(){
			me.fetch(); //刷新列表
		},
		
		del: function(el, e) {
			let id = $(el).closest('tr').data('id');
			CxCtrl.confirm('是否确定删除此费用生成？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/fysc/khfysc/deleteFysc'),
		            type: "GET",
		            data: {fyscid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask1).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除费用生成成功');
		            		me.fetch(); //刷新列表
		            	} else CxMsg.error('删除费用生成失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除费用生成失败: ' + msg);
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
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fysc/khfysc/getFyscList'),
			    type: "GET",
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask1).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
		    			let tmp = $(cntrSelector).find(`${mainTblClz} tbody`);
		    			tmp.children('tr:not(.table-row-no-data)').remove();
			    		if (res.data && res.data.length>0) {
			    			for (let i=0; i<res.data.length; i++) {
			    				tmp.append(`<tr data-id="${res.data[i].fyscid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="${idPrefix}Indexer-${i}" name="${idPrefix}Indexer${i}">
								            <label for="${idPrefix}Indexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td>${res.data[i].sqmc}</td>
			    						<td>${res.data[i].sfxmmc}</td>
			    						<td>${CxMisc.escapeHtml(res.data[i].sfbzmc)}</td>
			    						<td>${CxMisc.formatDate(res.data[i].jfzqq, 'short')} ~ ${CxMisc.formatDate(res.data[i].jfzqz, 'short')}</td>
			    						<td>${CxMisc.formatDate(res.data[i].ysrq, 'short')}</td>
			    						<td>${res.data[i].zdy?res.data[i].zdy:''}</td>
			    						<td>${res.data[i].scts!==null&&res.data[i].scts!==undefined?res.data[i].scts:''}</td>
			    						<td>${res.data[i].zje?res.data[i].zje.toFixed(2):''}</td>
			    						<td>${me.ztbjmc(res.data[i].ztbj)}</td>
			    						<td><pre class="mb-0 cx-f-1">${res.data[i].bz?res.data[i].bz:''}</pre></td>
			    					    <td class="dl-item-cmd">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="del"${res.data[i].ztbj=='9'?' disabled':''}>作废</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
			    			}
			    			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
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
		},
		
		lazyLoad: function(m) {
			me.loadSqList();
			// CxMisc.loadAllDmList(m);
		},
		
		loadSfbz: function(sqdm) {
			let el = document.querySelector(dtlsFrmSelector).sfbzid;
			CxMisc.ajax({
	            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfbz'),
	            type: "GET",
	            data: {sqdm: sqdm},
	            beforeSend: function(xhr, cfg) {
	            	el.disabled = true;
	            },
	            success: function(res, ts) {
	            	if (res.code == "0") {
	            		el.selectedIndex = 0;
            			for (let i=el.options.length-1; i>0; i--) el.options.remove(i); //保留请选择选项
            			$(el).children('optgroup').remove();
	            		if (res.data && res.data.length>0) {
	            			let sfxmdm = [], sfxmmc = [];
	            			for (let i=0; i<res.data.length; i++) {
	            				if (res.data[i].sfxmdm && !sfxmdm.includes(res.data[i].sfxmdm)) {
	            					sfxmdm.push(res.data[i].sfxmdm);
	            					sfxmmc.push(res.data[i].sfxmmc);
	            				}
	            			}
	            			for (let i=0; i<sfxmdm.length; i++) {
	            				let optGrp = document.createElement('optgroup');
	            				optGrp.label = sfxmmc[i];
	            				for (let j=0; j<res.data.length; j++) {
	            					if (res.data[j].sfxmdm == sfxmdm[i]) optGrp.appendChild(new Option(res.data[j].sfbzmc, res.data[j].sfbzid));
	            				}
	            				el.appendChild(optGrp);
	            			}
	            			//for (let i=0; i<res.data.length; i++) el.options.add(new Option(res.data[i].sfbzmc, res.data[i].sfbzid));
	            		}
	            	} else CxMsg.info('获取收费标准列表失败: ' + res.message);
	            },
	            error: function(xhr, ts, err) {
	            	var msg = "[" + xhr.status + " : " + ts + "]";
	            	CxMsg.error('获取收费标准列表失败: ' + msg);
	            },
	            complete: function(xhr, ts) {
	            	el.disabled = false;
	            }
	        });
		},
		
		loadSqList: function() {
			let el = document.querySelector(dtlsFrmSelector).sqdm;
			if (el.getAttribute('data-loaded') != 'true') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhsq'),
		            type: "GET",
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		for (let i=el.options.length-1; i>0; i--) el.remove(i);
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) 
		            				el.options.add(new Option(res.data[i].sqmc, res.data[i].sqdm));
		            			if (res.data.length == 1) { // 只有一个时默认直接载入收费标准
		            				el.selectedIndex = 1;
		            				me.loadSfbz(el.value);
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
			} else {
				if (el.options.length == 2) { // 只有一个时社区时（第一项为请选择项），默认直接载入收费标准
    				el.selectedIndex = 1;
    				me.loadSfbz(el.value);
    			}
			}
		},
		
		openEdit: function() {
			let f = document.querySelector(dtlsFrmSelector);
			f.reset();
			
			$(dtlsModalSelector).modal('show');
		},
		
		submitFysc: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true}), ok = true;
			if (data.jfqsrq > data.jfjsrq) {
				ok = false;
				f.jfqsrq.focus();
				CxMsg.info('计费日止不能小于计费日起');
			}
			if (ok){
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/fysc/khfysc/addKhfysc'),
				    type: "POST",
				    data: data,
				    beforeSend: function(xhr, cfg) {
				    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		CxMsg.info('客户费用生成成功');
				    		me.fetch(); //刷新列表
							frm.closest('.modal').modal('hide');
				    	} else {
				    		CxMsg.warn('客户费用生成失败：' + res.message);
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.warn('客户费用生成失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
				    }
				});	
			}	
		},
		
		ztbjmc: function(ztbj) {
			switch(ztbj) {
			case '0': return '未审核';
			case '1': return '已审核';
			case '9': return '作废';
			}
			return '';
		}
	};
}

SfScKhfysc.bind();