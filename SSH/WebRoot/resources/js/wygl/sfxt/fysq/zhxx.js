if (typeof window.SfScKhfysqZhxx === 'undefined') {
	const zhxxWrap = '#wgSfScKhfysq_zhxx';
	
	const me = window.SfScKhfysqZhxx = {
			fetchZhxx: function(node){
				let fcid = node.data.id;
				me.getFcxx(fcid);
				me.getKhxx(fcid);
				me.getKhck(fcid);
				me.getFyhd(fcid);
				me.getKhyb(fcid);
				me.getKhybcb(fcid);
			},
			getFcxx: function(fcid) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/getInfo'),
				    type: "GET",
				    data: {id: fcid, type: 'fc'},
				    beforeSend: function(xhr, cfg) {
				    	$(`${zhxxWrap} .zhxx-fcxx`).mask('show');
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
					    	let wrap = $(`${zhxxWrap} .zhxx-fcxx`);
					    	wrap.find('.zhxx-fcxx-fcmc').text(res.data.fcmc);
					    	wrap.find('.zhxx-fcxx-jzmj').html(res.data.jzmj?(res.data.jzmj.toFixed(2)+'<span style="margin-left:2px">m&sup2;</span>'):'-');
					    	wrap.find('.zhxx-fcxx-bz').text(res.data.bz?res.data.bz:'(无)');
				    	} else CxMsg.error('查询房产信息失败：' + res.message);
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('查询房产信息失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	$(`${zhxxWrap} .zhxx-fcxx`).mask('hide');
				    }
				});
			},
			getKhxx: function(fcid) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhxxList'),
				    type: "GET",
				    data: {fcid},
				    beforeSend: function(xhr, cfg) {
				    	$(`${zhxxWrap} .zhxx-khxx`).mask('show');
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
					    	let wrap = $(`${zhxxWrap} .zhxx-khxx tbody`);
					    	wrap.find('tr:not(.table-row-no-data)').remove();
					    	if (res.data && res.data.length>0) {
					    		for (let i=0; i<res.data.length; i++) {
					    			let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
					    			wrap.append(`<tr data-id="${item.khid}">
				    						<td class="td-indexer">
					    						<span>${i+1}</span>
				    						</td>
				    						<td${khmcTitle}>${khmc}</td>
				    						<td data-cmd="khlxdm" data-value="${item.khlxdm}">${item.khlxmc}</td>
				    						<td>${item.xbdm !== null? (item.xbdm==1?'男':'女') : '未填写'}</td>
				    						<td>${item.lxdh ? item.lxdh : ''}</td>
				    						<td>${item.sjhm ? item.sjhm : ''}</td>
				    						<td>${item.dkbj == '0' ? '否' : '是'}</td>
				    						<td>${item.yxbj == '0' ? '无效' : '有效'}</td>
				    					</tr>`);
				    			}
					    		wrap.children('tr.table-row-no-data').appendTo(wrap); // 把空白提示行移动未尾
					    	}
				    	} else CxMsg.error('查询客户信息失败：' + res.message);
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('查询客户信息失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	$(`${zhxxWrap} .zhxx-khxx`).mask('hide');
				    }
				});
			},
			getKhck: function(fcid) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/cwkhck/getKhck'),
				    type: "GET",
				    data: {fcid},
				    beforeSend: function(xhr, cfg) {
				    	$(`${zhxxWrap} .zhxx-khck`).mask('show');
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
					    	let wrap = $(`${zhxxWrap} .zhxx-khck tbody`);
					    	wrap.find('tr:not(.table-row-no-data)').remove();
					    	if (res.data && res.data.length>0) {
					    		for (let i=0; i<res.data.length; i++) {
					    			let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
					    			wrap.append(`<tr data-id="${item.khckid}">
				    						<td class="td-indexer">
					    						<span>${i+1}</span>
				    						</td>
				    						<<td${khmcTitle}>${khmc}</td>
				    						<td>${item.cphm?item.cphm:''}</td>
				    						<td>${item.cwhm?item.cwhm:''}</td>
				    						<td title="${item.sfbzmc? item.sfbzmc : ''}">${item.sfbzmc? item.sfbzmc : ''}</td>
				    						<td>${item.ckh ? item.ckh : ''}</td>
				    						<td>${item.cklxmc ? item.cklxmc : ''}</td>
				    						<td>${item.jsrq ? CxMisc.formatDate(item.jsrq, 'short') : ''}</td>
				    						<td>${item.ztbj == '9' ? '作废' : '有效'}</td>
				    					</tr>`);
				    			}
					    		wrap.children('tr.table-row-no-data').appendTo(wrap); // 把空白提示行移动未尾
					    	}
				    	} else CxMsg.error('查询客户车卡信息失败：' + res.message);
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('查询客户车卡信息失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	$(`${zhxxWrap} .zhxx-khck`).mask('hide');
				    }
				});
			},
			getFyhd: function(fcid) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getHdxxList'),
				    type: "GET",
				    data: {fcid},
				    beforeSend: function(xhr, cfg) {
				    	$(`${zhxxWrap} .zhxx-fyhd`).mask('show');
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
					    	let wrap = $(`${zhxxWrap} .zhxx-fyhd tbody`);
					    	wrap.find('tr:not(.table-row-no-data)').remove();
					    	if (res.data && res.data.length>0) {
					    		for (let i=0; i<res.data.length; i++) {
					    			let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
					    			wrap.append(`<tr data-id="${item.hdid}">
					    						<td class="td-indexer">
					    						<span>${i+1}</span>
				    						</td>
				    						<td${khmcTitle}>${khmc}</td>
				    						<td>${CxMisc.escapeHtml(item.fylxmc)}</td>
				    						<td>${CxMisc.escapeHtml(item.sfxmmc)}</td>
				    						<td title="${CxMisc.escapeHtml(item.sfbzmc)}">${CxMisc.escapeHtml(item.sfbzmc)}</td>
				    						<td>${item.yxrqq ? CxMisc.formatDate(item.yxrqq, 'short') : ''}</td>
				    						<td>${item.yxrqz ? CxMisc.formatDate(item.yxrqz, 'short') : ''}</td>
				    					</tr>`);
				    			}
					    		wrap.children('tr.table-row-no-data').appendTo(wrap); // 把空白提示行移动未尾
					    	}
				    	} else CxMsg.error('查询核定信息失败：' + res.message);
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('查询核定信息失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	$(`${zhxxWrap} .zhxx-fyhd`).mask('hide');
				    }
				});
			},
			getKhyb: function(fcid) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/cbgl/khyb/getKhybList'),
				    type: "GET",
				    data: {fcid},
				    beforeSend: function(xhr, cfg) {
				    	$(`${zhxxWrap} .zhxx-khyb`).mask('show');
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
					    	let wrap = $(`${zhxxWrap} .zhxx-khyb tbody`);
					    	wrap.find('tr:not(.table-row-no-data)').remove();
					    	if (res.data && res.data.length>0) {
					    		for (let i=0; i<res.data.length; i++) {
					    			let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
					    			wrap.append(`<tr data-id="${item.khybid}">
			    						<td class="td-indexer">
				    						<span>${i+1}</span>
			    						</td>
			    						<td${khmcTitle}>${khmc}</td>
			    						<td>${CxMisc.escapeHtml(item.ybbh)}</td>
			    						<td>${item.yblxmc}</td>
			    						<td title="${CxMisc.escapeHtml(item.sfbzmc)}">${CxMisc.escapeHtml(item.sfbzmc)}</td>
			    						<td>${item.ksrq ? CxMisc.formatDate(item.ksrq, 'short') : ''}</td>
			    						<td>${item.jsrq ? CxMisc.formatDate(item.jsrq, 'short') : ''}</td>
			    						<td>${item.yxbj == '0' ? '无效' : '有效'}</td>
			    					</tr>`);
				    			}
					    		wrap.children('tr.table-row-no-data').appendTo(wrap); // 把空白提示行移动未尾
					    	}
				    	} else CxMsg.error('查询仪表信息失败：' + res.message);
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('查询仪表信息失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	$(`${zhxxWrap} .zhxx-khyb`).mask('hide');
				    }
				});
			},
			getKhybcb: function(fcid) {
				CxMisc.ajax({
				    url: CxMisc.finalizeUrl('/wygl/sfxt/cbgl/khyb/getFckhybmxList'),
				    type: "GET",
				    data: {fcid},
				    beforeSend: function(xhr, cfg) {
				    	$(`${zhxxWrap} .zhxx-khybcb`).mask('show');
				    },
				    success: function(res, ts) {
				    	if (res.code == "0") {
					    	let wrap = $(`${zhxxWrap} .zhxx-khybcb tbody`);
					    	wrap.find('tr:not(.table-row-no-data)').remove();
					    	if (res.data && res.data.length>0) {
					    		for (let i=0; i<res.data.length; i++) {
					    			let item = res.data[i], khmc = CxMisc.escapeHtml(item.khmc), khmcTitle=item.khmc&&item.khmc.length>7?` title="${khmc}"`:'';
					    			wrap.append(`<tr data-id="${item.khybcbid}">
			    						<td class="td-indexer">
				    						<span>${i+1}</span>
			    						</td>
			    						<td${khmcTitle}>${khmc}</td>
			    						<td>${item.yblxmc}</td>
			    						<td>${item.ghbj=='1'?'是':'否'}</td>
			    						<td>${item.jbyl!==null&&item.jbyl!==undefined?item.jbyl:'0'}</td>
			    						<td>${item.sqcbrq?item.sqcbrq:''}</td>
			    						<td>${item.bqcbrq?item.bqcbrq:''}</td>
										<td>${item.sqds!==null&&item.sqds!==undefined?item.sqds:'0'}</td>
			    						<td>${item.bqds!==null&&item.bqds!==undefined?item.bqds:''}</td>
			    						<td>${item.bqyl!==null&&item.bqyl!==undefined?item.bqyl:''}</td>
			    						<td><pre class="mb-0 cx-f-1">${item.bz?item.bz:''}</pre></td>
			    					</tr>`);
				    			}
					    		wrap.children('tr.table-row-no-data').appendTo(wrap); // 把空白提示行移动未尾
					    	}
				    	} else CxMsg.error('查询抄表信息失败：' + res.message);
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxMsg.error('查询抄表信息失败：' + msg);
				    },
				    complete: function(xhr, ts) {
				    	$(`${zhxxWrap} .zhxx-khybcb`).mask('hide');
				    }
				});
			},
			
			p_getFcxx: function(fcid) {
				return new Promise(function(resolve, reject) {
					CxMisc.ajax({
					    url: CxMisc.finalizeUrl('/wygl/sfxt/fcgl/fcxx/getInfo'),
					    type: "GET",
					    data: {id: fcid, type: 'fc'},
					    success: function(res, ts) {
					    	if (res.code == "0") {
					    		resolve(res.data);
					    	} else {
					    		CxMsg.error('查询房产信息失败：' + res.message);
					    		resolve();
					    	}
					    },
					    error: function(xhr, ts, err) {
					    	var msg = "[" + xhr.status + " : " + ts + "]";
					    	CxMsg.error('查询房产信息失败：' + msg);
					    	resolve();
					    }
					});
				});
			},
	};
}
