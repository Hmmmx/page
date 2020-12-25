$(function(){
	"use strict";
	
	$('.quick-prds [data-type=prd]').click(function(e){
		gotoPrd(this.getAttribute('data-cmd'));		
	});
	
	$(document).scroll(function() {
        let scrollTop = $(document).scrollTop(),
			h0 = $(window).height(),
			h1 = $(document).height();
 
        if (h1 - (scrollTop + h0) < 40){ //距离底部高度小于40px
             getZx({manual:true});
        }
	});
	$('.quick-info .info-list .loading').click(function(){ getZx({manual:true}); });
	
	adjustQuickInfoWrapper();
	
	let redirect = CxMisc.qs.get('redirect');
	if (redirect) window.location.href = CxMisc.finalizeUrl4Wx(redirect);
	else getFc();
});

let gSwiper = null;

function getInfo() {
	getJf();
	getGg();
	getZx({clear:true});
}

function gotoPrd(cmd){
	if (cmd == 'fc') window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl/'+cmd);
	else {
		let sq = getCurrentSq();
		if (sq) {
			if (cmd == 'km') {
				/*CxMisc.ajaxwx({
				    url: CxMisc.finalizeUrl('/gz/sqgl/km/status'),
				    type: "GET",
				    data: {sqdm: sq.sqdm},
				    success: function(res, ts) {
				    	if (res.code == "0") {
				    		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl/'+cmd+"?sqdm="+sq.sqdm+"&sqid="+sq.sqid);
				    	} else {
				    		CxCtrl.alert('该小区未开通此功能');
				    	}
				    },
				    error: function(xhr, ts, err) {
				    	var msg = "[" + xhr.status + " : " + ts + "]";
				    	CxCtrl.alert('查询小区开门功能状态失败：' + msg);
				    }
				});*/
				window.location.href = 'https://s.weekey.cn/mobile/index/index/token/gh_86759fe05eff.html';
			} else {
				if (cmd == 'jf' || cmd == 'bx' 
						|| cmd == 'zs' || cmd == 'gx' || cmd == 'tp' || cmd == 'zn')
					window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl/'+cmd+"?sqdm="+sq.sqdm+"&sqid="+sq.sqid);
			}
		} else CxCtrl.alert('请先绑定房产');
	}
}

function getZx(options) {
	let sq = getCurrentSq();
	if (sq) {
		let wrap = $('.quick-info .info-list'), now = new Date().getTime();
		if ((options && options.clear) || ((!wrap.data('last-checking') || now-wrap.data('last-checking')>1000) && (wrap.data('loading') != 'Y' && wrap.data('has-more') != 'N'))) {
			wrap.data('last-checking', now);
			
			if (options && options.clear) {
				wrap.children('.info-item').remove();
				wrap.data('has-more', 'Y');
			}
			let pageSize = 10, page = Math.floor(wrap.children('.info-item').length/pageSize);
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/gz/sqgl/gg/getSqzx'),
			    type: "GET",
			    data: {sqdm:sq.sqdm, page:page, pageSize:pageSize},
			    beforeSend: function(xhr, cfg) {
		        	wrap.data('loading', 'Y');
		        	wrap.find('.loading i').addClass('fa-spin');
		        },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		if (res.data) {
			    			for (let i=0; i<res.data.length; i++) {
			    				wrap.append(`<div class="row no-gutters info-item" data-url="${res.data[i].zxljdz}">
										<div class="col-1 thumbnail d-none">
								 			<div class="p-1">${res.data[i].zxtpdz ? '<img src="CxMisc.finalizeUrl(res.data[i].zxtpdz)">' : '<i class="iconfont iconshipinbofangkuang-laba" style="font-size:20px;color:#4285f4;"></i>'}</div>
								 		</div>
								 		<div class="col-11 message">
								 			<div class="row no-gutters">
										 		<div class="col-12 subject"><span>${res.data[i].zxbt}</span></div>
										 		<!-- <div class="col-3 date"><span>${res.data[i].fbrq}</span></div> -->
									 		</div>
								 			<div class="row no-gutters">
								 				<div class="col sub"><span>${res.data[i].fbrq}</span></div>
								 			</div>
								 		</div>
								 		<div class="col-1 indicator">
								 			<span class="cx-name"><i class="fas fa-angle-right"></i></span>
								 		</div>
									</div>`);
			    				wrap.children(':last-child').click(function(){ 
			    					let url = this.getAttribute('data-url');
			    					if (url) window.location.href = url;
			    				});
			    			}
			    			wrap.children('.loading').appendTo(wrap); // 把空白提示行移到未尾
			    		}
			    		if (!res.data || res.data.length < pageSize) {
			    			wrap.data('has-more', 'N'); // 小于pageSize时表示没有更多数据
			    			wrap.find('.loading>span').text('没有更多资讯了');
			    		}
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxCtrl.alert('获取资讯失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	wrap.data('loading', 'N');
			    	wrap.find('.loading i').removeClass('fa-spin');
		        }
			});
		}
	} else { if (options && options.manual) CxCtrl.alert('请先绑定房产'); }
}

function getFc() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/getFc'),
	    type: "GET",
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
    			if (res.data && res.data.length>0) {
    				let sqEl = document.querySelector('.banner .bubble[data-cmd=sq]');
    				getJg(sqEl, res.data);

    				$('.banner .bubble[data-cmd=sq]').click(function(e){
    					popSwitchSq(this);
    				});
    				// document.querySelector('.quick-prds div[data-cmd=fc] .cx-badge').innerText = res.data.length;
    			} else {
    				$('.banner .bubble[data-cmd=sq]').click(function(){ 
    					document.querySelector('.quick-prds div[data-cmd=fc]').click(); 
    				});
    				CxCtrl.confirm('你还未绑定房产，请点击<span style="color:orange;">房产</span>绑定', function(src){
    					src.click();
    				}, {
    					src: document.querySelector('.quick-prds div[data-cmd=fc]'), 
    					forcePopup:true
    				});
    			}
	    	} else {
	    		CxCtrl.alert('查询用户绑定房产失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询用户绑定房产失败：' + msg);
	    }
	});
}

function getJg(el, fcList) {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/getJg'),
	    type: "GET",
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
    			if (res.data && res.data.length>0) {
    				for (let i=res.data.length-1; i>=0; i--) {
    					let v = false;
    					for (let j=0; j<fcList.length; j++) {
	    					if (res.data[i].sqdm == fcList[j].sqdm) {
	    						v = true;
	    						break;
	    					}
	    				}
    					if (!v) res.data.splice(i, 1);
    				}
    			}
    			el.setAttribute('data-sq-list', JSON.stringify(res.data));
    			let idx = $.cookie('current-sq-idx');
    			switchSq(idx ? parseInt(idx) : 0);
	    	} else {
	    		CxCtrl.alert('查询用户绑定房产失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询用户绑定房产失败：' + msg);
	    }
	});
}

function getJf() {
	let sq = getCurrentSq();
	if (sq) {
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/sqgl/jf/getWjfy'),
		    type: "GET",
		    data: {sqdm: sq.sqdm},
		    success: function(res, ts) {
		    	if (res.code == "0") {
	    			if (res.data && res.data.length>0) 
	    				document.querySelector('.quick-prds div[data-cmd=jf] .cx-badge').innerText = res.data.length;
	    			else
	    				document.querySelector('.quick-prds div[data-cmd=jf] .cx-badge').innerText = '';
		    	} else {
		    		CxCtrl.alert('查询未缴费用失败：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxCtrl.alert('查询未缴费用失败：' + msg);
		    }
		});
	}
}

function getGg() {
	let sq = getCurrentSq();
	if (sq) {
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/sqgl/gg/getSqgg'),
		    type: "GET",
		    data: {sqdm: sq.sqdm},
		    success: function(res, ts) {
		    	if (gSwiper) { gSwiper.destroy(); gSwiper = null; }
		    	
		    	if (res.code == "0" && res.data) {
		    		if (res.data.length>0) {
		    			let wrap = $('.banner .swiper-wrapper').empty();
		    			for (let i=0; i<res.data.length; i++) {
		    				wrap.append(`<div class="swiper-slide cx-d-flex-center">
					        	<div class="cx-d-flex-center" style="background-color:skyblue;min-height:100px;"><a href="${res.data[i].ggljdz}"><img class="w-100" src="${CxMisc.finalizeUrl(res.data[i].ggtpdz)}"></a></div>
					        </div>`);
		    			}
		    		}/* else {
		    			wrap.append(`<div class="swiper-slide cx-d-flex-center">
				        	<div class="cx-d-flex-center" style="background-color:skyblue;min-height:100px;"><a href="#"><img class="w-100" src="${wrap.data('def-img')}"></a></div>
				        </div>`);
		    		}*/
		    	}
		    	
		    	if (document.querySelectorAll('.swiper-container .swiper-slide').length > 1) {
		    		gSwiper = new Swiper('.swiper-container', {
    					loop: true,
    				    speed: 500,
    					spaceBetween: 10,
    					centeredSlides: true,
    				    autoplay: {
    				    	delay: 2500,
    				    	disableOnInteraction: false,
    				    },
    				    pagination: {
    				    	el: '.swiper-pagination',
    				    	clickable: true
    				    }
    				});
    			}
		    }
		});
	}
}

/*function getBx() {
	let sq = getCurrentSq();
	if (sq) {
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/sqgl/bx/getBxxx'),
		    type: "GET",
		    data: {sqdm: sq.sqdm},
		    success: function(res, ts) {
		    	if (res.code == "0" && res.data) {
		    		if (res.data && res.data.length>0) 
	    				document.querySelector('.quick-prds div[data-cmd=bx] .cx-badge').innerText = res.data.length;
		    	} else {
		    		CxCtrl.alert('查询报修记录失败：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxCtrl.alert('查询报修记录失败：' + msg);
		    }
		});
	}
}*/

function getCurrentSq() {
	let sqData = document.querySelector('.banner .bubble[data-cmd=sq]').getAttribute('data-current-sq');
	if (sqData) return JSON.parse(sqData);
	else return null;
}

function switchSq(idx) {
	let el = document.querySelector('.banner .bubble[data-cmd=sq]');
	let sqList = JSON.parse(el.getAttribute('data-sq-list'));
	el.querySelector('a span').innerHTML = `${sqList[idx].sqmc}${sqList.length>1?'<i class="fas fa-angle-down ml-1"></i>':''}`;
	// if (sqList.length > 1) el.querySelector('.cx-badge').innerText = sqList.length;
	
	el.setAttribute('data-current-idx', idx);
	el.setAttribute('data-current-sq', JSON.stringify(sqList[idx]));
	
	if (sqList[idx].lxdh) {
		$('.banner .bubble[data-cmd=lxdh]').removeClass('d-none');
		$('.banner .bubble[data-cmd=lxdh]').find('a').attr('href', `tel:${sqList[idx].lxdh}`)
	} else $('.banner .bubble[data-cmd=lxdh]').addClass('d-none');
	
	getInfo();
}

function popSwitchSq(el) {
	let sqList = JSON.parse(el.getAttribute('data-sq-list')), currIdx = el.getAttribute('data-current-idx');
	if (sqList) {
		let wrap = $('#homeSqModalDtls .sq-list-wrapper').empty();
		for (let i=0; i<sqList.length; i++) {
			wrap.append(`<div><a class="d-inline-flex rounded w-100 p-2 ${currIdx==i? ' bg-primary text-white' : ''}" href="javascript:;" data-idx="${i}">${sqList[i].sqmc}</a></div>`);
		}
		wrap.find('a').click(function(){
			if (!$(this).hasClass('bg-primary')) {// 非当前小区
				$.cookie('current-sq-idx', this.getAttribute('data-idx'));
				switchSq(parseInt(this.getAttribute('data-idx')));
				$('#homeSqModalDtls').modal('hide');
			}
		});
		$('#homeSqModalDtls').modal('show');
	}
}

function adjustQuickInfoWrapper(){
	if (window.innerHeight > $('body').outerHeight()) {
		let h1 = $('.banner').outerHeight(true), h2 = $('.quick-prds').outerHeight(true), my = $('.quick-info').outerHeight(true)-$('.quick-info').outerHeight();
		// document.querySelector('.quick-info').style.minHeight = '345px';
		document.querySelector('.quick-info').style.minHeight = 'calc(100vh - ' + Math.floor(h1 + h2 + my/2) + 'px';
	}
}
