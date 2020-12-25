/**
 * 所有工具类方法等等杂项都放在这里
 */

let gRootUrl = null; //根目录路径，如 /， 使用虚拟目录部署时：/test/
let gGzhdm = null, gCode = null;
$(function(){
	gRootUrl = $('body').data('root-url').replace(/;jsessionid=.*?(\?|$)/, '');
	gGzhdm = CxMisc.qs.get('gzhdm');
	gCode = CxMisc.qs.get('code');
});

let gCache = {dm: {}}; // 数据缓存对象：有些数据需要缓存提高性能，统一缓存在此对象

Date.prototype.format = function (fmt) { // yyyy-MM-dd hh:mm:ss
	var o = {
			"M+" : this.getMonth()+1,
			"d+" : this.getDate(),   
			"h+" : this.getHours(),
			"m+" : this.getMinutes(),   
			"s+" : this.getSeconds(),
			"q+" : Math.floor((this.getMonth()+3)/3), // season
			"S"  : this.getMilliseconds()
	};
	if(/(y+)/.test(fmt)) {
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("("+ k +")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		}
	}
	return fmt;
};

/**
 * serialize form to json object
 */
jQuery.fn.serializeJson = function(opt){  
    let serializeObj = {};  
    let array = this.serializeArray();
    $(array).each(function(){
        if (serializeObj[this.name] !== undefined && serializeObj[this.name] !== null){
        	if ($.isArray(serializeObj[this.name])){
                serializeObj[this.name].push(this.value);
            } else {
            	serializeObj[this.name] = [serializeObj[this.name], this.value];
            }
        } else {
            serializeObj[this.name] = this.value;
        }
    });
    if (opt && opt.removeBlankField) { // 清除空白的字段
    	for (let key in serializeObj) if (typeof serializeObj[key] === 'string' && serializeObj[key] == '') delete serializeObj[key];
    }
    return serializeObj;
}; 

const CxAutoLogout = {
	countdown: function() {
		CxAutoLogout._counter = window.setInterval(function(){
			CxAutoLogout.heartbeat();
		}, 1000);
	},
	heartbeat: function() {
		var n = CxAutoLogout._idle - Math.floor((new Date()-CxAutoLogout._s)/1000);
		if (n<=0){
			if (CxAutoLogout._leaving) CxAutoLogout._leaving.html("正在退出系统...");
			window.clearInterval(CxAutoLogout._counter);
			$("#modalAutoLogout form")[0].submit();
		} else if (n<CxAutoLogout._hint) {
			if (!CxAutoLogout._msgr) {
				CxAutoLogout._msgr = $("#modalAutoLogout");
			}
			if (!CxAutoLogout._msgr.hasClass('show')) {
				if (document.querySelector('div.modal.show')) $('div.modal.show').modal('hide');
				else CxAutoLogout._msgr.modal("show");
			}
			if (!CxAutoLogout._leaving) {
				CxAutoLogout._leaving = $("#loggingOutMsg");
			}
			CxAutoLogout._leaving.html(`系统已长时间空闲，将在 ${(Math.floor(n/60)/100).toFixed(2).substr(2) + ":" + ((n%60)/100).toFixed(2).substr(2)} 后自动退出！`);
		}
	},
	keepAlive: function() {
		if($("a[href*='/logout']").length>0){
			window.setInterval(function(){
				$.get(CxMisc.finalizeUrl('/keepalive'), function(result){});
			}, 200000);
		};
	},
	reset: function() {
		if (CxAutoLogout._msgr) CxAutoLogout._msgr.modal("hide");
		CxAutoLogout._s = new Date();
	},
	
	_hint: 60*5,
	_idle: 60*30,
	_counter: null,
	_leaving: null,
	_msgr: null,
	_s: new Date()
};

var CxMisc = {
	ajax: function (options) { //封装jQuery.ajax，执行需要的通用自定义方法
		CxAutoLogout.reset(); // 开始前需要重置自动退出计数器
		$.ajax(options);
	},
	ajaxwx: function (options) { //封装jQuery.ajax，执行需要的通用自定义方法
		if (!options.data) options.data = {};
		options.data.gzhdm = gGzhdm;
		options.data.code = gCode;
		$.ajax(options);
	},
	asSize: function (bytes) {
		if (typeof bytes !== 'number') {
	        return '';
	    }
	    if (bytes >= 1024*1024*1024) {
	        return (bytes / (1024*1024*1024)).toFixed(2) + ' GB';
	    }
	    if (bytes >= 1024*1024) {
	        return (bytes / (1024*1024)).toFixed(2) + ' MB';
	    }
	    if (bytes >= 1024) {
	        return (bytes / 1024).toFixed(2) + ' KB';
	    }
	    return bytes + ' B';
    },
    bindCheckAll: function(wrapper) {
    	$(wrapper).find('table thead input[name=checkAll]').click(function(){
			let checked = this.checked;
			$(this).closest('table').find('tbody td.td-indexer input').each(function(){
				this.checked = checked;
			});
		});
    },
    getCheckedIds: function(wrapper) {
		let checkeds = null;
		$(wrapper).find('table tbody td.td-indexer input').each(function(){
			if (this.checked) {
				if (!checkeds) checkeds = [];
				checkeds.push($(this).closest('tr').data('id'));
			}
		});
		return checkeds;
    },
    resetCheckAll: function(wrapper) {
    	$(wrapper).find('table thead input[name=checkAll]').each(function(){if (this.checked) this.click();});
    },
    capitalize: function(s) {
    	return s.charAt(0).toUpperCase() + s.slice(1);
    },
	clearValidation: function(el) {
		if (el.nodeName.toUpperCase() == 'FORM')
			$(el).removeClass('was-validated').find("input.is-invalid,select.is-invalid,textarea.is-invalid").removeClass('is-invalid');
		else 
			$(el).find('form').removeClass('was-validated').find("input.is-invalid,select.is-invalid,textarea.is-invalid").removeClass('is-invalid');
	},
	monthDiff: function(d1, d2){
		let s0 = moment(d1), s9 = moment(d1).startOf('month'), e0 = moment(d2), e1 = moment(d2).add(1, 'days'), e9 = moment(d2).startOf('month');
		let ret = {
				same: s0.isSame(e0),
				sameMonth: s9.isSame(e9),
				intValue: e1.diff(s0, 'months'),
				doubleValue: e1.diff(s0, 'months', true),
				inlineMonths: 0,
				days: e1.diff(s0, 'days')
		};
		if (!ret.sameMonth) {
			let n = 0; 
			while(s9.isBefore(e9)) { n++; s9.add(1, 'months');}
			ret.inlineMonths = n-1;
		}
		return ret;
	},
	enableFullpage: function(wrapper){
		if (wrapper) {
			if ($(wrapper).find('.toolbar>.toolbar-misc').length == 0) $(wrapper).find('.toolbar').append('<div class="toolbar-misc"></div>');
			$(wrapper).find('.toolbar>.toolbar-misc').append(`<button type="button" class="btn btn-outline-secondary rounded-circle" data-category="generic" data-cmd="full-page" title="全页显示"><i class="fas fa-expand-alt"></i></button>
						<button type="button" class="btn btn-outline-secondary rounded-circle d-none" data-category="generic" data-cmd="restore-page" title="缩小"><i class="fas fa-compress-alt"></i></button>`);
			$(wrapper).find('.toolbar button[data-cmd=full-page], .toolbar button[data-cmd=restore-page]').click(function(){
				let sbrSelector = `${wrapper} .col-limited-lg`, ctxSelector = `${wrapper} .col-extended-lg`;
				if (document.querySelector(sbrSelector) && document.querySelector(ctxSelector))
					CxMisc.toggleMnT(this, sbrSelector, ctxSelector);
				else CxMisc.toggleMnT(this, null, null); // 该页无左侧树控件
			});
		}
	},
	enableRefresh: function(wrapper, cb){
		if (wrapper && typeof cb==='function') {
			if ($(wrapper).find('.toolbar>.toolbar-misc').length == 0) $(wrapper).find('.toolbar').append('<div class="toolbar-misc"></div>');
			$(wrapper).find('.toolbar>.toolbar-misc').append(`<button type="button" class="btn btn-outline-secondary rounded-circle mr-1" data-category="generic" data-cmd="refresh-page" title="刷新"><i class="fas fa-sync"></i></button>`);
			$(wrapper).find('.toolbar button[data-cmd=refresh-page]').click(function(e){
				cb(e);
				let $this = e.target;
				$this.disabled = true;
				setTimeout(function(){ $this.disabled = false;$this.focus(); }, 800); // 一段时间内不能再刷新
			});
		}
	},
	enableUpload: function(options) {
		options = options || {};
		let el = document.querySelector(options.target);
		if (el){
			if (!el.parentNode.querySelector('.fs-fileupload')) {
				let self = $(el), cntr = self.parent();
				cntr.append(`<div class="fs-fileupload d-none">
					  	<div class="fs-dropzone d-none">
					      	<a href="javascript:;"><i class="fas fa-upload"></i> 选择文件</a>
					      	<span class="text-black-50 text-sm">(建议不要超过10M)</span>
					     	<input type="file" name="${options.multiple ? 'files' : 'file'}" accept="${options.accept?options.accept:'*.*'}"${options.multiple?' multiple':''}>
					    </div>
					</div>`);
				self.click(function(){
					let valid = true;
					if (options.pre) {
                		if (typeof options.pre === 'function') {
                			if (!options.pre()) valid = false;
                		}
                	}
					if (valid) $(this).parent().find('.fs-fileupload .fs-dropzone input[type=file]').click();
				});
				cntr.children('.fs-fileupload').each(function(){
		    		let target = $(this);
		    		target.find(".fs-dropzone>a").click(function(){
		    	        $(this).parent().find("input[type='file']").click();
		    	    });
		        	target.fileupload({
		        		url: options.url ? options.url : CxMisc.finalizeUrl('/upload'),
		        		pasteZone: target.find(".fs-dropzone"),
		                dropZone: target.find(".fs-dropzone"),
		                
		                add: function (e, data) {
		                    //if(!options.accept || options.accept && data.originalFiles[0].type.length && options.accept.indexOf(data.originalFiles[0].type)>-1) {
		                    	if (!options.maxSize || options.maxSize>data.files[0].size) {
			                		let name=CxMisc.escapeHtml(data.files[0].name);
				                    	// type=data.files[0].name.lastIndexOf('.')>-1?data.files[0].name.substring(data.files[0].name.lastIndexOf('.')+1).toLowerCase():'unknown', 
				                        // mime=CxMisc.renderFileType(type), 
				                        // size=CxMisc.asSize(data.files[0].size);
				                    data.context = CxMsg.upload(name, function(){if (jqXHR && jqXHR.readyState != 4) jqXHR.abort();});
				                    if (options.data) {
					                    if (typeof options.data === 'object') 
					                    	data.formData = options.data;  //如果需要额外添加参数可以在这里添加  
					                    else if (typeof options.data === 'function') // 暂不支持异步函数
					                    	data.formData = options.data();
				                    }
				                    if (typeof options.before === 'function') options.before(e);
				                    var jqXHR = data.submit();
				                } else {
				                	CxMsg.warn('超过'+ CxMisc.asSize(options.maxSize) +'最大值限制: '+data.files[0].name);
				                }
		                    //} else {
		                    //	CxMsg.warn('文件类型不支持：' + data.files[0].name);
		                    //}
		                },
		                progress: function(e, res){
		                    var progress = parseInt(res.loaded / res.total * 100, 10);
		                    res.context.progress(progress);
		                    if(progress >= 100) res.context.close();
		                },
		                fail:function(e, res){
		                    CxMsg.error('上传失败：' + res.result.message);
		                },
		                done: function(e, res) {
		                	if (res.result.code == "0") {
		                		if (options.silent !== true) CxMsg.info('上传成功');
		                        if (typeof options.success === 'function') options.success(e, res.result);
		                	} else {
		                		CxMsg.error('上传失败：' + res.result.message);
		                	}
		                	if (typeof options.done === 'function') options.done(e);
		                },
		            });
		        });
			}
		}
    },
    escapeRegexp: function(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    },
    escapeHtml: function(html) {
		var temp = document.createElement("div");
		(temp.textContent !== undefined ) ? (temp.textContent = html) : (temp.innerText = html);
		var output = temp.innerHTML;
		temp = null;
		return output;
    },
    finalizeUrl: function(url) { // 无论网站部署是否使用虚拟目录，用此方法用来生成最终url
    	if (url.startsWith('/')) return gRootUrl + url.substring(1);
    	else return gRootUrl + url;
    },
    finalizeUrl4Wx: function(url) { // 无论网站部署是否使用虚拟目录，用此方法用来生成最终url
    	let delim = url.indexOf('?')>0 ? '&' : '?';
    	let params = [];
    	if (url.indexOf('gzhdm=') == -1 && gGzhdm) params.push('gzhdm='+gGzhdm);
    	if (url.indexOf('code=') == -1 && gCode) params.push('code='+gCode);
    	if (url.startsWith('/')) {
    		return gRootUrl + url.substring(1) + (params.length==0 ? '' : (delim + params.join('&')));
    	} else {
    		return gRootUrl + url + (params.length==0 ? '' : (delim + params.join('&')));
    	}
    },
    fileNameSuffix: function(fileName) {
    	if (fileName.indexOf(".") > -1) {
    		return fileName.substring(fileName.lastIndexOf(".")+1);
    	} else return fileName;
    },
    fixedResponsiveTableColumns: function(table, opt) {
    	if (typeof table === 'string') table = document.querySelector(table);
    	let fixedLefts = parseInt(table.getAttribute('data-fixed-left-columns')),
			fixedRights = parseInt(table.getAttribute('data-fixed-right-columns'));
    	if (fixedLefts) {
    		let colWidths = [], offset=0;
    		for (let r=0; r<table.tHead.rows.length; r++) {
    			let row = table.tHead.rows[r];
	    		for (let c=0; c<fixedLefts; c++) {
	    			let w = row.cells[c].offsetWidth;
	    			colWidths.push(w);
	    			row.cells[c].style.zIndex = 7; // 必须大于标题栏设置值6
	    			row.cells[c].style.left = offset+"px";
	    			offset += w;
	    		}
    		}
    		for (let b=0; b<table.tBodies.length; b++) {
    			for (let r=0; r<table.tBodies[b].rows.length; r++) {
        			let row = table.tBodies[b].rows[r];
        			if (row.cells.length > 1) { // 无数据时的空白行只有一个单元格
	    	    		for (let c=0; c<fixedLefts; c++) {
	    	    			row.cells[c].classList.add('fixed-table-cell');
	    	    			row.cells[c].style.left = c==0? '0px' : colWidths[c-1]+"px";
	    	    		}
        			}
        		}
    		}
    	}
    },
    fixPossibleHtmlFormatIssue: function(html) {
		var temp = document.createElement("div");
		temp.innerHTML = html;
		var output = temp.innerHTML;
		temp = null;
		return output;
    },
    formatDate: function(datetime, type){
    	if (datetime) {
	    	if ("short" == type) return moment(datetime).format('YYYY-MM-DD'); 
	    	else return moment(datetime).format('YYYY-MM-DD HH:mm:ss'); 
    	} else return '';
    },
    formValidated: function(selector, cb) {
    	$(selector+'[data-auto-validate=true]').submit(function(e){ // 自动对每个配置的表单执行常规验证
			if ('false' != this.getAttribute('data-cancel-default')) { //默认取消浏览器的默认表单提交行为，只有显式设置为false时才不取消
		    	e.preventDefault();
				e.stopPropagation();
			}
	    	if (!CxMisc.validate(this)) e.stopImmediatePropagation(); // 验证不成功时立即取消触发后续绑定的函数，也就是在相应页面js中绑定的函数不会触发
	    	else cb(this);
		});
    },
    getDmList: function(op, cb) {
    	if (typeof op === 'string') {
    		if (gCache.dm[op]) {
    			if (typeof cb === 'function') cb(gCache.dm[op]);
    		} else {
	    		CxMisc.ajax({
	    		    url: CxMisc.finalizeUrl('/dm/get'),
	    		    type: "GET",
	    		    data: {type: op},
	    		    success: function(res, ts) {
	    		    	if (res.code == "0") {
	    		    		gCache.dm[op] = res.data;
	    		    		if (typeof cb === 'function') cb(res.data);
	    		    	} else {
	    		    		CxMsg.warn('获取信息列表失败：' + res.message);
	    		    	}
	    		    },
	    		    error: function(xhr, ts, err) {
	    		    	var msg = "[" + xhr.status + " : " + ts + "]";
	    		    	CxMsg.warn('获取信息列表失败：' + msg);
	    		    }
	    		});
    		}
    	} else {
	    	if (op) {
	    		let category = op.getAttribute('data-category'), type = op.getAttribute('data-lazy-load'), data={type: type}, key=type;
	    		if (category) {
	    			data.category = category;
	    			key = category+type;
	    		}
	    		if (gCache.dm[key]) {
	    			if (typeof cb === 'function') cb(gCache.dm[key]);
	    		} else {
		    		CxMisc.ajax({
		    		    url: CxMisc.finalizeUrl('/dm/get'),
		    		    type: "GET",
		    		    data: data,
		    		    beforeSend: function(xhr, cfg) {
		    		    	op.disabled = true;
		    		    },
		    		    success: function(res, ts) {
		    		    	if (res.code == "0") {
		    		    		gCache.dm[key] = res.data;
		    		    		if (typeof cb === 'function') cb(res.data);
		    		    	} else {
		    		    		if (op.id) {
		    		    			let mc = $(op).closest('.form-group').find('label[for='+op.id+']').text();
		    		    			CxMsg.warn('获取'+mc+'列表失败：' + res.message);
		    		    		} else CxMsg.warn('获取信息列表失败：' + res.message);
		    		    	}
		    		    },
		    		    error: function(xhr, ts, err) {
		    		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    		    	if (op.id) {
				    			let mc = $(op).closest('.form-group').find('label[for='+op.id+']').text();
				    			CxMsg.warn('获取'+mc+'列表失败：' + msg);
				    		} else CxMsg.warn('获取信息列表失败：' + msg);
		    		    },
		    		    complete: function(xhr, ts) {
		    		    	op.disabled = false;
		    		    }
		    		});
	    		}
	    	}
    	}
    },
    getHtmlText: function(html) {
    	var temp = document.createElement("div");
		temp.innerHTML = html;
		var output = temp.innerText;
		temp = null;
		return output;
    },
    getScrollbarWidth: function() {
	    var scrollDiv = document.createElement("div");
	    scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
	    document.body.appendChild(scrollDiv);
	    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	    document.body.removeChild(scrollDiv);
	    return scrollbarWidth;
	},
	getZIndex: function(el) { // 获取当前元素在dom中的z-index值
		if (el.nodeName.toUpperCase() == 'BODY') return 0;
		else {
			var i = Number(window.getComputedStyle(el).zIndex);
			if (Number.isNaN(i)) { var p=el.parentNode; return CxMisc.getZIndex(p); }
			else return i;
		}
	},
	hasScrollbar: function() {
	    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
	},
	indicateFilter: function(cntrSelector, cb) { // 通用过滤指示器：在用户输入过程中自动高亮过滤栏中任何有输入过的字段 和 过滤按纽
		let target = $(cntrSelector), fbar = $(cntrSelector).find('.filterbar'),
			tbar = $(cntrSelector).find('.toolbar');
		
		tbar.find('button[data-cmd=filter]').click(function(e){
			let fb = $(this).closest('.toolbar').next('.filterbar'),
				cntTbl = fb.parent().children('.main-content').find('.table-responsive');
			if (!fb.is(':visible')) {
				let h1 = fb.outerHeight(true);
				fb.slideDown('fast', function(){
					cntTbl.each(function(){
						let that = $(this), p = that.parent().innerWidth() - that.parent().width(); // 加上距离底边的空白
						if (that.hasClass('fit2height-tab-pgr')) that.css({"max-height": `calc(100vh - 246px - ${h1+p}px)`});
						else if (that.hasClass('fit2height-tab')) that.css({"max-height": `calc(100vh - 208px - ${h1+p}px)`});
						else if (that.hasClass('fit2height-pgr')) that.css({"max-height": `calc(100vh - 198px - ${h1+p}px)`});
						else if (that.hasClass('fit2height')) that.css({"max-height": `calc(100vh - 160px - ${h1+p}px)`});
					});
				});
				e.stopImmediatePropagation();
				if (typeof cb === 'function') cb();
			} else {
				fb.find('button[type=submit]').click();
			}
		});
		tbar.find('a[data-cmd=toggle-filterbar],button[data-cmd=toggle-filterbar]').click(function(){
			let fb = $(this).closest('.toolbar').next('.filterbar'),
				cntTbl = fb.parent().children('.main-content').find('.table-responsive');
			if (fb.is(':visible')) {
				fb.slideUp('fast', function(){
					cntTbl.each(function(){
						let that = $(this);
						if (that.hasClass('fit2height-tab-pgr')) that.css({"max-height": `calc(100vh - 246px)`});
						else if (that.hasClass('fit2height-tab')) that.css({"max-height": `calc(100vh - 208px)`});
						else if (that.hasClass('fit2height-pgr')) that.css({"max-height": `calc(100vh - 198px)`});
						else if (that.hasClass('fit2height')) that.css({"max-height": `calc(100vh - 160px)`});
					});
				});
			} else {
				let h1 = fb.outerHeight(true);
				fb.slideDown('fast', function(){
					cntTbl.each(function(){
						let that = $(this), p = that.parent().innerWidth() - that.parent().width(); // 加上距离底边的空白
						if (that.hasClass('fit2height-tab-pgr')) that.css({"max-height": `calc(100vh - 246px - ${h1+p}px)`});
						else if (that.hasClass('fit2height-tab')) that.css({"max-height": `calc(100vh - 208px - ${h1+p}px)`});
						else if (that.hasClass('fit2height-pgr')) that.css({"max-height": `calc(100vh - 198px - ${h1+p}px)`});
						else if (that.hasClass('fit2height')) that.css({"max-height": `calc(100vh - 160px - ${h1+p}px)`});
					});
				});
				if (typeof cb === 'function') cb();
			}
		});
		tbar.find('a[data-cmd=clear-filter],a[data-cmd=clear-filter-submit],button[data-cmd=clear-filter],button[data-cmd=clear-filter-submit]').click(function(){
			let tb = $(this).closest('.toolbar'); fb = tb.next('.filterbar');
			tb.find('.filter-enabled').removeClass('filter-enabled');
			fb.find('form')[0].reset();
			fb.find('label.filter-enabled').removeClass('filter-enabled');
			if (fb.find('input[data-cx-ctrl=fcxx-tree]').length>0 && fb.find('input[data-cx-ctrl=fcxx-tree]').nextAll('.cx-fcxx-tree-initialized').length>0) fb.find('input[data-cx-ctrl=fcxx-tree]').fcxxTree('clear');
			if (fb.find('select.fs-select').length>0) fb.find('select.fs-select').fSelect('reload');
			if (this.getAttribute('data-cmd') == 'clear-filter-submit') $(this).closest('.btn-group').find('button[data-cmd=filter]').click();
		});
		target.find('.filterbar input[type=text], .filterbar input[type=email]').bind('input propertychange', function(){
			let self = $(this), enabled = this.value != '', fbar2 = self.closest('.filterbar'),
				label = self.parent().hasClass('input-group') ? self.parent().parent().prev('label') : self.parent().prev('label');
			//	handler = fbar2.prev('.toolbar').find('button[data-cmd=filter]').parent().children('button');
			if (enabled) {
				label.addClass('filter-enabled');
			//	handler.addClass('filter-enabled');
			} else {
				label.removeClass('filter-enabled');
			//	if (fbar2.find('.filter-enabled').length == 0) handler.removeClass('filter-enabled');
			}
		});
		target.find('.filterbar select').change(function(){
			let self = $(this), fbar2 = self.closest('.filterbar'),
				enabled = self.data('init-value') ? this.value != self.data('init-value') : this.value != '', 
				label = (self.hasClass('fs-select') || self.parent().hasClass('input-group')) ? self.parent().parent().prev('label') : self.parent().prev('label');
			//	handler = fbar2.prev('.toolbar').find('button[data-cmd=filter]').parent().children('button');
			if (enabled) {
				label.addClass('filter-enabled');
			//	handler.addClass('filter-enabled');
			} else {
				label.removeClass('filter-enabled');
			//	if (fbar2.find('.filter-enabled').length == 0) handler.removeClass('filter-enabled');
			}
		});

		CxMisc.loadAllDmList(fbar);
		if (typeof cb === 'object') {
			if (cb.expanded) setTimeout(function(){tbar.find('button[data-cmd=filter]').click();}, 200); //延时展开查询栏，等待完全展开后再计算，以免高度查询栏计算错误
		}
	},
    isMobile: function(){
        return window.innerWidth<768 || window.navigator.userAgent.indexOf('Mobile')>0;
    },
    loadAllDmList: function(el) {
    	$(el).find('select[data-lazy-load][data-loaded!=true]').each(function(){
			let el = this;
			CxMisc.getDmList(el, function(list){
				let dataAcceptValues = el.getAttribute('data-accept-values'), acceptValues=null;
				if (dataAcceptValues) 
					acceptValues = dataAcceptValues.split(',');
				for (let i=0; i<list.length; i++) {
					if (!acceptValues || acceptValues.includes(list[i].dm))
						el.options.add(new Option(list[i].mc, list[i].dm));
				}
				if (el.getAttribute('data-selected-value')) { // 载入后设置选中的值 ，暂只支持select元素
					$(el).val(el.getAttribute('data-selected-value')).removeAttr('data-selected-value');
					if (el.selectedIndex == -1) el.selectedIndex = 0;
					$(el).trigger('change');
				}
				if (el.multiple && el.getAttribute('data-cx-ctrl') == 'multi-select') {
					let disabled = el.disabled;
					if (disabled) el.disabled = false;
					if (el.getAttribute('data-param')) $(el).fSelect(JSON.parse(el.getAttribute('data-param')));
					else $(el).fSelect();
					if (disabled) el.disabled = true;
				}
				el.setAttribute('data-loaded', 'true');
			});
		}); 
    },
    markAjaxStart: function(target) {
		if (target.find("i").length>0) {
			target.attr("data-old-class", target.find("i").attr("class"));
	    	target.find("i").attr("class", target.attr("data-old-class").indexOf("fa-fw")>-1 ? "fas fa-circle-notch fa-spin fa-fw" : "fas fa-circle-notch fa-spin");
		}
    	target.attr("disabled", true);
    	target.attr("data-loading", "Y");
	},
	markAjaxEnd: function(target) {
		if (target.find("i").length>0) {
			target.find("i").attr("class", target.attr("data-old-class"));
		}
    	target.attr("disabled", false);
    	target.attr("data-loading", "N");
	},
	markAsLoading: function(target) {
		return "Y" === target.attr("data-loading");
	},
	moveCaret: function(el, start, end) {
		if (el) {
			el.focus();
			if (el.setSelectionRange) {
				el.setSelectionRange(start, end);
			} else if (el.createTextRange) {
				var range = el.createTextRange();
				range.collapse(true);
				range.moveEnd('character', end);
				range.moveStart('character', start);
				range.select();
			}
		}
	},
	moveCaret2End: function(el) {
		if (el) {
			let end = el.value.length;
			CxMisc.moveCaret(el, end, end);
		}
	},
	moveCaret2Start: function(el) {
		CxMisc.moveCaret(el, 0, 0);
	},
	openUrl: function(url, data, method){
		var t1=document.createElement("form");
		t1.action = url;
		t1.method = method;
		document.body.appendChild(t1);
		if (data) {
			Object.getOwnPropertyNames(data).forEach(function(key){
				var t2 = document.createElement("input");
				t2.type = "hidden";
				t2.name = key;
				t2.value = data[key];
				t1.appendChild(t2);
			});
		}
		t1.submit();
		t1.parentNode.removeChild(t1);
	},
	
	popImg: function(selector, options) {
		if (selector){
			let el = null;
			if (typeof selector === 'string') el = document.querySelector(selector);
			else el = selector;
			if (el) {
				if (!document.querySelector('#cxPopImgModal834i')) {
					$('body').append(`<div class="cx-popimg-wrapper" style="position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: 5010;" id="cxPopImgModal834i" tabindex="-1">
						    <div class="cx-popimg-wrapper-bg" style="height:100%;display: flex;align-items: center;justify-content: center;background-color: rgba(0,0,0, .1);">
						        <div class="cx-popimg-modal" style="position:relative;">
						            <div class="">
						                <div class="cx-popimg text-center" style="overflow:auto;max-height: 75vh;"></div>
						            </div>
						            <div><span class="cx-close circle top-right"><span><a href="javascript:;"><i class="fas fa-times"></i></a></span></span></div>
						        </div>
						    </div>
						</div>`);
					$('#cxPopImgModal834i .cx-popimg-modal .cx-close').click(function(){
						$('#cxPopImgModal834i').addClass('d-none');
					});
				}
				if (document.querySelector('#cxPopImgModal834i .cx-popimg-modal img')) {
					document.querySelector('#cxPopImgModal834i .cx-popimg-modal img').style.maxWidth = '100%';
					document.querySelector('#cxPopImgModal834i .cx-popimg-modal img').src = el.src;
				} else $(`<img src="${el.src}" style="max-width:100%;"/>`).appendTo('#cxPopImgModal834i .cx-popimg-modal .cx-popimg');
				$('#cxPopImgModal834i').removeClass('d-none');
			}
		}
	},
	
	popUserDtlsDialog: function() {
		let f = document.querySelector('#hdrUserDtlsFrm');
		if (f.getAttribute('data-loaded') != 'true') {
			CxMisc.ajax({
			    url: $.cookie("current_ptlx") == '1' ? CxMisc.finalizeUrl('/jgyh/getJgYh') : CxMisc.finalizeUrl('/wgyh/getJgYh'),
			    type: "GET",
			    beforeSend: function(xhr, cfg) {
			    	$('#hdrModalUserDtls .modal-body').mask('show', {msg: '请稍候...'});
			    },
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		let data = res.data[0];
			    		f.cmd.value = 'get';
			    		f.yhid.value = ''; //不显示
			    		if (data.jgid) f.jgid.value = data.jgid;
			    		if (data.sqid) f.sqid.value = data.sqid; //wg yh
			    		f.yhdm.value = data.yhdm;
			    		f.gwid.setAttribute('data-selected-value', data.gwid);
			    		f.yhmc.value = data.yhmc;
			    		$(f).find("input[name=yhlx]").each(function() {
							if (this.value == data.yhlx) this.click(); 
				        });
						$(f).find("input[name=xb]").each(function() {
							if (this.value == data.xb) this.click(); 
				        });
						$(f).find("input[name=yxbj]").each(function() {
							if (this.value == data.yxbj) this.click(); 
				        });
						if (data.wxh) f.wxh.value = data.wxh;
						if (data.dzyx) f.dzyx.value = data.dzyx;
						if (data.lxdh) f.lxdh.value = data.lxdh;
						if (data.dz) f.dz.value = data.dz;
						
						$(f).find('input[type=text], input[type=radio], select, textarea').each(function(){this.disabled = true;});
						
						CxMisc.ajax({
						    url: $.cookie("current_ptlx") == '1' ? CxMisc.finalizeUrl('/jggw/findJgGw') : CxMisc.finalizeUrl('/wggw/findJgGw'),
						    type: "GET",
						    data: $.cookie("current_ptlx") == '1' ? {jgid: f.jgid.value} : {sqid: f.sqid.value},
						    success: function(res2, ts) {
						    	if (res2.code == "0") {
						    		if (res2.data && res2.data.length>0) {
						    			let f1 = document.querySelector('#hdrUserDtlsFrm');
						    			f1.gwid.options.length = 0;
						    			for (let i=0; i<res2.data.length; i++) {
						    				f1.gwid.options.add(new Option(res2.data[i].gwmc, res2.data[i].gwid));
						    			}
						    			if (f1.gwid.getAttribute('data-selected-value')) $(f1.gwid).val(f1.gwid.getAttribute('data-selected-value'));
						    			if (f1.gwid.selectedIndex == -1) f1.gwid.selectedIndex = 0;
						    		}
						    	} else {
						    		CxMsg.warn('载入岗位列表失败：' + res2.message);
						    	}
						    },
						    error: function(xhr, ts, err) {
						    	var msg = "[" + xhr.status + " : " + ts + "]";
						    	CxMsg.warn('载入岗位列表失败：' + msg);
						    },
						});
			    		
						if (data.yyhmm !== undefined) delete data.yyhmm;
						if (data.yhmm !== undefined) delete data.yhmm;
						f.setAttribute('data-json', JSON.stringify(data));
			    		f.setAttribute('data-loaded', 'true');
			    		$('#hdrModalUserDtls').modal('show');
			    	} else {
			    		CxMsg.warn('获取用户信息失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('获取用户信息失败：' + msg);
			    },
			    complete: function(xhr, ts) {
			    	$('#hdrModalUserDtls .modal-body').mask('hide');
			    }
			});
		} else $('#hdrModalUserDtls').modal('show');
	},
	
	popUpdatePwd: function(){
		$("#updatePwdFrm")[0].reset();
		$("#modalUpdatePwd").modal("show");
 	},
	
    randomInt: function(min, max, includeMax) {
        if (includeMax) {
            return max > min ? Math.floor(Math.random()*(max-min+1) + min) : min;
        }
        return max > min+1? (Math.floor(Math.random()*(max-min) + min)) : min;
    },
    renderFileType: function (type) { 
        var t='<i class="far fa-file"></i>';
        switch(type) {
            case "txt": t='<i class="far fa-file-alt"></i>';break;
            case "pdf": t='<i class="far fa-file-pdf"></i>';break;
            case "csv": 
            case "xls": 
            case "xlsx": t='<i class="far fa-file-excel"></i>';break;
            case "doc": 
            case "docx": t='<i class="far fa-file-word"></i>';break;
            case "ppt": 
            case "pptx": t='<i class="far fa-file-powerpoint"></i>';break;
            case "gif": 
            case "png":
            case "bmp":
            case "jpg":
            case "jpeg": t='<i class="far fa-image"></i>';break;
        }
        return t;
    },
	selectRadio: function(name, value, f) {
		$(f).find('input[name="'+ name +'"]').each(function(){
			this.checked = false;
			if (this.value == value) {
                this.click();//this.checked = true;
            }
        });
	},
	selectRange: function(name, value, f) {
		$(f).find('input[name="'+ name +'"]').each(function(){
			this.value = value;
			$(this).trigger('change');
        });
	},
	selectSelect: function(name, value, f) {
		$(f).find('select[name="'+ name +'"]').each(function(){
			$(this).val(value);
			if (this.selectedIndex == -1) this.selectedIndex = 0;
			$(this).trigger('change');
        });
	},
	submitPwd: function(el) {
		var target = $(el);
		CxMisc.ajax({
			url: $.cookie("current_ptlx") == '1' ? CxMisc.finalizeUrl('/jgyh/changePassword') : CxMisc.finalizeUrl('/wgyh/changePassword'),
			type: "POST",
			data:{
				yyhmm: el.form.yyhmm.value,
				yhmm: el.form.yhmm.value
			},
			beforeSend: function(xhr, cfg) {
				CxMisc.markAjaxStart(target);
            },
			success: function(res, ts) {
	          	if (res.code == "0") {
	          		target.closest("div.modal").modal("hide");
	          		setTimeout(function(){CxMsg.info("修改密码成功，请妥善保存并牢记新密码！");},200);
	          	} else {
	          		CxMsg.warn("修改密码失败: " + res.message);
	          	}
			},
			error: function(xhr, ts, err) {
				var msg = "[" + xhr.status + " : " + ts + "]";
				CxMsg.error("修改密码失败：" + msg);
			},
			complete: function(xhr, ts) {
				CxMisc.markAjaxEnd(target);
			}
		});
	},
	toChineseUpperCase: function(price) {
		const fraction = ['角', '分'];
		const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
		const unit = [['圆', '万', '亿'], ['', '拾', '佰', '仟']];
		let num = Math.abs(price);
		let s = '';
		fraction.forEach((item, index) => {
			if (index < fraction.length-1)
				s += (digit[Math.floor(num * 10 * Math.pow(10, index)) % 10] + item).replace(/零./, '');
			else //最后一位四舍五入
				s += (digit[Math.round(num * 10 * Math.pow(10, index)) % 10] + item).replace(/零./, '');
		});
		s = s || '整';
		num = Math.floor(num);
		for (let i = 0; i < unit[0].length && num > 0; i += 1) {
			let p = '';
			for (let j = 0; j < unit[1].length && num > 0; j += 1) {
				p = digit[num % 10] + unit[1][j] + p;
				num = Math.floor(num / 10);
			}
			s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
		}

		return s.replace(/(零.)*零圆/, '圆').replace(/(零.)+/g, '零').replace(/^整$/, '零圆整');
	},
	toggleMnT: function(el, sbrSelector, ctxSelector) { // 显示或隐藏菜单栏和房产树，用于一些表格显示过多字段时使用
		$(el).addClass('d-none');
		if ($(el).attr('data-cmd') == 'full-page') $(el).next().removeClass('d-none');
		else $(el).prev().removeClass('d-none');
		
		if (sbrSelector && ctxSelector) {
		    let sbr=$(sbrSelector), ctx=$(ctxSelector);
	        if (sbr.is(":visible")) {
	        	//ctx.find('.table-responsive').removeClass('fit2height');
	            sbr.data("max-width-d", sbr.css("max-width")).animate({
	                'max-width':'0%'
	            }, 'fast', function(){ 
	            	$(this).addClass('d-none').removeClass("d-md-block").css({"max-width": ""}); 
	            	ctx.data("max-width-d", ctx.css("max-width")).removeClass('cx-gutter-l').css({
			            'max-width':'100%',
			            "flex-basis": "auto"
			        }); 
	            	$(window).resize();
	            });
	        	if ($('.menu-column').is(":visible")) {
					toggleMenuBar();
				}
	        } else {
	        	//ctx.find('.table-responsive').addClass('fit2height');
	            var i=0, interval=0.05; 
	            sbr.css("max-width", "0%").addClass("d-md-block").animate({
	                'max-width':sbr.data("max-width-d")
	            }, 'fast', function(){ $(this).css("max-width", ""); });
	            ctx.animate({
	                'max-width':ctx.data("max-width-d")
	            }, 'fast', function(){ 
	            	$(this).addClass('cx-gutter-l').css({"max-width": "", "flex-basis": ""}); 
	            	$(window).resize(); 
	            });
	        	if (!$('.menu-column').is(":visible")) {
					toggleMenuBar();
				}
	        }
		} else {
			if ($(el).attr('data-cmd') == 'full-page' && $('.menu-column').is(":visible") || $(el).attr('data-cmd') != 'full-page' && !$('.menu-column').is(":visible"))
				toggleMenuBar();
		}
	},
	trimData: function(data){ // 删除数据对象中空字符串的属性
		if (data) {
			for(let key in data){
				if (data[key] === null || typeof data[key] === 'string' && data[key].trim() == "") delete data[key];
			}
		}
		return data;
	},
	unescapeHtml: function(text) {
		var temp = document.createElement("div");
		temp.innerHTML = text;
		var output = temp.innerText || temp.textContent;
		temp = null;
		return output;
	},
	validate: function(f) {
		var cxValid = f.checkValidity();
		
		if (cxValid) {
			f.classList.remove('was-validated'); //无默认浏览器验证错误时删除验证提示
			$(f).find('input[data-cx-validate],select[data-cx-validate],textarea[data-cx-validate]').each(function(){
				var v = $(this).attr('data-cx-validate');
				if (v != "") {
					//var s = null;
					//if (v.indexOf("pattern")) s = v.replace(/"/g, '__q__').replace(/\\/g, '\\\\').replace(/'/g, '"').replace(/""/g, '\'').replace(/__q__/g, '\\\"');//pattern 中的如果有单引号，用双单引号表示
					//else s = v.replace(/'/g, '"');
					var vs=JSON.parse(v), ok=true; 
					if (vs.eq) { // equalTo
						if (this.value != document.querySelector(vs.eq).value) {
							cxValid = ok = false;
							$(this).addClass("is-invalid");
						} else {
							$(this).removeClass("is-invalid");
						}
					}
					if (ok) {
						if (vs.neq) { // not equalTo
							if (this.value == document.querySelector(vs.neq).value) {
								cxValid = ok = false;
								$(this).addClass("is-invalid");
							} else {
								$(this).removeClass("is-invalid");
							}
						}
					}
					if (ok) {
						if (vs.gtr) { // greater than
							var v = document.querySelector(vs.gtr.target).value;
							if (this.value != "" && v != "") {
								if (vs.gtr.type == 'date') {
									try {
										if (moment(this.value).isBefore(moment(v))) {
											cxValid = ok = false;
											$(this).addClass("is-invalid");
										} else {
											$(this).removeClass("is-invalid");
										}
									} catch (err) {
										cxValid = ok = false;
										$(this).addClass("is-invalid");
									}
								}
							}
						}
					}
					if (ok) {
						if (vs.attr) { // specific attribute
							if (vs.attr.op == 'eq') {
								if (this.getAttribute(vs.attr.name) != vs.attr.value) {
									cxValid = ok = false;
									$(this).addClass("is-invalid");
								} else {
									$(this).removeClass("is-invalid");
								}
							}
						}
					}
					if (ok) {
						if (vs.pattern) { // regexp pattern for textarea
							if (!new RegExp(vs.pattern).test(this.value)) {
								cxValid = ok = false;
								$(this).addClass("form-control is-invalid"); //for textarea of ueditor
							} else {
								$(this).removeClass("is-invalid");
							}
						}
					}
				}
			});
		} else {
			f.classList.add('was-validated');
			$(f).find('div.invalid-tooltip[data-def-msg]').each(function(){this.innerText = this.getAttribute('data-def-msg'); }); //调用浏览器验证失败恢复默认的错误提示信息
		}
		
		var el = f.querySelector(":invalid"); //最后检查是否有验证失败的项（可能会有非通用验证造成的失败，如suggest控件等）
		if (!el) el = f.querySelector(".is-invalid");
		if (el) {
			cxValid = false;
			var z = $(el).offset().top;
			var t = z>150 ? (z-150) : 0;
			var max = $(document).height()-180, winH=$(window).height();
			if (t-window.scrollY < 0 || t-window.scrollY > winH) { //元素不在视口之内
				if (t + winH > max) {t = max-winH;} 
	            $('html,body').animate({scrollTop: t}, 300, function(){el.focus();});
			} else el.focus();
		} else {
			f.classList.remove('was-validated'); //无验证错误时删除验证提示
		}
		
		return cxValid;
	},
    qs: {
        get: function(key, uri) {
            var s = uri ? uri : location.href;
            return CxMisc.qs.parse(CxMisc.qs.extract(s))[key];
        },
        
        set: function(key, value, uri) {
            var s = uri ? uri : location.href;
            var p = s.substring(0, s.indexOf("?"));
            var q = CxMisc.qs.parse(CxMisc.qs.extract(s));
            q[key] = value;
            return p + "?" + CxMisc.qs.stringify(q);
        },
        
        remove: function(key, uri) {
            var s = uri ? uri : location.href;
            var p = s.substring(0, s.indexOf("?"));
            var q =  CxMisc.qs.parse(CxMisc.qs.extract(s));
            if (q[key]) {
                delete q[key];
            }
            var s = CxMisc.qs.stringify(q);
            return s.length > 0 ? (p + "?" + s) : p;
        },
        
        strictUriEncode: function(s) {
            return encodeURIComponent(s).replace(/[!'()*]/g, function (c) {
                return '%' + c.charCodeAt(0).toString(16);
            });
        },
        
        extract: function (s) {
            return s.split('?')[1] || '';
        },
        
        parse: function (s) {
            if (typeof s !== 'string') {
                return {};
            }
    
            s = s.trim().replace(/^(\?|#|&)/, '');
    
            if (!s) {
                return {};
            }
    
            return s.split('&').reduce(function (ret, param) {
                var parts = param.replace(/\+/g, ' ').split('=');
                // Firefox (pre 40) decodes `%3D` to `=`
                // https://github.com/sindresorhus/query-string/pull/37
                var key = parts.shift();
                var val = parts.length > 0 ? parts.join('=') : undefined;
    
                key = decodeURIComponent(key);
    
                // missing `=` should be `null`:
                // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
                val = val === undefined ? null : decodeURIComponent(val);
    
                if (!ret.hasOwnProperty(key)) {
                    ret[key] = val;
                } else if (Array.isArray(ret[key])) {
                    ret[key].push(val);
                } else {
                    ret[key] = [ret[key], val];
                }
    
                return ret;
            }, {});
        },
        
        stringify: function (obj) {
            // return obj ? Object.keys(obj).sort().map(function (key) {// This may not work in IE7/8
            return obj ? Object.keys(obj).map(function (key) {// This may not work in IE7/8
                var val = obj[key];
    
                if (val === undefined) {
                    return '';
                }
    
                if (val === null) {
                    return key;
                }
    
                if (Array.isArray(val)) {
                    // return val.sort().map(function (val2) {
                    return val.map(function (val2) {
                        return CxMisc.qs.strictUriEncode(key) + '=' + CxMisc.qs.strictUriEncode(val2);
                    }).join('&');
                }
    
                return CxMisc.qs.strictUriEncode(key) + '=' + CxMisc.qs.strictUriEncode(val);
            }).filter(function (x) {
                return x.length > 0;
            }).join('&') : '';
        }
    }
};
