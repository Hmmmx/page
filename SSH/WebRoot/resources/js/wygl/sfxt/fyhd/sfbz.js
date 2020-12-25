if (typeof window.SfHdSfbz === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfHdSfbzCntr';
	const dtlsModalSelector = '#wgSfHdSfbzModalDtls';
	const dtlsModalLblSelector = '#wgSfHdSfbzModalDtlsLabel';
	const dtlsFrmSelector = '#wgSfHdSfbzDtlsFrm';
	
	const mainTblClz = '.table-wgsf-hd-sfbz';
	const idPrefix = 'wgSfHdSfbz';
	const loadingMask1 = '#wgSfHdSfbzCntr';
	
	const me = window.SfHdSfbz = {
		bind: function() {
			me.preLoad(); // 预先载入数据，优化页面显示效果
			me.fetch();
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.bindCheckAll(cntrSelector);
			$(cntrSelector).find('.toolbar button[data-cmd=open-add]').click(function(){
				me.openEdit('create', this);
			});
			
			
			$(dtlsModalSelector).find('select[name=sqdm]').change(function(){
				me.loadJgSfxm(this);
				me.loadJgWyjlx(this);
			});
			$(dtlsModalSelector).find('select[name=jffsdm]').change(function(){
				me.switchJffs(this);
			});
			$(dtlsModalSelector).find('input[type=range]').change(function(){
		        me.displayRangeTips(this);
			}).on('input', function(){
		        me.displayRangeTips(this);
			});
			$(dtlsModalSelector).find('input[name=ysrbj]').click(function(){
				me.switchYsrbj(this);
			});
			CxMisc.formValidated(dtlsFrmSelector, function(f){ me.submit(f); });
			
			
			$(dtlsModalSelector).on('hide.bs.modal', function (e) { $(this).find('.modal-body').scrollTop(0); });
			$(dtlsModalSelector).on('show.bs.modal', function (e) { me.lazyLoad(this); });
			$(dtlsModalSelector).on('show.bs.modal', function (e) { CxMisc.clearValidation(this); }); //默认任何modal显示时把上次验证结果去掉
		},
		
		refresh: function(){
			me.fetch(); //刷新列表
		},
		
		clearStatus: function() { // 需要重新载入的数据，清除已存在的数据与状态
			let el = document.querySelector(`${dtlsFrmSelector} select[name=khid]`); // 客户状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
			
			el = document.querySelector(`${dtlsFrmSelector} select[name=sfbzid]`); // 收费标准状态需要清除
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i); //清除上次查询的列表
			
			el = document.querySelector(`${dtlsFrmSelector} select[name=wyjid]`);
			el.removeAttribute('data-loaded');
			for (let i=el.options.length-1; i>0; i--) el.remove(i);
		},
		
		displayRangeTips: function(el) {
			if (el.name == 'ysysl') {
				me.displayYsyTips(el);
			} else if (el.name == 'ysrsl') {
				me.displayYsrTips(el);
			} else if (el.name == 'zdysl') {
				me.displayZdyTips(el);
			}
		},
		displayYsyTips: function(el) {
			let v = parseInt(el.value);
			if (v == 2) {
				$(el).next('div').text(`延后两个月`);
			} else if (v > 0) {
				$(el).next('div').text(`延后${v}个月`);
			} else if (v == 0) {
				$(el).next('div').text('不延后');
			}
		},
		displayYsrTips: function(el) {
			$(el).next('div').text(`${el.value}号`);
		},
		displayZdyTips: function(el) {
			let v = parseInt(el.value);
			if (v > 0) {
				if (v == 2) $(el).next('div').text(`延后两个月`);
				else $(el).next('div').text(`延后${v}个月`);
			} else if (v == 0) {
				$(el).next('div').text('应收月当月');
			} else {
				if (Math.abs(v) == 2) $(el).next('div').text(`提前两个月`);
				else $(el).next('div').text(`提前${Math.abs(v)}个月`);
			}
		},
		
		del: function(el, e) {
			let id = $(el).closest('tr').data('id');
			let evt = e || window.event;
			CxCtrl.confirm('是否确定删除此收费标准？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/sfbz/deleteSfbz'),
		            type: "GET",
		            data: {sfbzid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask1).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除收费标准成功');
		            		me.fetch(); //刷新列表
		            	} else CxMsg.error('删除收费标准失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除收费标准失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	$(loadingMask1).mask('hide');
		            }
		        });
		    }, {
		    	evt: evt,
		    	src: el,
		    	placement: 'top'
		    });
		},
		
		fetch: function() {
			CxMisc.resetCheckAll(cntrSelector);
			
			let cols = $(`${cntrSelector} ${mainTblClz} thead>tr>th`).length,
				emptyTmpl = `<tr><td colspan="${cols}" class="table-empty">暂无数据</td></tr>`;
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/sfbz/getJgsfbz'),
			    type: "GET",
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask1).mask('show', {msg: '载入中，请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data && res.data.length>0) {
			    			let tmp = $(cntrSelector).find(`${mainTblClz} tbody`).empty();
			    			for (let i=0; i<res.data.length; i++) {
			    				tmp.append(`<tr data-id="${res.data[i].sfbzid}">
			    						<td class="td-indexer">
				    						<input type="checkbox" id="${idPrefix}Indexer-${i}" name="${idPrefix}Indexer${i}">
								            <label for="${idPrefix}Indexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
				    						<span>${i+1}</span>
			    						</td>
			    						<td>${res.data[i].sqmc}</td>
			    						<td>${CxMisc.escapeHtml(res.data[i].sfbzmc)}</td>
			    						<td>${res.data[i].fylxmc}</td>
			    						<td>${res.data[i].sfxmmc}</td>
			    						<td>${CxMisc.escapeHtml(res.data[i].jffsmc)}</td>
			    						<td>${res.data[i].dj!==null ? res.data[i].dj : ''}</td>
			    						<td>${CxMisc.escapeHtml(res.data[i].dwmc)}</td>
			    						<td>${me.interpretJddm(res.data[i].jddm)}</td>
			    						<td>${res.data[i].yxbj == '1' ? '有效' : '无效'}</td>
			    					    <td class="dl-item-cmd">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			    								<button type="button" class="btn btn-outline-primary" data-cmd="update">修改</button>
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="del">删除</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
			    			}
			    			tmp.find('td.dl-item-cmd button[data-cmd=update]').click(function(){ me.openEdit('update', this); });
			    			tmp.find('td.dl-item-cmd button[data-cmd=del]').click(function(){ me.del(this); });
			    		} else {
			    			$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
			    		}
			    	} else {
			    		CxMsg.error('载入失败：' + res.message);
			    		$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('载入失败：' + msg);
			    	$(`${cntrSelector} ${mainTblClz} tbody`).empty().append(emptyTmpl);
			    },
			    complete: function(xhr, ts) {
			    	$(loadingMask1).mask('hide');
			    }
			});
		},
		
		interpretJddm: function(jddm) {
			if (jddm !== null) {
				let el = document.querySelector(dtlsFrmSelector).jddm;
				for (let i=0; el.options.length; i++) {
					if (el.options[i].value == jddm) return el.options[i].text;
				}
			}
			return '';
		},
		
		lazyLoad: function(m) {
			me.loadSqList();
			CxMisc.loadAllDmList(m);
		},
		loadJgSfxm: function(sqdmEl) {
			let el = sqdmEl.form.sfxmdm;
			if (sqdmEl.value != '') {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getSfxm'),
		            type: "GET",
		            data: {sqdm: sqdmEl.value},
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		el.selectedIndex = 0;
	            			for (let i=el.options.length-1; i>0; i--) el.remove(i);
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) 
		            				el.options.add(new Option(res.data[i].sfxmmc, res.data[i].sfxmdm));
		            			if (el.getAttribute('data-selected-value')) {
		        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
		        					if (el.selectedIndex == -1) el.selectedIndex = 0;
		        				}
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
		loadJgWyjlx: function(sqdmEl) {
			let el = sqdmEl.form.wyjid;
			if (sqdmEl.value) {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/sfbz/getWyjlx'),
		            type: "GET",
		            data: {sqdm: sqdmEl.value},
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		el.selectedIndex = 0;
		            		for (let i=el.options.length-1; i>0; i--) el.remove(i);
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) 
		            				el.options.add(new Option(res.data[i].wyjmc, res.data[i].wyjid));
		            			if (el.getAttribute('data-selected-value')) {
		        					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
		        					if (el.selectedIndex == -1) el.selectedIndex = 0;
		        				}
		            		}
		            	} else CxMsg.info('获取违约金类型列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取违约金类型列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	el.disabled = false;
		            }
		        });
			}
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
		
		openEdit: function(cmd, el) {
			let f = document.querySelector(dtlsFrmSelector);
			f.reset();
			f.cmd.value = cmd;
			CxMisc.selectRange('ysysl', 0, f);
			CxMisc.selectRange('ysrsl', 1, f);
			CxMisc.selectRange('zdysl', 0, f);
			CxMisc.selectRadio('ysrbj', 1, f);
			
			if (cmd == 'create') {
				f.sfbzid.value = '';
				
				$(dtlsModalLblSelector).text('添加收费标准');
			} else {
				let data = $(el).closest('tr').data('json');
				f.sfbzid.value = data.sfbzid;
				
				f.sfbzmc.value = data.sfbzmc;
				if ($(f.sqdm).data('loaded')) {
					CxMisc.selectSelect('sqdm', data.sqdm, f);
				} else {
					f.sqdm.setAttribute('data-selected-value', data.sqdm); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				}
				/*if (data.fylxdm) {
					if ($(f.fylxdm).data('loaded')) {
						CxMisc.selectSelect('fylxdm', data.fylxdm, f);
					} else f.fylxdm.setAttribute('data-selected-value', data.fylxdm); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				}*/
				if (data.sfxmdm) {
					if ($(f.sfxmdm).data('loaded')) {
						CxMisc.selectSelect('sfxmdm', data.sfxmdm, f);
					} else f.sfxmdm.setAttribute('data-selected-value', data.sfxmdm); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				}
				if (data.wyjid) {
					if ($(f.wyjid).data('loaded')) {
						CxMisc.selectSelect('wyjid', data.wyjid, f);
					} else f.wyjid.setAttribute('data-selected-value', data.wyjid);
				}
				if (data.jffsdm) {
					if ($(f.jffsdm).data('loaded')) {
						CxMisc.selectSelect('jffsdm', data.jffsdm, f);
					} else f.jffsdm.setAttribute('data-selected-value', data.jffsdm); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				}
				if (data.jddm) CxMisc.selectSelect('jddm', data.jddm, f);
				if (data.dj) f.dj.value = data.dj;
				if (data.dwdm) {
					if ($(f.dwdm).data('loaded')) {
						CxMisc.selectSelect('dwdm', data.dwdm, f);
					} else f.dwdm.setAttribute('data-selected-value', data.dwdm); // 对话框打开时会自动查询代码，然后根据此参数自动设置选中的项
				}
				if (data.jfgs) f.jfgs.value = data.jfgs.replace(/;/g, '\n');
				
				if (data.ysysl !== null) CxMisc.selectSelect('ysybj', data.ysybj, f);
				if (data.ysysl !== null) CxMisc.selectRange('ysysl', data.ysysl, f);
				if (data.ysrbj !== null) CxMisc.selectRadio('ysrbj', data.ysrbj, f);
				if (data.ysrsl !== null) CxMisc.selectRange('ysrsl', data.ysrsl, f);
				if (data.zdysl !== null) CxMisc.selectRange('zdysl', data.zdysl, f);
				if (data.yxbj !== null) CxMisc.selectRadio('yxbj', data.yxbj, f);
				
				$(dtlsModalLblSelector).text('修改收费标准');
			}
			$(dtlsModalSelector).modal('show');
		},
		
		preLoad: function() { // 预先载入代码数据，优化页面显示效果
			//
		},
		
		switchJffs: function(el) {
			let f = el.form, required = el.value == '13' || el.value == '14';//楼层系数，楼层+面积 分摊
			f.jfgs.disabled = !required;
			f.jfgs.required = required;
			if (required) $(f.jfgs).closest('.form-group').children('label').addClass('required');
			else $(f.jfgs).closest('.form-group').children('label').removeClass('required');
		},
		switchYsrbj: function(el) {
			el.form.ysrsl.disabled = el.value == '1';
		},
		
		submit: function(f) {
			let frm = $(f), data = frm.serializeJson({removeBlankField:true});
			if (data.jfgs) {
				let jfgs = data.jfgs.replace(/\r/g, '').replace(/\n/g, ';');
				let gss = jfgs.split(';'), tmp = [];
				for (let i=0; i<gss.length; i++) {
					if (gss[i] != "") {
						if (/^(\d+)(\+|(-(\d*)))=(\d+(?:\.\d+)?)$/.test(gss[i])) tmp.push(gss[i]);
						else { CxMsg.warn('计算公式格式不正确，请修正'); return;}
					}
				}
				data.jfgs = tmp.join(';');
			}
			let txt = data.cmd == 'create' ? '添加' : '修改';
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl(data.cmd == 'create' ? '/wygl/sfxt/sfbz/addSfbz' : '/wygl/sfxt/sfbz/updateSfbz'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info(txt + '成功');
			    		me.fetch(); //刷新列表
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
	};
}

SfHdSfbz.bind();