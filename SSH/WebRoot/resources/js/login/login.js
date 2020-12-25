function rememberme() {
	if (arguments.length==0) {
		if ($.cookie("rememberme") == "true")
			return $.cookie("rememberme") ? $.cookie("rememberme") : "false";
		return "false";
	}
	var f = document.querySelector("#loginFrm"), frm = $(f);
	if (arguments[0].init) {
		frm.submit(function(){rememberme({submit:true});});
		if ($.cookie("rememberme") == "true") {
			f.rememberme.checked = true;
			if (f.yhdm.value == "")
				f.yhdm.value = $.cookie("yhdm");
			if ($.cookie("ptlx")) $(f.ptlx).val($.cookie("ptlx"));
		} else {
			f.rememberme.checked = false;
		}
	} else if (arguments[0].submit) {
		if (f.rememberme.checked && f.yhdm.value != "") {
			$.cookie("rememberme", "true", {"expires": 3650});
			$.cookie("yhdm", f.yhdm.value, {"expires": 3650});
			$.cookie("ptlx", f.ptlx.value, {"expires": 3650});
		} else {
			$.removeCookie("rememberme");
			$.removeCookie("yhdm");
			$.removeCookie("ptlx");
		}
	}
}

function login(f) {
	$.ajax({
        url: f.action,
        type: "POST",
        data: $(f).serializeJson(),
        beforeSend: function(xhr, cfg) {
        	CxMisc.markAjaxStart($(f).find('button[type=submit]'));
        },
        success: function(data, ts) {
        	if (data.code == "0") {
        		$.cookie("current_ptlx", f.ptlx.value);
        		window.location.href = CxMisc.finalizeUrl('/home');
        	} else {
        		CxMsg.warn('登录失败：' + data.message);
        		CxMisc.markAjaxEnd($(f).find('button[type=submit]'));
        	}
        },
        error: function(xhr, ts, err) {
        	var msg = "[" + xhr.status + " : " + ts + "]";
        	CxMsg.error('登录失败：' + msg);
        	CxMisc.markAjaxEnd($(f).find('button[type=submit]'));
        }
    });
}

function checkIncomingQs() {
	let cmd = CxMisc.qs.get("cmd");
	if (cmd) {
		if (cmd == "forceLogout") CxMsg.warn("账号在另一地点登录，你被迫下线", {hide: false});
	}
	let ptlx = CxMisc.qs.get("ptlx");
	if (ptlx !== undefined) {
		ptlx = parseInt(ptlx);
		if (typeof ptlx === 'number') {
			if (ptlx >= 0) $("#loginFrm select[name=ptlx]").val(ptlx);
			$("#loginFrm select[name=ptlx]").closest('.input-group').show();
			$("#loginFrm input[name=yhdm]").closest('.input-group').removeClass('my-4').addClass('mb-3');
			$.cookie("init_ptlx", ptlx);
		} else {
			$.removeCookie("init_ptlx");
		}
		/*if (ptlx > 0) {
			$("#loginFrm select[name=ptlx]").val(ptlx).closest('.input-group').hide();
			$("#loginFrm input[name=yhdm]").closest('.input-group').removeClass('mb-3').addClass('my-4');
			$.cookie("init_ptlx", ptlx);
		} else {
			$.removeCookie("init_ptlx");
		}*/
	} else {
		$("#loginFrm select[name=ptlx]").val(2); // 不显示平台选项时默认选中社区管理
		$.removeCookie("init_ptlx");
	}
}

$(function(){
	'use strict';
	rememberme({init:true});
	checkIncomingQs();
	
	let hh = $('.header').outerHeight(true), fh = $('.main .footer').outerHeight(true);
	$('.main .content').css('min-height', `calc(100vh - ${hh}px - ${fh}px)`);
	
	$('#loginFrm').submit(function(e){
		login(this);
	});
	
	if (window.history && window.history.pushState) { // block logout go-back
		$(window).on('popstate', function () {
			window.history.pushState('forward', null, '#');
			window.history.forward(1);
		});
	}
	window.history.pushState('forward', null, '#');
	window.history.forward(1);
	let compatitive = true;
	if (/Chrome\/(\d+)/.test(navigator.userAgent)) {
		if (RegExp.$1<63) {
			compatitive = false;
			CxCtrl.alert('浏览器版本过旧，可能不能正常使用本系统<br>请更新到最新版或使用谷歌浏览器最新版');
		}
	} else {
		compatitive = false;
		CxCtrl.alert('当前浏览器不完全兼容，可能不能正常使用本系统<br>请使用谷歌浏览器或360浏览器最新版');
	}
	if (compatitive) {
		if (window.innerWidth < 1200) {
			compatitive = false;
			CxCtrl.alert('当前窗口过小，可能不能正常使用本系统<br>请放大窗口或升级显示器');
		}
	}
});