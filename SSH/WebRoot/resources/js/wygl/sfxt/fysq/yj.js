if (typeof window.SfScKhfysqYj === 'undefined') {
	const yjWrapper = '#wgSfScKhfysq_yj';
	const yjModalSelector = '#wgSfScKhsfsqYjModalDtls';
	const yjFrmSelector = '#wgSfScKhsfsqYjDtlsFrm';
	
	const me = window.SfScKhfysqYj = {
			jgyjlxCfg: {},
			
			getJgyjlxDj: function(sqdm, yjlxdm) {
				return new Promise(function(resolve, reject) {
					if (!yjlxdm) resolve();
					else { 
						if (!me.jgyjlxCfg[sqdm]) {
							CxMisc.ajax({
							    url: CxMisc.finalizeUrl('/wygl/sfxt/hd/getJgyjdj'),
							    type: "GET",
							    data: {sqdm},
							    beforeSend: function(xhr, cfg) {
							    	$(`${yjFrmSelector} select[name=yjlxdm]`).each(function(){this.disabled = true;});
							    },
							    success: function(res, ts) {
							    	if (res.code == "0") {
							    		me.jgyjlxCfg[sqdm] = res.data;
							    	} else CxMsg.error('查询押金类型单价设置失败：' + res.message);
							    },
							    error: function(xhr, ts, err) {
							    	var msg = "[" + xhr.status + " : " + ts + "]";
							    	CxMsg.error('查询押金类型单价设置失败：' + msg);
							    },
							    complete: function(xhr, ts) {
							    	$(`${yjFrmSelector} select[name=yjlxdm]`).each(function(){this.disabled = false;});
							    	if (me.jgyjlxCfg[sqdm]) {
							    		for (let i=0; i<me.jgyjlxCfg[sqdm].length; i++) {
							    			if (me.jgyjlxCfg[sqdm][i].yjlxdm == yjlxdm) resolve(me.jgyjlxCfg[sqdm][i].djconfig);
							    		}
							    	}
							    	resolve();
							    }
							});
						} else {
				    		for (let i=0; i<me.jgyjlxCfg[sqdm].length; i++) {
				    			if (me.jgyjlxCfg[sqdm][i].yjlxdm == yjlxdm) resolve(me.jgyjlxCfg[sqdm][i].djconfig);
				    		}
							resolve();
						}
					}
				});
			}
	}
}