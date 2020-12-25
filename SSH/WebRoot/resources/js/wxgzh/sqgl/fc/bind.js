$(function(){
	$('.page-title .back').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl/fc');
	});
	$('.page-title .home').click(function(e){
		window.location.href = CxMisc.finalizeUrl4Wx('/gz/sqgl');
	});
	
	
	$('.page-body select[name=jgid]').change(function(){
		this.form.fczymc.disabled = this.value == '';
		let tv = $('.page-body input[data-cx-ctrl="fcxx-tree"]');
		tv.fcxxTree('refresh');
		if (tv.fcxxTree('initialized')) {
			tv.fcxxTree('clear');
		}
	});
	
	$('.page-action-bar .btn[data-cmd=bind]').click(function(e){
		bind(e);
	});
	
	loadJg();
});

function loadJg() {
	let el = document.querySelector('.page-body select[name=jgid]');
	CxMisc.ajaxwx({
	    url: CxMisc.finalizeUrl('/gz/sqgl/getJg'),
	    type: "GET",
	    beforeSend: function(xhr, cfg) {
        	el.disabled = true;
        },
	    success: function(res, ts) {
	    	if (res.code == "0" && res.data) {
    			if (res.data && res.data.length>0) {
    				for (let i=el.options.length-1; i>0; i--) el.remove(i);
    				for (let i=0; i<res.data.length; i++) {
    					el.options.add(new Option(res.data[i].sqmc, res.data[i].sqid));
    				}
    			}
	    	} else {
	    		CxCtrl.alert('查询用户绑定房产失败, 请稍后重新打开：' + res.message);
	    	}
	    },
	    error: function(xhr, ts, err) {
	    	var msg = "[" + xhr.status + " : " + ts + "]";
	    	CxCtrl.alert('查询用户绑定房产失败：' + msg);
	    },
	    complete: function(xhr, ts) {
	    	el.disabled = false;
	    	$(el).trigger('change');
        }
	});
}

function bind(e) {
	let el=e.target, f=document.querySelector('.my-property-details form');
	if (CxMisc.validate(f)) {
		if (f.fczymc.value != '') {
			let data = $(f).serializeJson({removeBlankField:true});
			delete data.fczymc; // 选中的房产资源名称不需要作为参数
			CxMisc.ajaxwx({
			    url: CxMisc.finalizeUrl('/gz/sqgl/fc/bind/addFcbind'),
			    type: "POST",
			    data: data,
			    beforeSend: function(xhr, cfg) {
		        	CxMisc.markAjaxStart($(el));
		        },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		CxNotifier.produce('绑定成功');
			    		$('.page-title .back').click(); //返回列表 
			    	} else {
			    		CxCtrl.alert('用户绑定房产失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxCtrl.alert('用户绑定房产失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	CxMisc.markAjaxEnd($(el));
		        }
			});
		} else {
			CxCtrl.alert('请选择房产');
		}
	}
}