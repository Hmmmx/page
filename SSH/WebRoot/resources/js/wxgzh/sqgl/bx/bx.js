$(function(){
	$('.page-title .back').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	$('.page-title .link').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl/bxjl'+window.location.search);
	});
	
	$('.page-body .btn[data-cmd=upload]').click(function(e){
		upload(this);
	});
	
	$('.page-action-bar .btn[data-cmd=submit]').click(function(e){
		submit(e);
	});
	
	getFc();
	loadAllDmList(document.querySelector('.page-body'));
	CxNotifier.consume();
});

let gBxcs = null;

function upload(el){
	if (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1') { //用于本地展示之用
		CxCtrl.alert('本地不能上传图片到微信');
	} else {
		if (!gBxcs) {
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/gz/sqgl/bx/getBxcs'),
			    type: "GET",
			    data: {url: window.location.href},
			    beforeSend: function(xhr, cfg) {
		        	CxMisc.markAjaxStart($(el));
		        },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		gBxcs = res.data;
			    		wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来    
							appId: gBxcs.appid,
							timestamp: gBxcs.timestamp,
							nonceStr: gBxcs.nonceStr,
							signature: gBxcs.signature,
							jsApiList: ['checkJsApi', 'chooseImage', 'previewImage', 'uploadImage']
			    		});
			    		wx.ready(function(){
			    			upload(el);
			    		});
			    		wx.error(function(res){
			    			CxCtrl.alert('获取微信上传功能失败');
			    		});
			    	} else {
			    		CxCtrl.alert('获取报修上传参数失败, 请稍后重新打开：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxCtrl.alert('获取报修上传参数失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd($(el));
		        }
			});
		} else {
			let imgCount = $('.page-body .bx-img-wrapper .thumbnail').length;
			if (imgCount < 4) {
				wx.chooseImage({
					count: 4 - imgCount,
					sizeType: ['original', 'compressed'],
				    sourceType: ['camera', 'album'],
				    success: function (res) {
				    	let localIds = res.localIds, localIdIndex = 0;
				    	
				    	let _upload = function() {
					    	wx.uploadImage({
						        localId: localIds[localIdIndex],
						        isShowProgressTips: 1, // 默认为1，显示进度提示
						        success: function (resp) {
						        	imgCount++;
									$('.page-body .bx-img-wrapper').children('.thumbnail').removeClass('col-12 col-6 col-4 col-3').addClass(`col-${12/imgCount}`);
									$('.page-body .bx-img-wrapper').append(`<div class="col-${12/imgCount} cx-d-i-flex-center thumbnail thumbnail-auto">
									                    <div><img src="${localIds[localIdIndex]}" onload="adjustImgSize()" style="max-width: none; max-height: 100%;"></div>
									                    <span class="cx-close circle top-right"><span><a href="javascript:;"><i class="fas fa-times"></i></a></span></span>
									                    <input type="hidden" name="bxtpdz" value="${resp.serverId}">
									                </div>`);
									$('.page-body .bx-img-wrapper').children('.thumbnail:last-child').find('img').click(function(){
										CxGz.popImg(this);
									});
									$('.page-body .bx-img-wrapper').children('.thumbnail:last-child').find('.cx-close').click(function(){
										$(this).closest('.thumbnail').remove();
										adjustImgSize();
									});
						        	
						            //如果还有照片，继续上传
									localIdIndex++;
									if (imgCount<4 && localIdIndex < localIds.length) {
										_upload();
									}
						        },fail: function (error) {
						        	CxCtrl.alert(JSON.stringify(error));
						        }
						    });
					    }
				    	_upload();
					}
				});
			} else CxCtrl.alert('最多只可上传4张图片');
		}
	}
}

function submit(e) {
	let el=e.target, f=document.querySelector('.page-body form');
	if (CxMisc.validate(f)) {
		let data = $(f).serializeJson({removeBlankField:true});
		delete data.fcid;
		data.txdz = f.fcid.options[f.fcid.selectedIndex].text;
		data.sqdm = CxMisc.qs.get('sqdm');
		data.bxlydm = '0'; //来自业主
		if (data.bxtpdz) {
			if (typeof data.bxtpdz === 'object') {
				for (let i=0; i<data.bxtpdz.length; i++) data['bxtpdz'+(i+1)] = data.bxtpdz[i];
			} else {
				data['bxtpdz1'] = data.bxtpdz;
			}
			delete data.bxtpdz;
		}
			
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/sqgl/bx/addBxxx'),
		    type: "POST",
		    data: data,
		    beforeSend: function(xhr, cfg) {
	        	CxMisc.markAjaxStart($(el));
	        },
		    success: function(res, ts) {
		    	if (res.code == "0") {
		    		CxNotifier.produce('提交成功');
		    		window.location.reload();
		    	} else {
		    		CxCtrl.alert('提交报修失败, 请稍后重新打开：' + res.message);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	CxCtrl.alert('提交报修失败：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	CxMisc.markAjaxEnd($(el));
	        }
		});
	}
}

function getFc() {
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/getFc'),
	    type: "GET",
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
    			if (res.data && res.data.length>0) {
    				let el = document.querySelector('.page-body select[name=fcid]'), sqdm = CxMisc.qs.get('sqdm');
    				for (let i=0; i<res.data.length; i++) { // 只显示当前小区房产
    					if (res.data[i].sqdm == sqdm) el.options.add(new Option(res.data[i].fcmc, res.data[i].fcid));
    				}
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




function getDmList(op, cb) {
    	if (op) {
    		let category = op.getAttribute('data-category'), type = op.getAttribute('data-lazy-load');
    		if (gCache.dm[category+type]) {
    			if (typeof cb === 'function') cb(gCache.dm[category+type]);
    		} else {
	    		CxMisc.ajaxwx({
	    		    url: CxMisc.finalizeUrl('/gz/sqgl/dm/get'),
	    		    type: "GET",
	    		    data: {category: category, type: type},
	    		    beforeSend: function(xhr, cfg) {
	    		    	op.disabled = true;
	    		    },
	    		    success: function(res, ts) {
	    		    	if (res.code == "0") {
	    		    		gCache.dm[category+type] = res.data;
	    		    		if (typeof cb === 'function') cb(res.data);
	    		    	} else {
	    		    		if (op.id) {
	    		    			let mc = $(op).closest('.form-group').find('label[for='+op.id+']').text();
	    		    			CxCtrl.alert('获取'+mc+'列表失败：' + res.message);
	    		    		} else CxCtrl.alert('获取信息列表失败：' + res.message);
	    		    	}
	    		    },
	    		    error: function(xhr, ts, err) {
	    		    	var msg = "[" + xhr.status + " : " + ts + "]";
	    		    	if (op.id) {
			    			let mc = $(op).closest('.form-group').find('label[for='+op.id+']').text();
			    			CxCtrl.alert('获取'+mc+'列表失败：' + msg);
			    		} else CxCtrl.alert('获取信息列表失败：' + msg);
	    		    },
	    		    complete: function(xhr, ts) {
	    		    	op.disabled = false;
	    		    }
	    		});
    		}
    	}
	
}

function loadAllDmList(el) {
	$(el).find('select[data-lazy-load][data-loaded!=true]').each(function(){
		let el = this;
		getDmList(el, function(list){
			let dataAcceptValues = el.getAttribute('data-accept-values'), acceptValues=null;
			if (dataAcceptValues) 
				acceptValues = dataAcceptValues.split(',');
			for (let i=0; i<list.length; i++) {
				if (!acceptValues || acceptValues.includes(list[i].dm))
					el.options.add(new Option(list[i].mc, list[i].dm));
			}
			if (el.getAttribute('data-selected-value')) { // 载入后设置选中的值 ，暂只支持select元素
				$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
				if (el.selectedIndex == -1) el.selectedIndex = 0;
				$(el).trigger('change');
			}
			if (el.multiple && el.getAttribute('data-cx-ctrl') == 'multi-select') {
				let disabled = el.disabled;
				if (disabled) el.disabled = false;
				if (el.getAttribute('data-param')) $(el).fSelect(JSON.parse(el.getAttribute('data-param')));
				else $(el).fSelect();
				if (disabled) el.disabled = true;
			}
			el.setAttribute('data-loaded', 'true');
		});
	}); 
}


function adjustImgSize() { //计算图片与容器的尺寸合图片显示最大化
	let imgCount = $('.page-body .bx-img-wrapper .thumbnail').length;
	$('.page-body .bx-img-wrapper').children('.thumbnail').removeClass('col-12 col-6 col-4 col-3').addClass(`col-${12/imgCount}`).find('img').each(function(){
		let imgWrap = $(this).closest('.thumbnail'), 
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

