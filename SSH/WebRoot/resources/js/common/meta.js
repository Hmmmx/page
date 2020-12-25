/**
 * 该文件主要是处理各个页面通用的逻辑或功能（业务相关或者个别页面特有的功能不应该放在这里）
 * 例如：全局设置，通用常规表单验证，页脚位置调整等等
 * @author Stanley
 */

/*
function orientationChanged() { //等待orientationChange事件完成 最多尝试10次
    const timeout = 10;
    return new window.Promise(function(resolve) {
        const go = (i, height0) => { window.innerWidth != height0 || i >= timeout ? resolve() : window.setTimeout(() => go(i + 1, height0), 100); };
        go(0, window.innerWidth);
    });
}*/

function toggleMenuBar() {
    var sbr=$('.menu-column'), ctx=$('.content-column');
    if (CxMisc.isMobile()) {
        if (!sbr.data("width-m")) { 
            var w=sbr.innerWidth();
            if (w<160 || w>260) w = 260; //default widht is 260
            sbr.data("width-m", w);
        }
        if (!sbr.hasClass("d-md-block")) {  //可能在desktop中隐藏了菜单，重新设为默认状态
            sbr.addClass('d-md-block');
            ctx.css({"max-width": "", "flex-basis": ""}); 
            $(window).resize();
        }
        if (sbr.is(":visible")) {
            sbr.animate({"width": 0}, 'fast', function(){ $(this).addClass("d-none").css({"width": ""}); $('.header a.navbar-brand').addClass('sidebar-collapsed').removeClass('sidebar-expanded'); });
        } else {
            var i=0, interval=0.05; 
            sbr.css({"width": 0}).removeClass("d-none").animate({"width": sbr.data("width-m")}, 'fast', function(){ $(this).css({"width": ""});$('.header a.navbar-brand').addClass('sidebar-expanded').removeClass('sidebar-collapsed'); });
        }
    } else {
        //if (!sbr.hasClass("d-none")) { //可能在mobile中显示了菜单，重新设为默认状态
        //    sbr.addClass('d-none');
        //}
        if (sbr.is(":visible")) {
            sbr.data("max-width-d", sbr.css("max-width")).animate({
                'max-width':'0%'
            }, 'fast', function(){ 
            	$(this).addClass('d-none').removeClass("d-md-block").css({"max-width": ""}); 
            	ctx.data("max-width-d", ctx.css("max-width")).css({
		            'max-width':'100%',
		            "flex-basis": "auto"
		        }); 
            	$(window).resize();
            	$('.header a.navbar-brand').addClass('sidebar-collapsed').removeClass('sidebar-expanded');
            });
        } else {
            var i=0, interval=0.05; 
            sbr.css("max-width", "0%").addClass("d-md-block").animate({
                'max-width':sbr.data("max-width-d")
            }, 'fast', function(){ $(this).css("max-width", "");$('.header a.navbar-brand').addClass('sidebar-expanded').removeClass('sidebar-collapsed'); });
            ctx.animate({
                'max-width':ctx.data("max-width-d")
            }, 'fast', function(){ $(this).css({"max-width": "", "flex-basis": ""}); $(window).resize(); });
        }
    }
}

$(function(){
    'use strict';
    PNotify.defaults.styling = 'bootstrap4';
	PNotify.defaults.icons = 'fontawesome5';
	
	Vue.config.errorHandler = function (err, vm, info) {
		CxMsg.error('Vue组件异常，请重试，如果问题仍然存在，请联系技术支持检查数据是否正确: ' + err.toString());
	};
	
	// 日期控件通用设置
	$.fn.datetimepicker.Constructor.Default = $.extend({}, $.fn.datetimepicker.Constructor.Default, {
        icons: { //set icons to use Font Awesome 5
            time: 'far fa-clock', // icon-time: far fa-clock can't be shown in chrome 49
            date: 'fas fa-calendar-alt',
            up: 'fas fa-chevron-up',
            down: 'fas fa-chevron-down',
            previous: 'fas fa-chevron-left',
            next: 'fas fa-chevron-right',
            today: 'far fa-calendar-check',
            clear: 'far fa-trash-alt',
            close: 'fas fa-times'
        },
        locale: 'cn',
        date: new Date(),
        format: 'YYYY-MM-DD HH:mm',
        focusOnShow: false,
        //sideBySide: true,
        //debug: false,
        tooltips: nls.components.dtp["zh_CN"]
    });
	
	$(document).ready(function(){ // 禁用所有输入框的自动填充功能
		$( document ).on('focus', ':input', function(){
			if (this.nodeName.toUpperCase() == 'INPUT') $(this).attr( 'autocomplete', 'off' );
		});
	});
	$('body').click(function(e){
		$('[data-cx-toggle]').each(function(){ //默认点击document时隐藏所有需要点击打开的气泡
			let target = $(this.getAttribute('data-cx-toggle'));
			if (target.css("display") != 'none') target.fadeOut('fast');
		});
		
		//默认点击document时隐藏日期控件
		if ($(e.target).closest("div.input-group-append").attr('data-toggle')!='datetimepicker')
			if ($(e.target).closest("div.bootstrap-datetimepicker-widget").length == 0 && !(e.target.nodeName.toUpperCase()=='INPUT' && $(e.target.nextElementSibling).hasClass('bootstrap-datetimepicker-widget'))) 
				if (document.querySelector('div.bootstrap-datetimepicker-widget')) 
					if (document.querySelector('div.bootstrap-datetimepicker-widget').parentNode.querySelector('div.input-group-append')) 
						document.querySelector('div.bootstrap-datetimepicker-widget').parentNode.querySelector('div.input-group-append').click(); //document.querySelector('div.bootstrap-datetimepicker-widget').nextElementSibling.click();
    });
	
	$.ajaxSetup({
		timeout: 120000,
		dataType: "json", //指定返回json，否则返回html
	});
	
	$(".header a.navbar-brand").click(function(){
        toggleMenuBar();
    });
    
    $('form[data-auto-validate=true]').submit(function(e){ // 自动对每个配置的表单执行常规验证
		if ('false' != this.getAttribute('data-cancel-default')) { //默认取消浏览器的默认表单提交行为，只有显式设置为false时才不取消
	    	e.preventDefault();
			e.stopPropagation();
		}
    	if (!CxMisc.validate(this)) e.stopImmediatePropagation(); // 验证不成功时立即取消触发后续绑定的函数，也就是在相应页面js中绑定的函数不会触发
	});
    
    // 设置用户资料相关
    $("#popupUserDtlsModal").click(function(){
    	CxMisc.popUserDtlsDialog();
    });
    
    // 设置页头自动退出与修改密码
    $("#modalAutoLogout div.modal-footer button[data-cmd=reset]").click(function(){CxAutoLogout.reset();});
	$("#updatePwdFrm").submit(function(evt){
		CxMisc.submitPwd(this.querySelector('button[type=submit]'));
	});
    $("#popupUpdatePwdModal").click(function(){
    	CxMisc.popUpdatePwd();
    });
    
    $(".cx-tooltip").click(function(e){ // 点击相应元素时显示title
    	var m = null;
    	if (this.title.indexOf("\n") > -1) {
    		m = '<p style="text-align:left;margin:.25rem 0;">' + this.title.replace(/\n/g, '</p><p style="text-align:left;margin:.25rem 0;">') + '</p>';
    	} else m = this.title;
    	HsCtrl.alert(m, {evt:e});
    });
    $(".cx-ellipsis").click(function(e){ // 点击相应元素时显示隐藏的文字
    	var s = this.innerText;
    	if (s && s != "") {
	    	//if (this.scrollWidth > this.clientWidth) HsCtrl.alert(s, {evt:e});
	    	HsCtrl.alert(s, {evt:e});
    	}
    });
    
    $('div.modal').on('show.bs.modal', function (e) { //默认任何modal显示时把上次验证结果去掉
    	$(this).find("form").removeClass('was-validated');
    	$(this).find("form").find("input.is-invalid,select.is-invalid,textarea.is-invalid").removeClass('is-invalid');
	});
});