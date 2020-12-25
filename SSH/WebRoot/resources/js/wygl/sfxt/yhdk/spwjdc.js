if (typeof window.SfDkSpwjdc === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfDkSpwjdcCntr';
	const dcModalSelector = '#wgSfDkSpwjdcModalDtls';
	const dcFrmSelector = '#wgSfDkSpwjdcDtlsFrm';
	
	const mainTblClz = '.table-wgsf-dk-spwjdc';
	const idPrefix = 'wgSfDkSpwjdc';
	const loadingMask1 = '#wgSfDkSpwjdcCntr';
	
	const me = window.SfDkSpwjdc = {
		bind: function() {
			me.fetch(); 
			
			$(cntrSelector).find('.toolbar button[data-cmd=open-spwjdc]').click(function(){
				me.openSpwjdc(this);
			});
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			
			CxMisc.bindCheckAll(cntrSelector);
			
			$(dcModalSelector).find('select[name=sqdm]').change(function(){
				// me.loadJgSfbz(this);
				me.loadJgSfxm(this);
			});
			$(dcModalSelector).find('input[name=sfxmdmAll]').click(function(){
				me.checkAllSfxm(this);
			});
			CxMisc.formValidated(dcFrmSelector, function(f){ me.submitSpwjdc(f); });
			$(dcModalSelector).on('show.bs.modal', function (e) { 
				me.lazyLoad(this); 
				CxMisc.clearValidation(this); //默认任何modal显示时把上次验证结果去掉
			});
		},
		
		refresh: function(){
			me.fetch(); //刷新列表
		},
		
		clearStatus: function() { // 需要重新载入的数据，清除已存在的数据与状态
			/*let els = document.querySelectorAll(`${dcFrmSelector} input[name=sfbzid]`); // 收费标准状态需要清除
			for (let i=els.length-1; i>0; i--) {
				$(els[i]).closest('.custom-checkbox').remove(); //清除上次查询的列表
			}*/
			let els = document.querySelectorAll(`${dcFrmSelector} input[name=sfxmdm]`); // 收费项目状态需要清除
			for (let i=els.length-1; i>0; i--) {
				$(els[i]).closest('.custom-checkbox').remove(); //清除上次查询的列表
			}
		},
		
		checkAllSfxm: function(el) {
			$(el).closest('.modal-body').find('.p-sim-ctrl input[name=sfxmdm]').each(function(){
				if (!this.disabled) this.checked = el.checked;
			});
		},
		
		del: function(el, e) {
			let id = $(el).closest('tr').data('id');
			CxCtrl.confirm('是否确定删除此导出记录？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/yhdk/deleteDkjl'),
		            type: "GET",
		            data: {dkjlid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask1).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除导出记录成功');
		            		me.fetch(); //刷新列表
		            	} else CxMsg.error('删除导出记录失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除导出记录失败: ' + msg);
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
			    url: CxMisc.finalizeUrl('/wygl/sfxt/yhdk/getdkjl'),
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
			    				tmp.append(`<tr data-id="${res.data[i].dkjlid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="${idPrefix}Indexer-${i}" name="${idPrefix}Indexer${i}">
								            <label for="${idPrefix}Indexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td>${res.data[i].sqmc}</td>
			    						<td>${CxMisc.escapeHtml(res.data[i].dkfamc)}</td>
			    						<td>${CxMisc.formatDate(res.data[i].sprq, 'short')}</td>
			    						<td>${res.data[i].spwjm?res.data[i].spwjm:''}</td>
			    						<td>${res.data[i].sprmc?res.data[i].sprmc:''}</td>
			    						<td>${CxMisc.formatDate(res.data[i].hprq, 'short')}</td>
			    						<td>${res.data[i].hpwjm?res.data[i].hpwjm:''}</td>
			    						<td>${res.data[i].hprmc?res.data[i].hprmc:''}</td>
			    						<td>${res.data[i].dkzje!==null ? res.data[i].dkzje.toFixed(2) : ''}</td>
			    						<td>${CxMisc.formatDate(res.data[i].ykkkrq, 'short')}</td>
			    						<td>${res.data[i].dkcgzje!==null ? res.data[i].dkcgzje.toFixed(2) : ''}</td>
			    						<td>${me.interpretDzzt(res.data[i].dzzt)}</td>
			    						<td>${res.data[i].dzjg?res.data[i].dzjg:''}</td>
			    						<td>${res.data[i].xhzt == '1' ? '已销号' : '未销号'}</td>
			    					    <td class="dl-item-cmd">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			    								<button type="button" class="btn btn-outline-primary" data-cmd="spwjdc"${res.data[i].xhzt == '1' ? ' disabled' :''}>重新导出</button>
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="del"${res.data[i].xhzt == '1' ? ' disabled' :''}>删除</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
			    			}
			    			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			    			tmp.find('td.dl-item-cmd button[data-cmd="spwjdc"]').click(function(){ 
			    				let data = $(this).closest('tr').data('json');
			    				me.submitSpwjdc(null, data); 
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
		},
		interpretDzzt: function(dzzt) {
			if (dzzt == 0) return '未对账';
			else if (dzzt == 1) return '对账成功';
			else if (dzzt == 9) return '对账失败';
			else return '';
		},
		
		lazyLoad: function(m) {
			me.loadSqList();
			CxMisc.loadAllDmList(m);
		},
		/*loadJgSfbz: function(el) {
			me.clearStatus();
			if (el.value != '') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/sfbz/getSfbz'),
		            type: "GET",
		            data: {sqdm: el.value},
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			let wrapper = $(el).closest('.modal-body').find('.p-sim-ctrl');
		            			for (let i=0; i<res.data.length; i++) {
		            				wrapper.append(`<div class="custom-control custom-checkbox mb-2">
					                        <input type="checkbox" class="custom-control-input" name="sfbzid" value="${res.data[i].sfbzid}" id="wgSfDkSpwjdc_sfbzid_${i}">
					                        <label class="custom-control-label" for="wgSfDkSpwjdc_sfbzid_${i}">${res.data[i].sfbzmc}</label>
					                    </div>`);
		            			}
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
			}
		},*/
		loadJgSfxm: function(el) {
			me.clearStatus();
			if (el.value != '') {
				let data = {sqdm: el.value, fylxStr: '01,02,04,05'};
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfxm'),
		            type: "GET",
		            data: data,
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		let wrapper = $(el).closest('.modal-body').find('.p-sim-ctrl');
	            			for (let i=0; i<res.data.length; i++) {
	            				wrapper.append(`<div class="custom-control custom-checkbox mb-2">
				                        <input type="checkbox" class="custom-control-input" name="sfxmdm" value="${res.data[i].sfxmdm}" id="wgSfDkSpwjdc_sfxmdm_${i}">
				                        <label class="custom-control-label" for="wgSfDkSpwjdc_sfxmdm_${i}">${res.data[i].sfxmmc}</label>
				                    </div>`);
	            			}
		            	} else CxMsg.info('获取收费项目列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取收费项目列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	el.disabled = false;
		            }
		        });
			}
		},
		loadSqList: function() {
			let el = document.querySelector(dcFrmSelector).sqdm;
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
		            			if (el.getAttribute('data-selected-value')) {
		        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
		        					if (el.selectedIndex == -1) el.selectedIndex = 0;
		        					$(el).trigger('change');
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
		
		openSpwjdc: function(el) {
			let f = document.querySelector(dcFrmSelector);
			f.reset();
			
			me.clearStatus();
			$(dcModalSelector).modal('show');
		},
		
		submitSpwjdc: function(f, d) {
			let ok = true, data = null, frm = null;
			if (d) {
				data = {dkjlid: d.dkjlid, dkfadm:d.dkfadm};
			} else {
				frm = $(f);
				data = frm.serializeJson({removeBlankField:true});
				if (data.sfxmdm) {
					data.sfxmdmstr = typeof data.sfxmdm === 'string' ? data.sfxmdm : data.sfxmdm.join(',');
					delete data.sfxmdm;
					delete data.sfxmdmAll;
				} else {
					CxMsg.info('请选择收费项目');
					ok = false;
				}
				/*if (data.sfbzid) {
					data.sfbzidstr = typeof data.sfbzid === 'string' ? data.sfbzid : data.sfbzid.join(',');
					delete data.sfbzid;
				} else {
					CxMsg.info('请选择收费标准');
					ok = false;
				}*/
			}
			
			if (ok) {
				$.fileDownload(CxMisc.finalizeUrl('/wygl/sfxt/yhdk/dcdkfy'), {
	                httpMethod : 'GET',
	                data : data,
	                prepareCallback : function(url) {
	                	if (f) CxMisc.markAjaxStart(frm.find('button[type=submit]'));
	                	else $(loadingMask1).mask('show', {msg: '导出中，请稍候...'});
	                },
	                successCallback : function(url) {
	                	if (f) {
	                		CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
	                		frm.closest('.modal').modal('hide'); 
	                		me.fetch(); //刷新列表
	                	} else $(loadingMask1).mask('hide');
	                    CxMsg.info('送盘文件导出成功');
	                },
	                failCallback : function(html, url) {
	                	if (f) CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
	                	else $(loadingMask1).mask('hide');
	                	let txt = CxMisc.getHtmlText(html);
	                	try {
	                		let res = JSON.parse(txt);
	                		CxMsg.warn('送盘文件文件导出失败：' + res.message);
	                	} catch(err) {
	                		CxMsg.warn('送盘文件文件导出失败：' + txt);
	                	}
	                	
	                }
	            });
			}
		}
	}
}
SfDkSpwjdc.bind();