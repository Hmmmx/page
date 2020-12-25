const CxNotifier = {
	produce: function(m, l) {
		l = l || "info"; //info ,warn, error
		sessionStorage.setItem("CX_PAGE_NOTIFIER", JSON.stringify({level:l, msg:m, time:(new Date()).getTime()}));
	},
	consume: function() {
		var m = sessionStorage.getItem("CX_PAGE_NOTIFIER");
		if (m) {
			sessionStorage.removeItem("CX_PAGE_NOTIFIER");
			var o=JSON.parse(m);
			if ((new Date()).getTime()-o.time < 30000) { //过去太久不再显示信息
				setTimeout(function(){
					/* if (o.level == 'info') CxMsg.info(o.msg);
					else if (o.level == 'warn')  CxMsg.warn(o.msg);
					else CxMsg.error(o.msg); */
					CxCtrl.alert(o.msg);
				}, 600);
			}
		}
	}
};

const CxToast = {
		info: function(msg, options) {
			PNotify.success(Object.assign({
				text: msg,
				delay: 4000
			}, options));
		},
	    warn: function(msg, options) {
	    	PNotify.notice(Object.assign({
				text: msg,
				delay: 6000
	    	}, options));
	    },
	    error: function(msg, options) {
	    	PNotify.error(Object.assign({
				text: msg,
				delay: 12000
	    	}, options));
	    }
};

const CxGz = {
		scroll2BottomLoading: function(func, wrap, opt) {
			if (typeof func === 'function') {
				$(wrap).append(`<div class="loading"><span><i class="fas fa-circle-notch mr-1"></i>更多...</span></div>`);
				let loading = $(wrap).children('.loading');
				let cb = function(p){ 
        			if (!p.hasMore) {
        				loading.data('has-more', 'N'); // 小于pageSize时表示没有更多数据
        				loading.find('span').text(opt.noMoreMsg);
        			}
        			loading.appendTo(loading.parent()); // 把空白提示行移到未尾
        			loading.data('loading', 'N');
					loading.find('i').removeClass('fa-spin');
        		};
				
        		$(document).scroll(function() {
        			let scrollTop = $(document).scrollTop(),
        				h0 = $(window).height(),
        				h1 = $(document).height();
			 
			        if (h1 - (scrollTop + h0) < 40){ //距离底部高度小于40px
			        	let now = new Date().getTime();
			        	if ((!loading.data('last-checking') || now-loading.data('last-checking')>1000) && (loading.data('loading') != 'Y' && loading.data('has-more') != 'N')) {
			        		loading.data('last-checking', now);
			        		loading.data('loading', 'Y');
			        		loading.find('i').addClass('fa-spin');
			        		func(cb);
			        	}
			        }
				});
				$(wrap).children('.loading').click(function(){
					let now = new Date().getTime();
		        	if ((!loading.data('last-checking') || now-loading.data('last-checking')>1000) && (loading.data('loading') != 'Y' && loading.data('has-more') != 'N')) {
		        		loading.data('last-checking', now);
		        		loading.data('loading', 'Y');
		        		loading.find('i').addClass('fa-spin');
		        		func(cb);
		        	}
				});
				if (opt.autoLoad !== false) func(cb);// 默认执行一次方法
			}
		},
		
		popImg: function(selector, options) {
			if (selector){
				let el = null;
				if (typeof selector === 'string') el = document.querySelector(selector);
				else el = selector;
				if (el) {
					if (!document.querySelector('#cxgzImgModal0938')) {
						$('body').append(`<div class="modal fade" id="cxgzImgModal0938" tabindex="-1" role="dialog" aria-labelledby="cxgzImgModal0938Label" aria-hidden="true">
							    <div class="modal-dialog modal-dialog-centered" role="document">
							        <div class="modal-content">
							            <div class="modal-header">
							                <h5 class="modal-title" id="cxgzImgModal0938Label">图片展示</h5>
							                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
							                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
							                </button>
							            </div>
							            <div class="modal-body px-2">
							                <div class="img-wrapper text-center" style="overflow:auto;max-height: 75vh;"></div>
							            </div>
							            <div class="modal-footer cx-d-flex-between">
							            	<div>
							            	<button type="button" class="btn btn-outline-secondary rounded-circle cx-btn mr-1" data-cmd="original"><i class="fas fa-expand-alt"></i></button>
							            	<button type="button" class="btn btn-outline-secondary rounded-circle cx-btn" data-cmd="fit-to-wrapper"><i class="fas fa-compress-alt"></i></button>
							                </div>
							                <div>
							                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
							                </div>
							            </div>
							        </div>
							    </div>
							</div>`);
						$('#cxgzImgModal0938 .modal-footer button[data-cmd=original]').click(function(){
							$(this).closest('.modal-content').find('.img-wrapper img').css({'max-width':'none'});
						});
						$('#cxgzImgModal0938 .modal-footer button[data-cmd="fit-to-wrapper"]').click(function(){
							$(this).closest('.modal-content').find('.img-wrapper img').css({'max-width':'100%'});
						});
					}
					if (document.querySelector('#cxgzImgModal0938 .img-wrapper img')) {
						document.querySelector('#cxgzImgModal0938 .img-wrapper img').style.maxWidth = '100%';
						document.querySelector('#cxgzImgModal0938 .img-wrapper img').src = el.src;
					} else $(`<img src="${el.src}" style="max-width:100%;"/>`).appendTo('#cxgzImgModal0938 .img-wrapper');
					$('#cxgzImgModal0938').modal('show');
				}
			}
		}
};