if (typeof window.KfSbxcXcmx === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgKfSbxcXcmxCntr';
	
	const mainTblClz = '.table-wgkf-sbxc-xcmx';
	const filterFrmSelector = '#wgKfSbxcXcmxCntr .filterbar>form[data-type=filter]';
	
	
	const loadingMask1 = '#wgKfSbxcXcmxCntr';
	
	const me = window.KfSbxcXcmx = {
		pager: null,
		filterData: null,
			
		bind: function() {
			me.getSqList(); 
			
			CxMisc.enableRefresh(cntrSelector, me.refresh);
			CxMisc.enableFullpage(cntrSelector);
			CxMisc.indicateFilter(cntrSelector, {expanded: true});
			
			$(`${cntrSelector} .filterbar select[name=sqdm]`).change(function(){ me.getSqbmhyList(this); });
			
			CxMisc.formValidated(filterFrmSelector, me.filter);
			
			$(`${cntrSelector} div.date[data-cx-ctrl=date-time]`).datetimepicker({
				format: 'YYYY-MM-DD HH:mm',
			    date: null // 必须设置为空，否则会自动选择当天日期
			});
		},
		
		refresh: function() {
			if (me.pager && me.pager.pagination("records")>0) me.goto(me.pager.pagination("page"), me.pager.pagination("pageSize"));
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
		            		if (res.data && res.data.length>0) {
		            			for (let i=0; i<res.data.length; i++) {
		            				el.options.add(new Option(res.data[i].sqmc, res.data[i].sqdm));
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
		
		getSqbmhyList: function(el) {
			let hyid = el.form.hyid;
			hyid.selectedIndex = 0;
			for (let i=hyid.options.length-1; i>0; i--) hyid.remove(i);
			$(hyid).trigger('change').children('optgroup').remove();
			
			if (el.getAttribute('data-loaded') == 'true' && el.value) {
				CxMisc.ajax({
		            url: CxMisc.finalizeUrl('/wygl/kfxt/bmgl/getSqbmhy'),
		            type: "GET",
		            data: {sqdm: el.value},
		            beforeSend: function(xhr, cfg) {
		            	el.disabled = true;
		            },
		            success: function(res, ts) {
		            	if (res.code == "0") {
		            		if (res.data && res.data.length>0) {
		            			let sqbms = {};
		            			for (let i=0; i<res.data.length; i++) {
		            				if (res.data[i].sqbmid && !sqbms[res.data[i].sqbmid]) sqbms[res.data[i].sqbmid] = [];
		            				sqbms[res.data[i].sqbmid].push(res.data[i]);
		            			}
		            			for (let sqbm in sqbms) {
		            				let optGrp = document.createElement('optgroup');
		            				optGrp.label = sqbms[sqbm][0].sqbmmc;
		            				for (let j=0; j<sqbms[sqbm].length; j++) {
		            					optGrp.appendChild(new Option(`${sqbms[sqbm][j].wyhymc?sqbms[sqbm][j].wyhymc:sqbms[sqbm][j].wyhydm}`, sqbms[sqbm][j].wyhyid));
		            				}
		            				hyid.appendChild(optGrp);
		            			}
		            		}
		            	} else CxMsg.info('获取社区职员列表失败: ' + res.message);
		            },
		            error: function(xhr, ts, err) {
		            	var msg = "[" + xhr.status + " : " + ts + "]";
		            	CxMsg.error('获取社区职员列表失败: ' + msg);
		            },
		            complete: function(xhr, ts) {
		            	el.disabled = false;
		            }
		        });
			}
		},
		
		
		filter: function(f) {
			let data = $(f).serializeJson({removeBlankField:true}); // 每次查询后都缓存查询条件，给分页调用
			me.filterData = data;
			if (me.filterData.xcrqq) me.filterData.xcrqq += ":00";
			if (me.filterData.xcrqz) me.filterData.xcrqz += ":00";
			if (me.filterData.xcrqq && me.filterData.xcrqz && me.filterData.xcrqq>me.filterData.xcrqz) {
				CxMsg.info('巡查时间的开始时间不能大于结束时间');
				return;
			}
			
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/kfxt/sbxc/getXcmxCount'),
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
			    url: CxMisc.finalizeUrl('/wygl/kfxt/sbxc/getXcmx'),
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
				tmp.append(`<tr data-id="${item.sbxcmxid}">
							<td class="td-indexer">
	    						<span>${page*pageSize + i+1}</span>
							</td>
							<td class="td-wrap">${CxMisc.escapeHtml(item.xcsbbt)}</td>
							<td>${item.wyhymc?item.wyhymc:item.wyhydm}</td>
							<td>${item.xcsj}</td>
							<td>${me.interpretZtbj(item.ztbj)}</td>
							<td><pre class="mb-0 cx-f-1">${item.xcsm?item.xcsm:''}</pre></td>
							<td></td>
						</tr>`);
				let imgs = [];
				if (item.xctpdz1) imgs.push(item.xctpdz1);
				if (item.xctpdz2) imgs.push(item.xctpdz2);
				if (item.xctpdz3) imgs.push(item.xctpdz3);
				if (item.xctpdz4) imgs.push(item.xctpdz4);
				if (imgs.length > 0) {
					tmp.children(':last-child').children('td:last-child').append('<div class="d-flex-center thumbnail-wrapper"></div>');
					let thumbWrap = tmp.children(':last-child').find('td .thumbnail-wrapper');
					for (let j=0; j<imgs.length; j++) {
						thumbWrap.append(`<div class="col-12 d-i-flex-center thumbnail-group thumbnail-group-auto">
					                    <div style="height:80px;"><img class="c-pointer" src="${CxMisc.finalizeUrl(imgs[j])}" onload="KfSbxcXcmx.adjustImgSize(this)" style="max-width: none; max-height: 100%;"></div>
					                </div>`);
					}
				}
			}
			tmp.find('.thumbnail-group').find('img').click(function(){
				CxMisc.popImg(this);
			});
			tmp.children('tr.table-row-no-data').appendTo(tmp); // 把空白提示行移动未尾
			// 根据当前页码，计算出序号位数，并调整序号列的宽度 
			let len = (page*pageSize + '').length;
			if (len > 4) { // 位数太大，调整列头宽度，防止序号显示不完全
				$(`${cntrSelector} ${mainTblClz} thead th.td-indexer`).css('width', (3 + Math.ceil((len-4)/2))+'rem'); // 3 + Math.ceil((len-4)/2) rem
			}
		},
		interpretZtbj: function(dm){
			switch(dm){
			case '0': return '不正常';
			case '1': return '正常';
			}
			return '';
		},
		
		adjustImgSize: function(img) { //计算图片与容器的尺寸合图片显示最大化
			let m=$(img).closest('.thumbnail-wrapper'), imgCount = m.find('.thumbnail-group').length;
			m.find('.thumbnail-group').removeClass('col-12 col-6 col-4 col-3').addClass(`col-${12/imgCount}`).find('img').each(function(){
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

KfSbxcXcmx.bind();