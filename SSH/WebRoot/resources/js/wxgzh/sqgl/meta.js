


$(function(){
    'user strict';
    PNotify.defaults.styling = 'bootstrap4';
	PNotify.defaults.icons = 'fontawesome5';
	
	$(document).ready(function(){ // 禁用所有输入框的自动填充功能
		$( document ).on('focus', ':input', function(){
			if (this.nodeName.toUpperCase() == 'INPUT') $(this).attr( 'autocomplete', 'off' );
		});
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
    $(".cx-ellipsis").click(function(e){
    	var s = this.innerText;
    	if (s && s != "") {
	    	//if (this.scrollWidth > this.clientWidth) CxCtrl.alert(s, {evt:e});
	    	CxCtrl.alert(s, {evt:e});
    	}
    });

    
    $('div.modal').on('show.bs.modal', function (e) { //默认modal显示时把上次验证结果去掉
    	CxMisc.clearValidation(this);
    });
});