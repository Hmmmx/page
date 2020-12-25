if (typeof window.GzTpTprw === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgGzTpTprwCntr';
	const dtlsModalSelector = '#wgGzTpTprwModalDtls';
	const dtlsFrmSelector = '#wgGzTpTprwDtlsFrm';
	const viewModalSelector = '#wgGzTpTprwViewModal';
	const viewFrmSelector = '#wgGzTpTprwViewFrm';
	
	const mainTblClz = '.table-wggz-tp-tprw';
	const idPrefix = 'wgGzTpTprw';
	const loadingMask1 = '#wgGzTpTprwCntr';
	
	const me = window.GzTpTprw = {
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
				me.openCreate();
			});
			
			$(`${dtlsFrmSelector} input[data-cx-ctrl=fcxx-tree]`).fcxxTree({level:2, ensureSqdm:true});
			CxMisc.formValidated(dtlsFrmSelector, me.submitTprw);
	    	$(dtlsModalSelector).find('div.date[data-cx-ctrl=date-time]').datetimepicker({
		        format: 'YYYY-MM-DD HH:mm',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
	    	
	    	$(dtlsModalSelector).on('show.bs.modal', function (e) { 
	    		let fcxxOb = $(this).find('input[data-cx-ctrl=fcxx-tree]');
	    		if (fcxxOb.length>0 && fcxxOb.nextAll('.cx-fcxx-tree-initialized').length>0) fcxxOb.fcxxTree('clear');
	    		CxMisc.clearValidation(this); 
	    	}); //默认任何modal显示时把上次验证结果去掉
		},
		
		refresh: function(opt) {
			if (opt && opt.reload) me.filter(); // 重新查询包括数量与列表
			else if (me.pager && me.pager.pagination("records")>0) me.goto(me.pager.pagination("page"), me.pager.pagination("pageSize"));
		},
		
		
		del: function(el, e) {
			let id = $(el).closest('tr').data('id');
			CxCtrl.confirm('是否确定删除此投票？', function(src){
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/gzxt/tpgl/deleteTprw'),
		            type: "GET",
		            data: {tprwid: id},
		            beforeSend: function(xhr, cfg) {
		            	$(loadingMask1).mask('show');
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		CxMsg.info('删除投票成功');
		            		me.refresh({reload: true});
		            	} else CxMsg.error('删除投票失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('删除投票失败: ' + msg);
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
				    url: CxMisc.finalizeUrl('/wygl/gzxt/tpgl/getTprwCount'),
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
			    url: CxMisc.finalizeUrl('/wygl/gzxt/tpgl/getTprw'),
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
				tmp.append(`<tr data-id="${data[i].tprwid}">
						<td class="td-indexer">
    						<input type="checkbox" id="${idPrefix}Indexer-${i}" name="${idPrefix}Indexer${i}">
				            <label for="${idPrefix}Indexer-${i}" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
    						<span>${page*pageSize + i+1}</span>
						</td>
						<td class="td-wrap">${data[i].tpmc}</td>
						<td>${data[i].fwmc?data[i].fwmc:''}</td>
						<td>${me.interpretRwlx(data[i].rwlx)}</td>
						<td>${data[i].tpzs?data[i].tpzs:'0'}</td>
						<td>${data[i].ksrq?data[i].ksrq.substring(0, 16):'-'}</td>
						<td>${data[i].jsrq?data[i].jsrq.substring(0, 16):'-'}</td>
						<td>${me.interpretZt(data[i].ksrq, data[i].jsrq, data[i].yxbj)}</td>
						<td><pre class="mb-0 cx-f-1">${data[i].rwsm?data[i].rwsm:''}</pre></td>
						<td class="dl-item-cmd">
							<div class="btn-group" role="group" aria-label="操作按纽组">
								<button type="button" class="btn btn-outline-primary" data-cmd="view">详情</button>
	                        	<button type="button" class="btn btn-outline-danger" data-cmd="del">删除</button>
							</div>
						</td>
					</tr>`);
				tmp.children(':last-child').attr('data-json', JSON.stringify(data[i]));
			}
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			tmp.find('td.dl-item-cmd button[data-cmd="view"]').click(function(){ 
				let data = $(this).closest('tr').data('json');
				me.openView(data);
			});
			tmp.find('td.dl-item-cmd button[data-cmd=del]').click(function(e){ me.del(this, e); });
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		},
		interpretRwlx: function(rwlx) {
			return rwlx=='2' ? '仅业主' : '公众号用户';
		},
		interpretZt: function(ksrq, jsrq, yxbj){
			if (yxbj == '0') return '无效';
			else {
				let now = moment().valueOf();
				if (moment(ksrq, 'YYYY-MM-DD HH:mm:ss').valueOf() > now) return '未开始';
				else if (moment(jsrq, 'YYYY-MM-DD HH:mm:ss').valueOf() < now) return '已结束';
				else return '正在投票';
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
		
		openCreate: function(cmd, data) {
			let f = document.querySelector(dtlsFrmSelector);
			f.reset();
			
			$(dtlsModalSelector).find('div.date[data-cx-ctrl=date-time]').datetimepicker('clear');
			
			let wrap = $(dtlsModalSelector).find('.modal-body .tpwt-wrapper');
			wrap.empty();
			me._appendNewWt();
			
			$(dtlsModalSelector).modal('show');
		},
		_appendNewWt: function(){
			let wrap = $(dtlsModalSelector).find('.modal-body>.tpwt-wrapper');
			wrap.append(`<div class="card mt-3">
					<div class="card-header d-flex-between px-3 py-1">
						<span><i class="fas fa-question-circle text-primary mr-1"></i><span class="tpwt-title">投票问题</span></span>
						<span>
						<button type="button" class="btn btn-outline-primary btn-sm rounded-circle cx-btn" style="width:2em;height:2em;align-items: center;" data-cmd="plus"><i class="fas fa-plus"></i></button>
						<button type="button" class="btn btn-outline-primary btn-sm rounded-circle cx-btn" style="width:2em;height:2em;align-items: center;" data-cmd="minus"><i class="fas fa-minus"></i></button>
						</span>
					</div>
					<div class="card-body px-4 py-3 tprw-wt">
						<div class="form-group row">
							<label class="col-md-2 col-form-label required">标题</label>
		                    <div class="col-md-8">
		                        <input type="text" class="form-control" name="wt" maxlength="80" placeholder="问题标题" required>
		                        <div class="invalid-tooltip">请输入不超过80个字符的问题标题</div>
		                    </div>
						</div>
						<div class="form-group row">
							<label class="col-md-2 col-form-label required">选择方式</label>
		                    <div class="col-md-8">
		                        <select class="custom-select" name="dxbj" required>
		                        	<option value="0" selected>单选</option>
		                        	<option value="1">多选</option>
								</select>
		                    </div>
						</div>
						<div class="form-group row">
							<label class="col-md-2 col-form-label required">选项1</label>
		                    <div class="col-md-8">
		                        <input type="text" class="form-control" name="xx" maxlength="80" placeholder="问题选项描述" required>
		                        <div class="invalid-tooltip">请输入不超过80个字符的问题选项描述</div>
		                    </div>
		                </div>
						<div class="form-group row">
		                    <label class="col-md-2 col-form-label required">选项2</label>
		                    <div class="col-md-8">
		                        <input type="text" class="form-control" name="xx" maxlength="80" placeholder="问题选项描述" required>
		                        <div class="invalid-tooltip">请输入不超过80个字符的问题选项描述</div>
		                    </div>
		                </div>
					</div>
				</div>`);
			
			wrap.find('.card:last-child .card-header button').click(function(){
				if ($(this).data('cmd') == 'plus') {
					me._appendNewWt();
					let p = wrap.parent();
					p.animate({scrollTop:p[0].scrollHeight});
				} else {
					me._removeWt(this);
				}
			});
			me._appendNewXx(wrap.find('.card:last-child .card-body'));
			
			me._assignWtTitle(wrap);
		},
		_removeWt: function(el){
			let wrap = $(dtlsModalSelector).find('.modal-body .tpwt-wrapper');
			if (wrap.children().length > 1) {
				$(el).closest('.card').slideUp(function(){
					$(this).remove();
					me._assignWtTitle(wrap);
				});
			} else CxMsg.info('不能删除最后一个问题');
		},
		_assignWtTitle: function(wrap){
			let n = 1;
			wrap.find('.card-header .tpwt-title').each(function(){
				this.innerText = '投票问题' + n++;
			});
		},
		_appendNewXx: function(xxWrap) {
			xxWrap.append(`<div class="form-group row tpwt-xx" style="display:none;">
		                    <label class="col-md-2 col-form-label required">选项</label>
		                    <div class="col-md-8">
		                        <input type="text" class="form-control" name="xx" maxlength="80" placeholder="问题选项描述" required>
		                        <div class="invalid-tooltip">请输入不超过80个字符的问题选项描述</div>
		                    </div>
		                    <div class="col-md-2 d-flex-center">
		                    	<button type="button" class="btn btn-outline-primary btn-sm rounded-circle cx-btn mr-1" style="width:2em;height:2em;align-items: center;" data-cmd="plus"><i class="fas fa-plus"></i></button>
		                    	<button type="button" class="btn btn-outline-primary btn-sm rounded-circle cx-btn" style="width:2em;height:2em;align-items: center;" data-cmd="minus"><i class="fas fa-minus"></i></button>
		                    </div>
						</div>`);
			xxWrap.find('.form-group:last-child button').click(function(){
				if ($(this).data('cmd') == 'plus') {
					me._appendNewXx($(this).closest('.card-body'));
				} else {
					me._removeXx(this);
				}
			});
			me._assignXxTitle(xxWrap);
			xxWrap.find('.form-group:last-child').slideDown();
		},
		_removeXx: function(el) {
			let xxWrap = $(el).closest('.card-body');
			$(el).closest('.form-group').slideUp(function(){
				$(this).remove();
				me._assignXxTitle(xxWrap);
			});
		},
		_assignXxTitle: function(wrap){
			let n = 3;
			wrap.find('.form-group').each(function(){
				if ($(this).hasClass('tpwt-xx')) this.querySelector('label').innerText = '选项' + n++;
			});
		},
		
		openView: function(data){
			CxMisc.ajax({
	            url: CxMisc.finalizeUrl('/wygl/gzxt/tpgl/getTpjg'),
	            type: "GET",
	            data: {tprwid: data.tprwid},
	            beforeSend: function(xhr, cfg) {
	            	$(loadingMask1).mask('show');
	            },
	            success: function(res, ts) {
	            	if (res.code == "0") {
	            		let f = document.querySelector(viewFrmSelector);
	        			
	        			f.querySelector('[data-data=tpmc]').innerText = data.tpmc;
	        			f.querySelector('[data-data=fwmc]').innerText = data.fwmc?data.fwmc:'-';
	        			f.querySelector('[data-data=rwlx]').innerText = me.interpretRwlx(data.rwlx);
	        			f.querySelector('[data-data=ksrq]').innerText = data.ksrq?data.ksrq.substring(0, 16):'-';
	        			f.querySelector('[data-data=jsrq]').innerText = data.jsrq?data.jsrq.substring(0, 16):'-';
	        			f.querySelector('[data-data=yxbj]').innerText = me.interpretZt(data.ksrq, data.jsrq, data.yxbj);
	        			f.querySelector('[data-data=tpzs]').innerText = data.tpzs?data.tpzs:'0';
	        			f.querySelector('[data-data=rwsm]').innerText = data.rwsm?data.rwsm:'-';
	        			
	        			me._appendViewWt(res.data);
	        			$(viewModalSelector).modal('show');
	            	} else CxMsg.error('查询投票信息失败: ' + res.message);
	            },
	            error: function(xhr, ts, err) {
	            	var msg = "[" + xhr.status + " : " + ts + "]";
	            	CxMsg.error('查询投票信息失败: ' + msg);
	            },
	            complete: function(xhr, ts) {
	            	$(loadingMask1).mask('hide');
	            }
	        });
		},
		_appendViewWt: function(data){
			let wrap = $(viewModalSelector).find('.modal-body>.tpwt-wrapper');
			wrap.empty();
			let tpwtids = {}, tpwts=[];
			for (let i=0; i<data.length; i++) {
				if (data[i].tpwtid && !tpwtids[data[i].tpwtid]) {
					tpwtids[data[i].tpwtid] = {maxPs: 0, xxs: []};
					tpwts.push({tpwtid: data[i].tpwtid, wt: data[i].wt, plxh: data[i].plxh, dxbj: data[i].dxbj});
				}
				if (data[i].ps && tpwtids[data[i].tpwtid].maxPs < data[i].ps) tpwtids[data[i].tpwtid].maxPs = data[i].ps;
				tpwtids[data[i].tpwtid].xxs.push({ps:data[i].ps, xx: data[i].xx});
			}
			
			for (let i=0; i<tpwts.length; i++) {
				let wtxx = [];
				for (let j=0; j<tpwtids[tpwts[i].tpwtid].xxs.length; j++) {
					let ps = tpwtids[tpwts[i].tpwtid].xxs[j].ps?tpwtids[tpwts[i].tpwtid].xxs[j].ps:0,
						percent = tpwtids[tpwts[i].tpwtid].maxPs&&ps?Math.floor(100*ps/tpwtids[tpwts[i].tpwtid].maxPs):0;
					wtxx.push(`<div class="mb-1${j>0?' mt-3':''}">${tpwtids[tpwts[i].tpwtid].xxs[j].xx}</div>
							<div class="progress" style="border-radius:1em;">
								<div class="progress-bar bg-success text-right pr-2 d-i-flex-end" style="flex-direction:row;min-width:1.5rem;width: ${percent}%;" role="progressbar">${ps}</div>
							</div>`);
				}
				wrap.append(`<div class="card mt-3">
					<div class="card-header px-3 py-1">
						<span><i class="fas fa-question-circle text-primary mr-1"></i><span class="tpwt-title">问题${i+1}[${tpwts[i].dxbj=='1'?'多选':'单选'}]：${tpwts[i].wt}</span></span>
					</div>
					<div class="card-body px-4 py-3 tprw-wt">
						${wtxx.join('')}
					</div>
				</div>`);
			}
		},
	    
	    submitTprw: function(f){
	    	if (f.ksrq.value > f.jsrq.value) {
	    		CxMsg.info('开始日期不能大于结束日期');
	    		return;
	    	}
	    	
	    	let data = {}, frm = $(f);
	    	data.tpmc = f.tpmc.value;
	    	let fcxxValue = $(`${dtlsFrmSelector} input[data-cx-ctrl=fcxx-tree]`).fcxxTree('value');
	    	data.sqdm = fcxxValue.sqdm;
	    	if (fcxxValue.fcid) {
	    		data.fwlx = '4';
	    		data.fwid = fcxxValue.fcid;
	    	} else if (fcxxValue.dyid) {
	    		data.fwlx = '3';
	    		data.fwid = fcxxValue.dyid;
	    	} else if (fcxxValue.lyid) {
	    		data.fwlx = '2';
	    		data.fwid = fcxxValue.lyid;
	    	} else if (fcxxValue.qyid) {
	    		data.fwlx = '1';
	    		data.fwid = fcxxValue.qyid;
	    	} else {
	    		data.fwlx = '0';
	    		data.fwid = fcxxValue.sqdm;
	    	}
	    	data.fwmc = f.fwmc.value;
	    	data.rwlx = f.rwlx.value;
	    	data.ksrq = f.ksrq.value + ":00";
	    	data.jsrq = f.jsrq.value + ":00";
	    	data.yxbj = '1';
	    	if (f.rwsm.value) data.rwsm = f.rwsm.value;
	    	
	    	data.tpwtList = [];
	    	let tpwtList = f.querySelectorAll('.tpwt-wrapper>.card');
	    	for (let i=0; i<tpwtList.length; i++) {
	    		let tpwt = {};
	    		tpwt.wt = tpwtList[i].querySelector('input[name=wt]').value;
	    		tpwt.dxbj = tpwtList[i].querySelector('select[name=dxbj]').value;
	    		tpwt.plxh = i;
	    		tpwt.tpwtxxList = [];
	    		let tpwtxxList = tpwtList[i].querySelectorAll('input[name=xx]');
	    		for (let j=0; j<tpwtxxList.length; j++) {
	    			tpwt.tpwtxxList.push({xx:tpwtxxList[j].value, plxh:j});
	    		}
	    		data.tpwtList.push(tpwt);
	    	}
	    	
	    	CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/gzxt/tpgl/addTprw'),
			    type: "POST",
			    contentType: 'application/json;charset=utf-8',
			    data: JSON.stringify(data),
			    beforeSend: function(xhr, cfg) {
			    	CxMisc.markAjaxStart(frm.find('button[type=submit]'));
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxMsg.info('添加投票成功');
			    		me.refresh({reload: true});
			    		frm.closest('.modal').modal('hide');
			    	} else {
			    		CxMsg.warn('添加投票失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('添加投票失败：' + msg);
			    },
	            complete: function(xhr, ts) {
	            	CxMisc.markAjaxEnd(frm.find('button[type=submit]'));
	            }
			});
	    }
	}
}
GzTpTprw.bind();