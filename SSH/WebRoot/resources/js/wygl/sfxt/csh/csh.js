if (typeof window.SfCshCsh === 'undefined') { // 可能多次载入运行，只在第一次时执行定义与赋值
	const cntrSelector = '#wgSfCshCshCntr';
	const drFrmSelector = '#wgSfCshCshUploadFrm';
	const loadingMask1 = '#wgSfCshCshCntr';
	
	const me = window.SfCshCsh = {
			bind: function() {
				CxMisc.enableFullpage(cntrSelector);
				me.loadSqList();
				
				CxMisc.enableUpload({
					url: CxMisc.finalizeUrl('/wygl/sfxt/csh/drFcxx'),
					target: `${cntrSelector} .main-content button[data-cmd=upload]`, // 启动上传的目标元素（点击该元素开始上传）
					pre: function() { return CxMisc.validate(document.querySelector(drFrmSelector)); },
					before: function(){ CxMisc.markAjaxStart($(`${cntrSelector} .main-content button[data-cmd=upload]`)); },
					done: function(){ CxMisc.markAjaxEnd($(`${cntrSelector} .main-content button[data-cmd=upload]`)); },
					success: me.successUpload,  // 成功上传后的回调函数
					accept: 'text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // 限定的上传文件类型
					maxSize: 10485760, // 单个上传文件尺寸最大值 10M
					silent: true // 表示成功时不提示信息
				}); 
			},
			
			loadSqList: function() {
				let el = document.querySelector(drFrmSelector).sqdm;
				if (el.getAttribute('data-loaded') != 'true') {
					CxMisc.ajax({
			            url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhsq'),
			            type: "GET",
			            beforeSend: function(xhr, cfg) {
			            	el.disabled = true;
			            },
			            success: function(res, ts) {
			            	if (res.code == "0") {
			            		for (let i=el.options.length-1; i>0; i--) el.remove(i);
			            		if (res.data && res.data.length>0) {
			            			for (let i=0; i<res.data.length; i++) 
			            				el.options.add(new Option(res.data[i].sqmc, res.data[i].sqdm));
			            			if (res.data.length == 1) { // 只有一个时默认直接载入收费标准
			            				el.selectedIndex = 1;
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
				} else {
					if (el.options.length == 2) { // 只有一个时社区时（第一项为请选择项），默认直接载入收费标准
	    				el.selectedIndex = 1;
	    			}
				}
			},
			
			successUpload: function(e, res){
		    	if (res.code == "0") {
		    		CxMsg.info(res.message);
		    	} else CxMsg.error(res.message);
		    },
	};
}

SfCshCsh.bind();