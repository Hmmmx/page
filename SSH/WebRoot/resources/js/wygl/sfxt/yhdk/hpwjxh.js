if (typeof window.SfDkHpwjxh === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfDkHpwjxhCntr';
	const drModalSelector = '#wgSfDkHpwjxhModalDtls';
	const drFrmSelector = '#wgSfDkHpwjxhDtlsFrm';
	const jyjgModalSelector = '#wgSfDkHpwjxhJyjgModalDtls';
	
	const mainTblClz = '.table-wgsf-dk-hpwjxh';
	const idPrefix = 'wgSfDkHpwjxh';
	const loadingMask1 = '#wgSfDkHpwjxhCntr';
	
	const me = window.SfDkHpwjxh = {
		bind: function() {
			me.fetch();
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			
			CxMisc.bindCheckAll(cntrSelector);
			
			$(`${drModalSelector} div.date[data-cx-ctrl=date]`).datetimepicker({
		        format: 'YYYY-MM-DD',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
			$(drModalSelector).on('show.bs.modal', function (e) { 
				CxMisc.clearValidation(this); //默认任何modal显示时把上次验证结果去掉
			});
			
			CxMisc.enableUpload({
				url: CxMisc.finalizeUrl('/wygl/sfxt/yhdk/drdkfy'),
				target: `${drModalSelector} button[data-cmd=upload]`, // 启动上传的目标元素（点击该元素开始上传）
				pre: function() { return CxMisc.validate(document.querySelector(drFrmSelector)); },
				before: function(){ CxMisc.markAjaxStart($(`${drModalSelector} button[data-cmd=upload]`)); },
				done: function(){ CxMisc.markAjaxEnd($(`${drModalSelector} button[data-cmd=upload]`)); },
				success: me.successHpwjdr,  // 成功上传后的回调函数
				accept: 'text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // 限定的上传文件类型
				maxSize: 10485760, // 单个上传文件尺寸最大值 10M
				silent: true // 表示成功时不提示信息
			}); 
		},
		
		refresh: function(){
			me.fetch(); //刷新列表
		},
		
		clearStatus: function() { // 需要重新载入的数据，清除已存在的数据与状态
			/*let els = document.querySelectorAll(`${drFrmSelector} input[name=sfbzid]`); // 收费标准状态需要清除
			for (let i=els.length-1; i>0; i--) {
				$(els[i]).closest('.custom-checkbox').remove(); //清除上次查询的列表
			}*/
			let els = document.querySelectorAll(`${drFrmSelector} input[name=sfxmdm]`); // 收费项目状态需要清除
			for (let i=els.length-1; i>0; i--) {
				$(els[i]).closest('.custom-checkbox').remove(); //清除上次查询的列表
			}
		},
		
		/*del: function(el, e) {
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
		},*/
		
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
			    		if (res.data && res.data.length>0) {
			    			let tmp = $(cntrSelector).find(`${mainTblClz} tbody`);
			    			tmp.children('tr:not(.table-row-no-data)').remove();
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
			    						<td>${res.data[i].dkzje!==null ? res.data[i].dkzje.toFixed(2) : ''}</td>
			    						<td>${CxMisc.formatDate(res.data[i].ykkkrq, 'short')}</td>
			    						<td>${res.data[i].dkcgzje!==null ? res.data[i].dkcgzje.toFixed(2) : ''}</td>
			    						<td>${me.interpretDzzt(res.data[i].dzzt)}</td>
			    						<td>${res.data[i].dzjg?res.data[i].dzjg:''}</td>
			    						<td>${res.data[i].xhzt == '1' ? '已销号' : '未销号'}</td>
			    					    <td class="dl-item-cmd">
			    							<div class="btn-group" role="group" aria-label="操作按纽组">
			    								<button type="button" class="btn btn-outline-primary" data-cmd="open-hpwjdr" title="导入回盘文件"${me.hpwjdrZt(res.data[i].xhzt) ? ' disabled' :''}>导入</button>
			    								<button type="button" class="btn btn-outline-primary" data-cmd="hpwjjy" title="校验回盘文件"${me.hpwjjyZt(res.data[i].xhzt, res.data[i].dzzt) ? ' disabled' :''}>校验</button>
			    								<button type="button" class="btn btn-outline-primary" data-cmd="open-jyjg" title="查看校验结果"${me.jyjgZt(res.data[i].xhzt, res.data[i].dzzt) ? ' disabled' :''}>查看</button>
			                                	<button type="button" class="btn btn-outline-danger" data-cmd="hpwjxh"${me.hpwjxhZt(res.data[i].xhzt, res.data[i].dzzt) ? ' disabled' :''}>销号</button>
			    							</div>
			    						</td>
			    					</tr>`);
			    				tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
			    			}
			    			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			    			tmp.find('td.dl-item-cmd button[data-cmd="open-hpwjdr"]').click(function(){ me.openHpwjdr($(this).closest('tr').data('json')); });
			    			tmp.find('td.dl-item-cmd button[data-cmd=hpwjjy]').click(function(){ me.hpwjjy($(this).closest('tr').data('id')); });
			    			tmp.find('td.dl-item-cmd button[data-cmd=open-jyjg]').click(function(){ me.openHpwjdrJyjg($(this).closest('tr').data('id')); });
			    			tmp.find('td.dl-item-cmd button[data-cmd=hpwjxh]').click(function(e){ me.hpwjxh(this, e); });
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
		hpwjdrZt: function(xhzt) {
			return xhzt =='1';
		},
		hpwjjyZt: function(xhzt) {
			return xhzt =='1';
		},
		jyjgZt: function(xhzt, dzzt) {
			return xhzt =='1' || dzzt != 9;
		},
		hpwjxhZt: function(xhzt, dzzt) {
			return xhzt =='1' || dzzt != 1;
		},
		
		openHpwjdr: function(data) {
			let f = document.querySelector(drFrmSelector);
			f.reset();
			
			f.dkjlid.value = data.dkjlid;
			$(drFrmSelector).find('div.date[data-cx-ctrl=date]').datetimepicker('clear');
			
			$(drModalSelector).modal('show');
		},
		successHpwjdr: function(e, res){
	    	if (res.code == "0") {
	    		CxMsg.info(res.message);
	    		$(drModalSelector).modal('hide');
	    	} else CxMsg.error(res.message);
	    },
	    
	    hpwjjy: function(dkjlid) {
	    	CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/yhdk/dzdkjl'),
			    type: "GET",
			    data: {dkjlid: dkjlid},
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask1).mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info('检验成功');
			    		me.refresh();
			    	} else CxMsg.warn('检验失败, 请稍后重新打开：' + res.message);
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('检验失败：' + msg);
			    },
	            complete: function(xhr, ts) {
	            	$(loadingMask1).mask('hide');
	            }
			});
	    },
	    
	    openHpwjdrJyjg: function(dkjlid) {
	    	CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/yhdk/getdzxx'),
			    type: "GET",
			    data: {dkjlid: dkjlid},
			    beforeSend: function(xhr, cfg) {
			    	$(loadingMask1).mask('show');
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		let tmp = $(`${jyjgModalSelector} ${mainTblClz}-jyjg tbody`);
		    			tmp.children('tr:not(.table-row-no-data)').remove();
		    			if (res.data && res.data.length>0) {
			    			for (let i=0; i<res.data.length; i++) {
			    				let clzYhzh = res.data[i].yhzh != res.data[i].hpyhzh ? ' class="jyjg-mis-match-zh"' : '';
			    				let clzYhzhmc = res.data[i].yhzhmc != res.data[i].hpyhzhmc ? ' class="jyjg-mis-match-mc"' : '';
			    				let clzJe = res.data[i].dkje != res.data[i].hpje ? ' class="jyjg-mis-match-je"' : '';
			    				tmp.append(`<tr>
			    						<td class="td-indexer">
				    						<span>${i+1}</span>
			    						</td>
			    						<td class="overflow-clip-left">${res.data[i].fcmc?CxMisc.escapeHtml(res.data[i].fcmc):'无房产名称'}</td>
			    						<td${clzYhzh}>
			    							<div>${res.data[i].yhzh?CxMisc.escapeHtml(res.data[i].yhzh):'无送盘账号'}</div>
			    							<div>${res.data[i].hpyhzh?CxMisc.escapeHtml(res.data[i].hpyhzh):'无回盘账号'}</div>
			    						</td>
			    						<td${clzYhzhmc}>
			    							<div>${res.data[i].yhzhmc?CxMisc.escapeHtml(res.data[i].yhzhmc):'无送盘名称'}</div>
			    							<div>${res.data[i].hpyhzhmc?CxMisc.escapeHtml(res.data[i].hpyhzhmc):'无回盘名称'}</div>
			    						</td>
			    						<td${clzJe}>
			    							<div>${res.data[i].dkje!==null&&res.data[i].dkje!==undefined?res.data[i].dkje.toFixed(2):'无送盘金额'}</div>
			    							<div>${res.data[i].hpje!==null&&res.data[i].hpje!==undefined?res.data[i].hpje.toFixed(2):'无回盘金额'}</div>
			    						</td>
			    						<td class="td-date">${res.data[i].dzjgsm? res.data[i].dzjgsm : ''}</td>
			    					</tr>`);
			    			}
		    			}
			    		$(jyjgModalSelector).modal('show');
			    	} else CxMsg.warn('获取检验结果失败, 请稍后重新打开：' + res.message);
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('获取检验结果失败：' + msg);
			    },
	            complete: function(xhr, ts) {
	            	$(loadingMask1).mask('hide');
	            }
			});
	    },
	    
		hpwjxh: function(el, e) {
			let id = $(el).closest('tr').data('id');
			CxCtrl.confirm('是否确定对此回盘文件销号？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/sfxt/yhdk/saveDkwjxh'),
		            type: "POST",
		            data: {dkjlid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask1).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('销号成功');
		            		me.fetch(); //刷新列表
		            	} else CxMsg.error('销号失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('销号失败: ' + msg);
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
		}
	}
}
SfDkHpwjxh.bind();