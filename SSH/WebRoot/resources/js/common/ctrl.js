/**
 * 信息提示控件，引用pnotify4作为信息提示，默认在页面右上角显示相应的信息
 * eg: CxMsg.info('Hello world');
 */
const CxMsg = {
	stackTopCenter: {
		'dir1': 'down',
		'firstpos1': 25
	},
		
	info: function(msg, options) {
		PNotify.success(Object.assign({
			title: '提示',
			text: msg,
			delay: 4000,
			icon: 'fas fa-info-circle',
			stack: CxMsg.stackTopCenter
		}, options));
	},
    warn: function(msg, options) {
    	PNotify.notice(Object.assign({
			title: '注意',
			text: msg,
			delay: 8000,
			stack: CxMsg.stackTopCenter
    	}, options));
    },
    error: function(msg, options) {
    	PNotify.error(Object.assign({
			title: '错误',
			text: msg,
			delay: 12000,
			stack: CxMsg.stackTopCenter
			// hide: false
    	}, options));
    },
    confirm: function(msg, ok, cancel) {
    	let notifier = PNotify.success({
        	title: '确认',
        	text: msg,
        	icon: 'far fa-question-circle',
        	stack: CxMsg.stackTopCenter,
        	hide: false,
        	modules: {
        		Confirm: {
        			confirm: true,
        			buttons: [{
        				text: '不打印',
        				addClass: 'btn-outline-secondary bg-color-none mt-2',
        				click: function(notice) {
        					notifier.close();
        					if (typeof cancel === 'function') cancel();
        				}
        			},{
        				text: '打印',
        				primary: true,
        				addClass: 'btn-outline-info bg-color-none mt-2',
        				click: function(notice) {
        					notifier.close();
        					if (typeof ok === 'function') ok();
        				}
        			}]
        		},
	        	Buttons: {
	        		closer: false,
	        		sticker: false
	        	},
	        	History: {
	        		history: false
	        	}
        	}
        });
    },
    
    upload: function(file, abortCb) {
    	let notifier = PNotify.success({
    	    title: '正在上传: ' + file,
    	    text: `<div class="progress">
    	    		<div class="progress-bar bg-info progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
    	    	</div>`,
    	    textTrusted: true,
    	    icon: 'fas fa-circle-notch fa-spin',
    	    hide: false,
    	    modules: {
    	    	Buttons: {
    	    		closer: true,
    	    		sticker: false
    	    	},
    	    	History: {
    	    		history: false
    	    	}
    	    }
    	});
    	if (abortCb) {
	    	$(notifier.refs.elem).find('div.ui-pnotify-closer').click(function(){
	    		abortCb();
	    	});
    	}
    	notifier.progress = function(value) {
    		if (!isNaN(value)) 
    			$(this.refs.elem).find('div.progress-bar').width(value + '%');
    	};
    	return notifier;
    }
};




/**
 * 自定义通用控件：scroll2top, alert, confirm与prompt
 * 功能上与js原生一致，显示为div层保证与页面主样式一致，且显示时不阻塞，其他js仍然可以运行
 * eg: 
 * CxCtrl.alert('是否确定？', options);  // alert暂不支持callback
 * CxCtrl.confirm('是否确定？', callback, cancelcb, options);
 * CxCtrl.prompt('请输入OK确定', callback, options);
 * 
 * callback：回复调方法，第一个参数是绑定到调用该控件时的dom对象
 * cancelcb: 可选参数，点击取消时的回调方法
 * options: 可选参数，具体设置请转到下面相应代码注释
 */
let CxCtrl = null; //全局变量，作为静态对象调用
$(function(){
    "use strict";
    CxCtrl = {
        init:function(){
            let cxAlertTmpl = `<div class="modal fade" id="cxAlertModal0927" tabindex="-1" role="dialog" aria-labelledby="cxAlertModalLabel0927" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="cxAlertModalLabel0927">提示 </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fas fa-times"></i></span>
                            </button>
                        </div>
                        <div class="modal-body cx-alert-body my-2">
                            <span>messages</span>
                        </div>
                        <div class="modal-footer cx-alert-ftr">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times"></i> <span>关闭</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="cxAlertPopover0927" class="popover bs-popover-bottom cx-popover" x-placement="bottom">
                <div class="arrow"></div>
                <h3 class="cx-popover-hdr">提示</h3>
                <div class="cx-popover-body my-2"><span>messages</span></div>
            </div>`;
            if (!document.querySelector('#cxAlertModal0927')) {
                $('body').append(cxAlertTmpl);
                $('#cxAlertPopover0927').click(function (e) { e.stopPropagation(); });
            }
            
            let cxCfrmTmpl = `<div class="modal fade" id="cxConfirmModal0927" tabindex="-1" role="dialog" aria-labelledby="cxConfirmModalLabel0927" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="cxConfirmModalLabel0927">确认</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fas fa-times"></i></span>
                            </button>
                        </div>
                        <div class="modal-body cx-alert-body my-2">
                            <span>confirm?</span>
                        </div>
                        <div class="modal-footer cx-alert-ftr">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times"></i> <span>取消</span></button>
                            <button type="button" class="btn btn-outline-primary"><i class="fas fa-check"></i> <span>确定</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="cxConfirmPopover0927" class="popover bs-popover-bottom cx-popover" x-placement="bottom">
                <div class="arrow"></div>
                <h3 class="cx-popover-hdr">确认</h3>
                <div class="cx-popover-body my-2"><span>messages</span></div>
                <div class="cx-popover-ftr">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="confirm"><i class="fas fa-times"></i> <span>取消</span></button>
                    <button type="button" class="btn btn-outline-primary"><i class="fas fa-check"></i> <span>确定</span></button>
                </div>
            </div>`;
            if (!document.querySelector('#cxConfirmModal0927')) {
                $('body').append(cxCfrmTmpl);
                $('#cxConfirmPopover0927').click(function (e) { e.stopPropagation(); });
                $('#cxConfirmPopover0927 button[data-dismiss=confirm]').click(function(){$('#cxConfirmPopover0927').css({"display":"none"});});
            }
            
            let cxPromptTmpl = `<div class="modal fade" id="cxPromptModal0927" tabindex="-1" role="dialog" aria-labelledby="cxPromptModalLabel0927" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <form novalidate> 
                            <div class="modal-header">
                                <h5 class="modal-title" id="cxPromptModalLabel0927">确认</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col mt-2 mb-3">
                                            <div>
                                                <label for="cxPromptValidationTooltip0927">请输入并确认</label>
                                                <input type="text" class="form-control" id="cxPromptValidationTooltip0927" name="value" placeholder="" autocomplete="off" required>
                                                <div class="invalid-tooltip" data-def-msg="不能为空">不能为空</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer cx-alert-ftr">
                                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times"></i> <span>取消</span></button>
                                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check"></i> <span>确定</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="cxPromptPopover0927" class="popover bs-popover-bottom cx-popover" x-placement="bottom">
                <div class="arrow"></div>
                <form novalidate>
                    <h3 class="cx-popover-hdr">确认</h3>
                    <div class="cx-popover-body cx-popover-prompt">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col mt-2 mb-3">
                                    <div>
                                        <label for="cxPromptValidationTooltip09272">请输入并确认</label>
                                        <input type="text" class="form-control" id="cxPromptValidationTooltip09272" name="value" placeholder="" autocomplete="off" required>
                                        <div class="invalid-tooltip" data-def-msg="不能为空">不能为空</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cx-popover-ftr">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="prompt"><i class="fas fa-times"></i> <span>取消</span></button>
                        <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check"></i> <span>确定</span></button>
                    </div>
                </form>
            </div>`;
            if (!document.querySelector('#cxPromptModal0927')) {
                $('body').append(cxPromptTmpl);
                $('#cxPromptPopover0927').click(function (e) { e.stopPropagation(); });
                $('#cxPromptPopover0927 button[data-dismiss=prompt]').click(function(){$('#cxPromptPopover0927').css({"display":"none"});});
            
                let f = document.querySelector('#cxPromptModal0927 form');
                f.addEventListener('submit', function(evt) {
                    f.checkValidity();
                    evt.preventDefault();
                    evt.stopPropagation();
                    f.classList.add('was-validated');
                }, false);
                $('#cxPromptModal0927').on('shown.bs.modal', function (e) {
                    document.querySelector('#cxPromptModal0927 .modal-body input').select();
                });
            
                let f2 = document.querySelector('#cxPromptPopover0927 form');
                f2.addEventListener('submit', function(evt) {
                    f2.checkValidity();
                    evt.preventDefault();
                    evt.stopPropagation();
                    f2.classList.add('was-validated');
                }, false);
                $('#cxPromptPopover0927').on('shown.hs.prompt', function (e) {
                    document.querySelector('#cxPromptPopover0927 .cx-popover-body input').select();
                });
            }
            // 返回顶部
            let cxCbrTmpl = `<div id="cxCbr0927" class="cx-cbr">
                <div title="返回顶部" class="cx-scroll2top">
                    <a href="javascript:;"><i class="fas fa-angle-up"></i></a>
                </div>
            </div>`;
            if (!document.querySelector('#cxCbr0927')) $('body').append(cxCbrTmpl);
            $('.cx-scroll2top').scroll2Top(300); // back to top
    
            CxCtrl.refresh(); //绑定页面配置控件的事件
            $('body').click(function(e){ //默认点击body时隐藏弹出确认框
                CxCtrl.hide();
            });
        },
        refresh: function() {
            $('[data-cx-ctrl=alert]').unbind().click(function(e){
                CxCtrl.alert($(this).data("msg"), {
                    evt:e, 
                    placement:this.getAttribute("data-placement")
                });
            });
            $('[data-cx-ctrl=confirm]').unbind().click(function(e){
                CxCtrl.confirm($(this).data("msg"), $(this).data("on-confirm"), {
                    evt:e, 
                    src: this,
                    placement:this.getAttribute("data-placement"),
                    value:this.getAttribute("data-value")
                });
            });
            $('[data-cx-ctrl=prompt]').unbind().click(function(e){
                CxCtrl.prompt($(this).data("msg"), $(this).data("on-confirm"), {
                    evt:e, 
                    src: this,
                    placement:this.getAttribute("data-placement"),
                    value:this.getAttribute("data-value"),
                    validate:{pattern:this.getAttribute("data-pattern"),errorMsg:this.getAttribute("data-errorMsg")}
                });
            });
        },
        hide: function(){
            if (document.querySelector('#cxAlertPopover0927').style.display != 'none') document.querySelector('#cxAlertPopover0927').style.display = "none";
            if (document.querySelector('#cxConfirmPopover0927').style.display != 'none') document.querySelector('#cxConfirmPopover0927').style.display = "none";
            if (document.querySelector('#cxPromptPopover0927').style.display != 'none') document.querySelector('#cxPromptPopover0927').style.display = "none";
        },
        alert: function (m) {
            let op=null;
            if (arguments.length==2) if (typeof arguments[1] ==='object') op=arguments[1];
            if (CxMisc.isMobile() || !op || (op && (op.forceModal || !op.evt))) {
                //if (t) document.querySelector('#cxAlertModal0927 .modal-title').innerHTML = t;
                if (typeof m === 'string') document.querySelector('#cxAlertModal0927 .modal-body').innerHTML = m;
                else if (typeof m === 'object') { //[{name:"",value:""},...]
                    let s='<dl class="row mb-0">';
                    for (let i=0; i<m.length; i++){
                        s += '<dt class="col-6 text-right">' + m[i].name + '</dt><dd class="col-6 text-left mb-0">' + m[i].value + '</dd>';
                    }
                    s += '</dl>';
                    document.querySelector('#cxAlertModal0927 .modal-body').innerHTML = s;
                }
                $('#cxAlertModal0927').modal('show');
            } else {
                if (op && op.evt) {
                    op.evt.stopPropagation();
                    let el = document.querySelector('#cxAlertPopover0927'), target=$(el);
                    target.css({left: 0, top:0}); //有时如果弹出框超出页面外，会造成自动换行或缩小，需要调整到原始大小重新计算尺寸
                    if (typeof m === 'string') el.querySelector('.cx-popover-body').innerHTML = m;
                    else if (typeof m === 'object') { //[{name:"",value:""},...]
                        let s='<dl class="row mb-0">';
                        for (let i=0; i<m.length; i++){
                            s += '<dt class="col-6 text-right">' + m[i].name + '</dt><dd class="col-6 text-left mb-0">' + m[i].value + '</dd>';
                        }
                        s += '</dl>';
                        el.querySelector('.cx-popover-body').innerHTML = s;
                    }
                    let t = $(op.evt.target);
                    let x=t.offset().left, y=t.offset().top, w=t.outerWidth(), h=t.outerHeight();
                    let w1=target.outerWidth(), h1=target.outerHeight();
                    if ('top' == op.placement) {
                        let l1=x+w/2-w1/2, t1=y-h1-8, ww=$(window).width();// 箭头在下向上调整.5rem
                        let l2=w1/2-16; // 调整1rem
                        if (w1 < ww) { //调整位置保持在窗口显示范围内
                            while (l1+w1 >= ww) {l1 -= 10;l2 += 10; if (l2 >= w1-32) break;}
                            while (l1 <= 0) {l1 += 10;l2 -= 10; if (l2 <= 32) break;}
                        }
                        target.attr("x-placement", "top")
                                .removeClass("bs-popover-left bs-popover-right bs-popover-bottom").addClass("bs-popover-top")
                                .css({left: l1, top:t1});// 箭头在下向上调整.5rem
                        target.children('.arrow').css({left: l2, top:""}); // 调整1rem
                    } else if ('left' == op.placement) {
                        target.attr("x-placement", "left")
                                .removeClass("bs-popover-right bs-popover-top bs-popover-bottom").addClass("bs-popover-left")
                                .css({left: x-w1-8, top:y+h/2-h1/2});// 箭头在左向右调整.5rem
                        target.children('.arrow').css({left:"", top: h1/2-16}); // 调整1rem
                    } else if ('right' == op.placement) {
                        target.attr("x-placement", "right")
                                .removeClass("bs-popover-left bs-popover-top bs-popover-bottom").addClass("bs-popover-right")
                                .css({left: x+w, top:y+h/2-h1/2});
                        target.children('.arrow').css({left:"", top: h1/2-16}); // 调整1rem
                    } else {
                        let l1=x+w/2-w1/2, t1=y+h, ww=$(window).width();// 箭头在下向上调整.5rem
                        let l2=w1/2-16; // 调整1rem
                        if (w1 < ww) { //调整位置保持在窗口显示范围内
                            while (l1+w1 >= ww) {l1 -= 10;l2 += 10; if (l2 >= w1-32) break;}
                            while (l1 <= 10) {l1 += 10;l2 -= 10; if (l2 <= 32) break;}
                        }
                        target.attr("x-placement", "bottom")
                                .removeClass("bs-popover-left bs-popover-right bs-popover-top").addClass("bs-popover-bottom")
                                .css({left: l1, top:t1});
                        target.children('.arrow').css({left: l2, top:""}); // 箭头向上调整1rem
                    }
                    target.fadeIn('fast');
                }
            }
        },
        confirm: function (m, cb) { //op: {src:.., forceModal:..,evt:..,placement:..,placement:..,btn:["",..]}
            let op=null,cancelcb=null;
            if (arguments.length==3) {
            	if (typeof arguments[2] ==='function') cancelcb=arguments[2];
            	else if (typeof arguments[2] ==='object') op=arguments[2];
            } else if (arguments.length==4) { if (typeof arguments[2] ==='function') cancelcb=arguments[2]; if (typeof arguments[3] ==='object') op=arguments[3]; }
            var btn1="取消", btn2="确定";
            if (op && op.btn) {btn1= op.btn[0]; btn2=op.btn[1]; }
            if (!op || !op.forcePopup && CxMisc.isMobile() || (op && (op.forceModal || !op.evt&&!op.src))) {
                //if (t) document.querySelector('#cxConfirmModal0927 .modal-title').innerHTML = t;
                document.querySelector('#cxConfirmModal0927 .modal-body').innerHTML = m;
                $('#cxConfirmModal0927 button.btn-outline-primary').unbind().click(function(){
                    if (typeof cb === 'string') {
                        if (cb.indexOf('(') > 0) { eval(cb); } else { 
                        	if (op && op.src) eval(cb+'(op.src)'); 
                        	else eval(cb+'()'); 
                        }
                    } else if (typeof cb === 'function') {
                    	if (op && op.src) cb(op.src); 
                    	else cb();
                    }
                    $('#cxConfirmModal0927').modal('hide');
                }).children("span").text(btn2);
                if (cancelcb) {
                	$('#cxConfirmModal0927 button.btn-outline-secondary').unbind().click(function(){
                        if (typeof cancelcb === 'string') {
                            if (cancelcb.indexOf('(') > 0) { eval(cancelcb); } else { 
                            	if (op && op.src) eval(cancelcb+'(op.src)'); 
                            	else eval(cancelcb+'()'); 
                            }
                        } else if (typeof cancelcb === 'function') {
                        	if (op && op.src) cancelcb(op.src); 
                        	else cancelcb();
                        }
                    }).children("span").text(btn1);
                } else {
                	$('#cxConfirmModal0927 button.btn-outline-secondary').unbind().click(function(){
                		$(this).closest(".modal").modal("hide");
                	}).children("span").text(btn1);
                }
                $('#cxConfirmModal0927').modal('show');
            } else {
                if (op) {
                    if (op.evt) op.evt.stopPropagation();
                    let el = document.querySelector('#cxConfirmPopover0927'), target=$(el);
                    target.css({left: 0, top:0}); //有时如果弹出框超出页面外，会造成自动换行或缩小，需要调整到原始大小重新计算尺寸
                    //if (t) el.querySelector('.cx-popover-hdr').innerHTML = t;
                    el.querySelector('.cx-popover-body').innerHTML = m;
                    target.find('button.btn-outline-primary').unbind().click(function(){
                        if (typeof cb === 'string') {
                            if (cb.indexOf('(') > 0) { eval(cb); } else { 
                            	if (op && op.src) eval(cb+'(op.src)'); 
                            	else eval(cb+'()'); 
                            }
                        } else if (typeof cb === 'function') {
                        	if (op && op.src) cb(op.src); 
                        	else cb();
                        }
                        $('#cxConfirmPopover0927').fadeOut('fast');
                    }).children("span").text(btn2);
                    if (cancelcb) {
                    	target.find('button.btn-outline-secondary').unbind().click(function(){
                            if (typeof cancelcb === 'string') {
                                if (cancelcb.indexOf('(') > 0) { eval(cancelcb); } else { 
                                	if (op && op.src) eval(cancelcb+'(op.src)'); 
                                	else eval(cancelcb+'()'); 
                                }
                            } else if (typeof cancelcb === 'function') {
                            	if (op && op.src) cancelcb(op.src); 
                            	else cancelcb();
                            }
                        }).children("span").text(btn1);
                    } else {
                    	target.find('button.btn-outline-secondary').unbind().click(function(){
                    		CxCtrl.hide();//$(this).closest(".popover").popover("hide");
                    	}).children("span").text(btn1);
                    }
                    let t = $(op.src?op.src:op.evt.target);
                    if (t) {
	                    let x=t.offset().left, y=t.offset().top, w=t.outerWidth(), h=t.outerHeight();
	                    let w1=target.outerWidth(), h1=target.outerHeight();
	                    if ('top' == op.placement) {
	                        let l1=x+w/2-w1/2, t1=y-h1-8, ww=$(window).width();// 箭头在下向上调整.5rem
	                        let l2=w1/2-16; // 调整1rem
	                        if (w1 < ww) { //调整位置保持在窗口显示范围内
	                            while (l1+w1 >= ww) {l1 -= 10;l2 += 10; if (l2 >= w1-32) break;}
	                            while (l1 <= 0) {l1 += 10;l2 -= 10; if (l2 <= 32) break;}
	                        }
	                        target.attr("x-placement", "top")
	                                .removeClass("bs-popover-left bs-popover-right bs-popover-bottom").addClass("bs-popover-top")
	                                .css({left: l1, top:t1});// 箭头在下向上调整.5rem
	                        target.children('.arrow').css({left: l2, top:""}); // 调整1rem
	                    } else if ('left' == op.placement) {
	                        target.attr("x-placement", "left")
	                                .removeClass("bs-popover-right bs-popover-top bs-popover-bottom").addClass("bs-popover-left")
	                                .css({left: x-w1-8, top:y+h/2-h1/2});// 箭头在左向右调整.5rem
	                        target.children('.arrow').css({left:"", top: h1/2-16}); // 调整1rem
	                    } else if ('right' == op.placement) {
	                        target.attr("x-placement", "right")
	                                .removeClass("bs-popover-left bs-popover-top bs-popover-bottom").addClass("bs-popover-right")
	                                .css({left: x+w, top:y+h/2-h1/2});
	                        target.children('.arrow').css({left:"", top: h1/2-16}); // 调整1rem
	                    } else {
	                        let l1=x+w/2-w1/2, t1=y+h, ww=$(window).width();// 箭头在下向上调整.5rem
	                        let l2=w1/2-16; // 调整1rem
	                        if (w1 < ww) { //调整位置保持在窗口显示范围内
	                            while (l1+w1 >= ww) {l1 -= 10;l2 += 10; if (l2 >= w1-32) break;}
	                            while (l1 <= 10) {l1 += 10;l2 -= 10; if (l2 <= 32) break;}
	                        }
	                        target.attr("x-placement", "bottom")
	                                .removeClass("bs-popover-left bs-popover-right bs-popover-top").addClass("bs-popover-bottom")
	                                .css({left: l1, top:t1});
	                        target.children('.arrow').css({left: l2, top:""}); // 箭头向上调整1rem
	                    }
	                    target.fadeIn('fast');
                    }
                }
            }
        },
        prompt: function (m, cb) { //cb(v, src);  //op: {src:.., forceModal:..,evt:..,placement:..,value:..,validate:..}
            let op=null;
            if (arguments.length==3) if (typeof arguments[2] ==='object') op=arguments[2];
            if (CxMisc.isMobile() || !op || (op && (op.forceModal || !op.evt))) {
                let el = document.querySelector('#cxPromptModal0927'), target=$(el);
                //if (t) el.querySelector('.modal-title').innerHTML = t;
                el.querySelector('.modal-body label').innerHTML = m;
                target.find('button.btn-outline-primary').unbind().click(function(){
                    if (this.form.checkValidity()) {
                        if (typeof cb === 'string') {
                            if (cb.indexOf('(') > 0) { eval(cb); } else { 
                                if (op && op.src) eval(cb+'("'+ this.form.value.value.trim() +'", op.src)'); 
                                else eval(cb+'("'+ this.form.value.value.trim() +'")'); 
                            }
                        } else if (typeof cb === 'function') {
                        	if (op && op.src) cb(this.form.value.value.trim(), op.src);
                            else cb(this.form.value.value.trim());
                        }
                        $('#cxPromptModal0927').modal('hide');
                    }
                });
                if (op) {
                    if (op.value) el.querySelector('.modal-body input').value = op.value;
                    else el.querySelector('.modal-body input').value = "";
                    if (op.validate && op.validate.pattern) {
                        el.querySelector('.modal-body input').pattern = op.validate.pattern;
                        el.querySelector('.modal-body .invalid-tooltip').innerHTML = op.validate.errorMsg;
                    } else {
                        el.querySelector('.modal-body input').removeAttribute('pattern');
                        el.querySelector('.modal-body .invalid-tooltip').innerHTML = el.querySelector('.modal-body .invalid-tooltip').getAttribute("data-def-msg");
                    }
                }
                target.find('form').removeClass('was-validated');
                target.modal('show');
            } else {
                if (op && op.evt) {
                    op.evt.stopPropagation();
                    let el = document.querySelector('#cxPromptPopover0927'), target=$(el);
                    target.css({left: 0, top:0}); //有时如果弹出框超出页面外，会造成自动换行或缩小，需要调整到原始大小重新计算尺寸
                    //if (t) el.querySelector('.cx-popover-hdr').innerHTML = t;
                    el.querySelector('.cx-popover-body label').innerHTML = m;
                    target.find('button.btn-outline-primary').unbind().click(function(){
                        if (this.form.checkValidity()) {
                            if (typeof cb === 'string') {
                                if (cb.indexOf('(') > 0) { eval(cb); } else { 
                                    if (op && op.src) eval(cb+'("'+ this.form.value.value.trim() +'", op.src)'); 
                                    else eval(cb+'("'+ this.form.value.value.trim() +'")'); 
                                }
                            } else if (typeof cb === 'function') {
                            	if (op && op.src) cb(this.form.value.value.trim(), op.src);
                                else cb(this.form.value.value.trim());
                            }
                            $('#cxPromptPopover0927').fadeOut('fast');
                        }
                    });
                    let t = $(op.src?op.src:op.evt.target);
                    let x=t.offset().left, y=t.offset().top, w=t.outerWidth(), h=t.outerHeight();
                    let w1=target.outerWidth(), h1=target.outerHeight();
                    if ('top' == op.placement) {
                        let l1=x+w/2-w1/2, t1=y-h1-8, ww=$(window).width();// 箭头在下向上调整.5rem
                        let l2=w1/2-16; // 调整1rem
                        if (w1 < ww) { //调整位置保持在窗口显示范围内
                            while (l1+w1 >= ww) {l1 -= 10;l2 += 10; if (l2 >= w1-32) break;}
                            while (l1 <= 0) {l1 += 10;l2 -= 10; if (l2 <= 32) break;}
                        }
                        target.attr("x-placement", "top")
                                .removeClass("bs-popover-left bs-popover-right bs-popover-bottom").addClass("bs-popover-top")
                                .css({left: l1, top:t1});
                        target.children('.arrow').css({left: l2, top:""});
                    } else if ('left' == op.placement) {
                        target.attr("x-placement", "left")
                                .removeClass("bs-popover-right bs-popover-top bs-popover-bottom").addClass("bs-popover-left")
                                .css({left: x-w1-8, top:y+h/2-h1/2});// 箭头在左向右调整.5rem
                        target.children('.arrow').css({left:"", top: h1/2-16}); // 调整1rem
                    } else if ('right' == op.placement) {
                        target.attr("x-placement", "right")
                                .removeClass("bs-popover-left bs-popover-top bs-popover-bottom").addClass("bs-popover-right")
                                .css({left: x+w, top:y+h/2-h1/2});
                        target.children('.arrow').css({left:"", top: h1/2-16}); // 调整1rem
                    } else {
                        let l1=x+w/2-w1/2, t1=y+h, ww=$(window).width();// 箭头在下向上调整.5rem
                        let l2=w1/2-16; // 调整1rem
                        if (w1 < ww) { //调整位置保持在窗口显示范围内
                            while (l1+w1 >= ww) {l1 -= 10;l2 += 10; if (l2 >= w1-32) break;}
                            while (l1 <= 0) {l1 += 10;l2 -= 10; if (l2 <= 32) break;}
                        }
                        target.attr("x-placement", "bottom")
                                .removeClass("bs-popover-left bs-popover-right bs-popover-top").addClass("bs-popover-bottom")
                                .css({left: l1, top:t1});
                        target.children('.arrow').css({left: l2, top:""}); // 箭头向上调整1rem
                    }
                    if (op.value) {
                        el.querySelector('.cx-popover-body input').value = op.value;
                    } else el.querySelector('.cx-popover-body input').value = "";
                    if (op.validate && op.validate.pattern) {
                        el.querySelector('.cx-popover-body input').pattern = op.validate.pattern;
                        el.querySelector('.cx-popover-body .invalid-tooltip').innerHTML = op.validate.errorMsg;
                    } else {
                        el.querySelector('.cx-popover-body input').removeAttribute('pattern');
                        el.querySelector('.cx-popover-body .invalid-tooltip').innerHTML = el.querySelector('.cx-popover-body .invalid-tooltip').getAttribute("data-def-msg");
                    }
                    target.find('form').removeClass('was-validated');
                    target.fadeIn('fast', function(e){
                        $('#cxPromptPopover0927').trigger("shown.hs.prompt");
                    });
                }
            }
        }
    };

    CxCtrl.init(); //初始化自定义控件
});

/**
 * jQuery插件：回到页顶
 * eg: $('#target').scroll2Top();
 */
(function(a){a.fn.scroll2Top=function(c){var d={speed:800};c&&a.extend(d,{speed:c});return this.each(function(){var b=a(this);a(window).scroll(function(){100<a(this).scrollTop()?b.css("display", "flex"):b.fadeOut();});b.click(function(b){b.preventDefault();a("body, html").animate({scrollTop:0},d.speed);});});};})(jQuery);


/**
 * suggest plugin
 * 暂全支持单行input=text，上下移动光标时自动选中可选的项；多行input或textarea可能对于上下移动光标时会与默认行为冲突
 * 此时需设置autoSelect为false；自定义method时也要设置autoSelect为false
 */ 
$(function(){
    "use strict";
    var methods = {
        refresh: function(){
        	this.attr("data-expired", true);
        },
    	text: function() {
            return this.val().trim();
        },
        clear: function() {
        	this.val("");
        	this.removeAttr("data-value");
        },
        valid: function() {
        	var $this = this[0];
            if ($this.opts.validate) return !this.hasClass($this.opts.invalidClass);
            else return true;
        },
        value: function(item) {
        	var $this = this[0];
        	if (item) {
        		$this.value = item.text;
                if (item.value !== undefined && item.value !== null) $this.setAttribute("data-value", item.value);
                if (typeof $this.opts.method == "function") {
                	$this.opts.method($this, item);
                }
        	} else {
	            if ($this.getAttribute("data-value")) return {value:$this.getAttribute("data-value"), text:$this.value};
	            else return {text: $this.value};
        	}
        },

        _activeItem: function(el) {
            this.opts.suggestCntr.children("a.selected").removeClass("selected");
            $(el).addClass("selected");
        },
        _hiliteItem: function(moveUp){
            var currItem = this.opts.suggestCntr.children("a.selected");
            currItem.removeClass("selected");
            var tmp = null;
            if (moveUp) {
                tmp = currItem.prev();
                if (tmp.length == 0) {
                    tmp = this.opts.suggestCntr.children("a:last-child");
                }
            } else {
                tmp = currItem.next();
                if (tmp.length == 0) {
                    tmp = this.opts.suggestCntr.children("a:first-child");
                }
            }
            tmp.addClass("selected");
        },
        _selectItem: function(keepOpen){
            /*if (this.opts.method == "reset") {
                this.value = this.opts.suggestCntr.children("a.selected").text();
                if (this.opts.suggestCntr.children("a.selected").data("value") !== null) this.setAttribute("data-value", this.opts.suggestCntr.children("a.selected").data("value"));
            } else if (typeof this.opts.method == "function") {
                this.opts.method(this, {value:this.opts.suggestCntr.children("a.selected").data("value"), text:this.opts.suggestCntr.children("a.selected").text()});
            }*/
            this.value = this.opts.suggestCntr.children("a.selected").text();
            if (this.opts.suggestCntr.children("a.selected").data("value") !== null) this.setAttribute("data-value", this.opts.suggestCntr.children("a.selected").data("value"));
            if (typeof this.opts.method == "function") {
                this.opts.method(this, {value:this.opts.suggestCntr.children("a.selected").data("value"), text:this.opts.suggestCntr.children("a.selected").text()});
            }
            if (!keepOpen) methods._hide.call(this);
        },

        _callback: function(err, data) {
            if (err) {
                console.error(err);
                //CxMsg.error('处理获取异常', err);
            } else {
                methods._update.call(this, data);
            }
        },
        _hide: function() {
            return $(this).each(function() {
                this.opts.suggestCntr.css("display", "none");
                this.opts.showing = false;
            });
        },
        _process: function() {
            if (this.opts.processWatcher) {
                window.clearTimeout(this.opts.processWatcher);
                this.opts.processWatcher = 0;
            }
            let $this = this;
            if (this.opts.processing) {
                this.opts.processWatcher = window.setTimeout(function(){
                    methods._process.call($this);
                },200);
			} else {
                this.opts.processing = true;
                methods._show.call(this);
                if (this.value == "") { //开始时无输入查询条件时，清空列表
                    this.opts.suggestCntr.empty();
                }
                // $(this.opts.suggestCntr).mask('show', {msg: '查询中，请稍候...'});
                this.opts.suggestCntr.addClass("cx-loading");
                if (this.opts.fetch) {
                    this.opts.fetch(this.value.trim(), function (err, data) {
                        $this.opts.processing = false;
                        // $($this.opts.suggestCntr).mask('hide');
                        $this.opts.suggestCntr.removeClass("cx-loading");
                        methods._callback.call($this, err, data);
                    }, this);
                }
            }
        },
        _show: function() {
            return $(this).each(function() {
                if ($(this).closest('div.modal').length > 0) {
                	this.opts.suggestCntr.css("z-index", 1051); //目标元素在modal中
                	this.opts.loadingIndicator.css("z-index", 1051);
                } else {
                	this.opts.suggestCntr.css("z-index", "auto"); //目标元素默认在body中
                	this.opts.loadingIndicator.css("z-index", "auto");
                }
                /*let t = $(this).offset().top + $(this).outerHeight(); //暂固定显示在下则，因为高度会随着查询结果内容多少变动
                this.opts.suggestCntr.width($(this).outerWidth()-2); //暂不 调整.5rem border width=1
                this.opts.suggestCntr.css("top", t);
                this.opts.suggestCntr.css("left", $(this).offset().left); //暂不 调整.25rem - border width 4-1
                */
                var self = $(this), parent = self.parent();
            	let t = self.outerHeight()+2; //暂固定显示在下则，因为高度会随着查询结果内容多少变动
            	let l = Math.floor((parent.innerWidth() - parent.width())/2);
                this.opts.suggestCntr.width($(this).outerWidth()-2); //暂不 调整.5rem border width=1
                this.opts.suggestCntr.css("top", t);
                this.opts.suggestCntr.css("left", l); //暂不 调整.25rem - border width 4-1
                this.opts.suggestCntr.css("display", "block");
                
                this.opts.loadingIndicator.css("right", l+1);

                this.opts.showing = true;
            });
        },
        _update: function(data) {
            return $(this).each(function() {
                if (this.opts.suggestCntr) {
                    this.opts.data = data; //缓存上一次查询的数据
                    this.opts.suggestCntr.empty();
                    if (data && data.length > 0) {
                        let s = this.value.trim(), matched=false;
                        let len = this.opts.maxItems < data.length ? this.opts.maxItems : data.length;
                        //if (CxMisc.isMobile() && len>6) len = 6; //手机下只显示最多6条 
                        for(let i=0; i<len; i++){
                            this.opts.suggestCntr.append('<a href="javascript:;"></a>', {"href": "javascript:;"});
                            let ci = this.opts.suggestCntr.children(":last-child");
                            ci.text(data[i].text);
                            if (data[i].value !== undefined) ci.attr("data-value", data[i].value); //data[i].value && data[i].value != ""
                            if (s != "") {
                                if (ci.text() == s) { //如果结果中有匹配的项，自动选中
                                    ci.addClass("selected"); 
                                    methods._selectItem.call(this, this.opts.showing);
                                    matched=true;
                                }
                                ci.html(ci.html().replace(new RegExp("("+CxMisc.escapeRegexp(CxMisc.escapeHtml(s))+")",'gi'), "<span>$1</span>"));
                            }
                        }
                        let $this = this;
                        this.opts.suggestCntr.find("a").each(function(){
                            $(this).click(function(){
                                methods._activeItem.call($this, this);
                                methods._selectItem.call($this);
                                if ($this.opts.validate) methods._validate.call($this);
                            });
                        });
                        this.opts.suggestCntr.mouseenter(function(){$this.opts.hovering = true;});
                        this.opts.suggestCntr.mouseleave(function(){$this.opts.hovering = false;});
                        if (!matched) {
                            this.opts.suggestCntr.find("a:first-child").addClass("selected");
                        }
                    } else {
                        this.opts.suggestCntr.append('<div class="text-black-50 text-center mt-1 mb-1" style="font-size:12px;">无匹配数据，请输入或修改查询条件</div>');
                        //if (this.opts.showing) methods._hide.call(this);
                    }
                }
            });
        },
        _validate: function(){
            if (this.opts.validate) {
                let s = this.value.trim();
                if (s == "") {
                    if (!this.required) $(this).removeClass(this.opts.invalidClass);
                } else {
                    let valid = false;
                    if (this.opts.data) {
                        for (let i=0; i<this.opts.data.length; i++) {
                            if (this.opts.data[i].text == s) { valid=true; break; }
                        }
                    }
                    if (valid) $(this).removeClass(this.opts.invalidClass);
                    else $(this).addClass(this.opts.invalidClass);
                }
            }
        },

        _init: function(options) {
            return this.each(function(){
                if (!this.opts){
                    this.setAttribute("autocomplete", "off");

                    var dp = eval("("+$(this).data("param")+")");
                    this.opts = $.extend({}, $.fn.suggest.defaults, dp, options);

                    if (this.opts.init) {
                    	if (typeof this.opts.init === 'function') {
                            this.opts.init(this);
                        } else if (typeof this.opts.init === 'object') {
                            this.value = this.opts.init.text;
                            if (this.opts.init.value) this.setAttribute("data-value", this.opts.init.value);
                        }
                    }
                    if (!this.opts.suggestCntr) {
                        if (!this.parentNode.querySelector('div.cx-suggest')) {
                            $(this.parentNode).append('<div class="cx-suggest"></div>');
                        }
                        this.opts.suggestCntr = $(this.parentNode.querySelector('div.cx-suggest'));
                    }
                    if (!this.opts.loadingIndicator) {
                    	if (!this.parentNode.querySelector('div.cx-suggest-loading')) {
                            $(this.parentNode).append('<div class="cx-suggest-loading"><i class="'+this.opts.loadingClass+'"></i></div>');
                        }
                        this.opts.loadingIndicator = $(this.parentNode.querySelector('div.cx-suggest-loading'));
                    }

                    $(this).on("input", function (){
                        if (this.getAttribute("data-value")) {
                            this.removeAttribute("data-value");
                        }
                        if (this.opts.typingWatcher) { window.clearTimeout(this.opts.typingWatcher); this.opts.typingWatcher=0; }
                        let $this = this;
                        this.opts.typingWatcher = window.setTimeout(function(){
                            methods._process.call($this);
                        },400);
                    }).keydown(function(event) {
                        if (this.opts.processing) {
                            if (event.keyCode == 13) event.preventDefault();
                        } else {
                            if (event.keyCode == 13) {
                                if (this.opts.showing) {
                                    methods._selectItem.call(this);
                                    event.preventDefault();
                                }
                            } else if (event.keyCode == 38 || event.keyCode == 40) {
                                if (this.opts.showing) {
                                    methods._hiliteItem.call(this, event.keyCode == 38);
                                    if (this.opts.autoSelect) methods._selectItem.call(this, true);
                                }
                            }
                        }
                    }).keyup(function(event) {
                        if (!this.opts.processing) {
                            if (event.keyCode == 27) {
                                if (this.opts.showing) {
                                    methods._hide.call(this);
                                }
                            }
                        }
                    }).focus(function(){
                    	if (this.getAttribute("data-expired")) {
                    		this.removeAttribute("data-expired");
                    		methods._process.call(this);
                    	} else {
	                        if (this.opts.data) {
	                            if (!this.opts.showing) methods._show.call(this);
	                            methods._update.call(this, this.opts.data);
	                        } else if (!this.opts.processing) methods._process.call(this);
                    	}
                    }).blur(function(){
                        if (!this.opts.processing) {
                            if (this.opts.showing && !this.opts.hovering) {
                                methods._hide.call(this);
                            }
                        }
                        if (this.opts.validate) methods._validate.call(this);
                    }).click(function(){
                    	if (this.getAttribute("data-expired")) {
                    		this.removeAttribute("data-expired");
                    		methods._process.call(this);
                    	} else {
	                        if (this.opts.data) {
	                            if (!this.opts.showing) methods._show.call(this);
	                            methods._update.call(this, this.opts.data);
	                        }
                    	}
                    });
                }
            });
        }
    };
    $.fn.suggest = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods._init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist!');
        }
    };
    
    $.fn.suggest.defaults = {
        fetch: undefined, //fetch(v, cb) 是用来获取数据的外部接口方法，v是当前输入框值，cb是查询完成时回调函数 cb(err, data), 返回数据data格式必做是 [{value:..., text:...},{}...]，其中value可省略
        method: "reset", // 选择后更新输入框的方法:reset 或 传入一个function(item){...}
        maxItems: 10, //最大显示项数
        init: null, // {value:..., text:...} 其中value可省略
        validate: true, //是否需要验证数据: 验证最后一次查询返回的数据列表中是否存在与输入框相同字符串的项
        invalidClass: "is-invalid",
        loadingClass: "fas fa-circle-notch fa-spin",
        autoSelect: true, //单行input=text下移动光标时自动选中可选的项；多行input或textarea可能对于上下移动光标时会与默认行为冲突
                            // 此时需设置autoSelect为false；自定义method时也可能要设置autoSelect为false

        loadingIndicator: null,
        suggestCntr: null,
        processing: false,
        showing: false,
        hovering: false,
        typingWatcher: 0,
        processWatcher: 0
    };

    $("[data-cx-ctrl=suggest]").suggest();
});


/**
 * jQuery插件：Mask
 * 一般在提交后台处理时显示一个遮罩层，提示用户正在处理；
 * 建议最好不要用于document.body，因为会导致整个页面模糊，遮罩层本身的提示信息会看不清
 * eg: $('#target').mask('show');
 */
$(function(){
    "use strict";
    var methods = {
        show: function(options) {
            methods._init.call(this, options);
            $(this).each(function() {
                if (this.opts.maskLayer) {
                	if (this.opts.maskLayer.attr('data-stack-count')) 
                		this.opts.maskLayer.attr('data-stack-count', parseInt(this.opts.maskLayer.attr('data-stack-count'))+1);
                	else this.opts.maskLayer.attr('data-stack-count', '1');
                } else {
                    var mask = $('<div style="display:flex;z-index:1;position:absolute;top:-100px;left:0px;align-items:center;justify-content:center;background-color:transparent;padding:0px;border-radius:.25rem;min-height: 1.5rem;"><span style="opacity:0;transition:opacity 2s ease-in-out 1s;"><span style="margin-right:.5rem;"><i class="fas fa-circle-notch fa-spin"></i></span><span data-msg-hldr="true" data-def-msg="处理中，请稍候...">处理中，请稍候...</span></span></div>');//<span style="border-radius:.25rem;background-color:#dddddd66;padding:.25rem .75rem;">
                    $("body").append(mask);
                    this.opts.maskLayer = mask;
                
	                $(this).css({"-webkit-filter": "blur(2px)", "filter": "blur(2px)", "opacity": .5});
	                let ss = this;
	                setTimeout(function(){
	                	if (ss.opts.maskLayer && ss.opts.maskLayer.css("display") != "none") {
		                	let target=$(ss), z = CxMisc.getZIndex(ss);
		                	if (z > 0) {ss.opts.maskLayer.css("z-index", z+1);}
		                	if (ss.opts.msg) {
		                        ss.opts.maskLayer.find("span[data-msg-hldr]").text(ss.opts.msg);
		                    } else if (ss.opts.msg === null) {
		                    	ss.opts.maskLayer.find("span[data-msg-hldr]").text("");
		                    } else if (ss.opts.msg === undefined) {
		                    	ss.opts.maskLayer.find("span[data-msg-hldr]").text(ss.opts.maskLayer.find("span[data-msg-hldr]").data("def-msg"));
		                    }
		                	ss.opts.maskLayer.width(target.outerWidth());
		                    ss.opts.maskLayer.height(target.outerHeight());
		                    ss.opts.maskLayer.css("top", target.offset().top);
		                    ss.opts.maskLayer.css("left", target.offset().left);
		                    ss.opts.maskLayer.css("display", "flex");
		                	ss.opts.maskLayer.children('span').css("opacity", "1");
	                	}
	                }, 1200);
                }
            });
        },
        hide: function() {
            //methods._init.call(this);
            $(this).each(function() {
            	let stack = false;
            	if (this.opts.maskLayer.attr('data-stack-count')) {
            		let n = parseInt(this.opts.maskLayer.attr('data-stack-count'));
            		if (n > 0) {
            			this.opts.maskLayer.attr('data-stack-count', parseInt(this.opts.maskLayer.attr('data-stack-count'))-1);
            			stack = true;
            		}
            	}
            	if (!stack) {
	            	$(this).css({"-webkit-filter": "", "filter": "", "opacity": ""});
	                if (this.opts && this.opts.maskLayer){
	                    //this.opts.maskLayer.css("display", "none");
	                    //this.opts.maskLayer.children('span').css("opacity", "0");
	                	this.opts.maskLayer.remove();
	                	this.opts.maskLayer = null;
	                }
            	}
            });
        },
        
        _init: function(options) {
            return this.each(function(){
                //var $this = $(this);
                if (!this.opts){ // not yet init
                    this.opts = $.extend({}, $.fn.mask.defaults, options);
                } else Object.assign(this.opts, options);
            });
        }
    };
    $.fn.mask = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist!');
        }
    };
    
    $.fn.mask.defaults = {
        msg: undefined,
        maskLayer	:null
    };
});

/**
 * jQuery插件：pagination
 * 通用分页控件，提供常规分页功能：上页，下页，首页，尾页，各分页页码，跳转
 * 1 可通过配置生成: 
 * 		<div class="cx-pagination-cntr">
 * 			<div class="cx-pagination" data-cx-ctrl="pagination" data-cx-param="{page:1,pageSize:15,records:2393,url:'/data/list',click:func1}"></div>
 * 		</div>
 * 2 可通过js调用生成： $("[data-cx-ctrl=pagination]").pagination();
 */
$(function(){
    "use strict";
    var methods = {
        //Public methods
        init: function(options) {
            return this.each(function(){
                methods._destroy.call(this);
                var $this = $(this);
                this.opts = $.extend({}, $.fn.pagination.defaults, options);
                if ($this.data("cx-param") && $this.data("cx-param") != "") {
                	$.extend(this.opts, eval("("+$this.data("cx-param")+")")); //cannot use JSON.parse() if object string contains variables
                }
                this.pages = methods._createPagination.call(this);
                methods._binds.call(this);
            });
        },
        page: function() {
            return arguments.length ? methods.setPage.apply(this, arguments) : methods.getPage.call(this);
        },
        getPage: function() {
            var page = [];
            $(this).each(function() {
                if (this.opts.page) {
                    page.push(this.opts.page);
                }
            });
            return (page.length > 1) ? page-1 : page[0]-1;
        },
        setPage: function (page) {
            return $(this).each(function() {
                methods._gotoPage.call(this, page, $.Event('click'));
                methods._refreshPage.call(this, page);
            });
        },
        pageSize: function() {
            return arguments.length ? methods.setPageSize.apply(this, arguments) : methods.getPageSize.call(this);
        },
        getPageSize: function() {
            var pageSize = [];
            $(this).each(function() {
                if (this.opts.pageSize) {
                    pageSize.push(this.opts.pageSize);
                }
            });
            return (pageSize.length > 1) ? pageSize : pageSize[0];
        },
        setPageSize: function (pageSize) {
            //return this.opts.pageSize;
        },
        lastPage: function() {
        	var lastPage = [];
            $(this).each(function() {
                if (this.opts.pageSize) {
                	lastPage.push(Math.ceil(this.opts.records/this.opts.pageSize)-1);
                }
            });
            return (lastPage.length > 1) ? lastPage : lastPage[0];
        },
        records: function() {
            return arguments.length ? methods.setRecords.apply(this, arguments) : methods.getRecords.call(this);
        },
        getRecords: function() {
            var records = [];
            $(this).each(function() {
                if (this.opts.records) {
                    records.push(this.opts.records);
                }
            });
            return (records.length > 1) ? records : records[0];
        },
        setRecords: function(records) {
            return $(this).each(function() {
                methods._refreshRecords.call(this, records);
            });
        },
        refreshPage: function(page) {
            return $(this).each(function() {
            	this.opts.page = page + 1; //前端的页面是以1开始计算，后台以0开始
                methods._refreshPage.call(this, page);
            });
        },
            
        //Private methods
        _createPagination: function() {
            var $this = $(this);
            var o = $.meta ? $.extend({}, this.opts, $this.data()) : this.opts;
            
            if (o.msg) {
                $this.append('<div class="cx-pagination-msg bg-light text-black-50 p-1 rounded text-sm"><i class="fas fa-info-circle"></i> '+o.msg+'</div>');
            }
            var nav = $("<nav></nav>", {"aria-label":"Page navigation"});
            var start = this.opts.page<5 ? 1 : this.opts.page-4; //显示5页： this.opts.page<3 ? 1 : this.opts.page-2;
            var end = Math.ceil(this.opts.records/this.opts.pageSize)>start+10 ? start+9 : Math.ceil(this.opts.records/this.opts.pageSize); // 5, 4
            var pul = $("<ul></ul>", {"class":"pagination justify-content-end"}); //Pagination list
            var ppli = $("<li></li>", {"data-page":o.page-2,"class": o.page>1 ? "page-item" : "page-item disabled", title:"上一页"}); //Previous page
            ppli.append($("<a></a>", {"class":"page-link", "href":"javascript:;", html:"<i class=\"fas fa-angle-left scale-125\"></i>"})); // cx-pagination-pager
            pul.append(ppli);
            var showTop4Mobile=Math.abs(o.page-start)>2 ? true : false, showEnd4Mobile=Math.abs(o.page-end)>2 ? true : false;
            if (start > 1) {//First page are not displayed in 'pages'
                var pfli = $("<li></li>", {"class":"page-item", "data-page":0, title:"首页","data-distance":"far"});
                pfli.append($("<a></a>", {"class":"page-link", "href":"javascript:;", html:(start==2?"1":"1..")}));
                pul.append(pfli);
            }
            if (showTop4Mobile) {
                var pfli = $("<li></li>", {"class":"page-item", "data-page":0, title:"首页","data-distance":"far-end"});
                pfli.append($("<a></a>", {"class":"page-link", "href":"javascript:;", html:(start==1&&Math.abs(o.page-start)==3?"1":"1..")}));
                pul.append(pfli);
            }
            for(var i=start; i<=end; i++) {//pages
                var ptitle = "";
                if (o.page == i) {
                    ptitle = (o.pageSize*(i-1)+1)+" - "+(o.pageSize*i>o.records?o.records:o.pageSize*i)+" / "+o.records+" (点击当前页可以跳转到其他页)";
                }
                var pli = $("<li></li>", {"data-page":i-1,"class":o.page == i?"page-item active":"page-item","data-distance":Math.abs(o.page-i)>2?"far":"near"});
                pli.append($("<a></a>", {"class":"page-link", "href":"javascript:;", title:ptitle,html:i}));
                pul.append(pli);
            }
            if (end < Math.ceil(o.records/o.pageSize)) { //Last page are not displayed in 'pages'
                var plli = $("<li></li>", {"class":"page-item", "data-page":Math.ceil(o.records/o.pageSize)-1, title:"尾页","data-distance":"far"});
                plli.append($("<a></a>", {"class":"page-link", "href":"javascript:;", html:(".."+Math.ceil(o.records/o.pageSize))}));
                pul.append(plli);
            }
            if (showEnd4Mobile) {
                var plli = $("<li></li>", {"class":"page-item", "data-page":Math.ceil(o.records/o.pageSize)-1, title:"尾页","data-distance":"far-end"});
                plli.append($("<a></a>", {"class":"page-link", "href":"javascript:;", html:((end==Math.ceil(o.records/o.pageSize)&&Math.abs(o.page-end)==3?"":"..")+Math.ceil(o.records/o.pageSize))}));
                pul.append(plli);
            }
            var pnli = $("<li></li>", {"data-page":o.page,"class": o.page < end ? "page-item" : "page-item disabled", title:"下一页"}); // Next page
            pnli.append($("<a></a>", {"class":"page-link", "href":"javascript:;", html:"<i class=\"fas fa-angle-right scale-125\"></i>"})); // cx-pagination-pager
            pul.append(pnli);
            nav.append(pul);
            
            $this.append(nav);
            return $this.find("li");
        },
        _binds: function() {
            methods._bindClick.call(this);
        },
        _bindClick: function() {
            var self = this;
            self.pages.on("click.pagination", function(evt) {
                if (!$(this).hasClass("active") && !$(this).hasClass("disabled")) {
                    methods._loading.call(self, $(this).data("page"), evt);
                    methods._gotoPage.call(self, $(this).data("page"), evt);
                    // methods._refreshPage.call(self, $(this).data("page")); //等待页面数据刷新后更新分页，由对应页面手动调用$("div.cx-pagination").pagination("refreshPage", page);
                }
                if ($(this).hasClass("active")) {
                    CxCtrl.prompt('请输入要跳转的目标页码', function (v) { 
                        methods._loading.call(self, parseInt(v)-1, evt);
                        methods._gotoPage.call(self, parseInt(v)-1, evt);
                        // methods._refreshPage.call(self, parseInt(v)-1);  //等待页面数据刷新后更新分页，由对应页面手动调用$("div.cx-pagination").pagination("refreshPage", page);
                    }, {
                        evt: evt,
                        src: this,
                        placement:'top',
                        value:parseInt($(this).data("page"))+1,
                        validate:{pattern:'^\\s*?[1-9]\\d*\\s*?$',errorMsg:'请输入大于0的纯数字'}
                    });
                }
            });
        },
        _loading: function(page, evt) {
            $(this).closest("div").find("li[data-refresh-btn=Y] i").addClass("fa-spin");
            $(this).closest("div").find("li[data-refresh-btn=Y]").show();
        },
        _gotoPage: function(page, evt) {
            this.opts.page = page;
            if (this.opts.click) {
                this.opts.click.call(this, page, this.opts.pageSize, this.opts.url, evt);
            } else if (this.opts.url) {
            	//$('div.cx-main').mask('show');
                location.href = this.opts.url + (this.opts.url.indexOf('?')>0 ? "&" : "?") + "page="+ page +"&pageSize="+ this.opts.pageSize;
            }
        },
        _destroy: function() {
            return $(this).each(function() {
                $(this).off('.pagination').empty();
            });
        },
        _refreshPage: function(page) {
            if ($(this).closest("div").data("cx-param")) 
            	$(this).closest("div").data("cx-param", $(this).data("cx-param").replace(/page:\d+/, "page:" + (page+1)));
            $(this).closest("div").pagination(this.opts);
        },
        _refreshRecords: function(records) {
        	if ($(this).closest("div").data("cx-param")) 
        		$(this).closest("div").data("cx-param", $(this).data("cx-param").replace(/records:\d+/, "records:" + records));
            $(this).closest("div").pagination(this.opts);
        }
    };
    
    $.fn.pagination = function(method) {
        if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error('Method ' + method + ' does not exist!');
        }
    };
    
    $.fn.pagination.defaults = {
        page: 1,
        pageSize: 10,
        records: 1,
        url: null,
        click: undefined,
        msg: null, //显示在左侧的提示信息
        layout:['pager'] //layout:['pager','refresh','jump']
    };
    
    // $("[data-cx-ctrl=pagination]").pagination();
});


/**
 * fcxxTree plugin
 * 用于设置某个元素（一般是普通文本输入框）为fcxxTree选择器
 * 
 */ 
$(function(){
    "use strict";
    let methods = {
        refresh: function(){
        	$(this).each(function() {
        		this.setAttribute("data-expired", "true");
            });
        },
        initialized: function(){
        	let ret = [];
        	$(this).each(function() {
        		if (this.opts.fcxxTreeWrapper.hasClass('cx-fcxx-tree-initialized')
        				&& this.opts.fcxxTreeWrapper.children('.treeview').length>0) 
        			ret.push(true);
        		else ret.push(false);
            });
        	if (ret.length == 1) return ret[0];
        	else return ret;
        },
    	text: function() {
    		let txts = [];
            this.each(function() {
            	txts.push(this.value);
            });
            return txts.length>0 ? (txts.length>1 ? txts : txts[0]) : null;
        },
        sqdm: function() {
    		let sqdms = [];
            this.each(function() {
            	sqdms.push(this.getAttribute('data-sqdm'));
            });
            return sqdms.length>0 ? (sqdms.length>1 ? sqdms : sqdms[0]) : null;
        },
        clear: function() {
        	$(this).each(function() {
        		this.value = '';
            	let opts = this.opts;
            	opts.sqdmEl.value = '';
    			opts.qyidEl.value = '';
    			opts.lyidEl.value = '';
    			opts.dyidEl.value = '';
    			opts.fcidEl.value = '';
    			let selecteds = opts.fcxxTree.treeview('getSelected');
    			if (selecteds && selecteds.length>0) opts.fcxxTree.treeview('unselectNode', [selecteds[0].nodeId, { silent: true }]);
            });
        	$(this).trigger('input');
        },
        value: function(item) {
        	let values = [];
        	$(this).each(function() {
        		let opts = this.opts;
            	if (item) {
            		//暂不支持设置选中值
            	} else {
            		values.push({
    	            	sqdm: opts.sqdmEl.value=='' ? null : opts.sqdmEl.value, 
    	            	qyid: opts.qyidEl.value=='' ? null : opts.qyidEl.value, 
    	            	lyid: opts.lyidEl.value=='' ? null : opts.lyidEl.value, 
    	            	dyid: opts.dyidEl.value=='' ? null : opts.dyidEl.value, 
    	            	fcid: opts.fcidEl.value=='' ? null : opts.fcidEl.value
    	            });
            	}
            });
        	return values.length>0 ? (values.length>1 ? values : values[0]) : null;
        },

        _hide: function() {
            return $(this).each(function() {
            	if (this.opts) {
	                this.opts.fcxxTreeWrapper.css("display", "none");
	                this.opts.showing = false;
	                this.opts.hovering = false;
            	}
            });
        },
        _load: function() {
            if (!this.opts.loading) {
                this.opts.loading = true;
                
                CxWg.loadFcxxTree(this.opts.fcxxTree, Object.assign({}, {level:this.opts.level?this.opts.level:3, selectable: this.opts.selectable?this.opts.selectable:{'sq':true, 'qy':true, 'ly':true, 'dy':true, 'fc':true}}, 
                		{nodeSelected: function(node){
                			//console.log(node);
                			if (this.opts.multiSelect) {
                				// 多选暂不支持
                			} else {
                				this.opts.sqdmEl.value = '';
                				this.opts.qyidEl.value = '';
                				this.opts.lyidEl.value = '';
                				this.opts.dyidEl.value = '';
                				this.opts.fcidEl.value = '';
	                			if (node.data.type == 'sq') this.opts.sqdmEl.value = node.data.nid;
	                			else if (node.data.type == 'qy') this.opts.qyidEl.value = node.data.nid;
	                			else if (node.data.type == 'ly') this.opts.lyidEl.value = node.data.nid;
	                			else if (node.data.type == 'dy') this.opts.dyidEl.value = node.data.nid;
	                			else if (node.data.type == 'fc') this.opts.fcidEl.value = node.data.nid;
	                			let tmp = node, mc = node.data.mc;
	                			while (tmp.data && tmp.data.type != 'sq') {
	                				tmp = this.opts.fcxxTree.treeview('getParent', [tmp.nodeId]);
	                				mc = tmp.data.mc + ">" + mc;
	                			}
	                        	this.value = mc;
	                        	if (this.opts.ensureSqdm && this.opts.sqdmEl.value != tmp.data.nid) this.opts.sqdmEl.value = tmp.data.nid;
	                        	if (this.getAttribute('data-sqdm') != tmp.data.nid) this.setAttribute('data-sqdm', tmp.data.nid);
                			}
                			$(this).trigger('input');
                		}.bind(this), treeLoaded: function(){
		                	this.opts.loading = false;
		                    this.opts.loaded = true;
		                }.bind(this)}
            	));
            }
        },
        _show: function() {
            //return $(this).each(function() {
            	if (!this.opts.fcxxTreeWrapper.hasClass('cx-fcxx-tree-initialized')) {
	            	this.opts.fcxxTreeWrapper.css("z-index", CxMisc.getZIndex(this)+9);
	                
	                let self = $(this), parent = self.parent();
	            	let t = self.outerHeight()+2; //暂固定显示在下则，因为高度会随着查询结果内容多少变动
	            	let l = parent.css('padding-left'); // Math.floor((parent.innerWidth() - parent.width())/2);
	            	let w = self.outerWidth()-2;  // border width
	            	let h = 0;
	            	let wrapModal = self.closest('.modal-body');
	            	if (wrapModal.length>0) {
	            		let offset = 0, tmp = self;
	            		while(!tmp.hasClass('modal-body') && tmp[0].nodeName!='BODY') {
	            			offset += tmp.position().top;
	            			tmp = tmp.offsetParent();
	            		}
	            		h = wrapModal.outerHeight() - offset - t - 12;
	            	} else h = window.innerHeight - self.offset().top - t - 12; // $('body').height()
	            	if (w < 225) w = 225;
	                this.opts.fcxxTreeWrapper.css({"min-width": w, "height": h, "top": t, "left": l});
	                this.opts.fcxxTreeWrapper.addClass('cx-fcxx-tree-initialized')
	            }
                this.opts.fcxxTreeWrapper.css("display", "block");

                this.opts.showing = true;
            //});
        },

        _init: function(options) {
            return this.each(function(){
                if (!this.opts){
                    this.setAttribute("autocomplete", "off");

                    this.opts = $.extend({}, $.fn.fcxxTree.defaults, options);
                    if (!this.opts.multiSelect) this.opts.multiSelect = $(this).data("multi-select") == 'true';
                    
                    if (this.opts.init) { // 初始化数据
                    	
                    }
                    if (this.opts.multiSelect) {
                    	// 多选暂不支持
                    } else {
                    	if (!this.opts.sqdmEl) {
                        	if (!this.parentNode.querySelector(`input[name=sqdm]`)) {
                                $(this.parentNode).append(`<input type="hidden" name="sqdm" value="">
                                		<input type="hidden" name="qyid" value="">
                                		<input type="hidden" name="lyid" value="">
                                		<input type="hidden" name="dyid" value="">
                                		<input type="hidden" name="fcid" value="">`);
                            }
                        	this.opts.sqdmEl = this.parentNode.querySelector('input[name=sqdm]');
                        	this.opts.qyidEl = this.parentNode.querySelector('input[name=qyid]');
                        	this.opts.lyidEl = this.parentNode.querySelector('input[name=lyid]');
                        	this.opts.dyidEl = this.parentNode.querySelector('input[name=dyid]');
                        	this.opts.fcidEl = this.parentNode.querySelector('input[name=fcid]');
                        }
                    }
                    
                    if (!this.opts.fcxxTreeWrapper) {
                        if (!this.parentNode.querySelector('div.cx-fcxx-tree')) {
                            $(this.parentNode).append('<div class="cx-fcxx-tree"><div></div></div>');
                        }
                        this.opts.fcxxTreeWrapper = $(this.parentNode.querySelector('div.cx-fcxx-tree'));
                        this.opts.fcxxTree = this.opts.fcxxTreeWrapper.children('div');
                        let $this = this;
	                    this.opts.fcxxTreeWrapper.mouseenter(function(){$this.opts.hovering = true;});
	                    this.opts.fcxxTreeWrapper.mouseleave(function(){$this.opts.hovering = false;});
                    }
                    
                    this.opts.fcxxTreeWrapper.click(function(e){ 
                    	/*let isNode = false, tmp = e.target;
                    	while (true) { 
                    		if ($(tmp).hasClass('treeview')) break; 
                    		else if ($(tmp).hasClass('list-group-item')) { isNode=true; break; }
                    		tmp = tmp.parentNode; 
                    	}
                    	if (isNode) { // 点在树节点上
                    		if (this.opts.multiSelect)
                    			this.parentNode.querySelector('[data-cx-ctrl="fcxx-tree"]').focus();
                    		else {
                    			this.opts.hovering = false;
                    			methods._hide.call(this);
                    		}
                    	} else this.parentNode.querySelector('[data-cx-ctrl="fcxx-tree"]').focus();*/
                    	this.parentNode.querySelector('[data-cx-ctrl="fcxx-tree"]').focus();
                    }.bind(this)).dblclick(function(e){ // 双击直接隐藏控件
                    	this.opts.hovering = false;
            			this.parentNode.querySelector('[data-cx-ctrl="fcxx-tree"]').blur();
                    }.bind(this));

                    $(this).on("input", function (e){
                    	if (e.keyCode != 9 && e.keyCode != 13) // tab, enter
                    		e.preventDefault();
                    }).keydown(function(e) {
                    	if (e.keyCode != 9 && e.keyCode != 13) // tab, enter
                    		e.preventDefault();
                    }).keyup(function(e) {
                    	if (e.keyCode == 8 || e.keyCode == 46) // backspace or delete
                    		$(this).fcxxTree('clear');
                    	if (e.keyCode != 9 && e.keyCode != 13) // tab, enter
                    		e.preventDefault();
                    }).click(function(){
                    	if (!this.opts.showing) methods._show.call(this);
                    	if (!this.opts.loaded || this.getAttribute("data-expired")) {
                    		this.removeAttribute("data-expired");
                    		methods._load.call(this);
                    	}
                    }).focus(function(){
                    	if (!this.opts.showing) methods._show.call(this);
                    	if (!this.opts.loaded || this.getAttribute("data-expired")) {
                    		this.removeAttribute("data-expired");
                    		methods._load.call(this);
                    	}
                    }).blur(function(){
                        if (!this.opts.loading) {
                            if (this.opts.showing && !this.opts.hovering) {
                                methods._hide.call(this);
                            }
                        }
                    });
                }
            });
        }
    };
    $.fn.fcxxTree = function(method) {
    	if (typeof method === 'object' || !method) {
            return methods._init.apply(this, arguments);
        } else if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error('Method ' + method + ' does not exist!');
        }
    };
    
    $.fn.fcxxTree.defaults = {
        multiSelect: false,
        ensureSqdm: false, // 选中任何节点时，保证相应的sqdm值也同时设置
        selectable: null, // 设置可以选中的节点类型

        fcxxTreeWrapper: null,
        fcxxTree: null,
        fcidEl: null,
        dyidEl: null,
        lyidEl: null,
        qyidEl: null,
        sqdmEl: null,
        loaded: false,
        loading: false,
        showing: false,
        hovering: false
    };

    $('[data-cx-ctrl="fcxx-tree"]').fcxxTree();
    $(document).on('click', function(e) {
    	let el = e.target, li = $(el).closest('li[data-nodeid]'), wrap = $(el).closest('.treeview');
        if (el.getAttribute('data-cx-ctrl') != 'fcxx-tree' && li.length==0 && wrap.length == 0) {
        	$('[data-cx-ctrl="fcxx-tree"]').fcxxTree('_hide');
        } else if (CxMisc.isMobile() && li.length>0) { //点击房产后自动隐藏
        	if (li.children('.tv-fc').length>0) $('[data-cx-ctrl="fcxx-tree"]').fcxxTree('_hide');
        }
    });
});

