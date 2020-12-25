async function prepare(){
	let hyxx = await p_getHyxx();
	if (hyxx.code) {
		CxCtrl.alert(hyxx.message);
	} else {
		let sbxcid = CxMisc.qs.get('sbxcid');
		if (sbxcid) {
			let xcsb = await p_getXcsb(sbxcid);
			if (xcsb) {
				$('.page-body [data-f-name=sqmc]').text(xcsb.sqmc);
				$('.page-body [data-f-name=xcsb]').text(xcsb.xcsbbt);
				if (xcsb.bz) $('.page-body [data-f-name=bz]').text(xcsb.bz).closest('.cx-pair').removeClass('d-none');
			} else {
				document.querySelector('.page-action-bar button[data-cmd=save]').disabled = true;
				CxCtrl.alert('找不到该设备信息，可能已失效，请与物业确认');
			}
		} else document.querySelector('.page-action-bar button[data-cmd=save]').disabled = true;
	}
}

function p_getXcsb(sbxcid) {
	return new Promise(function(resolve, reject){
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/sbxc/getXcsb'),
		    type: "GET",
		    data: {sbxcid},
		    success: function(res, ts) {
		    	if (res.code == "0")
		    		resolve(res.data);
		    	else 
		    		resolve({code:'failed', message: '获取巡查设备信息失败：' + res.message});
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	resolve({code:'error', message: '获取巡查设备信息失败：' + msg});
		    }
		});
	});
}

function upload(el){
	if (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1') { //用于本地展示之用
		CxCtrl.alert('本地不能上传图片到微信');
	} else {
		if (!gBxcs) {
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/gz/wyhzs/bx/getBxcs'), // 同样采用报修上传参数
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
			let imgCount = $('.page-body .thumbnail-wrapper .thumbnail').length;
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
						        	let wrap = $('.page-body .thumbnail-wrapper');
						        	wrap.children('.thumbnail').removeClass('col-12 col-6 col-4 col-3').addClass(`col-${12/imgCount}`);
						        	wrap.append(`<div class="col-${12/imgCount} cx-d-i-flex-center thumbnail thumbnail-auto">
									                    <div><img src="${localIds[localIdIndex]}" onload="adjustImgSize()" style="max-width: none; max-height: 100%;"></div>
									                    <span class="cx-close circle top-right"><span><a href="javascript:;"><i class="fas fa-times"></i></a></span></span>
									                    <input type="hidden" name="xctpdz" value="${resp.serverId}">
									                </div>`);
						        	wrap.children('.thumbnail:last-child').find('img').click(function(){
										CxGz.popImg(this);
									});
						        	wrap.children('.thumbnail:last-child').find('.cx-close').click(function(){
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

function adjustImgSize() { //计算图片与容器的尺寸合图片显示最大化
	let imgCount = $('.page-body .thumbnail-wrapper .thumbnail').length;
	$('.page-body .thumbnail-wrapper').children('.thumbnail').removeClass('col-12 col-6 col-4 col-3').addClass(`col-${12/imgCount}`).find('img').each(function(){
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

function submit(e) {
	let sbxcid = CxMisc.qs.get('sbxcid');
	if (sbxcid) {
		let el=e.target, f=document.querySelector('.page-body form');
		if (CxMisc.validate(f)) {
			let data = $(f).serializeJson({removeBlankField:true});
			data.sbxcid = sbxcid;
			if (data.xctpdz) {
				if (typeof data.xctpdz === 'object') {
					for (let i=0; i<data.xctpdz.length; i++) data['xctpdz'+(i+1)] = data.xctpdz[i];
				} else {
					data['xctpdz1'] = data.xctpdz;
				}
				delete data.xctpdz;
			}
				
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/gz/wyhzs/sbxc/addXcmx'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
		        	CxMisc.markAjaxStart($(el));
		        },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxToast.info('提交成功');
			    		setTimeout(function(){ document.querySelector('.page-action-bar button[data-cmd=save]').disabled = true; }, 200);
			    	} else {
			    		CxCtrl.alert('提交失败, 请稍后重新打开：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxCtrl.alert('提交失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd($(el));
		        }
			});
		}
	}
}


function bind(){
	$('.page-title .back').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/wyhzs/sbxc');
	});
	
	$('.page-body .btn[data-cmd=upload]').click(function(e){
		upload(this);
	});
	
	$('.page-action-bar button[data-cmd=save]').click(function(e){
		submit(e);
	});
}

let gBxcs = null;
$(function(){
	adjustPageLayout();
	bind();
	prepare();
});