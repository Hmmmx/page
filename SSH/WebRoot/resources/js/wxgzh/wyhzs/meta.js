function p_getHyxx() {
	return new Promise(function(resolve, reject){
		CxMisc.ajaxwx({
		    url: CxMisc.finalizeUrl('/gz/wyhzs/hygl/getHyxx'),
		    type: "GET",
		    success: function(res, ts) {
		    	if (res.code == "0")
		    		resolve(res.data);
		    	else 
		    		resolve({code:'failed', message: '获取会员信息失败：' + res.message});
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	resolve({code:'error', message: '获取会员信息失败：' + msg});
		    }
		});
	});
}

function adjustPageLayout(){
	let h1=$('.page-title').outerHeight(true), h2=$('.page-body').outerHeight(true), h3=$('.page-action-bar').outerHeight(true);
	if (h1+h2+h3 < window.innerHeight) $('.page-action-bar').css({position:'fixed'});
	else $('.page-action-bar').css({position:''});
}

$(function(){
    'user strict';
    PNotify.defaults.styling = 'bootstrap4';
	PNotify.defaults.icons = 'fontawesome5';
	
	// 日期控件通用设置
	if ($.fn.datetimepicker) {
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
	}
	
	$(document).ready(function(){ // 禁用所有输入框的自动填充功能
		$( document ).on('focus', ':input', function(){
			if (this.nodeName.toUpperCase() == 'INPUT') $(this).attr( 'autocomplete', 'off' );
		});
	});
	
	$('body').click(function(e){		
		//默认点击document时隐藏日期控件
		if ($(e.target).closest("div.input-group-append").attr('data-toggle')!='datetimepicker')
			if ($(e.target).closest("div.bootstrap-datetimepicker-widget").length == 0 && !(e.target.nodeName.toUpperCase()=='INPUT' && $(e.target.nextElementSibling).hasClass('bootstrap-datetimepicker-widget'))) 
				if (document.querySelector('div.bootstrap-datetimepicker-widget')) 
					if (document.querySelector('div.bootstrap-datetimepicker-widget').parentNode.querySelector('div.input-group-append')) 
						document.querySelector('div.bootstrap-datetimepicker-widget').parentNode.querySelector('div.input-group-append').click(); //document.querySelector('div.bootstrap-datetimepicker-widget').nextElementSibling.click();
    });
    
    // fix components issues
    $('.invalid-tooltip').each(function(){ // fix bootstrap issue: rounded the right border
    	if ($(this).parent().hasClass('input-group')) { 
    		$(this).prev().css({"border-top-right-radius":".25rem", "border-bottom-right-radius":".25rem"})
    			.children('.input-group-text').css({"border-top-right-radius":".25rem", "border-bottom-right-radius":".25rem"});
    		var pp = $(this).parent().children(":first-child");
    		if (pp.hasClass("input-group-prepend")) $(this).css({"left":pp.outerWidth()});
    	}
    });
    
	//设置所有的选择框初始值 
    $("select[data-selected-value]").each(function(){
        $(this).val($(this).data("selected-value").toString());
    });
    
    //设置所有的单选框初始值 
    $("div.cx-radio[data-selected-value]").each(function(){
        var tmp = $(this).attr("data-selected-value");
        $(this).find("input[type=radio]").each(function() {
            this.checked = false;
            if (this.value == tmp) {
                this.checked = true;
            }
        });
    });
    
    $(".cx-tooltip").click(function(e){
    	var m = null;
    	if (this.title.indexOf("\n") > -1) {
    		m = '<p style="text-align:left;margin:.25rem 0;">' + this.title.replace(/\n/g, '</p><p style="text-align:left;margin:.25rem 0;">') + '</p>';
    	} else m = this.title;
    	CxCtrl.alert(m, {evt:e});
    });

    
    $('div.modal').on('show.bs.modal', function (e) { //默认modal显示时把上次验证结果去掉
    	CxMisc.clearValidation(this);
    });
});