if (typeof window.SfYdWxcz === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfYdWxczCntr';
	const czModalSelector = '#wgSfYdWxczModalDtls';
	const czFrmSelector = '#wgSfYdWxczDtlsFrm';
	
	const mainTblClz = '.table-wgsf-yd-wxcz';
	const idPrefix = 'wgSfYdWxcz';
	const loadingMask1 = '#wgSfYdWxczCntr';
	
	const me = window.SfYdWxcz = {
		bind: function() {
			me.refresh(); 
			
			//$(cntrSelector).find('.toolbar button[data-cmd=open-cz]').click(function(){
			//	me.openCz(this);
			//});
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			
			CxMisc.bindCheckAll(cntrSelector);
			
		},
		
		refresh: function(){
			me.getSyts();
			me.fetch(); //刷新列表
		},
		
		/*clearStatus: function() { // 需要重新载入的数据，清除已存在的数据与状态
			let els = document.querySelectorAll(`${czFrmSelector} input[name=sfxmdm]`); // 收费项目状态需要清除
			for (let i=els.length-1; i>0; i--) {
				$(els[i]).closest('.custom-checkbox').remove(); //清除上次查询的列表
			}
		},*/
		
		fetch: function() {
			CxMisc.resetCheckAll(cntrSelector);
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/wxcz/getBgjl'),
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
			    						<td>${res.data[i].yhmc?res.data[i].yhmc:'系统后台'}</td>
			    						<td>${me.interpretBglx(res.data[i].bglx)}</td>
			    						<td>${CxMisc.formatDate(res.data[i].bgrq, 'short')}</td>
			    						<td>${me.interpretBglxSymbol(res.data[i].bglx)}${res.data[i].bgts!==null?res.data[i].bgts:'-'}</td>
			    					</tr>`);
			    				// tmp.children(':last-child').attr('data-json', JSON.stringify(res.data[i]));
			    			}
			    			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
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
		
		getSyts: function() {
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/wxcz/getSyts'),
			    type: "GET",
			    beforeSend: function(xhr, cfg) {
			    	$(`${cntrSelector} .toolbar .wx-remaining .loading`).show();
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data) {
			    			$(`${cntrSelector} .toolbar .wx-remaining .number`).text(res.data);
			    		}
			    	} else {
			    		CxMsg.error('查询剩余条数失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.error('查询剩余条数失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$(`${cntrSelector} .toolbar .wx-remaining .loading`).hide();
			    }
			});
		},
		
		/*openCz: function(el) {
			let f = document.querySelector(czFrmSelector);
			f.reset();
			
			me.clearStatus();
			$(czModalSelector).modal('show');
		},
		
		submitCz: function(f, d) {
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
			}
			
			if (ok) {
				
			}
		} */
	}
}
SfYdWxcz.bind();