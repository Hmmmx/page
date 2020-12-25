let gSelectedPrdList = {},
	gPromotions = null,
	gSplbList = null,
	gMember = false,
	gDdpzPager = null;

// main page
function adjustContentHeight() {
	let hh = Math.ceil($('#mainPage .cx-home .cx-header').outerHeight());
	$('#mainPage .cx-home .cx-content').css('height', `calc(100vh - ${hh}px - 50px)`);
}

function bindProductAction(index, el) {
	if ($(el).closest('.cx-item-selected').length == 0) {
		$(el).find('.cx-action .cx-action-caret button').click(function(){
			selectPrd(this);
		});
		$(el).find('.cx-action .cx-action-more button').click(function(){
			selectPrd(this);
		});
	} else {
		$(el).find('.cx-action .cx-action-more button').click(function(){
			if ($(this).data('cmd') == 'increase') {
				selectPrd(this);
			} else {
				let qtyObj=$(this).parent().find('.cx-item-qty'),
					oldQty=parseInt(qtyObj.text());
				if (oldQty == 1) {
					let self = this, name=$(this).closest('.cx-info').find('.cx-name').html(), subName=$(this).closest('.cx-info').find('.cx-sub-name').html(),
						names = (!subName || subName == "") ? name : (name + " - " + subName);
					CxCtrl.confirm(`确定删除此服务？<p class="text-info">${names}</p>`, function(src){
						$(self).closest('.cx-item').remove();
						selectPrd(self);
						self = null;
					});
				} else {
					selectPrd(this);
				}
			}
		});
	}
}

function clearCart() {
	if (Object.keys(gSelectedPrdList).length > 0) {
		CxCtrl.confirm('是否确定清空购物车？', function(){
			doClearCart();
		});
	}
}

function doClearCart() {
	gSelectedPrdList = {};
	
	$('#mainPage .cx-item-selected .cx-items').empty().append(gNoData);
	
	$('#mainPage .cx-action-bar button[data-cmd=cart] .cx-badge').remove();
	$('#prdTypeList a .cx-badge').remove();
	$('#mainPage .cx-item-selected .cx-sub-action-bar .cx-price').text(0);
	$('#mainPage .cx-item-selected .cx-sub-action-bar .cx-remark').text('共 0 件');
	
	$('#prdList .cx-item .cx-action').each(function(){
		$(this).find('.cx-action-more').css({'display':''}).find('.cx-item-qty').text(0);
		$(this).find('.cx-action-caret').css({'display':''});
	});
}

function getPrdById(prdId) {
	if (gSplbList) {
		for (let i=0; i<gSplbList.length; i++) {
			let splb = gSplbList[i];
			if (splb.spxx && splb.spxx.length>0) {
				for (let j=0; j<splb.spxx.length; j++) {
					if (splb.spxx[j].spid == prdId) return splb.spxx[j];
				}
			}
		}
	}
	return null;
}

function getTypeIdByPrdId(prdId) {
	if (gSplbList) {
		for (let i=0; i<gSplbList.length; i++) {
			let splb = gSplbList[i];
			if (splb.spxx && splb.spxx.length>0) {
				for (let j=0; j<splb.spxx.length; j++) {
					if (splb.spxx[j].spid == prdId) return splb.splbid;
				}
			}
		}
	}
	return null;
}

function interpretZfbj(zfbj) {
	switch(zfbj) {
		case '0': return '未支付';
		case '1': return '已支付';
		case '2': return '已退款';
		default: return '未知';
	}
}

function interpretZflx(zflx) {
	switch(zflx) {
		case '1': return '定金';
		case '2': return '尾款';
		case '3': return '全款';
		default: return '未知';
	}
}

function redefineScrollSpyAction() {
	$('#prdList').on('activate.bs.scrollspy', function (e, o) {
		let o1=$('.cx-service-type a[href="'+o.relatedTarget+'"]'), o0=o1.parent();
		let t=o1.position().top, h=o0.outerHeight();
		if (t<0 || t>=h-10) o1[0].scrollIntoView(false);
	});
	$('#prdTypeList a').click(function(e){
		this.blur();
		e.preventDefault();
		let t=$($(this).attr('href')), c=$('#prdList');
		c.animate({
			scrollTop: t.offset().top - c.offset().top + c.scrollTop()
		}, 200);
	});
}

function refreshSelectedPrd4Page(prdId) {
	let typeId=getTypeIdByPrdId(prdId), type=$(`#prdTypeList a[data-type-id="${typeId}"]`),
		cart=type.closest('.cx-page').find('.cx-action-bar button[data-cmd=cart]'),
		sum=type.closest('.cx-page').find('.cx-sub-action-bar .sum .cx-price'),
		prom=type.closest('.cx-page').find('.cx-sub-action-bar .promotion .cx-price'),
		// remark=type.closest('.cx-page').find('.cx-sub-action-bar .cx-remark'),
		
		items=$(`#mainPage .cx-item[data-prd-id="${prdId}"]`);
	
	for (let i=0; i<items.length; i++) {
		if (gSelectedPrdList[prdId]) {
			$(items[i]).find('.cx-action-more').css({'display':'flex'}).find('.cx-item-qty').text(gSelectedPrdList[prdId].qty);
			$(items[i]).find('.cx-action-caret').css({'display':'none'});
		} else {
			$(items[i]).find('.cx-action-more').css({'display':''}).find('.cx-item-qty').text(0);
			$(items[i]).find('.cx-action-caret').css({'display':''});
		}
	}

	let prdIds = Object.keys(gSelectedPrdList), typePrdCount=0, cartCount=0, total=0;
	for (let i=0; i<prdIds.length; i++) {
		if (gSelectedPrdList[prdIds[i]].typeId == typeId) {
			typePrdCount += gSelectedPrdList[prdIds[i]].qty;
		}
		let prdQty = gSelectedPrdList[prdIds[i]].qty, prd=getPrdById(prdIds[i]);
		cartCount += prdQty;
		total += (gMember?prd.hyje:prd.spje) * prdQty;
	}
	
	if (typePrdCount == 0) {
		type.children('.cx-badge').remove();
	} else {
		if (type.children('.cx-badge').length == 0) type.append(`<span class="cx-badge">${typePrdCount}</span>`);
		else type.children('.cx-badge').text(typePrdCount);
	}
	
	if (cartCount == 0) {
		cart.children('.cx-badge').remove();
		sum.text(0);
		prom.text(0).closest('.promotion').css('display', 'none');
		// remark.text(`共 ${cartCount} 件`);
		$('#mainPage .cx-item-selected .cx-items').empty().append(gNoData);
	} else {
		if (gPromotions) {
			let tmp = total, ded = 0;
			total = eval(gPromotions[0].rule.replace(/SUM/g, total));
			ded = tmp - total;
			sum.text(total.toFixed(2));
			prom.text(ded.toFixed(2)).closest('.promotion').css('display', '');
		} else {
			sum.text(total);
			prom.text(0).closest('.promotion').css('display', 'none');
		}
		// remark.text(`共 ${cartCount} 件`);
		if (cart.children('.cx-badge').length == 0) cart.append(`<span class="cx-badge">${cartCount}</span>`);
		else cart.children('.cx-badge').text(cartCount);
	}
}

function selectPrd(el) {
	let target=$(el), cmd=target.data('cmd'), item=target.closest('.cx-item'), 
		prdId=item.data('prd-id'), typeId=getTypeIdByPrdId(prdId);
	
	if (cmd == 'increase') {
		if (!gSelectedPrdList[prdId]) gSelectedPrdList[prdId] = {qty: 0, typeId: typeId};
		gSelectedPrdList[prdId].qty++;
	} else {
		if (gSelectedPrdList[prdId]) gSelectedPrdList[prdId].qty--;
		if (gSelectedPrdList[prdId].qty <= 0) {
			delete gSelectedPrdList[prdId];
		}
	}
	refreshSelectedPrd4Page(prdId);
}

function showHome(el) {
	$(el).closest('.cx-page').find('.cx-tab:not(.cx-home)').fadeOut('fast');
}

function showShoppingCart(el) {
	$(el).closest('.cx-page').find('.cx-ddpz-wrapper').hide();
	if (!$('#mainPage .cx-item-selected').is(':visible')){
		let cntr=$('#mainPage .cx-item-selected .cx-items'), selectedPrdIds=Object.keys(gSelectedPrdList),
			sum=$('#mainPage .cx-sub-action-bar .sum .cx-price'), prom=$('#mainPage .cx-sub-action-bar .promotion .cx-price'), 
			// remark=$('#mainPage .cx-sub-action-bar .cx-remark'),
			cartCount=0, total=0;
		cntr.empty();
		if (selectedPrdIds.length > 0) {
			for (let i=0; i<selectedPrdIds.length; i++) {
				let prd = getPrdById(selectedPrdIds[i]), qty = gSelectedPrdList[selectedPrdIds[i]].qty;
				let memberPriceEnabled = prd.hyje<prd.spje;
				cartCount += qty;
				total += (gMember?prd.hyje:prd.spje)*qty;
				cntr.append(`<div class="row cx-item" data-prd-id="${prd.spid}">
						<div class="col-5 cx-thumbnail">
				 			<div><img src ="${CxMisc.finalizeUrl(prd.sptplj?prd.sptplj:'/resources/img/no-pic.png')}" alt="产品图片" /></div>
				 		</div>
				 		<div class="col-7 cx-info">
				 			<span class="cx-name">${CxMisc.escapeHtml(prd.spmc)}</span>
				 			<span class="cx-desc">${CxMisc.escapeHtml(prd.spsm)}</span>
				 			<span class="cx-price cx-price-member mt-2"${!memberPriceEnabled?' style="display:none;"':''}>${prd.hyje}</span>
				 			<span class="cx-price mt-2 my-1">${prd.spje}</span>
				 			<span class="cx-price cx-price-overdue"${memberPriceEnabled?' style="display:none;"':''}>${prd.spyjje}</span>
				 			<span class="cx-action">
				 				<span class="cx-action-more" style="display:flex;">
				 					<button type="button" class="btn btn-success btn-sm" data-cmd="decrease"><i class="fas fa-minus"></i></button>
				 					<span class="cx-item-qty">${qty}</span>
				 					<button type="button" class="btn btn-success btn-sm" data-cmd="increase"><i class="fas fa-plus"></i></button>
				 				</span>
				 			</span>
				 		</div>
				 	</div>`);
			}
			cntr.find('div.cx-item').each(bindProductAction);
		} else {
			cntr.append(gNoData);
		}
		if (gPromotions) {
			let tmp = total, ded = 0;
			total = eval(gPromotions[0].rule.replace(/SUM/g, total));
			ded = tmp - total;
			sum.text(total.toFixed(2));
			prom.text(ded.toFixed(2)).closest('.promotion').css('display', '');
			// remark.html(`共 ${cartCount} 件<br><span class="text-danger">优惠:<span class="cx-price">${ded}</span></span>`);
		} else {
			sum.text(total).addClass('cx-f-1').prev().addClass('cx-f-1').css('width', 'auto');
			prom.text(0).closest('.promotion').css('display', 'none');
			// remark.text(`共 ${cartCount} 件`);
		}
		$('#mainPage .cx-item-selected').fadeIn('fast');
	}
}

function showOrderList(el) {
	$(el).closest('.cx-page').find('.cx-item-selected').hide();
	$('#mainPage .cx-ddpz-wrapper').fadeIn('fast');
	// filterDdpz();
	gotoDdpzPage(0, 10000); // 暂不需分布
}

/*function filterDdpz(){
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/WxJz/getDdpzCount'),
	    type: "GET",
	    data: {},
	    beforeSend: function(xhr, cfg) {
	    	$('#mainPage .cx-ddpz-wrapper').mask('show', {msg: '载入中，请稍候...'});
	    },
	    success: function(res, ts) {
	    	if (res.code == "0") {
	    		genDdpzPager(res.data); // 生成分页
        		if (res.data == 0) {
        			$("#mainPage .cx-ddpz-wrapper div.cx-dl>div.cx-dl-body").empty().append(gNoData);
        			$('#mainPage .cx-ddpz-wrapper').mask('hide');
        		} else {
        			gotoDdpzPage(0, gDdpzPager.pagination("pageSize")); // 默认打开第一页
        		}
	    	} else {
	    		CxCtrl.alert('查询失败, 请稍后重试：' + res.message);
	    		$('#mainPage .cx-ddpz-wrapper div.cx-dl>div.cx-dl-body').empty().append(gNoData);
		    	$('#mainPage .cx-ddpz-wrapper').mask('hide');
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询失败, 请稍后重试：' + msg);
	    	$('#mainPage .cx-ddpz-wrapper div.cx-dl>div.cx-dl-body').empty().append(gNoData);
	    	$('#mainPage .cx-ddpz-wrapper').mask('hide');
	    }
	});
}

function genDdpzPager(count) { // 生成分页并保存分页句柄到gDdpzPager
	gDdpzPager = null;
	let cntr = $('#mainPage .cx-ddpz-wrapper');
	cntr.children('.cx-pagination-cntr').remove(); // 清除上一次生成的分页（如有）
	cntr.append(`<div class="cx-pagination-cntr">
				<div class="cx-pagination" data-cx-ctrl="pagination" data-cx-param="{page:1,records:${count},click:gotoDdpzPage}"></div>
			</div>`);
	gDdpzPager = cntr.find("[data-cx-ctrl=pagination]").pagination();
}*/

function gotoDdpzPage(page, pageSize) {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/WxJz/loadDdpz'),
	    type: "GET",
	    data: {page: page, pageSize: pageSize},
	    beforeSend: function(xhr, cfg) {
	    	$('#mainPage .cx-ddpz-wrapper .cx-dl').mask('show', {msg: '载入中，请稍候...'});
	    },
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
	    		if (res.data.length>0) {
	    			renderDdpzList(page, pageSize, res.data);
	    		} else {
	    			$('#mainPage .cx-ddpz-wrapper div.cx-dl>div.cx-dl-body').empty().append(gNoData);
	    		}

	    		// gDdpzPager.pagination("refreshPage", page);
	    	} else {
	    		CxCtrl.alert('获取订单列表失败, 请刷新或重新打开公众号：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('获取订单列表失败, 请刷新或重新打开公众号：' + msg);
	    },
	    complete: function(xhr, ts) {
	    	$('#mainPage .cx-ddpz-wrapper .cx-dl').mask('hide');
	    }
	});
}

function renderDdpzList (page, pageSize, data) {
	let tmp = $('#mainPage .cx-ddpz-wrapper div.cx-dl>div.cx-dl-body').empty();
	for (let i=0; i<data.length; i++) {
		tmp.append(`<div class="cx-dl-item" data-id="${data[i].ddid}">
					<div class="cx-dl-item-content index-1">
						<div>
							<span class="w-25">${data[i].lxr? CxMisc.escapeHtml(data[i].lxr) : ''}</span>
							<span class="w-25">${data[i].ddztmc}</span>
							<span class="w-50 text-right">${CxMisc.formatDate(data[i].xdsj, 'short')}</span>
						</div>
						<div class="cx-f-075 text-black-50">
							<span class="w-75">${data[i].lxdz? CxMisc.escapeHtml(data[i].lxdz) : ''}</span>
							<span class="w-25 text-right"><span class="cx-price cx-no-badge">${data[i].cjje?data[i].cjje.toFixed(2):0}</span></span>
						</div>
					</div>
					<div class="cx-dl-item-index right"><i class="fas fa-angle-right"></i></div>
				</div>`);
		tmp.children(':last-child').attr('data-json', JSON.stringify(data[i]));
	}
	tmp.children('.cx-dl-item').click(function(){
		openDdpzDtlsPage(this);
	});
}

function closeDdpzDtlsPage() {
	$('#ddpzDtlsPage').fadeOut('fast');
}

function openDdpzDtlsPage(el) {
	$('#ddpzDtlsPage').fadeIn('fast');
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/WxJz/getDdpz'),
	    type: "GET",
	    data: {ddid: el.getAttribute('data-id')},
	    beforeSend: function(xhr, cfg) {
	    	$('#ddpzDtlsPage .cx-page-content').mask('show', {msg: '载入中，请稍候...'});
	    },
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
	    		let data = $(el).data('json'), target=$('#ddpzDtlsPage');
	    		target.find('.prd-ddbh').children('.value').text(data.ddbh);
	    		target.find('.prd-ddzt').children('.value').text(data.ddztmc);
	    		target.find('.prd-hydm').children('.value').text(data.hydm?data.hydm:'-');
	    		target.find('.prd-lxr').children('.value').text(data.lxr?data.lxr:'-');
	    		target.find('.prd-lxdh').children('.value').text(data.lxdh?data.lxdh:'-');
	    		target.find('.prd-lxdz').children('.value').text(data.lxdz?data.lxdz:'-');
	    		target.find('.prd-xdsj').children('.value').text(data.xdsj?CxMisc.formatDate(data.xdsj):'-');
	    		target.find('.prd-slsj').children('.value').text(data.slsj?CxMisc.formatDate(data.slsj):'-');
	    		target.find('.prd-wcsj').children('.value').text(data.wcsj?CxMisc.formatDate(data.wcsj):'-');
	    		target.find('.prd-ddsm').children('.value').text(data.ddsm?data.ddsm:'无备注');
	    		
	    		target.find('.spzyj .cx-price').text(data.ddje?data.ddje.toFixed(2):0);
	    		target.find('.spzyh .cx-price').text(data.yhje?data.yhje.toFixed(2):0);
	    		target.find('.spzcjje .cx-price').text(data.cjje?data.cjje.toFixed(2):0);
	    		
	    		if (res.data.zfjlList && res.data.zfjlList.length>0) {
	    			let zfjl = target.find('.prd-zfjl').children('.value').empty();
	    			for (let i=0; i<res.data.zfjlList.length; i++) {
	    				let jl = res.data.zfjlList[i];
	    				zfjl.append(`<p>${interpretZflx(jl.zfjllx)} - ${jl.zffsmc} - ${interpretZfbj(jl.zfbj)} - <span class="cx-price">${jl.zfje}</span></p>`);
	    			}
	    		} else {
	    			target.find('.prd-zfjl').children('.value').html('<span class="text-black-50">暂无记录</span>');
	    		}
	    		
	    		let prdCntr = target.find('.prd-list-cntr'), prdList=prdCntr.find('.prd-items'), total=0, qty=0, member=data.hybj=='1'?true:false;
	    		prdList.empty();
	    		if (res.data.ddmxList) {
	    			for (let i=0; i<res.data.ddmxList.length; i++) {
	    				let ddmx = res.data.ddmxList[i];
	    				total += ddmx.spsl*ddmx.spdj;
	    				qty += ddmx.spsl;
	    				prdList.append(`<div class="row prd" data-prd-id="${ddmx.spid}">
								<div class="col-5 prd-thumbnail">
									<div><img src="${CxMisc.finalizeUrl(ddmx.spxx.sptplj?ddmx.spxx.sptplj:'/resources/img/no-pic.png')}" alt="产品图片"></div>
								</div>
								<div class="col-7 prd-info">
									<span class="cx-name">${CxMisc.escapeHtml(ddmx.spxx.spmc)}</span>
									<span class="cx-desc">${CxMisc.escapeHtml(ddmx.spxx.spsm?ddmx.spxx.spsm:'暂无说明')}</span>
									<span class="cx-price ${member?'cx-price-member cx-no-badge':''} my-1">${ddmx.spdj}</span>
									<span class="cx-sub-total">共 ${ddmx.spsl} 件, 小计<span class="cx-price ${member?'cx-price-member':''} cx-no-badge cx-f-1">${ddmx.spsl*ddmx.spdj}</span></span>
								</div>
							</div>`);
	    			}
	    		} else {
	    			CxMsg.warn('订单异常：无相关商品信息');
	    		}
	    		prdCntr.find('.cx-prompt .cx-price').text(total);
	    		if (member) prdCntr.find('.cx-prompt .cx-price').addClass('cx-price-member');
	    		else prdCntr.find('.cx-prompt .cx-price').removeClass('cx-price-member');
	    		prdCntr.find('.cx-prompt .cx-remark').text(`共 ${qty} 件`);
	    	} else {
	    		CxCtrl.alert('获取订单信息失败, 请刷新或重新打开公众号：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('获取订单信息失败, 请刷新或重新打开公众号：' + msg);
	    },
	    complete: function(xhr, ts) {
	    	$('#ddpzDtlsPage .cx-page-content').mask('hide');
	    }
	});
}


// summary page
function closeSummaryPage() {
	$('#summaryPage').fadeOut('fast');
}

function openSummaryPage() {
	let f = document.querySelector('#summaryPage form');
	if ('true' != f.getAttribute('data-loaded')) { // 是否每次都取数据？
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/WxJz/loadPreData'),
		    type: "GET",
		    beforeSend: function(xhr, cfg) {
		    	$('#summaryPage .cx-smry-info').mask('show', {msg: '载入中，请稍候...'});
		    },
		    success: function(res, ts) {
		    	if (res.code == "0" && res.data) {
		    		f.setAttribute('data-loaded', true);
		    		if (res.data.hydz && res.data.hydz.length>0) {
		    			f.lxr.value = res.data.hydz[0].lxr;
		    			f.lxdh.value = res.data.hydz[0].lxdh;
		    			f.lxdz.value = res.data.hydz[0].lxdz;
		    		}
		    	} else {
		    		CxCtrl.alert('获取用户信息失败, 请刷新或重新打开公众号：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxCtrl.alert('获取用户信息失败, 请刷新或重新打开公众号：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	$('#summaryPage .cx-smry-info').mask('hide');
		    }
		});
	}
	
	// show selected prd info
	let cntr=$('#summaryPage .cx-items'), selectedPrdIds=Object.keys(gSelectedPrdList),
		sum=$('#summaryPage .cx-sub-action-bar .cx-price'), 
		spzyj=$('#summaryPage .spzyj .cx-price'), spzyh=$('#summaryPage .spzyh .cx-price'),
		remark=$('#summaryPage .cx-sub-action-bar .cx-remark'),
		cartCount=0, total=0;
	cntr.empty();
	if (selectedPrdIds.length > 0) {
		for (let i=0; i<selectedPrdIds.length; i++) {
			let prd = getPrdById(selectedPrdIds[i]), qty=gSelectedPrdList[selectedPrdIds[i]].qty;
			let memberPriceEnabled = prd.hyje<prd.spje;
			cartCount += qty;
			total += (gMember?prd.hyje:prd.spje)*qty;
			cntr.append(`<div class="row cx-item" data-prd-id="${prd.spid}">
					 		<div class="col-5 cx-thumbnail">
					 			<div><img src ="${CxMisc.finalizeUrl(prd.sptplj?prd.sptplj:'/resources/img/no-pic.png')}" alt="产品图片" /></div>
					 		</div>
					 		<div class="col-7 cx-info">
					 			<span class="cx-name">${CxMisc.escapeHtml(prd.spmc)}</span>
					 			<span class="cx-desc">${CxMisc.escapeHtml(prd.spsm)}</span>
					 			<span class="cx-price cx-price-member mt-2"${!memberPriceEnabled?' style="display:none;"':''}>${prd.hyje}</span>
					 			<span class="cx-price mt-2 my-1">${prd.spje}</span>
				 				<span class="cx-price cx-price-overdue"${memberPriceEnabled?' style="display:none;"':''}>${prd.spyjje}</span>
					 			<span class="cx-sub-total">共 ${qty} 件, 小计<span class="cx-price ${gMember?"cx-price-member cx-no-badge":""} cx-f-1">${(gMember?prd.hyje:prd.spje)*qty}</span></span>
					 		</div>
					 	</div>`);
		}
		if (gPromotions) {
			let tmp = total, ded = 0;
			total = eval(gPromotions[0].rule.replace(/SUM/g, total));
			ded = tmp - total;
			sum.text(total.toFixed(2));
			spzyj.text(tmp.toFixed(2));
			spzyh.text(ded.toFixed(2));
			remark.html(`共 ${cartCount} 件`);
		} else {
			sum.text(total);
			spzyj.text(total);
			spzyh.text(0);
			remark.text(`共 ${cartCount} 件`);
		}
	} else {
		sum.empty();
		remark.empty();
	}
	
	$('#summaryPage').fadeIn('fast');
}

function closeAckPage() {
	$('#ackPage').fadeOut('fast');
}
function openAckPage() {
	$('#ackPage').fadeIn('fast');
}


// init
function loadPrd() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/WxJz/loadSplbList'),
	    type: "GET",
	    beforeSend: function(xhr, cfg) {
	    	//$('#mainPage .cx-content').mask('show', {msg: '载入中，请稍候...'});
	    },
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
	    		if (res.data) {
	    			if (res.data.length == 0) {
	    				CxCtrl.alert('返回商品列表为空');
	    			} else {
	    				gSplbList = res.data;
		    			renderSplb(gSplbList);
	    			}
	    		}
	    	} else {
	    		CxCtrl.alert('查询失败, 请刷新或重新打开公众号：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询失败, 请刷新或重新打开公众号：' + msg);
	    },
	    complete: function(xhr, ts) {
	    	$('#mainPage .cx-content').mask('hide');
	    }
	});
}

function renderSplb(splbs) {
	let typeCntr = $('#prdTypeList');
	typeCntr.empty();
	for (let i=0; i<splbs.length; i++) {
		if (splbs[i].spxx && splbs[i].spxx.length>0) {
			typeCntr.append(`<a class="list-group-item list-group-item-action" href="#list-item-${i}" data-type-id="${splbs[i].splbid}">${splbs[i].splbmc}</a>`);
		}
	}
	
	let prdCntr=$('#prdList');
	prdCntr.empty();
	for (let i=0; i<splbs.length; i++) {
		let splb = splbs[i];
		if (splb.spxx && splb.spxx.length>0) {
			let prds = [];
			for (let j=0; j<splb.spxx.length; j++) {
				let prd = splb.spxx[j];
				let memberPriceEnabled = prd.hyje<prd.spje;
				prds.push(`<div class="row cx-item" data-prd-id="${prd.spid}">
						<div class="col-5 cx-thumbnail">
				 			<div><img src ="${CxMisc.finalizeUrl(prd.sptplj?prd.sptplj:'/resources/img/no-pic.png')}" alt="产品图片" /></div>
				 		</div>
				 		<div class="col-7 cx-info">
				 			<span class="cx-name">${CxMisc.escapeHtml(prd.spmc)}</span>
				 			<span class="cx-desc">${CxMisc.escapeHtml(prd.spsm)}</span>
				 			<span class="cx-price cx-price-member mt-2"${!memberPriceEnabled?' style="display:none;"':''}>${prd.hyje}</span>
				 			<span class="cx-price mt-2 my-1">${prd.spje}</span>
				 			<span class="cx-price cx-price-overdue"${memberPriceEnabled?' style="display:none;"':''}>${prd.spyjje}</span>
				 			<span class="cx-action">
				 				<span class="cx-action-caret">
				 					<button type="button" class="btn btn-success btn-sm" data-cmd="increase"><i class="fas fa-cart-plus"></i></button>
				 				</span>
				 				<span class="cx-action-more">
				 					<button type="button" class="btn btn-success btn-sm" data-cmd="decrease"><i class="fas fa-minus"></i></button>
				 					<span class="cx-item-qty">0</span>
				 					<button type="button" class="btn btn-success btn-sm" data-cmd="increase"><i class="fas fa-plus"></i></button>
				 				</span>
				 			</span>
				 		</div>
				 	</div>`);
			}
			prdCntr.append(`<div>
					 	<h4 id="list-item-${i}" class="cx-category">${splb.splbmc}</h4>
					 	${prds.join('')}
					 </div>`);
		}
	}
	prdCntr.append(gBottomPlaceholder);
	prdCntr.find('div.cx-item').each(bindProductAction);
	
	prdCntr.scrollspy({ target: '#prdTypeList' });
	redefineScrollSpyAction();
}

function loadUserInfo() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/WxJz/getHyxx'),
	    type: "GET",
	    beforeSend: function(xhr, cfg) {
	    	$('#mainPage .cx-content').mask('show', {msg: '载入中，请稍候...'});
	    },
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
	    		if (res.data && res.data.length>0) {
	    			gMember = res.data[0].hybj == "1";
	    			if (gMember) {
	    				$('#mainPage .cx-sub-action-bar .cx-price').addClass('cx-price-member');
	    				$('#summaryPage .cx-sub-action-bar .cx-price').addClass('cx-price-member');
	    			} else {
	    				$('#mainPage .cx-sub-action-bar .cx-price').removeClass('cx-price-member');
	    				$('#summaryPage .cx-sub-action-bar .cx-price').removeClass('cx-price-member');
	    			}
	    			loadPrd();
	    		} else {
	    			CxCtrl.alert('无数据返回');
		    		$('#mainPage .cx-content').mask('hide');
	    		}
	    	} else {
	    		CxCtrl.alert('查询失败, 请刷新或重新打开公众号：' + res.message);
	    		$('#mainPage .cx-content').mask('hide');
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询失败, 请刷新或重新打开公众号：' + msg);
	    	$('#mainPage .cx-content').mask('hide');
	    },
	    complete: function(xhr, ts) {
	    	// $('#mainPage .cx-content').mask('hide');
	    }
	});
}

function loadPromotionInfo() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/WxJz/loadPromotionInfo'),
	    type: "GET",
	    success: function(res, ts) {
	    	if (res.code == "0") {
	    		if (res.data && res.data.length>0) {
	    			gPromotions = res.data;
	    		}
	    	} else {
	    		CxCtrl.alert('查询促销信息失败, 请刷新或重新打开公众号：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询促销信息失败, 请刷新或重新打开公众号：' + msg);
	    }
	});
}

function submitOrder(f) {
	if (!CxMisc.validate(f)) {
		$(f).removeClass('was-validated');
		CxCtrl.alert('请填写完整的联系信息'); return;
	}
	let selectedPrdIds = Object.keys(gSelectedPrdList);
	if (selectedPrdIds.length == 0) {
		CxCtrl.alert('请至少选择一个商品');  return;
	}
	
	let frm=$(f), tmp=[],
	data = frm.serializeJson();
	for (let i=0; i<selectedPrdIds.length; i++) {
		tmp.push(`${selectedPrdIds[i]},${gSelectedPrdList[selectedPrdIds[i]].qty}`);
	}
	data.spxx = tmp.join(';');
		
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/WxJz/addDdpz'),
	    type: "POST",
	    data: data,
	    beforeSend: function(xhr, cfg) {
	    	CxMisc.markAjaxStart(frm.find('button[data-cmd=submit]'));
	    },
	    success: function(res, ts) {
	    	if (res.code == "0") {
	    		closeSummaryPage();
	    		doClearCart();
	    		openAckPage();
	    	} else {
	    		CxCtrl.alert('提交预约失败, 页面可能超时, 请刷新或重新打开公众号：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('提交预约失败, 页面可能超时, 请刷新或重新打开公众号：' + msg);
	    },
	    complete: function(xhr, ts) {
	    	CxMisc.markAjaxEnd(frm.find('button[data-cmd=submit]'));
	    }
	});
}



$(function(){
	"use strict";
	
	adjustContentHeight(); // 执行两次，确保调整到位
	document.querySelector('#mainPage .header-img img').onload = function() {adjustContentHeight();};
	
	loadUserInfo();
	loadPromotionInfo();
	
	$('#mainPage .cx-action-bar button').click(function(){
		$(this).closest(".cx-action-bar").find('button').removeClass('active');
		$(this).addClass('active');
	});
	
	$('#mainPage .cx-action-bar button[data-cmd=home]').click(function(){
		showHome(this);
	});
	
	$('#mainPage .cx-action-bar button[data-cmd=cart]').click(function(){
		showShoppingCart(this);
	});
	
	$('#mainPage .cx-action-bar button[data-cmd=order]').click(function(){
		showOrderList(this);
	});
	
	
	
	$('#mainPage .cx-sub-action-bar .cx-action button[data-cmd=submit]').click(function(){
		if (Object.keys(gSelectedPrdList).length > 0) openSummaryPage();
		else CxCtrl.alert('请先选择至少一个服务或商品');
	});

	$('#mainPage button[data-cmd=clearCart]').click(clearCart);
	
	
	
	$('#summaryPage .cx-sub-action-bar .cx-back').click(function(){
		closeSummaryPage();
	});
	
	$('#summaryPage .cx-sub-action-bar button[data-cmd=submit]').click(function(){
		submitOrder(this.form);
	});
	

	$('#ackPage .cx-page-content button[data-cmd=order]').click(function(){
		closeAckPage();
		$('#mainPage .cx-action-bar button[data-cmd=order]').click();
	});
	$('#ackPage .cx-page-content button[data-cmd=back]').click(function(){
		$('#ackPage .cx-sub-action-bar .cx-prompt').click();
	});
	$('#ackPage .cx-sub-action-bar .cx-prompt').click(function(){
		closeAckPage();
		$('#mainPage .cx-action-bar button[data-cmd=home]').click();
	});
	
	
	
	$('#ddpzDtlsPage .cx-sub-action-bar .cx-prompt').click(function(){
		closeDdpzDtlsPage();
	});
});
